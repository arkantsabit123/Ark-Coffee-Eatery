import { randomUUID } from 'node:crypto';
import { createServer } from 'node:http';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { menuConceptItems } from '../src/data/menu.ts';
import { reservationPolicy } from '../src/data/reservation.ts';

const port = 8787;
const allowedOrigins = new Set([
  'http://localhost:4321',
  'http://127.0.0.1:4321',
  'http://localhost:4322',
  'http://127.0.0.1:4322',
]);
const menuById = new Map(menuConceptItems.map((item) => [item.id, item]));
const activeStatuses = new Set(['awaiting_payment', 'awaiting_admin_review', 'confirmed']);

export class ReservationError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

function jakartaDate(timestamp) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date(timestamp));
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function jakartaDateTime(timestamp) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date(timestamp));
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return { date: `${values.year}-${values.month}-${values.day}`, time: `${values.hour}:${values.minute}` };
}

function addDays(date, amount) {
  const value = new Date(`${date}T00:00:00Z`);
  value.setUTCDate(value.getUTCDate() + amount);
  return value.toISOString().slice(0, 10);
}

function timeInMinutes(value) {
  if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value ?? '')) {
    return null;
  }
  const [hours, minutes] = value.split(':').map(Number);
  return hours * 60 + minutes;
}

function cleanText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function validateOrder(rawItems) {
  if (!Array.isArray(rawItems) || rawItems.length === 0 || rawItems.length > menuConceptItems.length) {
    throw new ReservationError('Choose at least one menu item.');
  }

  const seen = new Set();
  const items = rawItems.map((rawItem) => {
    if (!rawItem || typeof rawItem !== 'object') {
      throw new ReservationError('One or more menu quantities are invalid.');
    }
    const { itemId, quantity } = rawItem;
    const menuItem = menuById.get(itemId);
    if (!menuItem || seen.has(itemId) || !Number.isInteger(quantity) || quantity < 1 || quantity > 50) {
      throw new ReservationError('One or more menu quantities are invalid.');
    }
    seen.add(itemId);
    return {
      itemId,
      name: menuItem.name,
      quantity,
      unitPrice: menuItem.price,
      lineTotal: menuItem.price * quantity,
    };
  });
  const total = items.reduce((sum, item) => sum + item.lineTotal, 0);

  if (total < reservationPolicy.minimumOrderTotal) {
    throw new ReservationError(`The order minimum is Rp ${reservationPolicy.minimumOrderTotal.toLocaleString('id-ID')}.`);
  }
  return { items, total };
}

function reservationConsumesTables(reservation) {
  return activeStatuses.has(reservation.status);
}

export function createLocalReservationService({
  clock = () => Date.now(),
  makeId = randomUUID,
} = {}) {
  const reservations = new Map();

  function expirePending() {
    const now = clock();
    for (const reservation of reservations.values()) {
      if (reservation.status === 'awaiting_payment' && now >= reservation.paymentDeadlineAt) {
        reservation.status = 'payment_expired';
        reservation.updatedAt = new Date(now).toISOString();
      } else if (reservation.status === 'awaiting_admin_review' && now >= reservation.reviewDeadlineAt) {
        reservation.status = 'refund_due';
        reservation.refundReason = 'Admin review deadline exceeded';
        reservation.updatedAt = new Date(now).toISOString();
      }
    }
  }

  function getReservation(id) {
    expirePending();
    const reservation = reservations.get(id);
    if (!reservation) {
      throw new ReservationError('Reservation not found.', 404);
    }
    return reservation;
  }

  function create(payload) {
    expirePending();
    const name = cleanText(payload?.name);
    const whatsapp = cleanText(payload?.whatsapp).replace(/[+\s()-]/g, '');
    const partySize = payload?.partySize;
    const date = payload?.date;
    const startTime = payload?.startTime;
    const endTime = payload?.endTime;

    if (name.length < 2 || name.length > 80) {
      throw new ReservationError('Name must be between 2 and 80 characters.');
    }
    if (!/^\d{8,15}$/.test(whatsapp)) {
      throw new ReservationError('Enter a valid WhatsApp number.');
    }
    if (!Number.isInteger(partySize) || partySize < 1 || partySize > reservationPolicy.maxPartySize) {
      throw new ReservationError(`Party size must be from 1 to ${reservationPolicy.maxPartySize}.`);
    }
    const dateValue = new Date(`${date}T00:00:00Z`);
    if (
      typeof date !== 'string'
      || !/^\d{4}-\d{2}-\d{2}$/.test(date)
      || !Number.isFinite(dateValue.getTime())
      || dateValue.toISOString().slice(0, 10) !== date
    ) {
      throw new ReservationError('Choose a valid reservation date.');
    }
    const earliestDate = addDays(jakartaDate(clock()), reservationPolicy.minimumLeadDays);
    if (date < earliestDate) {
      throw new ReservationError('Reservations must be made at least 1 day ahead.');
    }

    const start = timeInMinutes(startTime);
    const end = timeInMinutes(endTime);
    const earliestStart = timeInMinutes(reservationPolicy.bookingStartTime);
    const latestStart = timeInMinutes(reservationPolicy.latestBookingStart);
    const closingTime = timeInMinutes(reservationPolicy.latestBookingEnd);
    if (start === null || start < earliestStart || start > latestStart || end === null || end <= start || end > closingTime) {
      throw new ReservationError('Choose a start time from 10:00–20:00 and an end time by 22:00.');
    }

    const order = validateOrder(payload.items);
    const tablesRequired = Math.ceil(partySize / reservationPolicy.seatsPerTable);
    const overlappingTables = [...reservations.values()]
      .filter((reservation) => (
        reservation.date === date
        && reservationConsumesTables(reservation)
        && startTime < reservation.endTime
        && endTime > reservation.startTime
      ))
      .reduce((sum, reservation) => sum + reservation.tablesRequired, 0);

    if (overlappingTables + tablesRequired > reservationPolicy.tableCount) {
      throw new ReservationError('That time is at capacity. Choose another time.', 409);
    }

    const now = clock();
    const reservation = {
      id: makeId(),
      name,
      whatsapp,
      date,
      startTime,
      endTime,
      partySize,
      tablesRequired,
      items: order.items,
      total: order.total,
      status: 'awaiting_payment',
      createdAt: new Date(now).toISOString(),
      updatedAt: new Date(now).toISOString(),
      paymentDeadlineAt: now + reservationPolicy.paymentWindowMinutes * 60_000,
      reviewDeadlineAt: null,
      refundReason: null,
    };
    reservations.set(reservation.id, reservation);
    return { ...reservation };
  }

  function recordPaymentProof(id) {
    const reservation = getReservation(id);
    if (reservation.status !== 'awaiting_payment') {
      throw new ReservationError('This reservation is no longer waiting for payment.', 409);
    }
    const now = clock();
    reservation.status = 'awaiting_admin_review';
    reservation.paymentProofReceivedAt = new Date(now).toISOString();
    reservation.reviewDeadlineAt = now + reservationPolicy.adminReviewWindowMinutes * 60_000;
    reservation.updatedAt = new Date(now).toISOString();
    return { ...reservation };
  }

  function review(id, decision, reason = '') {
    const reservation = getReservation(id);
    if (reservation.status !== 'awaiting_admin_review') {
      throw new ReservationError('This reservation is not waiting for admin review.', 409);
    }
    const now = clock();
    if (decision === 'approve') {
      reservation.status = 'confirmed';
    } else if (decision === 'reject') {
      reservation.status = 'refund_due';
      reservation.refundReason = cleanText(reason) || 'Reservation or order unavailable';
    } else {
      throw new ReservationError('Choose approve or reject.');
    }
    reservation.updatedAt = new Date(now).toISOString();
    return { ...reservation };
  }

  function completeManualRefund(id) {
    const reservation = getReservation(id);
    if (reservation.status !== 'refund_due') {
      throw new ReservationError('This reservation has no refund due.', 409);
    }
    reservation.status = 'refund_completed';
    reservation.updatedAt = new Date(clock()).toISOString();
    return { ...reservation };
  }

  function cancelByCustomer(id) {
    const reservation = getReservation(id);
    if (reservation.status !== 'confirmed') {
      throw new ReservationError('Only confirmed reservations can be cancelled.', 409);
    }
    reservation.status = 'cancelled_forfeited';
    reservation.updatedAt = new Date(clock()).toISOString();
    return { ...reservation };
  }

  function markNoShow(id) {
    const reservation = getReservation(id);
    if (reservation.status !== 'confirmed') {
      throw new ReservationError('Only confirmed reservations can be marked as a no-show.', 409);
    }
    const now = clock();
    const localNow = jakartaDateTime(now);
    const scheduledStart = Date.parse(`${reservation.date}T${reservation.startTime}:00Z`);
    const currentLocalTime = Date.parse(`${localNow.date}T${localNow.time}:00Z`);
    if (currentLocalTime < scheduledStart + reservationPolicy.lateGraceMinutes * 60_000) {
      throw new ReservationError('The 1-hour late grace period has not passed.', 409);
    }
    reservation.status = 'no_show_forfeited';
    reservation.updatedAt = new Date(now).toISOString();
    return { ...reservation };
  }

  function list() {
    expirePending();
    return [...reservations.values()]
      .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
      .map((reservation) => ({ ...reservation }));
  }

  return { cancelByCustomer, completeManualRefund, create, list, markNoShow, recordPaymentProof, review };
}

const service = createLocalReservationService();

function sendJson(response, statusCode, payload, origin) {
  const headers = {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
    'Vary': 'Origin',
  };
  if (origin) {
    headers['Access-Control-Allow-Origin'] = origin;
  }
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(payload));
}

async function readJson(request) {
  if (!request.headers['content-type']?.includes('application/json')) {
    throw new ReservationError('Expected a JSON request.', 415);
  }
  const chunks = [];
  let bytes = 0;
  for await (const chunk of request) {
    bytes += chunk.length;
    if (bytes > 12_000) {
      throw new ReservationError('Request is too large.', 413);
    }
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw new ReservationError('Invalid JSON request.');
  }
}

export function createLocalApiServer({ reservationService = service } = {}) {
  return createServer(async (request, response) => {
    const origin = request.headers.origin;
    if (origin && !allowedOrigins.has(origin)) {
      sendJson(response, 403, { error: 'This prototype only accepts the local preview.' }, undefined);
      return;
    }
    if (request.method === 'OPTIONS') {
      response.writeHead(204, {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Origin': origin,
        'Vary': 'Origin',
      });
      response.end();
      return;
    }

    try {
      const url = new URL(request.url ?? '/', `http://${request.headers.host ?? '127.0.0.1'}`);
      if (request.method === 'GET' && url.pathname === '/health') {
        sendJson(response, 200, { mode: 'local-demo', status: 'ok' }, origin);
        return;
      }
      if (request.method === 'GET' && url.pathname === '/api/admin/reservations') {
        sendJson(response, 200, { reservations: reservationService.list() }, origin);
        return;
      }
      if (request.method === 'POST' && url.pathname === '/api/reservations') {
        const reservation = reservationService.create(await readJson(request));
        sendJson(response, 201, { reservation }, origin);
        return;
      }

      const proofMatch = url.pathname.match(/^\/api\/reservations\/([0-9a-f-]+)\/payment-proof$/i);
      if (request.method === 'POST' && proofMatch) {
        sendJson(response, 200, { reservation: reservationService.recordPaymentProof(proofMatch[1]) }, origin);
        return;
      }
      const decisionMatch = url.pathname.match(/^\/api\/admin\/reservations\/([0-9a-f-]+)\/decision$/i);
      if (request.method === 'POST' && decisionMatch) {
        const body = await readJson(request);
        sendJson(response, 200, {
          reservation: reservationService.review(decisionMatch[1], body.decision, body.reason),
        }, origin);
        return;
      }
      const refundMatch = url.pathname.match(/^\/api\/admin\/reservations\/([0-9a-f-]+)\/refund-completed$/i);
      if (request.method === 'POST' && refundMatch) {
        sendJson(response, 200, { reservation: reservationService.completeManualRefund(refundMatch[1]) }, origin);
        return;
      }
      const noShowMatch = url.pathname.match(/^\/api\/admin\/reservations\/([0-9a-f-]+)\/no-show$/i);
      if (request.method === 'POST' && noShowMatch) {
        sendJson(response, 200, { reservation: reservationService.markNoShow(noShowMatch[1]) }, origin);
        return;
      }
      const cancelMatch = url.pathname.match(/^\/api\/reservations\/([0-9a-f-]+)\/cancel$/i);
      if (request.method === 'POST' && cancelMatch) {
        sendJson(response, 200, { reservation: reservationService.cancelByCustomer(cancelMatch[1]) }, origin);
        return;
      }
      sendJson(response, 404, { error: 'Endpoint not found.' }, origin);
    } catch (error) {
      const statusCode = error instanceof ReservationError ? error.statusCode : 500;
      sendJson(response, statusCode, {
        error: statusCode === 500 ? 'Local prototype error.' : error.message,
      }, origin);
    }
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const server = createLocalApiServer();
  const expirySweep = setInterval(() => service.list(), 5_000);
  expirySweep.unref();
  server.on('close', () => clearInterval(expirySweep));
  server.listen(port, '127.0.0.1', () => {
    console.log(`Local reservation prototype API: http://127.0.0.1:${port}`);
    console.log('In-memory only; no payment, WhatsApp message, or real customer data.');
  });
}
