# -*- coding: utf-8 -*-
"""The library index and the individual article pages.

Each article pairs a verbatim scripture passage with the foundation's
commentary and links back to the objective it belongs to.
"""
from __future__ import annotations

from sok.config import BRAND, COLORS
from sok.content import (
    ARCHIVE_COLLECTIONS,
    ARTICLES,
    TOPICS,
    objective as get_objective,
    passage as get_passage,
)
from sok.navigation import ARTICLE_ID_BASE, PAGE_IDS, article_url, program_url
from sok.pages.common import band, hero
from sok.render import Page
from sok.render.components import (
    article_card,
    article_grid,
    breadcrumb,
    column,
    container,
    content_boxes,
    note,
    pager,
    section_heading,
    verse,
)
from sok.render.html import join

SOURCE_NOTE = (
    "<strong>About the text.</strong> Scripture on this page is quoted verbatim from "
    "<em>The Song Celestial, or Bhagavad-Gītā</em>, translated by Sir Edwin Arnold "
    "(1900), which is in the public domain. Chapter titles follow that edition. The "
    "commentary is the foundation's own and is offered as reflection, not as "
    "authoritative translation or as a substitute for study under qualified guidance."
)

DRAFT_NOTE = (
    "<strong>Draft.</strong> This commentary is working editorial prepared to "
    "demonstrate the site, and is pending review by the foundation."
)


def _objective_title(key: str) -> str:
    return get_objective(key).title


# --------------------------------------------------------------------- index --
def library() -> Page:
    body = hero(
        "SCRIPTURAL OUTREACH",
        "The Library",
        "Readings from the Bhagavad Gītā, each one connected to the work the "
        "foundation actually does. Free to read, free to reproduce with attribution.",
        size=42,
    )

    cards = [
        article_card(
            article,
            href=article_url(article.slug),
            meta=f"{article.reading} · {_objective_title(article.objective)}",
        )
        for article in ARTICLES
    ]

    from sok.render.components import filter_bar

    body += band(
        section_heading(
            "Readings",
            "Articles",
            sub="Twelve short readings, two for each of the foundation's six "
                "objectives.",
        )
        + filter_bar(TOPICS)
        + article_grid(cards),
        pad_top="66px",
        pad_bottom="56px",
    )

    body += band(
        f'<div class="sok-article__note" style="max-width:820px;margin:0 auto;">'
        f"{SOURCE_NOTE}</div>",
        pad_top="0px",
        pad_bottom="50px",
    )

    body += container(
        column(
            section_heading(
                "Also in the Library",
                "The Bhaktivinoda Archive",
                sub="An inherited collection of books, articles, songs, and recordings "
                    "held by this site.",
            )
        )
        + column(content_boxes(ARCHIVE_COLLECTIONS, columns=3)),
        bg=COLORS.alt_band,
        pad_top="62px",
        pad_bottom="62px",
    )

    return Page(
        slug="/library/",
        title=f"Library — {BRAND.name}",
        description="Readings from the Bhagavad Gita connected to the foundation's "
                    "work, plus an inherited archive.",
        body=body,
        page_id=PAGE_IDS["/library/"],
    )


# ------------------------------------------------------------------- article --
def article(current, previous=None, next_=None) -> Page:
    passage = get_passage(current.objective, current.passage_index)
    objective_title = _objective_title(current.objective)

    header = (
        breadcrumb([("Library", "/library/"), (current.title, None)])
        + f'<p class="sok-article__standfirst">{current.standfirst}</p>'
        + f'<div class="sok-article__meta">{current.topic} &nbsp;·&nbsp; '
        f"{current.reading} &nbsp;·&nbsp; "
        f'<a href="{program_url(current.objective)}" '
        f'style="color:{COLORS.brown};">{objective_title}</a></div>'
    )

    inner = verse(passage)
    inner += join(
        f"<h2>{section.heading}</h2><p>{section.body}</p>" for section in current.body
    )
    inner += note(DRAFT_NOTE) + note(SOURCE_NOTE)

    body = hero(current.topic.upper(), current.title, size=42)
    body += band(
        f'<div class="sok-article">{header}{inner}{pager(previous, next_)}</div>',
        pad_top="56px",
        pad_bottom="60px",
        max_width="900px",
    )

    from sok.pages.common import call_to_action

    body += call_to_action(
        "Support This Work",
        f"This reading belongs to our work on "
        f'<a href="{program_url(current.objective)}" style="color:{COLORS.gold};">'
        f"{objective_title.lower()}</a>.",
        "Get Involved",
        "/get-involved/",
        pad="56px",
    )

    return Page(
        slug=article_url(current.slug),
        title=f"{current.title} — {BRAND.name}",
        description=current.standfirst,
        body=body,
        page_id=ARTICLE_ID_BASE + ARTICLES.index(current),
    )


def all_articles() -> tuple[Page, ...]:
    """Every article page, with previous/next links wired up."""
    return tuple(
        article(
            current,
            previous=ARTICLES[index - 1] if index > 0 else None,
            next_=ARTICLES[index + 1] if index < len(ARTICLES) - 1 else None,
        )
        for index, current in enumerate(ARTICLES)
    )
