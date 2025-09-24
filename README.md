# Total Political Risk Insurance (TPRI) Campaign Site

This repository houses the Next.js implementation for the Total Political Risk Insurance campaign initiative. The product delivers an accessible, mobile-first experience that equips policymakers and coalition partners with the data, narrative, and resources required to advance TPRI legislation.

## Mission + Outcomes

- Persuade policymakers that pairing TPRI with Strategic Economic Zones counters PRC economic encroachment.
- Surface the $3T opportunity, rapid-read narratives, and coalition onboarding flows.
- Provide briefing-ready downloads, FAQs, and contact capture for staffers.

## Tech Stack

- **Framework:** Next.js 15 (App Router) with React 19 and TypeScript.
- **Styling:** Tailwind CSS with custom utility merges.
- **Content:** MDX sections, YAML datasets, and JSON stats stored under `content/` and `data/`.
- **Tooling:** ESLint, Prettier, Vitest, Playwright, Lighthouse CI.

## Key Documents

- Strategy brief – [`docs/tpri_site_plan_revised.md`](docs/tpri_site_plan_revised.md)
- Implementation plan – [`TPRI_implementation_plan.md`](TPRI_implementation_plan.md)
- Map feature architecture – [`docs/map-feature-overview.md`](docs/map-feature-overview.md)
- Content operations – [`docs/content-management.md`](docs/content-management.md)

## Development Workflow

1. Use Node 22.x (enforced via `package.json` engines).
2. Install dependencies: `npm install`.
3. Run the dev server: `npm run dev` (Next.js).
4. After code/content edits, run:
   - `npm run lint`
   - `npm run build`
5. Execute additional guards before PRs merge:
   - `npm run lint:content`
   - `npm run test`
   - `npm run test:e2e`
   - `npm run test:a11y`
   - `npm run test:lighthouse`

## Feature Notes

- **China Expansion Map:** Server loads GeoJSON + recognition data via `lib/map-data.ts`, validated against `content/schema.ts`, and hydrates the client renderer in `components/common/interactive-map.tsx`. See the dedicated map document for troubleshooting details.
- **Content Pipeline:** `lib/content.ts` compiles MDX sections, loads stats/timeline datasets, and powers the marketing page assembly in `src/app/(marketing)/page.tsx`.
- **Downloads & CTAs:** Structured through Zod schemas to guarantee presentation integrity and analytics consistency.

## Scripts & Automation

- `npm run format` – Prettier.
- `npm run lint:staged` – Husky pre-commit helper.
- `npm run generate:og` – Open Graph asset generation (requires local Chrome).
- `npm run build` → `postbuild` runs `next-sitemap` automatically.

## Testing & Coverage

- Unit/component tests: `tests/unit/`
- E2E/Accessibility: `tests/e2e/` (Playwright) with shared fixtures in `tests/fixtures/`.
- Consider `npm run test -- --coverage` when touching core logic to maintain branch coverage.

## Directory Cheat Sheet

- `src/app/` – Route handlers, layouts, server components.
- `components/` – Reusable React modules (client + server aware).
- `lib/` – Typed utilities, data loaders, and schema helpers.
- `content/` – MDX narratives, YAML items.
- `data/` – JSON datasets (`map/`, `timeline.json`, `metrics.json`, etc.).
- `public/` – Static assets (OG images, map fallback SVG).
- `docs/` – Product context, feature briefs, operational guides.
- `scripts/` – Typed automation for content validation and asset generation.

## Contribution Expectations

- Follow Conventional Commits (e.g., `fix:`, `chore:`) with imperative descriptions.
- Keep PRs narrowly scoped; include visuals for UI changes and link Linear/Jira issues.
- Confirm lint, unit, e2e, accessibility checks locally before requesting review.
- Document data or schema changes in the relevant doc within `docs/`.

Stay aligned with the overall campaign mission and leave the codebase safer than you found it.
