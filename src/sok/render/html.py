# -*- coding: utf-8 -*-
"""Small helpers shared by every component.

Keeping escaping and inline-style construction in one place means a fix here
applies to the whole site, and makes the component modules read as markup
rather than string plumbing.
"""
from __future__ import annotations

import html
from collections.abc import Iterable, Mapping


def style(properties: Mapping[str, str | None]) -> str:
    """Render a CSS declaration block, dropping ``None`` values.

    ``None`` means "not set", which lets components declare an optional
    property without branching around it.
    """
    return "".join(f"{k}:{v};" for k, v in properties.items() if v is not None)


def attrs(**pairs: str | bool | None) -> str:
    """Render HTML attributes, dropping ``None``/``False`` and handling flags.

    Trailing underscores are stripped so Python keywords can be used
    (``class_`` -> ``class``), and remaining underscores become hyphens
    (``data_topic`` -> ``data-topic``).
    """
    out = []
    for key, value in pairs.items():
        if value is None or value is False:
            continue
        name = key.rstrip("_").replace("_", "-")
        if value is True:
            out.append(f" {name}")
        else:
            out.append(f' {name}="{esc(str(value))}"')
    return "".join(out)


def esc(value: str) -> str:
    """Escape text for an attribute or text node.

    Unescapes first so copy that already contains entities (``&amp;``) is not
    double-escaped into ``&amp;amp;``.
    """
    return html.escape(html.unescape(value), quote=True)


def classes(*names: str | None) -> str:
    """Join class names, skipping empties."""
    return " ".join(n for n in names if n)


def join(parts: Iterable[str]) -> str:
    """Concatenate rendered fragments."""
    return "".join(parts)


def paragraphs(texts: Iterable[str]) -> str:
    """Wrap each string in a ``<p>``."""
    return join(f"<p>{t}</p>" for t in texts)
