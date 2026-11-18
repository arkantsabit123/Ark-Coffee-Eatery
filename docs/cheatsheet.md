<!-- ARK DOCUMENTATION V2.0 — AUTHORITATIVE RULES BELOW TAKE PRECEDENCE OVER LEGACY V1 EXAMPLES -->
> **Version 2.0 | Status: Local implementation documented; production deployment pending. See `verification-checklist.md` for evidence.**
> **Implementation update:** Current package versions and commands are implemented in `package.json`; use static deployment until a serverless reservation architecture is separately approved. Canonical address data is maintained in `src/data/site.ts`.
> **Important:** The original v1 content is retained for detailed historical requirements. Any conflicting v1 commands, example code, numerical targets, business claims, or deployment statements are superseded by the **V2 normative amendments** at the end of this file, and by `docs/README.md`. Do not copy legacy Apps Script browser `fetch()` examples into production. `Production Ready` references in the retained historical sections do not describe the actual release state.
> **Source:** User-provided v1 file `Cheatsheet.md`. New v2 requirements are proposed engineering improvements, not verified facts about the business.

# Cheatsheet v2.0.0 — Ark Coffee & Eatery

**A quick-reference companion to the blueprint and design system.** Everything you need to build, deploy, and maintain the Ark Coffee & Eatery website — condensed into one page.

---

## Document Information

| Property | Value |
|----------|-------|
| Version | 1.0.0 |
| Last Updated | 2026-11-17 |
| Status | Implementation and deployment documented; custom-domain/post-deploy QA pending |
| Owner | Ark Coffee & Eatery |
| Companion Docs | `blueprint.md`, `design-system.md`, `content-guide.md`, `deployment-guide.md` |

---

## Quick Start

```bash
# 1. Create project
npm create astro@latest ark-coffee-eatery -- --template minimal

# 2. Enter directory
cd ark-coffee-eatery

# 3. Add Tailwind
npx astro add tailwind

# 4. Install deps
npm install
npm install lucide-astro

# 5. Start dev server
npm run dev
```

---

## NPM Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev server (http://localhost:4321) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run check` | Type and syntax check |

---

## File Scaffolding (One-Liner)

```bash
mkdir -p src/{layouts,components,pages,scripts,styles} \
         public/{fonts,images/{menu/{coffee,non-coffee,main-course,pastry},gallery,features,avatars,patterns}} \
         apps-script screenshots

touch src/layouts/BaseLayout.astro \
      src/components/{Navbar,Hero,SocialProof,Features,FeatureCard,Menu,MenuCategory,MenuItem,HowItWorks,Gallery,Location,FAQ,ReservationForm,Footer,SectionHeading,Button,WhatsAppButton,StickyWhatsApp,BackToTop,SkipLink}.astro \
      src/pages/{index,404}.astro \
      src/scripts/{form,nav,reveal,back-to-top}.ts \
      src/styles/global.css \
      apps-script/{Code.gs,appsscript.json} \
      .env.example .gitignore README.md
```

---

## Environment Variables

```env
# .env.example
PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
PUBLIC_WHATSAPP_NUMBER=6281234567890
PUBLIC_GA_ID=G-XXXXXXXXXX
```

> ⚠️ Only `PUBLIC_*` vars are exposed to the client. Never put secrets here.

---

## Astro Config

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://arkcoffee.id',
  output: 'static',
  build: { inlineStylesheets: 'auto' },
});
```

---

## Tailwind Config (Custom Tokens)

```js
// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Inter Display', 'system-ui', 'sans-serif'],
      },
      maxWidth: { 'screen-xl': '1200px' },
      colors: {
        ark: {
          cream: '#FDF8F3',
          'cream-dark': '#F5E6D3',
          brown: '#4A2C2A',
          'brown-dark': '#3A1F1D',
          amber: '#D97706',
          'amber-light': '#FEF3C7',
          whatsapp: '#25D366',
          'whatsapp-dark': '#1EBE5A',
        },
      },
    },
  },
};
```

---

## Global CSS

```css
/* src/styles/global.css */
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
  html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
}

@layer components {
  .reveal { opacity: 0; transform: translateY(1rem); transition: opacity 500ms ease, transform 500ms ease; }
  .reveal.is-visible { opacity: 1; transform: translateY(0); }
  @media (prefers-reduced-motion: reduce) {
    .reveal, .reveal.is-visible { opacity: 1; transform: none; transition: none; }
  }
}
```

---

## Google Apps Script Setup

### Steps
1. Open Google Sheet → **Extensions → Apps Script**
2. Paste `Code.gs` → **Save**
3. **Deploy → New deployment → Web app**
4. Execute as: **Me** | Who has access: **Anyone**
5. Copy the Web App URL → paste into `.env` as `PUBLIC_APPS_SCRIPT_URL`

### Code.gs

```js
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Reservations');
    const data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.whatsapp || '',
      data.people || '',
      data.date || '',
      data.time || '',
      data.notes || '',
      data.source || 'landing-page',
    ]);
    MailApp.sendEmail({
      to: 'owner@arkcoffee.id',
      subject: 'New reservation: ' + (data.name || 'Unnamed'),
      body: [
        'Name: ' + (data.name || ''),
        'WhatsApp: ' + (data.whatsapp || ''),
        'Party size: ' + (data.people || ''),
        'Date: ' + (data.date || ''),
        'Time: ' + (data.time || ''),
        'Notes: ' + (data.notes || ''),
      ].join('\n'),
    });
    return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### appsscript.json

```json
{
  "timeZone": "Asia/Jakarta",
  "dependencies": {},
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8",
  "webapp": {
    "executeAs": "USER_DEPLOYING",
    "access": "ANYONE_ANONYMOUS"
  }
}
```

---

## Google Sheet Schema

| Column | Header | Notes |
|--------|--------|-------|
| A | timestamp | Auto (Date) |
| B | name | From form |
| C | whatsapp | From form |
| D | party_size | From form |
| E | date | From form |
| F | time | From form |
| G | notes | Optional |
| H | source | Constant landing-page |

---

## WhatsApp Deep Link

```ts
const number = import.meta.env.PUBLIC_WHATSAPP_NUMBER || '6281234567890';
const message = encodeURIComponent('Hello Ark Coffee & Eatery, I would like to order/reserve.');
const href = `https://wa.me/${number}?text=${message}`;
```

**Format rules:**
- Country code first (62 for Indonesia)
- No `+`, no spaces, no dashes
- Example: `6281234567890`

---

## Client-Side Scripts

### form.ts

```ts
const form = document.getElementById('reservation-form') as HTMLFormElement | null;
const status = document.getElementById('form-status');
const endpoint = import.meta.env.PUBLIC_APPS_SCRIPT_URL;

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }
  const data = Object.fromEntries(new FormData(form).entries());
  status!.textContent = 'Sending…';
  status!.className = 'text-sm text-stone-500';
  try {
    const res = await fetch(endpoint!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, source: 'landing-page' }),
    });
    const json = await res.json();
    if (json.status === 'ok') {
      status!.textContent = 'Reservation received! We will confirm via WhatsApp within 1 hour.';
      status!.className = 'text-sm text-green-700 font-medium';
      form.reset();
    } else { throw new Error(json.message || 'Submission failed'); }
  } catch (err) {
    status!.textContent = 'Sorry, something went wrong. Please try again or contact us via WhatsApp.';
    status!.className = 'text-sm text-red-700 font-medium';
  }
});
```

### nav.ts

```ts
const toggle = document.getElementById('nav-toggle');
const menu = document.getElementById('nav-menu');
toggle?.addEventListener('click', () => {
  const open = menu?.classList.toggle('hidden') === false;
  toggle.setAttribute('aria-expanded', String(open));
});
```

### reveal.ts

```ts
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
```

### back-to-top.ts

```ts
const btn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 600) {
    btn?.classList.remove('hidden');
    btn?.classList.add('flex');
  } else {
    btn?.classList.add('hidden');
    btn?.classList.remove('flex');
  }
}, { passive: true });
btn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
```

---

## Core Class Cheatsheet

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

## Menu Data (Reference)

```ts
// src/components/Menu.astro
const categories = [
  {
    title: 'Coffee',
    items: [
      { name: 'Espresso', price: '18,000', desc: 'Single origin Gayo, bold and clean.', img: '/images/menu/coffee/espresso.webp', best: false },
      { name: 'Americano', price: '22,000', desc: 'Espresso with hot water, light and refreshing.', img: '/images/menu/coffee/americano.webp', best: false },
      { name: 'Latte', price: '28,000', desc: 'Espresso with steamed milk, smooth.', img: '/images/menu/coffee/latte.webp', best: true },
      { name: 'Kopi Susu Gula Aren', price: '25,000', desc: 'Our signature. Perfectly sweet, aromatic palm sugar.', img: '/images/menu/coffee/kopi-susu-gula-aren.webp', best: true },
    ],
  },
  {
    title: 'Non-Coffee',
    items: [
      { name: 'Matcha Latte', price: '30,000', desc: 'Japanese matcha with fresh milk.', img: '/images/menu/non-coffee/matcha-latte.webp', best: false },
      { name: 'Chocolate', price: '26,000', desc: 'Belgian chocolate, creamy and warm.', img: '/images/menu/non-coffee/chocolate.webp', best: false },
      { name: 'Lemon Tea', price: '20,000', desc: 'Black tea with fresh lemon, served iced.', img: '/images/menu/non-coffee/lemon-tea.webp', best: false },
    ],
  },
  {
    title: 'Main Course',
    items: [
      { name: 'Ark Fried Rice', price: '35,000', desc: 'Special fried rice with egg, chicken, and crackers.', img: '/images/menu/main-course/nasi-goreng-ark.webp', best: true },
      { name: 'Chicken Sandwich', price: '32,000', desc: 'Grilled chicken, lettuce, tomato, special sauce.', img: '/images/menu/main-course/chicken-sandwich.webp', best: false },
      { name: 'Beef Burger', price: '45,000', desc: '150g beef patty, cheese, lettuce, fries.', img: '/images/menu/main-course/beef-burger.webp', best: false },
      { name: 'Pasta Aglio Olio', price: '38,000', desc: 'Spaghetti with garlic, chili, and olive oil.', img: '/images/menu/main-course/pasta-aglio-olio.webp', best: false },
    ],
  },
  {
    title: 'Pastry',
    items: [
      { name: 'Croissant', price: '20,000', desc: 'Butter croissant, baked fresh every morning.', img: '/images/menu/pastry/croissant.webp', best: false },
      { name: 'Cinnamon Roll', price: '22,000', desc: 'Cinnamon roll with cream cheese glaze.', img: '/images/menu/pastry/cinnamon-roll.webp', best: false },
      { name: 'Banana Bread', price: '18,000', desc: 'Soft banana bread with walnuts.', img: '/images/menu/pastry/banana-bread.webp', best: false },
    ],
  },
];
```

---

## Image Specifications

| Image | Dimensions | Format | Max size |
|-------|-----------|--------|----------|
| Hero (desktop) | 2400 × 1500 | WebP | 180 KB |
| Hero (mobile) | 800 × 1000 | WebP | 100 KB |
| OG image | 1200 × 630 | PNG | 300 KB |
| Menu items | 800 × 800 (square) | WebP | 60 KB |
| Gallery | 1200 × 800 or 800 × 1200 | WebP | 100 KB |
| Avatars | 160 × 160 | WebP | 15 KB |
| Favicon | 32 × 32 (SVG) | SVG | — |
| Apple touch icon | 180 × 180 | PNG | — |
| PWA icons | 192 × 192, 512 × 512 | PNG | — |

---

## Form Field Validation

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| name | text | Yes | 2–80 chars |
| whatsapp | tel | Yes | 8–20 chars, digits/+/–/spaces |
| people | number | Yes | 1–20 |
| date | date | Yes | Today or later |
| time | time | Yes | 07:00–22:00 |
| notes | textarea | No | 0–500 chars |

---

## Form Status Messages

| State | Message | Class |
|-------|---------|-------|
| Idle | (none) | — |
| Submitting | `Sending…` | `text-stone-500` |
| Success | `Reservation received! We will confirm via WhatsApp within 1 hour.` | `text-green-700 font-medium` |
| Error | `Sorry, something went wrong. Please try again or contact us via WhatsApp.` | `text-red-700 font-medium` |

---

## SEO Checklist

```
[ ] <title> ≤ 60 chars, includes business name
[ ] <meta description> 120–160 chars
[ ] og:title, og:description, og:image (1200×630)
[ ] twitter:card = summary_large_image
[ ] canonical URL set
[ ] lang="en" on <html>
[ ] robots.txt allows all, references sitemap
[ ] sitemap.xml with 1 URL
[ ] LocalBusiness JSON-LD (CafeOrCoffeeShop)
[ ] All content images have alt text
```

---

## LocalBusiness JSON-LD

```json
{
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  "name": "Ark Coffee & Eatery",
  "image": "https://arkcoffee.id/images/hero-coffee.webp",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jl. Merdeka No. 12",
    "addressLocality": "Bandung",
    "addressRegion": "West Java",
    "postalCode": "40111",
    "addressCountry": "ID"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -6.9175,
    "longitude": 107.6191
  },
  "url": "https://arkcoffee.id",
  "telephone": "+6281234567890",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "07:00",
      "closes": "22:00"
    }
  ],
  "priceRange": "Rp 18,000 – Rp 45,000",
  "servesCuisine": "Coffee, Non-Coffee, Main Course, Pastry"
}
```

---

## Accessibility Checklist

```
[ ] Semantic landmarks (header, main, footer, section)
[ ] One <h1> per page
[ ] All form inputs have visible labels
[ ] Color contrast ≥ 4.5:1
[ ] Focus states visible
[ ] aria-live on form status
[ ] lang="en" on <html>
[ ] Skip link to main content
[ ] Decorative images alt="" + aria-hidden="true"
[ ] Content images have descriptive alt text
[ ] Sticky WhatsApp & back-to-top have aria-label
[ ] Pulse animation respects prefers-reduced-motion
```

---

## Responsive Testing Matrix

| Viewport | Tool | Pass Criteria |
|----------|------|---------------|
| 375 × 667 | Chrome DevTools | No horizontal scroll, readable text, hamburger nav works, sticky WA visible |
| 768 × 1024 | Chrome DevTools | Feature grid 2-col, menu 2-col, nav expanded, back-to-top appears |
| 1440 × 900 | Desktop browser | Max-width 1200 px container, menu 3-col, gallery masonry |

---

## Lighthouse Targets

| Category | Target |
|----------|--------|
| Performance | 100 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

---

## Performance Techniques

| Technique | Implementation |
|-----------|----------------|
| Zero-JS default | Astro ships no JS except form, nav, reveal, back-to-top |
| Image optimization | WebP format, explicit dimensions, lazy loading below fold |
| Hero image priority | `loading="eager"` + `fetchpriority="high"` |
| CSS minimalism | Tailwind purges unused classes |
| Font strategy | 1 display font (woff2, preload) + system body stack |
| Defer script | Scripts loaded as modules |
| Passive listener | Back-to-top uses `{ passive: true }` |

---

## Deployment Checklist

### Pre-deploy
```
[ ] .env created with PUBLIC_APPS_SCRIPT_URL, PUBLIC_WHATSAPP_NUMBER, PUBLIC_GA_ID
[ ] Google Sheet created with "Reservations" tab
[ ] Apps Script deployed as Web App (Anyone)
[ ] npm run build passes
[ ] npm run preview works locally
[ ] WhatsApp deep link tested
[ ] Form POST tested end-to-end
[ ] Lighthouse 100/100/100/100
[ ] Responsive tested at 375, 768, 1440
[ ] All images have width/height
[ ] OG image renders on social share
```

### Vercel
```
1. Push repo to GitHub
2. Import project in Vercel
3. Framework preset: Astro (auto-detected)
4. Build command: npm run build | Output: dist/
5. Add env vars: PUBLIC_APPS_SCRIPT_URL, PUBLIC_WHATSAPP_NUMBER, PUBLIC_GA_ID
6. Deploy
```

### Netlify
```
1. Push repo to GitHub
2. Import project in Netlify
3. Build command: npm run build | Publish: dist/
4. Add env vars in Site settings → Environment
5. Deploy
```

### Post-deploy
```
[ ] Live WhatsApp button tested
[ ] Live form submission tested
[ ] Reservations appear in Google Sheet
[ ] Owner notification email received
[ ] Custom domain configured (arkcoffee.id)
[ ] Lighthouse verified on live URL
[ ] Screenshots captured (10 files)
[ ] Preview video recorded
[ ] README updated with live URL
```

---

## Debug Commands

```bash
# Local dev
npm run dev

# Build and preview
npm run build && npm run preview

# Type check
npm run check

# Test Apps Script endpoint
curl -X POST "$PUBLIC_APPS_SCRIPT_URL" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","whatsapp":"08123456789","people":2,"date":"2026-11-20","time":"19:00","source":"landing-page"}'
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Form returns CORS error | Ensure Apps Script deployed as "Anyone" and URL is correct |
| 401/403 on form POST | Redeploy Apps Script; check deployment permissions |
| Reservations not appearing | Verify "Reservations" sheet exists; check execution log |
| WhatsApp link doesn't open | Verify number format (628xxx, no +, no spaces) |
| Sticky WhatsApp not showing on mobile | Check `md:hidden` class and viewport < 768 px |
| Back-to-top not appearing | Check scroll > 600 px and `md:flex` class |
| Lighthouse < 100 | Check image sizes, remove unused JS, verify font preload |
| Mobile layout broken | Verify Tailwind breakpoints applied correctly |
| Env var undefined | Prefix with PUBLIC_; restart dev server |
| Map embed not loading | Check iframe `src` and `loading="lazy"` |

---

## File Locations

| Content | File |
|---------|------|
| Page composition | `src/pages/index.astro` |
| Meta tags & font preload | `src/layouts/BaseLayout.astro` |
| Menu data | `src/components/Menu.astro` |
| Form markup | `src/components/ReservationForm.astro` |
| Form logic | `src/scripts/form.ts` |
| Nav logic | `src/scripts/nav.ts` |
| Reveal animation | `src/scripts/reveal.ts` |
| Back-to-top logic | `src/scripts/back-to-top.ts` |
| Global styles | `src/styles/global.css` |
| Tailwind tokens | `tailwind.config.mjs` |
| Apps Script backend | `apps-script/Code.gs` |
| Env template | `.env.example` |

---

## Color Tokens Quick Reference

| Token | Hex | Usage |
|-------|-----|-------|
| `ark-cream` | `#FDF8F3` | Page background |
| `ark-cream-dark` | `#F5E6D3` | Icon containers, subtle bg |
| `ark-brown` | `#4A2C2A` | Primary brand, buttons |
| `ark-brown-dark` | `#3A1F1D` | Button hover |
| `ark-amber` | `#D97706` | Accent, best seller |
| `ark-amber-light` | `#FEF3C7` | Badge background |
| `ark-whatsapp` | `#25D366` | WhatsApp CTA |
| `ark-whatsapp-dark` | `#1EBE5A` | WhatsApp hover |
| `stone-900` | `#1C1917` | Headings |
| `stone-700` | `#44403C` | Body text |
| `stone-600` | `#57534E` | Secondary text |
| `stone-500` | `#78716C` | Muted text |
| `stone-200` | `#E7E5E4` | Borders |
| `stone-300` | `#D6D3D1` | Input borders |
| `green-700` | `#15803D` | Success |
| `red-700` | `#B91C1C` | Error |

---

## Floating Elements

| Element | Position | Appears | Mobile | Desktop |
|---------|----------|---------|--------|---------|
| Navbar | `sticky top-0 z-50` | Always | Hamburger | Full nav |
| Sticky WhatsApp | `fixed bottom-5 right-5 z-40` | Always | ✅ | ❌ |
| Back-to-top | `fixed bottom-5 right-5 z-40` | After 600 px scroll | ❌ | ✅ |

---

## Package.json

```json
{
  "name": "ark-coffee-eatery",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "engines": { "node": ">=20.0.0" },
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  },
  "dependencies": {
    "astro": "^4.16.0",
    "@astrojs/tailwind": "^5.1.0",
    "tailwindcss": "^3.4.0",
    "lucide-astro": "^0.460.0"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.0",
    "typescript": "^5.6.0"
  }
}
```

---

## .gitignore

```
node_modules/
dist/
.astro/
.env
.env.*
!.env.example
.DS_Store
Thumbs.db
.idea/
.vscode/
*.log
npm-debug.log*
/*.py
verification/
```

---

## Quick Links

| Resource | URL |
|----------|-----|
| Astro Docs | https://docs.astro.build |
| Tailwind Docs | https://tailwindcss.com/docs |
| Lucide Icons | https://lucide.dev |
| Apps Script Docs | https://developers.google.com/apps-script |
| WhatsApp Click-to-Chat | https://faq.whatsapp.com/5913398998672934 |
| Lighthouse | https://developer.chrome.com/docs/lighthouse |
| Schema.org CafeOrCoffeeShop | https://schema.org/CafeOrCoffeeShop |
| Squoosh (image compress) | https://squoosh.app |
| Favicon.io | https://favicon.io |
| SimpleIcons | https://simpleicons.org |

---

**Last Updated:** 2026-11-17
**Document Version:** 1.0.0
**Status:** Production Ready
**Owner:** Ark Coffee & Eatery
**Next Document:** `deployment-guide.md` (step-by-step deployment for Vercel/Netlify + Apps Script)

---

## V2 normative quick reference (use this instead of conflicting legacy snippets)

**Before coding:** read `docs/README.md`, `AGENTS.md`, `architecture-decisions.md`, then the six core docs. Verify all `NEEDS_FACT_CHECK` content with the owner.

**Architecture:** Astro static UI -> same-origin `/api/reservations` serverless function -> approved backend -> restricted Google Sheet. Do not browser-fetch Apps Script JSON endpoint from v1.

**Canonical files:** `src/data/site.ts`, `src/data/menu.ts`, `src/pages/index.astro`, `src/components/*`, `src/styles/global.css`, `docs/*`, `AGENTS.md`.

**Env:** public: `PUBLIC_WHATSAPP_NUMBER`, `PUBLIC_GA_ID`; server-only: `APPS_SCRIPT_URL`, optional `RESERVATION_API_KEY`, `ALERT_EMAIL`. Never expose server secrets with `PUBLIC_`.

**Local commands** (only after verifying scripts exist in `package.json`):
```bash
npm ci
npm run check
npm run build
npm run test --if-present
npm run preview
```
**Release:** approved facts -> build/tests -> staging browser-to-Sheet end-to-end -> visual/a11y/performance -> sign-off -> production smoke test.

**Fail conditions:** placeholder business details, fake reviews, missing images, direct-browser Apps Script CORS failure, duplicate Sheet rows, form false-positive success, unprotected PII, missing focus, broken WhatsApp.

**Status:** specs are not proof of implementation. Update checklist statuses with screenshots/logs and commit SHA.
