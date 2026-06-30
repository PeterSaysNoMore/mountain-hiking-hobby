import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import assert from 'assert';

const __dir = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dir, '..');
const file = resolve(root, 'routes.html');

// 1. File must exist
assert.ok(existsSync(file), 'routes.html does not exist');

const html = readFileSync(file, 'utf8');

// 2. Every .route div has a valid data-difficulty attribute
const routeCount = (html.match(/class="route"/g) || []).length;
const difficultyCount = (html.match(/data-difficulty="(?:easy|moderate|hard|expert)"/g) || []).length;
assert.ok(routeCount > 0, 'No .route divs found');
assert.strictEqual(difficultyCount, routeCount,
  `Every .route must have data-difficulty="easy|moderate|hard|expert" — found ${difficultyCount} of ${routeCount}`);

// 3. Filter bar present with role and label
assert.match(html, /role="group"/, 'Filter bar must have role="group"');
assert.match(html, /aria-label="Filter by difficulty"/, 'Filter bar must have aria-label="Filter by difficulty"');

// 4. Five filter buttons with correct data-filter values
for (const value of ['all', 'easy', 'moderate', 'hard', 'expert']) {
  assert.match(html, new RegExp(`data-filter="${value}"`),
    `Missing filter button with data-filter="${value}"`);
}

// 5. "All" button is active by default; others are inactive
assert.match(html, /data-filter="all"[^>]*aria-pressed="true"/,
  'data-filter="all" button must have aria-pressed="true"');
for (const value of ['easy', 'moderate', 'hard', 'expert']) {
  assert.match(html, new RegExp(`data-filter="${value}"[^>]*aria-pressed="false"`),
    `data-filter="${value}" button must have aria-pressed="false"`);
}

// 6. Every .route card contains a .listing-badge
const listingBadgeCount = (html.match(/class="listing-badge"/g) || []).length;
assert.strictEqual(listingBadgeCount, routeCount,
  `Every .route must contain a .listing-badge — found ${listingBadgeCount} of ${routeCount}`);

// 7. .no-results paragraph present with hidden attribute
assert.match(html, /class="no-results"[^>]*hidden/, 'Missing .no-results element with hidden attribute');

// 8. Inline script present
assert.match(html, /<script[\s>]/, 'Missing <script> tag');

console.log('All assertions passed — routes.html has difficulty filter feature.');
