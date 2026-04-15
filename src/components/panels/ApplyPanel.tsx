"use client";

import { useState } from "react";
import BananaMascot from "@/components/svgs/BananaMascot";

type Step = "form" | "success";

interface FormData {
  name: string;
  email: string;
  role: string;
  experience: string;
  teamStatus: string;
  projectIdea: string;
  agreeTerms: boolean;
}

const ROLES = ["Student", "Professional / Employed", "Researcher", "Freelancer / Independent", "Other"];
const EXPERIENCE_LEVELS = [
  "Beginner — I'm new to AI & hackathons",
  "Intermediate — I've used AI APIs before",
  "Advanced — I've trained or fine-tuned models",
  "Expert — I work with generative AI professionally",
];
const TEAM_STATUSES = ["Solo hacker", "I have a team ready", "Looking for teammates", "Not sure yet"];

export default function ApplyPanel() {
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState<FormData>({
    name: "", email: "", role: "", experience: "", teamStatus: "", projectIdea: "", agreeTerms: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const setField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!form.name.trim())                          e.name       = "Name is required";
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) e.email      = "Valid email required";
    if (!form.role)                                 e.role       = "Please select your role";
    if (!form.experience)                           e.experience = "Please select experience level";
    if (!form.teamStatus)                           e.teamStatus = "Please select team status";
    if (!form.agreeTerms)                           e.agreeTerms = "You must agree to continue";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/xwvapjnn", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name:        form.name,
          email:       form.email,
          role:        form.role,
          experience:  form.experience,
          team_status: form.teamStatus,
          project_idea: form.projectIdea,
        }),
      });
      if (!res.ok) throw new Error("submission failed");
      setStep("success");
    } catch {
      setErrors({ name: "Something went wrong — please try again." });
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
            compute credit instructions before Oct 9.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap justify-center">
          {["Join Discord", "Follow @BananaHacks", "Add to Calendar"].map((cta) => (
            <button
              key={cta}
              className="px-4 py-2 text-sm font-display font-semibold rounded-xl border border-banana-400/50 bg-banana-400/15 text-studio-ink hover:bg-banana-400/30 active:scale-95 transition-all"
            >
              {cta}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="window-scroll h-full overflow-y-auto bg-banana-100">
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-xl">📝</span>
          <div>
            <h2 className="font-display font-bold text-xl text-studio-ink">Apply to Hack</h2>
            <p className="text-xs font-body text-studio-ink/50">Registration closes Oct 8 · Takes 2 minutes</p>
          </div>
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
            Email Address *
          </label>
          <input
            id="apply-email"
            type="email"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            placeholder="ada@example.com"
            className={`w-full px-3 py-2.5 rounded-xl border text-sm font-body bg-white text-studio-ink placeholder:text-studio-ink/30 focus:outline-none focus:border-banana-400 focus:ring-2 focus:ring-banana-400/20 transition-all ${errors.email ? "border-red-400" : "border-studio-ink/15"}`}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        {/* Role + Experience */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="apply-role" className="block text-xs font-display font-semibold text-studio-ink/70 mb-1">Role *</label>
            <select
              id="apply-role"
              value={form.role}
              onChange={(e) => setField("role", e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl border text-sm font-body bg-white text-studio-ink focus:outline-none focus:border-banana-400 focus:ring-2 focus:ring-banana-400/20 transition-all ${errors.role ? "border-red-400" : "border-studio-ink/15"}`}
            >
              <option value="">Select...</option>
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            {errors.role && <p className="text-xs text-red-500 mt-1">{errors.role}</p>}
          </div>
          <div>
            <label htmlFor="apply-exp" className="block text-xs font-display font-semibold text-studio-ink/70 mb-1">AI Experience *</label>
            <select
              id="apply-exp"
              value={form.experience}
              onChange={(e) => setField("experience", e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl border text-sm font-body bg-white text-studio-ink focus:outline-none focus:border-banana-400 focus:ring-2 focus:ring-banana-400/20 transition-all ${errors.experience ? "border-red-400" : "border-studio-ink/15"}`}
            >
              <option value="">Select...</option>
              {EXPERIENCE_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
            {errors.experience && <p className="text-xs text-red-500 mt-1">{errors.experience}</p>}
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
              <span className="text-peri-500 underline underline-offset-2">Code of Conduct</span> and{" "}
              <span className="text-peri-500 underline underline-offset-2">Submission Rules</span>.
              Banana Hacks follows the MLH Code of Conduct.
            </span>
          </div>
          {errors.agreeTerms && <p className="text-xs text-red-500 mt-1 ml-2">{errors.agreeTerms}</p>}
        </div>

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
  );
}
