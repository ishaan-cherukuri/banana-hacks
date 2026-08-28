import Link from "next/link";
import type { Metadata } from "next";
import PageShell from "@/components/seo/PageShell";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { ELIGIBILITY } from "@/lib/content";

const PATH = "/register";

export const metadata: Metadata = buildMetadata(PATH);

const STEPS = [
  {
    title: "Register",
    desc: "Fill in the registration form: name, email, and a couple of questions about what you want to build. Takes about a minute.",
  },
  {
    title: "Join the Discord",
    desc: "The invite arrives by email. Discord is where team formation, mentor support, and announcements all happen.",
  },
  {
    title: "Show up Friday night",
    desc: "The opening ceremony and theme reveal are at 8:00 PM EDT on Friday, October 9. Team formation follows straight after.",
  },
];

export default function RegisterPage() {
  return (
    <PageShell
      path={PATH}
      heading="Register for Banana Hacks 2026"
      lede={`Registration is free, open to anyone anywhere, and takes about a minute. Banana Hacks runs ${siteConfig.dateRangeLabel}, entirely online.`}
    >
      <section aria-labelledby="cta" className="mb-12">
        <div className="bg-banana-200 hard-card p-6">
          <h2
            id="cta"
            className="font-display font-bold text-lg text-studio-ink mb-2"
          >
            Sign up
          </h2>
          <p className="font-body text-sm text-studio-ink/70 mb-4 max-w-xl">
            The registration form opens in the Banana Hacks studio, our desktop
            app on the homepage.
          </p>
          <Link
            href="/?open=apply"
            className="inline-flex items-center px-5 py-2.5 rounded-[6px] font-display font-semibold text-sm bg-banana-400 text-studio-ink hover:bg-banana-500 transition-colors"
          >
            Open the registration form
          </Link>
        </div>
      </section>

      <section aria-labelledby="how" className="mb-12">
        <h2
          id="how"
          className="font-display font-extrabold text-xl text-studio-ink mb-4"
        >
          How it works
        </h2>
        <ol className="space-y-3">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="flex gap-4 bg-banana-50 hard-card-sm rounded-[6px] px-5 py-4"
            >
              <span
                className="shrink-0 w-7 h-7 rounded-[6px] bg-banana-400 text-studio-ink font-display font-bold text-sm flex items-center justify-center"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="font-display font-semibold text-sm text-studio-ink mb-1">
                  {step.title}
                </h3>
                <p className="font-body text-xs text-studio-ink/65 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="eligible" className="mb-12">
        <h2
          id="eligible"
          className="font-display font-extrabold text-xl text-studio-ink mb-3"
        >
          Before you sign up
        </h2>
        <ul className="space-y-2 max-w-2xl">
          {ELIGIBILITY.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 font-body text-sm text-studio-ink/75"
            >
              <span className="text-banana-600 mt-0.5 shrink-0" aria-hidden="true">
                ◆
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="more">
        <h2
          id="more"
          className="font-display font-extrabold text-xl text-studio-ink mb-3"
        >
          Want more detail first?
        </h2>
        <p className="font-body text-sm text-studio-ink/75 leading-relaxed max-w-2xl">
          Read{" "}
          <Link href="/about" className="text-vine-500 hover:underline">
            about the hackathon
          </Link>
          , check the{" "}
          <Link href="/schedule" className="text-vine-500 hover:underline">
            full schedule
          </Link>
          , see{" "}
          <Link href="/prizes" className="text-vine-500 hover:underline">
            how projects are judged
          </Link>
          , or browse the{" "}
          <Link href="/faq" className="text-vine-500 hover:underline">
            FAQ
          </Link>
          .
        </p>
      </section>
    </PageShell>
  );
}
