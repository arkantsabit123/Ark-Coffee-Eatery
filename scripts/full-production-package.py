"""Progress checklist for the proposed Full Production package."""

from package_tracker import (
    BLOCKED,
    DONE,
    NEEDS_AGREEMENT,
    NOT_STARTED,
    PARTIAL,
    ChecklistItem,
    print_package_report,
)


ITEMS = [
    ChecklistItem(
        DONE,
        "ARK-F01-F04, ARK-F09, ARK-N02",
        "Reuse the existing static website, content, menu, gallery, and metadata",
        "The static site is implemented; its exact release still needs approval before deployment.",
    ),
    ChecklistItem(
        DONE,
        "ARK-F05",
        "Demonstrate the reservation policy in a local-only prototype",
        "In-memory API and synthetic browser/Python workflows were exercised successfully.",
    ),
    ChecklistItem(
        NOT_STARTED,
        "ARK-F06",
        "Implement a persistent reservation database and production API",
        "Current demo data exists only in memory; no production backend/storage has been selected.",
    ),
    ChecklistItem(
        NOT_STARTED,
        "AUTH",
        "Add staff login and admin/manager/owner authorization",
        "The local demo has no authentication or staff permissions.",
    ),
    ChecklistItem(
        NEEDS_AGREEMENT,
        "PAYMENT",
        "Select the merchant provider and confirm sandbox capabilities",
        "Provider is not known yet; no credentials should be sent in chat.",
    ),
    ChecklistItem(
        NOT_STARTED,
        "PAYMENT",
        "Integrate sandbox payment intents, status notifications, and failure handling",
        "No provider API, webhook, sandbox, or live payment integration is present.",
    ),
    ChecklistItem(
        NOT_STARTED,
        "REFUND",
        "Implement and verify provider-supported refund flow",
        "Current refund action changes only local demo status; no money moves.",
    ),
    ChecklistItem(
        NOT_STARTED,
        "ARK-F07, SEC-01",
        "Add idempotency, abuse controls, audit trail, and operational monitoring",
        "Production controls are not implemented. The local demo is unauthenticated and must not be deployed.",
    ),
    ChecklistItem(
        PARTIAL,
        "OPS-01",
        "Define and implement 12-month data retention and deletion operations",
        "The retention period is documented; deletion workflow and responsible staff are still undecided.",
    ),
    ChecklistItem(
        PARTIAL,
        "ARK-N01, ARK-N03",
        "Complete accessibility, security, and end-to-end staging verification",
        "Local build/tests and selected browser checks passed; full audits and staging evidence remain.",
    ),
    ChecklistItem(
        NEEDS_AGREEMENT,
        "TECH-01",
        "Approve production host, database, backup, access, and third-party cost choices",
        "Architecture and provider decisions remain open; no paid service is selected.",
    ),
    ChecklistItem(
        BLOCKED,
        "RELEASE",
        "Deploy production backend and payment integration",
        "Blocked until architecture, merchant sandbox, security controls, owner approvals, and release authorization are ready.",
    ),
]


if __name__ == "__main__":
    print_package_report(
        "Paket Produksi Penuh",
        "Rp 7.500.000-Rp 15.000.000+",
        ITEMS,
        "Angka harga adalah rentang indikatif dari pemilik proyek. Biaya layanan pihak ketiga dan rincian scope perlu disepakati sebelum kontrak.",
    )
