# SEO — status against the checklist

- **[CREDENTIALS.md](CREDENTIALS.md)** — how to obtain each env var I need from you
- **[SETUP.md](SETUP.md)** — the steps that need your accounts (GSC, Bing, GA4)
- **[keyword-strategy.md](keyword-strategy.md)** — competitors, keyword map, intent analysis
- **[off-site-playbook.md](off-site-playbook.md)** — directories, outreach, link building

`✅` done in code · `👤` needs your accounts · `⏭️` deliberately skipped

## SEO Basics
| Item | Status |
|---|---|
| GSC + Bing Webmaster Tools | 👤 [SETUP.md §1–2](SETUP.md) |
| Google Analytics | ✅ wired via `NEXT_PUBLIC_GA_ID` · 👤 needs your ID |
| SEO plugin | ⏭️ WordPress-only; Next.js metadata APIs used instead |
| Sitemap generated + submitted | ✅ `/sitemap.xml`, all 7 URLs · 👤 submit |
| Robots.txt | ✅ `/robots.txt`, sitemap + host declared |
| Manual actions check | 👤 [SETUP.md §1](SETUP.md) |
| Site indexed | 👤 request indexing after deploy |

## Keyword Research
All ✅ in [keyword-strategy.md](keyword-strategy.md) — competitors, head terms,
long-tail, keyword map, intent analysis of live SERPs, question list, and
difficulty estimates (flagged as estimates, not tool-pulled).

## Technical SEO
| Item | Status |
|---|---|
| HTTPS | 👤 host-level; verify http→https 301 |
| Duplicate site versions | ✅ `/bananahacks` (byte-identical homepage copy) now 301s to `/` · 👤 pick www-or-bare at DNS |
| Crawl errors | ✅ build clean, all routes prerender · 👤 monitor GSC |
| Site speed | ✅ Google Fonts `@import` → self-hosted `next/font` (killed a render-blocking external request + layout shift); content pages ~96 kB first load, fully static |
| Broken links | ✅ every internal link resolves to a real route |
| HTTP links on HTTPS pages | ✅ none in rendered HTML (verified) |
| SEO-friendly URLs | ✅ `/faq`, `/schedule`, `/prizes`… no trailing-slash variants |
| Schema markup | ✅ Organization + Event (`/`), FAQPage (`/faq`), ItemList (`/schedule`), BreadcrumbList (all) |
| Page depth | ✅ max 2 clicks from root; header + footer link every page from every page |
| Redirects | ✅ 301s for `/bananahacks`, `/apply`, `/signup` |

## On-Site + Content SEO
| Item | Status |
|---|---|
| Title tags | ✅ unique per page, `absolute` so the brand isn't doubled |
| Meta descriptions | ✅ unique per page, from the central page map |
| Multiple H1s | ✅ **was broken** — homepage had 2 (`SeoContent` + `HeroSection`). Hero demoted to `h2`; every page verified at exactly 1 |
| Titles/descriptions/content | ✅ rewritten around mapped keywords |
| Content audit | ✅ no low-performing content to prune (new site); the one duplicate URL was removed |
| Image alt tags | ✅ sponsor logos now descriptive, not bare names; decorative SVGs `aria-hidden` |
| Internal linking | ✅ shared header + footer, contextual in-body links, crawlable `<a>` links from the homepage so no page is orphaned |
| Keyword cannibalisation | ✅ checked — `/` (brand) vs `/about` (category) split deliberately; documented |
| Content still relevant | ✅ dates reconciled to Oct 9–12 across all files |

## Off-Site SEO
All ✅ documented in [off-site-playbook.md](off-site-playbook.md) — 👤 execution
is manual. GMB ⏭️ (physical businesses only; a virtual event doesn't qualify).

---

## The structural change

The site was a single route rendering a client-side OS simulation. All content
lived in JS-only windows; the only crawlable copy was a hidden `sr-only` block.
There was nothing for a long-tail query to land on and nothing to internally
link.

There are now six server-rendered pages (`/about`, `/schedule`, `/prizes`,
`/faq`, `/sponsors`, `/register`) sharing one source of truth with the OS
panels — `src/lib/content.ts`. Both surfaces read the same arrays, so the
crawlable copy and the visible copy can't drift apart. The OS simulation is
untouched as the homepage.

## Two things that need your judgement

1. **Prize claims.** The metadata, OG image, and `sr-only` block all claimed
   "$10K+ in prizes" and named **AWS, Replicate, and Modal** as providing
   credits — while `PrizesPanel` said "Prizes Coming Soon" and none of those
   three are sponsors. Naming companies as sponsors when they aren't is a real
   problem, so I removed the names and the hard dollar figure, and rewrote the
   prize copy as "being finalised with sponsors". **Put the numbers back as
   soon as they're real** — a concrete prize figure converts well.

2. **Attendance claim.** The sponsor pitch says "500+ generative AI builders".
   I left it as-is since it's your projection to make, but if it's aspirational
   rather than based on current registrations, soften it before a sponsor
   checks.
