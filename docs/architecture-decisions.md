# Architecture Decision Records — Ark Coffee & Eatery v2.0

ADRs document tradeoffs; **proposed** does not mean approved.

## ADR-001 — Static site and reservation API boundary
- **Status:** GitHub Pages remains static; a loopback-only, in-memory reservation simulator is available for local development.
- **Owner decision:** Do not activate production reservation storage or payment automation yet. The local API is synthetic-only, unauthenticated, non-persistent, and not deployable.
- **Context:** v1 browser JSON `fetch()` to Google Apps Script can fail due to CORS preflight; public endpoint also needs validation and abuse controls.
- **Decision:** Keep the deployed Astro output static. Local development may use a loopback-only simulator; production automation requires a selected host, persistent database, authentication, privacy operations, and payment integration.
- **Consequences:** No real customer data or payments are processed locally. The simulator demonstrates workflow only and must not be exposed publicly.
- **Alternative:** Tested browser-compatible Apps Script submission method, but requires proof of UX/error semantics and spam protection; no assumptions.

## ADR-002 — Single source of truth for business and menu data
- **Status:** IMPLEMENTED.
- **Decision:** `src/data/site.ts` and `src/data/menu.ts` contain approved implementation values; Content Guide owns copy standards; all components consume shared data.
- **Consequence:** Reduced drift, clear review responsibility.

## ADR-003 — Performance targets are measured release goals, not promises
- **Status:** ACCEPTED.
- **Decision:** Lighthouse 100/100/100/100 is stretch goal; report reproducible measurements and real-image budget. Accessibility and functionality remain hard gates.
- **Consequence:** Honest reporting without sacrificing visual quality.

## ADR-004 — Manual payment and reservation confirmation
- **Status:** Approved for local prototype; production workflow not activated.
- **Owner decision:** Full order payment is required before admin review, with a Rp 250,000 minimum total per reservation including tax. Staff confirm only after manually verifying payment and availability.
- **Decision:** Customers pre-order from the menu, pay manually by bank transfer/e-wallet within 30 minutes, and send proof through WhatsApp. Admin review is due within 30 minutes after proof. If café-side fulfillment fails or review expires, the system marks a full refund due; staff must perform the actual refund manually.
- **Other approved terms:** Customer cancellation and no-show after a one-hour grace period without contact forfeit payment. Booking starts are 10:00–20:00, end by 22:00, and reservations are requested at least one day ahead.
- **Consequence:** No payment gateway or automatic refund is implied; the local prototype must show pending and refund-due states truthfully.

## ADR-007 — Offline reservation simulator
- **Status:** IMPLEMENTED FOR LOCAL TESTING ONLY.
- **Decision:** Expose a development-only UI and loopback API that stores synthetic bookings in memory. Restarting the API clears the data. The production static build excludes the UI; the API has no staff authentication and must not be deployed.
- **Consequence:** The flow can be reviewed without a merchant API, real money, persistent personal data, or deployment. Production requires a separate architecture and security approval.

## ADR-005 — Version pinning
- **Status:** ACCEPTED for the local implementation; no production hosting decision implied.
- **Context:** v1 specifies Astro 4.x, Tailwind 3.4 and Node 20; these may not be optimal or supported for a new implementation.
- **Decision:** Per the project request to select supported versions, use Astro `7.4.12`, Tailwind CSS `4.3.5`, and `@tailwindcss/vite` `4.3.5`, pinned in `package.json` and `package-lock.json`. Astro's published Node engine is `>=22.23.4`; local validation used Node `24.11.1` and npm `11.6.2`. Tailwind 4 is integrated through its Vite plugin. Use a system display-font stack until a licensed WOFF2 asset is approved.
- **Evidence:** Registry metadata and peer compatibility queried on 2026-11-18; `npm install`, `astro check`, static build, and 7 local tests pass. Recheck package support before release.
- **Consequence:** The project no longer follows the v1 Astro 4/Tailwind 3 examples. Production support and hosting remain separate release decisions.

## ADR-006 — Data protection and retention
- **Status:** PARTIAL.
- **Approved:** WhatsApp reservation inquiries have an owner-approved 12-month retention period.
- **Decision needed:** Deletion process, access list, abuse response, owner operations, and privacy notice implementation. Minimize collected data; do not send PII to analytics.
