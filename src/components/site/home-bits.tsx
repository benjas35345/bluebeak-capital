"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CERTIFICATES, CHECKOUT_URL, PAYOUT_TOASTS, TESTIMONIALS } from "../../lib/site-data";
import { DisplayTitle, Kicker, Reveal } from "./primitives";

/* ---------------------------------------------------------- */
/* Hero: B1 cutout parallax rig (scroll + cursor, rAF-smooth) */
/* ---------------------------------------------------------- */

export function HeroParallax() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const skyRef = useRef<HTMLDivElement | null>(null);
  const cloudRef = useRef<HTMLDivElement | null>(null);
  const birdRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let scroll = 0;

    const onMouse = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      targetX = (e.clientX / w - 0.5) * 2;
      targetY = (e.clientY / h - 0.5) * 2;
    };
    const onScroll = () => {
      scroll = window.scrollY;
    };

    const tick = () => {
      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;
      const s = Math.min(scroll, 900);
      const amp = isCoarse ? 0.5 : 1;
      if (skyRef.current) {
        skyRef.current.style.transform = `translate3d(${curX * -8 * amp}px, ${s * 0.12 + curY * -6 * amp}px, 0) scale(1.06)`;
      }
      if (cloudRef.current) {
        cloudRef.current.style.transform = `translate3d(${curX * -20 * amp}px, ${s * 0.22 + curY * -12 * amp}px, 0)`;
      }
      if (birdRef.current) {
        birdRef.current.style.transform = `translate3d(${curX * 26 * amp}px, ${s * -0.16 + curY * 16 * amp}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    if (!isCoarse) window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={wrapRef} className="bb-noise relative min-h-dvh overflow-hidden">
      {/* Layer 1: sky plate */}
      <div ref={skyRef} className="absolute inset-0 will-change-transform">
        <img
          src="/assets/hero/sky-plate.webp"
          alt=""
          aria-hidden
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050E1F]/30 via-transparent to-[#050E1F]" />
      </div>

      {/* Layer 2: soft glow behind bird */}
      <div
        ref={cloudRef}
        aria-hidden
        className="absolute right-[-10%] top-[6%] h-[70vmin] w-[70vmin] rounded-full will-change-transform"
        style={{ background: "radial-gradient(closest-side, rgba(56,189,248,0.22), transparent 70%)" }}
      />

      {/* Layer 3: the bird (fly-across entrance, then drift + parallax) */}
      <div ref={birdRef} className="absolute right-[2%] top-[12%] w-[52vmin] max-w-[640px] will-change-transform md:right-[6%]">
        <div className="bb-fly-in">
          <img
            src="/assets/hero/bird.webp"
            alt="A blue kingfisher gliding upward, wings spread"
            width={1024}
            height={576}
            className="bb-drift h-auto w-full"
            fetchPriority="high"
          />
        </div>
      </div>

      {/* Copy block (toasts live in-flow above the headline so they can never overlap it) */}
      <div className="relative mx-auto flex min-h-dvh max-w-[1200px] flex-col justify-end px-5 pb-24 pt-32">
        <div className="pointer-events-none mb-auto hidden pb-10 lg:block">
          {PAYOUT_TOASTS.map((t, i) => (
            <div
              key={t.name}
              className="bb-rise mb-5"
              style={{ "--bb-delay": `${500 + i * 220}ms`, marginLeft: i * 26 } as React.CSSProperties}
            >
            <div
              className="bb-drift flex w-[240px] items-center gap-3 rounded-[14px] border border-bb-line bg-bb-raised/70 p-3 backdrop-blur-md"
              style={{ "--bb-delay": `${800 + i * 400}ms` } as React.CSSProperties}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#38BDF8] text-sm font-bold text-white">
                {t.name[0]}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold text-bb-ink">
                  {t.name} <span className="font-normal text-bb-ink3">{t.when}</span>
                </p>
                <p className="text-[13px] text-bb-ink2">
                  Just got paid <span className="font-semibold text-bb-green">{t.amount}</span>
                </p>
              </div>
            </div>
            </div>
          ))}
        </div>
        <h1 className="bb-rise bb-display max-w-[9ch] text-[clamp(64px,9.5vw,150px)] text-bb-ink" style={{ "--bb-delay": "80ms" } as React.CSSProperties}>
          Fly above <span className="bb-gradient-text">the markets</span>
        </h1>
        <p className="bb-rise mt-5 max-w-[44ch] text-lg leading-relaxed text-bb-ink2" style={{ "--bb-delay": "220ms" } as React.CSSProperties}>
          Trade your way, get funded with up to $500K, and keep up to 100% of the profits.
        </p>
        <div className="bb-rise mt-8 flex flex-wrap items-center gap-7" style={{ "--bb-delay": "340ms" } as React.CSSProperties}>
          <a href={CHECKOUT_URL} className="bb-cta-primary rounded-full px-8 py-4 text-base font-semibold">
            Get Funded
          </a>
          <a href="#pricing" className="bb-link-arrow inline-flex items-center gap-2 text-base font-medium text-bb-ink">
            View challenges
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8h11M9 3.5L13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="bb-underline" />
          </a>
        </div>
        <div className="bb-rise mt-10 flex items-center gap-3 text-sm text-bb-ink3" style={{ "--bb-delay": "460ms" } as React.CSSProperties}>
          <span className="flex gap-0.5" aria-label="Five star rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#34D399">
                <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />
              </svg>
            ))}
          </span>
          <span>Rated excellent by thousands of funded traders</span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------ */
/* Payout ticker: thin marquee below the hero */
/* ------------------------------------------ */

const TICKER_ITEMS = CERTIFICATES.map((c) => ({ name: c.name, amount: c.amount }));

export function PayoutTicker() {
  const row = (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {TICKER_ITEMS.map((t, i) => (
        <span key={`${t.name}-${i}`} className="flex items-center gap-2 whitespace-nowrap text-sm text-bb-ink3">
          <span className="h-1.5 w-1.5 rounded-full bg-bb-green" />
          <span className="font-medium text-bb-ink2">{t.name}</span> received{" "}
          <span className="font-semibold text-bb-ink">{t.amount}</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="bb-marquee-pause border-y border-bb-line bg-bb-raised/40 py-3" aria-label="Recent payouts">
      <div className="bb-fade-x overflow-hidden">
        <div className="bb-marquee-x flex w-max" style={{ "--bb-speed": "38s" } as React.CSSProperties}>
          {row}
          {row}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------- */
/* Certificate wall: dual-column opposing vertical marquee */
/* --------------------------------------------------- */

function CertCard({ c }: { c: (typeof CERTIFICATES)[number] }) {
  return (
    <div className="bb-card mb-4 rounded-[14px] p-4">
      <div className="flex items-center justify-between">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-bb-nested">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M7 4h10v4a5 5 0 01-10 0V4z" stroke="#F5C24B" strokeWidth="1.5" />
            <path d="M7 5H4v1a4 4 0 003 3.9M17 5h3v1a4 4 0 01-3 3.9M12 13v4m-3 3h6m-3-3v3" stroke="#F5C24B" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
        <span className="text-[11px] uppercase tracking-[0.14em] text-bb-ink3">Payout certificate</span>
      </div>
      <p className="mt-3 text-sm text-bb-ink2">{c.name}</p>
      <p className="text-2xl font-bold tracking-tight text-bb-ink">{c.amount}</p>
      <div className="mt-3 flex gap-2">
        <span className="rounded-full border border-bb-line px-2 py-0.5 text-[11px] text-bb-ink3">{c.step}</span>
        <span className="rounded-full border border-bb-line px-2 py-0.5 text-[11px] text-bb-ink3">{c.size}</span>
        <span className="rounded-full border border-bb-line px-2 py-0.5 text-[11px] text-bb-ink3">{c.date}</span>
      </div>
    </div>
  );
}

export function CertificateWall() {
  const colA = [...CERTIFICATES.slice(0, 4), ...CERTIFICATES.slice(0, 4)];
  const colB = [...CERTIFICATES.slice(3), ...CERTIFICATES.slice(3)];
  return (
    <section className="relative overflow-hidden bg-bb-raised/30 py-[clamp(96px,12vw,160px)]">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-5 md:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <Kicker>Proof of payouts</Kicker>
          <DisplayTitle>Payout certificates</DisplayTitle>
          <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-bb-ink2">
            Every payout comes with a certificate: the amount received, the payout date, and the account
            type. A clear record of your earnings with BlueBeak Capital.
          </p>
          <Link
            href="/challenges"
            className="bb-cta-framed mt-8 inline-flex items-center gap-2 rounded-[12px] px-6 py-3.5 text-[15px] font-medium text-bb-ink"
          >
            Start earning yours
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M2 8h11M9 3.5L13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </Reveal>
        <div className="bb-marquee-pause bb-fade-y grid h-[520px] grid-cols-2 gap-4 overflow-hidden">
          <div className="bb-marquee-y-up" style={{ "--bb-speed": "46s" } as React.CSSProperties}>
            {colA.map((c, i) => <CertCard key={`a${i}`} c={c} />)}
          </div>
          <div className="bb-marquee-y-down" style={{ "--bb-speed": "56s" } as React.CSSProperties}>
            {colB.map((c, i) => <CertCard key={`b${i}`} c={c} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- */
/* Testimonials: draggable snap rail */
/* ------------------------------- */

export function TestimonialRail() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = () => {
    const el = railRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  const nudge = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(420, el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section className="py-[clamp(96px,12vw,160px)]">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <Kicker>Trader stories</Kicker>
            <DisplayTitle>What our clients say</DisplayTitle>
          </Reveal>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous testimonials"
              onClick={() => nudge(-1)}
              disabled={!canPrev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-bb-line text-bb-ink transition-all hover:border-bb-accent disabled:opacity-30"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M14 8H3M7 3.5L2.5 8 7 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button
              type="button"
              aria-label="Next testimonials"
              onClick={() => nudge(1)}
              disabled={!canNext}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-bb-line text-bb-ink transition-all hover:border-bb-accent disabled:opacity-30"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8h11M9 3.5L13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      </div>
      <div
        ref={railRef}
        onScroll={update}
        className="bb-rail mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(20px,calc((100vw-1200px)/2+20px))] pb-2"
      >
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.name}
            className="bb-card w-[340px] shrink-0 snap-start rounded-[20px] p-7 transition-transform duration-300 hover:-translate-y-1 md:w-[400px]"
          >
            <div className="flex gap-1" aria-label="Five star review">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F5C24B">
                  <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />
                </svg>
              ))}
            </div>
            <blockquote className="mt-4">
              <p className="text-base font-semibold text-bb-ink">{t.title}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-bb-ink2">{t.body}</p>
            </blockquote>
            <figcaption className="mt-5 text-sm font-semibold uppercase tracking-wider text-bb-ink3">
              {t.name} <span aria-hidden>{t.flag}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ----------------------- */
/* Mission / Vision / Values */
/* ----------------------- */

const MISSION_TABS = [
  {
    key: "Our mission",
    body: "We help traders achieve their professional goals through funding, training, and a world class trading platform, encouraging continuous growth and success.",
  },
  {
    key: "Our vision",
    body: "A world where talented traders anywhere can access serious capital on fair terms, judged only by their skill and discipline.",
  },
  {
    key: "Our values",
    body: "Transparency in every rule, fairness in every payout, and real support for the traders who put their skill on the line with us.",
  },
] as const;

export function MissionTabs() {
  const [active, setActive] = useState<(typeof MISSION_TABS)[number]["key"]>("Our mission");
  const current = MISSION_TABS.find((t) => t.key === active)!;
  return (
    <section className="bg-bb-raised/30 py-[clamp(96px,12vw,160px)]">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 md:grid-cols-2">
        <Reveal>
          <DisplayTitle>Built for the traders who take flight</DisplayTitle>
          <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-bb-ink2">
            BlueBeak Capital is a proprietary trading firm focused on creating opportunities for talented
            traders through a results driven approach and disciplined risk management. We back ambitious
            traders with capital, training, and a solid platform to grow.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="flex flex-wrap gap-2">
            {MISSION_TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setActive(t.key)}
                aria-pressed={active === t.key}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  active === t.key
                    ? "bg-gradient-to-r from-[#2563EB] to-[#38BDF8] text-[#052442]"
                    : "border border-bb-line text-bb-ink2 hover:border-bb-line-strong hover:text-bb-ink"
                }`}
              >
                {t.key}
              </button>
            ))}
          </div>
          <p key={current.key} className="bb-rise mt-6 min-h-[96px] max-w-[52ch] text-base leading-relaxed text-bb-ink2">
            {current.body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
