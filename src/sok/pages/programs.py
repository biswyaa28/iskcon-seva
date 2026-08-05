# -*- coding: utf-8 -*-
"""One long-form page per objective, cross-linked with the library."""
from __future__ import annotations

from sok.config import BRAND, COLORS
from sok.content import PROGRAMS, Card, for_objective, objective as get_objective
from sok.navigation import PROGRAM_ID_BASE, PROGRAM_SLUGS, article_url, program_url
from sok.pages.common import band, call_to_action, hero, notice
from sok.render import Page
from sok.render.components import (
    checklist,
    column,
    container,
    content_boxes,
    section_heading,
    separator,
    text,
    title,
)


def program(slug: str) -> Page:
    """Build the detail page for a single objective."""
    objective = get_objective(slug)
    detail = PROGRAMS[slug]

    body = hero(detail.eyebrow.upper(), objective.title, detail.lead)

    for index, section_ in enumerate(detail.sections):
        body += band(
            title(section_.heading, level=2, size=28, align="left")
            + separator(width="46px", margin_bottom="18px")
            + text(f"<p>{section_.body}</p>", size="17px", color=COLORS.on_parchment),
            alt=index % 2 == 1,
            pad_top="58px",
            pad_bottom="58px",
            max_width="900px",
        )

    body += band(
        title(detail.list_title, level=2, size=26, align="center")
        + separator()
        + f'<div style="max-width:720px;margin:0 auto;font-size:17px;">'
        f"{checklist(detail.items)}</div>",
        pad_top="60px",
        pad_bottom="60px",
    )

    if detail.note:
        body += notice(detail.note, pad="34px")

    related = for_objective(slug)
    if related:
        body += container(
            column(
                section_heading(
                    "From the Library",
                    "Further Reading",
                    sub="Passages of scripture behind this programme.",
                )
            )
            + column(
                content_boxes(
                    tuple(
                        Card(
                            title=article.title,
                            body=article.standfirst,
                            href=article_url(article.slug),
                            link_text="Read",
                        )
                        for article in related
                    ),
                    columns=2,
                )
            ),
            bg=COLORS.alt_band,
            pad_top="62px",
            pad_bottom="58px",
        )

    body += call_to_action(
        "Support This Work",
        "Volunteer your time, partner with us, or contribute to the programme.",
        "Get Involved",
        "/get-involved/",
    )

    return Page(
        slug=program_url(slug),
        title=f"{objective.title} — {BRAND.name}",
        description=detail.lead,
        body=body,
        page_id=PROGRAM_ID_BASE + PROGRAM_SLUGS.index(slug),
    )


def all_programs() -> tuple[Page, ...]:
    return tuple(program(slug) for slug in PROGRAM_SLUGS)
