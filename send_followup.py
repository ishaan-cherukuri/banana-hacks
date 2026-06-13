import resend
import base64
import json
import time
import os
from dotenv import load_dotenv

load_dotenv()
resend.api_key = os.getenv("RESEND_API_KEY")

EMAILS_FILE = "banana_hacks_emails.json"
REMAINING_FILE = "followup_remaining.json"
PDF_PATH = "/Users/ishu/Downloads/BananaHacks_Sponsorship_Prospectus.docx.pdf"
BATCH_SIZE = 100
DELAY = 0.5

OLD_SIG = "(Please excuse the duplicate email if sent, we are trying a new emailing system.)\n\nIshaan Cherukuri\nDirector, Banana Hacks\nteam@bananahacks.tech"
NEW_SIG = "(Please excuse the duplicate email if sent, we are trying a new emailing system.)\nReplies to this email go directly to Ishaan Cherukuri (Founder) at Ishaan.cherukuri@gmail.com.\n\nWarm regards,\nIshaan Cherukuri\nDirector, Banana Hacks\nteam@bananahacks.tech"

with open(PDF_PATH, "rb") as f:
    pdf_data = base64.b64encode(f.read()).decode("utf-8")


def build_body(original_body):
    return original_body.replace(OLD_SIG, NEW_SIG)


def send_email(to_email, subject, body):
    return resend.Emails.send({
        "from": "Banana Hacks <team@bananahacks.tech>",
        "to": [to_email],
        "reply_to": "Ishaan.cherukuri@gmail.com",
        "subject": subject,
        "text": body,
        "attachments": [
            {
                "filename": "BananaHacks_Sponsorship_Prospectus.pdf",
                "content": pdf_data,
            }
        ],
    })


def main():
    # Load remaining or start fresh
    if os.path.exists(REMAINING_FILE):
        with open(REMAINING_FILE) as f:
            remaining_addresses = set(json.load(f))
        all_emails = json.load(open(EMAILS_FILE))
        emails = [e for e in all_emails if e["to"] in remaining_addresses]
        print(f"Resuming: {len(emails)} emails remaining.")
    else:
        emails = json.load(open(EMAILS_FILE))
        print(f"Starting fresh: {len(emails)} emails total.")

    batch = emails[:BATCH_SIZE]
    after_batch = emails[BATCH_SIZE:]

    print(f"Sending {len(batch)} this run, {len(after_batch)} left after.\n")

    success = 0
    failed = []

    for i, email in enumerate(batch):
        body = build_body(email["body"])
        try:
            send_email(email["to"], email["subject"], body)
            success += 1
            print(f"[{i+1}/{len(batch)}] OK  {email['to']}")
        except Exception as e:
            failed.append(email["to"])
            print(f"[{i+1}/{len(batch)}] FAIL {email['to']} — {e}")
        time.sleep(DELAY)

    remaining = [e["to"] for e in after_batch] + failed
    if remaining:
        with open(REMAINING_FILE, "w") as f:
            json.dump(remaining, f, indent=2)
        print(f"\nDone. {success} sent. {len(remaining)} remaining saved to {REMAINING_FILE}.")
    else:
        if os.path.exists(REMAINING_FILE):
            os.remove(REMAINING_FILE)
        print(f"\nAll done! {success} sent.")


if __name__ == "__main__":
    main()
