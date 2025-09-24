# Map Feature Architecture Overview

This document summarizes the intended behavior, data flow, and file layout for the interactive recognition map shown inside the “China Expansion” section of the marketing page. Use it as the authoritative reference when restoring or extending the feature.

## User-Facing Behavior

- Render an interactive SVG map of the Western Hemisphere inside the China Expansion card.
- Color each country by its diplomatic stance:
  - `recognizes-taiwan` → success (green) tint.
  - `recognizes-china` → danger (red) tint.
  - Countries without a record fall back to a muted gray fill.
- Display a legend describing the two recognition categories.
- Hovering a country reveals a tooltip with the country name, recognition status (phrased for users), and optional change date pulled from the dataset.
- Provide a `<noscript>` fallback image (`public/images/map-fallback.svg`) when JavaScript execution is unavailable.

## Rendering Flow

1. **Request handling** (`src/app/(marketing)/page.tsx`)
   - Server component of the marketing homepage.
   - Calls `loadAllContent()` to assemble the rest of the landing page data.
   - Calls `loadMapData()` from `@/lib/map-data` and passes the result to `<ChinaExpansionSection />`.

2. **Section composition** (`components/sections/china-expansion-section.tsx`)
   - Receives the `map: MapData` prop and forwards `map.features` + `map.recognition` to `<InteractiveMap />`.
   - Responsible for layout alongside the timeline and stat cards.

3. **Client-side map renderer** (`components/common/interactive-map.tsx`)
   - Declared as a client component (`"use client"`).
   - Dependencies: `d3-geo` for the Mercator projection/path generator, React hooks, and Tailwind utility classes.
   - Accepts props:
     - `features: FeatureCollection` (GeoJSON FeatureCollection for the rendered geographies).
     - `recognition: RecognitionRecord[]` (country recognition status records).
   - Uses `deriveRecognitionStatus()` to convert the recognition array into a dictionary keyed by ISO alpha-2 codes.
   - Builds a `geoMercator` projection centered and scaled for the Americas (scale 90, center [-60, -10], width 640, height 360).
   - Iterates `features.features`, extracts `ISO_A2` (falling back to `iso_a2`), and fills each `path` via Tailwind classes stored in `STATUS_CLASSES`.
   - Maintains `hovered` state to drive tooltip content.
   - Renders legend chips, tooltip, and the `<noscript>` fallback image.

4. **Utility helpers** (`lib/map.ts`)
   - Defines `MapData` type (FeatureCollection + RecognitionRecord[]).
   - Provides `deriveRecognitionStatus()` which builds the ISO-to-record map consumed by the client component.

## Data Sources & Validation

Located under `data/map/`:

| File                 | Purpose                                                                                                                                                        |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `countries.geo.json` | GeoJSON FeatureCollection describing national boundaries (Western Hemisphere subset). The file is read verbatim and passed to the client.                      |
| `recognition.json`   | Array of recognition metadata. Each entry is validated with `recognitionSchema` (`content/schema.ts`) to guarantee required fields before reaching the client. |

### Recognition Schema (`content/schema.ts`)

```ts
export const recognitionSchema = z.object({
  isoCode: z.string().length(2),
  country: z.string(),
  status: z.enum(["recognizes-taiwan", "recognizes-china"]),
  changeDate: z.coerce.date().optional(),
  citationId: z.string().optional(),
});
```

Important notes:

- ISO codes must be 2-letter strings matching the GeoJSON feature properties.
- `changeDate` is optional but, when present, is shown in the tooltip (formatted with `toLocaleDateString()` in the client component).
- `citationId` is stored but currently only surfaced indirectly (e.g., future tooltip/link work).

### Data Loading Pipeline (`lib/map-data.ts`)

- Lazily imports Node.js `fs/promises` and `path` to avoid bundling them in the client build.
- Builds absolute paths off `process.cwd()` + `data/map/` to fetch the JSON files.
- `loadMapFeatures()` parses the GeoJSON.
- `loadRecognition()` parses the recognition dataset and validates each record with Zod. Any schema failure throws with the offending index.
- `loadMapData()` resolves `Promise.all([features, recognition])` so both datasets are available together on the server before hydration.

## Static Assets

- `public/images/map-fallback.svg` presents a simple message instructing users to enable JavaScript. It is injected via `<noscript>` in `InteractiveMap`.

## Supporting Packages

- `d3-geo` (`package.json` dependency) supplies the map projection and path calculations.
- `@types/d3-geo` and `@types/geojson` provide TypeScript support.

## Expected Integration Points

- `components/index.ts` re-exports `InteractiveMap`, enabling future reuse.
- Any future server component that needs the map data should import `loadMapData()` to keep validation consistent.
- Styling relies entirely on Tailwind classes; updates should live alongside the component (no external stylesheet).

## Troubleshooting Checklist (for future fixes)

1. **Data mismatches** – Ensure ISO codes in `recognition.json` align with the GeoJSON feature properties (`ISO_A2` or `iso_a2`).
2. **Projection issues** – Verify `geoMercator()` configuration if the map renders off-center or squashed.
3. **Client/server boundary** – Remember `InteractiveMap` is client-side. Server-only modules (e.g., `fs`) must remain inside `lib/map-data.ts`.
4. **Tooltip glitches** – Check hover handlers and state management; tooltip container is absolutely positioned at map center.
5. **No-script rendering** – Confirm fallback SVG path and asset exist if the map fails silently.

Armed with this context, a future contributor should have everything needed to diagnose why the current map is “not working” and confidently deliver fixes.
