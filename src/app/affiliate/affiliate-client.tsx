"use client";

import { useEffect, useRef } from "react";
import {
  AFFILIATE_FEATURES,
  AFFILIATE_TESTIMONIALS,
  AFFILIATE_TIERS,
  CHECKOUT_URL,
  FAQ_CATEGORIES,
} from "@/lib/site-data";
import { AccordionItem, DisplayTitle, Kicker, Reveal } from "@/components/site/primitives";

/** Magnetic banner CTA: follows the cursor slightly with inertia. */
function MagneticBanner() {
  const btnRef = useRef<HTMLAnchorElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const btn = btnRef.current;
    if (!wrap || !btn) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const relX = (e.clientX - r.left) / r.width - 0.5;
      const relY = (e.clientY - r.top) / r.height - 0.5;
      tx = relX * 26;
      ty = relY * 18;
    };
    const onLeave = () => { tx = 0; ty = 0; };
    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      btn.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} className="bb-card relative overflow-hidden rounded-[28px] px-8 py-14 text-center">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(56,189,248,0.1), transparent 70%)" }}
      />
      <h2 className="bb-display relative text-[clamp(36px,4.6vw,64px)] text-bb-ink">
        Ready to unlock your earning potential?
      </h2>
      <a
        ref={btnRef}
        href={CHECKOUT_URL}
        className="bb-cta-primary relative mt-8 inline-block rounded-full px-9 py-4 text-base font-semibold will-change-transform"
      >
        Join the affiliate program
      </a>
    </div>
  );
}

export default function AffiliateClient() {
  const affiliateFaq = FAQ_CATEGORIES.find((c) => c.key === "affiliate")!.items;
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-28">
        <div
          aria-hidden
          className="absolute right-[-8%] top-[-30%] h-[500px] w-[500px] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(56,189,248,0.12), transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-[1000px] px-5 text-center">
          <h1 className="bb-rise bb-display text-[clamp(56px,7.5vw,110px)] text-bb-ink">
            Become an <span className="bb-gradient-text">affiliate</span>
          </h1>
        </div>
      </section>

      {/* 3 steps */}
      <section className="pb-[clamp(96px,12vw,160px)]">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { t: "Sign up", b: "Create your affiliate account in minutes.", n: "01" },
              { t: "Refer friends", b: "Share your unique referral link with your audience.", n: "02" },
              { t: "Generate income", b: "Receive up to 30% recurring commission on every sale.", n: "03" },
            ].map((s, i) => (
              <Reveal key={s.t} delay={i * 90}>
                <div className="bb-card group h-full rounded-[20px] p-8 transition-transform duration-300 hover:-translate-y-1">
                  <span className="bb-display text-5xl text-bb-nested transition-colors group-hover:text-bb-accent/40">{s.n}</span>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-bb-ink">{s.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-bb-ink2">{s.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tier system */}
      <section className="border-y border-bb-line bg-bb-raised/30 py-[clamp(96px,12vw,160px)]">
        <div className="mx-auto max-w-[1200px] px-5">
          <Reveal className="text-center">
            <div className="flex justify-center"><Kicker>Affiliate tiers</Kicker></div>
            <DisplayTitle>Grow your referrals, unlock bigger rewards</DisplayTitle>
            <p className="mx-auto mt-4 max-w-[52ch] text-base text-bb-ink2">
              The program rewards performance. As you refer more traders, you unlock higher commissions
              and free funded accounts.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {AFFILIATE_TIERS.map((t, i) => (
              <Reveal key={t.tier} delay={i * 80}>
                <div
                  className={`bb-card relative flex h-full flex-col rounded-[20px] p-7 transition-transform duration-300 hover:-translate-y-1 ${
                    t.featured ? "border-bb-accent/50" : ""
                  }`}
                >
                  {t.featured ? (
                    <span className="absolute right-5 top-5 rounded-full bg-bb-accent/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-bb-accent">
                      Most popular
                    </span>
                  ) : null}
                  <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-bb-ink3">{t.tier}</span>
                  <h3 className="bb-display mt-2 text-3xl text-bb-ink">{t.name}</h3>
                  <p className="mt-4 text-5xl font-bold tracking-tight text-bb-ink">
                    {t.pct}
                    <span className="ml-2 text-base font-normal text-bb-ink3">commission</span>
                  </p>
                  <ul className="mt-6 flex-1 space-y-3 text-[14px] leading-relaxed text-bb-ink2">
                    {t.perks.map((p) => (
                      <li key={p} className="flex gap-2.5">
                        <svg className="mt-1 shrink-0" width="13" height="13" viewBox="0 0 16 16" fill="none">
                          <path d="M2.5 8.5l3.5 3.5 7.5-8" stroke="#38BDF8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 rounded-[12px] border border-bb-line bg-bb-raised/60 px-4 py-3 text-center text-[13px] font-medium text-bb-ink">
                    Free {t.account} account included
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partner features */}
      <section className="py-[clamp(96px,12vw,160px)]">
        <div className="mx-auto max-w-[1200px] px-5">
          <Reveal className="text-center">
            <DisplayTitle>Partner with BlueBeak</DisplayTitle>
            <p className="mx-auto mt-4 max-w-[56ch] text-base text-bb-ink2">
              Turn your audience into recurring commissions by promoting a prop firm built for serious
              traders and long term growth.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {AFFILIATE_FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={(i % 2) * 80}>
                <div className="group flex gap-5 border-t border-bb-line pt-6">
                  <span className="bb-display text-2xl text-bb-ink3 transition-colors group-hover:text-bb-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-bb-ink">{f.title}</h3>
                    <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-bb-ink2">{f.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliate voices */}
      <section className="border-y border-bb-line bg-bb-raised/30 py-[clamp(96px,12vw,160px)]">
        <div className="mx-auto max-w-[1200px] px-5">
          <Reveal className="text-center">
            <DisplayTitle>What our affiliates say</DisplayTitle>
          </Reveal>
          <div className="mt-12 columns-1 gap-5 md:columns-2 [&>*]:mb-5">
            {AFFILIATE_TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 60}>
                <figure className="bb-card break-inside-avoid rounded-[20px] p-7">
                  <blockquote>
                    <p className="text-base font-semibold text-bb-ink">{t.title}</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-bb-ink2">{t.body}</p>
                  </blockquote>
                  <figcaption className="mt-4 text-sm font-semibold uppercase tracking-wider text-bb-ink3">{t.name}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + banner */}
      <section className="py-[clamp(96px,12vw,160px)]">
        <div className="mx-auto max-w-[760px] px-5">
          <Reveal className="text-center">
            <DisplayTitle>Affiliate questions</DisplayTitle>
          </Reveal>
          <div className="mt-10 space-y-3">
            {affiliateFaq.map((f, i) => (
              <Reveal key={f.q} delay={i * 50}>
                <AccordionItem q={f.q} a={f.a} defaultOpen={i === 0} />
              </Reveal>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-20 max-w-[1000px] px-5">
          <Reveal>
            <MagneticBanner />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
