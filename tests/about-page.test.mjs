import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import assert from 'assert';

const __dir = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dir, '..');

const file = resolve(root, 'about.html');

// 1. File must exist
assert.ok(existsSync(file), 'about.html does not exist');

const html = readFileSync(file, 'utf8');

// 2. Valid HTML boilerplate
assert.match(html, /<!DOCTYPE html>/i, 'Missing DOCTYPE');
assert.match(html, /<html[^>]+lang="en"/, 'Missing lang="en" on <html>');
assert.match(html, /<meta[^>]+charset/i, 'Missing charset meta');
assert.match(html, /<meta[^>]+viewport/, 'Missing viewport meta');

// 3. Page title
assert.match(html, /<title>[^<]*[Aa]bout[^<]*<\/title>/, 'Title must contain "About"');

// 4. Navigation present and links to about
assert.match(html, /<nav[\s>]/, 'Missing <nav> element');
assert.match(html, /href=["']about\.html["']/, 'Nav must link to about.html');

// 5. One H1 that names the page
assert.match(html, /<h1[^>]*>[\s\S]*?<\/h1>/, 'Missing <h1>');

// 6. At least one paragraph of content
assert.match(html, /<p[^>]*>[\s\S]*?<\/p>/, 'Missing body paragraph');

// 7. Nav links back to the other core pages
assert.match(html, /href=["']index\.html["']/, 'Nav must link back to index.html');
assert.match(html, /href=["']routes\.html["']/, 'Nav must link to routes.html');

console.log('All assertions passed — about.html is present and well-formed.');
