# Ark Coffee & Eatery

A static, single-page Astro website preview built from the v2.0 project specifications. Business facts, menu details, contact links, and photography remain visibly pending owner approval; no live reservation service or analytics is configured.

## Requirements

- Node.js `>=22.23.4` (the installed Node.js `24.11.1` was used for validation)
- npm `>=9.6.5`

Astro and Tailwind dependencies are pinned in `package.json` and `package-lock.json`. The implementation uses Astro `7.4.12` with Tailwind CSS `4.3.5`.

## Local development

```powershell
npm install
npm run dev
```

Open the local URL printed by Astro, normally `http://localhost:4321`.

## Checks and production preview

```powershell
npm run check
npm run build
npm run test
npm run preview
```

`npm run test` checks the generated static output, so run `npm run build` first. The production files are written to `dist/`.

## Current implementation boundaries

- All 11 documented page regions render with the approved Tangerang address, opening hours, WhatsApp number, Instagram account, 14-item menu, and 21 image assets.
- WhatsApp is enabled for menu and reservation inquiries.
- Reservation data collection remains disabled because static-only hosting was selected. The reservation section provides WhatsApp guidance and does not simulate a confirmed booking.
- Analytics is disabled. A LocalBusiness-style structured-data block uses only approved business facts.
- The site remains `noindex` until a real production website domain and canonical URL are configured.

See [docs/verification-checklist.md](./docs/verification-checklist.md) for test evidence and blockers, [docs/architecture-decisions.md](./docs/architecture-decisions.md) for technical decisions, and [docs/deployment-guide.md](./docs/deployment-guide.md) for production gates.

## Production release

The static-only release is ready for a static host preview after final browser QA. A reservation backend, paid hosting setup, custom website domain, analytics, deployment, and GitHub publishing remain approval/execution gates. Do not claim a confirmed reservation: WhatsApp staff confirmation is required.
