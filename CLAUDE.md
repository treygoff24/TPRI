# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Total Political Risk Insurance (TPRI) Campaign Site built with Next.js 15 (App Router), React 19, and TypeScript. The site aims to equip policymakers with data, narratives, and resources to advance TPRI legislation and counter PRC economic encroachment.

## Essential Commands

### Development

```bash
npm run dev                # Start dev server (Next.js)
npm run build             # Production build
npm run start             # Run production server
```

### Testing

```bash
npm test                  # Run unit tests (Vitest)
npm run test:watch        # Watch mode for unit tests
npm run test:e2e          # E2E tests (Playwright)
npm run test:a11y         # Accessibility tests (Playwright)
npm run test:lighthouse   # Lighthouse CI performance tests
```

### Code Quality

```bash
npm run lint              # ESLint (max 0 warnings enforced)
npm run lint:content      # Validate content schema
npm run format            # Prettier formatting
npm run format:check      # Check formatting without writing
```

### Other

```bash
npm run generate:og       # Generate Open Graph images (requires Chrome)
```

## Architecture Overview

### Content Pipeline (Server-Side Data Loading)

The application uses a **schema-driven content pipeline** that loads and validates data at build/request time:

1. **`content/schema.ts`** - Zod schemas define the structure for all content types (sections, FAQs, downloads, endorsements, timeline, recognition data)
2. **`lib/content.ts`** - Content loader functions that:
   - Compile MDX sections from `content/sections/` with frontmatter validation
   - Load YAML collections (FAQs, downloads, endorsements) with schema validation
   - Load JSON datasets (metrics, timeline) with schema validation
   - Export `loadAllContent()` for parallel loading
3. **Page Assembly** - `src/app/(marketing)/page.tsx` orchestrates data loading and passes props to section components

**Key Principle**: All content is loaded server-side, validated against Zod schemas, and type-safe before reaching components.

### Recognition Map Feature

The Recognition Map visualizes diplomatic recognition of China vs Taiwan across the Western Hemisphere using MapLibre GL and D3 projections:

1. **Data Flow**:
   - GeoJSON (`data/countries-western-hemisphere.geo.json`) + recognition dataset (`data/recognition.json`) + style tokens (`data/style-tokens.json`)
   - Server: `lib/recognition/loadRecognition.ts` fetches and validates all data client-side
   - Client: `components/map/RecognitionMap.tsx` renders using D3's `geoConicEqualArea` projection

2. **Key Files**:
   - `lib/recognition/types.ts` - TypeScript types for recognition entries, datasets, citations
   - `components/map/RecognitionMap.tsx` - Main client component with interaction handling (hover, click, tooltip, legend)
   - `components/map/Legend.tsx` - Filter controls for recognition types
   - `components/map/Tooltip.tsx` - Country detail overlay

3. **Interaction Model**:
   - Hover shows tooltip, click pins tooltip, ESC clears pinned
   - Keyboard navigation via hidden button list (a11y)
   - Legend toggles filter countries by recognition type

**Important**: The map is client-rendered. If tiling/duplication occurs, check projection parameters in RecognitionMap.tsx:197-206.

### Path Aliases

TypeScript and bundler resolve `@/*` imports:

- `@/app/*` → `src/app/*`
- `@/components/*` → `components/*`
- `@/lib/*` → `lib/*`
- `@/content/*` → `content/*`
- `@/data/*` → `data/*`

Vitest config mirrors these aliases explicitly.

### Directory Structure

- `src/app/` - Next.js App Router (routes, layouts, API handlers)
- `components/` - React components (sections, UI primitives, map)
- `lib/` - Typed utilities, content loaders, schema helpers, analytics
- `content/` - MDX sections, YAML collections, Zod schemas
- `data/` - JSON datasets (recognition, timeline, metrics, GeoJSON)
- `public/` - Static assets (OG images, map fallback SVG)
- `docs/` - Product strategy, feature briefs, operational guides
- `scripts/` - Automation for content validation and asset generation
- `tests/` - Unit (`tests/unit/`), E2E (`tests/e2e/`), fixtures (`tests/fixtures/`)

## Development Workflow

1. **Before PRs**: Ensure all checks pass locally:

   ```bash
   npm run lint && npm run lint:content && npm run build && npm test && npm run test:e2e && npm run test:a11y
   ```

2. **Content Changes**: After editing MDX/YAML/JSON in `content/` or `data/`, run:

   ```bash
   npm run lint:content  # Validates against Zod schemas
   npm run build         # Catches compile-time errors
   ```

3. **Component Development**:
   - Use existing UI components from `components/ui/` (Button, Card, StatCard, Section)
   - Follow the pattern in `components/sections/` for new sections
   - Server components by default; mark `"use client"` only when needed

4. **Testing Philosophy**:
   - Unit tests for `lib/` utilities and isolated component logic
   - E2E tests for user flows and integration scenarios
   - Accessibility tests to ensure WCAG compliance
   - Use `tests/fixtures/` for shared test data

## Important Conventions

- **Commit Messages**: Follow Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`) with imperative mood
- **Type Safety**: All content and data must pass Zod schema validation before rendering
- **Node Version**: Requires Node 22.x (enforced via `package.json` engines field)
- **Styling**: Tailwind CSS with custom tokens in `styles/theme.css` and `tailwind.config.ts`
- **Zero Warnings Policy**: ESLint runs with `--max-warnings=0`

## Key Documentation

- Strategy: `docs/tpri_site_plan_revised.md`
- Implementation: `TPRI_implementation_plan.md`
- Map Architecture: `docs/map-feature-overview.md`, `docs/MapLibre-Recognition-Map-Implementation.md`
- Content Ops: `docs/content-management.md`
- UI Overhaul: `docs/ui-overhaul-plan.md`

## Common Gotchas

1. **Content Schema Validation**: If you modify `content/schema.ts`, run `npm run lint:content` to catch any data that no longer validates.
2. **Map Tiling**: If countries duplicate/tile, check projection `fitExtent` and padding in `RecognitionMap.tsx:202-208`.
3. **Path Aliases**: Both TypeScript (`tsconfig.json`) and Vitest (`vitest.config.ts`) must have matching path aliases.
4. **E2E Test Server**: Playwright auto-starts dev server on port 3000 unless `PLAYWRIGHT_BASE_URL` is set.
5. **Husky Hooks**: `lint-staged` runs on pre-commit; ensure `npm run lint:staged` passes before committing.
