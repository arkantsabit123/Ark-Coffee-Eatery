<!-- ARK DOCUMENTATION V2.0 — AUTHORITATIVE RULES BELOW TAKE PRECEDENCE OVER LEGACY V1 EXAMPLES -->
> **Version 2.0 | Status: Specification Ready — local frontend implemented; production NOT verified. See `verification-checklist.md` for evidence.**
> **Important:** The original v1 content is retained for detailed historical requirements. Any conflicting v1 commands, example code, numerical targets, business claims, or deployment statements are superseded by the **V2 normative amendments** at the end of this file, and by `docs/README.md`. Do not copy legacy Apps Script browser `fetch()` examples into production. `Production Ready` references in the retained historical sections do not describe the actual release state.
> **Source:** User-provided v1 file `Design System.md`. New v2 requirements are proposed engineering improvements, not verified facts about the business.

# Design System v2.0.0 — Ark Coffee & Eatery

**A complete visual and interaction reference for the Ark Coffee & Eatery website.** This document defines the design tokens, typography, spacing, color palette, component styles, motion rules, and layout grid that make up the site's visual language — so every section stays consistent, warm, and inviting.

---

## Document Information

| Property | Value |
|----------|-------|
| Version | 1.0.0 |
| Last Updated | 2026-11-17 |
| Status | Production Ready |
| Owner | Ark Coffee & Eatery |
| Companion Docs | `blueprint.md`, `content-guide.md`, `cheatsheets.md`, `deployment-guide.md` |
| Framework | Astro 4.x + Tailwind CSS 3.4 |
| Design Philosophy | Warm, editorial, performance-first, content-first, mobile-first |

---

## Purpose of This Guide

This document exists so that:

1. **Visual consistency is enforced** — every component pulls from the same token set, not ad-hoc values.
2. **New sections inherit the design** — the system scales beyond the launch page without redesign.
3. **Handoff is unambiguous** — designers and developers share one source of truth.
4. **The 100/100 Lighthouse target is protected** — design decisions are constrained by performance budgets.
5. **The warm, editorial brand feeling is preserved** — every color, font, and spacing choice reinforces "premium coffee shop, not template."

This is **not** a brand identity guide. It is an implementation reference for the Ark Coffee & Eatery website.

---

## Table of Contents

1. Design Principles
2. Design Tokens
3. Color System
4. Typography
5. Spacing Scale
6. Layout Grid & Containers
7. Border Radius & Elevation
8. Component Library
9. Iconography
10. Imagery & Photography Direction
11. Motion & Interaction
12. Responsive Design
13. Accessibility in Design
14. Dark Mode (Future)
15. Design Tokens → Tailwind Mapping
16. File Structure
17. Governance

---

## 1. Design Principles

The Ark Coffee & Eatery website is designed against six principles, in priority order:

### 1.1 Warmth First

Every visual choice must feel warm and inviting — like stepping into the café. Cream backgrounds, brown tones, golden hour photography, generous whitespace. If a design choice feels cold or corporate, it is rejected.

- Warm cream background (#FDF8F3), not pure white
- Warm brown (#4A2C2A), not black
- Amber accent (#D97706) for highlights
- Photography with golden hour, warm lighting, wood textures

### 1.2 Performance First

Every visual choice must earn its bytes. No web fonts beyond one display font, no heavy illustrations, no CSS-in-JS runtimes. If a design choice would push Lighthouse below 100, it is rejected.

- One display font (woff2, ~25 KB) + system body stack
- WebP images with explicit dimensions
- Tailwind purges all unused CSS
- Total page weight budget: **< 600 KB**

### 1.3 Content First

Design serves the food and coffee. Layout is chosen to make the menu scannable and the atmosphere tangible, not to show off visual effects.

- One primary message per viewport
- Generous whitespace around food photography
- No carousels, no auto-rotating content
- CTAs are the highest-contrast elements
- Food photos are large, warm, and appetizing

### 1.4 Mobile First

Base styles target 375 px. Enhancements layer on at `md:` (768 px) and `lg:` (1024 px) breakpoints.

- Single-column on mobile
- Touch targets ≥ 44 × 44 px
- Text never below 16 px
- Sticky WhatsApp button always within thumb reach
- No hover-only interactions

### 1.5 Accessible by Default

Every component is built accessible first, not retrofitted.

- Contrast ratio ≥ 4.5:1 for body text
- Visible focus states on all interactive elements
- Semantic HTML before ARIA
- Motion respects `prefers-reduced-motion`
- Form labels always visible

### 1.6 Systematized, Not Custom

Every value comes from a token. No `margin: 37px`, no `#3b82f6` typed inline. If a new value is needed, it is added to the token set first.

---

## 2. Design Tokens

Design tokens are the atomic values of the system. In this project, tokens are expressed as **Tailwind utility classes** — there is no separate token file, because Tailwind's default scale *is* the token set (with a few overrides in `tailwind.config.mjs`).

### 2.1 Token Categories

| Category | Source | Example |
|----------|--------|---------|
| Color | Tailwind palette + custom `ark` scale | `bg-[#FDF8F3]`, `text-stone-900` |
| Typography | Tailwind defaults + custom display font | `text-4xl`, `font-bold`, `font-display` |
| Spacing | Tailwind default scale | `px-4`, `py-16`, `gap-6` |
| Radius | Tailwind defaults | `rounded-lg`, `rounded-xl`, `rounded-2xl` |
| Shadow | Tailwind defaults | `shadow-sm`, `shadow-lg`, `shadow-2xl` |
| Breakpoints | Tailwind defaults | `sm:`, `md:`, `lg:` |

### 2.2 Custom Tokens (tailwind.config.mjs)

```js
// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        display: ['Inter Display', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'screen-xl': '1200px',
      },
      colors: {
        ark: {
          cream: '#FDF8F3',       // Page background
          'cream-dark': '#F5E6D3', // Subtle section background
          brown: '#4A2C2A',       // Primary brand
          'brown-dark': '#3A1F1D', // Primary hover
          amber: '#D97706',       // Accent (best seller, highlights)
          'amber-light': '#FEF3C7', // Accent background
          whatsapp: '#25D366',    // WhatsApp CTA
          'whatsapp-dark': '#1EBE5A', // WhatsApp hover
        },
      },
    },
  },
};
```

**What is customized and why:**

| Token | Custom value | Justification |
|-------|-------------|---------------|
| `fontFamily.sans` | System font stack | Zero network requests for body fonts |
| `fontFamily.display` | Inter Display | Warmer than system font, still fast (~25 KB) |
| `maxWidth.screen-xl` | `1200px` | Standard content max-width for landing pages |
| `colors.ark` | Warm brown, cream, amber, WhatsApp green | Semantic naming decouples design from palette; reinforces coffee shop brand |

**What is *not* customized:** spacing, radius, shadow, typography scale, breakpoints — all use Tailwind defaults. Customizing these fragments the system.

---

## 3. Color System

### 3.1 Palette

The palette is intentionally warm and minimal. Four color families are used, each with a specific role.

| Family | Role | Tokens |
|--------|------|--------|
| **Cream** | Page backgrounds, subtle sections | `ark-cream`, `ark-cream-dark` |
| **Brown** | Primary actions, headings, brand | `ark-brown`, `ark-brown-dark`, `stone-900`, `stone-700` |
| **Amber** | Accent, best-seller badges, highlights | `ark-amber`, `ark-amber-light` |
| **WhatsApp Green** | Primary conversion CTA | `ark-whatsapp`, `ark-whatsapp-dark` |
| **Semantic** | Success, error, warning | `green-600`, `red-600`, `amber-600` (Tailwind defaults) |

### 3.2 Cream Scale

| Token | Hex | Usage |
|-------|-----|-------|
| `ark-cream` | `#FDF8F3` | Page background (body) |
| `ark-cream-dark` | `#F5E6D3` | Subtle section background, icon containers |

### 3.3 Brown Scale

| Token | Hex | Usage |
|-------|-----|-------|
| `ark-brown` | `#4A2C2A` | **Primary** — buttons, links, brand accents |
| `ark-brown-dark` | `#3A1F1D` | **Hover** — button hover state |
| `stone-900` | `#1C1917` | Headings, primary text |
| `stone-700` | `#44403C` | Body text (primary) |
| `stone-600` | `#57534E` | Body text (secondary) |
| `stone-500` | `#78716C` | Muted text (captions, meta) |
| `stone-400` | `#A8A29E` | Placeholder text, disabled icons |
| `stone-300` | `#D6D3D1` | Input borders (default) |
| `stone-200` | `#E7E5E4` | Card borders, dividers |
| `stone-100` | `#F5F5F4` | Subtle backgrounds |
| `stone-50` | `#FAFAF9` | Section backgrounds (form) |

### 3.4 Amber Scale

| Token | Hex | Usage |
|-------|-----|-------|
| `ark-amber` | `#D97706` | **Accent** — best-seller badges, quote marks, highlights |
| `ark-amber-light` | `#FEF3C7` | Accent background (badge bg) |

### 3.5 WhatsApp Green

| Token | Hex | Usage |
|-------|-----|-------|
| `ark-whatsapp` | `#25D366` | **Primary CTA** — WhatsApp buttons, sticky button |
| `ark-whatsapp-dark` | `#1EBE5A` | **Hover** — WhatsApp button hover |

### 3.6 Semantic Colors

| Role | Token | Usage |
|------|-------|-------|
| Success | `green-700` (`#15803D`) | Success message text |
| Success bg | `green-50` (`#F0FDF4`) | Success message background |
| Error | `red-700` (`#B91C1C`) | Error message text, invalid input border |
| Error bg | `red-50` (`#FEF2F2`) | Error message background |
| Warning | `amber-600` (`#D97706`) | Warning text (rare) |

### 3.7 Color Usage Rules

| Rule | Detail |
|------|--------|
| Page background | `bg-ark-cream` (#FDF8F3) — never pure white |
| Text on cream | `text-stone-900` (headings), `text-stone-700` (body) — never lighter than `stone-600` for body |
| Links | `text-ark-brown`, underline on hover, `text-ark-brown-dark` on active |
| Primary button | `bg-ark-brown` → `hover:bg-ark-brown-dark`, `text-white` |
| WhatsApp button | `bg-ark-whatsapp` → `hover:bg-ark-whatsapp-dark`, `text-white` |
| Secondary button | `border-stone-300`, `text-stone-700`, `hover:bg-stone-50` |
| Focus ring | `ring-2 ring-ark-brown ring-offset-2` |
| Disabled state | `opacity-50 cursor-not-allowed` — never change color |
| Dividers | `border-stone-200` |
| Section backgrounds | `bg-ark-cream` (default) or `bg-stone-50` (form section) |
| Best-seller badge | `bg-ark-amber-light text-ark-amber` |

### 3.8 Contrast Compliance

All text/background combinations must pass WCAG AA (4.5:1 for body, 3:1 for large text).

| Combination | Ratio | Pass? |
|-------------|-------|-------|
| `stone-900` on `ark-cream` | 16.8:1 | ✅ AAA |
| `stone-700` on `ark-cream` | 9.7:1 | ✅ AAA |
| `stone-600` on `ark-cream` | 7.1:1 | ✅ AAA |
| `stone-500` on `ark-cream` | 4.7:1 | ✅ AA |
| `ark-brown` on `ark-cream` | 10.3:1 | ✅ AAA |
| `white` on `ark-brown` | 10.3:1 | ✅ AAA |
| `white` on `ark-whatsapp` | 3.1:1 | ⚠️ AA (large text only) |
| `ark-amber` on `ark-cream` | 3.6:1 | ⚠️ AA (large text only) |
| `stone-400` on `ark-cream` | 2.6:1 | ❌ Fail — only for placeholder/disabled |

**Forbidden combinations:**

- `stone-400` or lighter for any readable text
- `ark-amber` on `ark-cream` for body text (only for large headings or badges)
- `white` on `ark-whatsapp` for small text (only for button text ≥ 16px bold)

---

## 4. Typography

### 4.1 Font Stack

**One display font + system body stack.** The display font is used only for headings (H1, H2, H3). Body text uses the system stack for zero network cost.

```css
/* Display (headings only) */
font-family: 'Inter Display', system-ui, sans-serif;

/* Body (everything else) */
font-family: system-ui, -apple-system, BlinkMacSystemFont,
  'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

**Applied globally** via `tailwind.config.mjs` → `fontFamily.sans` and `fontFamily.display`.

### 4.2 Type Scale

Based on Tailwind's default scale, constrained to seven sizes used on the page:

| Token | Class | Size | Line height | Weight | Usage |
|-------|-------|------|-------------|--------|-------|
| Display | `text-5xl` / `md:text-6xl` | 48 / 60 px | 1.1 | `font-bold` (700) | Hero H1 (desktop) |
| H1 (mobile) | `text-4xl` | 36 px | 1.15 | `font-bold` (700) | Hero H1 (mobile) |
| H2 | `text-3xl` / `md:text-4xl` | 30 / 36 px | 1.2 | `font-bold` (700) | Section headings |
| H3 | `text-xl` | 20 px | 1.3 | `font-semibold` (600) | Card titles, menu item names |
| Body large | `text-lg` | 18 px | 1.6 | `font-normal` (400) | Hero subheadline |
| Body | `text-base` | 16 px | 1.6 | `font-normal` (400) | Paragraphs, form inputs, menu descriptions |
| Caption | `text-sm` | 14 px | 1.5 | `font-normal` (400) | Form help text, footer, testimonial meta |
| Micro | `text-xs` | 12 px | 1.5 | `font-medium` (500) | Badges, pricing notes (rare) |

**Never used:** `text-7xl`, `text-8xl`, `text-9xl` — too large for a landing page.

### 4.3 Font Weights

| Token | Class | Weight | Usage |
|-------|-------|--------|-------|
| Normal | `font-normal` | 400 | Body text, descriptions, menu descriptions |
| Medium | `font-medium` | 500 | Form labels, nav links, badges |
| Semibold | `font-semibold` | 600 | Buttons, card titles, H3, menu prices |
| Bold | `font-bold` | 700 | H1, H2, hero headline |

**Not used:** `font-light` (300) — too thin on mobile; `font-black` (900) — too heavy for warm brand.

### 4.4 Letter Spacing

| Token | Class | Usage |
|-------|-------|-------|
| Tight | `tracking-tight` | H1, display headings |
| Normal | `tracking-normal` | Everything else |

**Not used:** `tracking-wide`, `tracking-widest` — reserved for uppercase micro-labels, which this page doesn't use.

### 4.5 Line Height

| Token | Class | Usage |
|-------|-------|-------|
| Tight | `leading-tight` (1.25) | Headings only |
| Normal | `leading-normal` (1.5) | UI text, menu descriptions |
| Relaxed | `leading-relaxed` (1.625) | Body paragraphs, testimonials |

### 4.6 Text Color Mapping

| Role | Class | Example |
|------|-------|---------|
| Primary heading | `text-stone-900` | `<h1>`, `<h2>` |
| Body text | `text-stone-700` | Paragraphs |
| Secondary body | `text-stone-600` | Menu descriptions, feature descriptions |
| Muted / meta | `text-stone-500` | Copyright, captions, form help text |
| Link | `text-ark-brown hover:text-ark-brown-dark` | Inline links |
| Placeholder | `placeholder:text-stone-400` | Input placeholders |
| Error | `text-red-700` | Validation messages |
| Accent | `text-ark-amber` | Best-seller badges, quote marks |

### 4.7 Typography Rules

- **One `<h1>` per page.** No exceptions.
- **Headings never skip levels.** H1 → H2 → H3, never H1 → H3.
- **No heading over 3 lines** on desktop, **4 lines** on mobile — if it wraps more, shorten the copy.
- **Max line length for paragraphs:** 65–75 characters (use `max-w-prose` or `max-w-2xl`).
- **No justified text.** Left-aligned only.
- **No all-caps blocks** longer than 3 words.
- **Menu item names:** `text-xl font-semibold text-stone-900`.
- **Menu prices:** `text-xl font-semibold text-ark-brown` (right-aligned).
- **Menu descriptions:** `text-base text-stone-600` (max 2 lines).

---

## 5. Spacing Scale

Based on Tailwind's 4 px base unit. Only a subset is used on the page.

### 5.1 Spacing Tokens

| Token | Class | Pixels | Usage |
|-------|-------|--------|-------|
| 1 | `p-1` / `m-1` | 4 px | Tight inline spacing |
| 2 | `p-2` / `m-2` | 8 px | Icon-to-text gaps |
| 3 | `p-3` / `m-3` | 12 px | Small padding (badges) |
| 4 | `p-4` / `m-4` | 16 px | Standard container padding (mobile) |
| 6 | `p-6` / `m-6` | 24 px | Card padding, form card padding |
| 8 | `p-8` / `m-8` | 32 px | Large card padding (desktop form) |
| 12 | `py-12` | 48 px | Section padding (mobile, compact sections) |
| 16 | `py-16` | 64 px | Section padding (mobile) |
| 20 | `py-20` | 80 px | Section padding (tablet) |
| 24 | `py-24` | 96 px | Section padding (desktop), hero vertical padding |

### 5.2 Section Vertical Rhythm

Every top-level `<section>` uses consistent vertical padding:

```html
<section class="py-16 md:py-20 lg:py-24">
```

| Breakpoint | Padding | Result |
|------------|---------|--------|
| Mobile (< 768) | `py-16` (64 px) | Compact |
| Tablet (≥ 768) | `md:py-20` (80 px) | Comfortable |
| Desktop (≥ 1024) | `lg:py-24` (96 px) | Generous |

**Exception:** Form section uses `bg-stone-50` to visually separate from cream background.

### 5.3 Component Spacing

| Component | Outer (margin) | Inner (padding) |
|-----------|---------------|-----------------|
| Button | `mt-8` (from preceding text) | `px-6 py-3` |
| Input | `space-y-4` (between fields) | `px-4 py-3` |
| Card (feature) | `gap-6` (in grid) | `p-6` |
| Card (menu item) | `gap-6` (in grid) | `p-4` (image) + `p-4` (text) |
| Card (testimonial) | `gap-6` (in grid) | `p-6` |
| Form card | `mt-8` | `p-6 md:p-8` |
| Section heading → content | `mb-12` | — |
| Form label → input | `mb-2` | — |
| Menu category → next category | `space-y-16` | — |

### 5.4 Spacing Rules

- **Never use arbitrary values** like `mt-[37px]`. Use the scale.
- **Stack spacing:** prefer `space-y-*` on parent over repeated `mt-*` on children.
- **Section gaps:** never less than `py-12` between sections, even on mobile.
- **No negative margins** except for decorative overlaps (not used here).
- **Menu category spacing:** `space-y-16` between categories, `gap-6` within grid.

---

## 6. Layout Grid & Containers

### 6.1 Container

The site uses a single centered container pattern:

```html
<div class="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
```

| Property | Mobile | Tablet | Desktop |
|----------|--------|--------|---------|
| Max width | 100% | 100% | `max-w-6xl` (1152 px) |
| Horizontal padding | `px-4` (16 px) | `md:px-6` (24 px) | `lg:px-8` (32 px) |
| Centering | `mx-auto` | `mx-auto` | `mx-auto` |

**Alternatives:**
- Hero: `max-w-6xl` with `md:grid-cols-2`
- Form: `max-w-2xl` (narrower for readability)
- Section heading: `max-w-2xl` (centered)

### 6.2 Grid System

Tailwind's flexbox and CSS Grid utilities are used. Common patterns:

| Pattern | Classes |
|---------|---------|
| Hero (split) | `grid gap-12 md:grid-cols-2` |
| Feature grid (2-col) | `grid gap-6 md:grid-cols-2` |
| Feature grid (4-col) | `grid gap-6 md:grid-cols-2 lg:grid-cols-4` |
| Menu category (3-col) | `grid gap-6 md:grid-cols-2 lg:grid-cols-3` |
| Gallery (masonry) | `columns-2 md:columns-3 gap-4` (CSS columns) |
| Testimonial (3-col) | `grid gap-6 md:grid-cols-3` |
| Form layout | `space-y-4` (stacked) + `grid gap-4 md:grid-cols-2` (party size + date) |
| Navbar layout | `flex items-center justify-between` |
| Footer layout | `grid gap-8 md:grid-cols-3` |

### 6.3 Breakpoints

Tailwind defaults, unmodified:

| Name | Min width | Target |
|------|-----------|--------|
| `sm` | 640 px | Large phones (rare) |
| `md` | 768 px | Tablets |
| `lg` | 1024 px | Small laptops |
| `xl` | 1280 px | Desktops |
| `2xl` | 1536 px | Large monitors |

**The page uses only `md:` and `lg:`.** `sm:`, `xl:`, `2xl:` are available but not used.

### 6.4 Layout Verification

| Viewport | Behavior |
|----------|----------|
| 375 × 667 | Single column, stacked sections, hamburger nav, sticky WhatsApp visible |
| 768 × 1024 | Feature grid 2-col, menu 2-col, nav expanded, back-to-top appears |
| 1440 × 900 | Feature grid 4-col, menu 3-col, gallery masonry, max-width container (1152 px) |

---

## 7. Border Radius & Elevation

### 7.1 Border Radius Tokens

| Token | Class | Pixels | Usage |
|-------|-------|--------|-------|
| Small | `rounded` | 4 px | Badges, small tags |
| Medium | `rounded-lg` | 8 px | **Buttons**, **inputs** |
| Large | `rounded-xl` | 12 px | **Cards**, **feature cards**, **testimonial cards** |
| Extra large | `rounded-2xl` | 16 px | **Hero image**, **form card** |
| Full | `rounded-full` | 9999 px | Avatars, sticky WhatsApp button, back-to-top |

**Rule:** Buttons and inputs share `rounded-lg`. Cards use `rounded-xl`. Hero image and form card use `rounded-2xl`. Never mix radii within a component.

### 7.2 Elevation (Shadows)

The site uses **minimal shadow**. Borders do most of the visual separation.

| Token | Class | Usage |
|-------|-------|-------|
| None | (default) | Most surfaces — use borders instead |
| Subtle | `shadow-sm` | Inputs on focus, hover state for cards |
| Medium | `shadow-md` | Sticky navbar (on scroll), dropdown |
| Large | `shadow-lg` | Sticky WhatsApp button, back-to-top button |
| Extra large | `shadow-2xl` | **Hero image** (the one place where shadow is dramatic) |

**Default card style:** `border border-stone-200 rounded-xl` — **no shadow**.

**On hover (optional):** `hover:shadow-md transition-shadow`.

**Hero image:** `shadow-2xl` — this is the hero moment, the shadow is intentional.

### 7.3 Border Tokens

| Token | Class | Usage |
|-------|-------|-------|
| Thin | `border` (1 px) | Cards, inputs, dividers |
| Thick | `border-2` | Focus rings, active tabs (not used) |
| Color | `border-stone-200` | Default card border |
| Color | `border-stone-300` | Input border (default) |
| Color | `border-stone-400` | Input hover |
| Color | `border-ark-brown` | Input focus |
| Color | `border-red-500` | Input error |

---

## 8. Component Library

Every component below is implemented in `src/components/`. Styles are inlined as Tailwind classes in the `.astro` files.

### 8.1 Button (Primary — WhatsApp)

```html
<a href="https://wa.me/628xxx" target="_blank" rel="noopener"
  class="inline-flex items-center justify-center gap-2 rounded-lg bg-ark-whatsapp px-6 py-3 font-semibold text-white transition-colors hover:bg-ark-whatsapp-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ark-whatsapp focus-visible:ring-offset-2">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">...</svg>
  Order via WhatsApp
</a>
```

| State | Style |
|-------|-------|
| Default | `bg-ark-whatsapp text-white` |
| Hover | `hover:bg-ark-whatsapp-dark` |
| Focus | `ring-2 ring-ark-whatsapp ring-offset-2` |
| Active | `active:bg-ark-whatsapp-dark` (optional) |
| Disabled | `opacity-50 cursor-not-allowed` |

**Min height:** 44 px (`py-3` + text). **Min width:** fits content, never below 160 px.

### 8.2 Button (Secondary)

```html
<a href="#menu"
  class="inline-flex items-center justify-center rounded-lg border border-stone-300 bg-white px-6 py-3 font-semibold text-stone-700 transition-colors hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ark-brown focus-visible:ring-offset-2">
  View menu
</a>
```

### 8.3 Button (Primary — Brown, for form submit)

```html
<button type="submit"
  class="w-full rounded-lg bg-ark-brown px-6 py-3 font-semibold text-white transition-colors hover:bg-ark-brown-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ark-brown focus-visible:ring-offset-2">
  Send reservation
</button>
```

### 8.4 Input (Text / Tel / Number / Date / Time)

```html
<input type="text"
  class="w-full rounded-lg border border-stone-300 px-4 py-3 text-base text-stone-900 placeholder:text-stone-400 transition-colors focus:border-ark-brown focus:outline-none focus:ring-2 focus:ring-ark-brown/20" />
```

| State | Style |
|-------|-------|
| Default | `border-stone-300` |
| Hover | `hover:border-stone-400` |
| Focus | `border-ark-brown ring-2 ring-ark-brown/20` |
| Error | `border-red-500 ring-2 ring-red-500/20` |
| Disabled | `bg-stone-50 text-stone-500 cursor-not-allowed` |

### 8.5 Input (Textarea)

Same as text input, plus:

```html
<textarea rows="3" class="...resize-y min-h-[96px]"></textarea>
```

**Rule:** `resize-y` only — never allow horizontal resize (breaks layout).

### 8.6 Form Label

```html
<label class="mb-2 block text-sm font-medium text-stone-700">
  WhatsApp number
</label>
```

**Rule:** Labels are always visible (never placeholder-only). Required fields marked with `*` or `(required)`.

### 8.7 Form Help Text

```html
<p class="mt-1 text-sm text-stone-500">We'll only contact you via WhatsApp.</p>
```

### 8.8 Form Error Message

```html
<p class="mt-1 text-sm text-red-700" role="alert">Please enter a valid WhatsApp number.</p>
```

### 8.9 Card (Feature)

```html
<div class="rounded-xl border border-stone-200 p-6">
  <div class="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-ark-cream-dark text-ark-brown">
    <Coffee size={20} aria-hidden="true" />
  </div>
  <h3 class="text-lg font-semibold text-stone-900">Selected beans</h3>
  <p class="mt-2 text-stone-600">Single origin Gayo and Lampung, roasted fresh weekly.</p>
</div>
```

| Property | Value |
|----------|-------|
| Background | `bg-white` (default) |
| Border | `border-stone-200` |
| Radius | `rounded-xl` |
| Padding | `p-6` |
| Shadow | None (border only) |
| Hover (optional) | `hover:shadow-md transition-shadow` |

### 8.10 Card (Menu Item)

```html
<div class="overflow-hidden rounded-xl border border-stone-200 bg-white">
  <div class="relative">
    <img src="/images/menu/coffee/latte.webp" alt="Latte with latte art"
      width="800" height="800" loading="lazy"
      class="aspect-square w-full object-cover" />
    <span class="absolute right-2 top-2 rounded bg-ark-amber-light px-2 py-0.5 text-xs font-medium text-ark-amber">
      Best seller
    </span>
  </div>
  <div class="p-4">
    <div class="flex items-start justify-between gap-2">
      <h3 class="text-xl font-semibold text-stone-900">Latte</h3>
      <p class="text-xl font-semibold text-ark-brown">28,000</p>
    </div>
    <p class="mt-1 text-base text-stone-600">Espresso with steamed milk, smooth.</p>
  </div>
</div>
```

| Property | Value |
|----------|-------|
| Image | `aspect-square`, `object-cover` |
| Badge | Absolute top-right, `bg-ark-amber-light text-ark-amber` |
| Price | Right-aligned, `text-ark-brown` |
| Shadow | None (border only) |

### 8.11 Card (Testimonial)

```html
<div class="rounded-xl border border-stone-200 bg-white p-6">
  <svg class="mb-4 h-8 w-8 text-ark-amber" ... aria-hidden="true">...</svg>
  <p class="text-stone-700 leading-relaxed">"The palm sugar milk coffee is unbeatable, and the place is comfortable for working."</p>
  <div class="mt-4 flex items-center gap-3">
    <img src="/images/avatars/avatar-1.webp" alt="Rina" width="80" height="80" class="h-10 w-10 rounded-full" />
    <div>
      <p class="font-semibold text-stone-900">Rina</p>
      <p class="text-sm text-stone-500">Loyal customer</p>
    </div>
  </div>
</div>
```

### 8.12 Section Heading Block

```html
<div class="mx-auto max-w-2xl text-center">
  <h2 class="text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
    Ark Coffee & Eatery Menu
  </h2>
  <p class="mt-4 text-lg text-stone-600">
    Specialty coffee, non-coffee, main courses, and pastry. Brewed and cooked fresh every day.
  </p>
</div>
```

### 8.13 Navbar

```html
<header class="sticky top-0 z-50 border-b border-stone-200 bg-ark-cream/80 backdrop-blur-md">
  <nav class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
    <a href="/" class="text-lg font-bold text-stone-900">Ark Coffee</a>
    <div class="hidden items-center gap-6 md:flex">
      <a href="#menu" class="text-sm font-medium text-stone-600 hover:text-stone-900">Menu</a>
      <a href="#gallery" class="text-sm font-medium text-stone-600 hover:text-stone-900">Gallery</a>
      <a href="#location" class="text-sm font-medium text-stone-600 hover:text-stone-900">Location</a>
      <a href="#faq" class="text-sm font-medium text-stone-600 hover:text-stone-900">FAQ</a>
    </div>
    <a href="https://wa.me/628xxx" class="rounded-lg bg-ark-whatsapp px-4 py-2 text-sm font-semibold text-white hover:bg-ark-whatsapp-dark">
      Order
    </a>
  </nav>
</header>
```

### 8.14 Footer

```html
<footer class="border-t border-stone-200 bg-ark-brown text-ark-cream">
  <div class="mx-auto max-w-6xl px-4 py-12 md:px-6 lg:px-8">
    <div class="grid gap-8 md:grid-cols-3">
      <div>
        <p class="text-lg font-bold">Ark Coffee & Eatery</p>
        <p class="mt-2 text-sm text-ark-cream/80">Specialty coffee, comfort food.</p>
      </div>
      <div class="flex gap-6">
        <a href="#menu" class="text-sm hover:text-white">Menu</a>
        <a href="#gallery" class="text-sm hover:text-white">Gallery</a>
        <a href="#location" class="text-sm hover:text-white">Location</a>
      </div>
      <div class="text-sm">
        <p>Jl. Merdeka No. 12, Bandung</p>
        <p class="mt-1">0812-3456-7890</p>
      </div>
    </div>
    <p class="mt-8 border-t border-ark-cream/20 pt-6 text-center text-sm text-ark-cream/60">
      © 2026 Ark Coffee & Eatery. All rights reserved.
    </p>
  </div>
</footer>
```

### 8.15 Sticky WhatsApp Button

```html
<a href="https://wa.me/628xxx" target="_blank" rel="noopener" aria-label="Order via WhatsApp"
  class="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-ark-whatsapp text-white shadow-lg transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ark-whatsapp focus-visible:ring-offset-2 md:hidden">
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">...</svg>
</a>
```

### 8.16 Back-to-Top Button

```html
<button id="back-to-top" aria-label="Back to top"
  class="fixed bottom-5 right-5 z-40 hidden h-12 w-12 items-center justify-center rounded-full bg-stone-900 text-white shadow-lg transition-opacity hover:bg-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 md:flex">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M12 19V5M5 12l7-7 7 7" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</button>
```

### 8.17 Status Message

```html
<p id="form-status" class="text-sm font-medium" aria-live="polite"></p>
```

| State | Class added |
|-------|-------------|
| Idle | (none) |
| Submitting | `text-stone-500` |
| Success | `text-green-700` |
| Error | `text-red-700` |

---

## 9. Iconography

### 9.1 Icon Source

**Lucide** (`lucide-astro`) — consistent, open-source SVG icon set.

Install:

```bash
npm install lucide-astro
```

### 9.2 Icon Sizes

| Token | Size | Usage |
|-------|------|-------|
| Small | 16 px | Inline with text |
| Default | 20 px | Feature cards, form fields |
| Medium | 24 px | Navbar, primary buttons |
| Large | 28 px | Sticky WhatsApp button |
| Extra large | 48 px | Decorative (rare) |

### 9.3 Icon Color

Icons inherit `currentColor`. Wrap in a colored element:

```html
<div class="text-ark-brown">
  <Coffee size={20} aria-hidden="true" />
</div>
```

### 9.4 Icons Used on the Page

| Icon | Usage |
|------|-------|
| `Coffee` | Feature: selected beans |
| `Wifi` | Feature: fast WiFi |
| `Clock` | Feature: open daily |
| `Laptop` | Feature: workspace |
| `Quote` | Testimonial quote mark |
| `Star` | Rating stars |
| `ChevronDown` | FAQ accordion |
| `ArrowUp` | Back-to-top |
| `Instagram` | Footer social |
| `MessageCircle` | WhatsApp (if not using custom SVG) |
| `MapPin` | Location |
| `Phone` | Contact |

### 9.5 Icon Rules

- **Decorative icons:** `aria-hidden="true"` + `alt=""` (if `<img>`)
- **Meaningful icons:** include `aria-label` on the parent
- **Consistent stroke width:** default (2 px) — never mix
- **No emoji as icons.** Use SVG.
- **No icon-only buttons** without an accessible label.

### 9.6 Feature Card Icon Pattern

```html
<div class="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-ark-cream-dark text-ark-brown">
  <Coffee size={20} aria-hidden="true" />
</div>
```

---

## 10. Imagery & Photography Direction

### 10.1 Image Formats

| Format | Usage |
|--------|-------|
| SVG | Icons, logos, simple illustrations |
| WebP | Hero photos, menu photos, gallery, avatars |
| PNG | OG image only (social media requirement) |

**Never used:** JPEG (larger than WebP), GIF (no animations on this page).

### 10.2 Image Dimensions

| Image | Dimensions | File |
|-------|-----------|------|
| Hero (desktop) | 2400 × 1500 (2x for 1200 px display) | `hero-coffee.webp` |
| Hero (mobile) | 800 × 1000 | `hero-interior.webp` |
| OG image | 1200 × 630 | `og-image.png` |
| Menu items | 800 × 800 (square) | `menu/*.webp` |
| Gallery | 1200 × 800 (landscape) or 800 × 1200 (portrait) | `gallery/*.webp` |
| Avatars | 160 × 160 (2x for 80 px display) | `avatars/*.webp` |
| Feature icons | 48 × 48 (SVG, scalable) | `features/*.svg` |

### 10.3 Photography Direction

This is the most important part of the design. **The photography is the brand.**

| Aspect | Direction |
|--------|-----------|
| **Lighting** | Golden hour, warm window light, soft shadows. Never harsh fluorescent. |
| **Color grading** | Warm (amber, brown, cream). Never cool/blue. |
| **Background** | Wooden tables, marble counter, brick wall, plants. Consistent across menu photos. |
| **Composition** | Close-up for drinks (show texture, latte art), 45° angle for food (show layers), wide for interior. |
| **Mood** | Cozy, inviting, lived-in. Not sterile, not over-styled. |
| **Consistency** | All menu photos must share the same background, lighting, and angle. Mixing styles breaks the premium feel. |

### 10.4 Image Rules

- **Always set `width` and `height` attributes** to prevent layout shift (CLS).
- **Use `loading="lazy"`** on below-fold images.
- **Use `loading="eager"` + `fetchpriority="high"`** on the hero image.
- **Provide `alt` text** on all content images.
- **Compress to < 100 KB** for any raster image (menu photos < 60 KB).
- **No decorative background images** — use CSS gradients if needed.
- **Menu photos must be square** (`aspect-square`) and consistent.
- **Gallery photos can be mixed** (landscape + portrait) for masonry effect.

### 10.5 Hero Visual Pattern

```html
<picture>
  <source srcset="/images/hero-interior.webp" media="(max-width: 767px)" width="800" height="1000" />
  <img
    src="/images/hero-coffee.webp"
    alt="Latte art on a wooden table, warm window light"
    width="2400" height="1500"
    loading="eager"
    fetchpriority="high"
    class="w-full rounded-2xl border border-stone-200 shadow-2xl"
  />
</picture>
```

---

## 11. Motion & Interaction

### 11.1 Motion Principles

- **Motion clarifies, never decorates.** No spinning, bouncing, or attention-seeking animations.
- **Fast.** All transitions ≤ 200 ms.
- **Reduced-motion aware.** Respect `prefers-reduced-motion`.
- **No scroll-jacking.** No parallax, no scroll-triggered animations on this page (except subtle reveal).
- **One exception:** Sticky WhatsApp button can have a subtle pulse (2s loop) to draw attention — but must respect `prefers-reduced-motion`.

### 11.2 Transition Tokens

| Token | Class | Duration | Usage |
|-------|-------|----------|-------|
| Color | `transition-colors` | 150 ms | Buttons, links, inputs |
| Shadow | `transition-shadow` | 150 ms | Card hover |
| Transform | `transition-transform` | 200 ms | Sticky WhatsApp hover scale |
| All | `transition` | 150 ms | Fallback (avoid) |

### 11.3 Hover States

| Element | Hover |
|---------|-------|
| WhatsApp button | Background darkens (`bg-ark-whatsapp-dark`) |
| Brown button | Background darkens (`bg-ark-brown-dark`) |
| Secondary button | Background lightens (`bg-stone-50`) |
| Link | Text darkens + underline |
| Card | Optional `shadow-md` (border stays) |
| Input | Border darkens (`border-stone-400`) |
| Sticky WhatsApp | `scale-110` |

**No hover-only content.** Every interaction must work on touch.

### 11.4 Focus States

Focus is always visible. Never `outline: none` without a replacement.

```html
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ark-brown focus-visible:ring-offset-2
```

| Element | Focus style |
|---------|-------------|
| Button (brown) | Ring (2 px) + offset (2 px) in `ark-brown` |
| Button (WhatsApp) | Ring (2 px) + offset (2 px) in `ark-whatsapp` |
| Input | Border color + subtle ring |
| Link | Ring (2 px) + offset (2 px) |

### 11.5 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Add this to `src/styles/global.css`.

### 11.6 Loading State (Form Submit)

On submit:

1. Button text → `Sending…`
2. Button gets `disabled opacity-50 cursor-not-allowed`
3. Status message → `Sending…` in `text-stone-500`

No spinner (avoids extra DOM + CSS). Text change is sufficient feedback.

### 11.7 Sticky WhatsApp Pulse (Optional)

```css
@keyframes pulse-wa {
  0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
  50% { box-shadow: 0 0 0 12px rgba(37, 211, 102, 0); }
}
.sticky-wa { animation: pulse-wa 2s infinite; }
@media (prefers-reduced-motion: reduce) {
  .sticky-wa { animation: none; }
}
```

Pulse draws attention without being obnoxious. Must respect `prefers-reduced-motion`.

---

## 12. Responsive Design

### 12.1 Breakpoint Strategy

Mobile-first. Base styles target 375 px. Enhancements layer at `md:` (768 px) and `lg:` (1024 px).

### 12.2 Responsive Patterns

| Pattern | Mobile | Desktop |
|---------|--------|---------|
| Hero H1 | `text-4xl` | `md:text-6xl` |
| Hero layout | Stacked (text above image) | `md:grid-cols-2` (text left, image right) |
| Hero subheadline | `text-base` | `md:text-lg` |
| Section padding | `py-16` | `md:py-20 lg:py-24` |
| Container padding | `px-4` | `md:px-6 lg:px-8` |
| Feature grid | 1 column | `md:grid-cols-2 lg:grid-cols-4` |
| Menu grid | 1 column | `md:grid-cols-2 lg:grid-cols-3` |
| Gallery | `columns-2` | `md:columns-3` |
| Testimonials | 1 column | `md:grid-cols-3` |
| Navbar | Logo + hamburger + WhatsApp | Logo + links + WhatsApp |
| Footer | Stacked | `md:grid-cols-3` |
| Sticky WhatsApp | Visible | Hidden (`md:hidden`) |
| Back-to-top | Hidden | Visible (`md:flex`) |

### 12.3 Responsive Rules

- **No horizontal scroll** at any viewport ≥ 320 px.
- **Text ≥ 16 px** on mobile (prevents iOS zoom on input focus).
- **Touch targets ≥ 44 × 44 px.**
- **No fixed widths** on containers — use `max-w-*` + `w-full`.
- **Test at 375, 768, 1024, 1440** before merging.
- **Sticky WhatsApp** must not overlap footer content — add `pb-20` to footer on mobile.

### 12.4 Responsive Testing Matrix

| Viewport | Device | Check |
|----------|--------|-------|
| 320 × 568 | iPhone SE (old) | No overflow, readable |
| 375 × 667 | iPhone SE / 12 mini | Standard mobile, sticky WA visible |
| 414 × 896 | iPhone 11 Pro Max | Large phone |
| 768 × 1024 | iPad | 2-col grid, back-to-top appears |
| 1024 × 768 | iPad landscape | 3-col menu grid |
| 1440 × 900 | MacBook Air | Full desktop, 4-col feature grid |

---

## 13. Accessibility in Design

### 13.1 Visual Accessibility Checklist

```
[ ] All text ≥ 4.5:1 contrast (body), ≥ 3:1 (large text)
[ ] Focus indicators visible on all interactive elements
[ ] No information conveyed by color alone (add text/icon)
[ ] Touch targets ≥ 44 × 44 px
[ ] Text resizable to 200% without layout break
[ ] No content that flashes > 3 times per second
[ ] Form errors have text, not just red borders
[ ] Sticky WhatsApp & back-to-top have aria-label
[ ] Pulse animation respects prefers-reduced-motion
```

### 13.2 Color-Independent Design

| Bad | Good |
|-----|------|
| Red border only for errors | Red border + icon + text message |
| Green dot for success | Green text "Reservation received" (words, not just color) |
| Best-seller by color only | Badge with text "Best seller" + amber color |

### 13.3 Focus Order

Tab order follows DOM order. Rules:

- **Navbar** → Logo → Nav links → WhatsApp CTA
- **Main** → Hero CTA → Features → Menu → Gallery → Location → FAQ → Form fields → Submit
- **Footer** → Links → Contact

No `tabindex` greater than 0. No focus traps (except modals, which this page doesn't have).

### 13.4 Screen Reader Considerations

| Element | Requirement |
|---------|-------------|
| Hero H1 | First heading, unique |
| Sections | `<section>` with `aria-labelledby` if heading present |
| Form status | `aria-live="polite"` |
| Error messages | `role="alert"` or `aria-describedby` on the input |
| Decorative icons | `aria-hidden="true"` |
| Form labels | Always visible, associated via `for`/`id` |
| Skip link | Required |
| Menu item badges | Text "Best seller", not just color |
| Sticky WhatsApp | `aria-label="Order via WhatsApp"` |
| Back-to-top | `aria-label="Back to top"` |

### 13.5 Skip Link

```html
<a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-ark-brown focus:px-4 focus:py-2 focus:text-white">
  Skip to content
</a>
```

---

## 14. Dark Mode (Future)

Dark mode is **not implemented** in v1.0.0. It is documented here for future planning.

### 14.1 Approach

Use Tailwind's `dark:` variant with `class` strategy (not media query), so users can toggle manually.

```js
// tailwind.config.mjs
export default {
  darkMode: 'class',
  // ...
};
```

### 14.2 Dark Palette (Proposed)

| Role | Light | Dark |
|------|-------|------|
| Page bg | `ark-cream` (#FDF8F3) | `stone-950` (#0C0A09) |
| Surface | `white` | `stone-900` (#1C1917) |
| Border | `stone-200` | `stone-800` |
| Text primary | `stone-900` | `stone-50` |
| Text secondary | `stone-600` | `stone-400` |
| Brand | `ark-brown` (#4A2C2A) | `ark-cream` (#FDF8F3) |
| Accent | `ark-amber` | `ark-amber` |
| WhatsApp | `ark-whatsapp` | `ark-whatsapp` |

### 14.3 Toggle Pattern

```html
<button
  aria-label="Toggle dark mode"
  class="rounded-lg p-2 text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800"
>
  <Sun class="hidden dark:block" />
  <Moon class="block dark:hidden" />
</button>
```

**When implemented:** bump version to 2.0.0, re-run Lighthouse (dark mode often reduces contrast), and update this document.

---

## 15. Design Tokens → Tailwind Mapping

### 15.1 Complete Token Reference

| Token category | Tailwind class | Value |
|---------------|----------------|-------|
| **Color — page bg** | `bg-ark-cream` | `#FDF8F3` |
| **Color — subtle bg** | `bg-ark-cream-dark` | `#F5E6D3` |
| **Color — brand primary** | `bg-ark-brown` | `#4A2C2A` |
| **Color — brand hover** | `bg-ark-brown-dark` | `#3A1F1D` |
| **Color — accent** | `text-ark-amber` | `#D97706` |
| **Color — accent bg** | `bg-ark-amber-light` | `#FEF3C7` |
| **Color — WhatsApp** | `bg-ark-whatsapp` | `#25D366` |
| **Color — WhatsApp hover** | `bg-ark-whatsapp-dark` | `#1EBE5A` |
| **Color — text primary** | `text-stone-900` | `#1C1917` |
| **Color — text body** | `text-stone-700` | `#44403C` |
| **Color — text secondary** | `text-stone-600` | `#57534E` |
| **Color — text muted** | `text-stone-500` | `#78716C` |
| **Color — border** | `border-stone-200` | `#E7E5E4` |
| **Color — input border** | `border-stone-300` | `#D6D3D1` |
| **Color — success** | `text-green-700` | `#15803D` |
| **Color — error** | `text-red-700` | `#B91C1C` |
| **Font — body** | `font-sans` | system stack |
| **Font — display** | `font-display` | Inter Display |
| **Font — H1** | `text-4xl md:text-6xl font-bold` | 36 / 60 px |
| **Font — H2** | `text-3xl md:text-4xl font-bold` | 30 / 36 px |
| **Font — H3** | `text-xl font-semibold` | 20 px |
| **Font — body** | `text-base` | 16 px |
| **Font — caption** | `text-sm` | 14 px |
| **Space — section** | `py-16 md:py-20 lg:py-24` | 64 / 80 / 96 px |
| **Space — card padding** | `p-6` | 24 px |
| **Space — form card padding** | `p-6 md:p-8` | 24 / 32 px |
| **Space — button padding** | `px-6 py-3` | 24 / 12 px |
| **Space — input padding** | `px-4 py-3` | 16 / 12 px |
| **Radius — button/input** | `rounded-lg` | 8 px |
| **Radius — card** | `rounded-xl` | 12 px |
| **Radius — hero/form** | `rounded-2xl` | 16 px |
| **Radius — avatar/sticky** | `rounded-full` | 9999 px |
| **Shadow — hero** | `shadow-2xl` | — |
| **Shadow — sticky** | `shadow-lg` | — |
| **Transition** | `transition-colors` | 150 ms |
| **Container** | `mx-auto max-w-6xl px-4 md:px-6 lg:px-8` | 1152 px |
| **Breakpoint — tablet** | `md:` | 768 px |
| **Breakpoint — desktop** | `lg:` | 1024 px |

### 15.2 Banned Values

Never use:

| Forbidden | Why |
|-----------|-----|
| `text-2xl` in body copy | Breaks type scale (only H2/H3 use larger) |
| `#hex` inline styles | Bypasses token system |
| `mt-[Npx]` arbitrary values | Breaks spacing rhythm |
| `font-light` | Too thin for accessibility |
| `shadow-2xl` on cards | Only hero image uses it |
| `rounded-none` on buttons | Inconsistent with system |
| `text-red-500` on white | Fails contrast (use `red-700`) |
| `bg-gray-*` | Use `stone-*` consistently |
| `bg-blue-*` | Wrong brand color (use `ark-brown`) |
| `hover:` only interactions | Must work on touch |
| `!important` | Fix the source, not the symptom |
| Pure white `#FFFFFF` page bg | Use `ark-cream` (#FDF8F3) |
| Pure black `#000000` text | Use `stone-900` (#1C1917) |

---

## 16. File Structure

Where design decisions live:

```
ark-coffee-eatery/
├── tailwind.config.mjs          ← Token customizations (colors, fonts, maxWidth)
├── src/
│   ├── styles/
│   │   └── global.css           ← Tailwind directives + base overrides + reveal + reduced-motion
│   ├── layouts/
│   │   └── BaseLayout.astro     ← Global font/body classes, font preload
│   └── components/
│       ├── Navbar.astro         ← Navbar styles
│       ├── Hero.astro           ← Hero typography + spacing + image
│       ├── Features.astro       ← Grid + card styles
│       ├── Menu.astro           ← Menu grid + category spacing
│       ├── MenuItem.astro       ← Menu card styles
│       ├── ReservationForm.astro← Form control styles
│       ├── StickyWhatsApp.astro ← Floating button styles
│       ├── BackToTop.astro      ← Floating button styles
│       └── Footer.astro         ← Footer styles
└── public/
    ├── favicon.svg
    ├── fonts/
    │   └── display.woff2
    └── images/
        ├── hero-coffee.webp
        ├── hero-interior.webp
        ├── og-image.png
        ├── menu/
        ├── gallery/
        ├── features/
        ├── avatars/
        └── patterns/
```

### 16.1 global.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@font-face {
  font-family: 'Inter Display';
  src: url('/fonts/display.woff2') format('woff2');
  font-weight: 400 700;
  font-display: swap;
  font-style: normal;
}

@layer base {
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
}

/* Scroll reveal (used by reveal.ts) */
@layer components {
  .reveal {
    opacity: 0;
    transform: translateY(1rem);
    transition: opacity 500ms ease, transform 500ms ease;
  }
  .reveal.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
  @media (prefers-reduced-motion: reduce) {
    .reveal, .reveal.is-visible {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
}
```

### 16.2 Design Decision Log

New visual decisions go in `DESIGN_LOG.md`:

```markdown
## 2026-11-17 — Initial design system for Ark Coffee & Eatery

- Established warm palette: ark-cream (#FDF8F3), ark-brown (#4A2C2A), ark-amber (#D97706)
- Chose Inter Display for headings (woff2, ~25 KB) + system body stack
- Selected `stone` as warm neutral scale
- Set section padding rhythm: 64 / 80 / 96 px
- Standardized card style: border only, no shadow (except hero image: shadow-2xl)
- Menu card: square image + badge + price right-aligned
- Sticky WhatsApp: mobile only, pulse animation (respects reduced-motion)
- Back-to-top: desktop only, appears after 600 px
```

---

## 17. Governance

### 17.1 Adding a New Component

1. Check if an existing pattern covers the need.
2. If not, define the component in this document first.
3. Get review (designer or lead developer).
4. Implement in `src/components/`.
5. Add to the **Component Library** section of this doc.
6. Update `DESIGN_LOG.md`.

### 17.2 Changing a Token

1. Propose the change in `DESIGN_LOG.md` with rationale.
2. Update `tailwind.config.mjs`.
3. Audit all components for visual regressions.
4. Re-run Lighthouse (contrast, weight, etc.).
5. Bump version of this document.

### 17.3 Design Review Checklist

Before merging any visual change:

```
[ ] Uses existing tokens (no arbitrary values)
[ ] Passes contrast requirements
[ ] Focus states present
[ ] Works at 375, 768, 1440
[ ] No horizontal scroll
[ ] Lighthouse unchanged (100/100/100/100)
[ ] Sticky WhatsApp + back-to-top tested
[ ] Added to component library (if new)
[ ] Logged in DESIGN_LOG.md (if non-trivial)
```

### 17.4 Versioning

| Change | Version bump |
|--------|--------------|
| New component added | Minor (1.x.0) |
| Token value changed | Minor (1.x.0) |
| Typo / doc fix | Patch (1.0.x) |
| Palette overhaul / rebrand | Major (x.0.0) |

---

## Appendix A: Design Principles Quick Reference

```
┌─────────────────────────────────────────────────────────────┐
│  DESIGN PRINCIPLES — in priority order                      │
├─────────────────────────────────────────────────────────────┤
│  1. WARMTH FIRST                                            │
│     Cream bg, brown text, amber accent, golden hour photos  │
│                                                             │
│  2. PERFORMANCE FIRST                                       │
│     One display font, WebP, no heavy libraries, < 600 KB    │
│                                                             │
│  3. CONTENT FIRST                                           │
│     Large food photos, one message per viewport             │
│                                                             │
│  4. MOBILE FIRST                                            │
│     375 px base, md:/lg: enhancements, 44 px touch targets  │
│     Sticky WhatsApp within thumb reach                      │
│                                                             │
│  5. ACCESSIBLE BY DEFAULT                                   │
│     4.5:1 contrast, visible focus, semantic HTML            │
│                                                             │
│  6. SYSTEMATIZED                                            │
│     Tokens, not ad-hoc values. No arbitrary [Npx].          │
└─────────────────────────────────────────────────────────────┘
```

## Appendix B: Core Classes Cheatsheet

```
Container:        mx-auto max-w-6xl px-4 md:px-6 lg:px-8
Section:          py-16 md:py-20 lg:py-24
Page bg:          bg-ark-cream
H1:               text-4xl md:text-6xl font-bold tracking-tight text-stone-900 font-display
H2:               text-3xl md:text-4xl font-bold tracking-tight text-stone-900 font-display
H3:               text-xl font-semibold text-stone-900
Body:             text-base text-stone-700
Secondary:        text-stone-600
Muted:            text-stone-500
Price:            text-xl font-semibold text-ark-brown
WhatsApp btn:     rounded-lg bg-ark-whatsapp px-6 py-3 font-semibold text-white hover:bg-ark-whatsapp-dark focus-visible:ring-2 focus-visible:ring-ark-whatsapp focus-visible:ring-offset-2
Brown btn:        rounded-lg bg-ark-brown px-6 py-3 font-semibold text-white hover:bg-ark-brown-dark
Secondary btn:    rounded-lg border border-stone-300 bg-white px-6 py-3 font-semibold text-stone-700 hover:bg-stone-50
Input:            w-full rounded-lg border border-stone-300 px-4 py-3 text-base text-stone-900 placeholder:text-stone-400 focus:border-ark-brown focus:outline-none focus:ring-2 focus:ring-ark-brown/20
Card (feature):   rounded-xl border border-stone-200 p-6
Card (menu):      overflow-hidden rounded-xl border border-stone-200 bg-white
Card (testimonial): rounded-xl border border-stone-200 bg-white p-6
Menu grid:        grid gap-6 md:grid-cols-2 lg:grid-cols-3
Feature grid:     grid gap-6 md:grid-cols-2 lg:grid-cols-4
Gallery:          columns-2 md:columns-3 gap-4
Sticky WA:        fixed bottom-5 right-5 z-40 flex h-14 w-14 rounded-full bg-ark-whatsapp md:hidden
Back-to-top:      fixed bottom-5 right-5 z-40 hidden h-12 w-12 rounded-full bg-stone-900 md:flex
```

---

**Last Updated:** 2026-11-17
**Document Version:** 1.0.0
**Status:** Production Ready
**Owner:** Ark Coffee & Eatery
**Next Document:** `content-guide.md` (copy rules, voice, menu descriptions, system messages)

---

## V2 normative amendments — visual QA contract
- Canonical brand tokens remain cream `#FDF8F3`, brown `#4A2C2A`, amber `#D97706`, WhatsApp green `#25D366`; color usage must be checked for text/background contrast, especially white text on bright green and amber.
- Keep **one display font** and system body stack. Verify font license, actual WOFF2 file, `font-display: swap`, and fallback. Do not assume an asset exists merely because the file path is documented.
- Component contract for every interactive element: default, hover, focus-visible, active, disabled, loading, error, and success where applicable. Document keyboard behavior, ARIA label only when semantic HTML is insufficient, and touch target >=44px design goal.
- Mobile nav: button with `aria-expanded`, `aria-controls`, Escape close, focus management, outside-click behavior if implemented; anchor navigation should not be hidden by sticky header.
- Form: visible labels; per-field inline error tied via `aria-describedby`; `aria-invalid` on invalid fields; polite status live region; submission button prevents accidental duplicates; user can retry without losing entered data.
- Motion: reduced-motion disables decorative entrance animation and smooth scrolling; no essential information hidden behind IntersectionObserver.
- Image specification: meaningful `alt` for content images; empty alt for decoration; explicit dimensions/aspect ratio; responsive `srcset/sizes`; lazy-load below fold; do **not** lazy-load the LCP hero; use licensed, authentic photos, not invented product proof.
- Layout snapshots at 320/375/768/1024/1440 px, dark system preference (site may remain light), 200% zoom, long text, and missing image state. Compare against approved screenshots, not AI-generated imagined targets.
- Component inventory: Navbar, Hero, SocialProof, Features, Menu, HowItWorks, Gallery, Location, FAQ, ReservationForm, Footer, WhatsAppButton, StickyWhatsApp, BackToTop, SkipLink. Each must have an owner, content source, mobile/desktop layout, accessibility rules, and screenshot evidence.
- Avoid arbitrary values not in tokens; exceptions require a documented design decision.
