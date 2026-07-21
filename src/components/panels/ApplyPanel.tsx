"use client";

import { useState, useRef, useEffect } from "react";
import BananaMascot from "@/components/svgs/BananaMascot";
import PolicyModal from "@/components/PolicyModal";

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
const EXPERIENCE_LEVELS = ["Beginner (0–1 years)", "Intermediate (1–3 years)", "Advanced (3+ years)"];

const COUNTRY_CODES = [
  { dial: "+1",   name: "United States", flag: "🇺🇸" },
  { dial: "+1",   name: "Canada", flag: "🇨🇦" },
  { dial: "+91",  name: "India", flag: "🇮🇳" },
  { dial: "+44",  name: "United Kingdom", flag: "🇬🇧" },
  { dial: "+61",  name: "Australia", flag: "🇦🇺" },
  { dial: "+49",  name: "Germany", flag: "🇩🇪" },
  { dial: "+33",  name: "France", flag: "🇫🇷" },
  { dial: "+86",  name: "China", flag: "🇨🇳" },
  { dial: "+81",  name: "Japan", flag: "🇯🇵" },
  { dial: "+82",  name: "South Korea", flag: "🇰🇷" },
  { dial: "+52",  name: "Mexico", flag: "🇲🇽" },
  { dial: "+55",  name: "Brazil", flag: "🇧🇷" },
  { dial: "+234", name: "Nigeria", flag: "🇳🇬" },
  { dial: "+27",  name: "South Africa", flag: "🇿🇦" },
  { dial: "+65",  name: "Singapore", flag: "🇸🇬" },
  { dial: "+971", name: "UAE", flag: "🇦🇪" },
  { dial: "+92",  name: "Pakistan", flag: "🇵🇰" },
  { dial: "+880", name: "Bangladesh", flag: "🇧🇩" },
  { dial: "+63",  name: "Philippines", flag: "🇵🇭" },
  { dial: "+34",  name: "Spain", flag: "🇪🇸" },
];

function formatPhoneNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  const parts = [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 10)].filter(Boolean);
  return parts.join(" ");
}

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

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!form.name.trim())                          e.name          = "Name is required";
    if (!EMAIL_RE.test(form.email.trim()))          e.email         = "Valid email required";
    if (!form.emergencyName.trim())                 e.emergencyName = "Emergency contact name is required";
    if (form.emergencyPhone.replace(/\D/g, "").length < 10) e.emergencyPhone = "Valid 10-digit phone number required";
    if (!form.teamStatus)                           e.teamStatus = "Please select team status";
    if (!form.experience)                           e.experience = "Please select your experience level";
    if (!form.agreeTerms)                           e.agreeTerms = "You must agree to continue";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
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
      if (!res.ok) throw new Error("submission failed");
      setStep("success");
    } catch {
      setSubmitError("Something went wrong — please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (step === "success") {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-banana-100 px-8 text-center gap-4">
        <div className="animate-bounce-in">
          <BananaMascot size={100} variant="waving" className="animate-float mx-auto" />
        </div>
        <div>
          <h2 className="font-display font-extrabold text-2xl text-studio-ink mb-1">You&apos;re in! 🎉</h2>
          <p className="font-body text-studio-ink/60 text-sm max-w-xs">
            Check <strong>{form.email}</strong> for your confirmation. We&apos;ll send Discord access and
            event notices before Oct 9.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap justify-center">
          {[
            { label: "Join Discord", href: null },
            { label: "Follow @BananaHacks", href: "https://www.instagram.com/bananahacks26/" },
            { label: "Add to Calendar", href: "https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20261010T000000Z%2F20261012T220000Z&details=Banana%20Hacks%202026.%20A%203-day%20virtual%20hackathon%20where%20builders%2C%20designers%2C%20and%20dreamers%20come%20together%20to%20create%20something%20extraordinary%21%0A&location=Online&text=Banana%20Hacks" },
          ].map(({ label, href }) => (
            href ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-display font-semibold rounded-xl border border-banana-400/50 bg-banana-400/15 text-studio-ink hover:bg-banana-400/30 active:scale-95 transition-all"
              >
                {label}
              </a>
            ) : (
              <button
                key={label}
                className="px-4 py-2 text-sm font-display font-semibold rounded-xl border border-banana-400/50 bg-banana-400/15 text-studio-ink hover:bg-banana-400/30 active:scale-95 transition-all"
              >
                {label}
              </button>
            )
          ))}
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
          <h2 className="font-display font-bold text-xl text-studio-ink">Apply to Hack</h2>
          <p className="text-xs font-body text-studio-ink/50">Registration closes Oct 8 · Takes 2 minutes</p>
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
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            placeholder="Ada Lovelace"
            className={`w-full px-3 py-2.5 rounded-xl border text-sm font-body bg-white text-studio-ink placeholder:text-studio-ink/30 focus:outline-none focus:border-banana-400 focus:ring-2 focus:ring-banana-400/20 transition-all ${errors.name ? "border-red-400" : "border-studio-ink/15"}`}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="apply-email" className="block text-xs font-display font-semibold text-studio-ink/70 mb-1">
            Personal Email * <span className="text-studio-ink/40 font-normal">(don&apos;t use your school email)</span>
          </label>
          <input
            id="apply-email"
            type="email"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            placeholder="ada@gmail.com"
            className={`w-full px-3 py-2.5 rounded-xl border text-sm font-body bg-white text-studio-ink placeholder:text-studio-ink/30 focus:outline-none focus:border-banana-400 focus:ring-2 focus:ring-banana-400/20 transition-all ${errors.email ? "border-red-400" : "border-studio-ink/15"}`}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
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
              value={form.emergencyName}
              onChange={(e) => setField("emergencyName", e.target.value)}
              placeholder="Jane Lovelace"
              className={`w-full px-3 py-2.5 rounded-xl border text-sm font-body bg-white text-studio-ink placeholder:text-studio-ink/30 focus:outline-none focus:border-banana-400 focus:ring-2 focus:ring-banana-400/20 transition-all ${errors.emergencyName ? "border-red-400" : "border-studio-ink/15"}`}
            />
            {errors.emergencyName && <p className="text-xs text-red-500 mt-1">{errors.emergencyName}</p>}
          </div>
          <div>
            <label htmlFor="apply-ec-phone" className="block text-xs font-display font-semibold text-studio-ink/70 mb-1">
              Emergency Contact Phone *
            </label>
            <div className={`flex items-stretch rounded-xl border bg-white overflow-visible ${errors.emergencyPhone ? "border-red-400" : "border-studio-ink/15"} focus-within:border-banana-400 focus-within:ring-2 focus-within:ring-banana-400/20 transition-all`}>
              <div className="relative shrink-0" ref={ccRef}>
                <button
                  type="button"
                  onClick={() => setCcOpen((o) => !o)}
                  className="h-full flex items-center gap-1 px-2.5 border-r border-studio-ink/10 text-sm font-body text-studio-ink hover:bg-banana-50 rounded-l-xl transition-colors"
                >
                  <span>{COUNTRY_CODES.find((c) => c.dial === form.emergencyCountryCode)?.flag ?? "🌐"}</span>
                  <span>{form.emergencyCountryCode}</span>
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="ml-0.5 opacity-50">
                    <path d="M1 5L5 1L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {ccOpen && (
                  <div className="absolute bottom-full mb-1 left-0 w-52 max-h-56 overflow-y-auto bg-white border border-studio-ink/15 rounded-xl shadow-lg z-20 py-1">
                    {COUNTRY_CODES.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => { setField("emergencyCountryCode", c.dial); setCcOpen(false); }}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-sm font-body text-left text-studio-ink hover:bg-banana-100 transition-colors"
                      >
                        <span>{c.flag}</span>
                        <span className="flex-1 truncate">{c.name}</span>
                        <span className="text-studio-ink/50">{c.dial}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input
                id="apply-ec-phone"
                type="tel"
                inputMode="numeric"
                value={form.emergencyPhone}
                onChange={(e) => setField("emergencyPhone", formatPhoneNumber(e.target.value))}
                placeholder="555 123 4567"
                className="flex-1 min-w-0 px-3 py-2.5 rounded-r-xl text-sm font-body bg-transparent text-studio-ink placeholder:text-studio-ink/30 focus:outline-none"
              />
            </div>
            {errors.emergencyPhone && <p className="text-xs text-red-500 mt-1">{errors.emergencyPhone}</p>}
          </div>
        </div>

        {/* Workshops */}
        <div>
          <p className="block text-xs font-display font-semibold text-studio-ink/70 mb-2">
            What workshops would you like to see? <span className="text-studio-ink/40 font-normal">(select all that apply)</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {WORKSHOPS.map((w) => {
              const selected = form.workshops.includes(w);
              return (
                <button
                  key={w}
                  type="button"
                  onClick={() => toggleWorkshop(w)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-body transition-all ${
                    selected
                      ? "border-banana-400 bg-banana-400/15 text-studio-ink font-medium"
                      : "border-studio-ink/12 bg-white text-studio-ink/60 hover:border-banana-400/40 hover:bg-banana-50"
                  }`}
                >
                  <div className={`w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center transition-all ${selected ? "bg-banana-400 border-banana-600" : "border-studio-ink/30"}`}>
                    {selected && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="#1A1A2E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  {w}
                </button>
              );
            })}
          </div>
        </div>

        {/* Team status — radio card grid */}
        <div>
          <p className="block text-xs font-display font-semibold text-studio-ink/70 mb-2">Team Status *</p>
          <div className="grid grid-cols-2 gap-2">
            {TEAM_STATUSES.map((ts) => (
              <button
                key={ts}
                type="button"
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border cursor-pointer text-sm font-body transition-all text-left ${
                  form.teamStatus === ts
                    ? "border-banana-400 bg-banana-400/15 text-studio-ink font-medium"
                    : "border-studio-ink/12 bg-white text-studio-ink/60 hover:border-banana-400/40 hover:bg-banana-50"
                }`}
                onClick={() => setField("teamStatus", ts)}
              >
                <span className={`w-3 h-3 rounded-full border-2 shrink-0 flex items-center justify-center ${form.teamStatus === ts ? "border-banana-600 bg-banana-400" : "border-studio-ink/25"}`} />
                {ts}
              </button>
            ))}
          </div>
          {errors.teamStatus && <p className="text-xs text-red-500 mt-1">{errors.teamStatus}</p>}
        </div>

        {/* Experience level */}
        <div>
          <p className="block text-xs font-display font-semibold text-studio-ink/70 mb-2">Experience Level *</p>
          <div className="flex flex-wrap gap-2">
            {EXPERIENCE_LEVELS.map((lvl) => (
              <button
                key={lvl}
                type="button"
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-body transition-all ${
                  form.experience === lvl
                    ? "border-banana-400 bg-banana-400/15 text-studio-ink font-medium"
                    : "border-studio-ink/12 bg-white text-studio-ink/60 hover:border-banana-400/40 hover:bg-banana-50"
                }`}
                onClick={() => setField("experience", lvl)}
              >
                <span className={`w-3 h-3 rounded-full border-2 shrink-0 ${form.experience === lvl ? "border-banana-600 bg-banana-400" : "border-studio-ink/25"}`} />
                {lvl}
              </button>
            ))}
          </div>
          {errors.experience && <p className="text-xs text-red-500 mt-1">{errors.experience}</p>}
        </div>

        {/* Project idea */}
        <div>
          <label htmlFor="apply-idea" className="block text-xs font-display font-semibold text-studio-ink/70 mb-1">
            Project Idea <span className="text-studio-ink/40 font-normal">(optional)</span>
          </label>
          <textarea
            id="apply-idea"
            value={form.projectIdea}
            onChange={(e) => setField("projectIdea", e.target.value)}
            placeholder="I'm thinking about building an AI tool that..."
            rows={3}
            className="w-full px-3 py-2.5 rounded-xl border border-studio-ink/15 text-sm font-body bg-white text-studio-ink placeholder:text-studio-ink/30 focus:outline-none focus:border-banana-400 focus:ring-2 focus:ring-banana-400/20 transition-all resize-none"
          />
        </div>

        {/* Terms — simple checkbox, no label/div conflict */}
        <div>
          <div
            role="checkbox"
            aria-checked={form.agreeTerms}
            tabIndex={0}
            className={`flex items-start gap-2.5 cursor-pointer rounded-lg p-2 -mx-2 transition-colors ${form.agreeTerms ? "bg-banana-400/08" : "hover:bg-studio-ink/04"}`}
            onClick={() => setField("agreeTerms", !form.agreeTerms)}
            onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); setField("agreeTerms", !form.agreeTerms); } }}
          >
            <div className={`mt-0.5 w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center transition-all ${form.agreeTerms ? "bg-banana-400 border-banana-600" : "border-studio-ink/30"}`}>
              {form.agreeTerms && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="#1A1A2E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="text-xs font-body text-studio-ink/65 leading-relaxed select-none">
              I agree to the{" "}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setOpenPolicy("conduct"); }}
                className="text-peri-500 underline underline-offset-2 hover:text-peri-600 transition-colors"
              >
                Code of Conduct
              </button>{" "}
              and{" "}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setOpenPolicy("rules"); }}
                className="text-peri-500 underline underline-offset-2 hover:text-peri-600 transition-colors"
              >
                Submission Rules
              </button>.
              Banana Hacks follows the MLH Code of Conduct.
            </span>
          </div>
          {errors.agreeTerms && <p className="text-xs text-red-500 mt-1 ml-2">{errors.agreeTerms}</p>}
        </div>

        {submitError && (
          <p className="text-xs text-red-500 text-center">{submitError}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 rounded-xl font-display font-bold text-sm bg-banana-400 text-studio-ink hover:bg-banana-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all hover:shadow-icon active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <span className="w-4 h-4 border-2 border-studio-ink/30 border-t-studio-ink rounded-full animate-spin inline-block" />
              Submitting...
            </>
          ) : (
            "Apply to Banana Hacks 🍌"
          )}
        </button>
      </form>
    </div>
    </>
  );
}
