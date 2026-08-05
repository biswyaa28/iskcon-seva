# -*- coding: utf-8 -*-
"""Asset pipeline: extract inlined CSS/JS, publish first-party assets, prune.

The mirrored theme inlines ~850 KB of compiled CSS into every page's ``<head>``.
Across the site that is tens of megabytes of byte-identical duplication which no
browser can cache. This module lifts those blocks out of the shell once, writes
them to ``site/assets/css/bundle.css``, and leaves a single ``<link>`` behind —
so the stylesheet is downloaded once and cached for every subsequent page.

Cascade order is preserved exactly: blocks are concatenated in the order they
appeared, and the ``<link>`` is inserted at the position of the first block.
"""
from __future__ import annotations

import re
import shutil
from dataclasses import dataclass, field
from pathlib import Path

from sok.config import ASSETS_DIR, BUNDLE_CSS, SITE

_STYLE_BLOCK = re.compile(r"<style[^>]*>(.*?)</style>", re.S)
_HEAD_END = "</head>"


@dataclass
class AssetReport:
    """What the pipeline did, for build output."""

    css_blocks: int = 0
    css_bytes: int = 0
    published: list[str] = field(default_factory=list)
    pruned: list[Path] = field(default_factory=list)
    pruned_bytes: int = 0


def assets_root() -> Path:
    return SITE / ASSETS_DIR


# --------------------------------------------------------------------------- #
# CSS extraction
# --------------------------------------------------------------------------- #
def extract_head_css(head: str) -> tuple[str, str]:
    """Lift every ``<style>`` block out of ``head``.

    Returns ``(rewritten_head, stylesheet)``. Blocks after ``</head>`` are left
    alone — they belong to the body and are page-specific.

    All ``url()`` references in the mirrored CSS are root-relative, so moving
    the rules into ``/assets/css/`` does not change how they resolve.
    """
    boundary = head.find(_HEAD_END)
    if boundary == -1:
        return head, ""

    head_part, rest = head[:boundary], head[boundary:]

    blocks = _STYLE_BLOCK.findall(head_part)
    if not blocks:
        return head, ""

    stylesheet = "\n".join(block.strip() for block in blocks if block.strip())
    rewritten = _STYLE_BLOCK.sub("", head_part) + rest
    return rewritten, stylesheet


def write_bundle(stylesheet: str) -> Path:
    """Write the extracted stylesheet into the assets tree."""
    target = SITE / BUNDLE_CSS.lstrip("/")
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(stylesheet, encoding="utf-8")
    return target


def build_bundle() -> AssetReport:
    """Extract CSS from the shell and write ``bundle.css``.

    Installs a slimmed shell for the rest of the process, so every page
    rendered afterwards links to the bundle instead of inlining it.
    """
    from sok.render import chrome

    report = AssetReport()
    original = chrome.shell()
    boundary = original.head.find(_HEAD_END)
    blocks = _STYLE_BLOCK.findall(original.head[:boundary]) if boundary != -1 else []

    head, stylesheet = extract_head_css(original.head)
    if not stylesheet:
        return report

    write_bundle(stylesheet)
    chrome.set_shell(chrome.Shell(head=head, footer=original.footer))

    report.css_blocks = len(blocks)
    report.css_bytes = len(stylesheet)
    return report


# --------------------------------------------------------------------------- #
# first-party assets
# --------------------------------------------------------------------------- #
#: Files copied from ``assets/`` in the repo into ``site/assets/`` at build time.
def publish(source_root: Path) -> list[str]:
    """Copy repo-managed assets into the site tree.

    Returns the root-relative URLs written.
    """
    if not source_root.exists():
        return []
    written = []
    for path in sorted(source_root.rglob("*")):
        if not path.is_file() or path.name.startswith("."):
            continue
        relative = path.relative_to(source_root)
        target = assets_root() / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(path, target)
        written.append(f"/{ASSETS_DIR}/{relative.as_posix()}")
    return written


# --------------------------------------------------------------------------- #
# pruning
# --------------------------------------------------------------------------- #
#: Never pruned, even if nothing links to them.
_KEEP = (
    "robots.txt",
    "favicon.ico",
    "sitemap.xml",
    ".nojekyll",
)


def _referenced() -> set[str]:
    """Every local URL any built page or stylesheet points at."""
    from sok.checks.links import references

    found: set[str] = set()
    for path in list(SITE.rglob("*.html")) + list(SITE.rglob("*.css")):
        found |= references(path.read_text(encoding="utf-8", errors="ignore"))
    return {url.split("?")[0].split("#")[0] for url in found}


def unreferenced() -> list[Path]:
    """Non-HTML files in the site tree that nothing references."""
    referenced = _referenced()
    orphans = []
    for path in sorted(SITE.rglob("*")):
        if not path.is_file() or path.suffix == ".html":
            continue
        if path.name in _KEEP:
            continue
        url = "/" + path.relative_to(SITE).as_posix()
        if url not in referenced:
            orphans.append(path)
    return orphans


def prune() -> tuple[list[Path], int]:
    """Delete unreferenced assets. Returns the files removed and bytes freed."""
    orphans = unreferenced()
    freed = 0
    for path in orphans:
        freed += path.stat().st_size
        path.unlink()

    # Remove directories left empty by the deletions.
    for directory in sorted(
        (p for p in SITE.rglob("*") if p.is_dir()),
        key=lambda p: len(p.parts),
        reverse=True,
    ):
        if not any(directory.iterdir()):
            directory.rmdir()

    return orphans, freed
