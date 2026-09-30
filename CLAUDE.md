Strictly follow the rules in @AGENTS.md

## Commands

All commands run via Nx from workspace root (`/Users/linuswieland/Documents/playground/Spartan/spartan-stack`).

```bash
# Dev server (port 4200, HMR)
npx nx serve spartan-stack

# Build (production)
npx nx build spartan-stack

# Unit tests (Vitest)
npx nx test spartan-stack

# Single test file
npx nx test spartan-stack --testFile=spartan-stack/src/app/app.component.spec.ts

# E2E tests (Playwright)
npx nx e2e spartan-stack-e2e

# Lint
npx nx lint spartan-stack

# Add spartan-ng UI component (helm/brain)
npx nx g @spartan-ng/cli:ui --name=<component>
```

## Architecture

Nx monorepo with one AnalogJS app (`spartan-stack/`) and shared UI libs (`libs/ui/`).

**App** (`spartan-stack/src/`):
- `app/pages/` — file-based routing (AnalogJS convention: `(home).page.ts` = `/`, `about.page.ts` = `/about`)
- `server/routes/api/` — server-side API routes (e.g. `api/v1/hello.ts` = `GET /api/v1/hello`)
- SSR enabled: `main.server.ts` + `app.config.server.ts`

**UI libs** (`libs/ui/`): spartan-ng "helm" components (headless `@spartan-ng/brain` + Tailwind-styled wrappers). Each component is a buildable Nx library. `components.json` controls CLI generation — `importAlias: @spartan-ng/helm`, `style: nova`, output goes to `libs/ui/`.

**Styling**: Tailwind CSS v4 via `@tailwindcss/postcss`. Config in `spartan-stack/tailwind.config.ts`. Global styles in `spartan-stack/src/styles.css`.

**Path aliases**: defined in `tsconfig.base.json` — libs are imported as `@spartan-ng/helm/<component>`.
