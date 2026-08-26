import Link from "next/link";
import type { Metadata } from "next";
import PageShell from "@/components/seo/PageShell";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { SCHEDULE, type ScheduleEvent } from "@/lib/content";

const PATH = "/schedule";

export const metadata: Metadata = buildMetadata(PATH);

const TYPE_LABEL: Record<ScheduleEvent["type"], string> = {
  kickoff: "Kickoff",
  workshop: "Workshop",
  "office-hours": "Office Hours",
  social: "Social",
  deadline: "Deadline",
  ceremony: "Ceremony",
};

function groupByDay(events: ScheduleEvent[]) {
  const map = new Map<string, ScheduleEvent[]>();
  for (const e of events) {
    if (!map.has(e.day)) map.set(e.day, []);
    map.get(e.day)!.push(e);
  }
  return map;
}

/** Each session as a sub-event, so Google can surface individual workshops. */
const scheduleJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Banana Hacks 2026 schedule",
  itemListElement: SCHEDULE.map((event, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `${event.day}, ${event.time} — ${event.title}`,
  })),
};

export default function SchedulePage() {
  const grouped = groupByDay(SCHEDULE);

  return (
    <PageShell
      path={PATH}
      heading="Banana Hacks 2026 Schedule"
      lede={`Every session across ${siteConfig.dateRangeLabel}, from the opening ceremony to the award ceremony. All times are EDT unless noted, everything runs virtually on Discord and Zoom, and every session is recorded for participants in other time zones.`}
      jsonLd={[scheduleJsonLd]}
    >
      {Array.from(grouped.entries()).map(([day, events]) => (
        <section key={day} aria-labelledby={`day-${day.replace(/\s+/g, "-")}`} className="mb-9">
          <h2
            id={`day-${day.replace(/\s+/g, "-")}`}
            className="font-display font-bold text-lg text-studio-ink mb-3 pb-2 border-b border-banana-400/40"
          >
            {day}
          </h2>
          <ul className="space-y-2.5">
            {events.map((event) => (
              <li
                key={`${event.day}-${event.time}-${event.title}`}
                className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 bg-banana-50 hard-card-sm rounded-[6px] px-4 py-3"
              >
                <time className="font-mono text-xs text-studio-ink/70 sm:w-28 shrink-0">
                  {event.time}
                </time>
                <div className="flex-1">
                  <h3 className="font-body font-medium text-sm text-studio-ink leading-snug">
                    {event.title}
                  </h3>
                  {event.virtual && (
                    <p className="font-mono text-[11px] text-vine-500 mt-0.5">
                      Virtual via Discord + Zoom
                    </p>
                  )}
                </div>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-studio-ink/65 shrink-0">
                  {TYPE_LABEL[event.type]}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section
        aria-labelledby="schedule-notes"
        className="bg-banana-50 hard-card-sm rounded-[8px] p-6"
      >
        <h2
          id="schedule-notes"
          className="font-display font-bold text-lg text-studio-ink mb-2"
        >
          Notes on timing
        </h2>
        <ul className="space-y-2 font-body text-sm text-studio-ink/70">
          <li>
            The submission deadline is <strong>11:59 PM AoE</strong> (Anywhere on
            Earth) on Sunday, October 11 — the most generous possible
            interpretation of &ldquo;Sunday night&rdquo;.
          </li>
          <li>
            All workshops and office hours are recorded, and links go out to
            registered participants.
          </li>
          <li>
            Judging criteria and award categories are on the{" "}
            <Link href="/prizes" className="text-vine-500 hover:underline">
              prizes page
            </Link>
            .
          </li>
        </ul>
      </section>
    </PageShell>
  );
}
