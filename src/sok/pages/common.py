# -*- coding: utf-8 -*-
"""Page-level building blocks shared by more than one page."""
from __future__ import annotations

from collections.abc import Sequence

from sok.config import COLORS
from sok.render.components import (
    button,
    button_row,
    centered,
    column,
    container,
    section,
    separator,
    text,
    title,
)


def hero(
    kicker: str | None,
    heading: str,
    sub: str | None = None,
    buttons: Sequence[tuple[str, str, str]] = (),
    *,
    size: int = 40,
    pad: str = "70px",
) -> str:
    """The dark banner that opens every page.

    ``buttons`` entries are ``(label, href, variant)``.
    """
    inner = ""
    if kicker:
        inner += text(
            f'<p style="text-align:center;letter-spacing:3px;">{kicker}</p>',
            size="14px",
            color=COLORS.gold,
        )
    inner += title(
        heading,
        level=1,
        size=size,
        align="center",
        color=COLORS.parchment,
        margin_bottom="1.5%",
    )
    inner += separator(color=COLORS.gold, width="70px")
    if sub:
        inner += text(
            centered(sub, max_width="760px"),
            size="18px",
            color=COLORS.on_ink_muted,
        )
    if buttons:
        inner += button_row(
            [button(label, href, variant=variant, align="center")
             for label, href, variant in buttons]
        )
    return section(inner, bg=COLORS.ink, pad_top=pad, pad_bottom=pad)


def call_to_action(
    heading: str,
    body: str,
    label: str,
    href: str,
    *,
    pad: str = "60px",
) -> str:
    """A closing dark band inviting the reader to act."""
    inner = title(heading, level=2, size=28, align="center", color=COLORS.parchment)
    inner += separator(color=COLORS.gold)
    inner += text(
        centered(body, max_width="640px"), size="17px", color=COLORS.on_ink_muted
    )
    inner += button_row([button(label, href, variant="ghost", align="center")],
                        margin_top="20px")
    return section(inner, bg=COLORS.ink, pad_top=pad, pad_bottom=pad)


def notice(body: str, *, pad: str = "40px") -> str:
    """A short highlighted advisory on the dark band."""
    return section(
        text(centered(body), size="16px", color=COLORS.gold),
        bg=COLORS.ink,
        pad_top=pad,
        pad_bottom=pad,
    )


def band(inner: str, *, alt: bool = False, **kwargs) -> str:
    """A light content band; ``alt`` uses the secondary parchment tone."""
    return section(inner, bg=COLORS.alt_band if alt else COLORS.parchment, **kwargs)


def two_column(left: str, right: str, *, split: str = "50%", **kwargs) -> str:
    """A two-column band that stacks on small screens."""
    remainder = f"{100 - float(split.rstrip('%')):g}%"
    return container(
        column(left, width=split, width_sm="100%")
        + column(right, width=remainder, width_sm="100%"),
        **kwargs,
    )
