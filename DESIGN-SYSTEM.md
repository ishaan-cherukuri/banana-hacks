# Design system — BananaHacks 2026

**Direction: extend, don't replace.**

The committed system (`globals.css`, `tailwind.config.ts`) already has a real point of view — hard
ink rules, zero-blur offset shadows, flat paper fills, a marker swipe instead of gradient text, and
a non-default type trio. It is documented with reasons and it is *not* generic. Re-theming it would
be the trend-following move the brief warns against, and would throw away work that is already good.

So this pass adds only what the audit proved missing, and each addition has to earn its place.

**Calibration note.** Cream + warm accent is one of the current AI-default looks. This palette is
adjacent to it but not it: the display face is a *grotesque* with quirky terminals, not a
high-contrast serif; the accent is a saturated banana yellow, not terracotta; and the second colour
is a deep teal deliberately chosen against the indigo/violet default. The brief pins cream #FFFBF0 +
one sharp accent, and the brief's words win. What follows spends its freedom on **structure**
(elevation, focus, provenance) rather than on a re-skin.

---

## The subject

A free, international, online generative-AI hackathon, **open to all but aimed at students**,
organized by Ishaan Cherukuri. The homepage's single job: convince a first-time visitor — often a
student, sometimes their parent or teacher — that this is **real**, then get them registered.

The site's governing metaphor is a **desktop OS for an art studio**. Every addition below is
derived from that metaphor rather than bolted onto it.

---

## 1. Colour tokens

Unchanged from the committed palette. Documented here because the audit changed one *rule* about it.

| Token | Value | Reason |
|---|---|---|
| `--paper` / `studio.paper` | `#FFFBF0` | Warm cream page. Brief-mandated. Warmer than the AI-default `#F4F1EA`, which keeps it in banana territory rather than "generic cream". |
| `--ink` / `studio.ink` | `#191A17` | Near-black with a green cast, not pure black — sits with the cream instead of vibrating against it. Carries every border and shadow. |
| `--banana` / `banana.400` | `#FDD835` | The one sharp accent. Reserved for **primary action and focus only** (see §3). |
| `--vine` / `vine.500` | `#2C7466` | Deep teal. The single most important anti-slop choice in the palette: it is the complement banana needs, and it is explicitly *not* the periwinkle/indigo every generated page reaches for. |
| `studio.alert` | `#B23617` | Error **text**. 5.92:1 on paper. |
| `studio.ripe` | `#E2542A` | Error/attention **fills and borders only**. 3.67:1 — never as text. |

### Contrast floor — changed
The old rule in `globals.css` was "text is ink at ≥60% opacity." Measured, `ink/0.60` fails AA on
every non-paper surface (4.49 on banana-200, 4.10 on banana-400, 4.07 on vine-200).

> **New rule: `ink/0.65` is the floor for text on any surface.**

`ink/0.65` measures 4.72–5.35:1 across all five fills — passes AA everywhere with margin, and is
one step, not a redesign. Anything quieter than that must be non-text or `aria-hidden`.

---

## 2. Type

Unchanged. Restated so the reasons survive.

| Role | Face | Reason |
|---|---|---|
| Display | **Bricolage Grotesque** 400–800 | Genuinely quirky terminals and apertures; reads as *chosen*. Explicitly not Inter/Roboto/Arial. |
| Body | **Instrument Sans** 400–700 | Clean at small sizes without being neutral-to-the-point-of-default. |
| Utility | **Space Mono** 400/700 | Slab-ish mono carries the "studio machine" tone all the OS chrome depends on. Used for labels, eyebrows, timestamps, window titles — data, never prose. |

Headings get `letter-spacing: -0.022em` because Bricolage runs wide by default and needs pulling
tight to read as set type.

---

## 3. Elevation encodes priority — the CTA fix

**The problem:** the hero's two CTAs are identical in size, weight, padding and radius. Only fill
colour separates them, and fill colour alone is a weak signal (and invisible to some users).

**The rule:** in an OS, a raised object is one you can press. So elevation — not colour — carries
priority.

| Tier | Spec | When |
|---|---|---|
| **Primary** | banana-400 fill · 1.5px ink border · `3px 3px 0` ink shadow · `press` physics | Exactly one per view. Always the registration path. |
| **Secondary** | paper fill · 1.5px ink border · **no shadow** · no travel on hover | Real alternatives. Flat = available, not urgent. |
| **Tertiary** | ink text · 1.5px underline · no border, no fill | Navigational asides. |

The secondary tier losing its shadow is the whole idea: primary literally sits above the page,
secondary sits on it. That is legible at a glance, survives greyscale, and is a rule the rest of the
system already implies rather than a new visual language.

Applied: hero keeps **Apply Now** primary; **Try AI Studio** becomes secondary.

---

## 4. Focus token — new

The audit found every focusable element falling back to the browser's `1px auto` ring. It passes,
but on a design built from 1.5px ink and hard offset shadows it reads as unstyled.

```css
--focus-ring: 2.5px solid var(--ink);
--focus-offset: 2px;
```

`:focus-visible` draws a hard ink box, offset 2px, around the element — the same drawn-with-a-pen
language as every border and shadow in the system, so focus looks *designed* rather than defaulted.
On banana-400 surfaces the ink ring still clears 7.4:1, so it is visible on the accent as well as on
paper. `:focus-visible` (not `:focus`) so mouse users never see it.

---

## 5. Signature element — the "Get Info" window

**The audit's sharpest finding was that the site never says who runs it.** Four of six ten-second
questions pass; the two that fail are both trust questions.

The template answer is a footer with an about blurb. But this homepage is a desktop OS, and an OS
already has a canonical place for "what is this thing and who made it": **Get Info** (⌘I) — and the
app menu's "About" item.

So the trust layer becomes a **Get Info window**, reached from the menu bar's app name exactly where
an OS puts it. It contains, as an info panel and not as marketing:

- **Organizer** — Ishaan Cherukuri, named, with the event described as student-organized
- **Contact** — `team@bananahacks.tech`, a real mailto
- **Eligibility** — open to all ages and all countries, aimed at students, stated plainly
- **Code of Conduct** — reachable here rather than only from inside the form
- **Community** — Discord, described honestly as "invite arrives by email" while no link exists
- **Sponsors** — the four real logos, currently hidden behind the dock

Why this and not a footer: it is derived from the subject's own world rather than applied to it, it
puts provenance exactly where a user of this metaphor would look, and it converts the site's biggest
weakness into the one screen it is most likely to be remembered for. It reuses `Window` and the
existing panel pattern — no new component language.

The same content ships server-rendered on the `(info)` pages, so it is crawlable and available
without JavaScript. **The Get Info window is the presentation, not the source of truth.**

---

## 6. Spacing, radius, shadow — unchanged

| Token | Value | Reason |
|---|---|---|
| Radius | `--r-sm: 4px`, `--r-md: 8px` | Two values only. A radius scale with seven steps is a tell. |
| Shadow | `3px 3px 0` (cards), `5px 5px 0` (windows), `2px 2px 0` (small) | Zero blur, always. A hard edge is a print decision; a soft blur is a default. |
| Spacing | Tailwind's default 4px scale | No reason to invent one; the grid wallpaper is already 24px, a clean multiple. |

---

## 7. Component inventory — reuse first

| Component | Action |
|---|---|
| `Window`, `Desktop`, `MenuBar`, panels, `PageShell`, `PolicyModal`, SVG marks | **Reuse.** Fix bugs, don't restyle. |
| `.hard-card`, `.hard-card-sm`, `.press`, `.eyebrow`, `.marker-hi` | **Reuse.** These are the system. |
| `.btn-primary` / `.btn-secondary` / `.btn-tertiary` | **New** — codifies §3 so the tiers stop being hand-rolled per call site. |
| `:focus-visible` token | **New** — §4. |
| `InfoPanel` (Get Info) | **New** — §5, built from existing panel conventions. |
| `NavBar`, `InfoSidebar`, `Toolbar`, `DesktopIcon` | **Delete.** Dead code, and the home of the false "MLH Member Event" badge. |

---

## 8. What I am deliberately not doing

- **Not** re-theming. The palette and type are good and brief-mandated.
- **Not** adding a dependency. `framer-motion` is already installed and unused; the answer is to
  remove it, not to start using it.
- **Not** adding motion. Two loops is the right number.
- **Not** keeping the six ornaments in the illustration panel. Chanel's rule: the panel's job is to
  carry the mascot and the sponsors. The sparkles and clusters go so the sponsors can be seen.
