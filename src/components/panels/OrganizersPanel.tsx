"use client";

import { siteConfig } from "@/lib/site";

export default function OrganizersPanel() {
  return (
    <div className="window-scroll h-full overflow-y-auto bg-banana-100">
      <div className="px-6 py-7 max-w-2xl">
        <p className="eyebrow mb-1">The people behind the event</p>
        <h2 className="font-display font-extrabold text-2xl text-studio-ink mb-2">
          Organizers
        </h2>
        <p className="font-body text-sm text-studio-ink/75 leading-relaxed mb-6 max-w-xl">
          We&apos;re the small team putting Banana Hacks together, from the
          schedule and workshops to sponsors, questions, and demo day.
        </p>

        <ul className="grid sm:grid-cols-2 gap-4 mb-6">
          {siteConfig.organizers.map((person, index) => (
            <li
              key={person.name}
              className={`hard-card p-5 ${index % 2 === 0 ? "bg-banana-300" : "bg-vine-200"}`}
            >
              <div className="w-11 h-11 rounded-full bg-studio-ink text-banana-400 flex items-center justify-center font-display font-extrabold text-sm mb-4">
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
                <p className="font-body text-xs text-studio-ink/70 leading-relaxed mt-3">
                  {person.detail}
                </p>
              )}
            </li>
          ))}
        </ul>

        <div className="bg-banana-50 hard-card-sm p-4">
          <h3 className="font-display font-bold text-sm text-studio-ink mb-1">
            Need to reach us?
          </h3>
          <p className="font-body text-xs text-studio-ink/70 leading-relaxed">
            Email{" "}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-vine-600 underline underline-offset-2 hover:text-vine-700"
            >
              {siteConfig.contactEmail}
            </a>
            . Participant questions, school questions, and general event
            questions all go there.
          </p>
        </div>
      </div>
    </div>
  );
}
