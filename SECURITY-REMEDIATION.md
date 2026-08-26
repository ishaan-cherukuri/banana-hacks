# Security remediation runbook

**Status: prepared, not executed.** You asked me to prepare and you execute. I have made the code
changes (below); the steps in §2 and §3 are yours to run because they rotate live credentials and
rewrite published git history.

---

## 0. What was exposed

`github.com/vihaan-cherukuri/banana-hacks` is a **public** repository containing:

| What | Where | Severity |
|---|---|---|
| Zoho SMTP app password for `team@bananahacks.tech` | `send_emails.py`, `send_batch.py`, `test_send.py` | **Critical** |
| ~1,227 registrant records — name, email, emergency-contact name, emergency-contact phone | `submissions_daily/*.csv` | **Critical** |
| Sponsor outreach records | `banana_hacks_emails.json` | Medium |

**Not** exposed, on re-check: the Resend API key. `send_followup.py`, `send_schools.py` and
`test_resend.py` already read `os.getenv("RESEND_API_KEY")` via `dotenv`. Good practice was already
in place there — it just hadn't been applied to the SMTP scripts.

Assume the SMTP password is compromised. Public GitHub is continuously scraped by credential
harvesters; exposure duration matters more than whether you have seen it abused.

---

## 1. Already done (code changes in this branch)

- `send_emails.py`, `send_batch.py`, `test_send.py` now read `ZOHO_APP_PASSWORD` from the
  environment via `dotenv` and exit with a clear message if it is unset. No secret remains in source.
- `.gitignore` now excludes `.env*` (except `.env.example`), `submissions_daily/`,
  `banana_hacks_emails.json`, and other generated data files.
- `.env.example` documents every variable the project needs.
- `src/lib/db.ts` no longer instantiates the Turso client at module scope — a missing secret can no
  longer break `next build`.

**These changes stop the bleeding but do not undo the exposure.** Git history still contains the
password and the CSVs.

---

## 2. Rotate first — do this before anything else

Rotation is the only step that actually revokes access. Do it before touching history: an attacker
who already has the password is unaffected by a force-push.

1. **Zoho app password**
   - Zoho Mail → My Account → Security → App Passwords
   - Revoke the password beginning `J4Y…`
   - Generate a new one, put it in a local `.env` as `ZOHO_APP_PASSWORD=…`
   - `.env` is now gitignored — confirm with `git check-ignore -v .env`
2. **Review sent mail** for `team@bananahacks.tech` for anything you did not send.
3. **Resend** — no rotation strictly required, but if that key was ever in a shell history or an
   older commit, rotate it at resend.com/api-keys too.

---

## 3. Purge the data and history

### 3a. Untrack the data files (keeps your local copies)

```bash
git rm -r --cached submissions_daily banana_hacks_emails.json
git commit -m "Untrack registrant data; add to gitignore"
```

### 3b. Purge them from history

`git-filter-repo` is the tool GitHub recommends. Back up the repo first.

```bash
# from a fresh clone, with a backup taken
brew install git-filter-repo

git filter-repo \
  --path submissions_daily --path banana_hacks_emails.json --invert-paths \
  --replace-text <(echo 'J4Yvd8hQXgq8==>REMOVED')

git push --force --all
git push --force --tags
```

Then, because forks and caches persist:
- Ask GitHub Support to purge cached views of the affected commits.
- Check for forks (`/network/members`) — a fork keeps its own copy and you cannot rewrite it.

### 3c. Consider making the repo private
Given it holds a live event's operational data, private is the safer default. This does **not**
substitute for rotation — anything already scraped stays scraped.

---

## 4. Notification — please get advice, not just my opinion

Emergency-contact names and phone numbers for ~1,227 people were publicly accessible, and the
audience includes students, some of whom are likely minors. Depending on where your registrants
live, that may carry notification duties (GDPR Art. 33/34 for EU registrants; US state breach-
notification laws; COPPA considerations for under-13s).

I am not able to give you a legal answer. Given the scale and the presence of minors' contact
details, this is worth asking an adult you trust — a school administrator, a parent, or MLH, who
run hackathon safeguarding programmes and have handled this before.

At minimum, keep a written record of: when it was exposed, when you found out, what you rotated,
and when you purged it.

---

## 5. Prevent recurrence

- **Never** put a credential in a `.py`/`.ts` file, even temporarily.
- Turn on **GitHub secret scanning + push protection** (Settings → Code security). It is free on
  public repos and would have blocked the original commit.
- Registrant exports belong in the database or a private drive, not the repo.
- Add a pre-commit secret scan (`gitleaks protect --staged`) if you want a local backstop.
