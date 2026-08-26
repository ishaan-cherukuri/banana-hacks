# Understanding — BananaHacks (Phase 1)

Read of the whole repo + the live site at `www.bananahacks.tech`, verified against
Next.js 14 App Router docs (Context7). No code changed yet.

---

## 1. What this actually is

Not a conventional landing page. The homepage is a **desktop-OS simulation**
(`src/components/Desktop.tsx`): a menu bar, a dock, and draggable windows whose
contents are the panels in `src/components/panels/`. Alongside it sits a
**parallel, server-rendered content site** under `src/app/(info)/` — six crawlable
pages sharing `PageShell` — because the OS homepage renders almost no text into
the initial HTML.

| Layer | Reality |
|---|---|
| Framework | Next.js **14.2.33**, App Router, React 18, TypeScript |
| Styling | Tailwind v3 + a hand-written design system in `globals.css` |
| Data | Turso/libSQL (`@libsql/client`) via `src/lib/db.ts` |
| Registration | `ApplyPanel` → `POST /api/apply` → `INSERT INTO registrations` |
| AI Studio | `SketchPanel` → `/api/sketch2image` → LightX (key server-side only ✅) |
| Deploy | Vercel |
| Content | Single source of truth in `src/lib/content.ts`, shared by panels + SEO pages |

**Two dependencies are installed but unused:** `framer-motion` (v11) and
`googleapis` — all animation is hand-rolled CSS. Removing them is free weight.

### Corrections to the known context
- **Not "likely" Next.js — confirmed** Next 14.2.33 App Router on Vercel.
- Dates on the site are **Oct 9–12, 2026** (4 days), not the 3 days implied elsewhere.
- The SEO/metadata layer is genuinely good: per-page canonicals, correct
  `metadataBase`, `Event` + `Organization` + `FAQPage` + `BreadcrumbList` JSON-LD,
  breadcrumbs, one H1 per page. Context7 confirms all of it matches current
  Next 14 API. **Do not "fix" this.**
- A previous pass (commit `6129216` "no ai thing") already stripped most AI-slop.
  The design system in `globals.css` and `tailwind.config.ts` is committed, coherent,
  and reasoned — hard ink borders, zero-blur offset shadows, flat fills, marker
  highlight instead of gradient text, Bricolage Grotesque / Instrument Sans /
  Space Mono. **Phase 4 should extend this, not replace it.**

---

## 2. 🚨 Found outside the brief — needs action before anything cosmetic

**The GitHub repo `vihaan-cherukuri/banana-hacks` is PUBLIC**, and tracked in it:

1. **Live credentials in committed source**
   - `send_emails.py`, `send_batch.py`, `test_send.py` — hardcoded Zoho SMTP app
     password for `team@bananahacks.tech`
   - `send_followup.py`, `send_schools.py`, `test_resend.py` — hardcoded Resend API keys
2. **~1,227 rows of registrant personal data** in `submissions_daily/*.csv` —
   columns: `name, email, emergency_name, emergency_phone, project_idea`.
   Emergency-contact names and phone numbers, for an audience that plausibly
   includes minors.
3. `banana_hacks_emails.json` — 265KB of outreach records.

Rotating the keys and purging this from history is more urgent than any design
item in this brief. It is not something I should do unilaterally — see questions.

---

## 3. The five suspected issues — verified

| # | Claim | Verdict |
|---|---|---|
| 1 | Dead countdown | **Partly.** `HeroSection.tsx:11` uses `2026-10-10T00:00:00Z`, which *does* match `siteConfig.startDate`. It ticks correctly. But it initialises to `{0,0,0,0}`, so the **server HTML and first paint are literally `00:00:00:00`**, and there is **no started/ended state** — after Oct 10 it renders `00:00:00:00` next to "until hacking begins", forever. |
| 2 | Contradictory stats | **Confirmed, worse than described.** `HeroSection.tsx:294` ships a **`$10K Prizes`** badge and a **`60+ countries`** badge. `/prizes`, the FAQ, and `SeoContent` all say the prize pool "is being finalised". `about/page.tsx:16` repeats **`60+ Countries`**. Nothing anywhere substantiates either number. (The "500+ builders" badge from your notes is gone — replaced by these.) |
| 3 | Missing trust signals | **Confirmed.** Details below. |
| 4 | Competing hero CTAs | **Confirmed.** "Apply Now" vs "Try AI Studio", same size, same weight, adjacent. Fill colour is the only hierarchy. |
| 5 | Canonical/host mismatch | **Confirmed and live.** `bananahacks.tech` **307-redirects to `www.`**, but `siteConfig.url` is the non-www apex. So every canonical, every `og:url`, the sitemap, and `robots.txt`'s `Host:` all point at a redirecting host. One-line fix in `src/lib/site.ts`. |

---

## 4. Trust layer — what exists vs. what's missing

**Missing / broken:**
- **Every social link is `href="#"`** — Discord, Twitter, GitHub. (In `NavBar.tsx`
  and `InfoSidebar.tsx`, which are **dead code**, but the pattern repeats live.)
- **`MenuBar.tsx:33-34`** — "Discord Community" and "Contact Organizers" are
  buttons with **no action**. Dead UI, shipped.
- **`ApplyPanel.tsx:148`** — the post-registration **"Join Discord" button does
  nothing** (`href: null`). This is the worst one: it's the moment of highest intent.
- **No organizer is named anywhere on the site.** `siteConfig.organizer` is
  `"Banana Hacks"` — self-referential. The JSON-LD `Organization` has no founder.
- **No general contact address.** The only email surfaced is
  `sponsorships@bananahacks.tech`. `PolicyModal.tsx:47` privately references a
  *third* address, `bananahacks@gmail.com`.
- **No age or eligibility statement exists anywhere in the codebase.** (See §5.)
- **Code of Conduct is only reachable from inside the registration form** — not
  from any crawlable page, not from the footer.

**Exists but unverified:** `InfoSidebar.tsx` (dead code) renders an
**"MLH Member Event 2026"** badge. `ApplyPanel` makes the weaker, safer claim
("follows the MLH Code of Conduct"). If the event is not an MLH member event,
that badge must never ship.

**Also:** the success screen promises *"Check your email for your confirmation"* —
but `/api/apply` only writes to the database. **No confirmation email is sent.**
Confirmations appear to go out manually via the Python scripts.

---

## 5. 🛑 The audience conflict — I need you to resolve this

You flagged this as unresolved. It is, and the codebase contradicts itself:

**The site says open-to-all:**
> "Anyone, in any country… Students, professionals, hobbyists, and first-timers"
> — `content.ts:17`

and pitches advanced work — LoRA, DreamBooth, ControlNet, ComfyUI, A1111, Diffusers.

**But the registration form and outreach say high-schoolers:**
- `ApplyPanel` **requires an emergency contact name and phone** — a minors-oriented
  requirement, and unusual for an open, online, adult event.
- The email field is labelled *"don't use your school email"*.
- Offered workshops are **HTML/CSS, Python, Machine Learning** — not gen-AI topics.
- `send_schools.py` targets schools.
- Your own sponsor outreach in `banana_hacks_emails.json` reads:
  > *"My name is **Ishaan Cherukuri**, and I am a **high school student** organizing
  > Banana Hacks, a free virtual hackathon **for high school students** running
  > **October 9 to 11**, 2026"*

That outreach also gives **different dates** (Oct 9–11) than the site (Oct 9–12).

Per your instruction, I've stopped here rather than guess. This decision changes
the copy, the form fields, the workshop list, the CoC, and whether a
parental-consent/COPPA-style path is needed at all.

---

## 6. Smaller confirmed findings (full detail lands in AUDIT.md)

- **`formatPhoneNumber` (`ApplyPanel.tsx:49`) hard-truncates to 10 digits** and
  validation requires ≥10. For an "international" hackathon this **silently blocks
  legitimate non-US/India numbers**. The country-code list is 20 entries against a
  claim of "every country".
- The terms checkbox is a `div role="checkbox"` with **interactive `<button>`s
  nested inside it** — invalid ARIA, and there's no visible focus ring on it.
- Form errors have no `aria-invalid` / `aria-describedby`, and focus isn't moved
  to the first error on failed submit.
- Dead components, never imported: **`NavBar.tsx`, `InfoSidebar.tsx`,
  `Toolbar.tsx`, `DesktopIcon.tsx`**. `NavBar` still carries `backdrop-filter: blur`
  glassmorphism the rest of the system deliberately rejected.
- `PolicyModal.tsx:47` — "Report concerns to **a** organizer" (typo); MLH CoC is
  named as plain text, not a link.
- `summary.md` and `design_guidelines.json` describe a **medieval/fantasy RPG
  aesthetic from hackUMBC 2025** and a `src/components/sections/` structure that no
  longer exists. Both are stale and actively misleading to anyone new.
- `public/umbc/index.html` is an orphaned standalone page loading Google Fonts.

---

## 7. Open questions — blocking

1. **Audience** — open-to-all, or high-school-focused? (§5)
2. **`$10K Prizes` and `60+ countries`** — real, or replace with honest copy? (§3)
3. **The public repo with credentials and registrant PII** — how do you want to
   handle it? (§2)
4. **Discord invite URL, a general contact email, and how you want to be credited
   as organizer** — I need the actual values; I won't invent them.
5. **MLH** — member event, or only following their CoC?
6. **Dates** — Oct 9–12 (site) or Oct 9–11 (your outreach)?
