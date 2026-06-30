## Why

The contact form currently uses `mailto:` which opens the visitor's local mail client — unreliable on mobile and web browsers, and broken for many users. The form needs to work for everyone, with a proper confirmation that the message was received.

## What Changes

- Update `contact.html` form: remove `mailto:` action, add JS submit handler that redirects to a thank-you page
- Add `required` attribute to all three fields (name, email, message)
- Remove `enctype="text/plain"` (no longer needed)
- Create `thank-you.html`: full-site page confirming submission, mountain-guide tone, Canyon Amber accent, link back
- Add tests covering new requirements (required fields, no mailto, thank-you page structure)

## Capabilities

### New Capabilities

- `contact-form`: Contact form submission flow — required field validation, JS-handled submit, thank-you page redirect
- `thankyou-page`: Thank-you page shown after contact form submission

### Modified Capabilities

*(none — route-ranking spec unaffected)*

## Impact

- `contact.html` — form action, enctype, required attributes, inline script
- `thank-you.html` — new file
- `tests/contact-page.test.mjs` — new assertions
- `tests/thankyou-page.test.mjs` — new test file
