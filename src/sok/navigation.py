# -*- coding: utf-8 -*-
"""Site information architecture.

Navigation, footer columns, and the programme/library route map live here as
plain data. Rendering lives in :mod:`sok.render.chrome`; keeping the two apart
means the menus can be reordered without touching markup, and can be asserted
against in tests.
"""
from __future__ import annotations

from dataclasses import dataclass, field


@dataclass(frozen=True)
class Link:
    """A single navigation entry."""

    label: str
    href: str
    children: tuple["Link", ...] = ()

    @property
    def has_children(self) -> bool:
        return bool(self.children)


def _link(label: str, href: str, *children: Link) -> Link:
    return Link(label, href, tuple(children))


# ------------------------------------------------------------------ programmes --
#: Slug order drives the objectives list, the nav, and the footer. Adding a
#: programme here plus an entry in ``sok.content.programs`` is all that is
#: needed for it to appear everywhere.
PROGRAM_SLUGS: tuple[str, ...] = (
    "scriptural-outreach",
    "prasadam-distribution",
    "temple-seva",
    "drug-free-society",
    "counseling-support",
    "workshops-partnerships",
)

PROGRAM_LABELS: dict[str, str] = {
    "scriptural-outreach": "Scriptural Outreach",
    "prasadam-distribution": "Prasadam Distribution",
    "temple-seva": "Temple Sevā",
    "drug-free-society": "Drug-Free Society",
    "counseling-support": "Counseling &amp; Support",
    "workshops-partnerships": "Workshops &amp; Partnerships",
}


def program_url(slug: str) -> str:
    """Canonical URL for a programme page."""
    return f"/programs/{slug}/"


def article_url(slug: str) -> str:
    """Canonical URL for a library article."""
    return f"/library/{slug}/"


def _program_links(short: bool = False) -> tuple[Link, ...]:
    labels = dict(PROGRAM_LABELS)
    if short:
        labels["workshops-partnerships"] = "Workshops"
    return tuple(_link(labels[s], program_url(s)) for s in PROGRAM_SLUGS)


# ------------------------------------------------------------------ main menu --
ARCHIVE_LINKS: tuple[Link, ...] = (
    _link("Books", "/writings/books/"),
    _link("Articles", "/writings/articles/"),
    _link("Songs &amp; Poems", "/writings/songs-poems/"),
    _link("Quotes", "/writings/quotes/"),
    _link("Audio", "/audio/"),
)

NAV: tuple[Link, ...] = (
    _link("Home", "/"),
    _link(
        "About",
        "/about-us/",
        _link("Our Story", "/about-us/"),
        _link("Objectives", "/objectives/"),
        _link("Aims", "/objectives/#aims"),
    ),
    Link("Our Work", "#", _program_links()),
    Link("Library", "/library/", ARCHIVE_LINKS),
    _link("Get Involved", "/get-involved/"),
    _link("Contact", "/contact-us/"),
)


# ---------------------------------------------------------------- footer menus --
@dataclass(frozen=True)
class FooterMenu:
    """A footer column, keyed by the ``<ul id>`` present in the theme markup."""

    dom_id: str
    heading: str
    links: tuple[Link, ...] = field(default_factory=tuple)


FOOTER_MENUS: tuple[FooterMenu, ...] = (
    FooterMenu("menu-footer-browse-menu", "our work", _program_links(short=True)),
    FooterMenu(
        "menu-footer-about-menu",
        "about",
        (
            _link("About Us", "/about-us/"),
            _link("Objectives", "/objectives/"),
            _link("Library", "/library/"),
            _link("Get Involved", "/get-involved/"),
            _link("Contact Us", "/contact-us/"),
            _link("Donate", "/donate/"),
        ),
    ),
)


# ------------------------------------------------------------- legacy archive --
#: Mirrored pages whose body content is kept but whose chrome is regenerated.
LEGACY_PAGES: dict[str, tuple[str, str]] = {
    "writings/books": ("Books", "Complete texts and translations, free to read."),
    "writings/articles": ("Articles", "Essays and commentary on philosophy and practice."),
    "writings/songs-poems": ("Songs & Poems", "Devotional songs and poetry with translation."),
    "writings/quotes": ("Quotes", "Selected passages arranged by theme."),
    "audio": ("Audio", "Recorded lectures, classes, and kirtana."),
    "tributes": ("Tributes", "Tributes and remembrances."),
    "biographical-articles": (
        "Biographical Books & Articles",
        "Biographical books and articles.",
    ),
    "photos-of-bhaktivinoda-thakura": ("Photos", "A photographic archive."),
    "mission-statement": ("Mission Statement", "The mission of the foundation."),
}


#: Stable ``post-<id>`` values. The theme's CSS and JS key off the body class,
#: so these must not drift between builds.
PAGE_IDS: dict[str, int] = {
    "/": 901,
    "/objectives/": 902,
    "/about-us/": 903,
    "/get-involved/": 904,
    "/contact-us/": 905,
    "/donate/": 906,
    "/library/": 907,
}

#: Programme pages occupy 910-915, library articles 920+.
PROGRAM_ID_BASE = 910
ARTICLE_ID_BASE = 920
