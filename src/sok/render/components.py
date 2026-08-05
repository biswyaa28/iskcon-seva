# -*- coding: utf-8 -*-
"""Avada/Fusion-compatible component builders.

Every helper emits markup that reuses the mirrored theme's own classes and CSS
custom properties, so generated pages inherit the original design language
without a new stylesheet rule. Colours come from :data:`sok.config.COLORS`
rather than literals, so a rebrand is a single-file change.

Components are pure functions returning strings: they take no globals and
touch no disk, which makes them trivial to unit test.
"""
from __future__ import annotations

from collections.abc import Iterable, Sequence

from sok.config import COLORS, SERIF
from sok.content.models import Card, Passage
from sok.render.html import attrs, join, style

# --------------------------------------------------------------------------- #
# layout
# --------------------------------------------------------------------------- #
def container(
    inner: str,
    *,
    bg: str | None = None,
    pad_top: str = "60px",
    pad_bottom: str = "60px",
    margin_top: str = "0px",
    max_width: str = "1248px",
    extra_class: str = "",
    extra_style: dict[str, str] | None = None,
) -> str:
    """A full-width section band."""
    declarations = {
        "--awb-border-radius-top-left": "0px",
        "--awb-border-radius-top-right": "0px",
        "--awb-border-radius-bottom-right": "0px",
        "--awb-border-radius-bottom-left": "0px",
        "--awb-padding-top": pad_top,
        "--awb-padding-bottom": pad_bottom,
        "--awb-margin-top": margin_top,
        "--awb-background-color": bg,
        "--awb-flex-wrap": "wrap",
    }
    if extra_style:
        declarations.update(extra_style)
    return (
        f'<div class="fusion-fullwidth fullwidth-box fusion-flex-container '
        f'nonhundred-percent-fullwidth non-hundred-percent-height-scrolling '
        f'{extra_class}" style="{style(declarations)}">'
        f'<div class="fusion-builder-row fusion-row '
        f'fusion-flex-align-items-flex-start fusion-flex-content-wrap" '
        f'style="max-width:{max_width};margin-left: calc(-4% / 2 );'
        f'margin-right: calc(-4% / 2 );">'
        f"{inner}</div></div>"
    )


def column(
    inner: str,
    *,
    width: str = "100%",
    width_md: str | None = None,
    width_sm: str = "100%",
    align: str = "flex-start",
    pad: str | None = None,
    extra_class: str = "",
) -> str:
    """A flex column inside a :func:`container`."""
    declarations = {
        "--awb-bg-size": "cover",
        "--awb-width-large": width,
        "--awb-margin-top-large": "0px",
        "--awb-spacing-right-large": "1.92%",
        "--awb-margin-bottom-large": "20px",
        "--awb-spacing-left-large": "1.92%",
        "--awb-width-medium": width_md or width,
        "--awb-order-medium": "0",
        "--awb-spacing-right-medium": "1.92%",
        "--awb-spacing-left-medium": "1.92%",
        "--awb-width-small": width_sm,
        "--awb-order-small": "0",
        "--awb-spacing-right-small": "1.92%",
        "--awb-spacing-left-small": "1.92%",
    }
    if pad:
        declarations["--awb-padding-top"] = pad
        declarations["--awb-padding-bottom"] = pad
    return (
        f'<div class="fusion-layout-column fusion_builder_column fusion-flex-column '
        f'{extra_class}" style="{style(declarations)}">'
        f'<div class="fusion-column-wrapper fusion-column-has-shadow '
        f'fusion-flex-justify-content-{align} fusion-content-layout-column">'
        f"{inner}</div></div>"
    )


def section(inner: str, **kwargs) -> str:
    """A container holding a single full-width column — the common case."""
    return container(column(inner), **kwargs)


# --------------------------------------------------------------------------- #
# typography
# --------------------------------------------------------------------------- #
def eyebrow(text_: str, *, color: str = COLORS.brown, align: str = "center") -> str:
    """A small uppercase label above a heading."""
    declarations = {
        "--awb-font-size": "16px",
        "--awb-text-transform": "uppercase",
        "--awb-text-color": color,
        "--awb-margin-bottom": "0px",
    }
    return (
        f'<div class="fusion-text fusion-text-no-margin" '
        f'style="{style(declarations)}">'
        f'<p style="text-align: {align};">{text_}</p></div>'
    )


def title(
    text_: str,
    *,
    level: int = 2,
    size: int = 26,
    align: str = "center",
    color: str | None = None,
    margin_bottom: str = "1%",
    margin_top: str = "0px",
    underline: bool = False,
    letter_spacing: str | None = None,
) -> str:
    """A section heading. ``level`` maps directly to ``h1``-``h6``."""
    separator_class = "sep-underline sep-solid" if underline else "fusion-sep-none"
    wrapper = {
        "--awb-margin-top": margin_top,
        "--awb-margin-bottom": margin_bottom,
        "--awb-text-color": color,
    }
    heading = {
        "margin": "0",
        "--fontSize": str(size),
        "--minFontSize": str(size),
        "line-height": "1.3",
        "letter-spacing": letter_spacing,
    }
    return (
        f'<div class="fusion-title title {separator_class} fusion-title-{align} '
        f'fusion-title-text fusion-title-size-two" style="{style(wrapper)}">'
        f'<h{level} class="fusion-title-heading title-heading-{align} '
        f'fusion-responsive-typography-calculated" style="{style(heading)}">'
        f"{text_}</h{level}></div>"
    )


def text(
    body: str,
    *,
    size: str | None = None,
    color: str | None = None,
    align: str | None = None,
    margin_bottom: str | None = None,
) -> str:
    """A rich-text block. Raw HTML passes through; plain text is wrapped in ``<p>``."""
    declarations = {
        "--awb-font-size": size,
        "--awb-text-color": color,
        "--awb-margin-bottom": margin_bottom,
    }
    alignment = f' style="text-align: {align};"' if align else ""
    inner = body if body.lstrip().startswith("<") else f"<p{alignment}>{body}</p>"
    return f'<div class="fusion-text" style="{style(declarations)}">{inner}</div>'


def centered(body: str, *, max_width: str | None = None) -> str:
    """Centre a block of copy, optionally constraining its measure."""
    measure = f"max-width:{max_width};margin:0 auto;" if max_width else ""
    return f'<p style="text-align:center;{measure}">{body}</p>'


def separator(
    *,
    width: str = "50px",
    color: str = "#a39171",
    margin_bottom: str = "2%",
) -> str:
    """A short horizontal rule used under headings."""
    return (
        f'<div class="fusion-separator" style="align-self: center;margin-left: auto;'
        f'margin-right: auto;margin-bottom:{margin_bottom};width:100%;'
        f'max-width:{width};">'
        f'<div class="fusion-separator-border sep-single sep-solid" '
        f'style="--awb-height:20px;--awb-amount:20px;--awb-sep-color:{color};'
        f'border-color:{color};border-top-width:1px;"></div></div>'
    )


def section_heading(
    label: str | None,
    heading: str,
    *,
    sub: str | None = None,
    level: int = 2,
    size: int = 26,
) -> str:
    """The eyebrow + title + rule + standfirst cluster used to open a section."""
    out = eyebrow(label) if label else ""
    out += title(heading, level=level, size=size)
    out += separator()
    if sub:
        out += text(sub, size="17px", align="center", color=COLORS.on_parchment_muted)
    return out


# --------------------------------------------------------------------------- #
# buttons
# --------------------------------------------------------------------------- #
#: Colour sets for each button variant, expressed in theme tokens.
_BUTTON_VARIANTS: dict[str, dict[str, str]] = {
    "solid": {
        "--button_accent_color": COLORS.parchment,
        "--button_border_color": COLORS.rust,
        "--button_accent_hover_color": COLORS.parchment,
        "--button_border_hover_color": COLORS.brown,
        "--button_gradient_top_color": COLORS.rust,
        "--button_gradient_bottom_color": COLORS.rust,
        "--button_gradient_top_color_hover": COLORS.brown,
        "--button_gradient_bottom_color_hover": COLORS.brown,
    },
    "ghost": {
        "--button_accent_color": COLORS.gold,
        "--button_border_color": "rgba(163,145,113,0.5)",
        "--button_accent_hover_color": COLORS.parchment,
        "--button_border_hover_color": COLORS.tan,
        "--button_gradient_top_color": "rgba(0,0,0,0)",
        "--button_gradient_bottom_color": "rgba(0,0,0,0)",
        "--button_gradient_top_color_hover": "rgba(0,0,0,0)",
        "--button_gradient_bottom_color_hover": "rgba(0,0,0,0)",
    },
    "outline": {
        "--button_accent_color": "var(--awb-custom11)",
        "--button_border_color": COLORS.gold,
        "--button_accent_hover_color": COLORS.brown,
        "--button_border_hover_color": COLORS.gold,
        "--button_gradient_top_color": COLORS.parchment,
        "--button_gradient_bottom_color": COLORS.parchment,
        "--button_gradient_top_color_hover": COLORS.gold,
        "--button_gradient_bottom_color_hover": COLORS.gold,
    },
}


def button(
    label: str,
    href: str,
    *,
    variant: str = "outline",
    target: str = "_self",
    align: str = "left",
) -> str:
    """A themed link button.

    ``variant`` is one of ``outline`` (on parchment), ``solid`` (rust), or
    ``ghost`` (on the dark band).
    """
    try:
        declarations = dict(_BUTTON_VARIANTS[variant])
    except KeyError:
        raise ValueError(
            f"unknown button variant {variant!r}; "
            f"expected one of {sorted(_BUTTON_VARIANTS)}"
        ) from None
    declarations.update(
        {f"--button_border_width-{side}": "2px"
         for side in ("top", "right", "bottom", "left")}
    )
    return (
        f'<div style="text-align:{align};">'
        f'<a class="fusion-button button-flat fusion-button-default-size '
        f'button-custom fusion-button-default fusion-button-default-span '
        f'fusion-button-default-type" style="{style(declarations)}" '
        f'target="{target}" href="{href}">'
        f'<span class="fusion-button-text awb-button__text awb-button__text--default">'
        f"{label}</span></a></div>"
    )


def button_row(buttons: Sequence[str], *, margin_top: str = "26px") -> str:
    """Centre one or more buttons on a single line."""
    inner = join(
        f'<span style="display:inline-block;margin:8px 6px 0;">{b}</span>'
        for b in buttons
    )
    return f'<div style="text-align:center;margin-top:{margin_top};">{inner}</div>'


# --------------------------------------------------------------------------- #
# content boxes
# --------------------------------------------------------------------------- #
def content_boxes(
    items: Iterable[Card],
    *,
    columns: int = 2,
    bg: str = COLORS.cream,
    heading_level: int = 3,
) -> str:
    """A responsive card grid.

    Deliberately omits Bootstrap ``col-*``/``row`` classes: ``.sok-boxes`` is a
    CSS grid, and the theme's float + clearfix rules would fight it.
    """
    cards = list(items)
    wrapper = {
        "--awb-backgroundcolor": bg,
        "--awb-border-radius-top-left": "3px",
        "--awb-border-radius-top-right": "3px",
        "--awb-border-radius-bottom-right": "3px",
        "--awb-border-radius-bottom-left": "3px",
        "--awb-body-color": COLORS.on_parchment_muted,
        "--awb-title-color": COLORS.ink,
        "--awb-hover-accent-color": COLORS.brown,
        "--awb-circle-hover-accent-color": COLORS.brown,
        "--awb-box-shadow": "0px 0px 0px 1px rgba(44,36,22,0.1) inset",
    }

    out = []
    for index, card in enumerate(cards):
        first = " content-box-column-first-in-row" if index % columns == 0 else ""
        last = (
            " content-box-column-last-in-row"
            if index % columns == columns - 1
            else ""
        )

        heading = (
            f'<h{heading_level} class="content-box-heading '
            f'fusion-responsive-typography-calculated" '
            f'style="--h3_typography-font-size:24px;--fontSize:24;line-height:1.35;">'
            f"{card.title}</h{heading_level}>"
        )
        if card.image:
            heading = (
                f'<div aria-hidden="true" class="image">'
                f'<img decoding="async" src="{card.image}" width="300" height="176"'
                f"{attrs(alt=card.title)}></div>"
            ) + heading
        if card.href:
            heading = (
                f'<a class="heading-link" href="{card.href}" target="_self">'
                f"{heading}</a>"
            )

        read_more = ""
        link_attr = ""
        link_class = ""
        if card.href:
            link_attr = f' data-link="{card.href}" data-link-target="_self"'
            link_class = "link-area-box link-type-text"
            read_more = (
                f'<div class="fusion-clearfix"></div>'
                f'<a class=" fusion-read-more" href="{card.href}" target="_self">'
                f"{card.link_text}</a>"
            )

        out.append(
            f'<div style="--awb-backgroundcolor:{bg};" class="content-box-column '
            f'content-box-column-{index + 1} fusion-content-box-hover{first}{last}">'
            f'<div class="content-box-wrapper content-wrapper-background '
            f'{link_class} content-icon-wrapper-yes icon-hover-animation-fade"'
            f"{link_attr}>"
            f'<div class="heading heading-with-icon icon-left">{heading}</div>'
            f'<div class="fusion-clearfix"></div>'
            f'<div class="content-container">{card.body}</div>'
            f"{read_more}</div></div>"
        )

    return (
        f'<div class="fusion-content-boxes sok-boxes sok-boxes--{columns} '
        f'fusion-columns-total-{len(cards)} content-boxes-icon-on-top content-left" '
        f'style="{style(wrapper)}" data-animationOffset="top-into-view">'
        f'{join(out)}</div>'
    )


def checklist(
    items: Iterable[str],
    *,
    icon: str = "fa-leaf fas",
    color: str = COLORS.brown,
) -> str:
    """An icon-led list, used for programme activities and the aims."""
    entries = join(
        f'<li class="fusion-li-item"><span class="icon-wrapper circle-no">'
        f'<i class="fusion-li-icon {icon}" style="color:{color};" '
        f'aria-hidden="true"></i></span>'
        f'<div class="fusion-li-item-content">{item}</div></li>'
        for item in items
    )
    return (
        f'<ul class="fusion-checklist sok-checklist" '
        f'style="--awb-circle-color:rgba(0,0,0,0);--awb-size:16px;'
        f'--awb-icon-color:{color};--awb-line-height:26.4px;'
        f'--awb-content-multiplier:15.2px;">{entries}</ul>'
    )


def ordered_aims(items: Sequence[str]) -> str:
    """The lettered aims list shown on the dark band."""
    rows = join(
        f'<div style="margin-bottom:22px;">'
        f'<span style="font-family:{SERIF};font-size:30px;'
        f'color:{COLORS.gold};margin-right:12px;">{chr(97 + index)}.</span>'
        f'<span style="font-size:18px;color:{COLORS.on_ink};">{item}</span></div>'
        for index, item in enumerate(items)
    )
    return f'<div style="max-width:800px;margin:24px auto 0;">{rows}</div>'


# --------------------------------------------------------------------------- #
# library / article components
# --------------------------------------------------------------------------- #
def verse(passage: Passage) -> str:
    """A quoted scripture passage, set as verse with its citation."""
    lines = "<br>".join(line if line else "&nbsp;" for line in passage.lines)
    out = (
        f'<blockquote class="sok-verse">'
        f'<p class="sok-verse__text">{lines}</p>'
        f'<cite class="sok-verse__cite">{passage.citation}</cite>'
        f"</blockquote>"
    )
    if passage.note:
        out += f'<p class="sok-verse__note">{passage.note}</p>'
    return out


def article_card(article, *, href: str, meta: str) -> str:
    """A single reading teaser in the library index."""
    return (
        f'<a class="sok-card"{attrs(href=href, data_topic=article.topic)}>'
        f'<span class="sok-card__topic">{article.topic}</span>'
        f'<h3 class="sok-card__title">{article.title}</h3>'
        f'<p class="sok-card__standfirst">{article.standfirst}</p>'
        f'<span class="sok-card__meta">{meta}</span>'
        f"</a>"
    )


def article_grid(cards: Iterable[str]) -> str:
    return f'<div class="sok-cardgrid">{join(cards)}</div>'


def filter_bar(topics: Iterable[str], *, active: str = "All") -> str:
    """Topic filter for the library index. Behaviour lives in ``site.js``."""
    buttons = join(
        f'<button type="button" class="sok-filter__btn'
        f'{" is-active" if topic == active else ""}"'
        f'{attrs(data_topic=topic)}>{topic}</button>'
        for topic in ["All", *topics]
    )
    return (
        f'<div class="sok-filter" role="group" '
        f'aria-label="Filter articles by topic">{buttons}</div>'
    )


def breadcrumb(items: Sequence[tuple[str, str | None]]) -> str:
    """Breadcrumb trail; the final entry is the current page."""
    parts = [
        f'<a href="{href}">{label}</a>'
        if href
        else f'<span aria-current="page">{label}</span>'
        for label, href in items
    ]
    separator_markup = "<span class='sok-crumb__sep'>/</span>"
    return (
        f'<nav class="sok-crumb" aria-label="Breadcrumb">'
        f"{separator_markup.join(parts)}</nav>"
    )


def pager(previous, next_) -> str:
    """Previous/next links between library articles."""
    from sok.navigation import article_url

    out = '<div class="sok-pager">'
    out += (
        f'<a href="{article_url(previous.slug)}">'
        f'<span class="sok-pager__label">Previous</span>{previous.title}</a>'
        if previous
        else "<span></span>"
    )
    out += (
        f'<a href="{article_url(next_.slug)}" style="text-align:right;">'
        f'<span class="sok-pager__label">Next</span>{next_.title}</a>'
        if next_
        else "<span></span>"
    )
    return out + "</div>"


def note(body: str) -> str:
    """A boxed editorial note (source attribution, draft warning)."""
    return f'<div class="sok-article__note">{body}</div>'
