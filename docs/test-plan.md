# Test Plan v2.0 — Ark Coffee & Eatery

**Status:** UPDATED IMPLEMENTATION TEST PLAN. A loopback-only, in-memory reservation simulator is available for synthetic local tests. Production backend, staging, deployed browser, and payment scenarios remain unexecuted.

## 2026-11-18 implementation evidence
- `npm run check`: pass with 0 diagnostics.
- `npm run build`: pass with 3 static routes, including the privacy page.
- `npm run test`: pass with 14 tests (6 local API tests and 8 static acceptance tests).
- Browser: no horizontal overflow checked at 320, 375, 768, 1024, and 1440 px.
- Browser: all 22 page image elements load after scrolling.
- Live smoke: homepage, hero/menu/gallery images, robots, and 404 return HTTP 200.
- Privacy, sitemap, canonical, and social preview metadata are built for the GitHub Pages release.
- Reservation copy reflects full pre-order payment, manual WhatsApp proof, admin review, cancellation/no-show, and refund terms. No payment API is connected.
- Local API unit tests cover order minimum, H-1 date, booking hours, table-capacity holds, deadlines, refund states, and non-local origin rejection.
- Browser flow: submitted synthetic Rp 275.000 orders, simulated payment proof, exercised admin approval and rejection/refund completion. No WhatsApp message or payment was sent.
- Browser validation found and fixed an invalid HTML phone pattern; re-tested the reservation flow after the fix.
- Asset approval: owner confirmed the current JPG photo assets are theirs and approved their use on 2026-11-18.
- Python HTTP smoke script at `scripts/test_local_reservation.py`: user ran `py test_local_reservation.py` from `scripts` on 2026-11-18; health check, approval, rejection, and refund-completion flows passed. The API was already listening on port 8787; no second instance was started.
- Production-preview accessibility smoke: no horizontal overflow at 320/375/768/1024/1440 px; all 22 images loaded and had alt text; one H1 and header/nav/main/footer landmarks; skip-link moved focus to `main`; nav Enter/Escape and FAQ Enter worked; reduced-motion set scroll behavior to `auto`. This is not a full screen-reader/axe audit.
- Fixed anchor color inheritance that had overridden the skip-link color and made it low-contrast; WhatsApp CTA text now uses the dark ink token on green.
- Remaining P0 integrations require real staging or production evidence.

## Strategy
Unit: policy validation, canonical menu-price calculations, and status transitions. Local integration: browser -> loopback-only in-memory API. Production integration, persistence, authentication, idempotency, notification delivery, and payment behavior remain unimplemented and untested. Manual: visual, screen reader, responsive, cross-browser, and owner content approval. Production: smoke tests using approved safe test data.

## Test environments
| Environment | Purpose | Test data | External effects |
|---|---|---|---|
| Local | unit/build and in-memory reservation simulator | synthetic only | no real messages, payment, persistent records, or external writes |
| Staging | real end-to-end | synthetic labeled `source=test` | isolated test Sheet or controlled test rows |
| Production | smoke | approved synthetic contact | remove from reporting safely |

## Detailed scenarios
| ID | Area | Action | Expected |
|---|---|---|---|
| UT-01 | Name | Empty, 1, 2, 80, 81 chars | Reject invalid lengths |
| UT-02 | WhatsApp | Invalid, spaces, +62, 08 prefix | Normalize and validate consistently |
| UT-03 | Party size | 0, 1, 20, 21, decimal | Only integer 1–20 |
| UT-04 | Date/time | Yesterday, today, tomorrow, out-of-hours, timezone boundary | Approved slot rules in Asia/Jakarta |
| UT-05 | Notes | 0, 500, 501 chars, HTML, formula prefix | Bound length; sanitize for Sheet |
| IT-01 | Valid submission | Submit once | One row; request ID; correct fields |
| IT-02 | Duplicate | Repeat same idempotency key | One row only |
| IT-03 | Network | Drop request/timeout | No success; safe retry |
| IT-04 | Backend | Sheet unavailable | Failure communicated; no false success |
| IT-05 | Notification | Email fails after row stored | Write status truthful; alert queued/logged |
| IT-06 | Security | Spam burst, oversized body, malicious fields | Abuse protection; no leaked stack trace |
| E2E-01 | WhatsApp | Tap every CTA | Correct owner number + encoded text |
| E2E-02 | Mobile | 320,375,768,1024,1440 | No overflow, all interactions usable |
| E2E-03 | Keyboard | Tab, Shift+Tab, Escape, Enter | Visible focus and operable controls |
| E2E-04 | Motion | Reduced motion enabled | No forced decorative motion |
| E2E-05 | SEO | Inspect canonical, OG, JSON-LD | Correct approved facts only |
| E2E-06 | Analytics | Trigger CTAs and submit | Defined events without PII |
| E2E-07 | Form copy | Submit success | “Request received”, not “confirmed” |
| E2E-08 | Local simulator | Create synthetic reservations, simulate proof, approve one, reject another, and mark its refund complete | Synthetic-only state flow; no real payment or WhatsApp message |
| OPS-01 | Rollback | Revert deployed release | Known-good page/API functional |

## Evidence and exit
Record test ID, environment, SHA, device, tester, timestamp, expected/actual, screenshot/log link, defect. P0 scenarios must pass; P1 deviations require written acceptance. Retest all failures on exact release SHA. Local code checks and the E2E-08 demo flow passed on 2026-11-18; production, staging, payment, and persistent-storage scenarios remain untested.
