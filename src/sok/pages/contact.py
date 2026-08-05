# -*- coding: utf-8 -*-
"""The contact page and its form.

The form posts to ``#``. Point :data:`FORM_ACTION` at a real handler
(Formspree, Netlify Forms, or your own endpoint) before launch.
"""
from __future__ import annotations

from sok.config import BRAND, COLORS
from sok.content import CRISIS_NOTICE
from sok.navigation import PAGE_IDS
from sok.pages.common import hero, notice, two_column
from sok.render import Page
from sok.render.components import separator, text, title
from sok.render.html import join

#: Where the contact form submits. Replace before launch.
FORM_ACTION = "#"

SUBJECTS = (
    "General enquiry",
    "Volunteering",
    "Donations",
    "Partnership",
    "Counseling &amp; support",
    "Temple sev&#257;",
)


def _form() -> str:
    options = join(f"<option>{s}</option>" for s in SUBJECTS)
    return f"""
<form class="sok-contact-form" method="post" action="{FORM_ACTION}" novalidate>
  <div class="sok-field">
    <label for="sok-name">Name <span aria-hidden="true">*</span></label>
    <input id="sok-name" name="name" type="text" required autocomplete="name">
  </div>
  <div class="sok-field">
    <label for="sok-email">Email <span aria-hidden="true">*</span></label>
    <input id="sok-email" name="email" type="email" required autocomplete="email">
  </div>
  <div class="sok-field">
    <label for="sok-subject">Subject</label>
    <select id="sok-subject" name="subject">{options}</select>
  </div>
  <div class="sok-field">
    <label for="sok-message">Message <span aria-hidden="true">*</span></label>
    <textarea id="sok-message" name="message" rows="6" required></textarea>
  </div>
  <button type="submit" class="sok-submit">Send Message</button>
  <p class="sok-formnote">We read every message and reply as soon as we are able.</p>
</form>
"""


def _details() -> str:
    muted = f'style="color:{COLORS.on_parchment_muted};"'
    return (
        title("Foundation Details", level=2, size=26, align="left")
        + separator(width="46px", margin_bottom="18px")
        + text(
            f"<p><strong>{BRAND.name}</strong><br>"
            f"<span {muted}>Registered charitable trust</span></p>"
            f"<p><strong>Email</strong><br>"
            f'<a href="mailto:{BRAND.email}">{BRAND.email}</a></p>'
            f"<p><strong>Address</strong><br>"
            f"<span {muted}>Address to be published.</span></p>"
            f"<p><strong>Phone</strong><br>"
            f"<span {muted}>Number to be published.</span></p>",
            size="17px",
            color=COLORS.on_parchment,
        )
    )


def contact() -> Page:
    body = hero(
        "GET IN TOUCH",
        "Contact Us",
        "Questions, offers of help, partnership proposals, or a request for support — "
        "we would be glad to hear from you.",
    )

    body += two_column(
        title("Send a Message", level=2, size=26, align="left")
        + separator(width="46px", margin_bottom="18px")
        + _form(),
        _details(),
        split="58%",
        bg=COLORS.parchment,
        pad_top="66px",
        pad_bottom="66px",
    )

    body += notice(CRISIS_NOTICE)

    return Page(
        slug="/contact-us/",
        title=f"Contact Us — {BRAND.name}",
        description="Contact the Science of Krishna foundation for volunteering, "
                    "donations, partnership, or support.",
        body=body,
        page_id=PAGE_IDS["/contact-us/"],
    )


PAGES = (contact,)
