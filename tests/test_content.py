# -*- coding: utf-8 -*-
"""The content set must be internally consistent — this is the fastest guard."""
from __future__ import annotations

import pytest

from sok.content import (
    AIMS,
    ARTICLES,
    OBJECTIVES,
    PROGRAMS,
    ContentError,
    for_objective,
    objective,
    resolve,
    validate,
)
from sok.navigation import PROGRAM_LABELS, PROGRAM_SLUGS


def test_content_validates():
    validate()


def test_every_objective_has_a_programme_and_a_label():
    for item in OBJECTIVES:
        assert item.key in PROGRAMS
        assert item.key in PROGRAM_LABELS
        assert item.key in PROGRAM_SLUGS


def test_objective_lookup_reports_unknown_keys():
    with pytest.raises(KeyError, match="unknown objective"):
        objective("no-such-objective")


def test_objectives_are_lettered_uniquely():
    letters = [item.letter for item in OBJECTIVES]
    assert letters == sorted(letters)
    assert len(set(letters)) == len(letters)


def test_there_are_three_aims():
    assert len(AIMS) == 3
    assert all(aim.strip() for aim in AIMS)


def test_article_slugs_are_unique_and_url_safe():
    slugs = [a.slug for a in ARTICLES]
    assert len(set(slugs)) == len(slugs)
    for slug in slugs:
        assert slug == slug.lower()
        assert " " not in slug


def test_every_objective_has_two_readings():
    for item in OBJECTIVES:
        assert len(for_objective(item.key)) == 2


def test_every_article_resolves_to_a_passage():
    passages = resolve()
    for article in ARTICLES:
        available = passages[article.objective]
        assert 0 <= article.passage_index < len(available)
        assert available[article.passage_index].lines


def test_passages_are_non_empty_and_cited():
    for rows in resolve().values():
        for passage in rows:
            assert passage.lines
            assert passage.citation.startswith("Bhagavad Gītā")
            assert passage.note
