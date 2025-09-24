# Total Political Risk Insurance (TPRI) Campaign Site

This repository houses the Next.js implementation for the Total Political Risk Insurance campaign initiative. The project delivers a fast, accessible, mobile-first experience that equips policymakers and coalition partners with the data, narrative, and resources required to advance TPRI legislation.

## Project Overview

- **Mission:** Persuade policymakers that coupling TPRI with Strategic Economic Zones is critical to countering China's economic expansion.
- **Primary conversions:** Immediate understanding of the $3T opportunity, staff-ready downloads, coalition onboarding, and briefing requests.

## Key Documents

- Strategy brief: [`docs/tpri_site_plan_revised.md`](docs/tpri_site_plan_revised.md).
- Implementation plan: [`TPRI_implementation_plan.md`](TPRI_implementation_plan.md).

## Getting Started

Full setup, content modeling, and deployment instructions are captured in the implementation plan. Follow each step sequentially to reproduce the production-ready environment.

### Quality Gates

- `npm run lint` – ESLint with accessibility checks.
- `npm run lint:content` – Validate MDX/YAML/JSON datasets via Zod schemas.
- `npm run test` – Vitest unit and integration coverage for shared components.
- `npm run test:e2e` – Playwright smoke tests across desktop/mobile viewports.
- `npm run test:a11y` – Automated axe-core sweep.
- `npm run test:lighthouse` – Lighthouse CI enforcing ≥95 across all categories.
