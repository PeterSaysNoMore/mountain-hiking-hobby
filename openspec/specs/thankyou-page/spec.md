### Requirement: Thank-you page exists and is well-formed
A file `thank-you.html` SHALL exist at the site root. It SHALL include valid HTML boilerplate: DOCTYPE, `lang="en"`, charset meta, viewport meta, and a `<title>` containing "thank".

#### Scenario: File exists
- **WHEN** the site is checked
- **THEN** thank-you.html exists at the root

#### Scenario: Valid boilerplate
- **WHEN** thank-you.html is parsed
- **THEN** it contains DOCTYPE, lang="en", charset meta, viewport meta, and a title containing "thank"

### Requirement: Thank-you page uses site navigation
The thank-you page SHALL include the standard site `<nav>` element with links to all core pages (index.html, routes.html, about.html, contact.html).

#### Scenario: Nav present with core links
- **WHEN** thank-you.html is loaded
- **THEN** the page contains a <nav> element with links to index.html, routes.html, about.html, and contact.html

### Requirement: Thank-you page has a single H1
The thank-you page SHALL have exactly one `<h1>` element.

#### Scenario: One H1
- **WHEN** thank-you.html is parsed
- **THEN** exactly one <h1> element is present

### Requirement: Thank-you page links back to contact page
The thank-you page SHALL contain a visible link to contact.html so the visitor can return.

#### Scenario: Back link present
- **WHEN** thank-you.html is loaded
- **THEN** it contains at least one anchor element linking to contact.html

### Requirement: Thank-you page has exactly one Canyon Amber element
The thank-you page SHALL use Canyon Amber (`#e07b00`) on exactly one element, per the site design rule.

#### Scenario: Canyon Amber accent present
- **WHEN** thank-you.html is parsed
- **THEN** exactly one element carries the color #e07b00
