# AUDIT — BananaHacks 2026

**Date:** 2026-08-25 · **Commit:** `6129216` · **Method:** production build (`next build` + `next start`),
rendered in Chromium via Playwright MCP at 360 / 768 / 1024 / 1440, Lighthouse + performance traces
via Chrome DevTools MCP, plus the `web-quality-audit` / `accessibility` / `seo` / `best-practices`
skill workflows. Screenshots in `audit/screenshots/`.

> Nothing here is inferred from source alone unless it says "source only". Every user-facing claim
> was reproduced in a browser.

---

## 0. Evidence baseline

| Signal | Scope | Result | Source |
|---|---|---|---|
| Accessibility | `/`, mobile navigation | **100** | Lighthouse |
| Best Practices | `/`, mobile navigation | **100** | Lighthouse |
| SEO | `/`, mobile navigation | **100** | Lighthouse |
| Agentic Browsing | `/`, mobile navigation | **100** | Lighthouse |
| Accessibility / BP / SEO | `/register`, mobile | **100 / 100 / 100** | Lighthouse |
| LCP | `/`, desktop, local prod | **209 ms** | DevTools trace |
| CLS | `/`, desktop, local prod | **0.00** | DevTools trace |
| TTFB | `/` | 4 ms | DevTools trace |
| Console errors | `/`, `/register` | **0** | Playwright + DevTools |
| First Load JS | `/` | 118 kB (content pages 96 kB) | `next build` |
| Static HTML smoke test | 8 built pages | 0 issues | `analyze.sh` |

**The automated targets in the brief are already met.** Lighthouse ≥90 on all four and zero console
errors were true *before* any change. That is the important framing for everything below: the
remaining problems are the ones automation cannot see — broken interactions, dead ends, untrue
copy, missing structure, and a public data exposure. **Do not read the four 100s as "the site is
fine."**

---

## 1. Critical

### C1 — Public repo exposes live credentials and ~1,227 registrants' personal data
`send_emails.py:8`, `send_batch.py:9`, `test_send.py:8`, `submissions_daily/*.csv`,
`banana_hacks_emails.json`

`github.com/vihaan-cherukuri/banana-hacks` is **public** (`gh repo view` → `"visibility":"PUBLIC"`).
Tracked in it: a hardcoded Zoho SMTP app password for `team@bananahacks.tech` (3 files) and 1,227
rows of registration data with columns `name, email, emergency_name, emergency_phone, project_idea`.

> **Correction.** An earlier pass of this audit also listed the Resend key as hardcoded. It is not —
> `send_followup.py`, `send_schools.py` and `test_resend.py` already read
> `os.getenv("RESEND_API_KEY")` via `dotenv`. The exposure is the **SMTP password and the registrant
> data only**.

- **Impact:** Anyone can send mail as the event, and the emergency-contact name and phone number of
  every registrant is public. The audience includes students.
- **Evidence:** `git ls-files` confirms all six scripts are tracked; CSV header read directly;
  repo visibility from the GitHub API.
- **Fix:** Rotate both secrets first (they are already exposed — removing them from the repo does
  not un-expose them), move to env vars, untrack the data files, then purge history. Runbook in
  `SECURITY-REMEDIATION.md`. *Per your instruction I have prepared but not executed this.*

### C2 — Minimizing any window permanently orphans it; registration becomes unreachable
`src/components/Window.tsx:144` + `src/components/Desktop.tsx:61-69`

`setMinimized(true)` causes `if (minimized) return null`. `minimized` is state **local to `Window`**,
but the dock's restore path (`openWindow`) only bumps `zIndex` on a window already in `openWindows` —
it never clears `minimized`.

- **Impact:** Clicking the "–" button on the Apply window destroys the registration form with **no
  recovery except a full page reload**. The dock keeps showing Apply as running, so the user's
  obvious remedy — clicking the dock icon — does nothing. This silently kills conversions.
- **Evidence:** Reproduced in Playwright. After minimize → click Apply dock icon:
  `{ applyWindowVisible: false, dockShowsApplyRunning: [true], formPresent: false }`.
- **Fix:** Lift `minimized` into `Desktop`'s window state so the dock can restore it.

### C3 — International phone numbers are silently truncated, corrupting emergency contacts
`src/components/panels/ApplyPanel.tsx:49-53`

`formatPhoneNumber` does `.replace(/\D/g,"").slice(0,10)` and validation requires ≥10 digits. Any
11-digit national number loses its last digit **and still passes validation**.

- **Impact:** For a hackathon that advertises 60+ countries, the emergency contact — the one field
  that exists for safety — is stored wrong, with no error shown to anyone.
- **Evidence:** Executed the shipped function in-page:

  | Typed | Stored | Digits |
  |---|---|---|
  | UK `020 7946 0958` | `020 794 6095` | 11 → 10 |
  | Germany `030 12345678` | `030 123 4567` | 11 → 10 |
  | Nigeria `0803 123 4567` | `080 312 3456` | 11 → 10 |
  | France `01 42 68 53 00` | `014 268 5300` | regrouped |
  | US `415 555 0132` | `415 555 0132` | ✅ |

- **Fix:** Stop reformatting. Accept 6–15 digits per E.164, keep the user's spacing, validate on
  digit count only. Also expand or replace the 20-entry `COUNTRY_CODES` list (`ApplyPanel.tsx:20-41`).

---

## 2. High — truth & trust

### T1 — Hero stats contradicted the rest of the site *(resolved by you: both numbers are real)*
`HeroSection.tsx:294-296`, `about/page.tsx:14-19` vs `content.ts:41`, `prizes/page.tsx:41`, `SeoContent.tsx:44`

The hero ships `$10K Prizes` and `60+ countries`; `/prizes`, the FAQ and the SEO block simultaneously
say the pool "is being finalised". A visitor comparing two pages sees the site contradict itself,
which reads as fabricated numbers even though you have confirmed both are real.

- **Fix:** Keep the numbers; correct the "being finalised" copy so the *total* is stated as known and
  only the *per-category breakdown* is pending.

### T2 — Dead trust UI at the highest-intent moment
| Location | Problem |
|---|---|
| `ApplyPanel.tsx:148` | Post-registration **"Join Discord" button does nothing** (`href: null`) |
| `MenuBar.tsx:33-34` | "Discord Community" and "Contact Organizers" are actionless `<button>`s |
| `NavBar.tsx:71,80,89` · `InfoSidebar.tsx:36,46,56` | Every social link is `href="#"` *(dead code — see H4)* |

The Discord button is the worst: it appears immediately after a successful signup, when the user is
most willing to act, and it does nothing.

### T3 — No organizer is named anywhere; contact details are inconsistent
`site.ts:11-12`, `PolicyModal.tsx:47`, `(info)/layout.tsx:97`

`siteConfig.organizer` is `"Banana Hacks"` — self-referential — and the JSON-LD `Organization` has no
founder. The only email surfaced site-wide is `sponsorships@bananahacks.tech`, which tells a
prospective *participant* to email the sponsorship inbox. A third address,
`bananahacks@gmail.com`, appears only inside the Code of Conduct modal.

- **Impact:** A parent or teacher evaluating legitimacy finds no human, no general contact, and
  three different answers about how to reach anyone.

### T4 — The success screen promises an email that is never sent
`ApplyPanel.tsx:141-144` vs `src/app/api/apply/route.ts`

"Check **{email}** for your confirmation. We'll send Discord access and event notices before Oct 9."
`/api/apply` only performs an `INSERT`. No mail is sent from the application at all; confirmations
appear to go out by hand via the Python scripts.

### T5 — Code of Conduct is unreachable except from inside the form
`PolicyModal.tsx` is rendered only by `ApplyPanel`. There is no CoC link in the footer, on any
`(info)` page, or in the sitemap — so it is also uncrawlable. `PolicyModal.tsx:47` additionally reads
"Report concerns to **a** organizer", and cites the MLH CoC as plain text rather than a link.

### T6 — No eligibility or age statement exists *(resolved by you: open to all, aimed at students)*
Neither `content.ts` `FAQS`/`ELIGIBILITY` nor any page states who may enter by age. Meanwhile the form
requires an emergency contact and warns "don't use your school email" — signals that read as
minors-only — while the copy pitches LoRA/DreamBooth/ControlNet. The site never resolves this for a
visitor.

### T7 — Canonical URL points at a host that redirects
`src/lib/site.ts:5`

`siteConfig.url` is `https://bananahacks.tech`, but that host **307-redirects to `https://www.bananahacks.tech/`**
(verified with `curl -sI`). Every canonical tag, `og:url`, sitemap entry, JSON-LD `@id`, and
`robots.txt`'s `Host:` therefore names a non-serving host. Live HTML confirms:
`<link rel="canonical" href="https://bananahacks.tech"/>`.

- **Fix:** One line — make `url` the `www` host. (Or flip the Vercel redirect. Pick whichever host
  you want to be canonical, but the site and the DNS must agree.)

---

## 3. High — accessibility (all missed by Lighthouse's 100)

### A1 — The homepage has no landmarks and no skip link
`curl -s localhost:3002/ | grep -oE "<main|<nav|<header|<footer|skip"` returns **nothing**. The entire
OS simulation is unlabelled `<div>`s. A screen-reader user gets no structure, no way to jump to
content, and no way to enumerate regions. (The `(info)` pages are fine — they have `header`/`main`/
`nav`/`footer`.)

### A2 — The first 11 keyboard tab stops are invisible
`SeoContent.tsx` is `sr-only` but fully focusable. Tabbing from the top of the homepage moves through
11 off-screen links (`full schedule`, `Read more about the event`, … the six page-title links) before
reaching the first visible control. The focus ring is real but painted on off-screen content, so the
user sees focus simply vanish.

- **Evidence:** Tab-order walk returned 11 `<a>` elements with `focusVisible: true` before the first
  visible `<button>` ("Banana Hacks").
- **Fix:** Add a skip link, and reveal the SEO block on focus (`:focus-within`) so focus is never lost.

### A3 — Form errors are invisible to assistive tech
`ApplyPanel.tsx:96-108, 202, 218, …`

On a failed submit the panel renders 7 visible errors but, measured in-page:
`{ ariaInvalidCount: 0, ariaDescribedByCount: 0, liveRegions: 0 }`, and
`focusAfterFailedSubmit: "BUTTON submit"`.

- **Impact:** WCAG **3.3.1** (Error Identification) and **4.1.3** (Status Messages). A screen-reader
  user presses Submit, hears nothing, and has no idea the form failed. Focus stays on the button
  while the first error is scrolled off-screen.
- **Fix:** `aria-invalid` + `aria-describedby` per field, an `aria-live` summary, and move focus to
  the first invalid field.

### A4 — The terms checkbox is invalid ARIA
`ApplyPanel.tsx:381-410`

A `<div role="checkbox" tabIndex={0}>` contains two nested `<button>` elements (Code of Conduct,
Submission Rules). Interactive descendants inside a `checkbox` role are not permitted; the accessible
name is also polluted by the nested link text. It has no focus-visible styling of its own.

- **Fix:** Native `<input type="checkbox">` + `<label>`, with the policy buttons moved out as siblings.

### A5 — Windows have no dialog semantics, no Escape, and no focus management
`Window.tsx:147-190`

Opening a window neither moves focus into it nor announces it. There is no `Escape` handler, no
`role`, no `aria-labelledby` tying the window to its title. Drag and resize are `onMouseDown`-only
(acceptable — mobile uses a full-screen sheet — but it means no keyboard move/resize at all).

### A6 — Contrast: the documented "≥60% ink" rule is not sufficient
`globals.css:20` states "Text is ink at ≥60% opacity." Measured, that floor fails AA on every
non-paper surface:

| Surface | ink/0.60 | ink/0.65 |
|---|---|---|
| paper `#FFFBF0` | 4.53 ✅ | 5.35 ✅ |
| banana-200 `#FFF8DC` | **4.49 ❌** | 5.29 ✅ |
| banana-300 `#FFEE82` | **4.34 ❌** | 5.08 ✅ |
| banana-400 `#FDD835` | **4.10 ❌** | 4.75 ✅ |
| vine-200 `#C4E0D9` | **4.07 ❌** | 4.72 ✅ |

Live usages at `/60` are all placeholder text (`ApplyPanel.tsx:199,215,232,277,374`;
`SketchPanel.tsx:253`) plus one real 9px label (`SketchPanel.tsx:342`).

**Good news:** the config's own warnings were obeyed — `studio-ripe` (3.67, fails) is never used as
text, and `banana-600` (1.81) appears only on `aria-hidden` bullets. The token discipline is working;
the stated floor is just one step too low.

### A7 — Focus rings are the browser default
Every focusable element falls back to the UA `1px auto` ring. It's present and passes, but on a design
built from 1.5px ink borders and hard offset shadows it reads as unstyled. No focus token exists.

---

## 4. Medium — layout & responsive

### L1 — Hero badges straddle the illustration plate at every desktop width
`HeroSection.tsx:281-296`

The plate is `inset: 28px 20px` on the panel, but the badges are positioned against the **panel**
(`top-8 left-6`, `right-2`, `bottom-12 right-6`). At 768, 1024 and 1440 all four badges cut across the
plate's ink border. It reads as broken alignment, not deliberate overlap.
*See `before-home-768.png`, `before-home-1024.png`, `before-home-1440.png`.*

### L2 — The sponsor strip is permanently hidden behind the dock
`HeroSection.tsx:300` puts it at `bottom-4` of the illustration panel; the dock is `fixed bottom-0`
with `zIndex 9000`. At every desktop width the logos render as a clipped sliver.
**The only sponsor credit on the homepage is invisible** — which matters commercially.

### L3 — The illustration turns on at 768px, where it doesn't fit
`HeroSection.tsx:258` uses `hidden md:flex` at `width: 38%`. At 768 that is ~292px — too narrow for a
180px mascot plus four badges plus a 150px neural net, which is why L1 is worst there. Should be `lg:`.

### L4 — The dock overflows at 360px and clips the primary CTA
Measured: `{ clientW: 360, scrollW: 379, overflowing: true }`. The overflow falls on the **right**,
where the separated yellow **Apply** button lives. On the narrowest common phone the main CTA is the
one thing cut off. *See `before-home-360.png`.*

### L5 — Wasted horizontal space at ≥1024
Hero body copy is capped at `max-w-md` / `max-w-xl` inside a ~650px column, leaving a large dead gap
before the illustration panel. *See `before-home-1024-scrolled.png`.*

### L6 — Dock tap targets are 40×40
Below the 44–48px comfortable minimum (passes WCAG 2.2 AA's 24px floor, so this is usability, not a
violation). The dock is also the homepage's **only** navigation and its items are icon-only with
hover-tooltips — which do not exist on touch. A first-time mobile visitor cannot tell what any icon
opens.

---

## 5. Medium — best practices & hygiene

### B1 — No security headers
Live response carries only `strict-transport-security`. No CSP, `X-Frame-Options`,
`X-Content-Type-Options`, `Referrer-Policy`, or `Permissions-Policy`. Add via `next.config.mjs`
`headers()`. *(No source maps are exposed — that check passed.)*

### B2 — Production build was broken without env vars *(fixed during this audit)*
`src/lib/db.ts` called `createClient` at module scope, so `next build` crashed collecting page data
for `/api/apply` on any machine without Turso secrets — a fresh clone could not build.
Made lazy in `getDb()`; build now succeeds. This was fixed early because it blocked all measurement.

### B3 — Two unused dependencies
`framer-motion` (v11) and `googleapis` are installed but imported nowhere in `src/`. All animation is
hand-rolled CSS.

### B4 — Four dead components
`NavBar.tsx`, `InfoSidebar.tsx`, `Toolbar.tsx`, `DesktopIcon.tsx` are imported by nothing.
They matter because they are where the *false* claims live: `InfoSidebar.tsx:154` renders an
**"MLH Member Event 2026"** badge (you confirmed this event is **not** an MLH member event) and
`InfoSidebar.tsx:31` a `$10K+ total` fact row. `NavBar.tsx:29-31` also still carries the
`backdrop-filter: blur(16px)` glassmorphism the rest of the system deliberately rejects. If anyone
ever re-imports these, the site starts making a false affiliation claim.

### B5 — Stale documentation actively misleads
`summary.md` and `design_guidelines.json` describe a **medieval/fantasy RPG aesthetic** from
hackUMBC 2025, a `src/components/sections/` layout, and a 3-day Oct 9–16 event. None of it is true.
`public/umbc/index.html` is an orphaned standalone page loading Google Fonts.

### B6 — Undocumented registration deadline
`ApplyPanel.tsx:182` says "Registration closes Oct 8" — a date that appears nowhere else: not in
`SCHEDULE`, not in the FAQ, not on `/register`.

### B7 — 14.4 kB of legacy JavaScript
DevTools `LegacyJavaScript` insight: transpiled/polyfilled Baseline features. Estimated savings
FCP 0 ms / LCP 0 ms — cosmetic only. Lowest possible priority.

---

## 6. Design review — is it "AI slop"?

**Largely no, and that deserves saying.** The `6129216` pass did real work. Checked against the usual
tells:

| Tell | Status |
|---|---|
| Default gradients | ✅ Absent — `.banana-gradient-text` is a clip-path marker swipe, not a gradient |
| Glassmorphism | ✅ Absent from live code (only in dead `NavBar.tsx`) |
| Purple/blue AI palette | ✅ Deliberately avoided — teal `vine` chosen against it, with the reason in the config |
| Inter/Roboto/Arial | ✅ Bricolage Grotesque / Instrument Sans / Space Mono |
| Diffuse shadows & glows | ✅ All shadows are zero-blur offsets |
| Uniform rounded cards | ✅ Two radii total (`4px`, `8px`) |
| Emoji icons | ✅ Replaced with drawn marks — reasoned in `Desktop.tsx:37` |
| Undifferentiated 3-card grid | ⚠️ `HeroSection.tsx:196` "The Basics" is exactly this, and the weakest block on the page |
| Decorative elements with no purpose | ⚠️ `PixelCluster` ×2, `PixelSparkle` ×2, `LeafDecor`, plus a `NeuralNetSVG` that overflows its plate — six ornaments in one panel, which is what makes L1 read as noise |
| Gratuitous motion | ✅ Two loops only (mascot, scroll cue), `prefers-reduced-motion` handled |

**The real design problems are not slop — they are hierarchy problems:**
- **Competing CTAs** (`HeroSection.tsx:162-175`): "Apply Now" and "Try AI Studio" are the same size,
  weight, padding and radius; only fill colour separates them. Confirmed suspicion #4.
- **Icon-only navigation**: the dock is the sole homepage nav, unlabelled, tooltip-on-hover.
- **The illustration panel is over-decorated and under-informative** — six ornaments, and the one
  genuinely useful thing on it (sponsors) is hidden behind the dock.

## 7. Ten-second test

Rendered at 1440 and 360, what a first-time visitor can answer:

| Question | Desktop | Mobile |
|---|---|---|
| What is it? | ✅ headline + subtext | ✅ |
| When? | ✅ `OCT 9–12, 2026` badge | ✅ |
| Free? | ✅ `INTERNATIONAL · FREE` | ✅ |
| How do I start? | ✅ "Apply Now" | ⚠️ visible, but the dock Apply icon is clipped |
| Who runs it? | ❌ nothing | ❌ nothing |
| Is it legitimate? | ⚠️ sponsor logos exist but are hidden behind the dock | ❌ none shown |

**Four of six. The two it fails are both trust questions** — exactly the ones a parent or teacher
asks, and exactly what the brief prioritises.

---

## 8. Ranked priorities (Phase 3)

Ordered by the brief's ladder: trust/legitimacy → first-impression clarity → registration conversion
→ sponsor conversion → accessibility → mobile → polish. Effort is rough dev time.

| # | Item | Ref | Why here | Effort |
|---|---|---|---|---|
| 1 | Rotate secrets, untrack PII, purge history | C1 | Live credential + minors' data exposure. Outranks everything. | 1–2 h (yours) |
| 2 | Fix minimize orphaning | C2 | Silently destroys the registration path | 30 m |
| 3 | Fix phone truncation + expand country list | C3 | Corrupts safety data for non-US users | 45 m |
| 4 | Reconcile prize/countries copy | T1 | Site currently contradicts itself | 20 m |
| 5 | Trust layer: organizer, contact, Discord, CoC page, eligibility | T2,T3,T5,T6 | The two failed ten-second questions | 2 h |
| 6 | Remove the "we emailed you" promise or make it true | T4 | Promises something that never happens | 20 m |
| 7 | Canonical → `www` | T7 | One line; currently every canonical is wrong | 5 m |
| 8 | Landmarks + skip link + reveal-on-focus SEO block | A1,A2 | 11 invisible tab stops; no structure at all | 1 h |
| 9 | Form a11y: `aria-invalid`, `aria-describedby`, live region, focus-to-error | A3 | WCAG 3.3.1 + 4.1.3 on the conversion path | 1 h |
| 10 | Native checkbox for terms | A4 | Invalid ARIA on a required field | 30 m |
| 11 | One primary CTA in the hero | §6 | Confirmed suspicion #4 | 20 m |
| 12 | Fix badge/plate alignment; surface sponsors above the dock | L1,L2 | Reads as broken; sponsors are invisible | 45 m |
| 13 | Illustration `md:` → `lg:` | L3 | Fixes the worst breakpoint | 10 m |
| 14 | Dock: fit 360px, label items, 44px targets | L4,L6 | Clipped primary CTA on mobile | 45 m |
| 15 | Contrast floor `/60` → `/65`; add a focus token | A6,A7 | Small, systematic | 30 m |
| 16 | Window semantics + Escape | A5 | Real, but below the conversion fixes | 45 m |
| 17 | Security headers | B1 | Cheap hardening | 20 m |
| 18 | Delete dead components + unused deps | B3,B4 | Removes the false MLH claim from the codebase | 20 m |
| 19 | Rewrite `summary.md`, drop stale artefacts | B5 | Misleads the next contributor | 20 m |
| 20 | Legacy JS | B7 | Zero measured savings | skip |

**Deliberately not doing:** re-theming the site. The existing design system is coherent, documented,
and already de-slopped. Phase 4 extends it (focus token, contrast floor, CTA hierarchy, one honest
trust component) rather than replacing it — replacing it would be the trend-following move this
brief explicitly warns against.


---

# Verification — after the fix pass

Re-measured against a fresh production build (`next build` + `next start`), same
conditions as §0.

## Scores

| Signal | Scope | Before | After |
|---|---|---|---|
| Accessibility | `/`, mobile navigation | 100 | **100** (51 audits passed, up from 50) |
| Best Practices | `/`, mobile navigation | 100 | **100** |
| SEO | `/`, mobile navigation | 100 | **100** |
| Agentic Browsing | `/`, mobile navigation | 100 | **100** |
| Accessibility / BP / SEO | `/code-of-conduct` (new page) | — | **100 / 100 / 100** |
| LCP | `/`, desktop, local prod | 209 ms | **252 ms** |
| CLS | `/`, desktop, local prod | 0.00 | **0.00** |
| Console errors | `/` | 0 | **0** (CSP added without breakage) |

Lighthouse was already at 100 before this pass, so the score table is not the
evidence that matters. The list below is.

## Behaviour verified in a browser

| Item | Before | After |
|---|---|---|
| C2 minimize | Window orphaned; `{windowVisible: false, dockShowsRunning: true, formPresent: false}`; only a reload recovered it | Minimize returns the hero, dock click restores: `{restored: true, title: "Get Info"}` |
| C3 phone | UK `020 7946 0958` stored as `020 794 6095` (11 digits → 10) | Stored as `020 7946 0958`, 11 digits, spacing intact |
| A3 form errors | `{ariaInvalid: 0, ariaDescribedBy: 0, liveRegions: 0}`, focus left on submit | `{ariaInvalid: 7, ariaDescribedBy: 7, liveRegions: 1}`, alert reads "7 fields need your attention before you can apply.", focus moves to it |
| A4 checkbox | 1 `div[role="checkbox"]` with nested buttons | `0` such divs; native `input#apply-terms`; 2 `role="radiogroup"` |
| A2 tab order | 11 invisible tab stops before the first visible control | Skip link is the first tab stop, on screen, with the new focus token |
| A7 focus ring | Browser default `1px auto` | `2.5px solid rgb(25,26,23)` on `:focus-visible` |
| Countdown | `00:00:00:00` in server HTML, and forever after Oct 10 | Verified all four phases with a faked clock: pending renders the dates, before ticks, during shows "Hacking is live right now", after shows "That's a wrap" |
| Registration | — | End to end: validation → API error path (announced, form retained) → success screen |
| T7 canonical | `https://bananahacks.tech` (307s to www) | `https://www.bananahacks.tech` |
| B1 headers | HSTS only | CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all present |
| L4 dock | `{clientW: 360, scrollW: 379, overflowing: true}`, Apply clipped | Apply pinned outside the scroll strip; no horizontal overflow at any breakpoint |
| L2 sponsors | Behind the dock at every width | Above the fold in the left column; `occludedByDock: []` at 360/768/1024/1440 |
| Tap targets | Dock 40px; menu bar and sponsor links 17–23px | All ≥ 24px; dock tiles 44px |

## Ten-second test, re-run

| Question | Before (desktop / mobile) | After |
|---|---|---|
| What is it? | ✅ / ✅ | ✅ / ✅ |
| When? | ✅ / ✅ | ✅ / ✅ |
| Free? | ✅ / ✅ | ✅ / ✅ |
| How do I start? | ✅ / ⚠️ clipped | ✅ / ✅ |
| Who runs it? | ❌ / ❌ | ✅ named in Get Info, the footer and the JSON-LD |
| Is it legitimate? | ⚠️ hidden / ❌ | ✅ sponsors above the fold, CoC crawlable, real contact |

Six of six, on both.

## Still outstanding

1. **`SECURITY-REMEDIATION.md` §2–§4 — yours to run.** Rotation and history purge
   are not done. The code no longer carries the secret, but git history does, and
   the key was public.
2. **No Discord invite exists yet.** The UI renders honest copy instead of a dead
   link; set `siteConfig.discordUrl` and the button appears everywhere at once.
3. **No confirmation email is sent.** The success screen now says so plainly
   rather than promising one. Wiring `/api/apply` to Resend would let that copy
   change.
4. **CSP still needs `'unsafe-inline'`** for Next's bootstrap and Tailwind's
   injected styles. Tightening needs a nonce setup.
5. **`next lint` is unconfigured** — it prompts for setup on first run. Left alone
   deliberately rather than choosing a config on your behalf.
6. **B7 legacy JS** (14.4 kB) — measured savings 0 ms. Not worth doing.
