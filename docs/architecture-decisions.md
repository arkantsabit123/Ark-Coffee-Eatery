# Architecture Decision Records — Ark Coffee & Eatery v2.0

ADRs document tradeoffs; **proposed** does not mean approved.

## ADR-001 — Static Astro frontend plus same-origin serverless reservation API
- **Status:** IMPLEMENTED AS STATIC-ONLY WHATSAPP PREVIEW — serverless reservation storage remains inactive.
- **Owner decision:** Static-only hosting selected for this release; `/api/reservations` and live personal-data storage remain disabled.
- **Context:** v1 browser JSON `fetch()` to Google Apps Script can fail due to CORS preflight; public endpoint also needs validation and abuse controls.
- **Decision:** Keep static Astro output, deploy a Vercel or Netlify serverless function at `/api/reservations`, validate and rate-limit there, forward to controlled storage/backend, then return structured status.
- **Consequences:** Small serverless cost/maintenance, secret management, platform-specific function code; improved browser compatibility and security boundaries.
- **Alternative:** Tested browser-compatible Apps Script submission method, but requires proof of UX/error semantics and spam protection; no assumptions.

## ADR-002 — Single source of truth for business and menu data
- **Status:** IMPLEMENTED.
- **Decision:** `src/data/site.ts` and `src/data/menu.ts` contain approved implementation values; Content Guide owns copy standards; all components consume shared data.
- **Consequence:** Reduced drift, clear review responsibility.

## ADR-003 — Performance targets are measured release goals, not promises
- **Status:** ACCEPTED.
- **Decision:** Lighthouse 100/100/100/100 is stretch goal; report reproducible measurements and real-image budget. Accessibility and functionality remain hard gates.
- **Consequence:** Honest reporting without sacrificing visual quality.

## ADR-004 — Reservation request is not a confirmed booking
- **Status:** IMPLEMENTED.
- **Decision:** Success means data was saved; staff confirm availability on WhatsApp. No table inventory or automatic confirmation.
- **Consequence:** Prevents misleading customer expectations.

## ADR-005 — Version pinning
- **Status:** ACCEPTED for the local implementation; no production hosting decision implied.
- **Context:** v1 specifies Astro 4.x, Tailwind 3.4 and Node 20; these may not be optimal or supported for a new implementation.
- **Decision:** Per the project request to select supported versions, use Astro `7.4.12`, Tailwind CSS `4.3.5`, and `@tailwindcss/vite` `4.3.5`, pinned in `package.json` and `package-lock.json`. Astro's published Node engine is `>=22.23.4`; local validation used Node `24.11.1` and npm `11.6.2`. Tailwind 4 is integrated through its Vite plugin. Use a system display-font stack until a licensed WOFF2 asset is approved.
- **Evidence:** Registry metadata and peer compatibility queried on 2026-11-18; `npm install`, `astro check`, static build, and 5 local tests pass. Recheck package support before release.
- **Consequence:** The project no longer follows the v1 Astro 4/Tailwind 3 examples. Production support and hosting remain separate release decisions.

## ADR-006 — Data protection and retention
- **Status:** PARTIAL.
- **Approved:** WhatsApp reservation inquiries have an owner-approved 12-month retention period.
- **Decision needed:** Deletion process, access list, abuse response, owner operations, and privacy notice implementation. Minimize collected data; do not send PII to analytics.
