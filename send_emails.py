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
FAILED_FILE = "failed_emails.json"

SMTP_SERVER = "smtp.zoho.com"
SMTP_PORT = 465
DELAY = 3  # seconds between sends


def connect():
    smtp = smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT)
    smtp.login(FROM_EMAIL, APP_PASSWORD)
    print("SMTP connected.")
    return smtp


def send_email(smtp, to_email, subject, body):
    msg = MIMEMultipart()
    msg["From"] = FROM_EMAIL
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))
    smtp.sendmail(FROM_EMAIL, to_email, msg.as_string())


def main():
    # Resume from failed_emails.json if it exists, otherwise use full list
    try:
        with open(FAILED_FILE) as f:
            failed_data = json.load(f)
        # Rebuild email dicts from failed list
        all_emails_map = {e["to"]: e for e in json.load(open(EMAILS_FILE))}
        emails = [all_emails_map[e["email"]] for e in failed_data if e["email"] in all_emails_map]
        print(f"Resuming from {FAILED_FILE}: {len(emails)} emails to retry.")
    except FileNotFoundError:
        with open(EMAILS_FILE) as f:
            emails = json.load(f)
        print(f"Loaded {len(emails)} emails.")

    success = 0
    failed = 0
    failed_list = []

    smtp = connect()

    for i, email in enumerate(emails):
        try:
            send_email(smtp, email["to"], email["subject"], email["body"])
            success += 1
            print(f"[{i+1}/{len(emails)}] OK  {email['to']}")
        except smtplib.SMTPServerDisconnected:
            print("Connection dropped. Reconnecting...")
            time.sleep(10)
            try:
                smtp = connect()
                send_email(smtp, email["to"], email["subject"], email["body"])
                success += 1
                print(f"[{i+1}/{len(emails)}] OK  {email['to']} (after reconnect)")
            except Exception as e:
                failed += 1
                failed_list.append({"email": email["to"], "error": str(e)})
                print(f"[{i+1}/{len(emails)}] FAIL {email['to']} — {e}")
        except Exception as e:
            failed += 1
            failed_list.append({"email": email["to"], "error": str(e)})
            print(f"[{i+1}/{len(emails)}] FAIL {email['to']} — {e}")

        time.sleep(DELAY)

    try:
        smtp.quit()
    except Exception:
        pass

    print(f"\nDone. {success} sent, {failed} failed.")

    if failed_list:
        with open(FAILED_FILE, "w") as f:
            json.dump(failed_list, f, indent=2)
        print(f"Failed emails saved to {FAILED_FILE}")
    else:
        import os
        if os.path.exists(FAILED_FILE):
            os.remove(FAILED_FILE)
        print("All emails sent successfully.")


if __name__ == "__main__":
    main()
