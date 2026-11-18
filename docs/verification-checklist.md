<!-- ARK DOCUMENTATION V2.0 — AUTHORITATIVE RULES BELOW TAKE PRECEDENCE OVER LEGACY V1 EXAMPLES -->
> **Version 2.0 | Status: Specification and local implementation evidence; production NOT verified.**
> **Important:** The original v1 content is retained for detailed historical requirements. Any conflicting v1 commands, example code, numerical targets, business claims, or deployment statements are superseded by the **V2 normative amendments** at the end of this file, and by `docs/README.md`. Do not copy legacy Apps Script browser `fetch()` examples into production. `Production Ready` references in the retained historical sections do not describe the actual release state.
> **Source:** User-provided v1 file `verification-checklist.md`. New v2 requirements are proposed engineering improvements, not verified facts about the business.

# Verification Checklist v2.0.0 — Ark Coffee & Eatery

> **Purpose:** Acceptance-test the single-page Ark Coffee & Eatery website before and after launch. Derived from `Blueprint.md`, `Cheatsheet.md`, `Content Guide.md`, `Deployment Guide.md`, and `Design System.md` (all v1.0.0, 17 November 2026).
>
> **Status:** Local static implementation exists and selected checks have passed. Reservation, business-content, staging, and production requirements remain unverified or blocked.

## Verification record

| Field | Value |
|---|---|
| Project | Ark Coffee & Eatery |
| Release / commit | Initial implementation `07a844f`; documentation updates pending commit |
| QA owner | Not assigned |
| Date | 2026-11-18 |
| Local preview URL | `http://127.0.0.1:4321/` (local only) |
| Production URL | Not deployed |
| Hosting | GitHub Pages; repository Pages setting pending |
| Browser / device | Integrated browser; 320, 375, 768, 1024, 1440 px |
| Final decision | **CONDITIONAL GO — static frontend complete; live domain/canonical and host smoke remain pending** |

**Status key:** `[ ]` not tested / not passed; `[x]` passed. If a check fails or is blocked, leave it unchecked and register the result as **FAIL** or **BLOCKED** in the defect log. Mark an optional check **N/A** in the evidence log with a reason; do not mark it passed.

**Priorities:** **P0** = launch blocker; **P1** = should pass before launch; **P2** = optional / portfolio. Test on local production preview **and** deployed URL where relevant.

The legacy checkboxes below remain unchecked unless individually evidenced. The v2 evidence table records which local checks passed and which production checks are blocked.

## 1. Setup and environment — P0

- [x] Node.js 24.11.1 and npm 11.6.2 available; Astro requires Node.js >=22.23.4.
- [x] Astro 7.4.12, Tailwind CSS 4.3.5, and TypeScript 6.0.2 pinned; see ADR-005.
- [x] Application directories exist (`src/pages`, `src/layouts`, `src/components`, `src/scripts`, `src/styles`, `src/data`, `tests`).
- [x] `src/pages/index.astro` and `src/pages/404.astro` exist.
- [x] `astro.config.mjs` uses static output. A `site` URL is intentionally omitted pending domain approval.
- [x] No environment variables are required for the local preview. Do not add legacy browser `PUBLIC_APPS_SCRIPT_URL` configuration.
- [ ] Actual environment values are set in the selected host; no dummy production values remain.
- [x] `.env` is ignored by Git; no application credentials or reservation data are configured.
- [ ] Production WhatsApp number, café address, opening hours, domain, and owner email were verified with business owner.

**Evidence:** version output, repo tree, sanitized environment-variable names, configuration review.

## 2. Page structure and navigation — P0

Verify the page sequence against Blueprint §4:

- [ ] Navbar: logo, working section anchors, WhatsApp CTA.
- [ ] Hero: clear H1, supporting copy, photo, primary and secondary CTAs.
- [ ] Social proof: authentic, approved rating/customer count/testimonials; unverified claims hidden.
- [ ] Features: **4** distinct benefit cards.
- [ ] Signature menu: **4 categories and 14 items** (coffee 4, non-coffee 3, main course 4, pastry 3).
- [ ] How it works: three understandable steps.
- [ ] Gallery: **6** intentional photos.
- [ ] Location: correct address, opening-hours table, and working map embed.
- [ ] FAQ: questions and answers are visible and accordion toggles function.
- [ ] Reservation form: fields, submit button, and status/error region.
- [ ] Footer: real contact/Instagram/WhatsApp links and current copyright year.
- [ ] Mobile hamburger opens/closes; `aria-expanded` stays synchronized.
- [ ] Anchor links land at correct sections without sticky-navbar overlap.
- [ ] Sticky navbar and shadow/backdrop behavior work on scroll.
- [ ] Mobile sticky WhatsApp CTA remains visible without obscuring key content.
- [ ] Desktop back-to-top appears after ~600 px scroll and returns to page top.
- [ ] No broken links or dead-end controls; custom 404 page works.

**Evidence:** browser screenshots, click-through notes, console log.

## 3. Menu, content, and brand voice — P0

- [ ] All 14 items match the approved menu: names, category, description, price, and photo.
- [ ] Every price uses `Rp 28,000`-style notation (comma thousands separator, no decimals).
- [ ] Availability and prices have been confirmed by café owner; no made-up products or prices.
- [ ] Best-seller labels appear only on genuinely approved items; **limit requires reconciliation** (see Open Questions).
- [ ] Site language is English (`<html lang="en">`); Indonesian menu item names retain their proper names.
- [ ] Hero H1 is benefit-led, at most 10 words, and subheadline explains the actual offering.
- [ ] Primary CTA consistently says **“Order via WhatsApp”**; reservation CTA uses **“Reserve a table”** where appropriate.
- [ ] Warm, inviting, conversational voice; no hype/banned words and no salesy jargon.
- [ ] Sentence-case headings/labels and clear button/action labels.
- [ ] No `lorem ipsum`, `TBD`, `Coming soon`, demo personal data, or placeholder contact details on live site.
- [ ] FAQ claims, WiFi/power-outlet claims, business hours, and location details reflect reality.
- [ ] Ratings/testimonials have a real source and permission; otherwise remove them rather than inventing proof.
- [ ] Content images have appropriate descriptive alt text; decorative images use empty alt text.
- [ ] Meta description is **120–160 characters** and content is proofread.

**Evidence:** content audit against Content Guide §§3–11 and Blueprint Appendix C; owner signoff.

## 4. Design-system compliance — P1

- [ ] Background follows cream `#FDF8F3`; brand brown `#4A2C2A`; accent amber `#D97706`.
- [ ] WhatsApp CTA uses semantic green `#25D366`, with accessible hover/focus treatment.
- [ ] Typography uses system body stack and one display font (`display.woff2`, `font-display: swap`).
- [ ] Container is capped at **1200 px** with consistent Tailwind spacing and section rhythm.
- [ ] Cards/buttons/forms use system-approved borders, radii, shadows, and tokens; no unexplained one-off styles.
- [ ] Actual café and food photography feels warm, realistic, and visually consistent.
- [ ] Images are WebP where specified and do not crop critical subjects.
- [ ] No auto-rotating carousels or distracting motion.
- [ ] Hover, focus, disabled, loading, success, and error states look consistent.
- [ ] Mobile tap targets are at least **44 × 44 px** and default body text remains legible.

**Evidence:** visual comparison at mobile/tablet/desktop, computed styles, design-system review.

## 5. Reservation form and Google Apps Script — P0

### Client validation
- [ ] Name, WhatsApp, party size, date, and time have visible labels and required validation as specified.
- [ ] Invalid/blank inputs cannot submit; errors are specific and understandable.
- [ ] Reject invalid phone format, nonsensical party sizes, and past booking dates as appropriate to the implemented rules.
- [ ] Optional notes field works without being mandatory.
- [ ] Submit button exposes loading state and discourages duplicate requests.
- [ ] Network failure, timeout, non-OK response, and unexpected JSON show an actionable error with WhatsApp fallback.
- [ ] Success state only appears after confirmed backend success and sets realistic confirmation expectations.
- [ ] Status change is announced via accessible live region.

### End-to-end backend
- [ ] Google Sheet is named **Ark Coffee & Eatery — Reservations**, with tab exactly **`Reservations`**.
- [ ] Header order is exactly `timestamp, name, whatsapp, party_size, date, time, notes, source`.
- [ ] Apps Script Web App deployment runs with authorized owner account and expected access permissions.
- [ ] Published `PUBLIC_APPS_SCRIPT_URL` resolves to the active `/exec` deployment.
- [ ] Test POST reaches endpoint successfully in a browser-equivalent context; confirm redirects/CORS/preflight behavior, not just `curl` success.
- [ ] **One** valid submission produces exactly **one** correct row with timestamp and source.
- [ ] Owner receives one correctly addressed email with matching reservation fields.
- [ ] Test invalid/malformed requests and confirm backend handles them safely without corrupting Sheet.
- [ ] Verify no spreadsheet formula injection from form input and no sensitive error details displayed publicly.
- [ ] Spreadsheet access is **Restricted** to authorized people; access to reservation data is not public.
- [ ] Test entries are removed or clearly tagged without deleting real customer bookings.

**Evidence:** sanitized form screenshots, redacted sheet row, execution log, sanitized notification email, network request details.

## 6. WhatsApp conversion — P0

- [ ] Number uses country code format `62...` without `+`, spaces, or dashes.
- [ ] Every `wa.me` link points to the **verified real business number**.
- [ ] Message is properly URL-encoded and prefilled with relevant order/reservation intent.
- [ ] Header, hero, menu/CTA, footer, and floating WhatsApp entry points open the intended conversation.
- [ ] Links work on mobile with WhatsApp installed and have reasonable desktop/web fallback.
- [ ] No disabled, broken, duplicated, or misleading CTA links.
- [ ] GA4 WhatsApp click tracking (if configured) fires once per intentional click.

**Evidence:** sample resulting destination/message, screen recording, GA4 DebugView if available.

## 7. Responsive QA — P0

| Viewport | Must verify | Result | Evidence |
|---|---|---|---|
| 320 × 568 | No horizontal overflow or clipped controls | PENDING | — |
| 375 × 667 | Mobile navigation and sticky WhatsApp; readable text | PENDING | — |
| 414 × 896 | Larger-phone spacing, images, form | PENDING | — |
| 768 × 1024 | 2-column feature/menu grids where specified; tablet navigation | PENDING | — |
| 1024 × 768 | Desktop/tablet transition; 3-column menu | PENDING | — |
| 1440 × 900 | Max 1200 px container, 3-column menu, gallery layout | PENDING | — |

- [ ] Test tap, scroll, input, orientation, long strings, and browser zoom to 200%.
- [ ] No content hidden behind floating controls or cut off by sticky header.
- [ ] At all widths, images have correct aspect ratio and no layout shift.

## 8. Accessibility — P0

- [ ] Semantic landmarks (`header`, `nav`, `main`, `footer`) and exactly one H1.
- [ ] Skip-to-content link appears on keyboard focus and lands in main content.
- [ ] All interactive controls work by keyboard; focus order is logical and visible.
- [ ] Body text color contrast **≥ 4.5:1**; large text **≥ 3:1**; controls are discernible.
- [ ] Color is not the only way to communicate invalid/success/best-seller states.
- [ ] All fields have persistent labels; form errors refer to relevant inputs.
- [ ] Menu toggle and FAQ controls expose meaningful expanded/collapsed states.
- [ ] Images have meaningful `alt` or `alt=""` when decorative.
- [ ] Icon-only controls including sticky WhatsApp and back-to-top have meaningful accessible names.
- [ ] Form status is announced with a screen reader (NVDA or VoiceOver).
- [ ] `prefers-reduced-motion` disables/reduces scroll effects, reveal animation, and optional pulse.
- [ ] No flashing >3 times/second; no keyboard traps.

**Evidence:** keyboard walkthrough, axe/Lighthouse issues, screen-reader check, contrast measurements.

## 9. Performance — P0 (project target)

- [ ] Run Lighthouse mobile **and** desktop on the local production preview.
- [ ] Re-run Lighthouse mobile **and** desktop against the live URL.
- [ ] Lighthouse **Performance = 100** (target; record actual score).
- [ ] Lighthouse **Accessibility = 100** (target; record actual score).
- [ ] Lighthouse **Best Practices = 100** (target; record actual score).
- [ ] Lighthouse **SEO = 100** (target; record actual score).
- [ ] Total page transfer budget is **< 600 KB** (define test capture conditions and record measured transferred bytes).
- [ ] Time to Interactive target **< 1.5 s** where reported by chosen test tooling.
- [ ] No visible CLS; project target CLS = 0.
- [ ] Hero image appropriately prioritized; below-the-fold images lazy-loaded.
- [ ] Image width/height are explicit and images are appropriately compressed.
- [ ] Font preload and `font-display: swap` work; no unnecessary fonts.
- [ ] No significant unused JavaScript/CSS or console/runtime errors.

| Audit | Mobile score | Desktop score | Report path / URL |
|---|---|---|---|
| Local preview | PENDING | PENDING | — |
| Production | PENDING | PENDING | — |

**Note:** A score of 100 is a stated project target, not a verified outcome; lab results depend on conditions and can vary between runs. Record evidence and document deviations.

## 10. SEO and social sharing — P0

- [ ] Unique correct document title, description, canonical URL, and favicon.
- [ ] Correct production domain replaces sample/staging values.
- [ ] Open Graph title/description/photo present; image is **1200 × 630** (and within prescribed size budget).
- [ ] Twitter/X card metadata present as specified.
- [ ] Social share previews show the intended photo/copy on relevant platforms.
- [ ] `robots.txt` is accessible and does not inadvertently block the production page.
- [ ] `sitemap.xml` is accessible and includes correct canonical production URL.
- [ ] `LocalBusiness` structured data parses correctly and uses accurate name, location, hours, phone, and URL.
- [ ] No broken images, anchors, canonical references, or mixed-content HTTP assets.
- [ ] Analytics GA4 (if configured) records page views and desired conversion events; no duplicate firing.

**Evidence:** page source, sitemap/robots responses, Rich Results Test, social preview checks, GA4 DebugView.

## 11. Security and privacy — P0

- [ ] HTTPS and valid certificate present on live domain.
- [ ] No secrets embedded in `PUBLIC_*` environment variables, frontend JS, HTML, or repository.
- [ ] Reservation Sheet remains restricted despite public submission endpoint.
- [ ] Apps Script validates inputs server-side; avoid trusting browser-only validation.
- [ ] Abuse controls are considered for public anonymous POSTs (rate limit, spam protection, and log monitoring as applicable).
- [ ] User-supplied text is treated as data; spreadsheet formula injection mitigated.
- [ ] Personal reservation information never appears in analytics event payloads or client-facing debug logs.
- [ ] Form copy provides an appropriate privacy/use notice, and retention/access practices are agreed with owner.
- [ ] Errors do not disclose stack traces, personal information, or internal deployment details.
- [ ] Production has an owner-approved backup/recovery or export plan for reservation records.

## 12. Build and production deployment — P0

Run in project root:

```bash
node --version
npm --version
npm install
npm run check
npm run build
npm run preview
```

- [ ] Type/syntax check completes without errors.
- [ ] Build completes and `dist/index.html`, static assets, and required images exist.
- [ ] Production preview reproduces functional flows; testing was not limited to development server.
- [ ] Correct Git branch/commit deployed to **one selected host** (Vercel or Netlify).
- [ ] Host builds with the configured environment variables.
- [ ] Production home and 404 pages load over HTTPS without console errors.
- [ ] Custom domain and DNS resolve correctly if a custom domain is in scope.
- [ ] `astro.config.mjs` site URL and all metadata align with live domain.
- [ ] **Live** WhatsApp and form end-to-end tests pass again after deployment.
- [ ] Recovery path established: last-known-good deployment can be restored from host dashboard.
- [ ] Rollback drill or documented rollback instructions are available.

## 13. Evidence, documentation, and handoff — P1 / P2

- [ ] P1: README contains setup steps, actual production URL, environment-variable names, and owner contacts (without secrets).
- [ ] P1: Screenshots cover important desktop and mobile sections, menu, form, and live website.
- [ ] P1: Save a Lighthouse evidence screenshot as `screenshots/01-lighthouse.png`.
- [ ] P1: Test report lists actual audit scores, browser/device, date, deployment URL, and unresolved defects.
- [ ] P1: Owner confirms café contact, price list, hours, policies, and claim accuracy.
- [ ] P2: Capture documented portfolio screenshots and preview video per Deployment Guide §9.
- [ ] P2: Create operational handoff: how to update menu, change hours, inspect reservations, and redeploy Apps Script.

## 14. Open questions / source inconsistencies to resolve

These are **documentation conflicts or assumptions**, not confirmed application bugs:

1. **Best-seller badge count:** Deployment Guide §8.1 says **4 items** but also says **“2 per category”** across **4 categories** (which would imply 8). Content Guide §11 says **max 4 items**. **Proposed acceptance criterion:** no more than 4 in total, pending owner decision.
2. **Placeholder business information:** Several docs use `6281234567890`, `owner@arkcoffee.id`, and `arkcoffee.id` as setup examples. Confirm which values are actually production-approved before launch.
3. **Social proof:** 4.9/5 and 2,000+ customers appear in examples/specifications but must be substantiated before publishing (Content Guide prohibits fabricated proof).
4. **Submission transport:** Docs show `fetch` with `Content-Type: application/json` to Apps Script; cross-origin browser requests may behave differently from `curl`. Confirm browser-based delivery and response parsing, and revise transport if necessary.
5. **Page-size budget:** `< 600 KB` alongside 14 menu photos, 6 gallery photos, and hero media is ambitious. Measure total page weight under a documented loading scenario rather than assuming it is met.
6. **README and document naming:** Companion filenames vary between examples (`cheatsheets.md` vs `Cheatsheet.md`); standardize paths/links when integrating into the repository.

## 15. Defect / risk log

| ID | Priority | Test / issue | Expected vs. actual | Owner | Status | Evidence |
|---|---|---|---|---|---|---|
| QA-001 | — | _To be filled_ | _To be filled_ | — | OPEN | — |

**Issue statuses:** OPEN / IN PROGRESS / BLOCKED / FIXED / VERIFIED / ACCEPTED RISK.

## 16. Final launch gate

**Do not mark release approved until:**

- [ ] All P0 checks passed or exceptions explicitly approved by owner and documented.
- [ ] No unresolved critical security, privacy, reservation, payment/order-routing, or accessibility defects.
- [ ] Business owner approved real contact details, schedule, menu/prices, and public claims.
- [ ] All P1 exceptions documented with assigned owner and due date.
- [ ] Evidence and live URL are attached to QA report.
- [ ] Rollback owner and procedure confirmed.

| Decision | Value |
|---|---|
| P0 completed / total | 0 / _to count on execution_ |
| P1 completed / total | 0 / _to count on execution_ |
| P2 completed / total | 0 / _to count on execution_ |
| Critical defects open | _Not assessed_ |
| QA reviewer | _Pending_ |
| Business approval | _Pending_ |
| Launch status | **CONDITIONAL GO — STATIC-ONLY LOCAL RELEASE VERIFIED; LIVE DEPLOYMENT PENDING** |

---

### Source documents

- `Blueprint.md` — project scope, page order, architecture, performance targets, Appendix B.
- `Cheatsheet.md` — environment settings, sample scripts, accessibility, image and build references.
- `Content Guide.md` — approved voice, menu/content constraints, writing checklist, truthfulness rules.
- `Deployment Guide.md` — backend, Sheet, hosting, post-deploy testing and rollback.
- `Design System.md` — colors, layout, responsive breakpoints, interaction and accessibility standards.

*Checklist created 17 November 2026. All checks intentionally remain open until demonstrated with evidence.*


---

## V2 verification protocol — authoritative release gate

**Test result codes:** `NOT_RUN`, `PASS`, `FAIL`, `BLOCKED`, `N/A` (N/A requires reason). The checkboxes above remain a human-readable inventory; actual results belong in the evidence table below.

| Test ID | Requirement | Procedure | Expected result | Priority | Status | Evidence |
|---|---|---|---|---|---|---|
| QA-001 | ARK-F01 | Inspect DOM and viewport widths at 320/375/768/1024/1440 | 11 regions, no overflow | P0 | PASS | `npm run test` (region order); integrated-browser metrics showed no overflow at all five widths; all in-page anchors resolve; 1440 px screenshot reviewed. |
| QA-002 | ARK-F02 | Compare menu data to approved inventory | 4 categories / 14 approved items | P0 | PASS | Four categories and all 14 approved names, descriptions, and prices render in the static build. |
| QA-003 | ARK-F03 | Inspect image manifest, licenses and rendering | 6 gallery images, no broken links | P0 | PASS | All 22 image elements load locally; license/asset ownership should remain documented before public release. |
| QA-004 | ARK-F04 | Click every WhatsApp CTA on mobile/desktop | Approved number, correct message | P0 | PASS | CTAs use `6281295709620` and context-specific encoded WhatsApp messages. |
| QA-005 | ARK-F05 | Submit valid, invalid, past-date and oversized inputs | Validation on client and server | P0 | N/A | Static-only launch has no form submission; WhatsApp handles reservation inquiries manually. |
| QA-006 | ARK-F06 | Submit valid request, inspect Sheet and logs | Exactly one row with request ID | P0 | N/A | Reservation storage was intentionally not activated. |
| QA-007 | ARK-F07 | Double click / retry identical WhatsApp request | No duplicate row concept | P0 | N/A | No live reservation backend or duplicate-row state is used. |
| QA-008 | ARK-F08 | Simulate network and backend errors | No false success, WhatsApp fallback | P0 | PASS | No form submission claims success; WhatsApp remains the direct fallback. |
| QA-009 | ARK-F09 | Owner sign-off for address/hours/phone/menu | No placeholder facts | P0 | PASS | Address, hours, cutoff, WhatsApp, Instagram, menu, and privacy contact are recorded as owner-approved. |
| QA-010 | ARK-N01 | Keyboard, screen-reader, axe, zoom, reduced motion | No critical accessibility defects | P0 | NOT_RUN | Browser check verified mobile navigation open/Escape, FAQ disclosure, reservation guidance, and responsive layouts; full screen-reader and axe audit remain. |
| QA-011 | ARK-N02 | Inspect canonical/OG/JSON-LD/sitemap | Only approved facts and URLs | P1 | BLOCKED | GitHub Pages canonical and JSON-LD are configured; OG image and deployed sitemap verification remain pending. |
| QA-012 | ARK-N03 | Run local check/build/tests; attach CI for release SHA when available | Check/build/tests green | P0 | PASS | `npm run check` (0 diagnostics), `npm run build` (2 static routes), `npm run test` (5/5 pass). No CI/release SHA exists yet. |
| QA-013 | ARK-F10 | Inspect GA4 DebugView and payload | Events work, no names/phones | P1 | BLOCKED | Analytics is not approved or configured; no tracking requests are sent. |
| QA-014 | SEC-01 | Test spam, formula injection, size limit, rate limiting | Invalid/abusive payloads rejected | P0 | BLOCKED | No reservation backend exists to test; form controls are disabled. |
| QA-015 | OPS-01 | Disable backend and rehearse rollback | Recovery path and fallback verified | P0 | BLOCKED | No staging or production deployment exists. |

### Requirement-to-file map

| Requirement | Implementation | Current evidence / limitation |
|---|---|---|
| ARK-F01 | `src/pages/index.astro`, `src/components/*Section.astro`, `tests/site.test.mjs` | 11 regions in order; local viewport checks pass. |
| ARK-F02 | `src/data/menu.ts`, `src/components/MenuSection.astro`, `public/images/menu/` | Four categories and all 14 approved names, descriptions, prices, and images. |
| ARK-F03 | `src/data/gallery.ts`, `src/components/GallerySection.astro`, `public/images/hero/`, `public/images/gallery/`, `scripts/generate-concept-images.mjs` | One hero and six gallery assets render locally; asset ownership/license record remains to maintain. |
| ARK-F04 | `src/data/site.ts`, `src/components/SiteHeader.astro`, `src/components/HeroSection.astro`, `src/components/StickyWhatsApp.astro` | Approved WhatsApp number `6281295709620` is used by all WhatsApp CTAs. |
| ARK-F05–F08 | `src/components/ReservationSection.astro` | Static-only WhatsApp reservation guidance replaces live form submission; no personal data is collected or stored. |
| ARK-F09 | `src/data/site.ts`, `src/components/LocationSection.astro`, `src/components/SiteFooter.astro` | Approved Tangerang address, opening hours, cutoff, phone, Instagram, and privacy contact are implemented. |
| ARK-F10 | No analytics client by design; see `docs/analytics-tracking-plan.md` | Analytics requires owner and privacy approval. |
| ARK-N01 | `src/styles/global.css`, `src/scripts/navigation.ts`, `src/components/FaqSection.astro`, `src/components/BackToTop.astro` | Keyboard/mobile behaviors partially checked; full accessibility audit remains. |
| ARK-N02 | `src/layouts/BaseLayout.astro` | Safe generic metadata and `noindex`; canonical/business structured data waits for approved domain/facts. |
| ARK-N03 | `package.json`, `package-lock.json`, `astro.config.mjs`, `tests/site.test.mjs` | Local type check, build, and static tests passed; no CI workflow/release SHA. |

**GO:** All P0 PASS, no unresolved critical/high defects, approved owner content, release SHA and reviewer recorded. **NO-GO:** Any P0 FAIL/BLOCKED/NOT_RUN. P1 exceptions require named approver, risk, and deadline. Never turn `NOT_RUN` into `PASS` without evidence.

### Execution evidence template
| Test ID | Environment | Commit SHA | Device/browser | Date/time | Tester | Result | Evidence URL/path | Defect ID |
|---|---|---|---|---|---|---|---|---|
| QA-001 | staging | TBD | TBD | TBD | TBD | NOT_RUN | TBD | — |

### Defect template
`DEF-ID | severity (critical/high/medium/low) | reproduction steps | expected | actual | owner | fix SHA | retest evidence | status`

**Current overall verdict:** `CONDITIONAL GO / STATIC-ONLY IMPLEMENTATION VERIFIED LOCALLY`. Business facts and menu are approved. Live reservation storage is intentionally inactive. No real website domain/canonical URL, deployed host, or production smoke test has been supplied.
