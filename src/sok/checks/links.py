# -*- coding: utf-8 -*-
"""Crawl the built site and report broken internal links and missing assets."""
from __future__ import annotations

import re
from collections import defaultdict
from urllib.parse import unquote, urlparse

from sok.checks.report import Level, Report
from sok.config import SITE

_ATTRIBUTE = re.compile(r'(href|src)="([^"]+)"')
_SRCSET = re.compile(r'srcset="([^"]+)"')
_CSS_URL = re.compile(r"""url\((["']?)([^)"']+)\1\)""")

#: Inline scripts contain markup inside comments and template strings, which
#: look like references but are not. Stripped before scanning.
_SCRIPT_BLOCK = re.compile(r"<script\b[^>]*>.*?</script>", re.S | re.I)

#: Schemes and fragments that are never files on disk.
_NON_FILE = ("#", "data:", "mailto:", "tel:", "javascript:")

#: Inline SVG placeholders, sometimes percent-encoded by the theme's lazy loader.
_INLINE_SVG = re.compile(r"^%3Csvg|^<svg", re.I)

#: A ``srcset`` candidate boundary: a comma preceded by a width/density
#: descriptor (``640w``, ``2x``) or by the end of a bare URL. This avoids
#: splitting on the commas that occur inside inline SVG data URIs.
_SRCSET_SEPARATOR = re.compile(r"(?:(?<=\d[wx])|(?<=\S))\s*,\s+")


def _is_local(url: str) -> bool:
    """Is this a reference we expect to resolve to a file in the site tree?"""
    if not url or url.startswith(_NON_FILE + ("http://", "https://", "//")):
        return False
    return not _INLINE_SVG.match(url)


def _looks_like_path(url: str) -> bool:
    """Reject placeholder values that appear in script comments and templates."""
    return url.strip(".") != "" and "{" not in url and "$" not in url


def resolve(url: str) -> bool:
    """Does this root-relative URL correspond to a file in the site tree?"""
    path = unquote(urlparse(url).path)
    if path.endswith("/"):
        return (SITE / path.strip("/") / "index.html").exists()
    relative = path.lstrip("/")
    return any(
        candidate.exists()
        for candidate in (
            SITE / relative,
            SITE / relative / "index.html",
            SITE / (relative + ".html"),
        )
    )


def _srcset_urls(value: str) -> list[str]:
    """Split a ``srcset`` attribute into candidate URLs.

    Commas separate candidates, but they also appear *inside* inline SVG data
    URIs, so a plain ``split(",")`` shreds them. Per the HTML spec a candidate
    is a URL optionally followed by whitespace and a descriptor, so we split
    only on a comma that follows a descriptor or whitespace.
    """
    urls: list[str] = []
    for candidate in _SRCSET_SEPARATOR.split(value):
        url = candidate.strip().split()[0] if candidate.strip() else ""
        if url:
            urls.append(url)
    return urls


def references(markup: str) -> set[str]:
    """Every local URL referenced by a document.

    ``<script>`` bodies are ignored: they contain markup in comments and
    template strings that resembles references but never resolves to a file.
    Genuine script *sources* are still caught, because ``src`` lives on the
    opening tag, which the strip preserves nothing of — so scripts are stripped
    only after their ``src`` attributes have been collected.
    """
    found: set[str] = set()

    for _, url in _ATTRIBUTE.findall(markup):
        url = url.strip()
        if _is_local(url) and _looks_like_path(url):
            found.add(url)

    body = _SCRIPT_BLOCK.sub("", markup)
    for value in _SRCSET.findall(body):
        for url in _srcset_urls(value):
            if _is_local(url):
                found.add(url)
    for _, url in _CSS_URL.findall(body):
        if _is_local(url):
            found.add(url)
    return found


def run() -> Report:
    """Check every built page for dangling references.

    References *from* the inherited archive are reported as warnings, not
    errors: those pages link to articles that were never part of the mirror, a
    known gap recorded in ``docs/known-issues.md``. Anything the generator
    produces is held to a stricter standard, so a real regression is not buried
    under inherited noise.
    """
    from sok.navigation import LEGACY_PAGES

    report = Report(name="links")
    pages = sorted(SITE.rglob("index.html"))
    report.checked = len(pages)

    legacy_roots = {slug.split("/")[0] for slug in LEGACY_PAGES}

    broken_generated: dict[str, set[str]] = defaultdict(set)
    broken_archive: dict[str, set[str]] = defaultdict(set)
    external: set[str] = set()

    for page in pages:
        relative = str(page.relative_to(SITE))
        markup = page.read_text(encoding="utf-8", errors="ignore")
        from_archive = relative.split("/")[0] in legacy_roots

        for _, url in _ATTRIBUTE.findall(markup):
            url = url.strip()
            if url.startswith(("http://", "https://", "//")):
                external.add(urlparse(url).netloc)

        for url in references(markup):
            if not resolve(url):
                bucket = broken_archive if from_archive else broken_generated
                bucket[url].add(relative)

    for url, where in sorted(broken_generated.items()):
        report.add(Level.ERROR, f"unresolved: {url}", tuple(where))

    if broken_archive:
        report.warn(
            f"{len(broken_archive)} unresolved link(s) in the inherited archive "
            "(see docs/known-issues.md)",
            tuple(sorted({w for where in broken_archive.values() for w in where})),
        )

    if external:
        report.notes.append(
            "external hosts referenced: " + ", ".join(sorted(h for h in external if h))
        )
    return report
