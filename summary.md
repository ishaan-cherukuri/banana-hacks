# Banana Hacks — project summary

A website for **Banana Hacks 2026**, a free, international, fully online hackathon about
generative AI and image creation, running **October 9–12, 2026**. Organised by Ishaan Cherukuri
and a student-run team. Open to everyone, everywhere, at any age; built for students and
first-time hackers.

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router), React 18, TypeScript |
| Styling | Tailwind CSS v3 + a hand-written design system in `src/app/globals.css` |
| Database | Turso / libSQL (`@libsql/client`) — registrations |
| AI Studio | LightX API, proxied server-side so the key never reaches the client |
| Hosting | Vercel |

`npm run dev` · `npm run build` · `npm run type-check`

## Architecture — two parallel surfaces

The site is **not** a conventional scrolling landing page.

1. **`/` — a desktop-OS simulation.** `Desktop.tsx` renders a menu bar, a dock, and draggable
   `Window`s whose contents are the panels in `src/components/panels/`. This is the experience.
2. **`/about`, `/schedule`, `/prizes`, `/faq`, `/sponsors`, `/register`, `/code-of-conduct` —
   server-rendered content pages** sharing `seo/PageShell`. The OS homepage renders almost no text
   into the initial HTML, so these are what search engines and screen readers can actually read.

Both read from **`src/lib/content.ts`**, the single source of truth for FAQs, schedule, sponsors,
tracks, judging criteria, eligibility, and the policy text. Event identity, contact details and
canonical URL live in **`src/lib/site.ts`**. Change facts in those two files, not in components.

```
src/
  app/
    layout.tsx            root metadata + Organization/Event JSON-LD
    page.tsx              SeoContent + Desktop
    globals.css           the design system — read the header comment first
    (info)/               crawlable content pages + shared chrome
    api/apply             registration POST → Turso
    api/sketch2image      LightX proxy
  components/
    Desktop.tsx           window manager, dock, landmarks
    Window.tsx            window chrome, drag/resize/minimize/maximize
    HeroSection.tsx       the hero, countdown, sponsor row
    panels/               window contents, incl. InfoPanel ("Get Info")
    seo/PageShell.tsx     one H1, breadcrumbs, per-page JSON-LD
  lib/
    site.ts               identity, contact, canonical URL, page map
    content.ts            all event content + policies
```

## Design

The visual system is documented and deliberate — hard ink borders, zero-blur offset shadows, flat
paper fills, Bricolage Grotesque / Instrument Sans / Space Mono. **Read `DESIGN-SYSTEM.md` and the
header comment in `globals.css` before adding styles.** Notably: text is ink at ≥65% opacity
(below that it fails AA on the banana and vine fills), and elevation encodes CTA priority.

## Related documents

- `DESIGN-SYSTEM.md` — tokens, CTA tiers, focus token, and the reasoning behind each
- `AUDIT.md` — the quality audit this pass worked from, with ranked priorities
- `SECURITY-REMEDIATION.md` — **open item.** Credentials and registrant data were committed to a
  public repo; rotation and history purge are still outstanding.
- `seo/` — keyword strategy and Search Console setup notes
