# Build, verify, and preview the site.
#
# `make` alone runs the full pipeline: build then check.

PYTHON ?= python3
export PYTHONPATH := src

.DEFAULT_GOAL := all
.PHONY: all build check serve clean shell test lint format install help

## all: build the site and verify it
all: build check

## build: generate every page
build:
	$(PYTHON) -m sok build

## check: verify links, accessibility, and quoted scripture
check:
	$(PYTHON) -m sok check

## serve: preview at http://localhost:8899
serve:
	$(PYTHON) -m sok serve

## shell: re-extract the page shell from a mirrored page
shell:
	$(PYTHON) -m sok shell

## test: run the test suite
test:
	$(PYTHON) -m pytest

## lint: static checks
lint:
	$(PYTHON) -m ruff check src tests

## format: apply formatting fixes
format:
	$(PYTHON) -m ruff check --fix src tests
	$(PYTHON) -m ruff format src tests

## install: install the package with development extras
install:
	$(PYTHON) -m pip install -e ".[dev]"

## clean: remove generated assets and caches
clean:
	$(PYTHON) -m sok clean

## help: list targets
help:
	@grep -E '^## ' $(MAKEFILE_LIST) | sed 's/## /  /'
