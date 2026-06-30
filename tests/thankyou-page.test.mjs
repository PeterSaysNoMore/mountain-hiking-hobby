import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import assert from 'assert';

const __dir = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dir, '..');

const file = resolve(root, 'thank-you.html');

// 1. File must exist
assert.ok(existsSync(file), 'thank-you.html does not exist');

const html = readFileSync(file, 'utf8');

// 2. Valid HTML boilerplate
assert.match(html, /<!DOCTYPE html>/i, 'Missing DOCTYPE');
assert.match(html, /<html[^>]+lang="en"/, 'Missing lang="en" on <html>');
assert.match(html, /<meta[^>]+charset/i, 'Missing charset meta');
assert.match(html, /<meta[^>]+viewport/, 'Missing viewport meta');

// 3. Title contains "thank"
assert.match(html, /<title>[^<]*[Tt]hank[^<]*<\/title>/, 'Title must contain "Thank" or "thank"');

// 4. Navigation present with core links
assert.match(html, /<nav[\s>]/, 'Missing <nav> element');
assert.match(html, /href=["']index\.html["']/, 'Nav must link to index.html');
assert.match(html, /href=["']routes\.html["']/, 'Nav must link to routes.html');
assert.match(html, /href=["']about\.html["']/, 'Nav must link to about.html');
assert.match(html, /href=["']contact\.html["']/, 'Nav must link to contact.html');

// 5. Exactly one H1
const h1Matches = html.match(/<h1[\s>]/gi) || [];
assert.strictEqual(h1Matches.length, 1, `Must have exactly one <h1>, found ${h1Matches.length}`);

// 6. Back link to contact.html
assert.match(html, /href=["']contact\.html["']/, 'Must have a link back to contact.html');

// 7. Exactly one Canyon Amber (#e07b00) element
const amberMatches = html.match(/#e07b00/gi) || [];
assert.strictEqual(amberMatches.length, 1, `Must have exactly one Canyon Amber (#e07b00) element, found ${amberMatches.length}`);

console.log('All assertions passed — thank-you.html is present and well-formed.');
