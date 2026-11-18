import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../public/images/', import.meta.url));

const escapeXml = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const svgFrame = ({ width = 800, height = 600, title, palette, artwork }) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title description">
  <title id="title">${escapeXml(title)}</title>
  <desc id="description">Original illustrative concept for the Ark Coffee &amp; Eatery website preview. Not an approved photograph of the café or a final menu image.</desc>
  <defs>
    <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${palette[0]}"/>
      <stop offset="0.58" stop-color="${palette[1]}"/>
      <stop offset="1" stop-color="${palette[2]}"/>
    </linearGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="18"/>
    </filter>
  </defs>
  <rect width="${width}" height="${height}" rx="24" fill="url(#background)"/>
  ${artwork}
  <rect x="24" y="${height - 62}" width="138" height="36" rx="18" fill="#FDF8F3" fill-opacity="0.92"/>
  <text x="93" y="${height - 38}" fill="#4A2C2A" font-family="system-ui, sans-serif" font-size="14" font-weight="700" text-anchor="middle" letter-spacing="2">CONCEPT</text>
</svg>
`;

const drinkArtwork = (accent, foamy = false) => `
  <ellipse cx="400" cy="498" rx="182" ry="38" fill="#4A2C2A" fill-opacity="0.22" filter="url(#soft)"/>
  <ellipse cx="400" cy="448" rx="142" ry="92" fill="#FDF8F3" fill-opacity="0.82"/>
  <ellipse cx="400" cy="438" rx="112" ry="72" fill="#FFFDFC" fill-opacity="0.95"/>
  <ellipse cx="400" cy="416" rx="94" ry="58" fill="${accent}"/>
  ${foamy ? '<ellipse cx="400" cy="400" rx="82" ry="46" fill="#FFF9F0" fill-opacity="0.96"/><path d="M365 400c26-32 55-32 82 0-21 18-58 18-82 0Z" fill="#6B4A39" fill-opacity="0.35"/>' : ''}
  <path d="M288 398c-10 68 34 112 112 112s122-44 112-112" fill="none" stroke="#FDF8F3" stroke-opacity="0.72" stroke-width="22"/>
`;

const plateArtwork = (accent, shape = 'circle') => `
  <ellipse cx="400" cy="494" rx="190" ry="36" fill="#4A2C2A" fill-opacity="0.18" filter="url(#soft)"/>
  <ellipse cx="400" cy="421" rx="220" ry="150" fill="#FFFDFC" fill-opacity="0.88"/>
  <ellipse cx="400" cy="415" rx="170" ry="108" fill="#EBD9C4"/>
  ${shape === 'round'
    ? `<circle cx="400" cy="405" r="96" fill="${accent}"/><circle cx="400" cy="405" r="58" fill="#F2C66D"/><circle cx="400" cy="405" r="26" fill="#FFF7EC"/>`
    : `<rect x="280" y="320" rx="34" width="240" height="172" fill="${accent}" transform="rotate(-8 400 405)"/><path d="M315 340l170 170M325 455l130-140" stroke="#F5E6D3" stroke-width="18" stroke-linecap="round"/>`}
`;

const menuAssets = [
  ['menu/coffee/espresso.svg', 'Espresso concept', '#8B5E3C', '#3B241B', '#1E130F', 'drink'],
  ['menu/coffee/americano.svg', 'Americano concept', '#C9A98B', '#745540', '#3A281F', 'drink'],
  ['menu/coffee/latte.svg', 'Latte concept', '#E8D3B5', '#B58A63', '#70523F', 'latte'],
  ['menu/coffee/kopi-susu-gula-aren.svg', 'Palm sugar milk coffee concept', '#D6B07B', '#916746', '#4B3428', 'latte'],
  ['menu/non-coffee/matcha-latte.svg', 'Matcha latte concept', '#CED1A3', '#91A06F', '#66764D', 'latte'],
  ['menu/non-coffee/chocolate.svg', 'Chocolate drink concept', '#C3A17F', '#7B533B', '#4A3025', 'latte'],
  ['menu/non-coffee/lemon-tea.svg', 'Lemon tea concept', '#EADDAA', '#C49A42', '#80633A', 'drink'],
  ['menu/main-course/ark-fried-rice.svg', 'Fried rice concept', '#E3C07D', '#B27843', '#6F4A34', 'rice'],
  ['menu/main-course/chicken-sandwich.svg', 'Chicken sandwich concept', '#DDBA84', '#A86E43', '#60412F', 'sandwich'],
  ['menu/main-course/beef-burger.svg', 'Beef burger concept', '#D0A46E', '#84583D', '#493329', 'burger'],
  ['menu/main-course/pasta-aglio-olio.svg', 'Pasta concept', '#EAD6A7', '#C0A15F', '#7D663E', 'pasta'],
  ['menu/pastry/croissant.svg', 'Croissant concept', '#F0D39C', '#C9924D', '#795136', 'pastry'],
  ['menu/pastry/cinnamon-roll.svg', 'Cinnamon roll concept', '#DFC1A1', '#A8734E', '#694632', 'roll'],
  ['menu/pastry/banana-bread.svg', 'Banana bread concept', '#E5C58A', '#B58A51', '#715338', 'bread'],
];

const galleryAssets = [
  ['gallery/gallery-exterior.svg', 'Café exterior concept', '#B8C3B2', '#8E9E84', '#5E704F', 'Exterior with a welcoming window and warm interior light'],
  ['gallery/gallery-interior.svg', 'Café interior concept', '#E8D6BC', '#B89570', '#75563F', 'Warm interior with tables, chairs, and pendant lamps'],
  ['gallery/gallery-coffee.svg', 'Coffee preparation concept', '#CBAA86', '#86664F', '#4D382E', 'Coffee preparation in a softly lit café'],
  ['gallery/gallery-table.svg', 'Food and table concept', '#E2CDAF', '#C09A70', '#81614A', 'A composed café table with coffee and food'],
  ['gallery/gallery-seating.svg', 'Comfortable seating concept', '#C9C1AD', '#9A8E73', '#665C49', 'Comfortable seating with plants and natural light'],
  ['gallery/gallery-guests.svg', 'Café guests concept', '#DDC6A7', '#AD8464', '#694B3A', 'Two abstract guests relaxing in a café'],
];

const writeAsset = async (relativePath, title, palette, artwork) => {
  const target = join(root, relativePath);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, svgFrame({ width: 800, height: 600, title, palette, artwork }), 'utf8');
};

const plateShapes = {
  rice: plateArtwork('#B68A42', 'square'),
  sandwich: plateArtwork('#DAB477', 'square'),
  burger: plateArtwork('#C77D3B', 'round'),
  pasta: plateArtwork('#DCCB82', 'round'),
  pastry: plateArtwork('#C99452', 'round'),
  roll: plateArtwork('#9A6745', 'round'),
  bread: plateArtwork('#C79A58', 'square'),
};

await mkdir(join(root, 'hero'), { recursive: true });
await writeFile(
  join(root, 'hero/hero-cafe.svg'),
  svgFrame({
    width: 1200,
    height: 800,
    title: 'Warm café interior concept',
    palette: ['#F1DFC2', '#C4A27B', '#7A5944'],
    artwork: `
      <circle cx="950" cy="145" r="115" fill="#FFF4D9" fill-opacity="0.58" filter="url(#soft)"/>
      <rect x="145" y="110" width="910" height="520" rx="28" fill="#FFF8ED" fill-opacity="0.28"/>
      <rect x="210" y="170" width="780" height="260" rx="16" fill="#7B5944" fill-opacity="0.28"/>
      <rect x="245" y="205" width="710" height="190" rx="12" fill="#FFF7E9" fill-opacity="0.48"/>
      <ellipse cx="600" cy="655" rx="370" ry="78" fill="#4A2C2A" fill-opacity="0.16" filter="url(#soft)"/>
      <rect x="326" y="470" width="548" height="38" rx="19" fill="#5B402F"/>
      <rect x="372" y="507" width="24" height="145" rx="12" fill="#4A3428"/>
      <rect x="804" y="507" width="24" height="145" rx="12" fill="#4A3428"/>
      <ellipse cx="600" cy="430" rx="75" ry="46" fill="#FFFDF7"/>
      <ellipse cx="600" cy="414" rx="58" ry="36" fill="#6C4936"/>
      <ellipse cx="600" cy="400" rx="48" ry="27" fill="#A96F47"/>
      <path d="M654 400c70 8 64 88-2 82" fill="none" stroke="#FFFDF7" stroke-width="13"/>
    `,
  }),
  'utf8',
);

for (const [path, title, first, second, third, type] of menuAssets) {
  let artwork;
  if (type === 'drink' || type === 'latte') {
    artwork = drinkArtwork(first, type === 'latte');
  } else {
    artwork = plateShapes[type] ?? plateArtwork(first);
  }

  await writeAsset(path, title, [first, second, third], artwork);
}

for (const [path, title, first, second, third, description] of galleryAssets) {
  const artwork = `
    <circle cx="650" cy="150" r="76" fill="#FFF4D9" fill-opacity="0.48" filter="url(#soft)"/>
    <rect x="110" y="130" width="580" height="330" rx="28" fill="#FFF8ED" fill-opacity="0.28"/>
    <rect x="150" y="170" width="500" height="250" rx="18" fill="#FFF8ED" fill-opacity="0.42"/>
    <ellipse cx="400" cy="500" rx="230" ry="42" fill="#4A2C2A" fill-opacity="0.16" filter="url(#soft)"/>
    <text x="400" y="535" fill="#4A2C2A" fill-opacity="0.72" font-family="system-ui, sans-serif" font-size="18" font-weight="650" text-anchor="middle">${escapeXml(description)}</text>
  `;
  await writeAsset(path, title, [first, second, third], artwork);
}
