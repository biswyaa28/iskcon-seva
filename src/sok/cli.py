# -*- coding: utf-8 -*-
"""Command line interface.

    sok build      generate the site
    sok check      verify links, accessibility, and quoted scripture
    sok shell      re-extract the page shell from a mirror
    sok serve      preview locally
    sok clean      remove generated output

Run ``sok <command> --help`` for options.
"""
from __future__ import annotations

import argparse
import shutil
import sys
from collections.abc import Sequence

from sok.config import ROOT, SITE, BuildOptions


def _human(n: int) -> str:
    """Format a byte count for human eyes."""
    value = float(n)
    for unit in ("B", "KB", "MB", "GB"):
        if abs(value) < 1024 or unit == "GB":
            return f"{value:,.0f} {unit}" if unit == "B" else f"{value:,.1f} {unit}"
        value /= 1024
    return f"{value:,.1f} GB"


# --------------------------------------------------------------------- build --
def cmd_build(args: argparse.Namespace) -> int:
    from sok.content import ContentError
    from sok.pipeline import build
    from sok.render.chrome import ShellError

    options = BuildOptions(
        extract_css=not args.inline_css,
        prune_assets=not args.keep_unused,
        strict=args.strict,
    )

    try:
        result = build.run(options)
    except ContentError as exc:
        print(f"content error:\n{exc}", file=sys.stderr)
        return 2
    except ShellError as exc:
        print(f"shell error: {exc}", file=sys.stderr)
        return 2

    if args.verbose:
        for page in result.pages:
            print(f"  {str(page.relative):<52} {page.size:>9,} B")
        for item in result.reshelled:
            print(f"  {item.slug + '/index.html':<52} {item.size:>9,} B  (archive)")

    for item in result.skipped:
        print(f"  skipped {item.slug}: {item.reason}", file=sys.stderr)

    print(
        f"\n{len(result.pages)} pages generated, "
        f"{len(result.reshelled)} archive pages re-shelled."
    )
    if result.css_bytes:
        saved = result.css_bytes * (len(result.pages) + len(result.reshelled) - 1)
        print(
            f"css:    {result.css_blocks} inline block(s) -> "
            f"{_human(result.css_bytes)} bundle "
            f"(~{_human(saved)} of duplication removed)"
        )
    if result.published:
        print(f"assets: {len(result.published)} first-party file(s) published")
    if result.pruned:
        print(
            f"pruned: {len(result.pruned)} unreferenced file(s), "
            f"{_human(result.pruned_bytes)} freed"
        )
    print(f"total:  {_human(result.total_bytes)} of HTML")

    if args.strict:
        return cmd_check(argparse.Namespace(names=[], verbose=False, strict=True))
    return 0


# --------------------------------------------------------------------- check --
def cmd_check(args: argparse.Namespace) -> int:
    from sok import checks

    try:
        reports = checks.run(tuple(args.names))
    except KeyError as exc:
        print(exc, file=sys.stderr)
        return 2

    failed = 0
    for report in reports:
        print(report.summary())
        for finding in report.findings if args.verbose else report.errors[:20]:
            print("  " + finding.format())
        if len(report.errors) > 20 and not args.verbose:
            print(f"  ... {len(report.errors) - 20} more error(s); use -v")
        for note in report.notes:
            print(f"  note: {note}")
        if not report.ok:
            failed += 1

    if failed:
        print(f"\n{failed} check(s) failed.", file=sys.stderr)
        return 1
    print("\nall checks passed.")
    return 0


# --------------------------------------------------------------------- shell --
def cmd_shell(args: argparse.Namespace) -> int:
    from sok.pipeline.shell import ExtractError, extract

    try:
        result = extract(args.source)
    except ExtractError as exc:
        print(f"shell extraction failed: {exc}", file=sys.stderr)
        return 2

    print(f"head + header : {_human(len(result.head)):>12}")
    print(f"footer        : {_human(len(result.footer)):>12}")
    print(f"body discarded: {_human(result.discarded):>12}  (page-specific)")
    return 0


# --------------------------------------------------------------------- serve --
def cmd_serve(args: argparse.Namespace) -> int:
    import functools
    import http.server
    import socketserver

    handler = functools.partial(
        http.server.SimpleHTTPRequestHandler, directory=str(SITE)
    )
    with socketserver.TCPServer(("", args.port), handler) as server:
        print(f"serving {SITE} at http://localhost:{args.port}/  (ctrl-c to stop)")
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nstopped.")
    return 0


# --------------------------------------------------------------------- clean --
def cmd_clean(args: argparse.Namespace) -> int:
    from sok.pipeline.assets import assets_root

    removed = 0
    target = assets_root()
    if target.exists():
        removed += sum(1 for _ in target.rglob("*") if _.is_file())
        shutil.rmtree(target)

    for cache in ROOT.rglob("__pycache__"):
        shutil.rmtree(cache, ignore_errors=True)

    print(f"removed generated assets ({removed} file(s)) and bytecode caches.")
    print("note: generated HTML is left in place — it is the site itself.")
    return 0


# ----------------------------------------------------------------------- cli --
def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="sok",
        description="Static site generator for the Science of Krishna foundation.",
    )
    subparsers = parser.add_subparsers(dest="command", required=True)

    build_cmd = subparsers.add_parser("build", help="generate the site")
    build_cmd.add_argument(
        "-v", "--verbose", action="store_true", help="list every page written"
    )
    build_cmd.add_argument(
        "--inline-css",
        action="store_true",
        help="keep CSS inlined in each page (much larger output)",
    )
    build_cmd.add_argument(
        "--keep-unused", action="store_true", help="do not prune unreferenced assets"
    )
    build_cmd.add_argument(
        "--strict", action="store_true", help="run checks afterwards and fail on error"
    )
    build_cmd.set_defaults(func=cmd_build)

    check_cmd = subparsers.add_parser("check", help="verify the built site")
    check_cmd.add_argument(
        "names", nargs="*", help="checks to run (default: all)"
    )
    check_cmd.add_argument(
        "-v", "--verbose", action="store_true", help="show warnings and all findings"
    )
    check_cmd.add_argument("--strict", action="store_true", help=argparse.SUPPRESS)
    check_cmd.set_defaults(func=cmd_check)

    shell_cmd = subparsers.add_parser(
        "shell", help="re-extract the page shell from a mirrored page"
    )
    shell_cmd.add_argument(
        "source", nargs="?", type=lambda s: __import__("pathlib").Path(s),
        help="mirrored HTML file (default: site/index.html)",
    )
    shell_cmd.set_defaults(func=cmd_shell)

    serve_cmd = subparsers.add_parser("serve", help="preview the site locally")
    serve_cmd.add_argument("-p", "--port", type=int, default=8899)
    serve_cmd.set_defaults(func=cmd_serve)

    clean_cmd = subparsers.add_parser("clean", help="remove generated assets")
    clean_cmd.set_defaults(func=cmd_clean)

    return parser


def main(argv: Sequence[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    return args.func(args)


if __name__ == "__main__":
    raise SystemExit(main())
