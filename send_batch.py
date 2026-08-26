import smtplib
import json
import time
import os
from dotenv import load_dotenv
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

load_dotenv()

FROM_EMAIL = os.getenv("ZOHO_FROM_EMAIL", "team@bananahacks.tech")
# Never hardcode this. Set ZOHO_APP_PASSWORD in .env (gitignored).
APP_PASSWORD = os.getenv("ZOHO_APP_PASSWORD")
if not APP_PASSWORD:
    raise SystemExit(
        "ZOHO_APP_PASSWORD is not set. Add it to .env — see SECURITY-REMEDIATION.md."
    )
FAILED_FILE = "failed_emails.json"
EMAILS_FILE = "banana_hacks_emails.json"

SMTP_SERVER = "smtp.zoho.com"
SMTP_PORT = 465
BATCH_SIZE = 50
DELAY = 5  # seconds between sends


def connect():
    smtp = smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT)
    smtp.login(FROM_EMAIL, APP_PASSWORD)
    return smtp


def send_email(smtp, to_email, subject, body):
    msg = MIMEMultipart()
    msg["From"] = FROM_EMAIL
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))
    smtp.sendmail(FROM_EMAIL, to_email, msg.as_string())


def main():
    # Load remaining emails from failed list
    if os.path.exists(FAILED_FILE):
        with open(FAILED_FILE) as f:
            failed_data = json.load(f)
        all_emails_map = {e["to"]: e for e in json.load(open(EMAILS_FILE))}
        emails = [all_emails_map[e["email"]] for e in failed_data if e["email"] in all_emails_map]
        print(f"{len(emails)} emails remaining total.")
    else:
        print("No failed_emails.json found. Nothing to retry.")
        return

    batch = emails[:BATCH_SIZE]
    remaining = emails[BATCH_SIZE:]

    print(f"Sending {len(batch)} emails this run ({len(remaining)} left after this).\n")

    smtp = connect()
    print("Login OK.\n")

    success = 0
    still_failed = []

    for i, email in enumerate(batch):
        try:
            send_email(smtp, email["to"], email["subject"], email["body"])
            success += 1
            print(f"[{i+1}/{len(batch)}] OK  {email['to']}")
        except Exception as e:
            still_failed.append({"email": email["to"], "error": str(e)})
            print(f"[{i+1}/{len(batch)}] FAIL {email['to']} — {e}")
        time.sleep(DELAY)

    try:
        smtp.quit()
    except Exception:
        pass

    # Save remaining (unsent + failed) back to failed_emails.json
    leftover = still_failed + [{"email": e["to"], "error": "not yet sent"} for e in remaining]
    if leftover:
        with open(FAILED_FILE, "w") as f:
            json.dump(leftover, f, indent=2)
        print(f"\nDone. {success} sent. {len(leftover)} remaining saved to {FAILED_FILE}.")
        print(f"Run this script again tomorrow to send the next batch.")
    else:
        os.remove(FAILED_FILE)
        print(f"\nAll done! {success} sent. No emails remaining.")


if __name__ == "__main__":
    main()
