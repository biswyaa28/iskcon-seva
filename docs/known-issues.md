# Known issues and pre-launch checklist

Everything here is a deliberate gap, not a bug in the build. `make check` passes
with all of these outstanding.

---

## Blocking launch

### Contact details are placeholders

`/contact-us/` says "Address to be published" and "Number to be published".
Real values go in `src/sok/pages/contact.py` (`_details`).

### The contact form does not submit

The form posts to `#`. Point `FORM_ACTION` in `src/sok/pages/contact.py` at a
real handler — Formspree, Netlify Forms, or your own endpoint — and confirm the
field names (`name`, `email`, `subject`, `message`) match what it expects.

### Donation details are not published

`/donate/` directs people to the contact page. Add bank details or a payment
provider when they are available.

### Article commentary is draft

The twelve library readings quote scripture accurately — that part needs no
revision and is machine-verified by `sok check quotes`. The **prose around the
quotes** is working editorial written to exercise the templates. Every article
carries a visible "Draft" notice until it is reviewed.

Replace the `body` sections in `src/sok/content/articles.py`, then remove
`DRAFT_NOTE` from `src/sok/pages/library.py`.

---

## Non-blocking

### Inherited archive links (180 unresolved)

The nine pages under `/writings/`, `/audio/`, `/tributes/` and friends are the
original Bhaktivinoda archive. They now carry the new header and footer, but
their internal links point at article pages that were never part of the mirror.

`sok check links` reports these as a **warning**, not an error, so a genuine
regression in generated pages is still visible. To resolve, either:

- mirror the missing pages into `site/`, or
- prune the listings in the archive page bodies.

### No programme photography

No photos were supplied, so programme pages are typographic. The card component
already accepts an `image` field — set it on the relevant `Card` in
`src/sok/content/` once images exist.

### Search box is decorative

The theme's header includes a search field inherited from the mirror. There is
no search backend on a static site. Either wire it to a client-side index
(Lunr, Pagefind) or remove it from the shell.

---

## Operational notes

### The shell is committed, not generated

`data/shell/` holds the extracted head and footer. It is committed so ordinary
builds never depend on having the original mirror to hand. Re-run `make shell`
only after re-mirroring the source site, and review the diff — it is the one
place where upstream markup enters the repository.

### Asset pruning is destructive

`sok build` deletes files in `site/` that nothing references (219 files, ~7 MB
on the last run). It is safe because it runs *after* pages are written, so it
sees the finished reference graph. If you add an asset that is only referenced
from JavaScript at runtime, add it to `_KEEP` in `src/sok/pipeline/assets.py`
or it will be removed.

### Third-party trackers are stripped

The mirror carried Google Tag Manager and a Meta Pixel. Both are removed at
build time by `_TRACKERS` in `src/sok/render/chrome.py`, and there are tests
asserting they stay gone. If analytics are wanted later, add them deliberately
rather than by relaxing those patterns.
