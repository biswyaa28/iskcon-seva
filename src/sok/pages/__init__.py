# -*- coding: utf-8 -*-
"""Page builders.

Every builder is a zero-argument function returning a :class:`sok.render.Page`.
:func:`all_pages` is the single list the build walks, so adding a page means
adding it here and nowhere else.
"""
from __future__ import annotations

from sok.pages import contact, foundation, library, programs
from sok.render import Page


def all_pages() -> tuple[Page, ...]:
    """Every generated page, in build order."""
    pages: list[Page] = [builder() for builder in foundation.PAGES]
    pages.extend(builder() for builder in contact.PAGES)
    pages.append(library.library())
    pages.extend(programs.all_programs())
    pages.extend(library.all_articles())
    return tuple(pages)


__all__ = ["all_pages", "contact", "foundation", "library", "programs"]
