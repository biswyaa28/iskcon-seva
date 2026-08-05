# -*- coding: utf-8 -*-
"""Assert every quoted scripture line appears verbatim in the source text.

This is the check that protects the site's editorial integrity: it reads the
*built* pages, not the Python, so it catches a rendering bug as readily as a
mistyped anchor.
"""
from __future__ import annotations

import html
import re

from sok.checks.report import Report
from sok.config import SITE
from sok.content.passages import SOURCE_FILE

_VERSE = re.compile(r'<p class="sok-verse__text">(.*?)</p>', re.S)
_TAG = re.compile(r"<[^>]+>")
_FOOTNOTE = re.compile(r"\[FN#\d+\]")
_WHITESPACE = re.compile(r"\s+")


def _normalise(text: str) -> str:
    return _WHITESPACE.sub(" ", text).strip()


def run() -> Report:
    """Compare every rendered verse line against the source text."""
    report = Report(name="quotes")

    if not SOURCE_FILE.exists():
        report.error(f"source text missing: {SOURCE_FILE}")
        return report

    source = _normalise(_FOOTNOTE.sub("", SOURCE_FILE.read_text(encoding="utf-8")))

    for page in sorted(SITE.glob("library/*/index.html")):
        markup = page.read_text(encoding="utf-8", errors="ignore")
        for block in _VERSE.findall(markup):
            for raw in block.split("<br>"):
                line = html.unescape(_TAG.sub("", raw)).strip()
                if not line or line == "\xa0":
                    continue
                report.checked += 1
                if _normalise(line) not in source:
                    report.error(
                        f"not found verbatim in source: {line!r}",
                        (page.parent.name,),
                    )

    if not report.checked:
        report.warn("no verse lines found — is the library built?")
    return report
