"use client";

interface Event {
  time: string;
  title: string;
  type: "kickoff" | "workshop" | "office-hours" | "social" | "deadline" | "ceremony";
  day: string;
  virtual?: boolean;
}

const SCHEDULE: Event[] = [
  // Friday — Opening night
  { day: "Fri Oct 9",  time: "8:00 PM EDT",  title: "Opening Ceremony & Theme Reveal",          type: "kickoff",      virtual: true  },
  { day: "Fri Oct 9",  time: "9:30 PM EDT",  title: "Team Formation Social Hour",               type: "social",       virtual: true  },
  // Saturday — Build day 1
  { day: "Sat Oct 10", time: "11:00 AM EDT", title: "Workshop: Stable Diffusion from Scratch",  type: "workshop",     virtual: true  },
  { day: "Sat Oct 10", time: "2:00 PM EDT",  title: "Office Hours: APIs & Model Hosting",       type: "office-hours", virtual: true  },
  { day: "Sat Oct 10", time: "5:00 PM EDT",  title: "Workshop: LoRA Fine-tuning Deep Dive",     type: "workshop",     virtual: true  },
  { day: "Sat Oct 10", time: "9:00 PM EDT",  title: "Mid-point Check-in & Progress Showcase",   type: "social",       virtual: true  },
  // Sunday — Build day 2 + deadline
  { day: "Sun Oct 11", time: "11:00 AM EDT", title: "Office Hours: UX & Prompt Engineering",    type: "office-hours", virtual: true  },
  { day: "Sun Oct 11", time: "3:00 PM EDT",  title: "Workshop: ControlNet & Image Conditioning", type: "workshop",    virtual: true  },
  { day: "Sun Oct 11", time: "11:59 PM AoE", title: "Submissions Close",                         type: "deadline",     virtual: false },
  // Monday — Closing
  { day: "Mon Oct 12", time: "3:00 PM EDT",  title: "Judging & Demo Day (live streams)",        type: "ceremony",     virtual: true  },
  { day: "Mon Oct 12", time: "6:00 PM EDT",  title: "Award Ceremony & Closing",                 type: "ceremony",     virtual: true  },
];

const TYPE_META = {
  kickoff:      { color: "bg-banana-400",     text: "text-studio-ink",   dot: "#FDD835",  label: "Kickoff",      card: "bg-banana-400/20 border-banana-400/50"   },
  workshop:     { color: "bg-peri-500",       text: "text-white",        dot: "#4C6EF5",  label: "Workshop",     card: "bg-peri-100 border-peri-300/60"          },
  "office-hours":{ color: "bg-studio-leaf",   text: "text-white",        dot: "#2E7D32",  label: "Office Hours", card: "bg-studio-leaf/12 border-studio-leaf/35" },
  social:       { color: "bg-studio-ripe",    text: "text-white",        dot: "#FF6B35",  label: "Social",       card: "bg-studio-ripe/15 border-studio-ripe/45" },
  deadline:     { color: "bg-red-500",        text: "text-white",        dot: "#EF4444",  label: "Deadline",     card: "bg-red-50 border-red-300/70"             },
  ceremony:     { color: "bg-banana-500",     text: "text-white",        dot: "#C49A00",  label: "Ceremony",     card: "bg-banana-300/30 border-banana-400/50"   },
};

function groupByDay(events: Event[]) {
  const map = new Map<string, Event[]>();
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
      <div className="sticky top-0 z-10 px-6 py-3 backdrop-blur border-b border-studio-ink/06" style={{ background: "linear-gradient(90deg, rgba(253,216,53,0.35) 0%, rgba(76,110,245,0.20) 100%)" }}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-bold text-base text-studio-ink">Schedule</h2>
            <p className="text-xs font-mono text-studio-ink/45">Oct 9–12, 2026 · All times EDT</p>
          </div>
          {/* Legend */}
          <div className="flex gap-2 flex-wrap justify-end">
            {Object.entries(TYPE_META).slice(0, 4).map(([key, meta]) => (
              <div key={key} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ background: meta.dot }} />
                <span className="text-[10px] font-mono text-studio-ink/50">{meta.label}</span>
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
              <div className="font-display font-bold text-xs text-studio-ink px-3 py-1 rounded-full bg-banana-400/40 border border-banana-400/60">
                {day}
              </div>
              <div className="flex-1 h-px bg-banana-400/30" />
            </div>

            {/* Events for this day */}
            <div className="space-y-2 pl-4 border-l-2 border-banana-400/30">
              {grouped.get(day)!.map((event, i) => {
                const meta = TYPE_META[event.type];
                return (
                  <div
                    key={i}
                    className="relative pl-4 flex gap-3 items-start group"
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full border-2 border-banana-100 shrink-0"
                      style={{ background: meta.dot }}
                    />

                    {/* Time */}
                    <span className="font-mono text-xs text-studio-ink/45 w-24 shrink-0 pt-0.5">
                      {event.time}
                    </span>

                    {/* Event card */}
                    <div className={`flex-1 border rounded-lg px-3 py-2 transition-all group-hover:shadow-icon ${meta.card}`}>
                      <div className="flex items-center gap-2">
                        <span className="font-body font-medium text-sm text-studio-ink leading-snug">
                          {event.title}
                        </span>
                        <span
                          className={`ml-auto shrink-0 text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-full ${meta.color} ${meta.text} uppercase tracking-wider`}
                        >
                          {meta.label}
                        </span>
                      </div>
                      {event.virtual && (
                        <div className="text-[10px] font-mono text-peri-500 mt-0.5">
                          🎥 Virtual via Discord + Zoom
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="text-center py-4 text-xs font-mono text-studio-ink/35">
          All sessions recorded · Links sent to registered participants
        </div>
      </div>
    </div>
  );
}
