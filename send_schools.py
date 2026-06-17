import resend
import csv
import re
import time
import os
from dotenv import load_dotenv

load_dotenv()
resend.api_key = os.getenv("RESEND_API_KEY")

SUBJECT = "Free Virtual Hackathon for High Schoolers: BananaHacks 2026"
CSV_PATH = "/Users/ishu/Downloads/ CCC Email Tracker 2026 - Schools.csv"


def extract_emails(text):
    return re.findall(r'[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}', text)


def extract_greeting(raw, emails):
    clean = raw
    for e in emails:
        clean = clean.replace(e, '')

    # "Last, Mr./Mrs./Ms./Dr. First" pattern e.g. "Bielak, Mr. Steven"
    m = re.search(r'[A-Z][a-z]+,\s+(Mr\.|Mrs\.|Ms\.|Dr\.)\s+\w+', clean)
    if m:
        parts = m.group(0).split(',')
        last = parts[0].strip()
        title = re.search(r'(Mr\.|Mrs\.|Ms\.|Dr\.)', parts[1]).group(1)
        return f"Dear {title} {last}"

    # Standard "Mr./Mrs./Ms./Dr. First Last" pattern
    m = re.search(r'(Mr\.|Mrs\.|Ms\.|Dr\.)\s+(\w+)(?:\s+(\w+))?', clean)
    if m:
        title = m.group(1)
        # Use last name if both first and last present, else the only name
        last = m.group(3) if m.group(3) else m.group(2)
        return f"Dear {title} {last}"

    # No title — use first capitalized word that looks like a name
    clean2 = re.sub(r'[→\-–,:()\[\]Email]', ' ', clean)
    skip = {'Academy', 'Coordinator', 'School', 'High', 'Send', 'Message',
            'Teacher', 'Directory', 'Class', 'Email', 'Contact'}
    for word in clean2.split():
        if word and word[0].isupper() and len(word) > 2 and word not in skip and word.isalpha():
            return f"Dear {word.title()}"

    return "Dear Educator"


def build_body(school, greeting, cc_emails):
    cc_note = ""
    if cc_emails:
        cc_list = ", ".join(cc_emails)
        cc_note = (f"\n\nNote: I have also CC'd additional contacts at {school} "
                   f"({cc_list}) on this message to ensure this opportunity reaches the right people.")

    return f"""{greeting},

My name is Ishaan Cherukuri, and I am the Founder of BananaHacks and part of the national team for BananaHacks (www.bananahacks.tech), an international nonprofit dedicated to harnessing the intersection of math and language to equip students of all backgrounds with cutting-edge technology, problem-solving, and interdisciplinary thinking skills. We are organizing BananaHacks 2026 (www.bananahacks.tech), a free 24-hour invention competition and educational event for high school students coming up this October. I was hoping you could send the following message to share the opportunity with the students at {school}:

***
BananaHacks — Signups for BananaHacks 2026 are now open!

What: BananaHacks is a free virtual hackathon focused on generative AI and image creation, where students come together to build creative software projects using cutting-edge technology. Participants can explore tracks such as image generation, model fine-tuning, and creative AI tools. No experience is needed, and we'll provide workshops, office hours, GPU credits, mentorship, prizes, and opportunities to gain skills in computer science, artificial intelligence, machine learning, and creative technology.

When & Where: BananaHacks 2026 will take place virtually from October 9–16, 2026, with the main hacking sprint from October 9–12. Thanks to our sponsors, the event is COMPLETELY FREE!

Sign up at: www.bananahacks.tech

For more information, please visit www.bananahacks.tech. Feel free to contact the BananaHacks team with any questions!

Please let me know if I may also send a flyer for distribution around campus and digitally.

Thank you so much!{cc_note}

Best,
Ishaan Cherukuri
Founder, BananaHacks
Class of 2028"""


def main():
    with open(CSV_PATH) as f:
        rows = list(csv.DictReader(f))

    schools = [r for r in rows if '@' in r.get('Email', '')]
    print(f"Found {len(schools)} schools with emails.\n")

    success = 0
    failed = []

    for r in schools:
        school = r['School'].strip()
        emails = extract_emails(r['Email'])
        if not emails:
            continue

        to_email = emails[0]
        cc_emails = emails[1:] if len(emails) > 1 else []
        greeting = extract_greeting(r['Email'], emails)
        body = build_body(school, greeting, cc_emails)

        params = {
            "from": "Banana Hacks <team@bananahacks.tech>",
            "to": [to_email],
            "reply_to": "Ishaan.cherukuri@gmail.com",
            "subject": SUBJECT,
            "text": body,
        }
        if cc_emails:
            params["cc"] = cc_emails

        try:
            resend.Emails.send(params)
            success += 1
            cc_note = f" (CC: {', '.join(cc_emails)})" if cc_emails else ""
            print(f"[{success}] OK  {school} -> {to_email}{cc_note} | {greeting}")
        except Exception as e:
            failed.append(school)
            print(f"FAIL {school} -> {to_email} — {e}")

        time.sleep(0.5)

    print(f"\nDone. {success} sent, {len(failed)} failed.")
    if failed:
        print("Failed:", failed)


if __name__ == "__main__":
    main()
