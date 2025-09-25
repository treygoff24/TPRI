# Map Feature Architecture Overview

This guide outlines how the diplomatic recognition map functions on the UI overhaul branch. It focuses on the runtime data sources, React components, and validation pipeline so future updates stay aligned with the new MapLibre implementation.

## User Experience

- Render an interactive MapLibre map of the Western Hemisphere inside the “Diplomatic Recognition in the Americas” card.
- Shade each country by recognition stance (`china` or `taiwan`) with a neutral fallback.
- Surface a legend that lets users toggle visibility for each stance.
- Reveal a tooltip on hover/click with the country name, stance description, and the first available citation.
- Support keyboard navigation by exposing a hidden country list (`sr-only` buttons) that can pin tooltips.
- Provide a loading state while data is fetched, and show an error message if initialization fails.

## File Layout

| File / Directory                                    | Responsibility                                                                                        |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `components/common/interactive-map.tsx`             | Lightweight wrapper that forwards props into `<RecognitionMap />` and applies default height.         |
| `components/map/RecognitionMap.tsx`                 | Client component that wires MapLibre events, hover/pin behavior, legend state, and tooltip rendering. |
| `components/map/Legend.tsx`                         | Legend toggle UI styled to match the UI overhaul design tokens.                                       |
| `components/map/Tooltip.tsx`                        | Floating card that displays country-level copy and citation links.                                    |
| `lib/recognition/`                                  | Shared helpers for loading recognition datasets, color tokens, and citations with Zod validation.     |
| `public/data/recognition.json`                      | Canonical dataset (metadata, citations, change history) served to the client.                         |
| `public/data/citations.json`                        | Citation index resolved by `loadCitations()`.                                                         |
| `public/data/countries-western-hemisphere.geo.json` | GeoJSON describing the map polygons.                                                                  |
| `docs/MapLibre-Recognition-Map-Implementation.md`   | Deep dive into the feature, styling tokens, and data generation workflow.                             |

## Data Flow

1. **Client-side boot** – `RecognitionMap` runs in the browser and fetches:
   - Recognition dataset (`loadRecognitionDataset()`)
   - Citation index (`loadCitations()`)
   - Style tokens (`loadStyleTokens()`)
   - GeoJSON polygons (`fetch('/data/countries-western-hemisphere.geo.json')`)
2. **Dataset enrichment** – Entries are indexed by ISO alpha-3 code, joined to GeoJSON features, and paired with cached centroids for fly-to interactions.
3. **Rendering** – MapLibre is initialized with a generated style whose background color comes from `style-tokens.json`.
   - Fill colors are assembled via `buildColorExpression()` using the dataset tokens.
   - Hover state updates both a feature-state flag and a highlight layer to achieve crisp outlines.
4. **Interactivity** – `mousemove`/`click` listeners drive hover + pin states. Keyboard focus on the hidden list calls `focusCountry()` to pan and show tooltips without requiring a pointer.

## Validation & Tooling

- `scripts/validate-content.ts` now reads `public/data/recognition.json`, validates it with `recognitionDatasetSchema`, and confirms every entry satisfies `recognitionSchema`.
- The composite content bundle uses the same schema so automated checks guard against malformed recognition data.
- When adding new entries, update both `recognition.json` and any supporting citations; rerun `npm run lint:content` to surface schema issues early.

## Styling Tokens

- `components/map/*` intentionally use the UI overhaul palette (`bg-surface`, `text-text-primary`, `accent`, etc.).
- Color tokens for MapLibre fills live in `public/data/style-tokens.json`; adjust those values instead of inlining hex codes in components.

## Legacy Notes

- The previous D3/SVG implementation and `data/map/*` assets have been removed. Use MapLibre + the helpers in `lib/recognition/` for all future map work.
- If you need the original implementation details, reference the archived commits prior to this branch or the deep-dive document listed above.

With this structure, future contributors can extend the map (e.g., add filters, expand geography, redesign tooltips) without re-learning the entire integration.
