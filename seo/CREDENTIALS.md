# Credentials I need from you

Three environment variables. **Only the first is strictly required** — the other
two are fallbacks you can skip entirely if you take the recommended paths below.

| Variable | Required? | Format |
|---|---|---|
| `NEXT_PUBLIC_GA_ID` | Yes, for analytics | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Only if you can't use DNS | 43-char string |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Only if GSC import fails | 32-char hex string |

All three are `NEXT_PUBLIC_`, meaning they're compiled into the browser bundle
and publicly visible. That's correct for these — a GA measurement ID and
verification tokens are public by design, and neither grants access to
anything. **Never** put a real secret behind a `NEXT_PUBLIC_` prefix.

Nothing breaks while these are unset. No analytics script loads and no
verification tags render; the site just ships without them.

---

## Prerequisites (needed for all three)

1. **A Google account** — use one the whole organising team can access, not a
   personal account you'll lose access to. A shared `banana...@gmail.com` or a
   Google Workspace account on your domain is better than a founder's personal
   login.
2. **DNS access for `bananahacks.tech`** — wherever you registered the domain
   (Namecheap, Cloudflare, GoDaddy, Vercel Domains…). You need to be able to add
   a TXT record.
3. **The site deployed and publicly reachable at `https://bananahacks.tech`.**
   Verification checks the live site; it will fail against localhost.
4. **Access to your host's environment variables** — Vercel → Project →
   Settings → Environment Variables, or equivalent.

---

## Credential 1 — `NEXT_PUBLIC_GA_ID` (Google Analytics 4)

**What it is:** the Measurement ID for a GA4 web data stream. Looks like
`G-1A2B3C4D5E`.

### Steps

1. Go to <https://analytics.google.com> and sign in.
2. If this is your first property, you'll land on a setup wizard — follow it and
   skip to step 5. Otherwise click the **gear icon (Admin)**, bottom-left.
3. In the **Account** column, click **Create → Property**.
   - If you have no account yet, create one first (**Create → Account**).
     Account name: `Banana Hacks`. Accept the data-sharing defaults.
4. Property setup:
   - **Property name:** `Banana Hacks 2026`
   - **Reporting time zone:** United States → Eastern Time (matches your EDT
     event schedule, so day-boundaries in reports line up with the event)
   - **Currency:** US Dollar
   - Click **Next**, fill in the business details (industry: *Computers &
     Electronics*, size: *small*), pick objectives (**Generate leads** is the
     closest fit), then **Create** and accept the Terms of Service.
5. You'll be asked to choose a platform → pick **Web**.
6. Set up the data stream:
   - **Website URL:** `https://bananahacks.tech`
   - **Stream name:** `Banana Hacks site`
   - Leave **Enhanced measurement ON** (free scroll/outbound-click/file-download
     tracking, no code required)
   - Click **Create stream**
7. The **Web stream details** panel opens. At the top right is
   **MEASUREMENT ID** — `G-XXXXXXXXXX`. **That's the value I need.**
   - Ignore the "Installation instructions" / gtag snippet it offers. That's
     already implemented in `src/components/Analytics.tsx`; you only need the ID.
   - To find it again later: **Admin → Data streams → click your stream**.

### Then

```bash
# .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Add the same variable in your host (Vercel → Settings → Environment Variables →
apply to Production, Preview, and Development) and redeploy.

**Verify it works:** open the live site, then in GA4 go to **Reports →
Realtime**. You should appear within ~30 seconds. If you see nothing, check that
an ad blocker isn't blocking the request — that's the usual cause, and it also
means your real traffic numbers will run 5–15% low. That's normal and not worth
fighting.

---

## Credential 2 — `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`

**You probably don't need this.** There are three ways to verify Search Console,
and two of them require no code change:

| Method | Needs this variable? | Recommended |
|---|---|---|
| **DNS TXT record** | No | ✅ **Best** — verifies `www`, non-`www`, `http`, `https` in one property |
| **Google Analytics** | No | ✅ Easy — works automatically once Credential 1 is live |
| **HTML meta tag** | Yes | Only if you can't reach DNS |

### Recommended path: DNS (no credential needed)

1. Go to <https://search.google.com/search-console>.
2. Click the property dropdown (top left) → **Add property**.
3. Choose the **Domain** box (the left one) and enter `bananahacks.tech` — no
   `https://`, no `www`.
4. Google shows a TXT record like `google-site-verification=abc123...`.
5. In your DNS provider, add a record:
   - **Type:** TXT
   - **Name/Host:** `@` (or leave blank — means the root domain)
   - **Value:** the full string Google gave you
   - **TTL:** default
6. Save, wait a few minutes, click **Verify** in Search Console. If it fails,
   wait 15 minutes and retry — DNS propagation isn't instant.

A Domain property is meaningfully better than a URL-prefix one: it covers every
`http`/`https`/`www` variant at once, which is also how you confirm the
"duplicate versions of the site" checklist item.

### Fallback path: HTML meta tag (needs the credential)

The meta-tag method is **only offered for URL-prefix properties**, not Domain
properties. So:

1. **Add property** → choose the **URL prefix** box (the right one).
2. Enter the exact URL: `https://bananahacks.tech`
3. In the verification methods list, expand **HTML tag**.
4. It shows:
   ```html
   <meta name="google-site-verification" content="AbC123dEf456..." />
   ```
5. **Copy only the `content` value** — not the whole tag. That's what I need.
6. Set it and redeploy:
   ```bash
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=AbC123dEf456...
   ```
7. Once the deploy is live, click **Verify**.

Don't remove the variable after verifying — Google re-checks periodically and
will unverify the property if the tag disappears.

---

## Credential 3 — `NEXT_PUBLIC_BING_SITE_VERIFICATION`

**You probably don't need this either.** Bing can import your verified Google
property wholesale.

Bing is worth doing despite its small search share — it feeds ChatGPT search
and Microsoft Copilot, which is a growing share of how people find events.

### Recommended path: import from GSC (no credential needed)

1. Go to <https://www.bing.com/webmasters> and sign in (Microsoft, Google, or
   Facebook account — a Google account is fine and makes the import smoother).
2. On the "Add your site" screen, choose **Import from Google Search Console**.
3. Click **Continue**, sign in to the Google account that owns the GSC property,
   and grant read access.
4. Pick `bananahacks.tech` from the list → **Import**.

This copies the property, verification, and sitemap across in one step.

### Fallback path: manual (needs the credential)

1. On the "Add your site" screen, use the **Add site manually** box → enter
   `https://bananahacks.tech`.
2. On the verification screen, choose **Option 2: HTML Meta Tag**.
3. It shows:
   ```html
   <meta name="msvalidate.01" content="A1B2C3D4E5F6..." />
   ```
4. **Copy only the `content` value.**
5. Set it and redeploy:
   ```bash
   NEXT_PUBLIC_BING_SITE_VERIFICATION=A1B2C3D4E5F6...
   ```
6. Click **Verify**.

---

## What to send me

Paste whichever of these you end up with:

```
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_BING_SITE_VERIFICATION=
```

Or just add them to `.env.local` and your host yourself — nothing further is
needed from me for them to take effect. `.env.local` is gitignored, so they
won't be committed.

## Order of operations

1. Deploy the site to `https://bananahacks.tech`
2. GA4 → get Credential 1 → set it → redeploy
3. Search Console → verify by DNS (or via the now-live GA tag)
4. Search Console → submit `sitemap.xml`
5. Bing → import from GSC
6. Search Console → URL Inspection → request indexing for `/`, `/about`, `/faq`,
   `/register`

Steps 3–6 are covered in [SETUP.md](SETUP.md).
