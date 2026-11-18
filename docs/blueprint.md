<!-- ARK DOCUMENTATION V2.0 — AUTHORITATIVE RULES BELOW TAKE PRECEDENCE OVER LEGACY V1 EXAMPLES -->
> **Version 2.0 | Status: Specification Ready — local frontend implemented; production NOT verified. See `verification-checklist.md` for evidence.**
> **Important:** The original v1 content is retained for detailed historical requirements. Any conflicting v1 commands, example code, numerical targets, business claims, or deployment statements are superseded by the **V2 normative amendments** at the end of this file, and by `docs/README.md`. Do not copy legacy Apps Script browser `fetch()` examples into production. `Production Ready` references in the retained historical sections do not describe the actual release state.
> **Source:** User-provided v1 file `Blueprint.md`. New v2 requirements are proposed engineering improvements, not verified facts about the business.

# Blueprint v2.0.0 — Ark Coffee & Eatery

**Complete website blueprint for Ark Coffee & Eatery — a single-page, visual, warm, and conversion-focused website designed to make visitors want to come, order, and return.**

---

## Document Information

| Property | Value |
|----------|-------|
| Version | 1.0.0 |
| Last Updated | 2026-11-17 |
| Status | Production Ready |
| Owner | Ark Coffee & Eatery |
| Framework | Astro 4.x |
| Styling | Tailwind CSS 3.4 |
| Forms Backend | Google Apps Script (Web App) |
| Reservation Store | Google Sheets |
| Hosting | Vercel / Netlify (static) |
| Analytics | Google Analytics 4 |
| Primary Conversion | WhatsApp reservation / order |
| Secondary Conversion | Reservation form → Google Sheets |
| Target Lighthouse | 100 / 100 / 100 / 100 |

---

## About Ark Coffee & Eatery

**Ark Coffee & Eatery** is where specialty coffee meets comfort food. We believe that a good cup of coffee and an honest plate of food are reasons to pause, sit down, and enjoy the moment.

This website is our **digital home** — a place where visitors can see the full menu, feel the atmosphere, find our opening hours, and reserve a table or place an order in seconds. No empty pages, no missing information, no confusion.

Every element is designed with one goal in mind: **to make visitors want to come and experience Ark Coffee & Eatery.**

---

## Vision & Mission

| Vision | Mission |
|--------|---------|
| To become Bandung's favorite destination for specialty coffee and comfort food made with heart. | To serve coffee from selected beans, food from fresh ingredients, and an atmosphere that makes every visitor feel at home. |

---

## Brand Identity

| Element | Detail |
|---------|--------|
| **Name** | Ark Coffee & Eatery |
| **Tagline** | "Specialty coffee, comfort food" |
| **Location** | Jl. Merdeka No. 12, Bandung, West Java |
| **Opening Hours** | Every day, 07:00–22:00 |
| **Contact** | WhatsApp: 0812-3456-7890 · Instagram: @arkcoffee.eatery |
| **Brand Colors** | Warm brown (#4A2C2A), Cream (#FDF8F3), Amber (#D97706), WhatsApp Green (#25D366) |
| **Visual Character** | Warm, editorial, premium yet approachable — like a coffee magazine |

---

## Table of Contents

1. Project Overview
2. System Architecture
3. Data Flow
4. Page Structure & Section Map
5. Technology Stack
6. Content Model
7. Project Structure
8. Build & Deployment Configuration
9. Implementation Details
10. Form, WhatsApp & Lead Capture
11. Performance & Accessibility
12. SEO & Metadata
13. Business Value
14. Security
15. Troubleshooting
16. Future Enhancements
17. Quick Links
18. Appendix A: Screenshots Documentation
19. Appendix B: Verification Summary
20. Appendix C: Full Menu — Ark Coffee & Eatery

---

## 1. Project Overview

### 1.1 Core Goals

- Serve as the **official digital storefront** for Ark Coffee & Eatery
- Showcase the **full menu** (coffee, non-coffee, main courses, pastry) with photos and prices
- Present the **atmosphere** through warm, inviting gallery photos
- Make **table reservations** effortless via one-tap WhatsApp or a reservation form
- Provide **complete information** on location, hours, parking, and facilities
- Achieve **100/100 Lighthouse** across all four categories
- Full responsiveness from 375 px to 1440 px
- Deploy as a static site with zero server maintenance

### 1.2 Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Lighthouse Performance | 100 | Chrome DevTools |
| Lighthouse Accessibility | 100 | Chrome DevTools |
| Lighthouse Best Practices | 100 | Chrome DevTools |
| Lighthouse SEO | 100 | Chrome DevTools |
| Responsive breakpoints | 3 (375, 768, 1440) | Chrome DevTools |
| WhatsApp click-through rate | > 8% of visitors | GA4 event |
| Form submission success rate | 99%+ | Apps Script logs |
| Reservations (first month) | 50+ | Google Sheet |
| Total page weight | < 600 KB | Network tab |
| Time to Interactive | < 1.5 s | Lighthouse |
| Mobile-first impression | "Looks like a real café" | 5-person user test |

### 1.3 Project Context

| Property | Value |
|----------|-------|
| Business Type | Local coffee shop & eatery |
| Products | Specialty coffee, non-coffee drinks, main courses, pastry |
| Goal | Increase visits + WhatsApp reservations |
| Timeline | 1–2 weeks |
| Deliverable | Live single-page website + WhatsApp conversion + lead capture + documentation |

---

## 2. System Architecture

### 2.1 Architecture Diagram

```
+-------------------------------------------------------------------+
|                        VISITOR (Browser)                          |
|  - Static HTML/CSS/JS served from CDN                             |
|  - WhatsApp deep link (primary CTA)                               |
|  - Reservation form (secondary CTA)                               |
+----------------------------------+--------------------------------+
                                   |
              +--------------------+--------------------+
              |                                         |
              v                                         v
+-----------------------------+         +-----------------------------+
|   WHATSAPP (wa.me deep link) |         |  FORM SUBMISSION (fetch)    |
|   - Opens WhatsApp app       |         |  - JSON POST to Apps Script |
|   - Pre-filled message       |         |  - Reservation details      |
|   - No backend required      |         |                             |
+-----------------------------+         +--------------+--------------+
                                                       |
                                                       v
+-------------------------------------------------------------------+
|                 GOOGLE APPS SCRIPT (Web App)                      |
|  - doPost(e) receives JSON                                        |
|  - Appends row to Google Sheet                                    |
|  - Sends email notification to owner                              |
|  - Returns JSON success/error response                            |
+----------------------------------+--------------------------------+
                                   |
                                   v
+-------------------------------------------------------------------+
|                      GOOGLE SHEETS (Reservation Store)            |
|  - Columns: timestamp, name, whatsapp, party_size,                |
|    date, time, notes, source                                      |
+-------------------------------------------------------------------+
```

**Why WhatsApp is the primary conversion:** Over 90% of Indonesian consumers use WhatsApp daily. Email is rarely opened. A WhatsApp reservation is one tap; an email reservation is five steps. WhatsApp conversion is significantly higher for local businesses.

### 2.2 Architecture Components

| Component | Purpose | Justification |
|-----------|---------|---------------|
| Astro | Static site generation | Zero JS by default, fast, SEO-friendly |
| Tailwind CSS | Styling | Utility-first, small CSS output, responsive by default |
| WhatsApp deep link (`wa.me`) | Primary conversion | One tap, no form, no backend |
| Google Apps Script | Reservation form backend | Free, no server, instant setup |
| Google Sheets | Reservation storage | Free, shareable, CSV export |
| Vercel/Netlify | Hosting | Free tier, global CDN, Git-based deploys |
| Google Analytics 4 | Analytics | Track page views, WhatsApp clicks, form conversions |

### 2.3 Architecture Layers

```
+-------------------------------------------------------------------+
|                         BUILD LAYER                               |
|  - Astro components + Tailwind CSS                                |
|  - Ark Coffee & Eatery content (menu, hours, location)            |
+----------------------------------+--------------------------------+
                                   v
+-------------------------------------------------------------------+
|                        STATIC OUTPUT                              |
|  - dist/index.html                                                |
|  - dist/_astro/*.css, *.js                                        |
|  - dist/images/* (coffee, food, interior, menu photos)            |
+----------------------------------+--------------------------------+
                                   v
+-------------------------------------------------------------------+
|                        HOSTING LAYER                              |
|  - Vercel / Netlify CDN                                           |
|  - HTTPS, custom domain (arkcoffee.id)                            |
+----------------------------------+--------------------------------+
                                   v
+-------------------------------------------------------------------+
|                        CONVERSION LAYER                           |
|  - Primary: WhatsApp deep link (wa.me)                            |
|  - Secondary: Reservation form → Apps Script → Google Sheets      |
+-------------------------------------------------------------------+
```

---

## 3. Data Flow

### 3.1 Data Flow Summary

1. **Build:** Astro compiles components into static HTML/CSS/JS
2. **Deploy:** Static output pushed to Vercel/Netlify via Git
3. **Visit:** Browser requests page from CDN edge
4. **Render:** Static HTML renders immediately; minimal JS for form + nav
5. **Primary action:** Visitor taps "Order via WhatsApp" → WhatsApp opens with pre-filled message
6. **Secondary action:** Visitor fills reservation form → fetch POST to Apps Script
7. **Store:** Apps Script appends row to Google Sheets + sends email to owner
8. **Confirm:** Apps Script returns JSON → UI shows success message
9. **Analyze:** GA4 records page view, WhatsApp click, and form conversion events

### 3.2 Detailed Pipeline Steps

```
+-------------------------------------------------------------------+
|  Step 1: PAGE LOAD                                                |
|  Input:  https://arkcoffee.id                                     |
|  Action: CDN serves dist/index.html + CSS + images                |
|  Output: Fully rendered page, no JS required for first paint      |
|  Time:   < 1 s on 4G                                              |
+----------------------------------+--------------------------------+
                                   v
+-------------------------------------------------------------------+
|  Step 2a: WHATSAPP CONVERSION (primary)                           |
|  Input:  Visitor taps "Order via WhatsApp"                        |
|  Action: Opens wa.me/628xxx?text=Hello%20Ark%20Coffee...          |
|  Output: WhatsApp opens with pre-filled message                   |
|  Time:   < 500 ms (deep link)                                     |
+----------------------------------+--------------------------------+
                                   v
+-------------------------------------------------------------------+
|  Step 2b: FORM CONVERSION (secondary)                             |
|  Input:  Visitor fills name, WhatsApp, party size, date           |
|  Action: Client-side validation                                   |
|  Output: Validated payload                                        |
+----------------------------------+--------------------------------+
                                   v
+-------------------------------------------------------------------+
|  Step 3: SUBMISSION                                               |
|  Input:  JSON payload                                             |
|  Action: fetch() POST to Apps Script Web App URL                  |
|  Output: HTTP 200 with {status: "ok"}                             |
+----------------------------------+--------------------------------+
                                   v
+-------------------------------------------------------------------+
|  Step 4: STORAGE                                                  |
|  Input:  JSON payload                                             |
|  Action: Apps Script appends row to Google Sheet                  |
|  Output: New row with timestamp and source                        |
+----------------------------------+--------------------------------+
                                   v
+-------------------------------------------------------------------+
|  Step 5: FEEDBACK                                                 |
|  Input:  JSON response                                            |
|  Action: UI swaps form for success message                        |
|  Output: Visitor sees confirmation + WhatsApp follow-up link      |
+-------------------------------------------------------------------+
```

---

## 4. Page Structure & Section Map

### 4.1 Section Order (Top to Bottom)

| # | Section | Purpose | Required | Priority |
|---|---------|---------|----------|----------|
| 1 | Navbar | Logo + anchor links + WhatsApp CTA | Yes | P0 |
| 2 | Hero | Headline, subheadline, primary CTA, **hero photo** | Yes | P0 |
| 3 | Social Proof | Rating + "2,000+ customers" + testimonials | Yes | P0 |
| 4 | Features | 4 reasons to visit (beans, WiFi, hours, workspace) | Yes | P0 |
| 5 | **Signature Menu** | **Full menu: coffee, non-coffee, main courses, pastry** | Yes | P0 |
| 6 | How It Works | 3 steps "come → order → enjoy" | Yes | P1 |
| 7 | Gallery | 6 photos of interior, coffee, food, people | Yes | P0 |
| 8 | Location & Hours | Map embed + address + hours + parking | Yes | P0 |
| 9 | FAQ | 5 questions (WiFi? reservations? non-coffee? parking?) | Yes | P1 |
| 10 | Reservation Form | Name, WhatsApp, party size, date, time, notes | Yes | P0 |
| 11 | Footer | Address, hours, Instagram, WhatsApp, copyright | Yes | P0 |

**11 sections. All required.** A coffee shop & eatery needs every section to answer: *"What is this place? What do they serve? Where is it? When are they open? How do I order?"*

### 4.2 Section Specifications

| Section | Component | Content Rules |
|---------|-----------|---------------|
| Navbar | Navbar.astro | Logo left, anchor links center, WhatsApp CTA right, sticky, backdrop-blur |
| Hero | Hero.astro | Headline ≤ 10 words; subheadline ≤ 25 words; **1 hero photo**; primary CTA = WhatsApp |
| Social Proof | SocialProof.astro | Rating (4.9/5) + "2,000+ customers" + 3 short testimonials |
| Features | Features.astro | Exactly 4 cards: beans, WiFi, hours, workspace |
| **Signature Menu** | **Menu.astro** | **4 categories: Coffee, Non-Coffee, Main Course, Pastry. Total 14 items** |
| How It Works | HowItWorks.astro | Exactly 3 steps: Come → Order → Enjoy |
| Gallery | Gallery.astro | 6 photos in masonry or grid layout |
| Location & Hours | Location.astro | Map embed + address + hours table + parking info |
| FAQ | FAQ.astro | 5 question/answer pairs, accordion |
| Reservation Form | ReservationForm.astro | 6 fields; inline validation; success + error states; WhatsApp follow-up link |
| Footer | Footer.astro | Address, hours, Instagram, WhatsApp, copyright |

### 4.3 Responsive Breakpoints

| Breakpoint | Width | Layout Behavior |
|------------|-------|-----------------|
| Mobile | 375 px | Single column, stacked sections, hamburger nav, sticky WhatsApp button |
| Tablet | 768 px | Feature grid 2-col, menu 2-col, nav expanded |
| Desktop | 1440 px | Max-width container (1200 px), menu 3-col, gallery masonry, full nav |

### 4.4 Floating Elements (Scroll Behavior)

| Element | Position | Appears When | Mobile | Desktop |
|---------|----------|--------------|--------|---------|
| **Navbar** | `sticky top-0 z-50` | Always, backdrop-blur, shadow after 100 px | Hamburger menu | Full nav |
| **Sticky WhatsApp** | `fixed bottom-5 right-5 z-40` | Always (primary conversion) | ✅ Yes | ❌ No (already in navbar) |
| **Back-to-top** | `fixed bottom-5 right-5 z-40` | After 600 px scroll | ❌ No | ✅ Yes |

---

## 5. Technology Stack

| Layer | Technology | Version | Justification |
|-------|------------|---------|---------------|
| Framework | Astro | 4.x | Static-first, zero JS by default, fast builds |
| Styling | Tailwind CSS | 3.4 | Utility-first, responsive utilities, small output |
| Icons | Lucide (`lucide-astro`) | Latest | Consistent SVG icon set, tree-shakeable |
| Display font | Inter Display / Satoshi | woff2, latin subset | Warmer than system font, still fast (~25 KB) |
| Body font | System font stack | N/A | Performance-friendly typography |
| Forms | Google Apps Script | N/A | Free backend, no server to maintain |
| Reservation Store | Google Sheets | N/A | Free, shareable, CSV export |
| Primary CTA | WhatsApp deep link (`wa.me`) | N/A | One tap, no backend, highest conversion |
| Hosting | Vercel or Netlify | N/A | Free tier, global CDN, Git deploys |
| Analytics | Google Analytics 4 | N/A | Track views and conversions |

**Total dependencies: 6** (Astro, @astrojs/tailwind, tailwindcss, lucide-astro, @astrojs/check, typescript). Total JS to client: ~4 KB.

---

## 6. Content Model

### 6.1 Frontmatter Fields (case-study.md)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | Yes | "Ark Coffee & Eatery — Specialty Coffee & Comfort Food in Bandung" |
| description | string | Yes | 1–2 sentence summary (120–180 chars) |
| techStack | string[] | Yes | ["Astro", "Tailwind CSS", "Google Apps Script", "Google Sheets"] |
| thumbnail | string | Yes | Path to 1200×630 image (hero photo) |
| demoUrl | string | Yes (may be "") | Live site URL |
| repoUrl | string | Yes (may be "") | Source repo URL |
| category | enum | Yes | `landing-page` |
| featured | boolean | Yes | Homepage prominence |
| date | ISO date | Yes | Completion date |

### 6.2 Body Sections

| Section | Length | Must Include |
|---------|--------|--------------|
| Executive Summary | 3–5 sentences | Business type, deliverable, headline outcome |
| The Problem | 2–4 sentences | At least one concrete pain point |
| The Solution | 3–5 sentences | Tech choices mapped to problems |
| The Results | 2–4 sentences | Quantified outcomes (Lighthouse 100, WhatsApp CTR, reservations) |

---

## 7. Project Structure

```
ark-coffee-eatery/
│
├── .nvmrc                              # Node 20
├── .gitignore
├── .env.example
├── README.md
├── LICENSE
├── CHANGELOG.md
├── DESIGN_LOG.md
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── tsconfig.json
│
├── docs/
│   ├── README.md
│   ├── blueprint.md                    # This document
│   ├── design-system.md
│   ├── content-guide.md
│   ├── cheatsheets.md
│   └── deployment-guide.md
│
├── public/
│   ├── favicon.svg
│   ├── favicon-32.png
│   ├── apple-touch-icon.png
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── manifest.webmanifest
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── fonts/
│   │   └── display.woff2
│   └── images/
│       ├── hero-coffee.webp
│       ├── hero-interior.webp
│       ├── og-image.png
│       ├── menu/
│       │   ├── coffee/
│       │   │   ├── espresso.webp
│       │   │   ├── americano.webp
│       │   │   ├── latte.webp
│       │   │   └── kopi-susu-gula-aren.webp
│       │   ├── non-coffee/
│       │   │   ├── matcha-latte.webp
│       │   │   ├── chocolate.webp
│       │   │   └── lemon-tea.webp
│       │   ├── main-course/
│       │   │   ├── nasi-goreng-ark.webp
│       │   │   ├── chicken-sandwich.webp
│       │   │   ├── beef-burger.webp
│       │   │   └── pasta-aglio-olio.webp
│       │   └── pastry/
│       │       ├── croissant.webp
│       │       ├── cinnamon-roll.webp
│       │       └── banana-bread.webp
│       ├── gallery/
│       │   ├── interior-1.webp
│       │   ├── interior-2.webp
│       │   ├── barista.webp
│       │   ├── customers.webp
│       │   ├── coffee-beans.webp
│       │   └── workspace.webp
│       ├── features/
│       │   ├── beans.svg
│       │   ├── wifi.svg
│       │   ├── clock.svg
│       │   └── workspace.svg
│       ├── avatars/
│       │   ├── avatar-1.webp
│       │   ├── avatar-2.webp
│       │   └── avatar-3.webp
│       └── patterns/
│           └── texture-warm.svg
│
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro
│   │
│   ├── components/
│   │   ├── Navbar.astro
│   │   ├── Hero.astro
│   │   ├── SocialProof.astro
│   │   ├── Features.astro
│   │   ├── FeatureCard.astro
│   │   ├── Menu.astro
│   │   ├── MenuCategory.astro
│   │   ├── MenuItem.astro
│   │   ├── HowItWorks.astro
│   │   ├── Gallery.astro
│   │   ├── Location.astro
│   │   ├── FAQ.astro
│   │   ├── ReservationForm.astro
│   │   ├── Footer.astro
│   │   ├── SectionHeading.astro
│   │   ├── Button.astro
│   │   ├── WhatsAppButton.astro
│   │   ├── StickyWhatsApp.astro
│   │   ├── BackToTop.astro
│   │   └── SkipLink.astro
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   └── 404.astro
│   │
│   ├── scripts/
│   │   ├── form.ts
│   │   ├── nav.ts
│   │   ├── reveal.ts
│   │   └── back-to-top.ts
│   │
│   ├── styles/
│   │   └── global.css
│   │
│   └── env.d.ts
│
├── apps-script/
│   ├── Code.gs
│   └── appsscript.json
│
└── screenshots/
    ├── 00-preview-video.mp4
    ├── 01-lighthouse.png
    ├── 02-hero.png
    ├── 03-menu-coffee.png
    ├── 04-menu-main.png
    ├── 05-gallery.png
    ├── 06-form.png
    ├── 07-form-success.png
    ├── 08-google-sheet.png
    ├── 09-mobile.png
    └── 10-desktop.png
```

---

## 8. Build & Deployment Configuration

### 8.1 Astro Configuration

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://arkcoffee.id',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
});
```

### 8.2 NPM Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| dev | astro dev | Local dev server |
| build | astro build | Production build |
| preview | astro preview | Preview production build |
| check | astro check | Type and syntax check |

### 8.3 Deployment Targets

| Host | Configuration | Custom Domain |
|------|---------------|---------------|
| Vercel | Auto-detect Astro; build astro build; output dist/ | Supported (arkcoffee.id) |
| Netlify | Build astro build; publish dist/ | Supported |

### 8.4 Environment Variables

| Variable | Location | Purpose |
|----------|----------|---------|
| PUBLIC_APPS_SCRIPT_URL | .env | Apps Script endpoint (reservation form) |
| PUBLIC_WHATSAPP_NUMBER | .env | WhatsApp number in international format (628xxx) |
| PUBLIC_GA_ID | .env | GA4 measurement ID |

---

## 9. Implementation Details

### 9.1 Base Layout

```astro
---
// src/layouts/BaseLayout.astro
interface Props { title: string; description: string; }
const { title, description } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content="/images/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preload" as="font" type="font/woff2" href="/fonts/display.woff2" crossorigin />
    <link rel="manifest" href="/manifest.webmanifest" />
  </head>
  <body class="bg-[#FDF8F3] text-stone-900 antialiased font-sans">
    <slot />
  </body>
</html>
```

### 9.2 Page Composition

```astro
---
// src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import SkipLink from '../components/SkipLink.astro';
import Navbar from '../components/Navbar.astro';
import Hero from '../components/Hero.astro';
import SocialProof from '../components/SocialProof.astro';
import Features from '../components/Features.astro';
import Menu from '../components/Menu.astro';
import HowItWorks from '../components/HowItWorks.astro';
import Gallery from '../components/Gallery.astro';
import Location from '../components/Location.astro';
import FAQ from '../components/FAQ.astro';
import ReservationForm from '../components/ReservationForm.astro';
import Footer from '../components/Footer.astro';
import StickyWhatsApp from '../components/StickyWhatsApp.astro';
import BackToTop from '../components/BackToTop.astro';
---
<BaseLayout
  title="Ark Coffee & Eatery — Specialty Coffee & Comfort Food in Bandung"
  description="Selected beans, freshly brewed. Coffee, non-coffee, main courses, and pastry. Open daily 7 AM–10 PM at Jl. Merdeka No. 12, Bandung."
>
  <SkipLink />
  <Navbar />
  <main id="main">
    <Hero />
    <SocialProof />
    <Features />
    <Menu />
    <HowItWorks />
    <Gallery />
    <Location />
    <FAQ />
    <ReservationForm />
  </main>
  <Footer />
  <StickyWhatsApp />
  <BackToTop />
</BaseLayout>
```

### 9.3 Hero Section

```astro
---
// src/components/Hero.astro
import WhatsAppButton from './WhatsAppButton.astro';
---
<section class="relative overflow-hidden bg-gradient-to-b from-[#FDF8F3] to-white">
  <div class="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 md:grid-cols-2 md:py-24 md:px-6 lg:px-8">
    <div>
      <h1 class="text-4xl font-bold tracking-tight text-stone-900 md:text-6xl">
        Specialty coffee, comfort food
      </h1>
      <p class="mt-4 max-w-xl text-lg text-stone-600">
        Selected beans from Gayo and Lampung, brewed by experienced baristas.
        Coffee, non-coffee, main courses, and pastry — all made fresh.
        Open daily 7 AM–10 PM at Jl. Merdeka No. 12, Bandung.
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <WhatsAppButton label="Order via WhatsApp" />
        <a href="#menu" class="rounded-lg border border-stone-300 bg-white px-6 py-3 font-semibold text-stone-700 hover:bg-stone-50">
          View menu
        </a>
      </div>
      <p class="mt-4 text-sm text-stone-500">2,000+ customers · 4.9/5 rating</p>
    </div>
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
  </div>
</section>
```

### 9.4 Menu Section (4 Categories)

```astro
---
// src/components/Menu.astro
import SectionHeading from './SectionHeading.astro';
import MenuCategory from './MenuCategory.astro';

const categories = [
  {
    title: 'Coffee',
    items: [
      { name: 'Espresso', price: '18,000', desc: 'Single origin Gayo, bold and clean.', img: '/images/menu/coffee/espresso.webp', best: false },
      { name: 'Americano', price: '22,000', desc: 'Espresso with hot water, light and refreshing.', img: '/images/menu/coffee/americano.webp', best: false },
      { name: 'Latte', price: '28,000', desc: 'Espresso with steamed milk, smooth.', img: '/images/menu/coffee/latte.webp', best: true },
      { name: 'Palm Sugar Milk Coffee', price: '25,000', desc: 'Our signature. Perfectly sweet, aromatic palm sugar.', img: '/images/menu/coffee/kopi-susu-gula-aren.webp', best: true },
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
---
<section id="menu" class="py-16 md:py-20 lg:py-24">
  <div class="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
    <SectionHeading
      title="Ark Coffee & Eatery Menu"
      subtitle="Specialty coffee, non-coffee, main courses, and pastry. Brewed and cooked fresh every day."
    />
    <div class="mt-12 space-y-16">
      {categories.map((cat) => <MenuCategory {...cat} />)}
    </div>
  </div>
</section>
```

### 9.5 Reservation Form Component

```astro
---
// src/components/ReservationForm.astro
import SectionHeading from './SectionHeading.astro';
---
<section id="reservation" class="bg-stone-50 py-16 md:py-20 lg:py-24">
  <div class="mx-auto max-w-2xl px-4 md:px-6 lg:px-8">
    <SectionHeading
      title="Reserve a table"
      subtitle="Fill in the form below, we'll confirm via WhatsApp within 1 hour."
    />
    <form id="reservation-form" class="mt-8 space-y-4 rounded-2xl border border-stone-200 bg-white p-6 md:p-8" novalidate>
      <div>
        <label for="name" class="mb-2 block text-sm font-medium text-stone-700">Full name</label>
        <input id="name" name="name" required minlength="2" maxlength="80"
          class="w-full rounded-lg border border-stone-300 px-4 py-3 text-base text-stone-900 placeholder:text-stone-400 focus:border-[#4A2C2A] focus:outline-none focus:ring-2 focus:ring-[#4A2C2A]/20" />
      </div>
      <div>
        <label for="whatsapp" class="mb-2 block text-sm font-medium text-stone-700">WhatsApp number</label>
        <input id="whatsapp" name="whatsapp" type="tel" required pattern="[0-9+\-\s]{8,20}"
          placeholder="0812-3456-7890"
          class="w-full rounded-lg border border-stone-300 px-4 py-3 text-base text-stone-900 placeholder:text-stone-400 focus:border-[#4A2C2A] focus:outline-none focus:ring-2 focus:ring-[#4A2C2A]/20" />
        <p class="mt-1 text-sm text-stone-500">We'll only contact you via WhatsApp.</p>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <div>
          <label for="people" class="mb-2 block text-sm font-medium text-stone-700">Party size</label>
          <input id="people" name="people" type="number" min="1" max="20" required
            class="w-full rounded-lg border border-stone-300 px-4 py-3 text-base text-stone-900 focus:border-[#4A2C2A] focus:outline-none focus:ring-2 focus:ring-[#4A2C2A]/20" />
        </div>
        <div>
          <label for="date" class="mb-2 block text-sm font-medium text-stone-700">Date</label>
          <input id="date" name="date" type="date" required
            class="w-full rounded-lg border border-stone-300 px-4 py-3 text-base text-stone-900 focus:border-[#4A2C2A] focus:outline-none focus:ring-2 focus:ring-[#4A2C2A]/20" />
        </div>
      </div>
      <div>
        <label for="time" class="mb-2 block text-sm font-medium text-stone-700">Time</label>
        <input id="time" name="time" type="time" required min="07:00" max="22:00"
          class="w-full rounded-lg border border-stone-300 px-4 py-3 text-base text-stone-900 focus:border-[#4A2C2A] focus:outline-none focus:ring-2 focus:ring-[#4A2C2A]/20" />
      </div>
      <div>
        <label for="notes" class="mb-2 block text-sm font-medium text-stone-700">Notes (optional)</label>
        <textarea id="notes" name="notes" rows="3" maxlength="500"
          class="w-full rounded-lg border border-stone-300 px-4 py-3 text-base text-stone-900 placeholder:text-stone-400 focus:border-[#4A2C2A] focus:outline-none focus:ring-2 focus:ring-[#4A2C2A]/20 resize-y"></textarea>
      </div>
      <button type="submit"
        class="w-full rounded-lg bg-[#4A2C2A] px-6 py-3 font-semibold text-white hover:bg-[#3A1F1D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A2C2A] focus-visible:ring-offset-2">
        Send reservation
      </button>
      <p id="form-status" class="text-sm" aria-live="polite"></p>
      <p class="text-xs text-stone-500">We will not misuse your number. Confirmation via WhatsApp.</p>
    </form>
  </div>
</section>
```

### 9.6 Sticky WhatsApp Component

```astro
---
// src/components/StickyWhatsApp.astro
const number = import.meta.env.PUBLIC_WHATSAPP_NUMBER || '6281234567890';
const message = encodeURIComponent('Hello Ark Coffee & Eatery, I would like to order/reserve.');
const href = `https://wa.me/${number}?text=${message}`;
---
<a href={href} target="_blank" rel="noopener" aria-label="Order via WhatsApp"
  class="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 md:hidden">
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4a7.94 7.94 0 0 0-6.9 11.9L4 20l4.2-1.1a7.9 7.9 0 0 0 3.85 1h.01a7.93 7.93 0 0 0 5.54-13.58z"/>
  </svg>
</a>
```

### 9.7 Back-to-Top Component

```astro
---
// src/components/BackToTop.astro
---
<button id="back-to-top" aria-label="Back to top"
  class="fixed bottom-5 right-5 z-40 hidden h-12 w-12 items-center justify-center rounded-full bg-stone-900 text-white shadow-lg transition-opacity hover:bg-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 md:flex">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M12 19V5M5 12l7-7 7 7" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</button>
```

### 9.8 Client-Side Scripts

```ts
// src/scripts/form.ts
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

```ts
// src/scripts/nav.ts
const toggle = document.getElementById('nav-toggle');
const menu = document.getElementById('nav-menu');
toggle?.addEventListener('click', () => {
  const open = menu?.classList.toggle('hidden') === false;
  toggle.setAttribute('aria-expanded', String(open));
});
```

```ts
// src/scripts/reveal.ts
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

```ts
// src/scripts/back-to-top.ts
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

## 10. Form, WhatsApp & Lead Capture

### 10.1 Conversion Paths

| Path | Trigger | Backend | Target Conversion Rate |
|------|---------|---------|----------------------|
| **Primary: WhatsApp** | Tap "Order via WhatsApp" (navbar, hero, menu, footer, sticky) | None (deep link) | > 8% of visitors |
| **Secondary: Reservation form** | Submit form | Apps Script → Google Sheets | > 3% of visitors |

### 10.2 Form Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| name | text | Yes | 2–80 chars |
| whatsapp | tel | Yes | 8–20 chars, digits/+/–/spaces |
| people | number | Yes | 1–20 |
| date | date | Yes | Today or later |
| time | time | Yes | 07:00–22:00 |
| notes | textarea | No | 0–500 chars |

### 10.3 Apps Script Endpoint

```js
// apps-script/Code.gs
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Reservations');
    const data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date(), data.name || '', data.whatsapp || '', data.people || '',
      data.date || '', data.time || '', data.notes || '', data.source || 'landing-page',
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

### 10.4 Google Sheet Schema

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

### 10.5 Deployment Steps (Apps Script)

1. Open Google Sheets → Extensions → Apps Script
2. Paste Code.gs → Save
3. Deploy → New deployment → Web app
4. Execute as: Me; Who has access: Anyone
5. Copy Web App URL → set as PUBLIC_APPS_SCRIPT_URL
6. Test with curl -X POST before wiring the form

---

## 11. Performance & Accessibility

### 11.1 Lighthouse Targets

| Category | Target |
|----------|--------|
| Performance | 100 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

### 11.2 Performance Techniques

| Technique | Implementation |
|-----------|----------------|
| Zero-JS default | Astro ships no JS except form, nav, reveal, back-to-top |
| Image optimization | WebP format, explicit dimensions, `loading="lazy"` below fold |
| Hero image priority | `loading="eager"` + `fetchpriority="high"` |
| CSS minimalism | Tailwind purges unused classes |
| Font strategy | 1 display font (woff2, preload) + system body stack |
| Defer script | Scripts loaded as modules |
| Passive listener | Back-to-top uses `{ passive: true }` |

### 11.3 Accessibility Checklist

- [ ] Semantic landmarks (header, main, footer, section)
- [ ] One `<h1>` per page
- [ ] All form inputs have visible labels (not placeholder-only)
- [ ] Color contrast ≥ 4.5:1
- [ ] Focus states visible
- [ ] aria-live on form status message
- [ ] lang="en" on `<html>`
- [ ] Skip link to main content
- [ ] Decorative images `alt=""` + `aria-hidden="true"`
- [ ] Content images have descriptive alt text
- [ ] Sticky WhatsApp & back-to-top have `aria-label`
- [ ] Pulse animation respects `prefers-reduced-motion`

### 11.4 Responsive Testing Matrix

| Viewport | Tool | Pass Criteria |
|----------|------|---------------|
| 375 × 667 | Chrome DevTools | No horizontal scroll, readable text, hamburger nav works, sticky WA visible |
| 768 × 1024 | Chrome DevTools | Feature grid 2-col, menu 2-col, nav expanded, back-to-top appears |
| 1440 × 900 | Desktop browser | Max-width 1200 px container, menu 3-col, gallery masonry |

---

## 12. SEO & Metadata

| Item | Value |
|------|-------|
| `<title>` | "Ark Coffee & Eatery — Specialty Coffee & Comfort Food in Bandung" (≤ 60 chars) |
| `<meta description>` | "Selected beans, freshly brewed. Coffee, non-coffee, main courses, and pastry. Open daily 7 AM–10 PM at Jl. Merdeka No. 12, Bandung." (120–160 chars) |
| Open Graph title | Same as `<title>` |
| Open Graph image | `/images/og-image.png` (1200×630) |
| Twitter card | `summary_large_image` |
| Canonical URL | https://arkcoffee.id |
| robots.txt | Allow all; reference sitemap |
| Structured data | **LocalBusiness JSON-LD** (name, address, hours, phone, priceRange) |
| Language | `lang="en"` |

### 12.1 LocalBusiness JSON-LD

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

## 13. Business Value

### 13.1 Metrics Comparison

| Metric | Before | After |
|--------|--------|-------|
| Online presence | Linktree / Instagram only | Professional single-page website |
| Reservation process | Instagram DM (manual) | WhatsApp 1-tap + form → Sheet |
| Time to launch | 4–6 weeks (template + custom dev) | 1–2 weeks |
| Page load time | 4.5 s (heavy template) | < 1 s |
| Lead capture | Manual DM | Automated to Sheets + email notification |
| Mobile experience | Broken | Fully responsive |
| Hosting cost | Paid hosting + DB | Free tier static hosting |
| Maintenance | Server patching | None (static) |
| Local SEO | None | LocalBusiness JSON-LD + sitemap |
| Menu display | PDF / Instagram photos | Interactive 4-category menu with photos |

### 13.2 Use Cases

- **Ark Coffee & Eatery digital storefront** — replace Linktree with a real website
- **Instagram bio link** — one link that does everything
- **Google Maps listing** — website field points here
- **Word-of-mouth** — shareable link with OG image
- **Table reservations** — WhatsApp one-tap or form → Sheets

---

## 14. Security

| Concern | Mitigation |
|---------|------------|
| Form spam | Honeypot field + rate check in Apps Script |
| Endpoint abuse | Apps Script access limited to "Anyone"; monitor Sheet |
| PII in Sheets | Restrict Sheet sharing to owner + team |
| Env var leakage | Only PUBLIC_* vars exposed to client |
| HTTPS | Enforced by Vercel/Netlify |
| WhatsApp number exposure | Public by design (business number) |

**Production checklist:**

- [ ] Do not commit .env (only .env.example)
- [ ] Restrict Google Sheet sharing to necessary accounts
- [ ] Enable Apps Script execution log review
- [ ] Add honeypot field to reduce bot submissions
- [ ] Verify WhatsApp number is correct before deploy

---

## 15. Troubleshooting

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

### 15.1 Debug Commands

```bash
# Local dev
npm run dev

# Build and preview
npm run build && npm run preview

# Test Apps Script endpoint
curl -X POST "$PUBLIC_APPS_SCRIPT_URL" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","whatsapp":"08123456789","people":2,"date":"2026-11-20","time":"19:00","source":"landing-page"}'
```

---

## 16. Future Enhancements

| Enhancement | Description | Complexity |
|-------------|-------------|------------|
| Online ordering | GoFood/GrabFood deep link integration | Low |
| Instagram feed | Embed latest 6 posts via API | Medium |
| Multi-language | ID + EN toggle | Medium |
| Loyalty program | QR code + stamp card | Medium |
| Event booking | Private event reservation form | Medium |
| Analytics dashboard | Looker Studio over Sheets | Low |
| Dark mode | Warm dark palette | Low |
| PWA offline | Cache menu + hours | Medium |
| Menu filter | Filter by category (Coffee/Non-Coffee/Main/Pastry) | Low |
| Menu search | Search bar for menu items | Low |

---

## 17. Quick Links

| Resource | URL |
|----------|-----|
| Live Demo | (fill in after deploy) |
| Source Repo | (fill in) |
| Astro Docs | https://docs.astro.build |
| Tailwind Docs | https://tailwindcss.com/docs |
| Apps Script Docs | https://developers.google.com/apps-script |
| WhatsApp Click-to-Chat | https://faq.whatsapp.com/5913398998672934 |
| Lighthouse | https://developer.chrome.com/docs/lighthouse |
| Schema.org CafeOrCoffeeShop | https://schema.org/CafeOrCoffeeShop |

---

## 18. Appendix A: Screenshots Documentation

| No | Filename | Description | Status |
|----|----------|-------------|--------|
| 1 | 01-lighthouse.png | 100/100 across all Lighthouse categories | PENDING |
| 2 | 02-hero.png | Hero section with coffee photo and WhatsApp CTA | PENDING |
| 3 | 03-menu-coffee.png | Coffee category menu (4 items) | PENDING |
| 4 | 04-menu-main.png | Main Course category menu (4 items) | PENDING |
| 5 | 05-gallery.png | Interior and coffee gallery | PENDING |
| 6 | 06-form.png | Reservation form default state | PENDING |
| 7 | 07-form-success.png | Form after successful submission | PENDING |
| 8 | 08-google-sheet.png | Reservation rows in Google Sheets | PENDING |
| 9 | 09-mobile.png | Mobile view at 375 px | PENDING |
| 10 | 10-desktop.png | Desktop view at 1440 px | PENDING |
| 11 | 00-preview-video.mp4 | 10–15s scroll recording | PENDING |

**Summary:** 0/11 complete — all pending until build is deployed.

---

## 19. Appendix B: Verification Summary

### 19.1 Phase 1: Setup

| No | Task | Status |
|----|------|--------|
| 1.1 | Astro project initialized | PENDING |
| 1.2 | Tailwind integrated | PENDING |
| 1.3 | Project structure created (setup_project.py) | PENDING |
| 1.4 | .env.example created | PENDING |
| 1.5 | Google Sheet created with Reservations tab | PENDING |
| 1.6 | Apps Script deployed as Web App | PENDING |
| 1.7 | WhatsApp number verified | PENDING |

### 19.2 Phase 2: Build

| No | Task | Status |
|----|------|--------|
| 2.1 | BaseLayout with meta tags + font preload | PENDING |
| 2.2 | Navbar + Hero + SocialProof | PENDING |
| 2.3 | Features + Menu (4 categories) + HowItWorks | PENDING |
| 2.4 | Gallery + Location + FAQ | PENDING |
| 2.5 | ReservationForm with validation | PENDING |
| 2.6 | Footer with WhatsApp + Instagram | PENDING |
| 2.7 | StickyWhatsApp + BackToTop | PENDING |
| 2.8 | Responsive layout verified | PENDING |
| 2.9 | WhatsApp deep link tested | PENDING |
| 2.10 | Form POST tested end-to-end | PENDING |

### 19.3 Phase 3: Quality

| No | Task | Status |
|----|------|--------|
| 3.1 | Lighthouse 100/100 all categories | PENDING |
| 3.2 | Accessibility checklist passed | PENDING |
| 3.3 | Mobile view verified (375 px) | PENDING |
| 3.4 | Desktop view verified (1440 px) | PENDING |
| 3.5 | SEO meta + OG image verified | PENDING |
| 3.6 | LocalBusiness JSON-LD validated | PENDING |
| 3.7 | Floating elements tested (navbar, sticky WA, back-to-top) | PENDING |

### 19.4 Phase 4: Deployment

| No | Task | Status |
|----|------|--------|
| 4.1 | Deployed to Vercel/Netlify | PENDING |
| 4.2 | Custom domain configured (arkcoffee.id) | PENDING |
| 4.3 | Live WhatsApp button tested | PENDING |
| 4.4 | Live form submission tested | PENDING |
| 4.5 | Reservations appear in Google Sheet | PENDING |
| 4.6 | Owner notification email received | PENDING |
| 4.7 | Screenshots captured | PENDING |
| 4.8 | Preview video recorded | PENDING |
| 4.9 | README updated with live URL | PENDING |

### 19.5 Overall Summary

| Phase | Total | Passed | Pending | Progress |
|-------|-------|--------|---------|----------|
| Phase 1: Setup | 7 | 0 | 7 | 0% |
| Phase 2: Build | 10 | 0 | 10 | 0% |
| Phase 3: Quality | 7 | 0 | 7 | 0% |
| Phase 4: Deployment | 9 | 0 | 9 | 0% |
| **TOTAL** | **33** | **0** | **33** | **0%** |

---

## 20. Appendix C: Full Menu — Ark Coffee & Eatery

### 20.1 Coffee (4 items)

| Item | Price | Description | Best Seller |
|------|-------|-------------|-------------|
| Espresso | Rp 18,000 | Single origin Gayo, bold and clean | — |
| Americano | Rp 22,000 | Espresso with hot water, light and refreshing | — |
| Latte | Rp 28,000 | Espresso with steamed milk, smooth | ⭐ |
| Palm Sugar Milk Coffee | Rp 25,000 | Our signature. Perfectly sweet, aromatic palm sugar | ⭐ |

### 20.2 Non-Coffee (3 items)

| Item | Price | Description | Best Seller |
|------|-------|-------------|-------------|
| Matcha Latte | Rp 30,000 | Japanese matcha with fresh milk | — |
| Chocolate | Rp 26,000 | Belgian chocolate, creamy and warm | — |
| Lemon Tea | Rp 20,000 | Black tea with fresh lemon, served iced | — |

### 20.3 Main Course (4 items)

| Item | Price | Description | Best Seller |
|------|-------|-------------|-------------|
| Ark Fried Rice | Rp 35,000 | Special fried rice with egg, chicken, and crackers | ⭐ |
| Chicken Sandwich | Rp 32,000 | Grilled chicken, lettuce, tomato, special sauce | — |
| Beef Burger | Rp 45,000 | 150g beef patty, cheese, lettuce, fries | — |
| Pasta Aglio Olio | Rp 38,000 | Spaghetti with garlic, chili, and olive oil | — |

### 20.4 Pastry (3 items)

| Item | Price | Description | Best Seller |
|------|-------|-------------|-------------|
| Croissant | Rp 20,000 | Butter croissant, baked fresh every morning | — |
| Cinnamon Roll | Rp 22,000 | Cinnamon roll with cream cheese glaze | — |
| Banana Bread | Rp 18,000 | Soft banana bread with walnuts | — |

**Total menu items: 14** (4 Coffee + 3 Non-Coffee + 4 Main Course + 3 Pastry).

---

**Last Updated:** 2026-11-17
**Document Version:** 1.0.0
**Status:** Production Ready
**Owner:** Ark Coffee & Eatery

---

## V2 normative amendments — architecture and requirements

### Scope, authority, and status
- The site is a **single-page static marketing website** for Ark Coffee & Eatery. Retain the 11-section order, four menu categories / 14 items, six gallery images, English UI, WhatsApp-first conversion, and reservation form. These counts are v1 design requirements, not independently verified real-world business facts.
- The `case-study.md` frontmatter and portfolio screenshot/video deliverables are **optional portfolio artifacts**, not prerequisites to launch the café site.
- Source precedence: `docs/README.md` > V2 normative amendments in each document > legacy V1 detail. If still contradictory, record a decision in `architecture-decisions.md` and stop the affected implementation.
- Release state: `SPECIFICATION_READY` until code and assets exist; `STAGING_VERIFIED` only with recorded evidence; `PRODUCTION_VERIFIED` only after production smoke tests.

### Traceable acceptance contracts
| ID | Requirement | Acceptance evidence | Priority |
|---|---|---|---|
| ARK-F01 | All 11 sections render in specified order | DOM / screenshots at 375, 768, 1440 px | P0 |
| ARK-F02 | Menu contains four categories and 14 approved items | Data assertion + content approval | P0 |
| ARK-F03 | Gallery contains six meaningful, licensed images | Asset manifest + visual review | P0 |
| ARK-F04 | Every WhatsApp CTA uses owner-approved number and encoded context | Link assertions + mobile tap | P0 |
| ARK-F05 | Reservation form validates client and server data | Positive/negative integration tests | P0 |
| ARK-F06 | Successful form submission creates exactly one Sheet row | Correlation ID + Sheet evidence | P0 |
| ARK-F07 | Duplicate submission is blocked or idempotently handled | Repeat-submit test | P0 |
| ARK-F08 | Failed submission never shows a success claim | Network-failure test | P0 |
| ARK-F09 | Address, hours, map, and contact data are owner approved | Content sign-off | P0 |
| ARK-F10 | Analytics events use documented schema without PII | DebugView/network inspection | P1 |
| ARK-N01 | Keyboard, focus, contrast, and reduced-motion behavior work | Accessibility audit | P0 |
| ARK-N02 | SEO metadata and structured data reflect approved facts | HTML and rich-results inspection | P1 |
| ARK-N03 | Build, lint/type checks, and smoke tests pass | CI artifacts | P0 |

### Canonical content and configuration
- Create `src/data/site.ts` (business name, verified address, hours, social links, WhatsApp number) and `src/data/menu.ts` (all 14 approved items); components import these rather than duplicating literals.
- **Unverified:** `arkcoffee.id`, `0812-3456-7890`, `owner@arkcoffee.id`, address, Instagram, 4.9 rating, 2,000+ customers, prices, opening hours, facilities, and response time promises. Treat as placeholders requiring written owner approval. Never present them as proven facts or ship placeholder contact links.
- Testimonials, ratings, and claims must be omitted or replaced with factual neutral content until proof exists; do not fabricate them to satisfy section counts.
- If owner cannot confirm a required fact, release is blocked for affected conversion/contact features; other sections may be staged.

### Reservation architecture (supersedes direct browser JSON POST)
**Preferred v2 implementation:** Browser -> same-origin serverless endpoint `/api/reservations` (on chosen hosting platform) -> validated request -> Google Apps Script endpoint or approved storage service -> Google Sheets -> notification.
- A purely static deployment cannot itself host a same-origin serverless endpoint. If choosing this architecture, configure an actual Vercel Function / Netlify Function; Astro may still produce static pages.
- The serverless function owns secrets and validation, rate limits, spam checks, request-size limits, and returns controlled JSON with explicit status codes. No secret belongs in `PUBLIC_*`.
- Browser uses JSON `POST` to the **same-origin** API route, not directly to Apps Script. Do not assume Google Apps Script provides standard CORS support for JSON preflight.
- Backend validates name 2–80 chars; phone normalized and validated; people integer 1–20; local date not past in `Asia/Jakarta`; time within **approved booking slots** (opening hours alone do not establish last booking time); notes <=500 chars; reject malformed payloads.
- Use a server-generated request ID and a short-lived idempotency key; ensure duplicate submissions do not create duplicate rows. Lock writes if needed; store deduplication state appropriately.
- Reject spreadsheet formula-leading text (or prefix escaped literal) to prevent spreadsheet formula injection. Apply limits to all user-controlled fields.
- Notification failure must not silently negate a successfully saved row; record and alert. Success means **request received**, not confirmed reservation.
- If serverless infrastructure is disallowed, record an explicit architecture decision and implement a tested alternative. Do not pretend a browser-only JSON-to-Apps-Script design is verified.
- Privacy: restrict Sheets access, define retention/deletion ownership, avoid logging names or phone numbers, provide approved privacy notice, and test abuse scenarios.

### Non-functional release gates
- Accessibility: WCAG 2.2 AA-oriented manual + automated checks; 44x44 px touch target design goal; keyboard and screen-reader review required.
- Performance: aspirational Lighthouse 100s are **stretch targets, not unconditional launch blockers**. Record median of 3 mobile runs, Core Web Vitals and asset weights; establish an agreed budget based on real optimized images before launch.
- Responsive: test 320, 375, 768, 1024, 1440 px, zoom 200%, and narrow landscape; no horizontal scrolling.
- Security: no sensitive environment variables in browser bundles, no public Sheets, input validation, abuse protections, and dependency audit.
- Availability: contact via WhatsApp remains usable if the form API is unavailable.

### Explicit exclusions
No payment processing, live table inventory, automatic reservation confirmation, loyalty program, multi-language toggle, or order checkout in v2 unless separately approved.
