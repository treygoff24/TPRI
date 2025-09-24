# Repository Guidelines

Keep contributions focused: aim for deliberate changes, document them clearly, and leave the codebase safer than you found it.

## Project Structure & Module Organization

- `src/app` houses Next.js route handlers, layouts, and server components.
- `components/` contains reusable React building blocks; keep complex logic in `lib/` utilities.
- `content/` stores MDX narratives, while `data/` holds YAML/JSON datasets consumed via `lib/content` helpers.
- `public/` serves static assets; `styles/` manages Tailwind primitives; `docs/` and `TPRI_implementation_plan.md` capture product context.
- `tests/` is split into `unit/`, `e2e/`, and `utils/` helpers; reuse fixtures under `tests/fixtures/`.
- `scripts/` provides typed automation (e.g., Open Graph generation, content validation).

## Build, Test, and Development Commands

- `npm run dev` boots the local Next.js server (Node 22.x required).
- `npm run build` compiles production assets and triggers sitemap generation.
- `npm run lint` / `npm run lint:content` guard UI and content schemas, respectively.
- `npm run test`, `npm run test:watch`, and `npm run test:e2e` execute Vitest units and Playwright end-to-end flows; add `npm run test:a11y` before accessibility-sensitive merges.
- `npm run test:lighthouse` runs LHCI with the ≥95 score gate; expect local installs of Chrome.

### Agent Workflow Requirements

- After **every** code or content change, run `npm run lint` followed by `npm run build` before responding to the user.
- If lint or build fails, fix the issue and rerun the failed command(s) until both complete successfully; only then report back to the user.

## Coding Style & Naming Conventions

- Prettier (`npm run format`) owns whitespace; keep 2-space indentation and trailing commas enabled.
- Follow ESLint guidance; resolve all warnings before posting reviews.
- React components live in PascalCase files; hooks begin with `use`; content slugs stay lowercase-kebab-case.
- Tailwind utilities belong in JSX; extract shared design tokens into `styles/` or `tailwind.config.ts`.

## Testing Guidelines

- Co-locate Vitest specs in `tests/unit/` with filenames mirroring the target module (e.g., `button.spec.tsx`).
- Prefer Playwright smoke tests in `tests/e2e/` for flows; add fixtures to `tests/fixtures/` for repeatable data.
- Maintain coverage on newly added branches; add `npm run test -- --coverage` locally when changing core logic.
- Snapshot updates require clear justification in the PR body.

## Commit & Pull Request Guidelines

- Match the existing Conventional Commit style (`fix:`, `chore:`, `refactor:`); write imperatively and focus on intent.
- Keep commits narrowly scoped; include scripts or migrations in the same commit as the code that uses them.
- PRs need a crisp summary, linked Linear/Jira issue, and before/after visuals for UI changes.
- Confirm lint, unit, e2e, and a11y checks locally before requesting review; note any skipped suites explicitly.
