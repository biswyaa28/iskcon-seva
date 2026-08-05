# -*- coding: utf-8 -*-
"""End-to-end: every page builds, is unique, and links correctly."""
from __future__ import annotations

import pytest

from sok.checks.links import _srcset_urls, references, resolve
from sok.config import SHELL
from sok.navigation import PROGRAM_SLUGS
from sok.pages import all_pages

requires_shell = pytest.mark.skipif(
    not (SHELL / "head_header.html").exists(),
    reason="page shell not extracted; run `make shell`",
)


@pytest.fixture(scope="module")
def pages():
    return all_pages()


class TestPageSet:
    def test_expected_number_of_pages(self, pages):
        # 5 foundation + contact + library index + 6 programmes + 12 articles
        assert len(pages) == 25

    def test_slugs_are_unique(self, pages):
        slugs = [p.slug for p in pages]
        assert len(set(slugs)) == len(slugs)

    def test_page_ids_are_unique(self, pages):
        ids = [p.page_id for p in pages]
        assert len(set(ids)) == len(ids)

    def test_every_page_has_metadata(self, pages):
        for page in pages:
            assert page.title.strip()
            assert page.description.strip()
            assert page.body.strip()

    def test_slugs_are_directory_style(self, pages):
        for page in pages:
            assert page.slug.startswith("/")
            assert page.slug.endswith("/")

    def test_every_programme_has_a_page(self, pages):
        slugs = {p.slug for p in pages}
        for key in PROGRAM_SLUGS:
            assert f"/programs/{key}/" in slugs

    def test_home_is_written_to_the_site_root(self, pages):
        home = next(p for p in pages if p.slug == "/")
        assert home.path.name == "index.html"
        assert home.path.parent.name == "site"


@requires_shell
class TestRendering:
    def test_rendered_page_is_a_complete_document(self, pages):
        from sok.render import render

        markup = render(pages[0])
        assert markup.lstrip().startswith("<!DOCTYPE")
        # The mirror emits a cache-timestamp comment after </html>.
        assert "</html>" in markup[-400:]

    def test_title_and_description_reach_the_head(self, pages):
        from sok.render import render

        page = next(p for p in pages if p.slug == "/donate/")
        markup = render(page)
        assert f"<title>{page.title}</title>" in markup
        assert page.description in markup

    def test_entities_are_not_double_escaped(self, pages):
        from sok.render import render

        page = next(p for p in pages if p.slug == "/objectives/")
        assert "&amp;amp;" not in render(page)

    def test_each_page_links_the_shared_bundle_once(self, pages):
        from sok.config import SITE_CSS
        from sok.render import render

        assert render(pages[0]).count(SITE_CSS) == 1

    def test_pages_are_not_identical(self, pages):
        from sok.render import render

        assert render(pages[0]) != render(pages[1])


class TestLinkHelpers:
    def test_srcset_splits_plain_candidates(self):
        assert _srcset_urls("/a.png 1x, /b.png 2x") == ["/a.png", "/b.png"]

    def test_srcset_does_not_split_inside_data_uris(self):
        value = "data:image/svg+xml;charset=utf8,%3Csvg%20a%3D%271%2C2%27%3E 1x"
        assert len(_srcset_urls(value)) == 1

    def test_references_ignores_external_and_inline_schemes(self):
        markup = (
            '<a href="https://example.com/x">e</a>'
            '<a href="mailto:a@b.c">m</a>'
            '<a href="#top">f</a>'
            '<a href="/real/">r</a>'
        )
        assert references(markup) == {"/real/"}

    def test_references_ignores_markup_inside_scripts(self):
        markup = '<script>/* <a href="..."> */</script><a href="/real/">r</a>'
        assert references(markup) == {"/real/"}

    def test_resolve_finds_directory_index(self):
        assert resolve("/") is True
