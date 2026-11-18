import assert from 'node:assert/strict';
import test from 'node:test';
import { createLocalApiServer, createLocalReservationService, ReservationError } from '../scripts/local-reservation-api.mjs';

const initialTime = Date.parse('2026-11-18T12:00:00+07:00');
const reservationDate = '2026-11-19';

function validPayload(overrides = {}) {
  return {
    name: 'Demo Guest',
    whatsapp: '620000000000',
    date: reservationDate,
    startTime: '10:00',
    endTime: '11:00',
    partySize: 5,
    items: [{ itemId: 'beef-burger', quantity: 5 }],
    ...overrides,
  };
}

function createService() {
  let time = initialTime;
  let nextId = 0;
  const service = createLocalReservationService({
    clock: () => time,
    makeId: () => `00000000-0000-4000-8000-${String(++nextId).padStart(12, '0')}`,
  });
  return {
    service,
    setTime(value) {
      time = value;
    },
  };
}

test('creates an in-memory reservation using canonical menu prices and table capacity', () => {
  const { service } = createService();
  const reservation = service.create(validPayload());

  assert.equal(reservation.total, 275_000);
  assert.equal(reservation.tablesRequired, 2);
  assert.equal(reservation.status, 'awaiting_payment');
  assert.equal(reservation.paymentDeadlineAt, initialTime + 30 * 60_000);
  assert.equal(service.list().length, 1);
});

test('rejects orders below the minimum and booking times outside policy', () => {
  const { service } = createService();

  assert.throws(
    () => service.create(validPayload({ items: [{ itemId: 'beef-burger', quantity: 4 }] })),
    (error) => error instanceof ReservationError && /minimum is Rp 250\.000/.test(error.message),
  );
  assert.throws(
    () => service.create(validPayload({ endTime: '22:30' })),
    (error) => error instanceof ReservationError && /end time by 22:00/.test(error.message),
  );
  assert.throws(
    () => service.create(validPayload({ date: '2026-11-18' })),
    (error) => error instanceof ReservationError && /at least 1 day ahead/.test(error.message),
  );
});

test('holds the required table count and rejects overlapping reservations beyond capacity', () => {
  const { service } = createService();

  for (let index = 0; index < 4; index += 1) {
    service.create(validPayload({ partySize: 12 }));
  }
  assert.throws(
    () => service.create(validPayload({ partySize: 1 })),
    (error) => error instanceof ReservationError && error.statusCode === 409,
  );
});

test('expires unpaid holds and marks timed-out admin review for manual refund', () => {
  const { service, setTime } = createService();
  const unpaid = service.create(validPayload());
  setTime(unpaid.paymentDeadlineAt);
  assert.equal(service.list().find((reservation) => reservation.id === unpaid.id)?.status, 'payment_expired');
  assert.throws(() => service.recordPaymentProof(unpaid.id), /no longer waiting for payment/);

  setTime(initialTime);
  const paid = service.create(validPayload());
  const pendingReview = service.recordPaymentProof(paid.id);
  setTime(pendingReview.reviewDeadlineAt);
  assert.equal(service.list().find((reservation) => reservation.id === paid.id)?.status, 'refund_due');
  assert.equal(service.completeManualRefund(paid.id).status, 'refund_completed');
});

test('requires manual approval after payment proof and applies cancellation/no-show forfeiture states', () => {
  const { service, setTime } = createService();
  const reservation = service.create(validPayload());
  service.recordPaymentProof(reservation.id);
  assert.equal(service.review(reservation.id, 'approve').status, 'confirmed');
  assert.equal(service.cancelByCustomer(reservation.id).status, 'cancelled_forfeited');

  const noShow = service.create(validPayload({ startTime: '12:00', endTime: '13:00' }));
  service.recordPaymentProof(noShow.id);
  service.review(noShow.id, 'approve');
  setTime(Date.parse(`${reservationDate}T13:00:00+07:00`));
  assert.equal(service.markNoShow(noShow.id).status, 'no_show_forfeited');
});

test('local API rejects requests from non-local origins', async (context) => {
  const server = createLocalApiServer({ reservationService: createService().service });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  context.after(() => new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  }));
  const address = server.address();
  assert.ok(address && typeof address === 'object');

  const response = await fetch(`http://127.0.0.1:${address.port}/health`, {
    headers: { Origin: 'https://example.com' },
  });
  assert.equal(response.status, 403);
});
