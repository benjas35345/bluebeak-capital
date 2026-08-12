"use client";

import { useState } from "react";
import { submitContact } from "./actions";
import { SUPPORT_EMAIL } from "@/lib/site-data";
import { Reveal } from "@/components/site/primitives";

type FormState = "idle" | "sending" | "sent" | "error";

export default function ContactClient() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      subject: String(data.get("subject") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };
    if (!payload.name || !payload.email || !payload.message) {
      setError("Please fill in your name, email, and message.");
      setState("error");
      return;
    }
    setState("sending");
    setError(null);
    try {
      await submitContact(payload);
      setState("sent");
      form.reset();
    } catch {
      setError("Something went wrong while sending. Please try again, or email us directly.");
      setState("error");
    }
  };

  return (
    <main>
      <section className="relative overflow-hidden pb-[clamp(96px,12vw,160px)] pt-28">
        <div
          aria-hidden
          className="absolute right-[-10%] top-[-30%] h-[460px] w-[460px] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(56,189,248,0.12), transparent 70%)" }}
        />
        <div className="relative mx-auto grid max-w-[1200px] gap-14 px-5 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h1 className="bb-rise bb-display max-w-[10ch] text-[clamp(56px,7vw,104px)] text-bb-ink">
              Get in <span className="bb-gradient-text">touch</span>
            </h1>
            <p className="bb-rise mt-5 max-w-[42ch] text-lg leading-relaxed text-bb-ink2" style={{ "--bb-delay": "120ms" } as React.CSSProperties}>
              If you have any questions, send us a message and a member of our team will respond within
              24 hours or less.
            </p>

            <div className="bb-rise mt-10 space-y-5" style={{ "--bb-delay": "240ms" } as React.CSSProperties}>
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-bb-line bg-bb-raised">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="#38BDF8" strokeWidth="1.5" />
                    <path d="M3.5 7l8.5 6 8.5-6" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-bb-ink">Email</p>
                  <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[15px] text-bb-ink2 hover:text-bb-accent">
                    {SUPPORT_EMAIL}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-bb-line bg-bb-raised">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="8.5" stroke="#38BDF8" strokeWidth="1.5" />
                    <path d="M12 7.5V12l3 2" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-bb-ink">BlueBeak Capital</p>
                  <p className="text-[15px] text-bb-ink2">24/7 support, every market session</p>
                </div>
              </div>
            </div>
          </div>

          <Reveal delay={160}>
            <form onSubmit={onSubmit} className="bb-card rounded-[24px] p-8" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-bb-ink">
                    Full name
                  </label>
                  <input id="name" name="name" type="text" required autoComplete="name" className="bb-field w-full rounded-[12px] px-4 py-3.5 text-[15px] text-bb-ink" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-bb-ink">
                    Email address
                  </label>
                  <input id="email" name="email" type="email" required autoComplete="email" className="bb-field w-full rounded-[12px] px-4 py-3.5 text-[15px] text-bb-ink" placeholder="you@example.com" />
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-bb-ink">
                  Subject
                </label>
                <input id="subject" name="subject" type="text" className="bb-field w-full rounded-[12px] px-4 py-3.5 text-[15px] text-bb-ink" placeholder="What is this about?" />
              </div>
              <div className="mt-5">
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-bb-ink">
                  Message
                </label>
                <textarea id="message" name="message" rows={5} required className="bb-field w-full resize-y rounded-[12px] px-4 py-3.5 text-[15px] text-bb-ink" placeholder="Tell us what you need" />
              </div>

              {state === "error" && error ? (
                <p className="mt-4 text-sm text-[#F87171]" role="alert">{error}</p>
              ) : null}

              <button
                type="submit"
                disabled={state === "sending" || state === "sent"}
                className={`mt-6 w-full rounded-[14px] px-6 py-4 text-base font-semibold transition-all duration-300 ${
                  state === "sent"
                    ? "bg-bb-green/15 text-bb-green"
                    : "bb-cta-primary disabled:opacity-70"
                }`}
              >
                {state === "sending" ? "Sending..." : state === "sent" ? "Message sent ✓" : "Send message"}
              </button>
              {state === "sent" ? (
                <p className="mt-3 text-center text-sm text-bb-ink3">
                  Thanks for reaching out. We reply within 24 hours.
                </p>
              ) : null}
            </form>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
