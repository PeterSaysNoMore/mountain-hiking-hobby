## Why

The routes listing has no indication of preference — all three routes sit at equal visual weight. Adding editorial rank numbers lets visitors immediately see which trails matter most to the author.

## What Changes

- Each `.route` card gets a visible rank number (#1, #2, #3) displayed to the left of the route title
- Cards are reordered in the HTML to match rank order (rank 1 first)
- `data-rank` attribute added to each `.route` div
- #1 rank number styled in Canyon Amber (larger); #2 and #3 in Trail Pine

## Capabilities

### New Capabilities

- `route-ranking`: Visible editorial rank numbers on route listing cards, with special visual treatment for #1

### Modified Capabilities

_(none — no existing spec-level behavior changes)_

## Impact

- `2930jun/routes.html`: card order, markup, and CSS only
- No JS changes
- Canyon Amber "one per page" rule satisfied — #1 rank number is the single Canyon Amber element on the routes page (replaces no existing Canyon Amber element on that page)
- Difficulty filter unchanged — rank numbers stay visible regardless of active filter
- Assigned ranks: Yellowstone #1, El Capitan #2, Bright Angel Trail #3
