# AGENTS.md — Ark Coffee & Eatery v2.0

You are implementing a website from specifications, **not** authorized to invent business facts.

## Read before coding
`docs/README.md` -> `docs/architecture-decisions.md` -> `docs/blueprint.md` v2 amendments -> `docs/design-system.md` -> `docs/content-guide.md` -> `docs/deployment-guide.md` -> `docs/test-plan.md`.

## Agent execution protocol
1. Inventory repository, package versions, scripts, assets, and existing tests; report missing items.
2. Build a requirement-to-file plan keyed by `ARK-F*`, `ARK-N*` IDs.
3. Surface unresolved P0 owner facts or ADRs. Do not silently choose a production phone, address, domain, testimonial, or backend.
4. Implement in small changes; preserve brand, section order, menu/gallery scope, and accessibility.
5. Use canonical data files. No duplicated business constants.
6. Do not copy legacy v1 browser JSON Apps Script snippets. Confirm the actual host supports `/api/reservations`.
7. Do not expose secrets in `PUBLIC_*`, analytics, logs, HTML, or Git.
8. Run available checks, build, unit/integration/E2E tests; record actual commands and outputs. Never claim a test passed unless run.
9. Update verification evidence and changelog; identify unresolved issues explicitly.
10. Do not deploy, spend money, send real customer messages, or mutate production data without authorization.

## Stop conditions
Stop the affected feature if required facts are unverified, backend route is unavailable, security controls are missing, test evidence contradicts spec, or architecture decisions remain unresolved.

## Completion report format
Implemented / Files changed / Tests actually run / Evidence / Known risks / Owner approvals required / Release status.
