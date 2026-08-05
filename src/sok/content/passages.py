# -*- coding: utf-8 -*-
"""Resolve verbatim scripture excerpts from the public-domain source text.

Nothing here is paraphrased. Each excerpt is a literal slice of *The Song
Celestial* (Sir Edwin Arnold, 1900 — Project Gutenberg #2388), located by an
anchor phrase so it can be re-verified against the source at any time. If the
source file changes and an anchor no longer matches, the build fails loudly
rather than silently emitting the wrong lines.
"""
from __future__ import annotations

import functools
import re
from dataclasses import dataclass

from sok.config import SOURCES
from sok.content.models import Passage

SOURCE_FILE = SOURCES / "gita_arnold.txt"

ROMAN = {
    "I": 1, "II": 2, "III": 3, "IV": 4, "V": 5, "VI": 6, "VII": 7, "VIII": 8, "IX": 9,
    "X": 10, "XI": 11, "XII": 12, "XIII": 13, "XIV": 14, "XV": 15, "XVI": 16,
    "XVII": 17, "XVIII": 18,
}

#: Project Gutenberg footnote markers, stripped from quoted lines.
_FOOTNOTE = re.compile(r"\[FN#\d+\]")
_CHAPTER_HEAD = re.compile(r"^\s*CHAPTER ([IVX]+)\s*$", re.M)


class PassageError(RuntimeError):
    """Raised when the source text no longer matches an expected anchor."""


@dataclass(frozen=True)
class PassageRef:
    """A pointer into the source text, resolved lazily into a :class:`Passage`."""

    chapter: str
    anchor: str
    lines: int
    note: str


@dataclass(frozen=True)
class Chapter:
    body: str
    sanskrit: str
    english: str


@functools.lru_cache(maxsize=1)
def _source() -> str:
    if not SOURCE_FILE.exists():
        raise PassageError(
            f"scripture source missing: {SOURCE_FILE}. "
            "It is required to build the library."
        )
    return SOURCE_FILE.read_text(encoding="utf-8")


@functools.lru_cache(maxsize=1)
def chapters() -> dict[str, Chapter]:
    """Split the source into chapters, capturing each one's titles."""
    text = _source()
    out: dict[str, Chapter] = {}
    for match in _CHAPTER_HEAD.finditer(text):
        num, start = match.group(1), match.start()
        end = text.find("HERE END", start)
        if end == -1:
            raise PassageError(f"chapter {num} has no terminator in the source text")
        tail = text[end:end + 400]
        sanskrit = re.search(r'Entitled\s+"([^"]+)"', tail)
        english = re.search(r'Or\s+"([^"]+)"', tail)
        out[num] = Chapter(
            body=text[start:end],
            sanskrit=sanskrit.group(1).rstrip(",") if sanskrit else "",
            english=(
                re.sub(r"\s+", " ", english.group(1)).rstrip(",.") if english else ""
            ),
        )
    return out


def excerpt(chapter: str, anchor: str, count: int) -> tuple[str, ...]:
    """Return ``count`` verbatim lines from ``chapter``, starting at ``anchor``."""
    try:
        body = chapters()[chapter].body
    except KeyError:
        raise PassageError(f"no chapter {chapter!r} in the source text") from None

    start = body.find(anchor)
    if start == -1:
        raise PassageError(
            f"anchor not found in chapter {chapter}: {anchor!r}. "
            "The source text may have changed."
        )

    block = "\n".join(body[start:].splitlines()[:count])
    lines = [_FOOTNOTE.sub("", line).strip() for line in block.strip().splitlines()]
    while lines and not lines[-1]:
        lines.pop()
    return tuple(lines)


# --------------------------------------------------------------------------- #
# Passage map: objective -> verbatim excerpts
# --------------------------------------------------------------------------- #
PASSAGE_REFS: dict[str, tuple[PassageRef, ...]] = {
    'scriptural-outreach': (
        PassageRef(
            chapter='IV',
            anchor='This deathless Yoga, this deep union',
            lines=9,
            note='Krishna describes how the teaching was handed down, lost, and declared '
                 'again — the reason a tradition must keep retelling itself.',
        ),
        PassageRef(
            chapter='IV',
            anchor='The sacrifice\n  Which Knowledge pays',
            lines=8,
            note='Knowledge given freely is valued above wealth given richly.',
        ),
    ),
    'prasadam-distribution': (
        PassageRef(
            chapter='XVII',
            anchor='Hear this of Me! there is a food',
            lines=11,
            note='The three kinds of food, and what each does to the one who eats it.',
        ),
        PassageRef(
            chapter='XVII',
            anchor='The gift lovingly given',
            lines=5,
            note='The definition of a true gift: given gladly, to one who can return nothing.',
        ),
    ),
    'temple-seva': (
        PassageRef(
            chapter='XVII',
            anchor='Worship of gods\n  Meriting worship',
            lines=6,
            note='What constitutes true religiousness of act.',
        ),
        PassageRef(
            chapter='XVIII',
            anchor='Renunciation is of threefold form',
            lines=6,
            note='Worship, penance and alms are never to be abandoned.',
        ),
    ),
    'drug-free-society': (
        PassageRef(
            chapter='III',
            anchor='Kama it is!',
            lines=16,
            note='Desire described as the enemy that clouds judgement — the clearest '
                 'account of addiction in the text.',
        ),
        PassageRef(
            chapter='XVI',
            anchor='The Doors of Hell',
            lines=8,
            note='Lust, wrath and avarice named as the three gates to ruin.',
        ),
    ),
    'counseling-support': (
        PassageRef(
            chapter='VI',
            anchor='Let each man raise',
            lines=6,
            note='The self can be its own friend or its own enemy — the premise of every '
                 'counseling conversation.',
        ),
        PassageRef(
            chapter='XII',
            anchor='Who hateth nought',
            lines=8,
            note='The qualities of one who is safe to bring your troubles to.',
        ),
    ),
    'workshops-partnerships': (
        PassageRef(
            chapter='VI',
            anchor='Being of equal grace to comrades',
            lines=5,
            note='Equal regard for strangers, friends, and opponents alike.',
        ),
        PassageRef(
            chapter='III',
            anchor='Finally, this is better',
            lines=5,
            note="On doing one's own work faithfully rather than borrowing another's.",
        ),
    ),}


@functools.lru_cache(maxsize=1)
def resolve() -> dict[str, tuple[Passage, ...]]:
    """Resolve every reference to verbatim lines, keyed by objective.

    Cached, so the source file is parsed once per process no matter how many
    pages ask for it.
    """
    out: dict[str, tuple[Passage, ...]] = {}
    for key, refs in PASSAGE_REFS.items():
        resolved = []
        for ref in refs:
            chapter = chapters()[ref.chapter]
            resolved.append(
                Passage(
                    chapter=ref.chapter,
                    chapter_no=ROMAN[ref.chapter],
                    sanskrit=chapter.sanskrit,
                    english=chapter.english,
                    lines=excerpt(ref.chapter, ref.anchor, ref.lines),
                    note=ref.note,
                )
            )
        out[key] = tuple(resolved)
    return out


def passage(objective: str, index: int) -> Passage:
    """Return a single resolved passage."""
    try:
        return resolve()[objective][index]
    except (KeyError, IndexError):
        raise PassageError(
            f"no passage {index} for objective {objective!r}"
        ) from None
