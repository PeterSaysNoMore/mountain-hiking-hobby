# Spec: Route Ranking

## Purpose

Defines how editorial route rankings are displayed on the routes page, including visual treatment, ordering, and filter behavior. <!-- TBD: expand as needed -->

## Requirements

### Requirement: Route cards display editorial rank number
Each `.route` div SHALL have a `data-rank` attribute with its rank (1, 2, or 3). A `.rank-number` span SHALL appear to the left of the route title displaying `#1`, `#2`, or `#3`.

#### Scenario: Rank number visible on each card
- **WHEN** a visitor loads routes.html
- **THEN** each route card shows a rank number (#1, #2, #3) to the left of its title

### Requirement: Rank #1 has distinct visual treatment
The rank #1 number SHALL be styled in Canyon Amber (`#e07b00`) and at a larger font size than #2 and #3. Rank #2 and #3 SHALL be styled in Trail Pine (`#3a5a40`) at the same font size as the route title.

#### Scenario: #1 is Canyon Amber
- **WHEN** a visitor views the routes page
- **THEN** only the #1 rank number appears in Canyon Amber; #2 and #3 appear in Trail Pine

#### Scenario: Canyon Amber used exactly once
- **WHEN** a visitor views routes.html
- **THEN** Canyon Amber (`#e07b00`) appears on exactly one element (the #1 rank number)

### Requirement: Cards ordered by rank in HTML
Route cards SHALL appear in the HTML in ascending rank order: rank 1 first, rank 3 last.

#### Scenario: Page order matches rank
- **WHEN** a visitor loads routes.html
- **THEN** Yellowstone (#1) appears first, El Capitan (#2) second, Bright Angel Trail (#3) third

### Requirement: Rank display unaffected by difficulty filter
The rank numbers SHALL remain visible when the difficulty filter is active. Filtered-out cards are hidden but retain their rank attribute.

#### Scenario: Filter does not remove rank numbers
- **WHEN** a visitor selects a difficulty filter
- **THEN** visible route cards still show their rank numbers
