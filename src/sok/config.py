# -*- coding: utf-8 -*-
"""Single source of truth for paths, branding, and design tokens.

Every other module imports from here rather than recomputing ``__file__``
relatives, so moving the project or renaming a directory is a one-line change.
"""
from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

# --------------------------------------------------------------------- paths --
# src/sok/config.py -> src/sok -> src -> <repo root>
ROOT = Path(__file__).resolve().parents[2]

SITE = ROOT / "site"
DATA = ROOT / "data"
SHELL = DATA / "shell"
SOURCES = DATA / "sources"
TMP = ROOT / ".tmp"

#: Directory (inside ``SITE``) holding first-party, build-managed assets.
ASSETS_DIR = "assets"

#: Root-relative URL prefix for first-party assets.
ASSETS_URL = f"/{ASSETS_DIR}"

#: Extracted shared stylesheet + script, written by the asset pipeline.
BUNDLE_CSS = f"{ASSETS_URL}/css/bundle.css"
SITE_CSS = f"{ASSETS_URL}/css/site.css"
SITE_JS = f"{ASSETS_URL}/js/site.js"


# ------------------------------------------------------------------- branding --
@dataclass(frozen=True)
class Brand:
    """Identity strings used across every generated page."""

    name: str = "Science of Krishna"
    legal_name: str = "Science of Krishna Foundation"
    email: str = "contact@scienceofkrishna.org"
    domain: str = "https://scienceofkrishna.org"
    tagline: str = (
        "A charitable foundation spreading the message of the Bhagavad-gītā "
        "and Śrīmad Bhāgavatam, feeding the needy, and serving society."
    )
    logo: str = f"{ASSETS_URL}/img/logo.png"
    logo_2x: str = f"{ASSETS_URL}/img/logo@2x.png"


BRAND = Brand()

#: Domains of the mirrored source site, rewritten away at build time.
LEGACY_DOMAINS = ("bhaktivinodainstitute.org",)
LEGACY_BRAND_NAMES = ("The Bhaktivinoda Institute", "Bhaktivinoda Institute")


# -------------------------------------------------------------- design tokens --
@dataclass(frozen=True)
class Palette:
    """Colour tokens inherited from the original theme.

    Values are CSS custom-property references so a future rebrand only has to
    change the stylesheet, never the Python.
    """

    parchment: str = "var(--awb-custom_color_1)"
    tan: str = "var(--awb-custom_color_2)"
    gold: str = "var(--awb-custom_color_3)"
    ink: str = "var(--awb-custom_color_4)"
    brown: str = "var(--awb-custom_color_6)"
    rust: str = "var(--primary_color)"

    # Literals, required where the theme has no token.
    alt_band: str = "#ece4d4"
    cream: str = "#fff8f0"

    # Text on dark backgrounds.
    on_ink: str = "rgba(245,240,232,0.85)"
    on_ink_muted: str = "rgba(245,240,232,0.78)"
    on_parchment: str = "rgba(44,36,22,0.82)"
    on_parchment_muted: str = "rgba(44,36,22,0.75)"


COLORS = Palette()

SERIF = "'Cormorant Garamond',Garamond,serif"


# ------------------------------------------------------------------ pipeline --
@dataclass(frozen=True)
class BuildOptions:
    """Flags controlling how the site is generated."""

    #: Extract inlined ``<style>`` blocks into one cacheable stylesheet.
    extract_css: bool = True
    #: Drop assets no page references.
    prune_assets: bool = True
    #: Fail the build when a check reports an error.
    strict: bool = False
