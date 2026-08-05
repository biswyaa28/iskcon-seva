# -*- coding: utf-8 -*-
"""Shared result types for the site checks.

Each check returns a :class:`Report`, so the CLI can print them uniformly and
decide the exit status in one place instead of every script inventing its own.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from enum import Enum


class Level(Enum):
    """How seriously to treat a finding."""

    ERROR = "error"
    WARNING = "warning"
    INFO = "info"


@dataclass(frozen=True)
class Finding:
    """A single problem, with enough context to fix it."""

    level: Level
    message: str
    where: tuple[str, ...] = ()

    def format(self, *, limit: int = 3) -> str:
        line = f"{self.level.value:>7}: {self.message}"
        if self.where:
            shown = ", ".join(sorted(self.where)[:limit])
            more = len(self.where) - limit
            if more > 0:
                shown += f" (+{more} more)"
            line += f"\n           on: {shown}"
        return line


@dataclass
class Report:
    """The outcome of one check."""

    name: str
    findings: list[Finding] = field(default_factory=list)
    checked: int = 0
    notes: list[str] = field(default_factory=list)

    def add(self, level: Level, message: str, where: tuple[str, ...] = ()) -> None:
        self.findings.append(Finding(level, message, where))

    def error(self, message: str, where: tuple[str, ...] = ()) -> None:
        self.add(Level.ERROR, message, where)

    def warn(self, message: str, where: tuple[str, ...] = ()) -> None:
        self.add(Level.WARNING, message, where)

    @property
    def errors(self) -> list[Finding]:
        return [f for f in self.findings if f.level is Level.ERROR]

    @property
    def warnings(self) -> list[Finding]:
        return [f for f in self.findings if f.level is Level.WARNING]

    @property
    def ok(self) -> bool:
        return not self.errors

    def summary(self) -> str:
        if not self.findings:
            return f"OK   {self.name}: {self.checked} checked, no issues"
        return (
            f"{'OK  ' if self.ok else 'FAIL'} {self.name}: {self.checked} checked, "
            f"{len(self.errors)} error(s), {len(self.warnings)} warning(s)"
        )
