# -*- coding: utf-8 -*-
"""Chrome rebranding and the asset pipeline's CSS extraction."""
from __future__ import annotations

from sok.config import BRAND
from sok.pipeline.assets import extract_head_css
from sok.render.chrome import rebrand


class TestRebrand:
    def test_rewrites_legacy_absolute_urls_to_root_relative(self):
        markup = '<a href="https://bhaktivinodainstitute.org/audio/">A</a>'
        assert 'href="/audio/"' in rebrand(markup)

    def test_bare_domain_becomes_root(self):
        assert 'href="/"' in rebrand('<a href="https://bhaktivinodainstitute.org">H</a>')

    def test_never_leaves_a_dangling_scheme(self):
        out = rebrand('<img src="https://scienceofkrishna.org/wp-content/a.png">')
        assert "https://wp-content" not in out
        assert 'src="/wp-content/a.png"' in out

    def test_replaces_the_old_brand_name(self):
        out = rebrand("<p>The Bhaktivinoda Institute welcomes you</p>")
        assert BRAND.name in out
        assert "Bhaktivinoda Institute" not in out

    def test_strips_trackers(self):
        markup = '<script src="https://www.googletagmanager.com/gtag/js"></script><p>x</p>'
        out = rebrand(markup)
        assert "googletagmanager" not in out
        assert "<p>x</p>" in out

    def test_strips_the_meta_pixel_loader(self):
        markup = (
            "<!-- Meta Pixel Code -->\n<script>\n"
            "!function(f,b,e,v,n,t,s){t.src=v}(window,document,'script',\n"
            "'https://connect.facebook.net/en_US/fbevents.js');\n"
            "fbq('init','123');\n</script>\n<p>keep</p>"
        )
        out = rebrand(markup)
        assert "connect.facebook.net" not in out
        assert "fbq(" not in out
        assert "<p>keep</p>" in out

    def test_strips_inline_gtag_config(self):
        markup = (
            "<script>window.dataLayer=window.dataLayer||[];"
            "function gtag(){dataLayer.push(arguments);}"
            "gtag('config','G-XXXX');</script><p>keep</p>"
        )
        out = rebrand(markup)
        assert "gtag(" not in out
        assert "<p>keep</p>" in out

    def test_keeps_unrelated_scripts(self):
        markup = '<script>console.log("hello");</script>'
        assert rebrand(markup) == markup

    def test_strips_wordpress_feed_links(self):
        markup = '<link rel="alternate" type="application/rss+xml" href="/feed/">'
        assert "alternate" not in rebrand(markup)

    def test_is_idempotent(self):
        markup = '<a href="https://bhaktivinodainstitute.org/audio/">Institute</a>'
        once = rebrand(markup)
        assert rebrand(once) == once


class TestCssExtraction:
    def test_lifts_style_blocks_out_of_head(self):
        head = "<head><style>a{color:red}</style><title>T</title></head><body>"
        rewritten, stylesheet = extract_head_css(head)
        assert stylesheet == "a{color:red}"
        assert "<style>" not in rewritten
        assert "<title>T</title>" in rewritten

    def test_preserves_cascade_order(self):
        head = "<head><style>a{}</style><style>b{}</style></head>"
        _, stylesheet = extract_head_css(head)
        assert stylesheet == "a{}\nb{}"

    def test_leaves_body_styles_alone(self):
        head = "<head><style>a{}</style></head><body><style>b{}</style>"
        rewritten, stylesheet = extract_head_css(head)
        assert stylesheet == "a{}"
        assert "<style>b{}</style>" in rewritten

    def test_no_styles_is_a_noop(self):
        head = "<head><title>T</title></head>"
        rewritten, stylesheet = extract_head_css(head)
        assert stylesheet == ""
        assert rewritten == head
