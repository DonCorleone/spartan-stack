# Spartan Stack

A modern Angular full-stack starter built with [AnalogJS](https://analogjs.org), [spartan-ng](https://www.spartan.ng), and [Tailwind CSS v4](https://tailwindcss.com) — managed as an [Nx](https://nx.dev) monorepo.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | [Angular 22](https://angular.dev) |
| Meta-framework | [AnalogJS 2](https://analogjs.org) — SSR, file-based routing, API routes |
| Build system | [Nx 23](https://nx.dev) |
| UI components | [spartan-ng](https://www.spartan.ng) (brain + helm) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Typography | [Geist](https://vercel.com/font) — variable font |

---

## Project Structure

```
spartan-stack/
├── spartan-stack/          # AnalogJS app
│   └── src/
│       ├── app/pages/      # File-based routes
│       └── server/routes/  # API routes (Nitro)
└── libs/ui/                # spartan-ng helm components
    ├── button/
    ├── radio-group/
    └── utils/
```

---

## Routes

| Path | File |
|---|---|
| `/` | `app/pages/(home).page.ts` |
| `/typography` | `app/pages/typography.page.ts` |
| `GET /api/v1/hello` | `server/routes/api/v1/hello.ts` |

---

## UI Components

Components are headless [spartan-ng brain](https://www.spartan.ng) primitives wrapped with Tailwind-styled [helm](https://www.spartan.ng/documentation/installation) directives. Each component lives in its own Nx library under `libs/ui/`.

### Button

Four variants derived from a custom Figma design system:

```html
<button hlmBtn variant="default">Default</button>
<button hlmBtn variant="primary">Primary</button>
<button hlmBtn variant="secondary">Secondary</button>
<button hlmBtn variant="tertiary">Tertiary</button>
```

### Radio Group

```html
<hlm-radio-group [(ngModel)]="value">
  <div class="flex items-center gap-3">
    <hlm-radio value="a" inputId="a">
      <hlm-radio-indicator indicator />
    </hlm-radio>
    <label for="a">Option A</label>
  </div>
</hlm-radio-group>
```

---

## Typography

Type scale based on Geist, registered as Tailwind v4 utilities:

| Class | Size | Weight | Line Height |
|---|---|---|---|
| `text-display` | 48px | Bold | 56px |
| `text-heading` | 32px | SemiBold | 40px |
| `text-title` | 24px | SemiBold | 32px |
| `text-body` | 16px | Regular | 24px |
| `text-body-small` | 14px | Regular | 20px |
| `text-label` | 16px | Medium | 20px |
| `text-caption` | 12px | Medium | 16px |

---

## Commands

```bash
# Dev server (port 4200, HMR)
npx nx serve spartan-stack

# Production build
npx nx build spartan-stack

# Unit tests (Vitest)
npx nx test spartan-stack

# E2E tests (Playwright)
npx nx e2e spartan-stack-e2e

# Lint
npx nx lint spartan-stack

# Add a new spartan-ng UI component
npx nx g @spartan-ng/cli:ui --name=<component>
# Then add the alias to spartan-stack/vite.config.ts
```

---

## Adding Components

1. Generate: `npx nx g @spartan-ng/cli:ui --name=<component>`
2. Add Vite alias in `spartan-stack/vite.config.ts`:
   ```ts
   '@spartan-ng/helm/<component>': resolve(__dirname, '../libs/ui/<component>/src/index.ts'),
   ```
3. Style `libs/ui/<component>/src/lib/hlm-*.ts` using the design token palette in `styles.css`
4. Restart the Angular Language Server in your IDE after generation

---

## Design Tokens

Button color palette (defined in `spartan-stack/src/styles.css`):

| Token | Default | Hover/Active | Disabled |
|---|---|---|---|
| `--btn-default` | `#91afa1` | `#406e58` | `#abc17a` |
| `--btn-primary` | `#b7a392` | `#b67b66` | `#e2cbb5` |
| `--btn-secondary` | `#eacfa6` | `#b7ac9d` | `#eadbc0` |
| `--btn-tertiary` | `#d46c40` | `#943a4d` | `#e6cdbf` |
