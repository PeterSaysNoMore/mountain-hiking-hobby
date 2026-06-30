## 1. Tests (write first)

- [x] 1.1 Add assertions to contact-page.test.mjs: all 3 fields have `required`, no `mailto:` in action, no `enctype` attribute
- [x] 1.2 Create tests/thankyou-page.test.mjs: file exists, valid boilerplate, nav with core links, one H1, back link to contact.html, exactly one `#e07b00` element

## 2. Update contact.html

- [x] 2.1 Remove `action="mailto:..."`, `method="post"`, and `enctype="text/plain"` from `<form>`
- [x] 2.2 Add `required` to name input, email input, and message textarea
- [x] 2.3 Replace existing inline script with submit handler: `e.preventDefault()` → `window.location.href = 'thank-you.html'`

## 3. Create thank-you.html

- [x] 3.1 Create thank-you.html with full site nav, H1, mountain-guide confirmation copy, Canyon Amber accent on one element, link back to contact.html

## 4. Quality gate

- [x] 4.1 Run full test suite — all tests must pass
