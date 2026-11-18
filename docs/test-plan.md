# Test Plan v2.0 — Ark Coffee & Eatery

**Status:** Test design; the local static checks that have run are recorded in `verification-checklist.md`. Reservation, staging, and production scenarios remain unexecuted.

## Strategy
Unit: validation, data transforms, CTA URL generation. Integration: API -> Apps Script/storage, idempotency, notification failure. E2E: browser -> API -> Sheet and confirmation UX. Manual: visual, screen reader, responsive, cross-browser, owner content approval. Production: smoke tests using approved safe test data.

## Test environments
| Environment | Purpose | Test data | External effects |
|---|---|---|---|
| Local | unit/build and mocked API | synthetic | no real emails/rows |
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
| OPS-01 | Rollback | Revert deployed release | Known-good page/API functional |

## Evidence and exit
Record test ID, environment, SHA, device, tester, timestamp, expected/actual, screenshot/log link, defect. P0 scenarios must pass; P1 deviations require written acceptance. Retest all failures on exact release SHA. No test is currently marked passed.
