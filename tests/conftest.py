# -*- coding: utf-8 -*-
"""Shared fixtures."""
from __future__ import annotations

import pytest

from sok.render import chrome


@pytest.fixture(autouse=True)
def _clean_shell():
    """Ensure each test sees the on-disk shell, not another test's override."""
    chrome.reset()
    yield
    chrome.reset()


@pytest.fixture
def shell_available() -> bool:
    from sok.config import SHELL

    return (SHELL / "head_header.html").exists()
