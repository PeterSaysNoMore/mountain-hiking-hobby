### Requirement: All form fields are required
The contact form SHALL require name, email, and message before submission is allowed. The browser SHALL prevent submission if any field is empty or if the email field contains an invalid email address.

#### Scenario: Submit with all fields filled
- **WHEN** visitor fills in name, a valid email, and a message and clicks submit
- **THEN** the JS handler fires and redirects to thank-you.html

#### Scenario: Submit with empty name
- **WHEN** visitor leaves the name field empty and clicks submit
- **THEN** browser validation prevents submission and shows a native required-field error

#### Scenario: Submit with invalid email
- **WHEN** visitor enters text that is not a valid email in the email field and clicks submit
- **THEN** browser validation prevents submission and shows a native email-format error

#### Scenario: Submit with empty message
- **WHEN** visitor leaves the message textarea empty and clicks submit
- **THEN** browser validation prevents submission and shows a native required-field error

### Requirement: Form does not use mailto
The contact form SHALL NOT use a `mailto:` action. The form element SHALL have no `action` attribute and no `enctype` attribute.

#### Scenario: Form HTML structure
- **WHEN** the contact.html page is loaded
- **THEN** the form element has no action attribute containing "mailto:" and no enctype attribute

### Requirement: JS submit handler redirects to thank-you page
On valid submission, the form's JS submit handler SHALL prevent the default browser action and redirect the visitor to thank-you.html.

#### Scenario: Valid submit triggers redirect
- **WHEN** all fields are valid and visitor submits the form
- **THEN** visitor is navigated to thank-you.html
