import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const privacyHtml = await readFile(new URL('../dist/privacy/index.html', import.meta.url), 'utf8');

test('renders all 11 page regions in the documented order', () => {
  const regions = [...html.matchAll(/data-page-region="([^"]+)"/g)].map((match) => match[1]);

  assert.deepEqual(regions, [
    'navbar',
    'hero',
    'proof',
    'features',
    'menu',
    'steps',
    'gallery',
    'location',
    'faq',
    'reservation',
    'footer',
  ]);
});

test('makes the skip-link target focusable', () => {
  assert.match(html, /<main id="main-content" tabindex="-1">/i);
});

test('shows all four menu categories, 14 approved items, and six gallery images', () => {
  for (const name of [
    'Espresso', 'Americano', 'Latte', 'Kopi Susu Gula Aren',
    'Matcha Latte', 'Chocolate', 'Lemon Tea',
    'Nasi Goreng Ark', 'Chicken Sandwich', 'Beef Burger', 'Pasta Aglio Olio',
    'Croissant', 'Cinnamon Roll', 'Banana Bread',
  ]) {
    assert.match(html, new RegExp(name));
  }
  assert.equal((html.match(/id="gallery-photo-/g) ?? []).length, 6);
  assert.equal((html.match(/<img/g) ?? []).length, 22);
});

test('uses the approved WhatsApp number and does not activate data collection', () => {
  assert.match(html, /wa\.me\/6281295709620/i);
  assert.doesNotMatch(html, /<form[^>]+(?:action|method)=/i);
  assert.doesNotMatch(html, /gtag\(|googletagmanager/i);
  assert.match(html, /application\/ld\+json/i);
});

test('uses descriptive public metadata and canonical GitHub Pages URL', () => {
  const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1];

  assert.ok(description);
  assert.ok(description.length >= 120 && description.length <= 160);
  assert.match(html, /<meta name="robots" content="index, follow"/i);
  assert.match(html, /rel="canonical" href="https:\/\/arkantsabit123\.github\.io\/Ark-Coffee-Eatery\/"/i);
});

test('uses the approved About Ark copy', () => {
  assert.match(html, /About Ark Coffee &amp; Eatery/i);
  assert.match(html, /We look forward to welcoming you/i);
  assert.match(html, /Ark Coffee &amp; Eatery is where specialty coffee meets comfort food/i);
  assert.match(html, /Explore the menu, check our opening hours/i);
});

test('shows the approved full-payment reservation policy without a live local demo', () => {
  assert.match(html, /no later than 1 day before arrival/i);
  assert.match(html, /start times are 10:00–20:00/i);
  assert.match(html, /bookings must end by 22:00/i);
  assert.match(html, /pre-order of at least Rp 250\.000 per reservation/i);
  assert.match(html, /full payment is due/i);
  assert.match(html, /manually verifying payment proof within 30 minutes/i);
  assert.match(html, /prices include tax/i);
  assert.match(html, /no-shows after 1 hour without contact forfeit payment/i);
  assert.match(html, /payment is refunded in full/i);
  assert.match(html, /this website does not process or automatically verify payments/i);
  assert.doesNotMatch(html, /Offline reservation prototype/i);
  assert.doesNotMatch(html, /50% down payment/i);
  assert.equal((html.match(/<details class=/g) ?? []).length, 5);
});

test('explains the public privacy policy and local-only prototype handling', () => {
  assert.match(privacyHtml, /public static website does not store reservation data/i);
  assert.match(privacyHtml, /No payment gateway is connected/i);
  assert.match(privacyHtml, /temporary memory/i);
  assert.match(privacyHtml, /12 months/i);
});

test('includes public SEO and privacy assets', () => {
  assert.match(html, /<meta property="og:image" content="[^"]+\/og-image\.png"/i);
  assert.match(html, /<meta name="twitter:card" content="summary_large_image"/i);
  assert.match(html, /<link rel="canonical" href="https:\/\/arkantsabit123\.github\.io\/Ark-Coffee-Eatery\/"/i);
  assert.match(html, /href="\/Ark-Coffee-Eatery\/privacy\/"/i);
});
