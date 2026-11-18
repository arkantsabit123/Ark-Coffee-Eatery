<!-- ARK DOCUMENTATION V2.0 — AUTHORITATIVE RULES BELOW TAKE PRECEDENCE OVER LEGACY V1 EXAMPLES -->
> **Version 2.0 | Status: Static-only preview implemented; production deployment pending. See `verification-checklist.md` for evidence.**
> **Implementation update:** Current architecture is static-only with WhatsApp-first reservations. No live reservation backend or production domain is active. Production address and Maps URL are maintained in `src/data/site.ts`.
> **Important:** The original v1 content is retained for detailed historical requirements. Any conflicting v1 commands, example code, numerical targets, business claims, or deployment statements are superseded by the **V2 normative amendments** at the end of this file, and by `docs/README.md`. Do not copy legacy Apps Script browser `fetch()` examples into production. `Production Ready` references in the retained historical sections do not describe the actual release state.
> **Source:** User-provided v1 file `Deployment Guide.md`. New v2 requirements are proposed engineering improvements, not verified facts about the business.

# Deployment Guide v2.0.0 — Ark Coffee & Eatery

**Step-by-step deployment guide for the Ark Coffee & Eatery website.** This document walks through everything from local setup to a live site: Google Apps Script backend, Vercel/Netlify hosting, custom domain, and post-deploy verification.

---

## Document Information

| Property | Value |
|----------|-------|
| Version | 1.0.0 |
| Last Updated | 2026-11-17 |
| Status | Static release live on GitHub Pages; custom-domain/post-deploy QA pending |
| Owner | Ark Coffee & Eatery |
| Companion Docs | `blueprint.md`, `design-system.md`, `content-guide.md`, `cheatsheets.md` |

---

## Table of Contents

1. Prerequisites
2. Phase 1: Google Apps Script Backend
3. Phase 2: Google Sheet Setup
4. Phase 3: Local Build & Verification
5. Phase 4: Deploy to Vercel
6. Phase 5: Deploy to Netlify
7. Phase 6: Custom Domain
8. Phase 7: Post-Deploy Verification
9. Phase 8: Screenshots & Portfolio Artifacts
10. Rollback & Troubleshooting
11. Deployment Checklist

---

## 1. Prerequisites

Before starting deployment, ensure you have:

| Requirement | Detail |
|-------------|--------|
| **Node.js 20+** | Check with `node --version` (should be v20.x or higher) |
| **npm** | Comes with Node.js |
| **Git** | Check with `git --version` |
| **GitHub account** | For repo hosting (required for Vercel/Netlify Git deploys) |
| **Google account** | For Google Sheets + Apps Script |
| **Vercel or Netlify account** | Free tier is sufficient |
| **WhatsApp Business number** | Active number for reservations |
| **Domain name** (optional) | e.g., `arkcoffee.id` |

### 1.1 Verify Local Environment

```bash
node --version    # should be v20.x or higher
npm --version     # should be 10.x or higher
git --version     # should be 2.x or higher
```

---

## 2. Phase 1: Google Apps Script Backend

The Apps Script backend receives form submissions, appends rows to a Google Sheet, and sends email notifications to the owner.

### 2.1 Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it: **Ark Coffee & Eatery — Reservations**
4. Rename the default sheet tab to: **Reservations**
5. Add headers in row 1:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| timestamp | name | whatsapp | party_size | date | time | notes | source |

6. Save the sheet URL — you'll need it later.

### 2.2 Open Apps Script

1. In the Google Sheet, go to **Extensions → Apps Script**
2. A new Apps Script project opens
3. Rename the project: **Ark Coffee Reservations**

### 2.3 Paste the Backend Code

Replace the default `Code.gs` content with:

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

    // Email notification to owner
    MailApp.sendEmail({
      to: 'owner@arkcoffee.id',  // ← change to real owner email
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

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

**Change `owner@arkcoffee.id` to the real owner email.**

### 2.4 Set Up the Manifest

1. Click the gear icon (Project Settings) in the left sidebar
2. Check **"Show `appsscript.json` manifest file in editor"**
3. Go back to the editor, open `appsscript.json`
4. Replace with:

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

5. Save (Ctrl/Cmd + S)

### 2.5 Deploy as Web App

1. Click **Deploy → New deployment**
2. Click the gear icon → **Web app**
3. Configure:
   - **Description:** `Ark Coffee Reservations v1`
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`
4. Click **Deploy**
5. **Authorize** the app (Google will ask for permissions — click "Allow")
6. **Copy the Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfyc.../exec
   ```
7. Save this URL — you'll need it for `.env`

### 2.6 Test the Endpoint

Before wiring the form, test the endpoint with `curl`:

```bash
curl -X POST "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","whatsapp":"08123456789","people":2,"date":"2026-11-20","time":"19:00","notes":"Window seat","source":"test"}'
```

**Expected response:**
```json
{"status":"ok"}
```

**Verify:**
- A new row appears in the Google Sheet
- An email arrives at the owner address
- Apps Script execution log shows no errors (Extensions → Apps Script → Executions)

**If it fails:** See Section 10 (Troubleshooting).

### 2.7 Redeployment (When You Change Code)

If you update `Code.gs` later:

1. **Deploy → Manage deployments**
2. Click the pencil icon on the active deployment
3. **Version:** New version
4. Click **Deploy**

> ⚠️ The Web App URL stays the same across redeployments. You only need to update `.env` if the URL changes (which it shouldn't).

---

## 3. Phase 2: Google Sheet Setup

### 3.1 Verify Sheet Structure

Your sheet should have:

| Column | Header | Example |
|--------|--------|---------|
| A | timestamp | 2026-11-17 19:30:00 |
| B | name | Rina |
| C | whatsapp | 08123456789 |
| D | party_size | 2 |
| E | date | 2026-11-20 |
| F | time | 19:00 |
| G | notes | Window seat if possible |
| H | source | landing-page |

### 3.2 Share the Sheet (Restricted)

1. Click **Share** (top right)
2. **General access:** Restricted (only people you add)
3. Add the owner's Google account as **Editor**
4. Do **not** set to "Anyone with the link" — this is PII

### 3.3 Optional: Set Up Notifications

1. **Tools → Notification settings**
2. Set "Notify me when:" → **Any changes are made**
3. Set "Notification delivery:" → **Email — right away**

This gives the owner a second notification channel (in addition to the Apps Script email).

---

## 4. Phase 3: Local Build & Verification

### 4.1 Install Dependencies

```bash
cd ark-coffee-eatery
npm install
```

This installs Astro, Tailwind, Lucide, and TypeScript.

### 4.2 Create `.env`

```bash
cp .env.example .env
```

Edit `.env`:

```env
PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
PUBLIC_WHATSAPP_NUMBER=6281234567890
PUBLIC_GA_ID=G-XXXXXXXXXX
```

| Variable | Value |
|----------|-------|
| `PUBLIC_APPS_SCRIPT_URL` | The Web App URL from Step 2.5 |
| `PUBLIC_WHATSAPP_NUMBER` | WhatsApp number in international format (62xxx, no `+`, no spaces) |
| `PUBLIC_GA_ID` | GA4 measurement ID (optional — leave empty if not using) |

> ⚠️ Never commit `.env` to Git. Only `.env.example` is committed.

### 4.3 Add Assets

Before building, ensure all visual assets are in place:

**Required (P0):**
- `public/fonts/display.woff2` — display font
- `public/images/hero-coffee.webp` — hero image (desktop)
- `public/images/hero-interior.webp` — hero image (mobile)
- `public/images/og-image.png` — social share image (1200×630)
- `public/favicon.svg` — favicon
- `public/images/menu/*/*.webp` — 14 menu photos
- `public/images/gallery/*.webp` — 6 gallery photos

**Recommended (P1):**
- `public/images/avatars/*.webp` — 3 testimonial avatars
- `public/images/features/*.svg` — 4 feature icons
- `public/images/patterns/texture-warm.svg` — pattern
- `public/favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`

If assets are missing, the build still works but images will be broken. See `docs/blueprint.md` Section 20 for the full asset list.

### 4.4 Run Local Dev Server

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

**Verify:**
- Hero image renders
- Menu displays 4 categories, 14 items
- Gallery displays 6 photos
- Form submits successfully (test with real data → check Google Sheet)
- WhatsApp button opens WhatsApp with pre-filled message
- Sticky WhatsApp button visible on mobile (resize to 375 px)
- Back-to-top button appears after scrolling 600 px (desktop)

### 4.5 Type Check

```bash
npm run check
```

**Expected:** No TypeScript errors.

### 4.6 Production Build

```bash
npm run build
```

**Expected output:**
```
✓ Completed in X.XXs
```

Build output goes to `dist/`. Check that:
- `dist/index.html` exists
- `dist/_astro/*.css` exists
- `dist/images/*` exists
- File sizes are reasonable (total < 600 KB)

### 4.7 Preview Production Build

```bash
npm run preview
```

Open [http://localhost:4321](http://localhost:4321) — this serves the production build locally.

**Run Lighthouse:**
1. Open Chrome DevTools (F12)
2. Go to **Lighthouse** tab
3. Select **Mobile**, check all categories
4. Click **Analyze page load**

**Target:** 100 / 100 / 100 / 100

If any category is below 100, see Section 10 (Troubleshooting).

### 4.8 Test Form End-to-End

1. Fill in the reservation form
2. Click **Send reservation**
3. **Expected:** Success message appears: "Reservation received! We will confirm via WhatsApp within 1 hour."
4. Open Google Sheet — a new row should appear
5. Check owner email — a notification should arrive

**If it fails:** Check browser console for errors, check Apps Script execution log.

### 4.9 Test WhatsApp Deep Link

1. Click any "Order via WhatsApp" button
2. **Expected:** WhatsApp opens (web or app) with pre-filled message: "Hello Ark Coffee & Eatery, I would like to order/reserve."
3. Verify the number is correct (62xxx format)

**If it fails:** Check `.env` `PUBLIC_WHATSAPP_NUMBER` format (no `+`, no spaces).

---

## 5. Phase 4: Deploy to Vercel

### 5.1 Push to GitHub

```bash
git init
git add .
git commit -m "feat: initial Ark Coffee & Eatery website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ark-coffee-eatery.git
git push -u origin main
```

**Before pushing, verify `.gitignore` includes:**
```
node_modules/
dist/
.astro/
.env
.env.*
!.env.example
```

### 5.2 Import to Vercel

1. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
2. Click **Add New → Project**
3. Select your `ark-coffee-eatery` repo
4. Vercel auto-detects Astro. Verify:
   - **Framework Preset:** Astro
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

### 5.3 Add Environment Variables

In the **Environment Variables** section, add:

| Name | Value |
|------|-------|
| `PUBLIC_APPS_SCRIPT_URL` | Your Apps Script Web App URL |
| `PUBLIC_WHATSAPP_NUMBER` | `6281234567890` |
| `PUBLIC_GA_ID` | Your GA4 ID (or leave empty) |

Select **Production**, **Preview**, and **Development** for each.

### 5.4 Deploy

Click **Deploy**. Wait ~1–2 minutes.

**Expected:** Build succeeds, deployment URL appears (e.g., `ark-coffee-eatery.vercel.app`).

### 5.5 Verify Live Site

Open the deployment URL and run through:

- [ ] Hero image renders
- [ ] Menu displays 4 categories, 14 items
- [ ] Gallery displays 6 photos
- [ ] WhatsApp button opens WhatsApp
- [ ] Form submits → row appears in Google Sheet
- [ ] Sticky WhatsApp visible on mobile
- [ ] Back-to-top appears on desktop scroll
- [ ] Lighthouse 100/100/100/100 on live URL

---

## 6. Phase 5: Deploy to Netlify

> Use this phase **only if you chose Netlify instead of Vercel**. Skip if you deployed to Vercel.

### 6.1 Push to GitHub

Same as Step 5.1.

### 6.2 Import to Netlify

1. Go to [netlify.com](https://netlify.com) → Sign in with GitHub
2. Click **Add new site → Import an existing project**
3. Select your `ark-coffee-eatery` repo
4. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Framework:** Astro (auto-detected)

### 6.3 Add Environment Variables

In **Site settings → Environment variables**, add:

| Name | Value |
|------|-------|
| `PUBLIC_APPS_SCRIPT_URL` | Your Apps Script Web App URL |
| `PUBLIC_WHATSAPP_NUMBER` | `6281234567890` |
| `PUBLIC_GA_ID` | Your GA4 ID (or leave empty) |

### 6.4 Deploy

Click **Deploy site**. Wait ~1–2 minutes.

**Expected:** Build succeeds, deployment URL appears (e.g., `ark-coffee-eatery.netlify.app`).

### 6.5 Verify Live Site

Same checklist as Step 5.5.

---

## 7. Phase 6: Custom Domain

> Optional but recommended for a professional brand. Skip if using the default Vercel/Netlify URL.

### 7.1 Buy a Domain

Recommended registrars:
- [Namecheap](https://namecheap.com) — ~$10–15/year
- [Cloudflare Registrar](https://cloudflare.com/products/registrar/) — at-cost pricing
- [Niagahoster](https://niagahoster.co.id) — for `.id` domains (~Rp 150,000/year)

**Suggested domain:** `arkcoffee.id` or `arkcoffeeeatery.com`

### 7.2 Add Domain in Vercel

1. Go to your Vercel project → **Settings → Domains**
2. Add `arkcoffee.id`
3. Vercel provides DNS records:
   - **A record:** `76.76.21.21`
   - **CNAME:** `cname.vercel-dns.com`
4. Go to your domain registrar → DNS settings
5. Add the records Vercel provided
6. Wait for propagation (5–30 minutes)
7. Vercel automatically provisions SSL (HTTPS)

### 7.3 Add Domain in Netlify

1. Go to **Site settings → Domain management → Add custom domain**
2. Enter `arkcoffee.id`
3. Netlify provides DNS records:
   - **A record:** `75.2.60.5`
   - **CNAME:** `your-site.netlify.app`
4. Go to your domain registrar → DNS settings
5. Add the records Netlify provided
6. Wait for propagation (5–30 minutes)
7. Netlify automatically provisions SSL (HTTPS)

### 7.4 Update Site Configuration

After the domain is live, update:

**`astro.config.mjs`:**
```js
site: 'https://arkcoffee.id',
```

**`public/robots.txt`:**
```
Sitemap: https://arkcoffee.id/sitemap.xml
```

**`public/sitemap.xml`:**
```xml
<loc>https://arkcoffee.id/</loc>
```

**`src/layouts/BaseLayout.astro`:**
```astro
<meta property="og:url" content="https://arkcoffee.id" />
```

**`LocalBusiness JSON-LD`** (in BaseLayout or a separate component):
```json
"url": "https://arkcoffee.id",
"image": "https://arkcoffee.id/images/hero-coffee.webp"
```

Commit and push — Vercel/Netlify will redeploy automatically.

---

## 8. Phase 7: Post-Deploy Verification

Run through this checklist on the **live URL** (with custom domain if configured).

### 8.1 Functional Verification

- [ ] Hero image loads (desktop + mobile)
- [ ] Menu displays 4 categories with 14 items total
- [ ] Menu photos load (no broken images)
- [ ] Best-seller badges appear on 4 items (2 per category)
- [ ] Gallery displays 6 photos
- [ ] Location map embeds and loads
- [ ] Hours table displays correctly
- [ ] FAQ accordion opens/closes
- [ ] Reservation form submits successfully
- [ ] Success message appears after submit
- [ ] New row appears in Google Sheet
- [ ] Owner receives email notification
- [ ] WhatsApp button opens WhatsApp with pre-filled message
- [ ] Sticky WhatsApp visible on mobile
- [ ] Back-to-top appears after 600 px scroll (desktop)
- [ ] Navbar sticky, backdrop-blur works
- [ ] Navbar shadow appears after scroll
- [ ] Hamburger menu works on mobile
- [ ] Anchor links scroll smoothly to sections

### 8.2 Performance Verification

- [ ] Lighthouse Performance: 100
- [ ] Lighthouse Accessibility: 100
- [ ] Lighthouse Best Practices: 100
- [ ] Lighthouse SEO: 100
- [ ] Total page weight < 600 KB
- [ ] Time to Interactive < 1.5 s
- [ ] No console errors
- [ ] No layout shift (CLS = 0)

### 8.3 SEO Verification

- [ ] `<title>` displays correctly in browser tab
- [ ] Meta description appears in page source
- [ ] OG image renders when sharing on WhatsApp/Twitter/LinkedIn
- [ ] `robots.txt` accessible at `/robots.txt`
- [ ] `sitemap.xml` accessible at `/sitemap.xml`
- [ ] LocalBusiness JSON-LD valid (test with [Rich Results Test](https://search.google.com/test/rich-results))
- [ ] Canonical URL correct

### 8.4 Accessibility Verification

- [ ] All form inputs have visible labels
- [ ] Focus states visible on all interactive elements
- [ ] Color contrast ≥ 4.5:1 (test with [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/))
- [ ] Skip link works (Tab on page load → "Skip to content" appears)
- [ ] Screen reader announces form status (test with VoiceOver/NVDA)
- [ ] `prefers-reduced-motion` respected (test in OS settings)

### 8.5 Responsive Verification

- [ ] 375 × 667 (iPhone SE): no horizontal scroll, readable, sticky WA visible
- [ ] 768 × 1024 (iPad): feature grid 2-col, menu 2-col, back-to-top appears
- [ ] 1440 × 900 (desktop): max-width container, menu 3-col, gallery masonry

---

## 9. Phase 8: Screenshots & Portfolio Artifacts

Capture these for documentation and portfolio use. All go in `screenshots/`.

### 9.1 Lighthouse Screenshot

1. Open live URL in Chrome
2. DevTools → Lighthouse → Analyze
3. Screenshot the 4 green circles
4. Save as `screenshots/01-lighthouse.png`

### 9.2 Section Screenshots

Use Chrome DevTools device toolbar (desktop 1440×900):

| File | How to capture |
|------|----------------|
| `02-hero.png` | Screenshot viewport at top |
| `03-menu-coffee.png` | Scroll to Coffee category, screenshot |
| `04-menu-main.png` | Scroll to Main Course category, screenshot |
| `05-gallery.png` | Scroll to Gallery, screenshot |
| `06-form.png` | Scroll to form, screenshot default state |
| `07-form-success.png` | Submit form, screenshot success state |
| `08-google-sheet.png` | Open Google Sheet, screenshot 5–6 rows |
| `09-mobile.png` | DevTools → iPhone SE (375×667), screenshot hero |
| `10-desktop.png` | Full-page screenshot (Chrome extension "Full Page Screen Capture") |

### 9.3 Preview Video

1. Open live URL in Chrome (1440×900)
2. Use OBS / Loom / QuickTime to record a 10–15 second scroll from top to bottom
3. Hide cursor during recording
4. Trim, compress (HandBrake), export as MP4 (H.264)
5. Save as `screenshots/00-preview-video.mp4` (< 2 MB)

### 9.4 Update README

Update `README.md` with:
- Live URL
- Lighthouse screenshot (markdown image)
- Preview video link
- Tech stack table
- Project structure

---

## 10. Rollback & Troubleshooting

### 10.1 Rollback (Vercel)

1. Go to project → **Deployments**
2. Find the last working deployment
3. Click **⋯ → Promote to Production**

### 10.2 Rollback (Netlify)

1. Go to **Deploys**
2. Find the last working deploy
3. Click **⋯ → Publish deploy**

### 10.3 Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| **Form returns CORS error** | Apps Script not deployed as "Anyone" | Redeploy: Deploy → Manage deployments → edit → Who has access: Anyone |
| **401/403 on form POST** | Deployment permissions changed | Redeploy Apps Script (new version) |
| **Reservations not appearing** | Sheet name mismatch | Verify sheet tab is named exactly "Reservations" (case-sensitive) |
| **Owner email not received** | `MailApp.sendEmail` failed | Check Apps Script execution log; verify email address; check spam |
| **WhatsApp link doesn't open** | Number format wrong | Verify `PUBLIC_WHATSAPP_NUMBER` is `62xxx` (no `+`, no spaces, no dashes) |
| **Sticky WhatsApp not showing on mobile** | CSS class missing | Verify `md:hidden` on the sticky button |
| **Back-to-top not appearing** | Scroll listener not attached | Check `back-to-top.ts` loaded; verify scroll > 600 px |
| **Lighthouse < 100** | Image sizes, unused JS, font preload | Check image dimensions; verify font preload; remove unused imports |
| **Mobile layout broken** | Tailwind breakpoints wrong | Verify `md:` and `lg:` classes; test at 375 px |
| **Env var undefined** | Not prefixed with `PUBLIC_` | Rename to `PUBLIC_*`; restart dev server; redeploy |
| **Map embed not loading** | iframe `src` wrong | Check Google Maps embed URL; verify `loading="lazy"` |
| **OG image not showing on share** | Image too large or wrong dimensions | Verify 1200×630, < 300 KB, PNG format |
| **Font not loading** | Wrong path or preload missing | Verify `/fonts/display.woff2` exists; check `<link rel="preload">` |
| **Build fails on Vercel/Netlify** | Missing dependency | Verify `package.json` includes all deps; run `npm install` locally |
| **Domain not propagating** | DNS not updated | Wait 30 min–24 hours; check DNS records with `dig` |

### 10.4 Debug Commands

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Run type check
npm run check

# Build locally
npm run build

# Preview production build
npm run preview

# Test Apps Script endpoint
curl -X POST "$PUBLIC_APPS_SCRIPT_URL" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","whatsapp":"08123456789","people":2,"date":"2026-11-20","time":"19:00","source":"test"}'

# Check DNS propagation
dig arkcoffee.id
nslookup arkcoffee.id

# Check SSL
curl -I https://arkcoffee.id
```

---

## 11. Deployment Checklist

A condensed checklist covering all phases.

### Phase 1: Google Apps Script Backend
```
[ ] Google Sheet created with "Reservations" tab
[ ] Headers added (timestamp, name, whatsapp, party_size, date, time, notes, source)
[ ] Apps Script project created
[ ] Code.gs pasted (with real owner email)
[ ] appsscript.json updated (ANYONE_ANONYMOUS)
[ ] Web App deployed as "Anyone"
[ ] Endpoint tested with curl — returns {"status":"ok"}
[ ] Row appears in Google Sheet after test
[ ] Email notification received by owner
```

### Phase 2: Google Sheet Setup
```
[ ] Sheet structure verified
[ ] Sharing restricted to owner + team (not "Anyone with link")
[ ] Optional: notification settings configured
```

### Phase 3: Local Build & Verification
```
[ ] npm install succeeds
[ ] .env created with PUBLIC_APPS_SCRIPT_URL, PUBLIC_WHATSAPP_NUMBER, PUBLIC_GA_ID
[ ] All visual assets in place (P0: hero, menu, gallery, OG, favicon)
[ ] npm run dev works — page renders correctly
[ ] npm run check passes (no TS errors)
[ ] npm run build succeeds
[ ] npm run preview works
[ ] Lighthouse 100/100/100/100 on local preview
[ ] Form submission tested end-to-end (row in Sheet, email received)
[ ] WhatsApp deep link tested (opens WhatsApp with pre-filled message)
```

### Phase 4: Deploy to Vercel (or Phase 5: Netlify)
```
[ ] Repo pushed to GitHub
[ ] Project imported to Vercel/Netlify
[ ] Environment variables added (all 3)
[ ] Deploy succeeds
[ ] Live URL accessible
[ ] All functional checks pass (Section 8.1)
[ ] Lighthouse 100/100/100/100 on live URL
[ ] Form submission works on live site
[ ] WhatsApp button works on live site
```

### Phase 6: Custom Domain (optional)
```
[ ] Domain purchased
[ ] DNS records added at registrar
[ ] SSL provisioned (HTTPS)
[ ] astro.config.mjs site updated
[ ] robots.txt sitemap URL updated
[ ] sitemap.xml updated
[ ] BaseLayout canonical URL updated
[ ] JSON-LD url updated
[ ] Redeployed with new config
[ ] Custom domain live
```

### Phase 7: Post-Deploy Verification
```
[ ] All functional checks pass (Section 8.1)
[ ] All performance checks pass (Section 8.2)
[ ] All SEO checks pass (Section 8.3)
[ ] All accessibility checks pass (Section 8.4)
[ ] All responsive checks pass (Section 8.5)
```

### Phase 8: Screenshots & Portfolio Artifacts
```
[ ] 01-lighthouse.png captured
[ ] 02-hero.png captured
[ ] 03-menu-coffee.png captured
[ ] 04-menu-main.png captured
[ ] 05-gallery.png captured
[ ] 06-form.png captured
[ ] 07-form-success.png captured
[ ] 08-google-sheet.png captured
[ ] 09-mobile.png captured
[ ] 10-desktop.png captured
[ ] 00-preview-video.mp4 recorded
[ ] README updated with live URL, screenshot, tech stack
```

---

## Deployment Summary

| Phase | Duration | Critical Path |
|-------|----------|---------------|
| Phase 1: Apps Script Backend | 15–20 min | ✅ Blocking |
| Phase 2: Google Sheet Setup | 5 min | ✅ Blocking |
| Phase 3: Local Build & Verification | 30–60 min | ✅ Blocking |
| Phase 4: Deploy to Vercel | 5–10 min | ✅ Blocking |
| Phase 5: Deploy to Netlify | 5–10 min | (Alternative to Phase 4) |
| Phase 6: Custom Domain | 30 min–24 hours (DNS) | ⚠️ Recommended |
| Phase 7: Post-Deploy Verification | 20–30 min | ✅ Blocking |
| Phase 8: Screenshots & Artifacts | 30–45 min | ⚠️ Recommended |

**Total: ~2–4 hours** (excluding DNS propagation wait).

---

**Last Updated:** 2026-11-17
**Document Version:** 1.0.0
**Status:** Production Ready
**Owner:** Ark Coffee & Eatery
**End of Documentation Set** — All 5 docs complete: `blueprint.md`, `design-system.md`, `content-guide.md`, `cheatsheets.md`, `deployment-guide.md`

---

## V2 normative amendments — executable deployment contract
### Chosen architecture
- **Current local implementation:** Astro `7.4.12`, Tailwind CSS `4.3.5`, and `@tailwindcss/vite` `4.3.5` are pinned for the static preview, with Node.js `>=22.23.4`; see ADR-005.
- **Selected host:** GitHub Pages project site at `https://arkantsabit123.github.io/Ark-Coffee-Eatery/`.
- **Deployment workflow:** `.github/workflows/deploy.yml` builds on pushes to `main`, uploads `dist/`, and deploys to GitHub Pages.
- Run locally with `npm install` and `npm run dev`. Run `npm run check`, `npm run build`, then `npm run test` before previewing with `npm run preview`.
- The reservation form is not a live form. It is WhatsApp-first and does not collect or transmit personal data. The approved WhatsApp number is implemented in `src/data/site.ts`; no website domain/canonical URL or analytics ID has been configured.
- Keep static Astro pages, but **choose Vercel Functions or Netlify Functions** for `/api/reservations` if using the preferred v2 same-origin API. Pure static CDN hosting cannot execute this route. Select **one** hosting provider for production and document the decision.
- Legacy instructions to post JSON directly from the browser to Apps Script are **deprecated**. CORS cannot be fixed simply by setting Apps Script to `Anyone`.
- Do not assume Astro 4.x / Tailwind 3.4 / Node 20 are currently supported; versions are **v1 compatibility constraints**. Verify package compatibility, security support, and lockfile in a real repository before choosing upgrades. If changed, update all docs and ADR.
### Environment contract
| Variable | Exposure | Purpose |
|---|---|---|
| `PUBLIC_WHATSAPP_NUMBER` | Public | Owner-approved business number |
| `PUBLIC_GA_ID` | Public | Approved GA4 measurement ID |
| `APPS_SCRIPT_URL` | Server only | Backend-to-backend destination |
| `RESERVATION_API_KEY` | Server only, if supported | Shared verification secret |
| `ALERT_EMAIL` | Server only | Operational alert recipient |
Never commit `.env`, secrets, or exported reservation sheets. `PUBLIC_APPS_SCRIPT_URL` is **legacy only** and must not be used by the browser in the preferred v2 architecture.
### Staging to production
1. Verify owner-approved business facts and license for all images/fonts.
2. Pin package versions and commit lockfile; run install, typecheck, build, automated tests, dependency audit.
3. Configure serverless function with backend secrets, request validation, abuse protection, and deduplication.
4. Verify test submission **from browser** on staging; inspect single Sheet row, correct timestamp/timezone, notification, and failure behavior.
5. Verify domain, HTTPS, canonical, robots/sitemap, structured data, privacy link, and GA4 without PII.
6. Run visual/accessibility tests on 320/375/768/1024/1440 px; capture screenshots and Lighthouse reports.
7. Complete `verification-checklist.md` with evidence, reviewer, build SHA, and explicit GO decision.
8. Deploy same tested commit; repeat production smoke tests; remove test reservations from business reporting safely.
### Rollback / incident
- Roll back to last known-good deployment if API writes fail, duplicates spike, secrets leak, or conversion is broken.
- If reservation API is down, disable only the form with truthful messaging; keep WhatsApp CTA working.
- Rotate compromised credentials; investigate logs without exposing PII; notify owner.
- Re-run critical smoke tests after rollback. Record incident ID, timeline, root cause, owner, corrective action.
### No false success
A `curl` success response alone is **not** sufficient proof of browser integration, Sheet storage, or notification. Confirm all three separately.
