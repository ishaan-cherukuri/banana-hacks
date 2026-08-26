import smtplib
import os
from dotenv import load_dotenv
import json
import time
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
EMAILS_FILE = "banana_hacks_emails.json"

SMTP_SERVER = "smtp.zoho.com"
SMTP_PORT = 465


def send_email(smtp, to_email, subject, body):
    msg = MIMEMultipart()
    msg["From"] = FROM_EMAIL
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))
    smtp.sendmail(FROM_EMAIL, to_email, msg.as_string())


with open(EMAILS_FILE) as f:
    emails = json.load(f)

print(f"Loaded {len(emails)} emails. Sending first 5 as test...\n")

success = 0
failed = 0

with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT) as smtp:
    smtp.login(FROM_EMAIL, APP_PASSWORD)
    print("Login OK.\n")

    for i, email in enumerate(emails[:5]):
        try:
            send_email(smtp, email["to"], email["subject"], email["body"])
            success += 1
            print(f"[{i+1}/5] OK  {email['to']}")
        except Exception as e:
            failed += 1
            print(f"[{i+1}/5] FAIL {email['to']} — {e}")

        time.sleep(0.5)

print(f"\nTest done. {success} sent, {failed} failed.")
