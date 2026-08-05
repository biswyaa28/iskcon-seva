# -*- coding: utf-8 -*-
"""Build steps: shell extraction, asset handling, page generation, archive."""
from __future__ import annotations

from sok.pipeline import assets, build, legacy, shell
from sok.pipeline.build import BuildResult, run

__all__ = ["BuildResult", "assets", "build", "legacy", "run", "shell"]
