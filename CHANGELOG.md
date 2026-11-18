# Changelog

## 2026-11-18 — GitHub Pages release
- Deployed the static Astro website to GitHub Pages.
- Production URL: https://arkantsabit123.github.io/Ark-Coffee-Eatery/
- GitHub Actions workflow run `44286318459` completed successfully.
- Live page and HTTPS response verified.
- Live reservation storage and analytics remain inactive.

## Unreleased — 2026-11-18 documentation and release preview
- Configured GitHub Pages to use GitHub Actions as its deployment source.
- Workflow permissions for Pages deployment are set to read and write.
- Configured the Astro project base and canonical URL for GitHub Pages.
- Added a GitHub Actions deployment workflow for pushes to `main`.
- Added 7 SVG README screenshot placeholders and live preview documentation.
- Added concise reservation policy copy for H-1 requests, 50% down payment, tax inclusion, and forfeited cancellation payment.
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
