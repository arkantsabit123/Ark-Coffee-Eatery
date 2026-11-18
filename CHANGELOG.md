# Changelog

## Unreleased — Customer package tracking
- Added Python progress checklists for Basic, Standard, and Full Production package scopes.
- Added a customer-facing package overview with indicative price ranges, current implementation status, and unresolved scope approvals.
- Marked Python bytecode cache output as ignored.

## Unreleased — Basic package accessibility checks
- Fixed anchor color inheritance that overrode intended link text colors; WhatsApp CTAs use dark ink on green for contrast.
- Made the main landmark focusable so the keyboard skip link moves focus to the page content.
- Verified production-preview responsive, image-alt, landmark, keyboard navigation, FAQ, and reduced-motion smoke checks; formal screen-reader/axe audit remains open.
- Owner approved the Basic package scope, source-code handover, zero included revisions, and use of their current JPG photo assets.
- Owner accepted the Basic package deliverable on 2026-11-18; source remains local and was not committed, pushed, or deployed.

## Unreleased — Offline reservation prototype
- Replaced the superseded 50% down-payment policy with the approved full-payment, Rp 250,000 minimum pre-order policy.
- Added a development-only reservation simulator and loopback in-memory API for payment proof, admin review, cancellation, capacity holds, and manual refund states.
- Kept the API, demo form, admin queue, and synthetic data out of the production static build.
- Updated privacy, reservation copy, test instructions, and operational documentation; no gateway, real payment, persistent database, or deployment is enabled.

## 2026-11-18 — GitHub Pages release
- Added privacy policy page, sitemap, robots sitemap reference, OG/Twitter metadata, and 1200x630 social preview image.
- Committed actual README screenshot PNGs and removed superseded SVG screenshot placeholders.
- Deployed the static Astro website to GitHub Pages.
- Production URL: https://arkantsabit123.github.io/Ark-Coffee-Eatery/
- GitHub Actions workflow run `44286318459` completed successfully.
- Live page and HTTPS response verified.
- Live reservation storage and analytics remain inactive.
- Final privacy, SEO, screenshot, and documentation commit: `71bde55`.

## Unreleased — 2026-11-18 documentation and release preview
- Configured GitHub Pages to use GitHub Actions as its deployment source.
- Workflow permissions for Pages deployment are set to read and write.
- Configured the Astro project base and canonical URL for GitHub Pages.
- Added a GitHub Actions deployment workflow for pushes to `main`.
- Added 7 SVG README screenshot placeholders and live preview documentation.
- Added initial reservation copy for H-1 requests and a 50% down payment; the policy was later superseded by the full-payment terms above.
- Updated all repository-facing project documentation to reflect the implemented Astro frontend and static-only WhatsApp release decision.
- Updated the Tangerang address, opening hours, concise About copy, 14-item menu, WhatsApp, Instagram, retention, and release documentation.
- Reworked the root README with preview asset tables, image descriptions, feature summaries, setup commands, status, and documentation links.
- Marked legacy duplicate docs as historical references and retained v2 files as the normative implementation source.
- No deployment or GitHub publishing was performed as part of this documentation update.

## Unreleased — Local website implementation
- Replaced placeholder business copy and menu placeholders with owner-approved address, opening hours, WhatsApp, Instagram, menu names, descriptions, and prices.
- Added 14-item menu cards, a functional WhatsApp reservation CTA, footer contacts, approved-hours/location copy, JSON-LD business data, and a mobile sticky WhatsApp button.
- Kept static-only reservations non-submit and removed live personal-data collection; analytics and backend storage remain inactive.
- Added 21 original local SVG concept assets for the hero, 14 menu positions, and 6 gallery positions. Integrated the assets into the responsive preview while retaining approval labels and removing the previous gallery CSS-only placeholders.
- Added a pinned Astro 7 / Tailwind 4 static frontend with 11 responsive page regions, accessible navigation, menu and gallery approval placeholders, FAQ, and a disabled reservation-form preview.
- Added canonical TypeScript content data, local development scripts, production build, static acceptance tests, and root setup/release documentation.
- Kept unverified business details, WhatsApp actions, reservation storage, analytics, and deployment disabled; updated ADR-005 and verification evidence.
- No production integrations, deployment, or GitHub push performed.

## 2.0.0 — 2026-11-17
- Preserved full source v1 documentation and added authoritative v2 amendments to six core files.
- Defined requirement IDs, release states, evidence-based QA, source precedence, fact-approval gates.
- Proposed same-origin serverless reservation API to replace unverified browser JSON-to-Apps-Script integration.
- Added security, privacy, idempotency, content authenticity, accessibility and rollback requirements.
- Added README, AGENTS, test plan, ADRs, operations runbook and analytics tracking plan.
- **No implementation or deployment tests performed.**
