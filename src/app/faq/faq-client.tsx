"use client";

import { useState } from "react";
import { FAQ_CATEGORIES } from "@/lib/site-data";
import { AccordionItem, DisplayTitle, Reveal } from "@/components/site/primitives";

export default function FaqClient() {
  const [active, setActive] = useState(FAQ_CATEGORIES[0].key);
  const category = FAQ_CATEGORIES.find((c) => c.key === active)!;

  return (
    <main>
      <section className="relative overflow-hidden pb-12 pt-28">
        <div
          aria-hidden
          className="absolute left-1/2 top-[-50%] h-[480px] w-[820px] -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(56,189,248,0.1), transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-[900px] px-5 text-center">
          <h1 className="bb-rise bb-display text-[clamp(52px,7vw,104px)] text-bb-ink">
            Frequently asked <span className="bb-gradient-text">questions</span>
          </h1>
          <p className="bb-rise mx-auto mt-4 max-w-[44ch] text-base text-bb-ink2" style={{ "--bb-delay": "120ms" } as React.CSSProperties}>
            Quick answers about the platform, funding, rules, and the affiliate program.
          </p>
        </div>
      </section>

      <section className="pb-[clamp(96px,12vw,160px)]">
        <div className="mx-auto max-w-[860px] px-5">
          <div className="flex flex-wrap justify-center gap-2">
            {FAQ_CATEGORIES.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setActive(c.key)}
                aria-pressed={active === c.key}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  active === c.key
                    ? "bg-gradient-to-r from-[#2563EB] to-[#38BDF8] text-[#052442]"
                    : "border border-bb-line text-bb-ink2 hover:border-bb-line-strong hover:text-bb-ink"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div key={category.key} className="mt-10 space-y-3">
            {category.items.map((f, i) => (
              <div key={f.q} className="bb-rise" style={{ "--bb-delay": `${i * 60}ms` } as React.CSSProperties}>
                <AccordionItem q={f.q} a={f.a} defaultOpen={i === 0} />
              </div>
            ))}
          </div>
          <Reveal className="mt-12 text-center">
            <p className="text-[15px] text-bb-ink3">
              Still stuck? Write to us and a real person replies within 24 hours.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
