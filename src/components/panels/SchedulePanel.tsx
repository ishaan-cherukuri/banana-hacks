"use client";

import { SCHEDULE, type ScheduleEvent } from "@/lib/content";

// Event types are distinguished by a flat fill from the site palette, not
// by a tint of an arbitrary hue. `red-500` was the only colour on the page
// that came from outside the design system.
const TYPE_META = {
  kickoff:       { color: "bg-banana-400",  text: "text-studio-ink",  dot: "#FDD835", label: "Kickoff",      card: "bg-banana-200"     },
  workshop:      { color: "bg-vine-500",    text: "text-banana-50",   dot: "#2C7466", label: "Workshop",     card: "bg-vine-100"       },
  "office-hours":{ color: "bg-studio-leaf", text: "text-banana-50",   dot: "#2E7D32", label: "Office Hours", card: "bg-banana-50"      },
  social:        { color: "bg-studio-ripe", text: "text-banana-50",   dot: "#E2542A", label: "Social",       card: "bg-banana-100"     },
  deadline:      { color: "bg-studio-ink",  text: "text-banana-400",  dot: "#191A17", label: "Deadline",     card: "bg-studio-ripe/25" },
  ceremony:      { color: "bg-banana-600",  text: "text-banana-50",   dot: "#C49A00", label: "Ceremony",     card: "bg-vine-200"       },
};

function groupByDay(events: ScheduleEvent[]) {
  const map = new Map<string, ScheduleEvent[]>();
  events.forEach((e) => {
    if (!map.has(e.day)) map.set(e.day, []);
    map.get(e.day)!.push(e);
  });
  return map;
}

export default function SchedulePanel() {
  const grouped = groupByDay(SCHEDULE);
  const days = Array.from(grouped.keys());

  return (
    <div className="window-scroll h-full overflow-y-auto bg-banana-100">
      {/* Header */}
      <div className="sticky top-0 z-10 px-6 py-3 bg-banana-300 border-b-[1.5px] border-studio-ink">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-extrabold text-base text-studio-ink">Schedule</h2>
            <p className="font-mono text-[11px] font-bold text-studio-ink/75">Oct 9-12, 2026 · EDT (convert to your timezone)</p>
          </div>
          {/* Legend */}
          <div className="flex gap-2 flex-wrap justify-end">
            {Object.entries(TYPE_META).slice(0, 4).map(([key, meta]) => (
              <div key={key} className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 border-[1.5px] border-studio-ink" style={{ background: meta.dot }} />
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-studio-ink/75">{meta.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="px-6 py-4 space-y-6">
        {days.map((day) => (
          <div key={day}>
            {/* Day header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="font-mono font-bold text-[11px] uppercase tracking-wider text-studio-ink px-2 py-0.5 bg-banana-400 border-[1.5px] border-studio-ink">
                {day}
              </div>
              <div className="flex-1 h-[1.5px] bg-studio-ink/25" />
            </div>

            {/* Events for this day */}
            <div className="space-y-2 pl-4 border-l-[1.5px] border-studio-ink/30">
              {grouped.get(day)!.map((event, i) => {
                const meta = TYPE_META[event.type];
                return (
                  <div
                    key={i}
                    className="relative pl-4 flex gap-3 items-start group"
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute -left-[6px] top-2 w-2.5 h-2.5 border-[1.5px] border-studio-ink shrink-0"
                      style={{ background: meta.dot }}
                    />

                    {/* Time */}
                    <span className="font-mono text-[11px] font-bold text-studio-ink/75 w-24 shrink-0 pt-0.5 tabular-nums">
                      {event.time}
                    </span>

                    {/* Event card */}
                    <div className={`flex-1 hard-card-sm px-3 py-2 ${meta.card}`}>
                      <div className="flex items-center gap-2">
                        <span className="font-body font-medium text-sm text-studio-ink leading-snug">
                          {event.title}
                        </span>
                        <span
                          className={`ml-auto shrink-0 text-[9px] font-mono font-bold px-1.5 py-0.5 border-[1.5px] border-studio-ink ${meta.color} ${meta.text} uppercase tracking-wider`}
                        >
                          {meta.label}
                        </span>
                      </div>
                      {event.virtual && (
                        <div className="font-mono text-[10px] font-bold text-vine-600 mt-0.5">
                          Online via Discord + Zoom
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="text-center py-4 font-mono text-[11px] font-bold uppercase tracking-wider text-studio-ink/65">
          All sessions recorded for every timezone · Links sent to registered participants
        </div>
      </div>
    </div>
  );
}
