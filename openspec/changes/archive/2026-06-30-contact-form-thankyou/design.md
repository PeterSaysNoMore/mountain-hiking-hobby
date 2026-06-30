## Context

Static HTML site on GitHub Pages — no server, no build step. Current `contact.html` form uses `action="mailto:contact@test-pro.nl"` which opens the visitor's local mail client. Unreliable on mobile and web browsers; many visitors see nothing happen. No actual message is delivered through the browser.

## Goals / Non-Goals

**Goals:**
- Visitor gets clear confirmation after submitting the form
- All fields are required before submit is allowed
- No third-party dependencies or API keys
- New thank-you page fits the existing site design system

**Non-Goals:**
- Actual email delivery (out of scope by design decision)
- Server-side validation or spam protection
- Persistence of form submissions

## Decisions

**JS intercept over server submission**
No backend available on GitHub Pages. JS `e.preventDefault()` + `window.location.href = 'thank-you.html'` gives the appearance of a working submit with zero infrastructure. Alternative (Formspree / Web3Forms) was rejected by user.

**HTML5 `required` for validation**
Browser-native `required` + `type="email"` covers the validation need without any JS validation library. Works before the submit handler fires.

**New page (thank-you.html) over inline message**
Cleaner separation. Testable as an independent file. Fits the static-page pattern of the rest of the site. Inline toggle would require more JS and more complex test assertions.

**Canyon Amber on thank-you.html**
One Canyon Amber element per page (site rule). Thank-you page gets it on a short confirmation line — the warm moment of the flow. `contact.html` retains no Canyon Amber element.

**Remove `enctype="text/plain"` and `action="mailto:..."`**
No longer needed. Form element gets no `action`; JS handles navigation. `method` attribute also removed (default GET on `<form>` is irrelevant since submit is intercepted).

## Risks / Trade-offs

- **No-JS visitors can't submit** → Acceptable for a personal hobby site; no-JS usage negligible
- **No actual message delivery** → Intentional; user chose this approach
- **Redirect loses form data** → Acceptable; no data is processed or stored

## Open Questions

*(none)*
