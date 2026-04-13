"use client";

interface Event {
  time: string;
  title: string;
  type: "kickoff" | "workshop" | "office-hours" | "social" | "deadline" | "ceremony";
  day: string;
  virtual?: boolean;
}

const SCHEDULE: Event[] = [
  // Day 1
  { day: "Thu Oct 9",  time: "12:00 PM UTC", title: "Opening Ceremony & Theme Reveal",          type: "kickoff",      virtual: true  },
  { day: "Thu Oct 9",  time: "2:00 PM UTC",  title: "Workshop: Stable Diffusion from Scratch",  type: "workshop",     virtual: true  },
  { day: "Thu Oct 9",  time: "5:00 PM UTC",  title: "Team Formation Social Hour",               type: "social",       virtual: true  },
  // Day 2
  { day: "Fri Oct 10", time: "10:00 AM UTC", title: "Office Hours: APIs & Model Hosting",       type: "office-hours", virtual: true  },
  { day: "Fri Oct 10", time: "3:00 PM UTC",  title: "Workshop: LoRA Fine-tuning Deep Dive",     type: "workshop",     virtual: true  },
  // Day 3
  { day: "Sat Oct 11", time: "All Day",      title: "Hack Sprint — No scheduled events",        type: "social",       virtual: false },
  { day: "Sat Oct 11", time: "8:00 PM UTC",  title: "Mid-point Check-in & Progress Showcase",   type: "social",       virtual: true  },
  // Day 4
  { day: "Sun Oct 12", time: "10:00 AM UTC", title: "Office Hours: UX & Prompt Engineering",    type: "office-hours", virtual: true  },
  { day: "Sun Oct 12", time: "3:00 PM UTC",  title: "Workshop: ControlNet & Image Conditioning", type: "workshop",    virtual: true  },
  // Day 5–6
  { day: "Mon Oct 13", time: "All Day",      title: "Hack Sprint — Free build time",            type: "social",       virtual: false },
  { day: "Tue Oct 14", time: "All Day",      title: "Hack Sprint — Polish & prepare demo",      type: "social",       virtual: false },
  // Day 7
  { day: "Wed Oct 15", time: "11:59 PM UTC", title: "Submission Deadline",                       type: "deadline",     virtual: false },
  // Ceremony
  { day: "Thu Oct 16", time: "3:00 PM UTC",  title: "Judging & Demo Day (live streams)",        type: "ceremony",     virtual: true  },
  { day: "Thu Oct 16", time: "6:00 PM UTC",  title: "Award Ceremony & Closing",                 type: "ceremony",     virtual: true  },
];

const TYPE_META = {
  kickoff:      { color: "bg-banana-400",     text: "text-studio-ink",  dot: "#FDD835",  label: "Kickoff"       },
  workshop:     { color: "bg-peri-400",       text: "text-white",       dot: "#4C6EF5",  label: "Workshop"      },
  "office-hours":{ color: "bg-studio-leaf/20",text: "text-studio-leaf", dot: "#2E7D32",  label: "Office Hours"  },
  social:       { color: "bg-studio-ripe/15", text: "text-studio-ripe", dot: "#FF6B35",  label: "Social"        },
  deadline:     { color: "bg-red-100",        text: "text-red-600",     dot: "#EF4444",  label: "Deadline"      },
  ceremony:     { color: "bg-banana-400/20",  text: "text-banana-700",  dot: "#C49A00",  label: "Ceremony"      },
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
      <div className="sticky top-0 z-10 px-6 py-3 bg-banana-100/95 backdrop-blur border-b border-studio-ink/06">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-bold text-base text-studio-ink">Schedule</h2>
            <p className="text-xs font-mono text-studio-ink/45">All times in UTC · Oct 9–16, 2026</p>
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
              <div className="font-display font-bold text-sm text-studio-ink">
                {day}
              </div>
              <div className="flex-1 h-px bg-studio-ink/08" />
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
                    <div className="flex-1 bg-white/70 border border-studio-ink/06 rounded-lg px-3 py-2 hover:bg-white/95 hover:border-banana-400/25 transition-all group-hover:shadow-icon">
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
