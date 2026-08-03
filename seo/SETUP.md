# SEO Setup — the parts that need your accounts

Everything in the codebase is done. These steps need logins I don't have, so
they're yours. Should take about 30 minutes total.

> **Looking for how to get the API keys/tokens?** See
> **[CREDENTIALS.md](CREDENTIALS.md)** — step-by-step acquisition for each of the
> three environment variables. This file is the broader checklist.

---

## 1. Google Search Console (do this first)

1. Go to <https://search.google.com/search-console> → **Add property**.
2. Choose **Domain** (not URL prefix) and enter `bananahacks.tech`.
   Domain properties cover `www`, non-`www`, `http`, and `https` in one
   property — which also resolves the "check for duplicate versions of the
   site" checklist item at the source.
3. It'll give you a **TXT record**. Add it to your DNS (wherever
   `bananahacks.tech` is registered), then hit Verify.
4. Once verified: **Sitemaps** → submit `sitemap.xml`.
5. **Manual actions** (left sidebar) → confirm it says "No issues detected".
   A brand-new domain will be clean; check again after launch.
6. **URL Inspection** → paste `https://bananahacks.tech` → **Request indexing**.
   Repeat for `/about`, `/faq`, `/register`. Don't bother with the rest —
   Google will crawl them from the sitemap and internal links.

> If DNS verification is a hassle, set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
> in `.env.local` to the value from the HTML-tag method instead and redeploy.
> It's wired up and will render the meta tag automatically.

## 2. Bing Webmaster Tools

<https://www.bing.com/webmasters> → **Import from Google Search Console**.
This is genuinely one click and copies your property and sitemap across. Only
use the manual method (and `NEXT_PUBLIC_BING_SITE_VERIFICATION`) if the import
fails.

Bing matters more than its market share suggests — it feeds ChatGPT search and
Copilot.

## 3. Google Analytics 4

1. <https://analytics.google.com> → **Admin** → **Create property**.
2. Add a **Web** data stream for `https://bananahacks.tech`.
3. Copy the **Measurement ID** (looks like `G-XXXXXXXXXX`).
4. Put it in `.env.local`:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
5. Add the same variable in your host's dashboard (Vercel → Settings →
   Environment Variables) and redeploy.

Until that variable is set, **no analytics script loads at all** — the site
ships zero tracking by default. Nothing else to configure.

**Worth doing once GA is live:** link GA4 to Search Console (GA Admin →
Property → Search Console links). It puts query data next to behaviour data in
one report.

### Events worth tracking
GA4 tracks pageviews automatically. The one custom event actually worth adding
is registration completion — mark it as a **conversion** in GA4 so you can see
which pages and sources drive sign-ups.

## 4. Things you do NOT need

- **An SEO plugin.** That checklist item is WordPress-specific. Next.js has
  native metadata, sitemap, and robots APIs, all of which are now in use.
  Installing a plugin here isn't possible and isn't needed.
- **Google My Business.** GMB is for businesses with a physical location or
  service area. A virtual hackathon has neither, and a fake address is a real
  suspension risk. Skip it.

---

## 5. Host-level checks (once deployed)

- [ ] **HTTPS enforced** — Vercel/Netlify do this by default. Confirm
      `http://bananahacks.tech` 301s to `https://`.
- [ ] **One canonical host** — pick `www` or bare and 301 the other. Vercel:
      Settings → Domains → set one as primary, mark the other "Redirect to".
      Without this you have two copies of the whole site competing.
- [ ] **Run PageSpeed Insights** on `/` and `/about`:
      <https://pagespeed.web.dev>. The content pages should score very well
      (~96 kB first load, static). The homepage is heavier because it's a full
      OS simulation — that's a deliberate tradeoff, and it's why the content
      pages exist.
- [ ] **Validate structured data** — paste each URL into
      <https://validator.schema.org> and Google's
      <https://search.google.com/test/rich-results>. Expect: Organization +
      Event on `/`, FAQPage + BreadcrumbList on `/faq`, BreadcrumbList
      elsewhere.
