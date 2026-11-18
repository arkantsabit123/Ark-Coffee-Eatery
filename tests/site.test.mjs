import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');

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

test('uses descriptive preview metadata without indexing unapproved content', () => {
  const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1];

  assert.ok(description);
  assert.ok(description.length >= 120 && description.length <= 160);
  assert.match(html, /<meta name="robots" content="noindex, nofollow"/i);
});

test('uses the approved About Ark copy', () => {
  assert.match(html, /About Ark Coffee &amp; Eatery/i);
  assert.match(html, /We look forward to welcoming you/i);
  assert.match(html, /Ark Coffee &amp; Eatery is where specialty coffee meets comfort food/i);
  assert.match(html, /Explore the menu, check our opening hours/i);
});
