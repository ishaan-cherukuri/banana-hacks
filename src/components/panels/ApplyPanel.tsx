"use client";

import { useState, useRef, useEffect } from "react";
import BananaMascot from "@/components/svgs/BananaMascot";
import PolicyModal from "@/components/PolicyModal";
import { siteConfig } from "@/lib/site";
import { publishRegistrationCount } from "@/lib/useRegistrationCount";

type Step = "form" | "success";
type PolicyType = "conduct" | "rules" | null;

interface FormData {
  name: string;
  email: string;
  emergencyName: string;
  emergencyCountryCode: string;
  emergencyPhone: string;
  workshops: string[];
  teamStatus: string;
  experience: string;
  projectIdea: string;
  agreeTerms: boolean;
}

const WORKSHOPS = ["HTML/CSS", "Python", "Machine Learning"];
const TEAM_STATUSES = ["Solo hacker", "I have a team ready", "Looking for teammates", "Not sure yet"];
const EXPERIENCE_LEVELS = ["Beginner (0 to 1 years)", "Intermediate (1 to 3 years)", "Advanced (3+ years)"];

// Dial codes. The previous list held 20 entries while the site advertises
// 60+ countries, so most participants had no correct option. Sorted by name.
const COUNTRY_CODES: { dial: string; name: string; flag: string }[] = [
  { dial: "+213", name: "Algeria", flag: "\u{1F1E9}\u{1F1FF}" },
  { dial: "+54",  name: "Argentina", flag: "\u{1F1E6}\u{1F1F7}" },
  { dial: "+61",  name: "Australia", flag: "\u{1F1E6}\u{1F1FA}" },
  { dial: "+43",  name: "Austria", flag: "\u{1F1E6}\u{1F1F9}" },
  { dial: "+880", name: "Bangladesh", flag: "\u{1F1E7}\u{1F1E9}" },
  { dial: "+32",  name: "Belgium", flag: "\u{1F1E7}\u{1F1EA}" },
  { dial: "+55",  name: "Brazil", flag: "\u{1F1E7}\u{1F1F7}" },
  { dial: "+1",   name: "Canada", flag: "\u{1F1E8}\u{1F1E6}" },
  { dial: "+56",  name: "Chile", flag: "\u{1F1E8}\u{1F1F1}" },
  { dial: "+86",  name: "China", flag: "\u{1F1E8}\u{1F1F3}" },
  { dial: "+57",  name: "Colombia", flag: "\u{1F1E8}\u{1F1F4}" },
  { dial: "+420", name: "Czechia", flag: "\u{1F1E8}\u{1F1FF}" },
  { dial: "+45",  name: "Denmark", flag: "\u{1F1E9}\u{1F1F0}" },
  { dial: "+20",  name: "Egypt", flag: "\u{1F1EA}\u{1F1EC}" },
  { dial: "+358", name: "Finland", flag: "\u{1F1EB}\u{1F1EE}" },
  { dial: "+33",  name: "France", flag: "\u{1F1EB}\u{1F1F7}" },
  { dial: "+49",  name: "Germany", flag: "\u{1F1E9}\u{1F1EA}" },
  { dial: "+233", name: "Ghana", flag: "\u{1F1EC}\u{1F1ED}" },
  { dial: "+30",  name: "Greece", flag: "\u{1F1EC}\u{1F1F7}" },
  { dial: "+852", name: "Hong Kong", flag: "\u{1F1ED}\u{1F1F0}" },
  { dial: "+36",  name: "Hungary", flag: "\u{1F1ED}\u{1F1FA}" },
  { dial: "+91",  name: "India", flag: "\u{1F1EE}\u{1F1F3}" },
  { dial: "+62",  name: "Indonesia", flag: "\u{1F1EE}\u{1F1E9}" },
  { dial: "+353", name: "Ireland", flag: "\u{1F1EE}\u{1F1EA}" },
  { dial: "+972", name: "Israel", flag: "\u{1F1EE}\u{1F1F1}" },
  { dial: "+39",  name: "Italy", flag: "\u{1F1EE}\u{1F1F9}" },
  { dial: "+81",  name: "Japan", flag: "\u{1F1EF}\u{1F1F5}" },
  { dial: "+254", name: "Kenya", flag: "\u{1F1F0}\u{1F1EA}" },
  { dial: "+60",  name: "Malaysia", flag: "\u{1F1F2}\u{1F1FE}" },
  { dial: "+52",  name: "Mexico", flag: "\u{1F1F2}\u{1F1FD}" },
  { dial: "+212", name: "Morocco", flag: "\u{1F1F2}\u{1F1E6}" },
  { dial: "+31",  name: "Netherlands", flag: "\u{1F1F3}\u{1F1F1}" },
  { dial: "+64",  name: "New Zealand", flag: "\u{1F1F3}\u{1F1FF}" },
  { dial: "+234", name: "Nigeria", flag: "\u{1F1F3}\u{1F1EC}" },
  { dial: "+47",  name: "Norway", flag: "\u{1F1F3}\u{1F1F4}" },
  { dial: "+92",  name: "Pakistan", flag: "\u{1F1F5}\u{1F1F0}" },
  { dial: "+51",  name: "Peru", flag: "\u{1F1F5}\u{1F1EA}" },
  { dial: "+63",  name: "Philippines", flag: "\u{1F1F5}\u{1F1ED}" },
  { dial: "+48",  name: "Poland", flag: "\u{1F1F5}\u{1F1F1}" },
  { dial: "+351", name: "Portugal", flag: "\u{1F1F5}\u{1F1F9}" },
  { dial: "+40",  name: "Romania", flag: "\u{1F1F7}\u{1F1F4}" },
  { dial: "+7",   name: "Russia", flag: "\u{1F1F7}\u{1F1FA}" },
  { dial: "+966", name: "Saudi Arabia", flag: "\u{1F1F8}\u{1F1E6}" },
  { dial: "+65",  name: "Singapore", flag: "\u{1F1F8}\u{1F1EC}" },
  { dial: "+27",  name: "South Africa", flag: "\u{1F1FF}\u{1F1E6}" },
  { dial: "+82",  name: "South Korea", flag: "\u{1F1F0}\u{1F1F7}" },
  { dial: "+34",  name: "Spain", flag: "\u{1F1EA}\u{1F1F8}" },
  { dial: "+94",  name: "Sri Lanka", flag: "\u{1F1F1}\u{1F1F0}" },
  { dial: "+46",  name: "Sweden", flag: "\u{1F1F8}\u{1F1EA}" },
  { dial: "+41",  name: "Switzerland", flag: "\u{1F1E8}\u{1F1ED}" },
  { dial: "+886", name: "Taiwan", flag: "\u{1F1F9}\u{1F1FC}" },
  { dial: "+66",  name: "Thailand", flag: "\u{1F1F9}\u{1F1ED}" },
  { dial: "+90",  name: "Turkey", flag: "\u{1F1F9}\u{1F1F7}" },
  { dial: "+256", name: "Uganda", flag: "\u{1F1FA}\u{1F1EC}" },
  { dial: "+971", name: "UAE", flag: "\u{1F1E6}\u{1F1EA}" },
  { dial: "+44",  name: "United Kingdom", flag: "\u{1F1EC}\u{1F1E7}" },
  { dial: "+1",   name: "United States", flag: "\u{1F1FA}\u{1F1F8}" },
  { dial: "+84",  name: "Vietnam", flag: "\u{1F1FB}\u{1F1F3}" },
];

/**
 * Keep what the user typed.
 *
 * The previous version truncated to 10 digits and re-grouped as 3-3-4. An
 * 11-digit UK, German or Nigerian number silently lost its last digit and
 * still passed validation, so the emergency contact, the one field that
 * exists for safety, was stored wrong for much of the world. See AUDIT.md C3.
 *
 * National formats vary too much to normalise sensibly, so we only strip
 * characters that are never part of a number and cap at E.164's 15 digits.
 */
function sanitizePhone(raw: string): string {
  return raw.replace(/[^\d\s()+.-]/g, "").slice(0, 24);
}

function phoneDigitCount(value: string): number {
  return value.replace(/\D/g, "").length;
}

/**
 * Google Calendar template link, built from siteConfig so it can't drift from
 * the dates shown everywhere else. The previous hardcoded literal ended at
 * 22:00Z, an hour short of the real 19:00 EDT close.
 */
const calendarUrl = (() => {
  const stamp = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: siteConfig.name,
    dates: `${stamp(siteConfig.startDate)}/${stamp(siteConfig.endDate)}`,
    details: `${siteConfig.description}\n\n${siteConfig.url}`,
    location: "Online",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
})();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function ApplyPanel() {
  const [step, setStep] = useState<Step>("form");
  const [openPolicy, setOpenPolicy] = useState<PolicyType>(null);
  const [form, setForm] = useState<FormData>({
    name: "", email: "", emergencyName: "", emergencyCountryCode: "+1", emergencyPhone: "", workshops: [], teamStatus: "", experience: "", projectIdea: "", agreeTerms: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [ccOpen, setCcOpen] = useState(false);
  const ccRef = useRef<HTMLDivElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  /**
   * Field order, used to move focus to the first invalid control after a
   * failed submit. Previously focus stayed on the submit button while the
   * first error scrolled out of view, so a keyboard or screen-reader user got
   * no indication the form had failed at all. See AUDIT.md A3.
   */
  const FIELD_ORDER: { key: keyof FormData; id: string }[] = [
    { key: "name",           id: "apply-name" },
    { key: "email",          id: "apply-email" },
    { key: "emergencyName",  id: "apply-ec-name" },
    { key: "emergencyPhone", id: "apply-ec-phone" },
    { key: "teamStatus",     id: "apply-team-status" },
    { key: "experience",     id: "apply-experience" },
    { key: "agreeTerms",     id: "apply-terms" },
  ];

  useEffect(() => {
    if (!ccOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (ccRef.current && !ccRef.current.contains(e.target as Node)) setCcOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [ccOpen]);

  const setField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleWorkshop = (w: string) => {
    setForm((f) => ({
      ...f,
      workshops: f.workshops.includes(w) ? f.workshops.filter((x) => x !== w) : [...f.workshops, w],
    }));
  };

  const validate = (): typeof errors => {
    const e: typeof errors = {};
    if (!form.name.trim())                          e.name          = "Name is required";
    if (!EMAIL_RE.test(form.email.trim()))          e.email         = "Valid email required";
    if (!form.emergencyName.trim())                 e.emergencyName = "Emergency contact name is required";
    // E.164 allows 4-15 digits for a subscriber number; 6 is a safe floor
    // that still rejects obvious typos without excluding short national formats.
    const phoneDigits = phoneDigitCount(form.emergencyPhone);
    if (phoneDigits < 6 || phoneDigits > 15) e.emergencyPhone = "Enter a phone number, including area code";
    if (!form.teamStatus)                           e.teamStatus = "Please select team status";
    if (!form.experience)                           e.experience = "Please select your experience level";
    if (!form.agreeTerms)                           e.agreeTerms = "You must agree to continue";
    setErrors(e);
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate();
    if (Object.keys(found).length > 0) {
      // Announce, then land the user on the first thing they need to fix.
      const first = FIELD_ORDER.find((f) => found[f.key]);
      requestAnimationFrame(() => {
        errorSummaryRef.current?.focus();
        if (first) {
          const el = document.getElementById(first.id);
          el?.scrollIntoView({ block: "center", behavior: "smooth" });
        }
      });
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:           form.name,
          email:          form.email,
          emergencyName:  form.emergencyName,
          emergencyPhone: `${form.emergencyCountryCode} ${form.emergencyPhone}`,
          workshops:      form.workshops,
          teamStatus:     form.teamStatus,
          experience:     form.experience,
          projectIdea:    form.projectIdea,
        }),
      });
      const result = (await res.json()) as { count?: unknown };
      if (!res.ok) throw new Error("submission failed");
      if (typeof result.count === "number") {
        publishRegistrationCount(result.count);
      }
      setStep("success");
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (step === "success") {
    return (
      <div className="h-full overflow-y-auto window-scroll bg-banana-100">
        <div className="min-h-full flex flex-col items-center justify-center px-8 py-10 text-center gap-5">
          <div className="animate-bounce-in">
            <BananaMascot size={96} variant="waving" className="animate-float mx-auto" />
          </div>

          <div>
            <h2 className="font-display font-extrabold text-2xl text-studio-ink mb-2">You&apos;re registered</h2>
            <p className="font-body text-studio-ink/75 text-sm max-w-sm mx-auto leading-relaxed">
              Your spot at Banana Hacks is saved under <strong className="text-studio-ink">{form.email}</strong>.
            </p>
          </div>

          {/*
            Says only what actually happens. This screen used to read "Check
            your email for your confirmation" while /api/apply did nothing but
            write a row, no mail is sent by the app at all, and offered a
            "Join Discord" button wired to null. Both were dead promises at the
            highest-intent moment in the funnel. See AUDIT.md T2, T4.
          */}
          <div className="hard-card bg-banana-50 p-4 max-w-sm text-left">
            <p className="eyebrow mb-2">What happens next</p>
            <ul className="space-y-2 font-body text-xs text-studio-ink/75 leading-relaxed">
              <li className="flex gap-2">
                <span className="font-mono text-[10px] font-bold text-studio-ink/70 shrink-0 mt-0.5">01</span>
                <span>
                  There&apos;s no automatic confirmation email, so nothing has gone wrong if your
                  inbox stays quiet.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-[10px] font-bold text-studio-ink/70 shrink-0 mt-0.5">02</span>
                <span>
                  We email the Discord invite and joining details to that address before
                  {" "}{siteConfig.dateRangeLabel.replace(", 2026", "")}.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-[10px] font-bold text-studio-ink/70 shrink-0 mt-0.5">03</span>
                <span>
                  Questions in the meantime?{" "}
                  <a href={`mailto:${siteConfig.contactEmail}`} className="text-vine-600 underline underline-offset-2">
                    {siteConfig.contactEmail}
                  </a>
                </span>
              </li>
            </ul>
          </div>

          <div className="flex gap-2 flex-wrap justify-center">
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Add to calendar
            </a>
            <a
              href="https://www.instagram.com/bananahacks26/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Follow @bananahacks26
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <PolicyModal type={openPolicy} onClose={() => setOpenPolicy(null)} />
    <div className="window-scroll h-full overflow-y-auto bg-banana-100">
      <div className="px-6 pt-6 pb-2">
        <div className="mb-1">
          <h2 className="font-display font-bold text-xl text-studio-ink">Register for Banana Hacks</h2>
          <p className="text-xs font-body text-studio-ink/70">Registration closes Oct 8 · Takes 2 minutes</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-6 pb-8 space-y-4" noValidate>
        {/* Name */}
        <div>
          <label htmlFor="apply-name" className="block text-xs font-display font-semibold text-studio-ink/70 mb-1">
            Full Name *
          </label>
          <input
            id="apply-name"
            type="text"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "apply-name-error" : undefined}
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            placeholder="Ada Lovelace"
            className={`w-full px-3 py-2.5 rounded-[6px] border-[1.5px] text-sm font-body bg-banana-50 text-studio-ink placeholder:text-studio-ink/65 focus:outline-none focus:border-studio-ink focus:bg-white focus:shadow-icon-sm transition-all ${errors.name ? "border-studio-ripe" : "border-studio-ink"}`}
          />
          {errors.name && <p id="apply-name-error" className="text-xs text-studio-alert mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="apply-email" className="block text-xs font-display font-semibold text-studio-ink/70 mb-1">
            Personal Email * <span className="text-studio-ink/65 font-normal">(don&apos;t use your school email)</span>
          </label>
          <input
            id="apply-email"
            type="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "apply-email-error" : undefined}
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            placeholder="ada@gmail.com"
            className={`w-full px-3 py-2.5 rounded-[6px] border-[1.5px] text-sm font-body bg-banana-50 text-studio-ink placeholder:text-studio-ink/65 focus:outline-none focus:border-studio-ink focus:bg-white focus:shadow-icon-sm transition-all ${errors.email ? "border-studio-ripe" : "border-studio-ink"}`}
          />
          {errors.email && <p id="apply-email-error" className="text-xs text-studio-alert mt-1">{errors.email}</p>}
        </div>

        {/* Emergency Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="apply-ec-name" className="block text-xs font-display font-semibold text-studio-ink/70 mb-1">
              Emergency Contact Name *
            </label>
            <input
              id="apply-ec-name"
              type="text"
              aria-invalid={!!errors.emergencyName}
              aria-describedby={errors.emergencyName ? "apply-ec-name-error" : undefined}
              value={form.emergencyName}
              onChange={(e) => setField("emergencyName", e.target.value)}
              placeholder="Jane Lovelace"
              className={`w-full px-3 py-2.5 rounded-[6px] border-[1.5px] text-sm font-body bg-banana-50 text-studio-ink placeholder:text-studio-ink/65 focus:outline-none focus:border-studio-ink focus:bg-white focus:shadow-icon-sm transition-all ${errors.emergencyName ? "border-studio-ripe" : "border-studio-ink"}`}
            />
            {errors.emergencyName && <p id="apply-ec-name-error" className="text-xs text-studio-alert mt-1">{errors.emergencyName}</p>}
          </div>
          <div>
            <label htmlFor="apply-ec-phone" className="block text-xs font-display font-semibold text-studio-ink/70 mb-1">
              Emergency Contact Phone *
            </label>
            <div className={`flex items-stretch rounded-[6px] border-[1.5px] bg-banana-50 overflow-visible ${errors.emergencyPhone ? "border-studio-ripe" : "border-studio-ink/30"} focus-within:border-studio-ink focus-within:shadow-icon-sm transition-all`}>
              <div className="relative shrink-0" ref={ccRef}>
                <button
                  type="button"
                  onClick={() => setCcOpen((o) => !o)}
                  className="h-full flex items-center gap-1 px-2.5 border-r border-studio-ink/25 text-sm font-body text-studio-ink hover:bg-banana-50 rounded-l-xl transition-colors"
                >
                  <span>{COUNTRY_CODES.find((c) => c.dial === form.emergencyCountryCode)?.flag ?? "🌐"}</span>
                  <span>{form.emergencyCountryCode}</span>
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="ml-0.5 opacity-50">
                    <path d="M1 5L5 1L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {ccOpen && (
                  <div className="absolute bottom-full mb-1 left-0 w-52 max-h-56 overflow-y-auto bg-banana-50 hard-card-sm z-20 py-1">
                    {COUNTRY_CODES.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => { setField("emergencyCountryCode", c.dial); setCcOpen(false); }}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-sm font-body text-left text-studio-ink hover:bg-banana-100 transition-colors"
                      >
                        <span>{c.flag}</span>
                        <span className="flex-1 truncate">{c.name}</span>
                        <span className="text-studio-ink/70">{c.dial}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input
                id="apply-ec-phone"
                type="tel"
                inputMode="tel"
                aria-invalid={!!errors.emergencyPhone}
                aria-describedby={errors.emergencyPhone ? "apply-ec-phone-error" : undefined}
                value={form.emergencyPhone}
                onChange={(e) => setField("emergencyPhone", sanitizePhone(e.target.value))}
                placeholder="e.g. 020 7946 0958"
                className="flex-1 min-w-0 px-3 py-2.5 rounded-r-xl text-sm font-body bg-transparent text-studio-ink placeholder:text-studio-ink/65 focus:outline-none"
              />
            </div>
            {errors.emergencyPhone && <p id="apply-ec-phone-error" className="text-xs text-studio-alert mt-1">{errors.emergencyPhone}</p>}
          </div>
        </div>

        {/* Workshops */}
        <div>
          <p id="apply-workshops-label" className="block text-xs font-display font-semibold text-studio-ink/70 mb-2">
            What workshops would you like to see? <span className="text-studio-ink/65 font-normal">(select all that apply)</span>
          </p>
          <div role="group" aria-labelledby="apply-workshops-label" className="flex flex-wrap gap-2">
            {WORKSHOPS.map((w) => {
              const selected = form.workshops.includes(w);
              return (
                <button
                  key={w}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleWorkshop(w)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-[6px] border-[1.5px] border-studio-ink text-sm font-body transition-colors ${
                    selected
                      ? "bg-banana-400 text-studio-ink font-semibold"
                      : "bg-banana-50 text-studio-ink/80 hover:bg-banana-200"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-[2px] border-[1.5px] border-studio-ink shrink-0 flex items-center justify-center transition-colors ${selected ? "bg-studio-ink" : "bg-banana-50"}`}>
                    {selected && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="#FDD835" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  {w}
                </button>
              );
            })}
          </div>
        </div>

        {/* Team status, radio card grid */}
        <div>
          <p id="apply-team-status-label" className="block text-xs font-display font-semibold text-studio-ink/70 mb-2">Team Status *</p>
          <div
            id="apply-team-status"
            role="radiogroup"
            aria-labelledby="apply-team-status-label"
            aria-invalid={!!errors.teamStatus}
            aria-describedby={errors.teamStatus ? "apply-team-status-error" : undefined}
            className="grid grid-cols-2 gap-2"
          >
            {TEAM_STATUSES.map((ts) => (
              <button
                key={ts}
                type="button"
                role="radio"
                aria-checked={form.teamStatus === ts}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-[6px] border-[1.5px] border-studio-ink cursor-pointer text-sm font-body transition-colors text-left ${
                  form.teamStatus === ts
                    ? "bg-banana-400 text-studio-ink font-semibold"
                    : "bg-banana-50 text-studio-ink/80 hover:bg-banana-200"
                }`}
                onClick={() => setField("teamStatus", ts)}
              >
                <span className={`w-3 h-3 rounded-full border-[1.5px] border-studio-ink shrink-0 ${form.teamStatus === ts ? "bg-studio-ink" : "bg-banana-50"}`} />
                {ts}
              </button>
            ))}
          </div>
          {errors.teamStatus && <p id="apply-team-status-error" className="text-xs text-studio-alert mt-1">{errors.teamStatus}</p>}
        </div>

        {/* Experience level */}
        <div>
          <p id="apply-experience-label" className="block text-xs font-display font-semibold text-studio-ink/70 mb-2">Experience Level *</p>
          <div
            id="apply-experience"
            role="radiogroup"
            aria-labelledby="apply-experience-label"
            aria-invalid={!!errors.experience}
            aria-describedby={errors.experience ? "apply-experience-error" : undefined}
            className="flex flex-wrap gap-2"
          >
            {EXPERIENCE_LEVELS.map((lvl) => (
              <button
                key={lvl}
                type="button"
                role="radio"
                aria-checked={form.experience === lvl}
                className={`flex items-center gap-2 px-3 py-2 rounded-[6px] border-[1.5px] border-studio-ink text-sm font-body transition-colors ${
                  form.experience === lvl
                    ? "bg-banana-400 text-studio-ink font-semibold"
                    : "bg-banana-50 text-studio-ink/80 hover:bg-banana-200"
                }`}
                onClick={() => setField("experience", lvl)}
              >
                <span className={`w-3 h-3 rounded-full border-[1.5px] border-studio-ink shrink-0 ${form.experience === lvl ? "bg-studio-ink" : "bg-banana-50"}`} />
                {lvl}
              </button>
            ))}
          </div>
          {errors.experience && <p id="apply-experience-error" className="text-xs text-studio-alert mt-1">{errors.experience}</p>}
        </div>

        {/* Project idea */}
        <div>
          <label htmlFor="apply-idea" className="block text-xs font-display font-semibold text-studio-ink/70 mb-1">
            Project Idea <span className="text-studio-ink/65 font-normal">(optional)</span>
          </label>
          <textarea
            id="apply-idea"
            value={form.projectIdea}
            onChange={(e) => setField("projectIdea", e.target.value)}
            placeholder="I'm thinking about building an AI tool that..."
            rows={3}
            className="w-full px-3 py-2.5 rounded-[6px] border-[1.5px] border-studio-ink text-sm font-body bg-banana-50 text-studio-ink placeholder:text-studio-ink/65 focus:outline-none focus:bg-white focus:shadow-icon-sm transition-all resize-none"
          />
        </div>

        {/*
          Native checkbox. This was a <div role="checkbox"> with two <button>
          elements nested inside it, interactive descendants are not allowed
          inside the checkbox role, and the nested link text polluted the
          accessible name. The policy links are now siblings, so the checkbox
          has one clean label and gets real keyboard semantics for free.
          See AUDIT.md A4.
        */}
        <div>
          <div className="flex items-start gap-2.5">
            <input
              id="apply-terms"
              type="checkbox"
              checked={form.agreeTerms}
              onChange={(e) => setField("agreeTerms", e.target.checked)}
              aria-invalid={!!errors.agreeTerms}
              aria-describedby={errors.agreeTerms ? "apply-terms-error" : undefined}
              className="mt-0.5 w-4 h-4 shrink-0 accent-banana-400 cursor-pointer"
            />
            <label htmlFor="apply-terms" className="text-xs font-body text-studio-ink/70 leading-relaxed cursor-pointer">
              I agree to the Code of Conduct and Submission Rules.
            </label>
          </div>
          <p className="text-xs font-body text-studio-ink/70 leading-relaxed mt-1.5 ml-[26px]">
            Read the{" "}
            <button
              type="button"
              onClick={() => setOpenPolicy("conduct")}
              className="text-vine-600 underline underline-offset-2 hover:text-vine-700 transition-colors"
            >
              Code of Conduct
            </button>{" "}
            and{" "}
            <button
              type="button"
              onClick={() => setOpenPolicy("rules")}
              className="text-vine-600 underline underline-offset-2 hover:text-vine-700 transition-colors"
            >
              Submission Rules
            </button>
            . Banana Hacks follows the{" "}
            <a
              href="https://mlh.io/code-of-conduct"
              target="_blank"
              rel="noopener noreferrer"
              className="text-vine-600 underline underline-offset-2 hover:text-vine-700 transition-colors"
            >
              MLH Code of Conduct
            </a>
            .
          </p>
          {errors.agreeTerms && <p id="apply-terms-error" className="text-xs text-studio-alert mt-1">{errors.agreeTerms}</p>}
        </div>

        {/*
          Live region so a failed submit is announced. Without it the panel
          rendered seven visible errors that assistive tech never mentioned.
        */}
        <div
          ref={errorSummaryRef}
          tabIndex={-1}
          role="alert"
          aria-live="assertive"
          className={Object.keys(errors).length > 0 || submitError ? "hard-card-sm bg-banana-50 border-studio-ripe p-3" : "sr-only"}
        >
          {submitError ? (
            <p className="text-xs text-studio-alert">{submitError}</p>
          ) : Object.keys(errors).length > 0 ? (
            <p className="text-xs text-studio-alert">
              {Object.keys(errors).length === 1
                ? "1 field needs your attention before you can apply."
                : `${Object.keys(errors).length} fields need your attention before you can apply.`}
            </p>
          ) : null}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 rounded-[6px] font-display font-bold text-sm bg-banana-400 text-studio-ink border-[1.5px] border-studio-ink shadow-icon press disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-icon flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <span className="w-4 h-4 border-2 border-studio-ink/30 border-t-studio-ink rounded-full animate-spin inline-block" />
              Submitting...
            </>
          ) : (
            "Register for Banana Hacks"
          )}
        </button>
      </form>
    </div>
    </>
  );
}
