# -*- coding: utf-8 -*-
"""Static site generator for the Science of Krishna foundation.

The public site under ``site/`` is plain static HTML: no runtime, no server, no
database. This package is the tooling that generates it.

Layout::

    config.py       paths, branding, design tokens
    navigation.py   information architecture (menus, routes, page ids)
    content/        all site copy, as typed data
    render/         markup generation (primitives, components, chrome, pages)
    pages/          one module per group of pages
    pipeline/       build steps (shell, assets, legacy, orchestration)
    checks/         post-build verification

Typical use is through the CLI::

    python -m sok build --strict
"""
from __future__ import annotations

__version__ = "1.0.0"

__all__ = ["__version__"]
