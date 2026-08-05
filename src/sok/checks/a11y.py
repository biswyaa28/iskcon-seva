# -*- coding: utf-8 -*-
"""Structural and accessibility checks on generated pages.

Verifies the things that are cheap to get wrong and expensive to notice later:
one ``h1`` per page, no skipped heading levels, alt text on images, a title and
meta description, and a language attribute.
"""
from __future__ import annotations

import re

from sok.checks.report import Report
from sok.pages import all_pages

_H1 = re.compile(r"<h1[^>]*>(.*?)</h1>", re.S)
_HEADING = re.compile(r"<h([1-6])[^>]*>")
_IMG_WITHOUT_ALT = re.compile(r"<img(?![^>]*\balt=)[^>]*>")
_EMPTY_LINK = re.compile(r"<a[^>]*>\s*</a>")
_TITLE = re.compile(r"<title>(.*?)</title>", re.S)
_DESCRIPTION = re.compile(r'<meta name="description" content="([^"]*)"')


def _main_content(markup: str) -> str:
    """The page body, excluding shared chrome.

    Chrome issues would otherwise be reported once per page, drowning out real
    findings.
    """
    start = markup.find("<main")
    end = markup.find("</main>")
    return markup[start:end] if start != -1 and end != -1 else markup


def run() -> Report:
    """Check every generated page."""
    report = Report(name="a11y")

    for page in all_pages():
        path = page.path
        if not path.exists():
            report.error(f"not built: {page.slug}")
            continue

        report.checked += 1
        markup = path.read_text(encoding="utf-8", errors="ignore")
        body = _main_content(markup)
        where = (page.slug,)

        headings = [int(level) for level in _HEADING.findall(body)]
        h1_count = len(_H1.findall(body))
        if h1_count != 1:
            report.error(f"expected exactly one h1, found {h1_count}", where)

        for current, following in zip(headings, headings[1:]):
            if following - current > 1:
                report.error(
                    f"heading level jumps h{current} -> h{following}", where
                )
                break

        missing_alt = len(_IMG_WITHOUT_ALT.findall(body))
        if missing_alt:
            report.error(f"{missing_alt} image(s) without alt text", where)

        empty_links = len(_EMPTY_LINK.findall(body))
        if empty_links:
            report.warn(f"{empty_links} empty link(s)", where)

        title = _TITLE.search(markup)
        if not title or not title.group(1).strip():
            report.error("missing <title>", where)

        description = _DESCRIPTION.search(markup)
        if not description or not description.group(1).strip():
            report.error("missing meta description", where)

        if 'lang="en' not in markup:
            report.error("missing lang attribute", where)

    return report
