# TPRI Website Implementation Plan

---

## Step 0 – Preserve the Strategy Brief

- Keep `tpri_site_plan_revised.md` untouched until it is relocated during Step 1.
- Perform all work within `/Users/treygoff/Development/TPRI`.

---

## Step 1 – Initialize the Repository

1. Run `git init`.
2. Create `.gitignore` via `npx gitignore node,macos` and append Next.js build artefacts (`.next`, `out`, `coverage`, etc.).
3. Author a starter `README.md` that links to the strategy brief and outlines the site goal.
4. Pre-create folders needed immediately:
   ```bash
   mkdir -p docs \
     content/{sections,faqs,downloads,stats} \
     public/data \
     public/{downloads,images/{hero,case-studies,og},icons} \
     components/{common,sections,ui} \
     lib scripts styles tests/{e2e,fixtures,utils}
   ```
5. Move the strategy brief into `docs/`: `mv tpri_site_plan_revised.md docs/`.

---

## Step 2 – Scaffold Next.js

1. Execute `npx create-next-app@latest . --typescript --eslint --tailwind --app --src-dir --import-alias "@/*" --use-npm --no-experimental-app`.
2. Remove boilerplate files that will be replaced (`app/page.tsx`, default styles, sample API routes, favicon placeholders).
3. Add `.nvmrc` with `22.20.0` and include `"engines": { "node": "22.x" }` in `package.json`.
4. Verify `package.json` scripts include `lint`, `build`, `start`; add empty placeholders for `test`, `test:e2e`, `test:a11y`, `test:lighthouse` (to be filled later).

---

## Step 3 – Configure Tooling & Styling

1. Tailwind configuration:
   - Define custom theme tokens in `tailwind.config.ts`, referencing CSS variables for colors, fonts, spacing.
   - Install `@tailwindcss/typography` and enable it.
   - Create `styles/theme.css` with light/dark palettes from the strategy brief and import it in the root layout.
2. Fonts:
   - Use `next/font/google` inside `app/fonts/index.ts` to load `Source Serif 4`, `Inter`, and `JetBrains Mono`.
   - Expose helper exports (`headingFont`, `bodyFont`, `monoFont`).
3. ESLint & Prettier:
   - Extend `next/core-web-vitals`; add rules for named exports, import ordering, and banning default exports in components.
   - Create `.prettierrc` (2 spaces, semicolons true, single quotes false) and `.prettierignore` covering build output.
4. Git hooks:
   - Install `husky` and `lint-staged`.
   - Configure a pre-commit hook that runs `npm run lint:staged`.
5. Environment variables:
   - Create `.env.example` listing `GA4_MEASUREMENT_ID`, `VERCEL_ANALYTICS_ID`, `CRM_WEBHOOK_URL`, `RESEND_API_KEY`, `CALENDLY_BOOKING_URL`, `NEXT_PUBLIC_SITE_URL`.

---

## Step 4 – Model Content

1. Define TypeScript types and `zod` schemas in `content/schema.ts` for sections, stats, FAQs, downloads, endorsements.
2. Author content sources:
   - MDX files in `content/sections/` (hero, paragua-countdown, problem, executive-summary, how-it-works, strategic-zones, case-study, comparison, faq-intro, downloads, contact, footer).
   - YAML/JSON for structured data (`content/faqs/policymakers.yml`, `content/faqs/advanced.yml`, `content/downloads.yml`, `content/endorsements.yml`, `content/stats/key-metrics.json`).
3. Implement `scripts/validate-content.ts` that loads every content source, validates with `zod`, and prints actionable errors.
4. Add `npm run lint:content` pointing to the validation script and include it after `npm run lint` in your standard workflow.
5. Document how to update content in `docs/content-management.md` (include commands for validation and OG image regeneration).

---

## Step 5 – Prepare Data Assets

1. Build `data/timeline.json` describing chronological events (fields: `date`, `title`, `summary`, `impact`, `sourceUrl`).
2. Populate map data:
   - `public/data/countries-western-hemisphere.geo.json` – simplified GeoJSON of relevant countries.
   - `public/data/recognition.json` – canonical recognition dataset (metadata, citations, change history).
3. Create `data/metrics.json` for top-level stats (opportunity size, investment deltas, etc.).
4. Maintain `docs/references.md` with citations used across stats, timeline, and narrative sections.

---

## Step 6 – Layout Shell & Providers

1. Organize the `app/` directory:
   ```text
   app/
   ├── (marketing)/
   │   ├── layout.tsx
   │   └── page.tsx
   ├── api/
   │   ├── coalition/route.ts
   │   ├── contact/route.ts
   │   └── og/route.tsx
   ├── fonts/
   └── sw.ts
   ```
2. Implement `app/(marketing)/layout.tsx`:
   - Wrap with `<html lang="en" suppressHydrationWarning>`.
   - Import fonts and `styles/theme.css`.
   - Provide a `Providers` component adding `next-themes`, analytics, and service worker registration.
   - Render skip link, persistent `StickyHeader`, main content wrapper, and placeholder `Footer`.
3. Configure metadata:
   - Use `generateMetadata` to define title templates, canonical URL, default OG/Twitter tags.
   - Inject JSON-LD for the `GovernmentService` schema via helper in `lib/seo.ts`.
4. Implement supporting libs:
   - `lib/content.ts` – loads MDX/YAML at build time and returns typed payloads.
   - `lib/seo.ts` – metadata helpers.
   - `lib/metrics.ts` – utilities for countdown calculations and number formatting.
   - `lib/map.ts` – transforms GeoJSON + recognition data for the map component.
5. Create `MiniTOC` provider + hook using `IntersectionObserver` to track active sections (client-side only).

---

## Step 7 – Build Sections in Page Order

Implement each section under `components/sections/` and compose them in `app/(marketing)/page.tsx` using data from `lib/content`.

1. **Hero (`HeroSection.tsx`)**
   - Flag-inspired gradient background with CSS-only wave animation honoring `prefers-reduced-motion`.
   - Large serif H1, concise subhead, three CTA buttons (`CTAButton` variant) pointing to anchors (`#briefing`, `#downloads`, `#coalition`).
2. **Paraguay Countdown (`ParaguayCountdownSection.tsx`)**
   - Compute days since Paraguay reference date via `lib/metrics.ts`.
   - Add pulsing indicator (fallback: static badge) and contextual blurb from MDX.
3. **$137 Billion Problem (`ChinaExpansionSection.tsx`)**
   - `Timeline` component: horizontal scroll on mobile, vertical stack on desktop.
   - `InteractiveMap` using `react-simple-maps` with tooltips; include static SVG fallback inside `<noscript>`.
   - `StatCard` grid with animated counters.
4. **Executive Summary (`ExecutiveSummarySection.tsx`)**
   - Render bullet tiles from MDX; include CTA linking to downloads.
5. **How TPRI Works (`HowItWorksSection.tsx`)**
   - `ProgressiveContent` tabs for Quick Take, Full Explanation, Technical Deep Dive (pull separate MDX partials).
   - Include SVG flow diagram with accessible descriptions.
6. **Strategic Economic Zones (`StrategicZonesSection.tsx`)**
   - Callout badges correcting misconceptions.
   - `FivePillars` grid using lucide-react icons.
   - Comparison cards for “Good vs Bad zones” with responsive layout.
7. **Case Study (`ProsperaCaseStudySection.tsx`)**
   - Background imagery, key metrics, testimonial quotes.
   - `BeforeAfter` comparison for TPRI impact projections.
   - `SourceList` referencing citations.
8. **Comparison (`TPRIVsPRISection.tsx`)**
   - Responsive `ComparisonTable` highlighting TPRI column.
   - Bottom-line calculator block referencing metrics data.
9. **FAQ (`FAQSection.tsx`)**
   - `FAQAccordion` built on shadcn `Accordion` with deep-linkable items.
   - Toggle for advanced questions and search field with debounced filtering.
10. **Downloads & Resources (`DownloadsSection.tsx`)**
    - `ResourceCard` list showing title, description, tags, size, updated date.
    - Mark offline cacheable files with `data-offline` attribute for service worker.
11. **Contact & Coalition (`ContactSection.tsx`)**
    - Multi-step `CoalitionForm` using `react-hook-form` + `zod`.
    - General contact form posting to `/api/contact`.
    - Calendly popup trigger; lazy-load script on interaction with `mailto:` fallback.
12. **Footer (`Footer.tsx`)**
    - Quick links, contact details, optional socials, “Back to top” button.

---

## Step 8 – Reusable Component Library

Implement supporting components in `components/common` or `components/ui` before/while building sections.

- `SectionWrapper.tsx` – standardizes section spacing and anchor ids.
- `SectionHeader.tsx` – eyebrow, headline, description formatting.
- `Button.tsx` / `CTAButton.tsx` – button variants with analytics hooks.
- `StickyHeader.tsx` + `ScrollIndicator.tsx` – persistent navigation with progress bar.
- `MiniTOC.tsx` – desktop floating navigation tied to IntersectionObserver.
- `StatCard.tsx`, `ComparisonTable.tsx`, `EndorsementWall.tsx`, `FAQAccordion.tsx`, `ProgressiveContent.tsx`, `ResourceCard.tsx`, `CoalitionForm.tsx`, `SectionSkeleton.tsx`.
- Export common components through `components/index.ts` for convenient imports.

---

## Step 9 – Backend Routes & Integrations

1. **`POST /api/contact`** – Validate payload, forward to `CRM_WEBHOOK_URL`, return JSON success/error responses.
2. **`POST /api/coalition`** – Handle multi-step form data, forward to CRM and optionally trigger transactional email via Resend/Postmark when credentials exist.
3. **`GET /api/og`** – Generate dynamic Open Graph images using `@vercel/og` and section metadata.
4. **Calendly integration** – Provide on-demand loader; fallback to `mailto:` instructions if script fails.
5. **Service worker (`app/sw.ts`)** – Pre-cache downloads marked offline, use cache-first for PDFs and stale-while-revalidate for JSON.
6. **Analytics (`lib/analytics.ts`)** – Expose `trackEvent`; embed GA4 script and `<Analytics />` from Vercel; respect Do Not Track if configured.
7. **Sitemap** – Add `next-sitemap.config.js`, update `package.json` script `postbuild` to run `next-sitemap`.

---

## Step 10 – Theming, Accessibility, Motion

1. Implement theme toggling with `next-themes`, defaulting to system preference; expose toggle in header.
2. Verify color contrast for both themes (use tools or automated checks); adjust variables if any pair fails AA.
3. Use fluid typography (`clamp`) and maintain ~70ch measure for prose sections.
4. Ensure semantic HTML structure, labelled regions, keyboard focus rings, descriptive alt text.
5. Wrap animations in `useReducedMotion`; provide static alternatives.
6. Add `eslint-plugin-jsx-a11y` and address any warnings.

---

## Step 11 – Testing & Quality Gates

1. Unit/integration tests (Vitest + Testing Library): `ProgressiveContent`, `CoalitionForm`, `MiniTOC`, `StickyHeader`, `ResourceCard` offline flag, and any data transformers.
2. Playwright e2e tests (desktop + mobile viewports): hero renders CTAs, countdown accuracy (±1 day tolerance), timeline/map presence, downloads accessible, forms submit (mock network), dark mode persistence, offline PDF availability.
3. Accessibility automation: integrate `@axe-core/playwright` into e2e runs.
4. Performance budgets: configure `lighthouse-ci` with ≥95 targets for performance, accessibility, best-practices, SEO.
5. Update `package.json` scripts and add `npm run lint`, `npm run lint:content`, `npm run test`, `npm run test:e2e`, `npm run test:a11y`, `npm run test:lighthouse`.
6. Create `.github/workflows/ci.yml` running install, lint, content validation, unit tests, Playwright (headless), and optionally Lighthouse on main or nightly.

---

## Step 12 – Deployment & Infrastructure

1. Create Vercel project pointing to the repository; set build command `npm run build`.
2. Configure environment variables in Vercel for GA4, CRM webhook, Resend, Calendly, site URL, etc.
3. Enable Vercel Analytics and Web Vitals.
4. Connect production domain (e.g., `tpri.org`), configure apex/`www` routing, and enforce HTTPS.
5. Set deployment notifications (email/Slack) if requested.
6. Establish cache-busting for PDFs (rename file or append version query when updating).

---

## Step 13 – Content & Asset Production

1. Draft MDX copy for each section based on the strategy brief; include `<Citation id="ref-xx" />` pointing to `docs/references.md`.
2. Produce imagery:
   - Hero background (`hero-flag.webp`), case-study photography, stat illustrations.
   - Export responsive WebP versions and generate blur placeholders (`plaiceholder` or similar).
   - Create static map SVG fallback stored in `public/images/map-fallback.svg`.
3. Assemble PDFs for downloads; place optimized files in `public/downloads/` and record metadata in `content/downloads.yml` (title, description, audience tags, file path, size, updated date, offline flag).
4. Run `npm run lint:content` to confirm data integrity and fix any reported issues.

---

## Step 14 – Final QA & Launch

1. Execute full command suite: `npm run lint`, `npm run lint:content`, `npm run test`, `npm run test:e2e`, `npm run test:a11y`, `npm run test:lighthouse`.
2. Manual checks:
   - Mobile (iPhone SE) and desktop (1440px) visual review.
   - Countdown displays accurate day count.
   - Timeline and map interactivity confirmed.
   - Downloads accessible and, after caching, available offline (test via devtools offline mode or disabling network).
   - Contact and coalition forms submit to staging endpoints without errors.
   - Dark mode toggle persists after reload.
   - Browser console clean of errors/warnings.
   - GA4 DebugView receives CTA, download, and form events.
   - `sitemap.xml` and `robots.txt` accessible.
3. Document the launch in `docs/changelog.md` (create file now if absent) and push final commit.
4. Merge to main, monitor Vercel deployment logs, and verify production site manually.

---

## Step 15 – Immediate Post-launch Duties

1. Confirm production analytics, CRM webhooks, and transactional emails are functioning within 24 hours.
2. Schedule recurring reminders for monthly content/stat updates and dependency review (`npm outdated`, `npm audit`).
3. Plan quarterly accessibility spot checks; log outcomes in `docs/changelog.md`.
4. Monitor Vercel Analytics for performance regressions and address anomalies promptly.

---

## Reference Files to Maintain

- `docs/tpri_site_plan_revised.md` – original strategy document.
- `docs/content-management.md` – authoring workflow instructions.
- `docs/references.md` – citations for facts and statistics.
- `docs/changelog.md` – running log of updates (create at launch if missing).
