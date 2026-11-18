"""Shared printer for the package progress checklists."""

from __future__ import annotations

from collections.abc import Sequence
from dataclasses import dataclass


DONE = "DONE"
PARTIAL = "PARTIAL"
NOT_STARTED = "NOT_STARTED"
BLOCKED = "BLOCKED"
NEEDS_AGREEMENT = "NEEDS_AGREEMENT"

_STATUS_LABELS = {
    DONE: "SELESAI",
    PARTIAL: "SEBAGIAN",
    NOT_STARTED: "BELUM",
    BLOCKED: "TERTUNDA",
    NEEDS_AGREEMENT: "PERLU DISEPAKATI",
}


@dataclass(frozen=True)
class ChecklistItem:
    status: str
    requirement: str
    title: str
    evidence: str


def print_package_report(
    package_name: str,
    price_range: str,
    items: Sequence[ChecklistItem],
    note: str,
) -> None:
    """Print a human-readable snapshot; edit each package file to update status."""
    invalid_statuses = sorted({item.status for item in items} - _STATUS_LABELS.keys())
    if invalid_statuses:
        raise ValueError(f"Unknown checklist status: {', '.join(invalid_statuses)}")

    done_count = sum(item.status == DONE for item in items)
    partial_count = sum(item.status == PARTIAL for item in items)
    open_count = len(items) - done_count - partial_count

    print(f"{package_name} | Harga indikatif: {price_range}")
    print("=" * 72)
    print(
        f"Ringkasan: {done_count} selesai, {partial_count} sebagian, "
        f"{open_count} belum/tertunda/perlu kesepakatan dari {len(items)} item."
    )
    print("Status: DONE, PARTIAL, NOT_STARTED, BLOCKED, NEEDS_AGREEMENT.")
    print("Perbarui status/evidence pada daftar item di file paket ini.\n")

    for index, item in enumerate(items, start=1):
        label = _STATUS_LABELS[item.status]
        print(f"{index}. [{label}] {item.title} ({item.requirement})")
        print(f"   Bukti / catatan: {item.evidence}")

    print(f"\nCatatan: {note}")


__all__ = [
    "BLOCKED",
    "DONE",
    "NEEDS_AGREEMENT",
    "NOT_STARTED",
    "PARTIAL",
    "ChecklistItem",
    "print_package_report",
]
