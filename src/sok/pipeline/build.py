# -*- coding: utf-8 -*-
"""The build: validate content, generate pages, publish assets, verify.

Ordering matters and is enforced here rather than by the operator remembering
which script to run first:

1. **validate** content cross-references — fails in milliseconds if a key is
   wrong, before anything is written.
2. **publish** first-party assets, so the CSS/JS the pages link to exists.
3. **extract** the shell's inlined CSS into one cacheable bundle.
4. **generate** every page and re-shell the archive.
5. **prune** assets nothing references.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path

from sok.config import ROOT, BuildOptions
from sok.content import validate
from sok.pages import all_pages
from sok.pipeline import assets, legacy
from sok.render import Written, write


@dataclass
class BuildResult:
    """Everything the build produced, for reporting."""

    pages: list[Written] = field(default_factory=list)
    reshelled: list[legacy.Reshelled] = field(default_factory=list)
    skipped: list[legacy.Skipped] = field(default_factory=list)
    published: list[str] = field(default_factory=list)
    css_bytes: int = 0
    css_blocks: int = 0
    pruned: list[Path] = field(default_factory=list)
    pruned_bytes: int = 0

    @property
    def total_bytes(self) -> int:
        return sum(p.size for p in self.pages) + sum(r.size for r in self.reshelled)


def run(options: BuildOptions | None = None) -> BuildResult:
    """Build the whole site."""
    options = options or BuildOptions()
    result = BuildResult()

    # 1. Content must be self-consistent before we write anything.
    validate()

    # 2. First-party assets, so page links resolve.
    result.published = assets.publish(ROOT / "assets")

    # 3. Lift the shell's inlined CSS into one cacheable stylesheet.
    if options.extract_css:
        report = assets.build_bundle()
        result.css_bytes = report.css_bytes
        result.css_blocks = report.css_blocks

    # 4. Pages, then the inherited archive (which reuses the same shell).
    result.pages = [write(page) for page in all_pages()]
    result.reshelled, result.skipped = legacy.run()

    # 5. Drop what nothing references.
    if options.prune_assets:
        result.pruned, result.pruned_bytes = assets.prune()

    return result
