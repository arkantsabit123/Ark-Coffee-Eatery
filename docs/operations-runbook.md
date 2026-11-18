# Operations Runbook v2.0 — Ark Coffee & Eatery

**Status:** PROCEDURES PROPOSED; owner assignment pending.

## Ownership matrix
| Activity | Responsible | Backup | Frequency |
|---|---|---|---|
| Menu prices and availability | Café manager (TBD) | TBD | On change |
| Reservations and WhatsApp confirmation | Front-of-house (TBD) | TBD | Daily |
| Backend and alerts | Developer/operator (TBD) | TBD | Daily monitor |
| Analytics reporting | Marketing (TBD) | TBD | Weekly |
| Privacy/deletion requests | Owner (TBD) | TBD | On request |

## Daily operations
1. Review new reservations in restricted Sheet and operational notifications.
2. Confirm requests via WhatsApp; never assume a submitted form reserves inventory.
3. Resolve duplicate requests and unanswered messages using request ID.
4. Review backend errors and suspicious submission spikes without exporting PII unnecessarily.
5. Update menu availability only through approved content workflow; re-run smoke test.

## Incident playbooks
**Form submissions fail:** reproduce with synthetic data -> inspect function and Apps Script execution logs -> verify Sheets permissions -> show truthful form error and WhatsApp fallback -> fix and retest. **Duplicate rows:** pause form if needed -> inspect idempotency logic -> reconcile safely. **Wrong business information:** correct canonical data -> approve -> deploy -> verify SEO metadata. **PII exposure:** restrict access immediately, rotate credentials, assess scope, notify responsible owner and follow applicable privacy procedures.

## Data governance
- Sheet sharing restricted to minimum required accounts.
- Never place customer phone/name in GA4, URLs, console logs, public screenshots, or issue trackers.
- Retention/deletion schedule **not approved**; obtain business-owner policy before production.
- Test rows must be labeled and excluded from business metrics.
- Backups and restore testing must be approved and documented; do not publicly share exported Sheet files.

## Change management
Issue -> change proposal -> owner approval for business facts -> branch/PR -> checks -> staging smoke -> release approval -> production smoke -> changelog. Emergency rollback returns to last known-good commit; record incident and follow-up action.
