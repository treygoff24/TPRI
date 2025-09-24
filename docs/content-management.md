# Content Management Guide

This site separates narrative content from presentation so policy teams can update messaging without touching application code.

## Directory Overview

- `content/sections/` – MDX files for each major section. Frontmatter controls ordering, background theme, and CTA metadata.
- `content/sections/how-it-works/` – Partial MDX files surfaced inside the progressive explanation tabs.
- `content/faqs/` – Audience-specific FAQs stored as YAML (`policymakers.yml`, `advanced.yml`).
- `content/downloads.yml` – Metadata describing each downloadable asset, including file size, update timestamp, and offline flag.
- `content/endorsements.yml` – Supporter quotes, titles, and optional logos.
- `content/stats/key-metrics.json` – Headline metrics rendered in the hero and stats sections.
- `data/` – Structured datasets for the timeline, map, and macro metrics (see `docs/references.md` for citations).

## Editing Workflow

1. Create or update the relevant MDX/YAML/JSON file.
2. Run content validation to confirm schemas are satisfied:
   ```bash
   npm run lint:content
   ```
3. Fix any reported issues. The validator highlights the file and field causing the failure.
4. Commit the changes with a descriptive message referencing the section updated.

## Adding Citations

- Use the `<Citation id="ref-xxx" />` component inside MDX to reference `docs/references.md`.
- When adding a new citation, append the entry to `docs/references.md` with the correct identifier and source details.

## OG Image Regeneration

1. Update section frontmatter or content that should influence social cards.
2. Run the Open Graph image generator script after updating assets:
   ```bash
   npm run generate:og
   ```
   (This command will be added alongside the OG API route; see `scripts/` for implementation details.)
3. Commit the regenerated images located in `public/images/og/`.

## Downloads and Offline Support

- Drop new or revised PDFs into `public/downloads/` and update the matching entry in `content/downloads.yml` with file path, size, and published date.
- Set `offline: true` for assets that should be pre-cached by the service worker. Update the version string (e.g., append `?v=YYYYMMDD` or rename the file) to bust caches when content changes.
- The service worker registers automatically in production builds. When testing locally, set `NEXT_PUBLIC_ENABLE_SW=true` before running `npm run dev` to mimic production caching.

## Validation Before Release

Before shipping to production, run the full suite:

```bash
npm run lint
npm run lint:content
npm run test
npm run test:e2e
npm run test:a11y
npm run test:lighthouse
```

Record any notable updates in `docs/changelog.md` including data refreshes, asset replacements, and campaign milestones.
