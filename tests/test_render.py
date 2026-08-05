# -*- coding: utf-8 -*-
"""Component and primitive rendering."""
from __future__ import annotations

import pytest

from sok.content.models import Card, Passage
from sok.render.components import (
    breadcrumb,
    button,
    checklist,
    container,
    content_boxes,
    filter_bar,
    title,
    verse,
)
from sok.render.html import attrs, esc, style


class TestPrimitives:
    def test_style_drops_none(self):
        assert style({"color": "red", "width": None}) == "color:red;"

    def test_attrs_renders_flags_and_hyphenates(self):
        assert attrs(hidden=True, data_topic="Seva") == ' hidden data-topic="Seva"'

    def test_attrs_omits_none_and_false(self):
        assert attrs(alt=None, hidden=False) == ""

    def test_attrs_strips_trailing_underscore(self):
        assert attrs(class_="x") == ' class="x"'

    @pytest.mark.parametrize(
        "raw,expected",
        [
            ("A &amp; B", "A &amp; B"),      # already escaped: not doubled
            ("A & B", "A &amp; B"),          # plain: escaped once
            ('say "hi"', "say &quot;hi&quot;"),
        ],
    )
    def test_escaping_is_idempotent(self, raw, expected):
        assert esc(raw) == expected


class TestComponents:
    def test_title_uses_requested_heading_level(self):
        assert "<h1 " in title("Hello", level=1)
        assert "</h1>" in title("Hello", level=1)

    def test_button_rejects_unknown_variant(self):
        with pytest.raises(ValueError, match="unknown button variant"):
            button("Go", "/", variant="neon")

    @pytest.mark.parametrize("variant", ["solid", "ghost", "outline"])
    def test_button_variants_render(self, variant):
        markup = button("Go", "/x/", variant=variant)
        assert 'href="/x/"' in markup
        assert "Go" in markup

    def test_content_box_without_href_has_no_read_more(self):
        markup = content_boxes([Card(title="T", body="B")])
        assert "fusion-read-more" not in markup
        assert "heading-link" not in markup

    def test_content_box_with_href_links_twice(self):
        markup = content_boxes([Card(title="T", body="B", href="/a/")])
        assert markup.count('href="/a/"') >= 2
        assert "fusion-read-more" in markup

    def test_content_boxes_marks_row_boundaries(self):
        cards = [Card(title=str(n), body="b") for n in range(4)]
        markup = content_boxes(cards, columns=2)
        assert markup.count("content-box-column-first-in-row") == 2
        assert markup.count("content-box-column-last-in-row") == 2

    def test_checklist_emits_one_item_each(self):
        markup = checklist(["a", "b", "c"])
        assert markup.count("fusion-li-item-content") == 3

    def test_filter_bar_marks_active_and_prepends_all(self):
        markup = filter_bar(["Scripture", "Seva"])
        assert markup.count("sok-filter__btn") == 3
        assert 'data-topic="All"' in markup
        assert markup.count("is-active") == 1

    def test_breadcrumb_marks_current_page(self):
        markup = breadcrumb([("Library", "/library/"), ("Here", None)])
        assert 'href="/library/"' in markup
        assert 'aria-current="page"' in markup

    def test_verse_renders_lines_citation_and_note(self):
        passage = Passage(
            chapter="IV",
            chapter_no=4,
            sanskrit="Jnana Yog",
            english="Knowledge",
            lines=("one", "two"),
            note="a note",
        )
        markup = verse(passage)
        assert "one<br>two" in markup
        assert "Chapter IV" in markup
        assert "a note" in markup

    def test_container_applies_background(self):
        assert "--awb-background-color:#fff;" in container("x", bg="#fff")
