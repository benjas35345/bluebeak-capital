"use client";

import Link from "next/link";
import { BENEFITS, CHECKOUT_URL, STEPS, HOME_FAQ } from "@/lib/site-data";
import { AccordionItem, CountUp, DisplayTitle, Kicker, Reveal } from "@/components/site/primitives";
import { PricingConfigurator } from "@/components/site/pricing";
import {
  CertificateWall,
  HeroParallax,
  MissionTabs,
  PayoutTicker,
  TestimonialRail,
} from "@/components/site/home-bits";

export default function HomeClient() {
  return (
    <main>
      <HeroParallax />
      <PayoutTicker />

      {/* How it works: three steps, one row */}
      <section className="py-[clamp(96px,12vw,160px)]">
        <div className="mx-auto max-w-[1200px] px-5">
          <Reveal className="text-center">
            <div className="flex justify-center"><Kicker>How it works</Kicker></div>
            <DisplayTitle>Buy a challenge. Trade. Get paid.</DisplayTitle>
            <p className="mx-auto mt-4 max-w-[38ch] text-base text-bb-ink2">
              Three steps. That&apos;s the whole process.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <div className="group border-t border-bb-line pt-7 transition-colors">
                  <span className="bb-display text-3xl text-bb-accent">{s.n}</span>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-bb-ink">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-bb-ink2">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing configurator */}
      <section className="relative overflow-hidden bg-bb-raised/30 py-[clamp(96px,12vw,160px)]">
        <img
          src="/assets/plates/wind-lines.webp"
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
          loading="lazy"
        />
        <div className="relative mx-auto max-w-[1200px] px-5">
          <Reveal className="text-center">
            <div className="flex justify-center"><Kicker>Pick your bird</Kicker></div>
            <DisplayTitle>Select your ideal account</DisplayTitle>
            <p className="mx-auto mt-4 max-w-[40ch] text-base text-bb-ink2">
              Every account size is a bird. Pick the one that matches your wingspan.
            </p>
          </Reveal>
          <div className="mt-12">
            <PricingConfigurator />
          </div>
        </div>
      </section>

      {/* Stats: three in a row */}
      <section className="border-y border-bb-line py-[clamp(80px,10vw,140px)]">
        <div className="mx-auto max-w-[1200px] px-5">
          <Reveal className="text-center">
            <div className="flex justify-center"><Kicker>The numbers</Kicker></div>
            <DisplayTitle>Built to pay traders</DisplayTitle>
            <p className="mx-auto mt-4 max-w-[44ch] text-base text-bb-ink2">
              Trusted by traders in 140+ countries worldwide.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-x-10 gap-y-10 text-center md:grid-cols-3">
            {[
              {
                big: <CountUp to={100} suffix="%" />,
                title: "Profit split",
                body: "Keep everything you earn at the top end. No hidden fees, no reductions.",
              },
              {
                big: <>$<CountUp to={2000000} />+</>,
                title: "Funded capital",
                body: "Provided to traders worldwide, with scaling up to $4,000,000.",
              },
              {
                big: <>2 Days</>,
                title: "Payout guarantee",
                body: "Paid within 2 business days, or you receive an extra $500.",
              },
            ].map((s, i) => (
              <Reveal key={s.title} delay={i * 90}>
                <div className="border-t border-bb-line pt-8">
                  <p className="bb-display text-[clamp(52px,5.5vw,80px)] leading-none text-bb-ink">{s.big}</p>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-bb-accent">{s.title}</p>
                  <p className="mx-auto mt-3 max-w-[34ch] text-[15px] leading-relaxed text-bb-ink2">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CertificateWall />

      {/* Why BlueBeak: asymmetric grid with icon renders */}
      <section className="py-[clamp(96px,12vw,160px)]">
        <div className="mx-auto max-w-[1200px] px-5">
          <Reveal className="text-center">
            <div className="flex justify-center"><Kicker>Why BlueBeak</Kicker></div>
            <DisplayTitle>Why traders choose BlueBeak</DisplayTitle>
            <p className="mx-auto mt-4 max-w-[52ch] text-base text-bb-ink2">
              Benefits built for serious traders, not marketing pages.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={(i % 2) * 80}>
                <div className="group flex gap-5 border-t border-bb-line pt-6">
                  <span className="bb-display text-2xl text-bb-ink3 transition-colors group-hover:text-bb-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-bb-ink">{b.title}</h3>
                    <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-bb-ink2">{b.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <MissionTabs />

      {/* FAQ preview */}
      <section className="py-[clamp(96px,12vw,160px)]">
        <div className="mx-auto max-w-[760px] px-5">
          <Reveal className="text-center">
            <DisplayTitle>Questions, answered</DisplayTitle>
          </Reveal>
          <div className="mt-10 space-y-3">
            {HOME_FAQ.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <AccordionItem q={f.q} a={f.a} defaultOpen={i === 0} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 text-center">
            <Link href="/faq" className="bb-link-arrow inline-flex items-center gap-2 text-[15px] font-medium text-bb-ink">
              Browse the full FAQ
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M2 8h11M9 3.5L13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="bb-underline" />
            </Link>
          </Reveal>
        </div>
      </section>

      <TestimonialRail />

      {/* Final CTA */}
      <section className="relative overflow-hidden border-t border-bb-line py-[clamp(110px,14vw,190px)]">
        <div
          aria-hidden
          className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/3 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(56,189,248,0.14), transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-[1200px] px-5 text-center">
          <Reveal>
            <h2 className="bb-display text-[clamp(56px,8vw,120px)] text-bb-ink">
              Ready to <span className="bb-gradient-text">fly?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[38ch] text-base text-bb-ink2">
              Pick your bird, pass the challenge, and trade our capital. Your first payout is closer than you think.
            </p>
            <div className="mt-9 flex justify-center">
              <a href={CHECKOUT_URL} className="bb-cta-primary rounded-full px-10 py-4.5 text-lg font-semibold">
                Get Funded
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
