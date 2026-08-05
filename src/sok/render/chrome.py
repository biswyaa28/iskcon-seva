# -*- coding: utf-8 -*-
"""Rebrand the mirrored theme shell and swap in the foundation's navigation.

The original site was a WordPress/Avada mirror. Rather than reimplement its
stylesheet, we reuse the extracted ``<head>`` + header + footer and rewrite the
parts that carry the old identity: logo, menus, footer columns, and URLs.

The result is cached per process — the shell is ~900 KB and every page needs
it, so parsing it once matters.
"""
from __future__ import annotations

import functools
import re
from dataclasses import dataclass

from sok.config import BRAND, LEGACY_BRAND_NAMES, LEGACY_DOMAINS, SHELL
from sok.navigation import FOOTER_MENUS, NAV, Link
from sok.render.html import join


class ShellError(RuntimeError):
    """Raised when the extracted shell is missing or malformed."""


@dataclass(frozen=True)
class Shell:
    """The two halves of every page: everything before, and after, the body."""

    head: str
    footer: str


# --------------------------------------------------------------------------- #
# navigation markup
# --------------------------------------------------------------------------- #
_MAIN_LI_CLASS = (
    "menu-item menu-item-type-post_type menu-item-object-page awb-menu__li "
    "awb-menu__main-li awb-menu__main-li_regular"
)
_BACKGROUND_SPANS = (
    '<span class="awb-menu__main-background-default '
    'awb-menu__main-background-default_fade"></span>'
    '<span class="awb-menu__main-background-active '
    'awb-menu__main-background-active_fade"></span>'
)


def _submenu(children: tuple[Link, ...]) -> str:
    items = join(
        f'<li class="menu-item menu-item-type-post_type menu-item-object-page '
        f'awb-menu__li awb-menu__sub-li">'
        f'<a href="{child.href}" class="awb-menu__sub-a">'
        f"<span>{child.label}</span></a></li>"
        for child in children
    )
    return (
        f'<ul class="awb-menu__sub-ul awb-menu__sub-ul_main sub-menu">'
        f"{items}</ul>"
    )


def desktop_nav() -> str:
    """The primary menu, with hover submenus."""
    items = []
    for link in NAV:
        css = _MAIN_LI_CLASS
        submenu = arrow = ""
        if link.has_children:
            css += " menu-item-has-children awb-menu__main-li_with-sub-arrow"
            submenu = _submenu(link.children)
            arrow = '<span class="awb-menu__open-nav-submenu-hover"></span>'
        items.append(
            f'<li class="{css}">{_BACKGROUND_SPANS}'
            f'<a href="{link.href}" class="awb-menu__main-a awb-menu__main-a_regular">'
            f'<span class="menu-text">{link.label}</span></a>{arrow}{submenu}</li>'
        )
    return join(items)


def footer_menu_items(links: tuple[Link, ...]) -> str:
    return join(
        f'<li class="{_MAIN_LI_CLASS}">{_BACKGROUND_SPANS}'
        f'<a href="{link.href}" class="awb-menu__main-a awb-menu__main-a_regular">'
        f'<span class="menu-text">{link.label}</span></a></li>'
        for link in links
    )


# --------------------------------------------------------------------------- #
# rewriting
# --------------------------------------------------------------------------- #
#: Plugin scripts that were never mirrored: they 404 and nothing uses them.
_DEAD_SCRIPTS = (
    "audioigniter/player/build/app.js",
    "wordpress-popular-posts/assets/js/wpp.min.js",
    "copy-the-code/assets/frontend/js/lib/ctc.js",
    "copy-the-code/assets/frontend/js/global-injector.js",
)

#: WordPress plumbing with no meaning on a static build.
_WORDPRESS_CRUFT = (
    r'<link rel="alternate"[^>]*(?:oembed|feed|rss)[^>]*/?>',
    r'<link rel="(?:EditURI|wlwmanifest|pingback)"[^>]*/?>',
    r'<link rel="https://api\.w\.org/"[^>]*/?>',
    r'<link rel="alternate"[^>]*type="application/(?:rss|atom)[^>]*/?>',
)

#: Third-party trackers stripped for privacy and payload.
#:
#: These match on the tracker's *identifying token* rather than a specific URL,
#: because the endpoints appear in several forms: as a ``src`` attribute, as a
#: string inside an inline loader, and as a ``<noscript>`` tracking pixel.
_TRACKERS = (
    # Google Tag Manager / gtag: the loader tag and the inline config that
    # follows it.
    r"<script[^>]*googletagmanager[^>]*>.*?</script>",
    r"<script\b[^>]*>(?:(?!</script>).)*?\bgtag\s*\((?:(?!</script>).)*?</script>",
    # Meta/Facebook Pixel: the inline loader (which references
    # connect.facebook.net) plus its <noscript> fallback pixel.
    r"<script\b[^>]*>(?:(?!</script>).)*?connect\.facebook\.net"
    r"(?:(?!</script>).)*?</script>",
    r"<script\b[^>]*>(?:(?!</script>).)*?\bfbq\s*\((?:(?!</script>).)*?</script>",
    r"<noscript>\s*<img[^>]*facebook\.com/tr[^>]*>\s*</noscript>",
    # Leftover HTML comments that framed the removed snippets.
    r"<!--\s*(?:End\s+)?Meta Pixel Code\s*-->",
    r"<!--\s*(?:End\s+)?Google tag \(gtag\.js\)\s*-->",
)


def _absolute_to_root_relative(markup: str, domain: str) -> str:
    """Rewrite every absolute URL for ``domain`` to a root-relative path.

    Order matters: the trailing-slash forms must be replaced before the bare
    forms, or ``https://example.org/a`` would become ``//a``.
    """
    for prefix in (
        f"https://{domain}/",
        f"http://{domain}/",
        f"//{domain}/",
        f"https://{domain}",
        f"http://{domain}",
        f"//{domain}",
    ):
        markup = markup.replace(prefix, "/")
    return markup


def rebrand(markup: str) -> str:
    """Replace the mirrored site's identity with the foundation's.

    Safe to run on any fragment: page bodies as well as the shell.
    """
    # Logo images.
    markup = re.sub(
        r'src="[^"]*/uploads/2022/05/Artboard-2-copy-1\.png"',
        f'src="{BRAND.logo}"',
        markup,
    )
    markup = re.sub(
        r'srcset="[^"]*Artboard-2-copy[^"]*"',
        f'srcset="{BRAND.logo} 1x, {BRAND.logo_2x} 2x"',
        markup,
    )
    markup = re.sub(
        r'retina_url="[^"]*Artboard-2-copy[^"]*"',
        f'retina_url="{BRAND.logo_2x}"',
        markup,
    )
    markup = markup.replace(
        'alt="Bhaktivinoda Institute Logo"', f'alt="{BRAND.name} Logo"'
    )

    # URLs: the mirrored domain, then our own (both appear in the source).
    for domain in LEGACY_DOMAINS:
        markup = _absolute_to_root_relative(markup, domain)
    markup = _absolute_to_root_relative(markup, "scienceofkrishna.org")

    # Textual identity. Longest first, so "The Bhaktivinoda Institute" wins.
    for name in LEGACY_BRAND_NAMES:
        markup = markup.replace(name, BRAND.name)

    for script in _DEAD_SCRIPTS:
        pattern = re.escape(script)
        markup = re.sub(rf"<script[^>]*{pattern}[^>]*>\s*</script>", "", markup)
        markup = re.sub(rf"<script[^>]*{pattern}[^>]*/?>", "", markup)

    for pattern in _WORDPRESS_CRUFT:
        markup = re.sub(pattern, "", markup, flags=re.I)

    for pattern in _TRACKERS:
        markup = re.sub(pattern, "", markup, flags=re.S)

    # Author permalink -> the about page.
    markup = markup.replace("/author/gauragopala/", "/about-us/")

    # Structured data inherited from the mirror.
    markup = markup.replace(
        '"sameAs":["https://www.facebook.com/bhaktivinodainstitute"],', '"sameAs":[],'
    )
    markup = markup.replace(
        '"email":"gauragopala@gmail.com"', f'"email":"{BRAND.email}"'
    )
    markup = re.sub(r"https%3A%2F%2Fbhaktivinodainstitute\.org%2F", "", markup)
    return markup


def _replace_list_contents(markup: str, opening_pattern: str, inner: str) -> str:
    """Replace the contents of every ``<ul>`` matching ``opening_pattern``.

    A non-greedy regex would stop at the first nested ``</ul>`` (a submenu) and
    leave stale items behind, so this scans for the balanced closing tag.
    """
    out: list[str] = []
    position = 0
    for match in re.finditer(opening_pattern, markup):
        if match.start() < position:
            continue
        cursor = match.end()
        depth = 1
        while depth:
            next_open = markup.find("<ul", cursor)
            next_close = markup.find("</ul>", cursor)
            if next_close == -1:
                return "".join(out) + markup[position:]
            if next_open != -1 and next_open < next_close:
                depth += 1
                cursor = next_open + 3
            else:
                depth -= 1
                cursor = next_close + 5
        out.append(markup[position:match.end()])
        out.append(inner)
        out.append("</ul>")
        position = cursor
    out.append(markup[position:])
    return "".join(out)


def _strip_language_switcher(markup: str) -> str:
    """Remove WPML remnants — this is a single-language site."""
    markup = re.sub(r"<li[^>]*wpml-ls[^>]*>.*?</li>", "", markup, flags=re.S)
    return markup


def swap_navigation(markup: str) -> str:
    """Point the primary menu at the foundation's information architecture."""
    markup = _replace_list_contents(
        markup,
        r'<ul[^>]*class="[^"]*awb-menu__main-ul[^"]*"[^>]*>',
        desktop_nav(),
    )
    return _strip_language_switcher(markup)


def swap_footer(markup: str) -> str:
    """Rewrite the footer menus, tagline, and legal line."""
    for menu in FOOTER_MENUS:
        pattern = re.compile(
            r'(<ul id="' + re.escape(menu.dom_id) + r'"[^>]*>)(.*?)(</ul>)', re.S
        )
        items = footer_menu_items(menu.links)
        markup = pattern.sub(
            lambda m, items=items: m.group(1) + items + m.group(3), markup, count=1
        )

    markup = markup.replace(">browse</h3>", ">our work</h3>")
    markup = _strip_language_switcher(markup)

    markup = markup.replace(
        "A free repository of the complete works of Śrīla Bhaktivinoda Ṭhākura — "
        "books, articles, songs and poems in English and Bengali.",
        BRAND.tagline,
    )
    markup = markup.replace(
        "© Science of Krishna. Read freely. Reproduce with permission.",
        f"© {BRAND.legal_name}. All rights reserved.",
    )
    markup = markup.replace("Support This Project", "Donate")

    # Cross-links to unaffiliated sites. They appear in both the desktop and
    # mobile footers with differing `fusion-text-N` classes, so match content.
    markup = re.sub(
        r'<div class="fusion-text fusion-text-\d+"[^>]*>\s*'
        r"<p[^>]*>\s*Related:.*?</p>\s*</div>",
        "",
        markup,
        flags=re.S,
    )
    # Newsletter signup posted to the old site's provider.
    markup = re.sub(
        r'<div class="fusion-fullwidth[^"]*fusion-builder-row-8(?:-1)?[^"]*"'
        r'.*?(?=<div class="fusion-fullwidth)',
        "",
        markup,
        flags=re.S,
    )
    return markup


# --------------------------------------------------------------------------- #
# assembly
# --------------------------------------------------------------------------- #
@functools.lru_cache(maxsize=1)
def _load() -> Shell:
    """Read the shell fragments from disk and rebrand them.

    Cached: the shell is ~900 KB and every page needs it.
    """
    head_file = SHELL / "head_header.html"
    footer_file = SHELL / "footer.html"
    missing = [p for p in (head_file, footer_file) if not p.exists()]
    if missing:
        raise ShellError(
            "shell fragments missing: "
            + ", ".join(str(p) for p in missing)
            + ". Run `make shell` to regenerate them from the mirror."
        )

    head = swap_navigation(rebrand(head_file.read_text(encoding="utf-8")))
    footer = swap_footer(rebrand(footer_file.read_text(encoding="utf-8")))
    return Shell(head=head, footer=footer)


#: Set by the asset pipeline once inlined CSS has been lifted into a bundle.
#: Kept as an explicit override rather than mutating the cache, so the data
#: flow stays traceable.
_override: Shell | None = None


def shell() -> Shell:
    """The page shell currently in effect."""
    return _override if _override is not None else _load()


def set_shell(replacement: Shell | None) -> None:
    """Override the shell for the rest of the process.

    Passing ``None`` restores the on-disk shell — used by tests.
    """
    global _override
    _override = replacement


def reset() -> None:
    """Drop both the override and the disk cache."""
    set_shell(None)
    _load.cache_clear()
