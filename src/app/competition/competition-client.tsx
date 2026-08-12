"use client";

import { useEffect, useState } from "react";
import { CHECKOUT_URL, COMPETITION } from "@/lib/site-data";
import { AccordionItem, DisplayTitle, Reveal } from "@/components/site/primitives";

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

function Countdown() {
  const [left, setLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);
  useEffect(() => {
    const end = new Date(COMPETITION.endsAt).getTime();
    const tick = () => {
      const diff = Math.max(0, end - Date.now());
      setLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor(diff / 3600000) % 24,
        m: Math.floor(diff / 60000) % 60,
        s: Math.floor(diff / 1000) % 60,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const cells = left
    ? [
        { v: pad(left.d), l: "days" },
        { v: pad(left.h), l: "hours" },
        { v: pad(left.m), l: "min" },
        { v: pad(left.s), l: "sec" },
      ]
    : [
        { v: "--", l: "days" },
        { v: "--", l: "hours" },
        { v: "--", l: "min" },
        { v: "--", l: "sec" },
      ];

  return (
    <div className="flex gap-3" aria-label="Time remaining">
      {cells.map((c) => (
        <div key={c.l} className="bb-card w-[76px] rounded-[14px] px-3 py-3 text-center">
          <span className="block font-bb-mono text-2xl font-semibold text-bb-ink" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            {c.v}
          </span>
          <span className="mt-1 block text-[11px] uppercase tracking-[0.14em] text-bb-ink3">{c.l}</span>
        </div>
      ))}
    </div>
  );
}

export default function CompetitionClient() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-28">
        <div
          aria-hidden
          className="absolute left-1/2 top-[-40%] h-[560px] w-[900px] -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(245,194,75,0.08), transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-[1000px] px-5 text-center">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <h1 className="bb-rise bb-display text-[clamp(52px,7vw,104px)] text-bb-ink">
              Trading <span className="bb-gradient-text">championship</span>
            </h1>
            <span className="bb-rise flex items-center gap-2 rounded-full border border-bb-green/40 px-3 py-1.5 text-[12px] font-semibold uppercase tracking-wider text-bb-green">
              <span className="bb-pulse h-2 w-2 rounded-full bg-bb-green" />
              Live
            </span>
          </div>
          <p className="bb-rise mt-4 text-base text-bb-ink2" style={{ "--bb-delay": "120ms" } as React.CSSProperties}>
            {COMPETITION.window}
          </p>
          <div className="bb-rise mt-8 flex flex-wrap items-center justify-center gap-8" style={{ "--bb-delay": "220ms" } as React.CSSProperties}>
            <Countdown />
            <a href={CHECKOUT_URL} className="bb-cta-gold rounded-full px-7 py-3.5 text-[15px] font-semibold">
              Join competition
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-bb-line bg-bb-raised/30 py-14">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-8 px-5 md:grid-cols-4">
          {COMPETITION.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 70}>
              <p className="text-4xl font-bold tracking-tight text-bb-ink">{s.value}</p>
              <p className="mt-1 text-[14px] text-bb-ink3">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Prize structure */}
      <section className="py-[clamp(96px,12vw,160px)]">
        <div className="mx-auto max-w-[1200px] px-5">
          <Reveal className="text-center">
            <DisplayTitle>Prize structure</DisplayTitle>
          </Reveal>

          <div className="mt-12 grid items-end gap-5 md:grid-cols-3">
            {[COMPETITION.prizes[1], COMPETITION.prizes[0], COMPETITION.prizes[2]].map((p, i) => {
              const isFirst = p.place === "1st";
              return (
                <Reveal key={p.place} delay={i * 90}>
                  <div
                    className={`bb-card relative rounded-[20px] p-8 text-center ${
                      isFirst ? "border-bb-gold/50 md:pb-14 md:pt-12" : ""
                    }`}
                  >
                    {isFirst ? (
                      <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-bb-gold/50 bg-[#0C2040] px-4 py-1 text-[12px] font-semibold uppercase tracking-wider text-bb-gold">
                        Champion
                      </span>
                    ) : null}
                    <p className="bb-display text-3xl text-bb-ink3">{p.place}</p>
                    <p className={`mt-3 font-bold tracking-tight ${isFirst ? "text-6xl text-bb-gold" : "text-5xl text-bb-ink"}`}>
                      {p.amount}
                    </p>
                    <p className="mt-2 text-[14px] text-bb-ink3">{p.share}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-5">
            <div className="bb-card grid gap-0 rounded-[20px] p-2 sm:grid-cols-2">
              {COMPETITION.prizes.slice(3).map((p) => (
                <div key={p.place} className="flex items-center justify-between rounded-[14px] px-6 py-4 hover:bg-bb-raised/60">
                  <span className="text-[15px] text-bb-ink2">{p.place}</span>
                  <span className="text-[15px] font-semibold text-bb-ink">{p.amount} <span className="ml-2 font-normal text-bb-ink3">{p.share}</span></span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="border-y border-bb-line bg-bb-raised/30 py-[clamp(96px,12vw,160px)]">
        <div className="mx-auto max-w-[1200px] px-5">
          <Reveal className="text-center">
            <DisplayTitle>Live leaderboard</DisplayTitle>
            <p className="mt-3 text-[14px] text-bb-ink3">Updated throughout the trading day</p>
          </Reveal>
          <Reveal delay={120}>
            <div className="bb-card mt-10 overflow-x-auto rounded-[20px]">
              <table className="w-full min-w-[640px] text-left">
                <thead>
                  <tr className="border-b border-bb-line text-[12px] uppercase tracking-[0.14em] text-bb-ink3">
                    <th className="px-6 py-4 font-medium">Rank</th>
                    <th className="px-6 py-4 font-medium">Trader</th>
                    <th className="px-6 py-4 font-medium">Return</th>
                    <th className="px-6 py-4 font-medium">Profit</th>
                    <th className="px-6 py-4 font-medium">Trades</th>
                    <th className="px-6 py-4 font-medium">Win rate</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPETITION.leaderboard.map((r) => (
                    <tr key={r.rank} className="border-b border-bb-line/60 transition-colors last:border-0 hover:bg-bb-raised/50">
                      <td className="px-6 py-4">
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-bold ${
                            r.rank === 1
                              ? "bg-bb-gold/15 text-bb-gold"
                              : r.rank <= 3
                                ? "bg-bb-accent/12 text-bb-accent"
                                : "bg-bb-nested text-bb-ink2"
                          }`}
                        >
                          {r.rank}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[15px] font-medium text-bb-ink">{r.trader}</td>
                      <td className="px-6 py-4 font-semibold text-bb-green">{r.ret}</td>
                      <td className="px-6 py-4 text-[15px] text-bb-ink2">{r.pnl}</td>
                      <td className="px-6 py-4 text-[15px] text-bb-ink2">{r.trades}</td>
                      <td className="px-6 py-4 text-[15px] text-bb-ink2">{r.win}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Rules + past winners */}
      <section className="py-[clamp(96px,12vw,160px)]">
        <div className="mx-auto grid max-w-[1200px] gap-14 px-5 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Reveal>
              <DisplayTitle className="text-[clamp(34px,4vw,52px)]">Rules and conditions</DisplayTitle>
            </Reveal>
            <div className="mt-8 space-y-3">
              {COMPETITION.rules.map((r, i) => (
                <Reveal key={r.q} delay={i * 50}>
                  <AccordionItem q={r.q} a={r.a} defaultOpen={i === 0} />
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <Reveal>
              <DisplayTitle className="text-[clamp(34px,4vw,52px)]">Past winners</DisplayTitle>
            </Reveal>
            <div className="mt-8 space-y-4">
              {COMPETITION.pastWinners.map((w, i) => (
                <Reveal key={w.window} delay={i * 70}>
                  <div className="bb-card flex items-center justify-between rounded-[16px] p-6">
                    <div>
                      <p className="text-[14px] text-bb-ink3">{w.window}</p>
                      <p className="mt-1 text-xl font-bold text-bb-green">{w.ret}</p>
                    </div>
                    <p className="text-2xl font-bold tracking-tight text-bb-gold">{w.prize}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-bb-line bg-bb-raised/30 py-[clamp(96px,12vw,160px)]">
        <div className="mx-auto max-w-[760px] px-5">
          <Reveal className="text-center">
            <DisplayTitle>Competition FAQ</DisplayTitle>
          </Reveal>
          <div className="mt-10 space-y-3">
            {COMPETITION.faq.map((f, i) => (
              <Reveal key={f.q} delay={i * 50}>
                <AccordionItem q={f.q} a={f.a} defaultOpen={i === 0} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
