# -*- coding: utf-8 -*-
"""Assemble and write complete HTML pages.

A page is ``shell.head`` + generated body + ``shell.footer``, with the head's
per-page metadata rewritten. Optionally the shell's inlined ``<style>`` blocks
are lifted into a single shared stylesheet — see :mod:`sok.pipeline.assets`.
"""
from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path

from sok.config import BUNDLE_CSS, SITE, SITE_CSS, SITE_JS
from sok.render.chrome import shell
from sok.render.html import esc

#: Replaced in the head for each page.
_TITLE = re.compile(r"<title>.*?</title>", re.S)
_META_DESCRIPTION = re.compile(r'(<meta name="description" content=")[^"]*(")')
_CANONICAL = re.compile(r'(<link rel="canonical" href=")[^"]*(")')
_OG_TITLE = re.compile(r'(<meta property="og:title" content=")[^"]*(")')
_OG_DESCRIPTION = re.compile(r'(<meta property="og:description" content=")[^"]*(")')
_BODY_POST_ID = re.compile(r'id="post-\d+" class="post-\d+ page')


@dataclass(frozen=True)
class Page:
    """A page ready to be written to disk."""

    slug: str
    title: str
    description: str
    body: str
    page_id: int = 900

    @property
    def path(self) -> Path:
        """Where this page lands in the site tree."""
        relative = self.slug.strip("/")
        return SITE / relative / "index.html" if relative else SITE / "index.html"


@dataclass(frozen=True)
class Written:
    """The result of writing a page — used for build reporting."""

    slug: str
    path: Path
    size: int

    @property
    def relative(self) -> Path:
        return self.path.relative_to(SITE)


def _asset_links() -> str:
    """The stylesheet + script tags every page needs, in cascade order."""
    return (
        f'<link rel="stylesheet" href="{BUNDLE_CSS}" media="all">'
        f'<link rel="stylesheet" href="{SITE_CSS}" media="all">'
        f'<script src="{SITE_JS}" defer></script>'
    )


def render(page: Page) -> str:
    """Render a page to a complete HTML document."""
    head = shell().head

    title = esc(page.title)
    description = esc(page.description)

    head = _TITLE.sub(f"<title>{title}</title>", head)
    head = _META_DESCRIPTION.sub(lambda m: m.group(1) + description + m.group(2), head)
    head = _CANONICAL.sub(lambda m: m.group(1) + (page.slug or "/") + m.group(2), head)
    head = _OG_TITLE.sub(lambda m: m.group(1) + title + m.group(2), head)
    head = _OG_DESCRIPTION.sub(lambda m: m.group(1) + description + m.group(2), head)

    if SITE_CSS not in head:
        head = head.replace("</head>", f"{_asset_links()}\n</head>", 1)

    head = _BODY_POST_ID.sub(
        f'id="post-{page.page_id}" class="post-{page.page_id} page', head
    )

    return head + page.body + shell().footer


def write(page: Page) -> Written:
    """Render ``page`` and write it into the site tree."""
    markup = render(page)
    page.path.parent.mkdir(parents=True, exist_ok=True)
    page.path.write_text(markup, encoding="utf-8")
    return Written(slug=page.slug, path=page.path, size=len(markup))
