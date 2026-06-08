import resend
import base64
from dotenv import load_dotenv
import os

load_dotenv()
resend.api_key = os.getenv("RESEND_API_KEY")

with open("/Users/ishu/Downloads/BananaHacks_Sponsorship_Prospectus.docx.pdf", "rb") as f:
    pdf_data = base64.b64encode(f.read()).decode("utf-8")

params = {
    "from": "Banana Hacks <team@bananahacks.tech>",
    "to": ["ishaan.cherukuri0617@gmail.com"],
    "reply_to": "Ishaan.cherukuri@gmail.com",
    "subject": "The Rise of AI in Literature: From GPT to the Great Novel",
    "text": """Hi there,

Artificial intelligence is quietly reshaping the world of literature in ways few anticipated. From AI-assisted poetry generation to large language models co-authoring novels, the boundary between human creativity and machine output is growing increasingly blurry.

In 2024 alone, several AI-generated short stories made it through the slush piles of major literary magazines before editors caught on — not because the writing was poor, but because it was indistinguishably competent. Tools like GPT-4 can now mimic the cadences of Hemingway, the dense symbolism of Toni Morrison, or the dry wit of David Sedaris with unnerving accuracy.

But the more interesting question isn't whether AI can write — it's whether AI-assisted writing changes what we value in literature. If the struggle is removed, does the art remain?

Some argue yes: the idea is what matters, not the labor. Others contend that literature is inseparable from lived human experience, and that an AI producing a "moving" account of grief is a category error.

Either way, the conversation is no longer hypothetical. AI is already in the library.

---

(This was a test email. Please ignore the content above.)

Ishaan Cherukuri
Director, Banana Hacks
team@bananahacks.tech""",
    "attachments": [
        {
            "filename": "BananaHacks_Sponsorship_Prospectus.pdf",
            "content": pdf_data,
        }
    ],
}

response = resend.Emails.send(params)
print("Response:", response)
