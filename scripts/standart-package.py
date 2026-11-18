"""Progress checklist for the proposed Standard package."""

from package_tracker import (
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
        "Include the implemented static website, menu/gallery, approved contacts, and SEO",
        "Existing implementation and local verification are recorded in verification-checklist.md.",
    ),
    ChecklistItem(
        PARTIAL,
        "ARK-F03",
        "Complete image ownership/license review",
        "Images render; final rights/ownership evidence remains to be maintained.",
    ),
    ChecklistItem(
        PARTIAL,
        "ARK-N01",
        "Complete accessibility review",
        "Selected browser checks passed; full accessibility audit has not been run.",
    ),
    ChecklistItem(
        DONE,
        "DOCS",
        "Provide README with local setup and test instructions",
        "Repository README contains setup, development, build, and local API instructions.",
    ),
    ChecklistItem(
        PARTIAL,
        "DEPLOY",
        "Deploy the agreed static release and verify the deployed result",
        "An earlier static site is live on GitHub Pages; current uncommitted changes have not been deployed.",
    ),
    ChecklistItem(
        NEEDS_AGREEMENT,
        "REVISION",
        "Agree the number, scope, and timing of revisions",
        "The package description mentions revisions but no quantity or limits were specified.",
    ),
    ChecklistItem(
        NEEDS_AGREEMENT,
        "HOSTING",
        "Confirm the target account, domain, and responsibility for any third-party costs",
        "No new hosting/domain choice or cost approval is recorded; do not use credentials sent in chat.",
    ),
    ChecklistItem(
        NOT_STARTED,
        "RELEASE",
        "Obtain approval before deploying this worktree",
        "No deployment approval applies to the current local changes.",
    ),
]


if __name__ == "__main__":
    print_package_report(
        "Paket Standar",
        "Rp 2.500.000-Rp 4.000.000",
        ITEMS,
        "Deployment pada paket ini berarti situs statis ke host yang disepakati; tidak termasuk backend reservasi atau payment gateway.",
    )
