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

// 7. A contact form or email address present
const hasForm = /<form[\s>]/.test(html);
const hasEmail = /mailto:|@/.test(html);
assert.ok(hasForm || hasEmail, 'Page must have a contact form or an email address');

console.log('All assertions passed — contact.html is present and well-formed.');
