# Off-Site SEO Playbook

Ordered by expected return. If you only do section 1, you'll have captured most
of the available value.

A note on sequencing: for a dated event, **directory listings and community
distribution beat link-building**. Links compound over months; your event is in
October 2026. Do section 1 now, section 2 steadily, and treat section 3 as
optional.

---

## 1. Directory & aggregator listings — do these first

These are the highest-value links available to you: high authority, topically
relevant, free, and they send *actual registrants*, not just link equity.
Google already reads these aggregators as the authoritative answer for
"hackathon" queries — being listed on them is worth more than out-ranking them.

| Platform | URL | Notes |
|---|---|---|
| **Devpost** | devpost.com/hackathons | The single highest-value listing. Hosting your submissions here also solves project intake. Do this one first. |
| **Major League Hacking** | mlh.io/event-membership | Apply for the 2026 season. Competitive and has deadlines — check them early. |
| **lablab.ai** | lablab.ai | Directly relevant to generative AI. May list community events. |
| **Devfolio** | devfolio.co | Strong for reaching India/APAC participants. |
| **Hackathon.com** | hackathon.com | Low effort, decent authority. |
| **AI Hackathons directory** | aihackathons.com | Small but perfectly on-topic. |
| **Hack Club** | hackclub.com/hackathons | If you want high-school participants. |
| **F6S / Eventbrite** | — | Generic but indexed; low effort. |

**When you submit, always:**
- Link to `https://bananahacks.tech` (bare domain, no tracking params in the
  main link — params can fragment how the link is counted)
- Use the same event name, dates, and description everywhere. Consistent NAP
  (name/address/participants) data across directories is what lets Google
  reconcile them into one entity.
- Add your logo — listings with images get clicked more.

## 2. Community distribution

Not links in the SEO sense (most are `nofollow`), but they drive the
registrations and the *mentions* that later turn into links.

**Reddit** — read each subreddit's self-promo rules first; several will ban you
for a cold post. Best approach is to participate for a week, then post.
- r/StableDiffusion, r/MachineLearning (has strict rules), r/hackathon,
  r/learnmachinelearning, r/aiArt, r/comfyui

**Discord/Slack communities** — usually a `#events` or `#opportunities`
channel: Hugging Face, EleutherAI, Latent Space, Buildspace, local AI meetups.

**X/Twitter** — the generative-AI-art community is very active. Tag tool
accounts you're compatible with (ComfyUI, Replicate, Hugging Face). A
build-in-public thread about *running* the hackathon tends to outperform a
straight announcement.

**Hacker News** — one Show HN, and make it about something genuinely
interesting (the OS-simulation site itself is a legitimately good hook — it's
unusual enough to carry a post on its own).

**University CS departments and clubs** — email ACM/IEEE/AI club officers.
`.edu` links are high-value and these are among the few you can realistically
earn. You already have `send_schools.py` in this repo, so the list may exist.

## 3. Link building & competitive analysis

Lower priority, needs tooling.

### Backlink audit (needs Ahrefs/Semrush — both have free trials)
1. Put `lablab.ai` and a recent Devpost hackathon into Site Explorer.
2. Export referring domains, sort by DR descending.
3. Filter to directories, blogs, and university pages — skip news and platform
   noise.
4. Anything on that list that accepts submissions, submit to.

### Link intersect
Ahrefs → **Link Intersect** → enter 3 competitor domains, leave yours blank.
The output is sites linking to multiple competitors but not to you. That list
is your outreach target list, ranked by how likely they are to link to a
hackathon.

### Unlinked mentions
Set up **Google Alerts** for `"Banana Hacks"` and `bananahacks`. When someone
mentions the event without linking, email them:

> Hi — thanks for mentioning Banana Hacks in [post]! Would you mind linking it
> to bananahacks.tech so readers can find the registration page? Either way,
> appreciated.

Conversion on this is high because they already wrote about you.

### Outreach template — hackathon roundups
Search `"AI hackathons 2026" -site:bananahacks.tech` and find roundup posts.

> Subject: Addition for your 2026 AI hackathon roundup
>
> Hi [name],
>
> Found your roundup of AI hackathons while looking for events to point our
> community at — it's a genuinely useful list.
>
> One you might want to add: Banana Hacks 2026 (Oct 9–12), a free virtual
> hackathon focused on generative AI and image creation. Open worldwide, no
> entry fee, beginner-friendly. Details: https://bananahacks.tech
>
> Either way, thanks for putting the list together.
>
> [name]

Keep it short, no flattery padding, and don't follow up more than once.

---

## 4. What to skip

- **Google My Business** — for physical businesses. A virtual event doesn't
  qualify, and inventing an address risks suspension.
- **Paid link building / guest post networks** — against Google's spam policies
  and an active penalty risk.
- **Aggressive keyword-stuffed anchors** — for a brand this new, natural
  anchors ("Banana Hacks", "this hackathon") are safer and work fine.

---

## 5. Post-event (don't skip this)

The single most underrated SEO move for a hackathon: **publish the winners with
project write-ups**. Winning teams link to their own project pages, those pages
link back to you, and "banana hacks winners 2026" becomes an evergreen entry
point for next year's registrants. Budget a day for it after the event.
