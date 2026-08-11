"use client";

import { useState } from "react";
import Button from "@/components/Button";

const inputClass =
  "w-full rounded-md border border-knight-charcoal-light bg-knight-black px-3 py-2.5 text-base text-knight-silver placeholder:text-knight-silver/40 focus:border-knight-gold focus:outline-none";
const labelClass = "block text-sm font-heading uppercase tracking-wide text-knight-silver/80";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("submitted");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "submitted") {
    return (
      <div className="rounded border border-knight-gold/30 bg-knight-charcoal p-6 text-center">
        <p className="font-accent text-xl leading-snug text-knight-gold-bright sm:text-2xl">Thanks for reaching out!</p>
        <p className="mt-2 text-sm text-knight-silver/80">
          We&apos;ll get back to you as soon as we can.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label className="block">
        <span className={labelClass}>Name *</span>
        <input name="name" required className={`mt-1.5 ${inputClass}`} />
      </label>
      <label className="block">
        <span className={labelClass}>Email *</span>
        <input name="email" type="email" required className={`mt-1.5 ${inputClass}`} />
      </label>
      <label className="block">
        <span className={labelClass}>Topic</span>
        <select name="topic" className={`mt-1.5 ${inputClass}`}>
          <option value="General">General question</option>
          <option value="Tryouts">Tryouts / registration</option>
          <option value="Sponsorship">Sponsorship</option>
          <option value="Volunteering">Volunteering</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <label className="block">
        <span className={labelClass}>Message *</span>
        <textarea name="message" required rows={4} className={`mt-1.5 ${inputClass}`} />
      </label>

      {status === "error" && (
        <p className="text-sm text-red-400">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <Button type="submit">
        {status === "submitting" ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
