# Banana Hacks — Project Summary

## Overview

**Banana Hacks** is a hackathon website for a week-long virtual generative AI & image creation hackathon (Oct 9–16, 2026). The site is built with Next.js 14 and styled with a **medieval/fantasy RPG aesthetic** sourced from hackUMBC 2025 design guidelines.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion v11 |
| Utilities | clsx |
| Other | Google APIs (googleapis) |

Dev server: `npm run dev` → `localhost:3000`

---

## Architecture

Standard scrollable single-page layout. All sections are React components under `src/components/sections/`.

**Page structure (`src/app/page.tsx`):**
```
<Navbar />
<Hero />
<About />
<Tracks />
<Prizes />
<FAQ />
<Apply />
<Footer />
```

---

## File Map

```
src/
  app/
    globals.css        — custom CSS, animations
    page.tsx           — root page, assembles all sections
  components/
    sections/
      Navbar.tsx
      Hero.tsx
      About.tsx
      Tracks.tsx
      Prizes.tsx
      FAQ.tsx
      Apply.tsx
      Footer.tsx
design_guidelines.json  — full design spec (colors, typography, components)
```

---

## Design System

**Source:** hackUMBC 2025 design guidelines (`design_guidelines.json`)

**Tone:** Medieval / fantasy RPG — warm parchment, crimson + gold, serif bracketed headings, blackletter numerals

### Color Palette

| Token | Hex | Role |
|---|---|---|
| `background_primary` | `#D4B896` | Page background |
| `background_secondary` | `#C9A97E` | Secondary bg |
| `surface_dark` | `#6B1A28` | Cards, dark sections |
| `surface_dark_hover` | `#7D2233` | Hover state |
| `surface_card_tan` | `#C9A240` | Prize card 1 |
| `surface_card_olive` | `#7A8A3A` | Prize card 2 |
| `surface_card_sienna` | `#A84A28` | Prize card 3 |
| `surface_card_dark_olive` | `#4A5A1E` | Prize card 4 |
| `text_on_light` | `#2A1A0E` | Body text on light bg |
| `text_on_dark` | `#F5ECD8` | Text on dark surfaces |
| `accent_gold` | `#C8A840` | Gold accent |
| `accent_gold_bright` | `#E8C850` | Bright gold |
| `accent_crimson` | `#6B1A28` | Timeline, dots |
| `tag_food` | `#C8A8F0` | Lavender tag |
| `tag_event` | `#F0C870` | Amber tag |
| `tag_workshop` | `#A8D890` | Sage green tag |

### Typography

| Use | Font |
|---|---|
| Display / headings | MedievalSharp, Cinzel, serif |
| Body | system-ui, -apple-system, sans-serif |
| Stat numbers | UnifrakturMaguntia, MedievalSharp, blackletter |
| Mono | monospace |

- Section titles formatted as `{ TITLE }` — uppercase, 700 weight, 0.08em letter-spacing
- Nav links — uppercase, 600 weight, 0.05em letter-spacing
- Body text — 0.9375rem, line-height 1.6

### Layout

- Max content width: `900px`
- Section padding: `80px` vertical, `48px` horizontal
- Navbar: `80px` tall, sticky, transparent with dark gradient from top

### Components

**Navbar** — transparent dark-gradient top, logo left, links center, no CTA button, no border-bottom

**Section headings** — `{ HEADING }` format, centered, sub-label below

**Prize cards** — 4-column grid, `rounded-2xl`, no border/shadow, icon top-center, each card a unique color (tan, olive, sienna, dark olive)

**Stat cards** — 4-column grid, `surface_dark` bg, 2px ornamental gold border, blackletter numbers, gold text, `rounded-xl`

**FAQ accordion** — `surface_dark` container, 32px padding, 2-column grid, `▼` arrow toggle right-aligned

**Schedule timeline** — horizontal scroll, crimson line + dots, white cards, events tagged Food/Event/Workshop

**Workshop cards** — `surface_dark` outer container, semi-transparent inner cards, gold host label

**CTA buttons** — pill/`rounded-full`, `surface_dark` bg, light text, 16px 32px padding, arrow suffix (`→`), slightly lighter on hover

**Social footer** — circular brand-color icon badges, uppercase labels, horizontal centered row

### Decoration & Motion

- Section title brackets: `{ }`
- Stat card corner ornaments
- Sparkle stars on hero
- Timeline dot markers
- Subtle grain texture on background
- Optional sparkle cursor trail
- Cards: slight scale/shadow lift on hover
- Accordion arrow rotates on open

---

## Notes

- The project previously used a **desktop OS simulation** paradigm (macOS-style draggable windows, Photoshop-style toolbar). The current codebase has been refactored into a standard scrollable sections layout.
- `design_guidelines.json` at the project root is the authoritative source for all visual decisions.
