# Science of Krishna

The public site under `site/` is **plain static HTML** — no runtime, no server,
no database. Everything else in this repository is the tooling that generates it.

```bash
make install     # one-time: install the package and dev tools
make             # build the site, then verify it
make serve       # preview at http://localhost:8899
```

---

## Why a generator?

The original site was a WordPress (Avada/Fusion) mirror: a handful of ~1 MB HTML
files with the entire stylesheet inlined into each one. Editing those by hand is
unmaintainable and drifts out of sync page to page.

Instead the build:

1. **Extracts the shell once** — the `<head>` + header from the top of a
   mirrored page, and the footer from the bottom.
2. **Rebrands it** — logo, titles, menus, footer columns, URLs; strips
   WordPress plumbing and third-party trackers.
3. **Generates each page body** from typed content, using components that emit
   the *theme's own* classes and CSS variables.
4. **Lifts the inlined CSS** into one cacheable stylesheet shared by every page.

The result inherits the original design language exactly, because it reuses the
original stylesheet rather than reimplementing it.

---

## Layout

```
assets/            first-party CSS, JS, and images (copied into site/assets/)
data/
  shell/           extracted head+header and footer fragments
  sources/         public-domain scripture used by the library
  mirror/          manifests describing the original mirror
docs/              handoff notes and known issues
site/              ← the generated site; this is what you deploy
src/sok/
  config.py        paths, branding, design tokens
  navigation.py    information architecture: menus, routes, page ids
  content/         all site copy, as typed data
  render/          markup generation
    html.py        escaping and inline-style helpers
    components.py  themed components (containers, cards, buttons, verse…)
    chrome.py      shell rebranding, nav and footer rewriting
    page.py        page assembly and writing
  pages/           one module per group of pages
  pipeline/        build steps: shell, assets, legacy, orchestration
  checks/          post-build verification
tests/             the test suite
```

The dependency flow is one-directional:

```
config → navigation → content → render → pages → pipeline → cli
                                            ↘ checks ↗
```

Nothing lower imports from anything higher, so a change to a component can
never break the content layer.

---

## Commands

Everything runs through one CLI (`make` targets wrap it):

| Command | Purpose |
|---|---|
| `sok build` | Generate every page |
| `sok build --strict` | Build, then fail if any check reports an error |
| `sok build -v` | List every page and its size |
| `sok check` | Verify links, accessibility, and quoted scripture |
| `sok check links` | Run one named check |
| `sok shell` | Re-extract the page shell from a mirrored page |
| `sok serve` | Preview locally |
| `sok clean` | Remove generated assets and caches |

Useful build flags:

- `--inline-css` — keep CSS inlined per page (much larger output; for debugging
  a cascade problem).
- `--keep-unused` — skip asset pruning.

---

## Editing content

Nearly all copy lives in `src/sok/content/`, as typed dataclasses:

| File | Contains |
|---|---|
| `objectives.py` | The six objectives and three aims (trust-deed copy) |
| `programs.py` | Long-form detail for each programme page |
| `articles.py` | Library readings and their commentary |
| `involvement.py` | Get-involved, donation, about, and archive copy |
| `passages.py` | Which scripture excerpt belongs to which objective |

Change the text, run `make`, and every page referencing it updates. Page
*structure* lives in `src/sok/pages/`.

Because the copy is typed, a missing field is an error at import time rather
than a `KeyError` halfway through a build. `sok.content.validate()` runs before
anything is written and reports **every** inconsistency at once — a programme
without an objective, an article pointing at a passage that does not exist, a
navigation entry with no page behind it.

### Adding a page

1. Write a builder in the relevant `src/sok/pages/` module returning a `Page`.
2. Add it to that module's `PAGES` tuple (or to `all_pages()`).
3. Give it a stable id in `navigation.PAGE_IDS` — the theme's CSS keys off the
   `post-<id>` body class.

### Adding a library reading

1. Add a `PassageRef` to `PASSAGE_REFS` in `content/passages.py`.
2. Add the `Article` to `content/articles.py`.
3. Run `make` — `sok check quotes` verifies the new lines appear verbatim in
   the source text.

---

## Design tokens

Colours are referenced through `config.COLORS`, never as literals, so a rebrand
is a single-file change.

| Role | Token | Value |
|---|---|---|
| Parchment background | `--awb-custom_color_1` | `#f5f0e8` |
| Alternate band | `--awb-custom_color_8` | `#ece4d4` |
| Card background | — | `#fff8f0` |
| Ink / dark bands | `--awb-custom_color_4` | `#2c2416` |
| Body text | `--body_typography-color` | `#442217` |
| Rust accent | `--primary_color` | `#b5651d` |
| Gold | `--awb-custom_color_3` | `#d4a853` |
| Muted tan | `--awb-custom_color_2` | `#a39171` |
| Headings | — | Cormorant Garamond |
| Body | — | Gentium Plus |

Only one first-party stylesheet exists — `assets/css/site.css` — covering the
contact form, card grid, and checklist. Every colour in it references a token
above.

---

## Verification

`make check` runs three checks; all must pass before deploying.

- **links** — every internal link and asset reference resolves. References from
  the inherited archive are reported as warnings (see
  [known issues](docs/known-issues.md)); anything the generator produces is an
  error.
- **a11y** — one `h1` per page, no skipped heading levels, alt text on images,
  a title, a meta description, and a language attribute.
- **quotes** — every quoted scripture line on disk appears **verbatim** in
  `data/sources/gita_arnold.txt`. This reads the built pages, not the Python, so
  it catches a rendering bug as readily as a mistyped anchor.

Run `make test` for the unit suite and `make lint` for static checks.

---

## Library content

Twelve readings, two per objective, each pairing a verbatim passage from the
Bhagavad Gītā with commentary connecting it to the foundation's work.

- **Scripture** — quoted exactly from *The Song Celestial* (Sir Edwin Arnold,
  1900), public domain, Project Gutenberg #2388. Passages are located by anchor
  phrase, so they can be re-verified at any time.
- **Commentary** — the foundation's own editorial. It is **draft content written
  to demonstrate the templates** and is labelled as such on every article page.
  This is the part to rewrite before launch.

Articles are cross-linked both ways: each programme page shows its two related
readings, and each article links back to its objective.

---

## Site map

```
/                                    home
/objectives/                         all six objectives + the three aims
/about-us/                           story, principles
/programs/scriptural-outreach/       objective (a)
/programs/prasadam-distribution/     objective (b)
/programs/temple-seva/               objective (c)
/programs/drug-free-society/         objective (d)
/programs/counseling-support/        objective (e)
/programs/workshops-partnerships/    objective (f)
/get-involved/                       volunteer, donate, partner, sponsor
/donate/                             where contributions go
/contact-us/                         contact form + foundation details
/library/                            article index, filterable by topic
/library/<slug>/                     12 article pages, 2 per objective
/writings/…, /audio/, /tributes/…    inherited Bhaktivinoda archive
```

---

## Before launch

See [docs/known-issues.md](docs/known-issues.md) for the full list. The
short version:

- Contact details (address, phone) say "to be published".
- The contact form posts to `#` — set `FORM_ACTION` in `pages/contact.py`.
- Donation details are not published.
- Article commentary is draft editorial pending review.

---

## Deploying

`site/` is a self-contained static directory. Upload it to any static host
(Netlify, Cloudflare Pages, S3 + CloudFront, nginx). No build step is required
on the server.

Two things are worth configuring:

- **Cache headers** — `assets/css/bundle.css` is ~850 KB and shared by every
  page. Serve it with a long `max-age`; that is the entire point of extracting
  it. HTML should be served with a short TTL or `must-revalidate`.
- **Compression** — enable gzip or brotli. The bundle compresses to a small
  fraction of its size.
