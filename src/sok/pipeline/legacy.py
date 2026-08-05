# -*- coding: utf-8 -*-
"""Re-wrap the inherited archive pages in the current shell.

The bodies of these pages are genuine archive material worth keeping, but their
chrome still carries the mirrored site's identity. This step keeps the body and
regenerates everything around it.

Idempotent: re-running is safe, because the body is located by the same markers
that the shell extraction used, and those survive a round trip.
"""
from __future__ import annotations

import re
from dataclasses import dataclass

from sok.config import BRAND, SITE
from sok.navigation import LEGACY_PAGES
from sok.render.chrome import rebrand, shell
from sok.render.html import esc
from sok.render.page import (
    _CANONICAL,
    _META_DESCRIPTION,
    _OG_DESCRIPTION,
    _OG_TITLE,
    _TITLE,
    _asset_links,
)
from sok.config import SITE_CSS
from sok.pipeline.shell import BODY_OPEN, MAIN_CLOSE, SECTION_TAIL


@dataclass(frozen=True)
class Reshelled:
    slug: str
    size: int


@dataclass(frozen=True)
class Skipped:
    slug: str
    reason: str


def extract_body(markup: str) -> str | None:
    """Pull the page-specific content out of a mirrored or re-shelled page."""
    start = markup.find(BODY_OPEN)
    if start == -1:
        return None
    start += len(BODY_OPEN)
    end = markup.find(MAIN_CLOSE)
    if end == -1:
        return None
    tail = markup.rfind(SECTION_TAIL, start, end)
    return markup[start:tail] if tail != -1 else None


def reshell_one(slug: str, title: str, description: str) -> Reshelled | Skipped:
    """Re-wrap a single archive page."""
    source = SITE / slug / "index.html"
    if not source.exists():
        return Skipped(slug, "missing")

    original = source.read_text(encoding="utf-8", errors="ignore")
    body = extract_body(original)
    if body is None:
        return Skipped(slug, "no recognisable body")

    body = rebrand(body)

    page_title = esc(f"{title} — {BRAND.name}")
    page_description = esc(description)

    head = shell().head
    head = _TITLE.sub(f"<title>{page_title}</title>", head)
    head = _META_DESCRIPTION.sub(
        lambda m: m.group(1) + page_description + m.group(2), head
    )
    head = _CANONICAL.sub(lambda m: m.group(1) + f"/{slug}/" + m.group(2), head)
    head = _OG_TITLE.sub(lambda m: m.group(1) + page_title + m.group(2), head)
    head = _OG_DESCRIPTION.sub(
        lambda m: m.group(1) + page_description + m.group(2), head
    )
    if SITE_CSS not in head:
        head = head.replace("</head>", f"{_asset_links()}\n</head>", 1)

    markup = head + body + shell().footer
    source.write_text(markup, encoding="utf-8")
    return Reshelled(slug, len(markup))


def run() -> tuple[list[Reshelled], list[Skipped]]:
    """Re-shell every archive page."""
    done: list[Reshelled] = []
    skipped: list[Skipped] = []
    for slug, (title, description) in LEGACY_PAGES.items():
        result = reshell_one(slug, title, description)
        if isinstance(result, Reshelled):
            done.append(result)
        else:
            skipped.append(result)
    return done, skipped
