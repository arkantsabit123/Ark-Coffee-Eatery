#!/usr/bin/env python3
"""Exercise the loopback-only reservation demo API with synthetic data."""

from __future__ import annotations

import json
import sys
from datetime import date, datetime, timedelta, timezone
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


API_BASE = "http://127.0.0.1:8787"
TIMEOUT_SECONDS = 5


class TestFailure(Exception):
    """Raised when the local API does not match the expected demo behavior."""


def request_json(method: str, path: str, payload: dict | None = None) -> dict:
    data = None if payload is None else json.dumps(payload).encode("utf-8")
    headers = {} if data is None else {"Content-Type": "application/json"}
    request = Request(f"{API_BASE}{path}", data=data, headers=headers, method=method)

    try:
        with urlopen(request, timeout=TIMEOUT_SECONDS) as response:
            result = json.loads(response.read().decode("utf-8"))
            if not isinstance(result, dict):
                raise TestFailure(f"{method} {path} returned JSON that is not an object.")
            return result
    except HTTPError as error:
        detail = error.read().decode("utf-8", errors="replace")
        raise TestFailure(f"{method} {path} returned HTTP {error.code}: {detail}") from error
    except URLError as error:
        raise TestFailure(
            "Could not reach the local API at 127.0.0.1:8787. "
            "Start it in another terminal with `npm run dev:reservation-api`."
        ) from error


def check(condition: bool, message: str) -> None:
    if not condition:
        raise TestFailure(message)


def get_reservation(response: dict) -> dict:
    reservation = response.get("reservation")
    check(isinstance(reservation, dict), "API response did not contain a reservation.")
    return reservation


def create_reservation(booking_date: date, start_time: str) -> str:
    start_hour, start_minute = (int(part) for part in start_time.split(":"))
    end_time = f"{start_hour + 1:02d}:{start_minute:02d}"
    payload = {
        "name": "Python Demo Guest",
        "whatsapp": "620000000000",
        "date": booking_date.isoformat(),
        "startTime": start_time,
        "endTime": end_time,
        "partySize": 2,
        "items": [{"itemId": "beef-burger", "quantity": 5}],
    }
    response = request_json("POST", "/api/reservations", payload)
    reservation = get_reservation(response)
    check(reservation["total"] == 275_000, "Expected the synthetic order total to be Rp 275.000.")
    check(reservation["status"] == "awaiting_payment", "New reservation is not awaiting payment.")
    print(f"  Created {reservation['id']} ({booking_date} {start_time}, Rp 275.000)")
    return reservation["id"]


def record_payment_proof(reservation_id: str) -> None:
    response = request_json(
        "POST",
        f"/api/reservations/{reservation_id}/payment-proof",
        {},
    )
    reservation = get_reservation(response)
    check(reservation["status"] == "awaiting_admin_review", "Payment-proof simulation did not move to admin review.")


def run_test() -> None:
    health = request_json("GET", "/health")
    check(health.get("status") == "ok", "Local API health check failed.")
    check(health.get("mode") == "local-demo", "This is not the local demo API.")
    print("Local API health: OK")

    jakarta_now = datetime.now(timezone(timedelta(hours=7))).date()

    print("Testing the admin approval flow:")
    approval_id = create_reservation(jakarta_now + timedelta(days=2), "14:00")
    record_payment_proof(approval_id)
    approved = request_json(
        "POST",
        f"/api/admin/reservations/{approval_id}/decision",
        {"decision": "approve"},
    )
    approved = get_reservation(approved)
    check(approved["status"] == "confirmed", "Admin approval did not confirm the reservation.")
    print(f"  Approved: {approval_id} -> {approved['status']}")

    print("Testing the rejection and refund flow:")
    refund_id = create_reservation(jakarta_now + timedelta(days=3), "14:00")
    record_payment_proof(refund_id)
    rejected = request_json(
        "POST",
        f"/api/admin/reservations/{refund_id}/decision",
        {"decision": "reject", "reason": "Python local demo test"},
    )
    rejected = get_reservation(rejected)
    check(rejected["status"] == "refund_due", "Rejection did not mark a refund as due.")
    refunded = request_json(
        "POST",
        f"/api/admin/reservations/{refund_id}/refund-completed",
        {},
    )
    refunded = get_reservation(refunded)
    check(refunded["status"] == "refund_completed", "Manual refund simulation did not complete.")
    print(f"  Rejected and marked refunded: {refund_id} -> {refunded['status']}")

    print("PASS: local demo flows completed. No real payment or WhatsApp message was sent.")


def main() -> int:
    try:
        run_test()
    except (TestFailure, KeyError, json.JSONDecodeError) as error:
        print(f"FAIL: {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
