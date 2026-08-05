# -*- coding: utf-8 -*-
"""The foundation's core pages: home, objectives, about, get involved, donate."""
from __future__ import annotations

from sok.config import BRAND, COLORS, SERIF
from sok.content import (
    ABOUT_GUIDANCE,
    ABOUT_STORY,
    AIMS,
    ARTICLES,
    DONATION_USES,
    GET_INVOLVED,
    OBJECTIVES,
    PRINCIPLES,
    Card,
)
from sok.navigation import PAGE_IDS, article_url, program_url
from sok.pages.common import band, call_to_action, hero, two_column
from sok.render import Page
from sok.render.components import (
    button,
    checklist,
    column,
    container,
    content_boxes,
    ordered_aims,
    section_heading,
    separator,
    text,
    title,
)
from sok.render.html import paragraphs


def _objective_cards() -> tuple[Card, ...]:
    return tuple(
        Card(
            title=objective.title,
            body=objective.short,
            href=program_url(objective.key),
            link_text="Learn More",
        )
        for objective in OBJECTIVES
    )


def _article_cards(articles) -> tuple[Card, ...]:
    return tuple(
        Card(
            title=article.title,
            body=article.standfirst,
            href=article_url(article.slug),
            link_text="Read",
        )
        for article in articles
    )


# ---------------------------------------------------------------------- home --
def home() -> Page:
    body = hero(
        "SERVING SOCIETY THROUGH SPIRIT",
        BRAND.name,
        "A charitable foundation dedicated to spreading the message of the Bhagavad "
        "Gītā and Śrīmad Bhāgavatam, feeding the hungry, serving temples, and standing "
        "beside those facing their most difficult days.",
        [
            ("Our Objectives", "/objectives/", "solid"),
            ("Get Involved", "/get-involved/", "ghost"),
        ],
        size=52,
        pad="90px",
    )

    body += container(
        column(
            section_heading(
                "What We Do",
                "Our Objectives",
                sub="Six commitments set out in the foundation's trust deed.",
            )
        )
        + column(content_boxes(_objective_cards(), columns=3)),
        bg=COLORS.parchment,
        pad_top="70px",
        pad_bottom="60px",
    )

    body += two_column(
        title("Our Aims", level=2, size=30, align="left", color=COLORS.parchment,
              margin_bottom="3%")
        + text(
            "<p>The trust exists to serve three enduring purposes.</p>",
            size="17px",
            color="rgba(245,240,232,0.7)",
        ),
        f'<div style="color:{COLORS.on_ink};font-size:17px;">'
        f"{checklist(AIMS, color=COLORS.gold)}</div>",
        split="40%",
        bg=COLORS.ink,
        pad_top="64px",
        pad_bottom="64px",
    )

    featured = (ARTICLES[0], ARTICLES[2], ARTICLES[6])
    body += container(
        column(
            section_heading(
                "The Foundation of Our Work",
                "Wisdom That Answers the Deepest Questions",
                sub="Every programme we run rests on the teachings of the Bhagavad Gītā "
                    "and the Śrīmad Bhāgavatam. Our library is open to all, without "
                    "charge.",
            )
        )
        + column(content_boxes(_article_cards(featured), columns=3))
        + column(
            f'<div style="text-align:center;margin-top:14px;">'
            f'{button("Explore the Library", "/library/", align="center")}</div>'
        ),
        bg=COLORS.alt_band,
        pad_top="66px",
        pad_bottom="66px",
    )

    body += container(
        column(section_heading("Join Us", "How You Can Help"))
        + column(content_boxes(GET_INVOLVED, columns=2)),
        bg=COLORS.parchment,
        pad_top="70px",
        pad_bottom="70px",
    )

    return Page(
        slug="/",
        title=f"{BRAND.name} — Spiritual Wisdom, Food, and Care for Society",
        description=BRAND.tagline,
        body=body,
        page_id=PAGE_IDS["/"],
    )


# ---------------------------------------------------------------- objectives --
def objectives() -> Page:
    body = hero(
        "OUR MANDATE",
        "Objectives &amp; Aims",
        "The purposes for which the foundation was established, as set out in its "
        "trust deed.",
    )

    for objective in OBJECTIVES:
        left = text(
            f'<p style="font-size:46px;line-height:1;color:{COLORS.gold};'
            f'font-family:{SERIF};">({objective.letter})</p>'
        ) + title(objective.title, level=2, size=24, align="left", margin_bottom="2%")
        right = (
            text(f"<p><em>{objective.short}</em></p>", size="16px", color=COLORS.brown)
            + text(f"<p>{objective.body}</p>", size="17px",
                   color=COLORS.on_parchment_muted)
            + button("Read More", program_url(objective.key))
        )
        body += two_column(
            left,
            right,
            split="33.33%",
            bg=COLORS.parchment if objective.letter in "ace" else COLORS.alt_band,
            pad_top="52px",
            pad_bottom="52px",
        )

    body += container(
        column(
            '<div id="aims"></div>'
            + title("Our Aims", level=2, size=32, align="center",
                    color=COLORS.parchment)
            + separator(color=COLORS.gold)
            + ordered_aims(AIMS)
        ),
        bg=COLORS.ink,
        pad_top="70px",
        pad_bottom="70px",
    )

    return Page(
        slug="/objectives/",
        title=f"Objectives &amp; Aims — {BRAND.name}",
        description="The six objectives and three aims of the Science of Krishna "
                    "foundation.",
        body=body,
        page_id=PAGE_IDS["/objectives/"],
    )


# --------------------------------------------------------------------- about --
def about() -> Page:
    body = hero(
        "WHO WE ARE",
        "About the Foundation",
        "Science of Krishna is a charitable trust working where spiritual practice and "
        "practical service meet.",
    )

    body += band(
        title("Our Story", level=2, size=30, align="left")
        + separator(width="46px", margin_bottom="18px")
        + text(paragraphs(ABOUT_STORY), size="17px", color=COLORS.on_parchment),
        pad_top="64px",
        pad_bottom="60px",
        max_width="900px",
    )

    body += container(
        column(
            title("What Guides Us", level=2, size=30, align="left",
                  color=COLORS.parchment)
            + separator(width="46px", color=COLORS.gold, margin_bottom="18px")
            + text(f"<p>{ABOUT_GUIDANCE}</p>", size="17px", color=COLORS.on_ink_muted)
            + button("Read Our Objectives", "/objectives/", variant="ghost")
        ),
        bg=COLORS.ink,
        pad_top="64px",
        pad_bottom="64px",
        max_width="900px",
    )

    body += container(
        column(section_heading("Our Principles", "How We Work"))
        + column(content_boxes(PRINCIPLES, columns=2)),
        bg=COLORS.parchment,
        pad_top="66px",
        pad_bottom="66px",
    )

    return Page(
        slug="/about-us/",
        title=f"About Us — {BRAND.name}",
        description="Science of Krishna is a charitable foundation spreading scriptural "
                    "wisdom and serving society.",
        body=body,
        page_id=PAGE_IDS["/about-us/"],
    )


# -------------------------------------------------------------- get involved --
def get_involved() -> Page:
    body = hero(
        "JOIN THE WORK",
        "Get Involved",
        "Every programme the foundation runs depends on people who give time, skill, "
        "or support.",
    )

    body += band(
        content_boxes(GET_INVOLVED, columns=2, heading_level=2),
        pad_top="66px",
        pad_bottom="60px",
    )

    body += call_to_action(
        "Ready to Begin?",
        "Write to us with how you would like to help, and we will point you to the "
        "programme that fits you best.",
        "Contact Us",
        "/contact-us/",
        pad="64px",
    )

    return Page(
        slug="/get-involved/",
        title=f"Get Involved — {BRAND.name}",
        description="Volunteer, donate, partner, or sponsor a programme with the "
                    "Science of Krishna foundation.",
        body=body,
        page_id=PAGE_IDS["/get-involved/"],
    )


# -------------------------------------------------------------------- donate --
def donate() -> Page:
    body = hero(
        "SUPPORT THE WORK",
        "Donate",
        "Your contribution becomes meals served, scriptures distributed, temples "
        "supported, and people helped through their hardest days.",
    )

    body += container(
        column(section_heading("Where It Goes", "Your Contribution at Work"))
        + column(content_boxes(DONATION_USES, columns=2)),
        bg=COLORS.parchment,
        pad_top="66px",
        pad_bottom="60px",
    )

    body += call_to_action(
        "Donation Details",
        "Bank details and online giving options will be published here. In the "
        "meantime, please write to us and we will arrange your contribution directly.",
        "Contact Us to Donate",
        "/contact-us/",
        pad="64px",
    )

    return Page(
        slug="/donate/",
        title=f"Donate — {BRAND.name}",
        description="Support meals, scripture distribution, temple sevā, and counseling "
                    "programmes.",
        body=body,
        page_id=PAGE_IDS["/donate/"],
    )


PAGES = (home, objectives, about, get_involved, donate)
