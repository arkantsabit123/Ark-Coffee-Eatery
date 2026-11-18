<!-- ARK DOCUMENTATION V2.0 — AUTHORITATIVE RULES BELOW TAKE PRECEDENCE OVER LEGACY V1 EXAMPLES -->
> **Version 2.0 | Status: Specification Ready — local frontend implemented; production NOT verified. See `verification-checklist.md` for evidence.**
> **Important:** The original v1 content is retained for detailed historical requirements. Any conflicting v1 commands, example code, numerical targets, business claims, or deployment statements are superseded by the **V2 normative amendments** at the end of this file, and by `docs/README.md`. Do not copy legacy Apps Script browser `fetch()` examples into production. `Production Ready` references in the retained historical sections do not describe the actual release state.
> **Source:** User-provided v1 file `Content Guide.md`. New v2 requirements are proposed engineering improvements, not verified facts about the business.

# Content Guide v2.0.0 — Ark Coffee & Eatery

**A practical writing and content reference for the Ark Coffee & Eatery website.** This guide defines every word, headline, label, and message that appears on the site — so copy can be written, reviewed, and shipped without guessing. It governs **what** the page says; the blueprint governs **how** it's built.

---

## Document Information

| Property | Value |
|----------|-------|
| Version | 1.0.0 |
| Last Updated | 2026-11-17 |
| Status | Production Ready |
| Owner | Ark Coffee & Eatery |
| Companion Docs | `blueprint.md`, `design-system.md`, `cheatsheets.md`, `deployment-guide.md` |
| Applies To | All on-page copy, menu descriptions, form labels, meta tags, and system messages |

---

## Purpose of This Guide

This document exists so that:

1. **Copy is written before components are built** — no "lorem ipsum" shipped to production.
2. **Every text element has a rule** — character limits, tone, and required content are defined here.
3. **Non-technical stakeholders can review content** without reading code.
4. **Future edits stay consistent** — anyone updating the page follows the same voice and constraints.

The website has one job: **make visitors want to come to Ark Coffee & Eatery and reserve a table or order via WhatsApp.** Every word must serve that goal.

---

## Table of Contents

1. Brand & Voice
2. Audience & Messaging Strategy
3. Page-Wide Copy Rules
4. Section-by-Section Content
5. Menu Copy & Descriptions
6. Form Copy & Microcopy
7. System Messages & States
8. SEO & Metadata Copy
9. Accessibility Copy Rules
10. Content File Locations
11. Writing Checklist
12. Do / Don't Examples
13. Content Governance

---

## 1. Brand & Voice

### 1.1 Brand Personality

| Attribute | We Are | We Are Not |
|-----------|--------|------------|
| Tone | Warm, inviting, honest | Cold, corporate, salesy |
| Energy | Calm and welcoming | Hyped, exclamation-heavy |
| Persona | A café owner who loves what they do | A generic marketing agency |
| Formality | Conversational and friendly | Stiff corporate / casual slang |

### 1.2 Voice Principles

1. **Warmth over cleverness.** Write like you're welcoming someone into the café.
2. **Sensory before feature.** "Warm golden light, freshly brewed coffee" beats "We have good coffee."
3. **Specific over vague.** "Single origin Gayo, roasted weekly" beats "premium beans."
4. **One idea per sentence.** No stacking three benefits into one line.
5. **Active voice.** "Brewed fresh every morning" — not "Coffee is brewed…"
6. **Second person.** Talk to "you," not "customers" or "visitors."
7. **No hype words.** Ban: *revolutionary, game-changing, cutting-edge, disrupt, synergy, leverage, best-in-class.*

### 1.3 Point of View

- **Address the reader as "you."**
- **Refer to the café as "we"** sparingly — prefer direct statements.
- **Avoid "our platform," "our solution," "our brand."** Say what we do.

### 1.4 Language

- The website is in **English** (`lang="en"`).
- Menu item names may retain Indonesian names (e.g., "Kopi Susu Gula Aren", "Nasi Goreng Ark") as proper nouns — these are the actual product names.
- Prices use the format **Rp 28,000** (no decimal, comma thousands separator).
- Dates use **DD Month YYYY** (e.g., "17 November 2026") in body text, ISO format in structured data.

---

## 2. Audience & Messaging Strategy

### 2.1 Primary Audience

| Attribute | Detail |
|-----------|--------|
| Who | Coffee lovers, remote workers, foodies, locals and visitors in Bandung |
| Pain | Needs a comfortable place with good coffee, honest food, and reliable WiFi |
| Goal | Find a café to work from, meet friends, or enjoy a quiet moment |
| Objection | "Is it actually good? Is it comfortable? Can I reserve a table?" |
| Trigger | Searching "coffee shop near me," seeing an Instagram post, or word-of-mouth |

### 2.2 Value Proposition (Single Sentence)

> **Specialty coffee from selected beans and honest comfort food — brewed and cooked fresh every day, in a warm space where you can stay a while.**

This sentence is the north star. Every section supports it.

### 2.3 Messaging Hierarchy

| Level | Message | Where It Appears |
|-------|---------|------------------|
| Primary promise | Specialty coffee + comfort food, warm space | Hero H1 + subheadline |
| Proof | 2,000+ customers, 4.9/5 rating | Social proof |
| Mechanism | Selected beans, fresh ingredients, daily brewing | Features |
| Sensory | Coffee, food, atmosphere photos | Menu + Gallery |
| Action | Order via WhatsApp / reserve a table | CTA button + form |

### 2.4 Objection Handling Map

| Objection | Where Addressed | Copy Tactic |
|-----------|-----------------|-------------|
| "Is the coffee actually good?" | Hero, Features, Menu | "Single origin Gayo and Lampung, roasted fresh weekly" |
| "Is the food any good?" | Menu | Real descriptions: "150g beef patty, cheese, lettuce, fries" |
| "Is it comfortable to work from?" | Features, Gallery | "Fast WiFi, power outlets at every table" |
| "Can I reserve a table?" | Hero CTA, Form | "Order via WhatsApp" + reservation form |
| "Where is it? When is it open?" | Location | Full address + hours table + map |
| "Is it expensive?" | Menu | Prices shown upfront on every item |

---

## 3. Page-Wide Copy Rules

### 3.1 Global Constraints

| Element | Rule |
|---------|------|
| Sentence length | ≤ 20 words average |
| Paragraph length | ≤ 3 sentences (except FAQ answers) |
| Reading level | Grade 8 or below |
| Contractions | Allowed ("you'll," "we're") |
| Exclamation marks | Max 1 per page (ideally 0) |
| Emoji | Not in copy; icons only |
| Numbers | Use digits (1, 2, 3), not words |
| Currency | `Rp` + amount + comma separator (Rp 28,000) |

### 3.2 Terminology Standard

| Use | Avoid |
|-----|-------|
| coffee shop / café | coffee house, java joint |
| specialty coffee | gourmet coffee, premium coffee |
| comfort food | home-style cooking, hearty meals |
| reserve a table | book a table, make a reservation |
| order via WhatsApp | WhatsApp order, WA order |
| open daily | open every day, 7 days a week |
| fresh | freshly-made, new |
| warm | cozy, snug |

### 3.3 Capitalization

- **Sentence case** for all headings, buttons, and labels.
- **Title Case** only for the document `<title>` and proper nouns.
- Product name: **Ark Coffee & Eatery** (with ampersand, capital A, C, E).
- Menu item names: **Title Case** (e.g., "Kopi Susu Gula Aren", "Ark Fried Rice").

### 3.4 Punctuation

- No terminal periods on buttons, labels, or H1/H2 headings.
- Periods required in body paragraphs, menu descriptions, and FAQ answers.
- Oxford comma: **yes** ("coffee, food, and atmosphere").
- Em dashes: use `—` with spaces.
- Prices: no decimal (`Rp 28,000`, not `Rp 28.000,00`).

---

## 4. Section-by-Section Content

Each section below specifies: purpose, required copy, character limits, and an approved example.

---

### 4.1 Navbar

**Purpose:** Quick navigation + persistent CTA.

| Element | Copy Rule | Limit | Example |
|---------|-----------|-------|---------|
| Logo text | Business name only | ≤ 20 chars | `Ark Coffee` |
| Nav links | 2–4 anchor links | ≤ 15 chars each | `Menu`, `Gallery`, `Location`, `FAQ` |
| CTA button | Action verb + noun | ≤ 20 chars | `Order` |

**Rules:**
- Nav links must match section IDs exactly.
- CTA button uses same action as hero CTA (consistency).

---

### 4.2 Hero

**Purpose:** Communicate the value proposition in under 5 seconds.

| Element | Rule | Limit | Example |
|---------|------|-------|---------|
| H1 headline | Benefit-led, ≤ 10 words | ≤ 60 chars | `Specialty coffee, comfort food` |
| Subheadline | Elaborate on H1, name the mechanism | ≤ 25 words | `Selected beans from Gayo and Lampung, brewed by experienced baristas. Coffee, non-coffee, main courses, and pastry — all made fresh.` |
| Primary CTA | WhatsApp action | ≤ 20 chars | `Order via WhatsApp` |
| Secondary CTA | Browse menu | ≤ 20 chars | `View menu` |
| Hero visual | Warm coffee or interior photo | — | `hero-coffee.webp` |
| Trust line | Rating + customer count | ≤ 30 chars | `2,000+ customers · 4.9/5 rating` |

**H1 Formula (pick one):**
1. **Product + category** — "Specialty coffee, comfort food"
2. **Sensory promise** — "Warm coffee, honest food, your new favorite spot"
3. **Direct invitation** — "Your table is waiting"

**Subheadline Formula:**
> [What we serve] + [How it's made] + [Where/when]

Example: "Selected beans from Gayo and Lampung, brewed by experienced baristas. Coffee, non-coffee, main courses, and pastry — all made fresh. Open daily 7 AM–10 PM at Jl. Merdeka No. 12, Bandung."

**Rules:**
- H1 must not exceed 10 words.
- Subheadline must mention the mechanism (beans, brewing, fresh, daily).
- CTA must be a verb phrase, not "Submit" or "Click here."

---

### 4.3 Social Proof

**Purpose:** Reduce skepticism with real evidence.

| Element | Rule | Limit | Example |
|---------|------|-------|---------|
| Section label | Optional small heading | ≤ 30 chars | `Loved by our customers` |
| Rating | Stars + number | — | `4.9/5 from 2,000+ customers` |
| Testimonials | 1–3 short quotes | ≤ 20 words each | "The palm sugar milk coffee is unbeatable, and the place is comfortable for working." — Rina |

**Rules:**
- Never fabricate testimonials. Use real quotes from real customers (with permission).
- Attribute quotes: name + role (e.g., "Rina, loyal customer").
- No star ratings unless from a real platform (Google Maps, Instagram).
- If no testimonials exist yet, use a simple trust line: "2,000+ customers since 2024."

---

### 4.4 Features

**Purpose:** Explain what makes Ark Coffee & Eatery worth visiting, in 4 scannable cards.

| Element | Rule | Limit | Example |
|---------|------|-------|---------|
| Section heading | Optional | ≤ 40 chars | `Why Ark Coffee & Eatery` |
| Card count | Exactly 4 | — | — |
| Card title | Benefit or capability | ≤ 4 words | `Selected beans` |
| Card description | One sentence, specific | ≤ 15 words | `Single origin Gayo and Lampung, roasted fresh weekly.` |
| Icon | One per card, consistent set | — | Lucide |

**Card Content Template (4 cards):**

| # | Title | Description | Icon |
|---|-------|-------------|------|
| 1 | Selected beans | Single origin Gayo and Lampung, roasted fresh weekly. | `Coffee` |
| 2 | Fast WiFi | Free, reliable WiFi and power outlets at every table. | `Wifi` |
| 3 | Open daily | 7 AM–10 PM, every day of the week. | `Clock` |
| 4 | Workspace friendly | Comfortable seating, quiet corners, and plenty of outlets. | `Laptop` |

**Rules:**
- Each card answers a different objection (quality, WiFi, hours, workspace).
- Descriptions are one sentence, ending with a period.
- No card repeats the CTA.

---

### 4.5 Signature Menu

**Purpose:** Show the full menu — coffee, non-coffee, main courses, pastry — in 4 categories.

| Element | Rule | Limit | Example |
|---------|------|-------|---------|
| Section heading | Optional | ≤ 40 chars | `Ark Coffee & Eatery Menu` |
| Section subtitle | One sentence | ≤ 25 words | `Specialty coffee, non-coffee, main courses, and pastry. Brewed and cooked fresh every day.` |
| Category count | Exactly 4 | — | Coffee, Non-Coffee, Main Course, Pastry |
| Category title | Category name | ≤ 15 chars | `Coffee` |
| Item count per category | 3–4 items | — | — |
| Item name | Product name | ≤ 30 chars | `Kopi Susu Gula Aren` |
| Item price | `Rp` + amount | — | `25,000` |
| Item description | One sentence, specific | ≤ 15 words | `Our signature. Perfectly sweet, aromatic palm sugar.` |
| Best-seller badge | Only on 1–2 items per category | ≤ 12 chars | `Best seller` |

**Menu Copy Rules (see Section 5 for full detail):**
- Every item has a name, price, and one-sentence description.
- Descriptions are sensory and specific — not generic.
- Prices are shown upfront (no "call for price").
- Best-seller badges are earned, not decorative.

---

### 4.6 How It Works

**Purpose:** Show the 3-step experience in plain language.

| Element | Rule | Limit | Example |
|---------|------|-------|---------|
| Section heading | Optional | ≤ 40 chars | `How it works` |
| Step count | Exactly 3 | — | — |
| Step title | Verb phrase | ≤ 4 words | `Come in` |
| Step description | One sentence | ≤ 15 words | `Find us at Jl. Merdeka No. 12, open daily 7 AM–10 PM.` |

**Step Template:**

| # | Title | Description |
|---|-------|-------------|
| 1 | Come in | Find us at Jl. Merdeka No. 12, open daily 7 AM–10 PM. |
| 2 | Order your favorite | Choose from coffee, non-coffee, main courses, or pastry. |
| 3 | Stay a while | Find a comfortable seat, connect to WiFi, and enjoy. |

**Rules:**
- Steps are sequential (1 → 2 → 3), not parallel.
- Each step title starts with a verb.
- No step describes internal mechanics (keep customer-facing).

---

### 4.7 Gallery

**Purpose:** Show the atmosphere — the reason people come back.

| Element | Rule | Limit | Example |
|---------|------|-------|---------|
| Section heading | Optional | ≤ 40 chars | `Inside Ark Coffee & Eatery` |
| Section subtitle | One sentence | ≤ 20 words | `Warm light, wooden tables, and the smell of fresh coffee.` |
| Photo count | Exactly 6 | — | — |
| Alt text | Descriptive, specific | ≤ 125 chars | `Barista pouring latte art at the bar counter` |

**Gallery Photo Rules:**
- 6 photos: interior × 2, barista, customers, coffee beans, workspace.
- All photos share warm color grading (golden, cozy).
- No text overlay on photos.
- Alt text describes the scene, not "gallery image."

---

### 4.8 Location & Hours

**Purpose:** Answer "where is it?" and "when is it open?" in one glance.

| Element | Rule | Limit | Example |
|---------|------|-------|---------|
| Section heading | Optional | ≤ 40 chars | `Find us` |
| Address | Full street address | — | `Jl. Merdeka No. 12, Bandung, West Java 40111` |
| Hours | Day range + time range | — | `Monday–Sunday: 7 AM–10 PM` |
| Parking note | One sentence | ≤ 15 words | `Street parking available in front of the café.` |
| Directions CTA | Link to Google Maps | ≤ 20 chars | `Get directions` |

**Rules:**
- Address must be complete and accurate.
- Hours must match Google Maps listing.
- If hours vary by day, use a table (not a single line).

---

### 4.9 FAQ

**Purpose:** Answer the 5 most common objections.

| Element | Rule | Limit | Example |
|---------|------|-------|---------|
| Section heading | Optional | ≤ 40 chars | `Frequently asked questions` |
| Question count | Exactly 5 | — | — |
| Question | Real customer question, ends with `?` | ≤ 12 words | `Do you have WiFi and power outlets?` |
| Answer | 1–3 sentences, direct | ≤ 40 words | `Yes. Free WiFi and power outlets at every table.` |

**Recommended Questions:**

1. "Do you have WiFi and power outlets?" — "Yes. Free WiFi and power outlets at every table."
2. "Can I reserve a table for a group?" — "Yes. Use the reservation form below or message us on WhatsApp."
3. "Do you have non-coffee options?" — "Yes. Matcha latte, chocolate, and lemon tea."
4. "Is there parking?" — "Street parking is available in front of the café."
5. "What are your opening hours?" — "We're open daily from 7 AM to 10 PM."

**Rules:**
- Questions must be phrased as real customers ask them.
- Answers must be definitive — never "maybe" or "it depends" without a fallback.
- Accordion behavior: first item open by default (optional).

---

### 4.10 Reservation Form

**Purpose:** Capture name, WhatsApp, party size, date, time, and notes.

See Section 6 (Form Copy & Microcopy) for full field-level detail.

---

### 4.11 Footer

**Purpose:** Provide contact, links, and legal closure.

| Element | Rule | Limit | Example |
|---------|------|-------|---------|
| Logo text | Business name | ≤ 20 chars | `Ark Coffee & Eatery` |
| Tagline | One short sentence | ≤ 40 chars | `Specialty coffee, comfort food.` |
| Links | Menu, Gallery, Location | ≤ 15 chars each | `Menu` |
| Address | Full address | — | `Jl. Merdeka No. 12, Bandung` |
| Phone | WhatsApp number | — | `0812-3456-7890` |
| Social | Instagram handle | — | `@arkcoffee.eatery` |
| Copyright | Year + business name | — | `© 2026 Ark Coffee & Eatery. All rights reserved.` |

**Rules:**
- Copyright year must be current (update annually or use dynamic year).
- Contact info must be real and monitored.
- No dead links — remove if page doesn't exist.

---

## 5. Menu Copy & Descriptions

### 5.1 Menu Section Structure

The menu has **4 categories**, each with **3–4 items**. Total: **14 items**.

| Category | Items | Price range |
|----------|-------|-------------|
| Coffee | 4 | Rp 18,000 – Rp 28,000 |
| Non-Coffee | 3 | Rp 20,000 – Rp 30,000 |
| Main Course | 4 | Rp 32,000 – Rp 45,000 |
| Pastry | 3 | Rp 18,000 – Rp 22,000 |

### 5.2 Item Description Rules

| Rule | Example |
|------|---------|
| Sensory, not generic | ✅ "Espresso with steamed milk, smooth." ❌ "Delicious coffee." |
| Mention key ingredient | ✅ "150g beef patty, cheese, lettuce, fries." |
| One sentence, ≤ 15 words | ✅ "Belgian chocolate, creamy and warm." |
| No hype words | ❌ "Amazing, incredible, must-try." |
| No health claims | ❌ "Healthy, guilt-free, low-calorie." |
| Price always shown | ✅ `Rp 28,000` on every item |

### 5.3 Full Menu Copy (Approved)

#### Coffee

| Item | Price | Description | Best Seller |
|------|-------|-------------|-------------|
| Espresso | Rp 18,000 | Single origin Gayo, bold and clean. | — |
| Americano | Rp 22,000 | Espresso with hot water, light and refreshing. | — |
| Latte | Rp 28,000 | Espresso with steamed milk, smooth. | ⭐ |
| Kopi Susu Gula Aren | Rp 25,000 | Our signature. Perfectly sweet, aromatic palm sugar. | ⭐ |

#### Non-Coffee

| Item | Price | Description | Best Seller |
|------|-------|-------------|-------------|
| Matcha Latte | Rp 30,000 | Japanese matcha with fresh milk. | — |
| Chocolate | Rp 26,000 | Belgian chocolate, creamy and warm. | — |
| Lemon Tea | Rp 20,000 | Black tea with fresh lemon, served iced. | — |

#### Main Course

| Item | Price | Description | Best Seller |
|------|-------|-------------|-------------|
| Ark Fried Rice | Rp 35,000 | Special fried rice with egg, chicken, and crackers. | ⭐ |
| Chicken Sandwich | Rp 32,000 | Grilled chicken, lettuce, tomato, special sauce. | — |
| Beef Burger | Rp 45,000 | 150g beef patty, cheese, lettuce, fries. | — |
| Pasta Aglio Olio | Rp 38,000 | Spaghetti with garlic, chili, and olive oil. | — |

#### Pastry

| Item | Price | Description | Best Seller |
|------|-------|-------------|-------------|
| Croissant | Rp 20,000 | Butter croissant, baked fresh every morning. | — |
| Cinnamon Roll | Rp 22,000 | Cinnamon roll with cream cheese glaze. | — |
| Banana Bread | Rp 18,000 | Soft banana bread with walnuts. | — |

### 5.4 Best-Seller Badge Rules

- **Maximum 2 badges per category** (4 total on the page).
- Only on items that genuinely sell most.
- Badge text: **"Best seller"** (not "Popular," "Favorite," or "Recommended").
- Badge color: `bg-ark-amber-light text-ark-amber` (see design system).

### 5.5 Menu Naming Rules

| Rule | Detail |
|------|--------|
| Indonesian names are allowed | "Kopi Susu Gula Aren", "Nasi Goreng Ark" — these are the actual product names |
| English names for international items | "Latte", "Americano", "Matcha Latte", "Croissant" |
| Signature items include the brand name | "Ark Fried Rice" (not just "Fried Rice") |
| No abbreviations | "Kopi Susu Gula Aren" (not "Kopsu Aren") |
| No all-caps | "Espresso" (not "ESPRESSO") |

---

## 6. Form Copy & Microcopy

### 6.1 Form Header

| Element | Rule | Limit | Example |
|---------|------|-------|---------|
| Form H2 | Action-oriented | ≤ 30 chars | `Reserve a table` |
| Form subtext | Optional reassurance | ≤ 25 words | `Fill in the form below, we'll confirm via WhatsApp within 1 hour.` |

### 6.2 Field Labels & Placeholders

| Field | Label | Placeholder | Required |
|-------|-------|-------------|----------|
| name | `Full name` | `Jane Doe` | ✅ |
| whatsapp | `WhatsApp number` | `0812-3456-7890` | ✅ |
| people | `Party size` | `2` | ✅ |
| date | `Date` | — | ✅ |
| time | `Time` | — | ✅ |
| notes | `Notes (optional)` | `Window seat if possible` | ❌ |

**Rules:**
- Labels are always visible (never placeholder-only).
- Placeholders show a realistic example, not instructions.
- "WhatsApp number" signals the preferred contact channel.
- Optional fields marked with `(optional)` in the label.

### 6.3 Helper Text

| Field | Helper text | When to show |
|-------|-------------|--------------|
| whatsapp | `We'll only contact you via WhatsApp.` | Below WhatsApp field, always |
| time | `Open daily 7 AM–10 PM.` | Below time field, always |
| notes | `Optional. Anything we should know?` | Below textarea |

### 6.4 Submit Button

| Rule | Example |
|------|---------|
| Action verb, outcome-focused | `Send reservation` |
| Do not use | `Submit`, `Send`, `Go`, `Click here` |
| Character limit | ≤ 20 chars |

**Alternative CTAs:**
- `Reserve a table`
- `Book now`
- `Send reservation`

Pick **one** and use it consistently.

### 6.5 Privacy Microcopy

Required below the submit button:

> `We will not misuse your number. Confirmation via WhatsApp.`

Rules:
- Must be visible before submission (not behind a link).
- Links to Privacy page if one exists; otherwise plain text.

### 6.6 Validation Messages

| Field | Error message |
|-------|---------------|
| name (empty) | `Please enter your name.` |
| name (too short) | `Name must be at least 2 characters.` |
| whatsapp (empty) | `Please enter your WhatsApp number.` |
| whatsapp (invalid) | `Please enter a valid WhatsApp number.` |
| people (empty) | `Please enter the party size.` |
| people (too large) | `For groups over 20, please contact us directly.` |
| date (empty) | `Please select a date.` |
| date (past) | `Please select today or a future date.` |
| time (empty) | `Please select a time.` |
| time (outside hours) | `We're open 7 AM–10 PM. Please choose a time within these hours.` |
| notes (too long) | `Notes must be under 500 characters.` |

**Rules:**
- Error messages appear inline, next to the field.
- Use "Please…" opener for consistency.
- Never expose internal error codes to users.

---

## 7. System Messages & States

### 7.1 Form States

| State | Message | Duration |
|-------|---------|----------|
| Idle | (no message) | — |
| Submitting | `Sending…` | Until response |
| Success | `Reservation received! We will confirm via WhatsApp within 1 hour.` | Persistent |
| Error (network) | `Sorry, something went wrong. Please try again or contact us via WhatsApp.` | Persistent |
| Error (server) | `Submission failed. Please try again later.` | Persistent |

**Rules:**
- Success message replaces the form (or shows above it) — never both.
- `aria-live="polite"` on the status container.
- No emoji in system messages.
- Success copy must set expectations ("We will confirm within 1 hour" — not "You're in!").

### 7.2 Empty States

| Component | Message |
|-----------|---------|
| No testimonials | (omit section) |
| No gallery photos | (omit section) |
| No FAQ | (omit section) |

**Rule:** Never show an empty container. Omit the section entirely.

### 7.3 Loading States

| Element | Copy |
|---------|------|
| Form submit (disabled) | `Sending…` |
| Page (Astro static) | (no loading state needed) |

### 7.4 Error Page (404)

| Element | Copy |
|---------|------|
| Heading | `Page not found` |
| Body | `The page you're looking for doesn't exist. Head back to the homepage.` |
| CTA | `Back to home` |

---

## 8. SEO & Metadata Copy

### 8.1 Page `<title>`

| Rule | Value |
|------|-------|
| Length | ≤ 60 chars |
| Format | `[Business] — [Value prop]` |
| Example | `Ark Coffee & Eatery — Specialty Coffee & Comfort Food in Bandung` |

### 8.2 Meta Description

| Rule | Value |
|------|-------|
| Length | 120–160 chars |
| Must include | Value prop + location + action |
| Example | `Selected beans, freshly brewed. Coffee, non-coffee, main courses, and pastry. Open daily 7 AM–10 PM at Jl. Merdeka No. 12, Bandung.` |

### 8.3 Open Graph

| Tag | Content |
|-----|---------|
| `og:title` | Same as `<title>` |
| `og:description` | Same as meta description |
| `og:image` | `/images/og-image.png` (1200×630) |
| `og:type` | `website` |
| `og:url` | Canonical URL |

### 8.4 Twitter Card

| Tag | Content |
|-----|---------|
| `twitter:card` | `summary_large_image` |
| `twitter:title` | Same as `<title>` |
| `twitter:description` | Same as meta description |
| `twitter:image` | Same as `og:image` |

### 8.5 Image Alt Text

| Image | Alt text |
|-------|----------|
| Hero coffee | `Latte art on a wooden table, warm window light` |
| Hero interior | `Warm café interior with wooden tables and plants` |
| Menu items | `[Item name] — [brief description]` (e.g., `Latte with latte art in a white cup`) |
| Gallery interior | `Café interior with wooden tables, plants, and warm light` |
| Gallery barista | `Barista pouring latte art at the bar counter` |
| Gallery customers | `Customers enjoying coffee at a wooden table` |
| Gallery coffee beans | `Coffee beans close-up in a wooden bowl` |
| Gallery workspace | `Laptop and coffee on a wooden table by the window` |
| Avatars | `[Customer name]` (e.g., `Rina`) |
| Feature icons | (decorative — use `alt=""`) |

**Rules:**
- Alt text describes the *content*, not "image of…".
- Decorative icons use `alt=""` + `aria-hidden="true"`.
- Every content image has descriptive alt text.

---

## 9. Accessibility Copy Rules

| Rule | Why |
|------|-----|
| Labels always visible | Screen readers + cognitive load |
| Error messages inline | Announced via `aria-describedby` |
| `aria-live="polite"` on status | Announces success/failure |
| Link text is descriptive | "View menu" not "Click here" |
| No color-only meaning | Combine color + text ("Error: …", "Best seller") |
| Sentence case | Easier to scan |
| No all-caps blocks | Harder to read |
| Reading level ≤ grade 8 | Broader accessibility |
| Sticky WhatsApp `aria-label` | "Order via WhatsApp" |
| Back-to-top `aria-label` | "Back to top" |

### Link Text Rules

| ✅ Good | ❌ Bad |
|---------|--------|
| `Order via WhatsApp` | `Click here` |
| `View menu` | `Learn more` |
| `Get directions` | `Here` |
| `Read the privacy policy` | `More` |

---

## 10. Content File Locations

| Content Type | File | Editable by |
|--------------|------|-------------|
| Page copy (sections) | `src/components/*.astro` | Developer |
| Menu items & prices | `src/components/Menu.astro` (data array) | Developer |
| Form labels & messages | `src/components/ReservationForm.astro`, `src/scripts/form.ts` | Developer |
| SEO metadata | `src/layouts/BaseLayout.astro` | Developer |
| FAQ items | `src/components/FAQ.astro` (data array) | Developer |
| Feature cards | `src/components/Features.astro` (data array) | Developer |
| Testimonials | `src/components/SocialProof.astro` (data array) | Developer |
| Site config | `astro.config.mjs` (`site` field) | Developer |
| Env vars | `.env` (not committed) | DevOps |

**Rule:** All copy lives in one of these files. No hardcoded strings elsewhere.

### Optional: Content Collections

For easier copy editing, move menu / FAQ / features into Markdown:

```
src/content/
├── menu/
│   ├── coffee/
│   │   ├── espresso.md
│   │   ├── americano.md
│   │   ├── latte.md
│   │   └── kopi-susu-gula-aren.md
│   ├── non-coffee/
│   └── main-course/
│   └── pastry/
└── faq/
    ├── wifi.md
    └── reservation.md
```

Each `.md` has frontmatter (`name`, `price`, `category`, `description`, `bestSeller`, `order`) + body as extended description.

---

## 11. Writing Checklist

Run this before shipping any copy change:

```
[ ] H1 ≤ 10 words and leads with a benefit
[ ] Subheadline names the mechanism (beans, brewing, fresh, daily)
[ ] CTA uses one verb phrase, consistent across page
[ ] Every section has one clear job
[ ] Feature cards answer distinct objections
[ ] Every menu item has name, price, and description
[ ] Best-seller badges used on max 4 items (2 per category)
[ ] FAQ answers are definitive, not "maybe"
[ ] All form labels are visible
[ ] All error messages are specific and inline
[ ] Success message sets expectations
[ ] No banned hype words
[ ] Reading level ≤ grade 8
[ ] Meta description is 120–160 chars
[ ] Every content image has alt text
[ ] Links are descriptive (not "click here")
[ ] No lorem ipsum anywhere
[ ] No placeholder copy ("Coming soon", "TBD") unless intentional
[ ] Copyright year is current
[ ] WhatsApp number and address are real
[ ] Prices use Rp + comma separator (Rp 28,000)
```

---

## 12. Do / Don't Examples

### H1 Headline

| ✅ Do | ❌ Don't |
|-------|----------|
| `Specialty coffee, comfort food` | `Revolutionary coffee experience for next-gen synergy` |
| `Warm coffee, honest food, your new favorite spot` | `Welcome to our website` |

### Subheadline

| ✅ Do | ❌ Don't |
|-------|----------|
| `Selected beans from Gayo and Lampung, brewed by experienced baristas.` | `Our cutting-edge solution leverages best-in-class paradigms.` |

### CTA

| ✅ Do | ❌ Don't |
|-------|----------|
| `Order via WhatsApp` | `Click here` |
| `Reserve a table` | `Submit` |
| `View menu` | `Go` |

### Menu Item Description

| ✅ Do | ❌ Don't |
|-------|----------|
| `Espresso with steamed milk, smooth.` | `Delicious coffee, must-try!` |
| `150g beef patty, cheese, lettuce, fries.` | `Our amazing burger` |
| `Belgian chocolate, creamy and warm.` | `The best chocolate in town` |

### Form Label

| ✅ Do | ❌ Don't |
|-------|----------|
| `WhatsApp number` | `E-mail Address *` |
| `Party size` | `Number of People (if applicable)` |

### Success Message

| ✅ Do | ❌ Don't |
|-------|----------|
| `Reservation received! We will confirm via WhatsApp within 1 hour.` | `Success!!!` |
| `You're on the list. Invite coming soon.` | `Form submitted.` |

### Error Message

| ✅ Do | ❌ Don't |
|-------|----------|
| `Please enter a valid WhatsApp number.` | `Error 422` |
| `Sorry, something went wrong. Please try again or contact us via WhatsApp.` | `Failed.` |

### FAQ Answer

| ✅ Do | ❌ Don't |
|-------|----------|
| `Yes. Free WiFi and power outlets at every table.` | `It depends on your use case.` |

### Meta Description

| ✅ Do | ❌ Don't |
|-------|----------|
| `Selected beans, freshly brewed. Coffee, non-coffee, main courses, and pastry. Open daily 7 AM–10 PM at Jl. Merdeka No. 12, Bandung.` | `Welcome to our website. Learn more about us.` |

---

## 13. Content Governance

### 13.1 Roles

| Role | Responsibility |
|------|----------------|
| Copywriter | Drafts copy per this guide |
| Developer | Implements copy in components |
| Reviewer | Checks against checklist (Section 11) |
| Owner / manager | Approves H1, CTA, menu names, and prices |

### 13.2 Change Process

1. **Draft** copy change in a branch (`copy/hero-headline`).
2. **Review** against Section 11 checklist.
3. **Approve** by owner (for H1/CTA/menu) or reviewer (for everything else).
4. **Merge** and deploy.
5. **Log** the change in `CHANGELOG.md` under `## Copy`.

### 13.3 Versioning

| Change type | Version bump |
|-------------|--------------|
| H1 / CTA / menu change | Minor (1.x.0) |
| New section added | Minor (1.x.0) |
| Typo fix / microcopy | Patch (1.0.x) |
| Full rewrite | Major (x.0.0) |

### 13.4 Banned Words List

Keep this list in PR reviews. Reject any copy containing:

```
revolutionary, game-changing, cutting-edge, disruptive,
synergy, leverage, paradigm, best-in-class, world-class,
next-gen, innovative, seamless, robust, scalable,
empower, unlock, supercharge, transform, elevate,
amazing, incredible, must-try, delicious (standalone)
```

**Replace with:** specific, sensory, measurable descriptions.

---

## Appendix A: Full Copy Template (Copy-Paste Ready)

Use this as the canonical draft for the Ark Coffee & Eatery page. Replace bracketed values.

```
--- NAVBAR ---
Logo: Ark Coffee
Links: Menu | Gallery | Location | FAQ
CTA: Order

--- HERO ---
H1: Specialty coffee, comfort food
Sub: Selected beans from Gayo and Lampung, brewed by experienced baristas.
     Coffee, non-coffee, main courses, and pastry — all made fresh.
     Open daily 7 AM–10 PM at Jl. Merdeka No. 12, Bandung.
CTA: Order via WhatsApp
Secondary: View menu
Trust: 2,000+ customers · 4.9/5 rating

--- SOCIAL PROOF ---
Rating: 4.9/5 from 2,000+ customers
Testimonials:
1. "The palm sugar milk coffee is unbeatable, and the place is comfortable for working." — Rina, loyal customer
2. "Best place to work from in Bandung. WiFi is fast, coffee is great." — Andi, remote worker
3. "The beef burger is huge and delicious. Worth every rupiah." — Sari, foodie

--- FEATURES ---
Heading: Why Ark Coffee & Eatery
1. Selected beans — Single origin Gayo and Lampung, roasted fresh weekly.
2. Fast WiFi — Free, reliable WiFi and power outlets at every table.
3. Open daily — 7 AM–10 PM, every day of the week.
4. Workspace friendly — Comfortable seating, quiet corners, and plenty of outlets.

--- MENU ---
Heading: Ark Coffee & Eatery Menu
Sub: Specialty coffee, non-coffee, main courses, and pastry. Brewed and cooked fresh every day.

Coffee:
- Espresso — Rp 18,000 — Single origin Gayo, bold and clean.
- Americano — Rp 22,000 — Espresso with hot water, light and refreshing.
- Latte — Rp 28,000 — Espresso with steamed milk, smooth. [Best seller]
- Kopi Susu Gula Aren — Rp 25,000 — Our signature. Perfectly sweet, aromatic palm sugar. [Best seller]

Non-Coffee:
- Matcha Latte — Rp 30,000 — Japanese matcha with fresh milk.
- Chocolate — Rp 26,000 — Belgian chocolate, creamy and warm.
- Lemon Tea — Rp 20,000 — Black tea with fresh lemon, served iced.

Main Course:
- Ark Fried Rice — Rp 35,000 — Special fried rice with egg, chicken, and crackers. [Best seller]
- Chicken Sandwich — Rp 32,000 — Grilled chicken, lettuce, tomato, special sauce.
- Beef Burger — Rp 45,000 — 150g beef patty, cheese, lettuce, fries.
- Pasta Aglio Olio — Rp 38,000 — Spaghetti with garlic, chili, and olive oil.

Pastry:
- Croissant — Rp 20,000 — Butter croissant, baked fresh every morning.
- Cinnamon Roll — Rp 22,000 — Cinnamon roll with cream cheese glaze.
- Banana Bread — Rp 18,000 — Soft banana bread with walnuts.

--- HOW IT WORKS ---
Heading: How it works
1. Come in — Find us at Jl. Merdeka No. 12, open daily 7 AM–10 PM.
2. Order your favorite — Choose from coffee, non-coffee, main courses, or pastry.
3. Stay a while — Find a comfortable seat, connect to WiFi, and enjoy.

--- GALLERY ---
Heading: Inside Ark Coffee & Eatery
Sub: Warm light, wooden tables, and the smell of fresh coffee.

--- LOCATION ---
Heading: Find us
Address: Jl. Merdeka No. 12, Bandung, West Java 40111
Hours: Monday–Sunday: 7 AM–10 PM
Parking: Street parking available in front of the café.
CTA: Get directions

--- FAQ ---
1. Do you have WiFi and power outlets? — Yes. Free WiFi and power outlets at every table.
2. Can I reserve a table for a group? — Yes. Use the reservation form below or message us on WhatsApp.
3. Do you have non-coffee options? — Yes. Matcha latte, chocolate, and lemon tea.
4. Is there parking? — Street parking is available in front of the café.
5. What are your opening hours? — We're open daily from 7 AM to 10 PM.

--- RESERVATION FORM ---
H2: Reserve a table
Sub: Fill in the form below, we'll confirm via WhatsApp within 1 hour.
Name: Full name (Jane Doe)
WhatsApp: WhatsApp number (0812-3456-7890)
Party size: Party size (2)
Date: Date
Time: Time
Notes: Notes (optional) (Window seat if possible)
Button: Send reservation
Privacy: We will not misuse your number. Confirmation via WhatsApp.
Success: Reservation received! We will confirm via WhatsApp within 1 hour.

--- FOOTER ---
Logo: Ark Coffee & Eatery
Tagline: Specialty coffee, comfort food.
Links: Menu | Gallery | Location
Address: Jl. Merdeka No. 12, Bandung
Phone: 0812-3456-7890
Instagram: @arkcoffee.eatery
Copyright: © 2026 Ark Coffee & Eatery. All rights reserved.

--- SEO ---
Title: Ark Coffee & Eatery — Specialty Coffee & Comfort Food in Bandung
Description: Selected beans, freshly brewed. Coffee, non-coffee, main courses, and pastry.
             Open daily 7 AM–10 PM at Jl. Merdeka No. 12, Bandung.
OG Image: /images/og-image.png
```

---

## Appendix B: Banned Words Quick Reference

| Banned | Replace with |
|--------|--------------|
| revolutionary | new / faster |
| game-changing | [specific outcome] |
| cutting-edge | modern / current |
| seamless | [describe the actual flow] |
| robust | reliable |
| scalable | grows with you |
| empower | help / let |
| unlock | get / access |
| supercharge | speed up |
| transform | change |
| leverage | use |
| best-in-class | [specific benchmark] |
| amazing | [specific sensory detail] |
| incredible | [specific sensory detail] |
| must-try | [specific description] |
| delicious (standalone) | [specific flavor/texture description] |

---

## Appendix C: Character Limit Quick Reference

| Element | Max chars |
|---------|-----------|
| `<title>` | 60 |
| Meta description | 160 |
| H1 | 60 (≤ 10 words) |
| Subheadline | 150 (≤ 25 words) |
| Feature title | 20 (≤ 4 words) |
| Feature description | 90 (≤ 15 words) |
| Menu item name | 30 |
| Menu item description | 90 (≤ 15 words) |
| Best-seller badge | 12 |
| CTA button | 20 |
| Form label | 30 |
| Error message | 60 |
| Success message | 80 |
| Testimonial | 140 |
| FAQ question | 80 |
| FAQ answer | 300 |
| Alt text | 125 |

---

**Last Updated:** 2026-11-17
**Document Version:** 1.0.0
**Status:** Production Ready
**Owner:** Ark Coffee & Eatery
**Next Document:** `cheatsheets.md` (quick reference for scripts, configs, snippets)

---

## V2 normative amendments — content governance
- Keep English (`lang="en"`), warm/conversational voice, sentence case, price format `Rp 28,000` as defined in v1. The formatting is a **style convention** and must be approved for the intended audience.
- `src/data/site.ts` and `src/data/menu.ts` are the canonical implementation data. This guide is the editorial source; the build data must match the approved content inventory.
- Use these content statuses: `DRAFT`, `NEEDS_FACT_CHECK`, `APPROVED`, `RETIRED`. No `NEEDS_FACT_CHECK` claims may ship.
- Required owner sign-off: business address/map pin, opening hours and booking cutoff, phone, domain, social handle, full 14-item menu with current prices and availability, ingredient claims, facilities, testimonials, rating source/date, customer counts, and response-time promise.
- SocialProof section must **not** invent 4.9/5, 2,000+ visitors, or testimonials. Until evidence is provided, use a neutral invitation or verified feature-focused message without a numeric claim.
- Distinguish **reservation request received** from **table confirmed**. Canonical success copy: `Thanks — your reservation request was received. We'll contact you on WhatsApp to confirm availability.` No one-hour SLA unless owner approved.
- Canonical error copy: `We couldn't send your request. Please try again or contact us on WhatsApp.` Never claim success if backend write is unverified.
- Privacy copy must accurately describe use of personal data, where it is stored, retention period, and how to request deletion. A vague promise not to “misuse” data is not sufficient; obtain business-owner approval.
- No sample personal data, invented reviews, fabricated menu provenance, or placeholders in published structured data. For SEO, use only verifiable LocalBusiness attributes and canonical live URLs.
- Content inventory IDs: `COPY-NAV`, `COPY-HERO`, `COPY-PROOF`, `COPY-FEATURES`, `COPY-MENU`, `COPY-STEPS`, `COPY-GALLERY`, `COPY-LOCATION`, `COPY-FAQ`, `COPY-FORM`, `COPY-FOOTER`, `COPY-SEO`. Each records reviewer, date, approval status, and implementation location.
- The 14 items, six gallery images, and 11 sections are *specification counts*, not evidence that real photos/prices/claims have been obtained.
