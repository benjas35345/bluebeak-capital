"use client";

import { useState } from "react";
import { PATHS, PHASES_BY_PATH, TRADING_RULES, type Path } from "@/lib/site-data";
import { AccordionItem, DisplayTitle, Kicker, Reveal, Segmented } from "@/components/site/primitives";
import { PricingConfigurator } from "@/components/site/pricing";

export default function ChallengesClient() {
  const [path, setPath] = useState<Path>("1 Step");
  const phases = PHASES_BY_PATH[path];

  return (
    <main>
      {/* Compact hero */}
      <section className="relative overflow-hidden pb-16 pt-28">
        <div
          aria-hidden
          className="absolute right-[-10%] top-[-30%] h-[480px] w-[480px] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(56,189,248,0.12), transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-[1200px] px-5">
          <h1 className="bb-rise bb-display max-w-[12ch] text-[clamp(56px,7.5vw,110px)] text-bb-ink">
            Trading <span className="bb-gradient-text">challenges</span>
          </h1>
          <p className="bb-rise mt-5 max-w-[54ch] text-lg leading-relaxed text-bb-ink2" style={{ "--bb-delay": "140ms" } as React.CSSProperties}>
            Select your challenge tier and demonstrate consistent profitability to earn a funded trading
            account with a profit split of up to 100%.
          </p>
        </div>
      </section>

      <section className="pb-[clamp(96px,12vw,160px)]">
        <div className="mx-auto max-w-[1200px] px-5">
          <PricingConfigurator id="configurator" />
        </div>
      </section>

      {/* Path to funded: dynamic phase cards */}
      <section className="border-y border-bb-line bg-bb-raised/30 py-[clamp(96px,12vw,160px)]">
        <div className="mx-auto max-w-[1200px] px-5">
          <Reveal className="text-center">
            <div className="flex justify-center"><Kicker>The route up</Kicker></div>
            <DisplayTitle>Your path to funded</DisplayTitle>
            <p className="mx-auto mt-4 max-w-[44ch] text-base text-bb-ink2">
              Each challenge path has its own route. Choose one to see the phases.
            </p>
          </Reveal>
          <div className="mt-10 flex justify-center">
            <Segmented options={PATHS} value={path} onChange={setPath} ariaLabel="Challenge path phases" />
          </div>
          <div key={path} className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {phases.map((p, i) => (
              <div
                key={p.title}
                className={`bb-rise bb-card relative rounded-[20px] p-7 ${i === phases.length - 1 ? "border-bb-accent/40" : ""}`}
                style={{ "--bb-delay": `${i * 110}ms` } as React.CSSProperties}
              >
                <span className="bb-display text-5xl text-bb-nested">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-bb-ink">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-bb-ink2">{p.note}</p>
                {i === phases.length - 1 ? (
                  <span className="mt-4 inline-block rounded-full bg-bb-accent/10 px-3 py-1 text-[12px] font-medium text-bb-accent">
                    You are funded here
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trading rules */}
      <section id="rules" className="py-[clamp(96px,12vw,160px)]">
        <div className="mx-auto max-w-[860px] px-5">
          <Reveal className="text-center">
            <DisplayTitle>Trading rules</DisplayTitle>
            <p className="mx-auto mt-4 max-w-[46ch] text-base text-bb-ink2">
              Clear rules, no surprises. Everything that applies to your account, in plain language.
            </p>
          </Reveal>
          <div className="mt-10 space-y-3">
            {TRADING_RULES.map((r, i) => (
              <Reveal key={r.q} delay={i * 60}>
                <AccordionItem q={r.q} a={r.a} defaultOpen={i === 0} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fees and refunds */}
      <section className="border-t border-bb-line bg-bb-raised/30 py-[clamp(96px,12vw,160px)]">
        <div className="mx-auto max-w-[1200px] px-5">
          <Reveal className="text-center">
            <DisplayTitle>Fees and refunds</DisplayTitle>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <Reveal>
              <div className="bb-card h-full rounded-[20px] p-8">
                <h3 className="text-lg font-semibold tracking-tight text-bb-ink">One fee, both phases</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-bb-ink2">
                  Your challenge fee is a single one time payment that covers the entire evaluation,
                  every phase included. The exact fee for your account size, path, and platform is always
                  shown on the pricing card above before you pay.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="bb-card h-full rounded-[20px] p-8">
                <h3 className="text-lg font-semibold tracking-tight text-bb-ink">Refund terms</h3>
                <ul className="mt-3 space-y-3 text-[15px] leading-relaxed text-bb-ink2">
                  {[
                    "Your challenge fee is refunded with your first profit split as a funded trader.",
                    "14 day satisfaction guarantee on unused evaluations.",
                    "20% discount on your next attempt after a failed challenge.",
                  ].map((line) => (
                    <li key={line} className="flex gap-3">
                      <svg className="mt-1 shrink-0" width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M2.5 8.5l3.5 3.5 7.5-8" stroke="#38BDF8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
