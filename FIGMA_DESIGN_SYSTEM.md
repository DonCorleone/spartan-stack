# Figma Design System Rules

## Stack

- **Framework**: AnalogJS (Angular meta-framework, SSR, Vite)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`) — no `tailwind.config.ts` theme extension; tokens live in CSS
- **Component lib**: spartan-ng `@spartan-ng/helm/*` (headless brain + Tailwind-styled helm directives)
- **CVA**: `class-variance-authority` for variant management
- **Build**: Nx monorepo

---

## 1. Design Tokens

All tokens defined in `spartan-stack/src/styles.css` under `@theme` and `:root`.

### Typography (`@theme` block)
```css
--text-display:      3rem / 3.5rem / 700
--text-heading:      2rem / 2.5rem / 600
--text-title:        1.5rem / 2rem / 600
--text-body:         1rem / 1.5rem / 400
--text-body-small:   0.875rem / 1.25rem / 400
--text-label:        1rem / 1.25rem / 500
--text-caption:      0.75rem / 1rem / 500
--font-sans / --font-geist: 'Geist' (variable font, `public/fonts/Geist-Variable.woff2`)
```

Use in Tailwind: `text-display`, `text-heading`, etc.

### Color Tokens (`:root`)
OKLCH semantic tokens — light and dark variants.

**Semantic surface tokens:**
```css
--background, --foreground
--card, --card-foreground
--popover, --popover-foreground
--primary, --primary-foreground
--secondary, --secondary-foreground
--muted, --muted-foreground
--accent, --accent-foreground
--destructive
--border, --input, --ring
--sidebar-*, --sidebar-ring
```

**Button color tokens (custom):**
```css
--btn-default / --btn-default-darker / --btn-default-lighter
--btn-primary / --btn-primary-darker / --btn-primary-lighter
--btn-secondary / --btn-secondary-darker / --btn-secondary-lighter
--btn-tertiary / --btn-tertiary-darker / --btn-tertiary-lighter
```

**Chart tokens:** `--chart-1` through `--chart-5`

**Radius:** `--radius: 0.625rem`

### Dark Mode
Dual mechanism: `.dark` class (`--root.dark`) + `@media (prefers-color-scheme: dark)`. Override via `.dark` class on root.

---

## 2. Component Architecture

Components live in `libs/ui/<component>/src/lib/`.

Pattern per component:
```
hlm-<component>.ts          — Angular Directive/Component (applies CVA classes via host)
hlm-<component>.token.ts    — InjectionToken for config defaults
```

**CVA variant pattern** (`hlm-button.ts`):
```ts
export const buttonVariants = cva(
  '<base-classes>',
  {
    variants: {
      variant: { default: '...', primary: '...', secondary: '...', tertiary: '...' },
      size: { default: '...', sm: '...', lg: '...', icon: '...' },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);
```

Variants map directly to `--btn-*` CSS tokens, not hardcoded colors.

**Import pattern in app:**
```ts
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmRadioGroupImports } from '@spartan-ng/helm/radio-group';
```

**Directive usage (not components):**
```html
<button hlmBtn variant="primary">Click</button>
```

**Add new spartan-ng component:**
```bash
npx nx g @spartan-ng/cli:ui --name=<component>
```
Output: `libs/ui/<component>/` with path alias `@spartan-ng/helm/<component>`.

---

## 3. Styling Approach

- **No CSS Modules / Styled Components** — Tailwind utility classes only
- **Arbitrary CSS var references**: `bg-(--btn-primary)` syntax (Tailwind v4)
- **Global styles**: `spartan-stack/src/styles.css` — tokens + base layer reset
- **Component styles**: host class binding via `classes()` helper from `@spartan-ng/helm/utils`
- **Responsive**: standard Tailwind breakpoint prefixes (`md:`, `lg:`)

---

## 4. Project Structure

```
spartan-stack/
  src/
    app/
      pages/          # file-based routing: (home).page.ts = /, about.page.ts = /about
      app.config.ts
    server/routes/api/ # API routes: api/v1/hello.ts = GET /api/v1/hello
    styles.css         # ALL tokens + global styles
  public/
    fonts/             # Geist-Variable.woff2
    icons/             # SVG icons
  tailwind.config.ts   # content globs only, no theme extension (tokens in CSS)

libs/ui/
  button/src/lib/
    hlm-button.ts
    hlm-button.token.ts
  radio-group/src/lib/
    hlm-radio-group.ts
    hlm-radio.ts
    hlm-radio-indicator.ts
    hlm-radio.token.ts
  utils/               # shared `classes()` helper
```

---

## 5. Icon System

- Location: `spartan-stack/public/icons/`
- Format: SVG files served statically
- Usage: reference via `/icons/<name>.svg` in `<img src>` or inline SVG
- No icon font or sprite system detected; direct SVG usage

Some SVG icons co-located with components (e.g., `radio-ring.svg`, `radio-ring-disabled.svg` in `libs/ui/button/src/lib/`).

---

## 6. Asset Management

- **Fonts**: `spartan-stack/public/fonts/` — referenced as `/fonts/Geist-Variable.woff2` in `@font-face`
- **Icons**: `spartan-stack/public/icons/`
- **Static assets**: `spartan-stack/public/` served at root
- No CDN config detected; AnalogJS/Vite handles asset optimization

---

## 7. Figma → Code Mapping

When implementing Figma designs:

| Figma concept | Code target |
|---|---|
| Color style | CSS var in `styles.css` `:root` block |
| Text style | `@theme` text token in `styles.css` |
| Component variant | CVA `variants` object in `hlm-*.ts` |
| Component instance | `hlmBtn`, `hlm-radio` etc. directives with `variant` input |
| Border radius | `--radius` token or `rounded-*` Tailwind class |
| Spacing | Tailwind spacing scale (v4 default) |
| Dark mode | `@media (prefers-color-scheme: dark)` or `.dark` class |

**When adding a new Figma component:**
1. Run `npx nx g @spartan-ng/cli:ui --name=<component>`
2. Add color tokens to `styles.css` `:root` following `--btn-*` naming pattern
3. Define CVA variants in `hlm-<component>.ts` referencing those tokens
4. Export via `@spartan-ng/helm/<component>`
