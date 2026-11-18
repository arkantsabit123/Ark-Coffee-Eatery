# Ark Coffee & Eatery — Documentation System v2.0

**Status:** IMPLEMENTATION_READY for local/static preview; **not production verified**. The Astro frontend, approved facts, menu, gallery assets, WhatsApp links, and verification evidence have been implemented. **Date:** 2026-11-18. **Audience:** developers, designers, content owners, and AI coding agents.

## Purpose and source
This documentation package upgrades the six user-supplied v1 Markdown files, preserving their full legacy details and adding **normative v2 amendments**. The amendments are engineering recommendations and must not be confused with validated facts or running code.

## Read order
1. `README.md` (this file)
2. `../AGENTS.md`
3. `architecture-decisions.md`
4. `blueprint.md` (v2 amendment and original requirements)
5. `design-system.md` and `content-guide.md`
6. `deployment-guide.md` and `cheatsheet.md`
7. `test-plan.md`, `verification-checklist.md`, `analytics-tracking-plan.md`, `operations-runbook.md`

## Precedence
1. Owner-approved business facts and security/privacy requirements
2. This README and accepted ADRs
3. Each file's **V2 normative amendments**
4. Retained V1 content (legacy examples are historical; never copy conflicting ones)
5. Implementation assumptions (must be documented and approved)

## Non-negotiable rules
- Preserve the 11 sections, 4 menu categories / 14 items, 6 gallery images and WhatsApp-first approach unless owner changes scope.
- **No fabricated reviews, rating, sales, customer counts, locations, business hours, or prices.**
- All owner details in v1 are unverified until approved. A real working phone, domain and map pin are launch blockers.
- Prefer browser -> same-origin serverless API -> validated backend -> Sheets. No direct JSON browser-to-Apps-Script assumption.
- Reservation request is not a confirmed booking.
- Record all deviations in `architecture-decisions.md`.
- Tests and evidence are required before using the label `PRODUCTION_VERIFIED`.

## Definition of Done
Requirement IDs traced to implementation, code check/build/test pass, real browser-to-Sheet submission verified, no critical a11y/security defects, content approved, rollback rehearsed, release sign-off recorded.

## Open approvals (blocking where relevant)
| ID | Approval required | Owner | Status |
|---|---|---|---|
| FACT-01 | Address, opening hours and booking cutoff | Business owner | APPROVED — Tangerang address; 07:00–22:00; cutoff 20:00 |
| FACT-02 | Website domain, Instagram, email, and privacy contact | Business owner | PARTIAL — Instagram and email approved; no separate website domain/canonical URL provided |
| FACT-03 | Menu names/prices/ingredients and authentic image rights | Business owner | APPROVED — asset licenses should remain documented |
| FACT-04 | Testimonials, rating and customer-count proof | Business owner | OMITTED — no proof supplied |
| TECH-01 | Hosting and reservation API design | Technical owner | DECIDED — static-only, backend disabled |
| TECH-02 | Astro/Tailwind/Node version and support review | Project request / technical owner | ACCEPTED for local implementation in ADR-005; revalidate before release |
| OPS-01 | Data retention, deletion, abuse monitoring and alert owner | Business + technical owner | PARTIAL — 12-month retention approved; WhatsApp staff and deletion process pending |

## Deliverables
The repository includes the specifications and a local Astro/Tailwind static preview. Local type checking, production build, static tests, dependency audit, and selected browser checks have been executed; evidence is in `verification-checklist.md`. Business approval, reservation backend, analytics, staging, deployment, and production verification have not been completed.
