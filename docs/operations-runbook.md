# Operations Runbook v2.0 — Ark Coffee & Eatery

**Status:** UPDATED PROCEDURES; static site plus local-only reservation simulator. Production owner assignment and backend ownership remain pending.

## 2026-11-18 implementation update
- Approved address: Jl. Boulevard Palem Raya No.38, Lippo Karawaci, Tangerang.
- Approved hours: every day, 07:00–22:00.
- Approved WhatsApp: `6281295709620`.
- Approved Instagram: `arkantsabiit`.
- Approved privacy contact: `arkantsabit025@gmail.com`.
- Approved retention: 12 months.
- Reservation policy: book at least 1 day ahead; start 10:00–20:00, finish by 22:00; maximum 12 people, four per table. A pre-order of at least Rp 250,000 per reservation including tax is required, with full payment.
- Manual payment: bank transfer/e-wallet within 30 minutes; customer sends proof through WhatsApp. Admin review is due within 30 minutes of receiving proof. Customer cancellation and no-show after one hour without contact forfeit payment. Café-side inability to fulfill requires a full refund.
- The development simulator is loopback-only, uses temporary memory and synthetic data, has no authentication, and does not send WhatsApp messages or move money. Do not deploy it.
- Analytics remains inactive.
- Reservation storage remains inactive for static-only hosting.

## Ownership matrix
| Activity | Responsible | Backup | Frequency |
|---|---|---|---|
| Menu prices and availability | Café manager (TBD) | TBD | On change |
| Reservation, payment verification, and refund execution | Admin / manager / owner (accounts TBD) | TBD | Per request |
| Backend and alerts | Developer/operator (TBD) | TBD | Daily monitor |
| Analytics reporting | Marketing (TBD) | TBD | Weekly |
| Privacy/deletion requests | arkantsabit025@gmail.com (pending formal assignment) | TBD | On request |

## Daily operations
1. In production, review new reservation and payment requests through an authenticated, access-restricted system.
2. Verify transfers using the bank/e-wallet account and WhatsApp proof before confirming.
3. If the café cannot fulfill an already-paid order or reservation, arrange a full refund manually.
4. Do not use the local simulator for customer information; its records are volatile and it has no staff authentication.
5. Update menu availability only through approved content workflow; re-run smoke test.

## Incident playbooks
**Local simulator fails:** reproduce with synthetic data -> inspect local terminal output -> restart the API if needed (this clears demo records) -> retest. **Production submissions fail:** no production API is active; define a runbook when a host is approved. **PII exposure:** restrict access immediately, rotate credentials, assess scope, notify responsible owner and follow applicable privacy procedures.

## Data governance
- Production reservation database sharing must be restricted to admin, manager, and owner accounts.
- Never place customer phone/name in GA4, URLs, console logs, public screenshots, or issue trackers.
- Retention period **approved:** 12 months. Production deletion workflow, access list, and formal owner assignment remain pending. Local prototype records disappear when its process stops.
- Public privacy policy: `src/pages/privacy.astro`.
- Public sitemap: `public/sitemap.xml`.
- Public social preview: `public/og-image.png`.
- Test rows must be labeled and excluded from business metrics.
- Backups and restore testing must be approved and documented; do not publicly share exported Sheet files.

## Change management
Issue -> change proposal -> owner approval for business facts -> branch/PR -> checks -> staging smoke -> release approval -> production smoke -> changelog. Emergency rollback returns to last known-good commit; record incident and follow-up action.
