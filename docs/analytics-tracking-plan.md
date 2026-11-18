# Analytics Tracking Plan v2.0 — Ark Coffee & Eatery

**Status:** EVENT SCHEMA DOCUMENTED; analytics is inactive and no live measurement is enabled.

## 2026-11-18 implementation update
- No GA4 measurement ID is configured.
- No analytics script or tracking payload is included in the build.
- WhatsApp links do not transmit names, phones, notes, or other personal data.
- Enable analytics only after owner approval, privacy/consent review, and a production domain decision.

## Objective and privacy
Measure menu engagement and conversion intent without collecting personal data. GA4 measurement ID requires owner approval and privacy/consent review. Never transmit phone numbers, names, free-text notes, exact reservation payloads, or other PII.

| Event name | Trigger | Parameters (non-PII only) | KPI |
|---|---|---|---|
| `view_menu` | Menu section enters viewport | `menu_category` optional | Menu reach |
| `select_menu_category` | Category selected (if interactive) | `menu_category` | Menu interest |
| `click_whatsapp` | Any WhatsApp CTA click | `cta_location`, `cta_purpose` | Primary conversion intent |
| `start_reservation` | First form interaction | `form_id` | Form starts |
| `submit_reservation` | API confirms saved request | `form_id`, `result=received` | Completed requests |
| `reservation_error` | API/network failure | `error_type` non-sensitive enum | Failure rate |
| `click_directions` | Directions link click | `link_location` | Visit intent |
| `click_instagram` | Instagram link click | `link_location` | Social referral |

## Definitions
- WhatsApp CTR = `click_whatsapp` sessions / eligible website sessions; click is **not** a confirmed order.
- Reservation conversion = confirmed **saved request** events / sessions; does **not** equal confirmed table bookings.
- Form success rate = backend-confirmed successful writes / valid submission attempts (exclude client-side invalid attempts).
- First-month target numbers from v1 are hypotheses, not observed results.

## Validation
Verify DebugView, single firing per action, mobile/desktop, no duplicated events, consent behavior, no PII in network requests. Document measurement date, property ID, tester, and evidence.
