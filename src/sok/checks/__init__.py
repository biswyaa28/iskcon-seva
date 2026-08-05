# -*- coding: utf-8 -*-
"""Post-build verification.

Every check exposes ``run() -> Report``. :data:`CHECKS` is the registry the CLI
walks, so adding a check means adding a module and one entry here.
"""
from __future__ import annotations

from collections.abc import Callable

from sok.checks import a11y, links, quotes
from sok.checks.report import Finding, Level, Report

#: Name -> runner. Order is the order they are reported in.
CHECKS: dict[str, Callable[[], Report]] = {
    "links": links.run,
    "a11y": a11y.run,
    "quotes": quotes.run,
}


def run(names: tuple[str, ...] = ()) -> list[Report]:
    """Run the named checks, or all of them."""
    selected = names or tuple(CHECKS)
    unknown = [n for n in selected if n not in CHECKS]
    if unknown:
        raise KeyError(
            f"unknown check(s) {unknown}; available: {sorted(CHECKS)}"
        )
    return [CHECKS[name]() for name in selected]


__all__ = ["CHECKS", "Finding", "Level", "Report", "a11y", "links", "quotes", "run"]
