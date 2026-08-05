# -*- coding: utf-8 -*-
"""Extract the reusable page shell from a mirrored HTML page.

Run once (``make shell``) after re-mirroring the source site. The result is
committed to ``data/shell/`` so ordinary builds never depend on the mirror.
"""
from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

from sok.config import SHELL, SITE

#: Boundary markers present in every mirrored Avada page.
BODY_OPEN = '<div class="post-content">'
MAIN_CLOSE = "</main>"
SECTION_TAIL = "\t</section>"


class ExtractError(RuntimeError):
    """Raised when a page does not have the expected structure."""


@dataclass(frozen=True)
class Extraction:
    head: str
    footer: str
    discarded: int


def split(markup: str) -> Extraction:
    """Split a mirrored page into its head+header and footer halves."""
    try:
        body_start = markup.index(BODY_OPEN) + len(BODY_OPEN)
        main_end = markup.index(MAIN_CLOSE)
    except ValueError as exc:
        raise ExtractError(
            "page does not look like an Avada mirror: "
            f"missing {BODY_OPEN!r} or {MAIN_CLOSE!r}"
        ) from exc

    tail = markup.rfind(SECTION_TAIL, body_start, main_end)
    if tail == -1:
        raise ExtractError("could not find the end of the page body")

    return Extraction(
        head=markup[:body_start],
        footer=markup[tail:],
        discarded=tail - body_start,
    )


def extract(source: Path | None = None) -> Extraction:
    """Extract the shell from ``source`` and write it to ``data/shell/``."""
    source = source or SITE / "index.html"
    if not source.exists():
        raise ExtractError(f"no mirrored page at {source}")

    result = split(source.read_text(encoding="utf-8", errors="ignore"))
    SHELL.mkdir(parents=True, exist_ok=True)
    (SHELL / "head_header.html").write_text(result.head, encoding="utf-8")
    (SHELL / "footer.html").write_text(result.footer, encoding="utf-8")
    return result
