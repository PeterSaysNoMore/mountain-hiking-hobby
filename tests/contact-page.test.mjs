import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import assert from 'assert';

const __dir = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dir, '..');

const file = resolve(root, 'contact.html');

// 1. File must exist
assert.ok(existsSync(file), 'contact.html does not exist');

const html = readFileSync(file, 'utf8');

// 2. Valid HTML boilerplate
assert.match(html, /<!DOCTYPE html>/i, 'Missing DOCTYPE');
assert.match(html, /<html[^>]+lang="en"/, 'Missing lang="en" on <html>');
assert.match(html, /<meta[^>]+charset/i, 'Missing charset meta');
assert.match(html, /<meta[^>]+viewport/, 'Missing viewport meta');

// 3. Page title
assert.match(html, /<title>[^<]*[Cc]ontact[^<]*<\/title>/, 'Title must contain "Contact"');

// 4. Navigation present and links to contact
assert.match(html, /<nav[\s>]/, 'Missing <nav> element');
assert.match(html, /href=["']contact\.html["']/, 'Nav must link to contact.html');

// 5. Nav links to the other core pages
assert.match(html, /href=["']index\.html["']/, 'Nav must link to index.html');
assert.match(html, /href=["']routes\.html["']/, 'Nav must link to routes.html');
assert.match(html, /href=["']about\.html["']/, 'Nav must link to about.html');

// 6. One H1
assert.match(html, /<h1[^>]*>[\s\S]*?<\/h1>/, 'Missing <h1>');

// 7. A contact form present
assert.match(html, /<form[\s>]/, 'Page must have a contact form');

// 8. Form must not use mailto:
assert.doesNotMatch(html, /action=["'][^"']*mailto:/i, 'Form action must not use mailto:');

// 9. Form must not have enctype attribute
assert.doesNotMatch(html, /enctype=/i, 'Form must not have enctype attribute');

// 10. All three fields must have required attribute
assert.match(html, /<input[^>]+name="name"[^>]*required/i, 'Name field must have required attribute');
assert.match(html, /<input[^>]+name="email"[^>]*required/i, 'Email field must have required attribute');
assert.match(html, /<textarea[^>]+name="message"[^>]*required/i, 'Message field must have required attribute');

console.log('All assertions passed — contact.html is present and well-formed.');
