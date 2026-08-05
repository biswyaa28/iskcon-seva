# -*- coding: utf-8 -*-
"""All site copy, as typed data.

Import from this package rather than its submodules::

    from sok.content import OBJECTIVES, ARTICLES, PROGRAMS

:func:`validate` cross-checks that the separate copy files agree with each
other and with the site's information architecture. The build calls it before
generating anything, so a mismatched key fails in under a second rather than
producing a site with dead links.
"""
from __future__ import annotations

from sok.content.articles import ARTICLES, BY_SLUG, TOPICS, for_objective
from sok.content.involvement import (
    ABOUT_GUIDANCE,
    ABOUT_STORY,
    ARCHIVE_COLLECTIONS,
    CRISIS_NOTICE,
    DONATION_USES,
    GET_INVOLVED,
    PRINCIPLES,
)
from sok.content.models import (
    Article,
    Card,
    Objective,
    Passage,
    Program,
    Section,
)
from sok.content.objectives import AIMS, BY_KEY, OBJECTIVES, objective
from sok.content.passages import PASSAGE_REFS, PassageError, passage, resolve
from sok.content.programs import PROGRAMS

__all__ = [
    "ABOUT_GUIDANCE",
    "ABOUT_STORY",
    "AIMS",
    "ARCHIVE_COLLECTIONS",
    "ARTICLES",
    "Article",
    "BY_KEY",
    "BY_SLUG",
    "CRISIS_NOTICE",
    "Card",
    "DONATION_USES",
    "GET_INVOLVED",
    "OBJECTIVES",
    "Objective",
    "PASSAGE_REFS",
    "PRINCIPLES",
    "PROGRAMS",
    "Passage",
    "PassageError",
    "Program",
    "Section",
    "TOPICS",
    "for_objective",
    "objective",
    "passage",
    "resolve",
    "validate",
]


class ContentError(ValueError):
    """Raised when the copy files contradict each other."""


def validate() -> None:
    """Assert every cross-reference in the content set resolves.

    Checks that objectives, programmes, navigation, articles, and scripture
    passages all agree. Raises :class:`ContentError` listing *every* problem
    found, not just the first.
    """
    from sok.navigation import PROGRAM_LABELS, PROGRAM_SLUGS

    problems: list[str] = []

    objective_keys = {o.key for o in OBJECTIVES}
    nav_keys = set(PROGRAM_SLUGS)

    if objective_keys != nav_keys:
        for key in sorted(objective_keys - nav_keys):
            problems.append(f"objective {key!r} is missing from navigation.PROGRAM_SLUGS")
        for key in sorted(nav_keys - objective_keys):
            problems.append(f"navigation lists {key!r} but no objective defines it")

    for key in sorted(objective_keys - set(PROGRAMS)):
        problems.append(f"objective {key!r} has no programme page copy")
    for key in sorted(set(PROGRAMS) - objective_keys):
        problems.append(f"programme {key!r} has no matching objective")
    for key in sorted(objective_keys - set(PROGRAM_LABELS)):
        problems.append(f"objective {key!r} has no navigation label")

    letters = [o.letter for o in OBJECTIVES]
    if len(set(letters)) != len(letters):
        problems.append(f"duplicate objective letters: {letters}")

    slugs = [a.slug for a in ARTICLES]
    if len(set(slugs)) != len(slugs):
        duplicates = sorted({s for s in slugs if slugs.count(s) > 1})
        problems.append(f"duplicate article slugs: {duplicates}")

    for article in ARTICLES:
        if article.objective not in objective_keys:
            problems.append(
                f"article {article.slug!r} references unknown objective "
                f"{article.objective!r}"
            )
            continue
        available = len(PASSAGE_REFS.get(article.objective, ()))
        if not 0 <= article.passage_index < available:
            problems.append(
                f"article {article.slug!r} wants passage {article.passage_index} "
                f"but objective {article.objective!r} defines {available}"
            )
        if not article.body:
            problems.append(f"article {article.slug!r} has no body sections")

    for key in sorted(objective_keys - set(PASSAGE_REFS)):
        problems.append(f"objective {key!r} has no scripture passages")

    if problems:
        raise ContentError(
            "content is inconsistent:\n  - " + "\n  - ".join(problems)
        )
