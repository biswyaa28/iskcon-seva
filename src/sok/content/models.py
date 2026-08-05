# -*- coding: utf-8 -*-
"""Typed records for site copy.

Using dataclasses instead of bare dicts means a missing field is an error at
import time rather than a ``KeyError`` halfway through a build, and editors can
autocomplete the fields.
"""
from __future__ import annotations

from dataclasses import dataclass, field


@dataclass(frozen=True)
class Objective:
    """One of the objectives set out in the foundation's trust deed."""

    key: str
    letter: str
    title: str
    short: str
    body: str


@dataclass(frozen=True)
class Section:
    """A heading + paragraph pair inside a programme page."""

    heading: str
    body: str


@dataclass(frozen=True)
class Program:
    """The long-form detail page for a single objective."""

    eyebrow: str
    lead: str
    sections: tuple[Section, ...]
    list_title: str
    items: tuple[str, ...]
    note: str | None = None


@dataclass(frozen=True)
class Card:
    """A generic title/body pair rendered as a content box."""

    title: str
    body: str
    href: str | None = None
    link_text: str = "Read More"
    image: str | None = None


@dataclass(frozen=True)
class Passage:
    """A verbatim scripture excerpt resolved from the source text."""

    chapter: str
    chapter_no: int
    sanskrit: str
    english: str
    lines: tuple[str, ...]
    note: str

    @property
    def citation(self) -> str:
        """Human-readable citation line shown beneath the verse."""
        tail = f" ({self.english})" if self.english else ""
        return f"Bhagavad Gītā, Chapter {self.chapter} — {self.sanskrit}{tail}"


@dataclass(frozen=True)
class Article:
    """A library reading: one passage plus the foundation's commentary."""

    slug: str
    objective: str
    title: str
    standfirst: str
    reading: str
    topic: str
    passage_index: int
    body: tuple[Section, ...] = field(default_factory=tuple)
