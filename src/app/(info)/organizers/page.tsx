import type { Metadata } from "next";
import PageShell from "@/components/seo/PageShell";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const PATH = "/organizers";

export const metadata: Metadata = buildMetadata(PATH);

const organizersJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Banana Hacks 2026 organizers",
  itemListElement: siteConfig.organizers.map((person, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Person",
      name: person.name,
      jobTitle: person.role,
    },
  })),
};

export default function OrganizersPage() {
  return (
    <PageShell
      path={PATH}
      heading="Meet the organizers"
      lede="Banana Hacks is run by Ishaan Cherukuri and Rajveer Dharkar. We are a small team, so the people planning the event are also the people answering your emails and helping out during the weekend."
      jsonLd={[organizersJsonLd]}
    >
      <section aria-labelledby="team" className="mb-12">
        <h2
          id="team"
          className="font-display font-extrabold text-xl text-studio-ink mb-4"
        >
          The team
        </h2>
        <ul className="grid sm:grid-cols-2 gap-4">
          {siteConfig.organizers.map((person, index) => (
            <li
              key={person.name}
              className={`hard-card p-6 ${index % 2 === 0 ? "bg-banana-300" : "bg-vine-200"}`}
            >
              <div className="w-12 h-12 rounded-full bg-studio-ink text-banana-400 flex items-center justify-center font-display font-extrabold text-sm mb-4">
                {person.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </div>
              <h3 className="font-display font-bold text-lg text-studio-ink">
                {person.name}
              </h3>
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-studio-ink/65 mt-1">
                {person.role}
              </p>
              {person.detail && (
                <p className="font-body text-sm text-studio-ink/70 leading-relaxed mt-3">
                  {person.detail}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="contact-the-team"
        className="bg-banana-50 hard-card-sm p-6"
      >
        <h2
          id="contact-the-team"
          className="font-display font-bold text-lg text-studio-ink mb-2"
        >
          Talk to an organizer
        </h2>
        <p className="font-body text-sm text-studio-ink/70 leading-relaxed max-w-xl mb-4">
          Have a question about joining, bringing a school team, mentoring, or
          the event itself? Send it to our shared inbox and one of us will reply.
        </p>
        <a
          href={`mailto:${siteConfig.contactEmail}`}
          className="inline-flex items-center px-5 py-2.5 rounded-[6px] font-display font-semibold text-sm bg-banana-400 text-studio-ink hover:bg-banana-500 transition-colors"
        >
          {siteConfig.contactEmail}
        </a>
      </section>
    </PageShell>
  );
}
