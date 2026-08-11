"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";

const STORAGE_KEY = "beaumont-knights-signup-draft";
const TOTAL_STEPS = 3;

interface FormData {
  // Player
  playerFirstName: string;
  playerLastName: string;
  dob: string;
  division: string;
  gender: string;
  grade: string;
  shirtSize: string;
  positions: string;
  experience: string;
  // Parent / Guardian
  parent1Name: string;
  parent1Relationship: string;
  parent1Phone: string;
  parent1Email: string;
  address: string;
  city: string;
  zip: string;
  parent2Name: string;
  parent2Phone: string;
  // Emergency
  emergencyName: string;
  emergencyRelationship: string;
  emergencyPhone: string;
  // Medical / Interest
  medicalNotes: string;
  howHeard: string;
  volunteerInterest: boolean;
  // Consent
  photoConsent: boolean;
  waiverConsent: boolean;
  commsOptIn: boolean;
}

const initialFormData: FormData = {
  playerFirstName: "",
  playerLastName: "",
  dob: "",
  division: "",
  gender: "",
  grade: "",
  shirtSize: "",
  positions: "",
  experience: "",
  parent1Name: "",
  parent1Relationship: "",
  parent1Phone: "",
  parent1Email: "",
  address: "",
  city: "Beaumont",
  zip: "",
  parent2Name: "",
  parent2Phone: "",
  emergencyName: "",
  emergencyRelationship: "",
  emergencyPhone: "",
  medicalNotes: "",
  howHeard: "",
  volunteerInterest: false,
  photoConsent: false,
  waiverConsent: false,
  commsOptIn: false,
};

const inputClass =
  "w-full rounded-md border border-knight-charcoal-light bg-knight-black px-3 py-2.5 text-base text-knight-silver placeholder:text-knight-silver/40 focus:border-knight-gold focus:outline-none";
const labelClass = "block text-sm font-heading uppercase tracking-wide text-knight-silver/80";

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className={labelClass}>
        {label}
        {required && <span className="text-knight-gold-bright"> *</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function loadDraft(): FormData {
  if (typeof window === "undefined") return initialFormData;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) return initialFormData;
  try {
    return { ...initialFormData, ...JSON.parse(saved) };
  } catch {
    return initialFormData;
  }
}

export default function SignupForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(loadDraft);
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (status === "idle") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, status]);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function goNext() {
    if (formRef.current?.reportValidity()) {
      setStep((s) => Math.min(s + 1, TOTAL_STEPS));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current?.reportValidity()) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      localStorage.removeItem(STORAGE_KEY);
      setStatus("submitted");
    } catch {
      setStatus("error");
    }
  }

  if (status === "submitted") {
    return (
      <div className="rounded border border-knight-gold/30 bg-knight-charcoal p-8 text-center">
        <p className="font-accent text-2xl leading-snug text-knight-gold-bright sm:text-3xl">
          Welcome to the Knights Family!
        </p>
        <p className="mt-3 text-knight-silver/85">
          Thanks, {data.playerFirstName || "friend"}! We&apos;ve got your
          info. You&apos;ll receive a confirmation email shortly, and
          we&apos;ll follow up with next steps.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button href="/schedule" variant="secondary">
            View Tryout Dates
          </Button>
          <Button href="/">Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-2">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
          <div key={s} className="flex flex-1 items-center gap-2">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-heading text-sm ${
                s <= step
                  ? "border-knight-gold bg-knight-gold/20 text-knight-gold-bright"
                  : "border-knight-charcoal-light text-knight-silver/50"
              }`}
            >
              {s}
            </div>
            {s < TOTAL_STEPS && (
              <div
                className={`h-0.5 flex-1 ${s < step ? "bg-knight-gold" : "bg-knight-charcoal-light"}`}
              />
            )}
          </div>
        ))}
      </div>
      <p className="mb-6 text-xs uppercase tracking-wide text-knight-silver/50">
        Step {step} of {TOTAL_STEPS}:{" "}
        {step === 1 ? "Player Info" : step === 2 ? "Parent & Emergency Contact" : "Health, Interest & Consent"}
      </p>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
        {step === 1 && (
          <div className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Player First Name" required>
                <input
                  className={inputClass}
                  required
                  value={data.playerFirstName}
                  onChange={(e) => update("playerFirstName", e.target.value)}
                />
              </Field>
              <Field label="Player Last Name" required>
                <input
                  className={inputClass}
                  required
                  value={data.playerLastName}
                  onChange={(e) => update("playerLastName", e.target.value)}
                />
              </Field>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Date of Birth" required>
                <input
                  type="date"
                  className={inputClass}
                  required
                  value={data.dob}
                  onChange={(e) => update("dob", e.target.value)}
                />
              </Field>
              <Field label="Division" required>
                <select
                  className={inputClass}
                  required
                  value={data.division}
                  onChange={(e) => update("division", e.target.value)}
                >
                  <option value="">Select division</option>
                  <option value="9U">9U</option>
                  <option value="10U">10U</option>
                  <option value="Not sure">Not sure</option>
                </select>
              </Field>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Shirt / Uniform Size" required>
                <select
                  className={inputClass}
                  required
                  value={data.shirtSize}
                  onChange={(e) => update("shirtSize", e.target.value)}
                >
                  <option value="">Select size</option>
                  {["YS", "YM", "YL", "AS", "AM", "AL"].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Current Grade (optional)">
                <input
                  className={inputClass}
                  value={data.grade}
                  onChange={(e) => update("grade", e.target.value)}
                />
              </Field>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Primary Position(s) (optional)">
                <input
                  className={inputClass}
                  placeholder="e.g. Shortstop, Pitcher"
                  value={data.positions}
                  onChange={(e) => update("positions", e.target.value)}
                />
              </Field>
              <Field label="Prior Experience (optional)">
                <input
                  className={inputClass}
                  placeholder="e.g. First season, 2 years rec ball"
                  value={data.experience}
                  onChange={(e) => update("experience", e.target.value)}
                />
              </Field>
            </div>
            <div className="flex justify-end pt-2">
              <Button type="button" onClick={goNext}>
                Next: Parent Info
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h3 className="font-heading text-sm uppercase tracking-wide text-knight-gold">
              Primary Parent / Guardian
            </h3>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full Name" required>
                <input
                  className={inputClass}
                  required
                  value={data.parent1Name}
                  onChange={(e) => update("parent1Name", e.target.value)}
                />
              </Field>
              <Field label="Relationship to Player" required>
                <input
                  className={inputClass}
                  required
                  placeholder="e.g. Mother, Father, Guardian"
                  value={data.parent1Relationship}
                  onChange={(e) => update("parent1Relationship", e.target.value)}
                />
              </Field>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Phone" required>
                <input
                  type="tel"
                  className={inputClass}
                  required
                  value={data.parent1Phone}
                  onChange={(e) => update("parent1Phone", e.target.value)}
                />
              </Field>
              <Field label="Email" required>
                <input
                  type="email"
                  className={inputClass}
                  required
                  value={data.parent1Email}
                  onChange={(e) => update("parent1Email", e.target.value)}
                />
              </Field>
            </div>
            <Field label="Home Address" required>
              <input
                className={inputClass}
                required
                value={data.address}
                onChange={(e) => update("address", e.target.value)}
              />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="City" required>
                <input
                  className={inputClass}
                  required
                  value={data.city}
                  onChange={(e) => update("city", e.target.value)}
                />
              </Field>
              <Field label="Zip Code" required>
                <input
                  className={inputClass}
                  required
                  value={data.zip}
                  onChange={(e) => update("zip", e.target.value)}
                />
              </Field>
            </div>

            <h3 className="pt-2 font-heading text-sm uppercase tracking-wide text-knight-gold">
              Secondary Parent / Guardian (optional)
            </h3>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full Name">
                <input
                  className={inputClass}
                  value={data.parent2Name}
                  onChange={(e) => update("parent2Name", e.target.value)}
                />
              </Field>
              <Field label="Phone">
                <input
                  type="tel"
                  className={inputClass}
                  value={data.parent2Phone}
                  onChange={(e) => update("parent2Phone", e.target.value)}
                />
              </Field>
            </div>

            <h3 className="pt-2 font-heading text-sm uppercase tracking-wide text-knight-gold">
              Emergency Contact (if different from above)
            </h3>
            <div className="grid gap-5 sm:grid-cols-3">
              <Field label="Name">
                <input
                  className={inputClass}
                  value={data.emergencyName}
                  onChange={(e) => update("emergencyName", e.target.value)}
                />
              </Field>
              <Field label="Relationship">
                <input
                  className={inputClass}
                  value={data.emergencyRelationship}
                  onChange={(e) => update("emergencyRelationship", e.target.value)}
                />
              </Field>
              <Field label="Phone">
                <input
                  type="tel"
                  className={inputClass}
                  value={data.emergencyPhone}
                  onChange={(e) => update("emergencyPhone", e.target.value)}
                />
              </Field>
            </div>

            <div className="flex justify-between pt-2">
              <Button type="button" variant="secondary" onClick={goBack}>
                Back
              </Button>
              <Button type="button" onClick={goNext}>
                Next: Health & Consent
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <Field label="Medical / Allergy Notes (optional, confidential — shared only with coaching staff)">
              <textarea
                className={inputClass}
                rows={3}
                value={data.medicalNotes}
                onChange={(e) => update("medicalNotes", e.target.value)}
              />
            </Field>

            <Field label="How did you hear about us?">
              <select
                className={inputClass}
                value={data.howHeard}
                onChange={(e) => update("howHeard", e.target.value)}
              >
                <option value="">Select one</option>
                <option value="Instagram">Instagram</option>
                <option value="Word of mouth">Word of mouth</option>
                <option value="School">School</option>
                <option value="Other">Other</option>
              </select>
            </Field>

            <label className="flex items-start gap-3 text-sm text-knight-silver/85">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-[var(--color-knight-gold)]"
                checked={data.volunteerInterest}
                onChange={(e) => update("volunteerInterest", e.target.checked)}
              />
              I&apos;m interested in volunteering (coaching, team parent,
              fundraising, gameday support).
            </label>

            <div className="space-y-3 rounded-md border border-knight-charcoal-light bg-knight-black p-4">
              <label className="flex items-start gap-3 text-sm text-knight-silver/85">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 accent-[var(--color-knight-gold)]"
                  checked={data.photoConsent}
                  onChange={(e) => update("photoConsent", e.target.checked)}
                />
                I consent to photos/video of my player being used on the
                Beaumont Knights website and social media. *
              </label>
              <label className="flex items-start gap-3 text-sm text-knight-silver/85">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 accent-[var(--color-knight-gold)]"
                  checked={data.waiverConsent}
                  onChange={(e) => update("waiverConsent", e.target.checked)}
                />
                I acknowledge the liability waiver and assumption of risk
                associated with youth baseball participation. *
              </label>
              <label className="flex items-start gap-3 text-sm text-knight-silver/85">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 accent-[var(--color-knight-gold)]"
                  checked={data.commsOptIn}
                  onChange={(e) => update("commsOptIn", e.target.checked)}
                />
                Send me email/text updates about schedule changes and news.
              </label>
            </div>

            {status === "error" && (
              <p className="text-sm text-red-400">
                Something went wrong submitting your form. Please try again,
                or email us at info@beaumontknights.com.
              </p>
            )}

            <div className="flex justify-between pt-2">
              <Button type="button" variant="secondary" onClick={goBack}>
                Back
              </Button>
              <Button type="submit">
                {status === "submitting" ? "Submitting…" : "Submit Registration"}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
