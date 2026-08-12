"use client";

import { useEffect, useRef, useState } from "react";
import {
  BIRDS,
  CHECKOUT_URL,
  PATHS,
  PLATFORMS,
  SIZES,
  SPECS,
  priceFor,
  type Path,
  type Platform,
  type Size,
} from "../../lib/site-data";
import { Segmented } from "./primitives";

/** Price that eases toward its new value when the configuration changes. */
function AnimatedPrice({ value }: { value: number }) {
  const [shown, setShown] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    if (prev.current === value) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      prev.current = value;
      setShown(value);
      return;
    }
    const from = prev.current;
    prev.current = value;
    let raf = 0;
    const t0 = performance.now();
    const dur = 450;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      setShown(Math.round(from + (value - from) * ease(p)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span>${shown.toLocaleString("en-US")}</span>;
}

function SpecRow({ label, value }: { label: string; value: string }) {
  const [flashKey, setFlashKey] = useState(0);
  const prev = useRef(value);
  useEffect(() => {
    if (prev.current !== value) {
      prev.current = value;
      setFlashKey((k) => k + 1);
    }
  }, [value]);
  return (
    <div key={flashKey} className="bb-flash flex items-center justify-between rounded-lg px-3 py-3.5">
      <span className="text-[15px] text-bb-ink2">{label}</span>
      <span className="text-[15px] font-semibold text-bb-ink">{value}</span>
    </div>
  );
}

export function PricingConfigurator({ id = "pricing" }: { id?: string }) {
  const [path, setPath] = useState<Path>("1 Step");
  const [platform, setPlatform] = useState<Platform>("TradeLocker");
  const [size, setSize] = useState<Size>("5K");

  const specs = SPECS[platform][path];
  const price = priceFor(size, path, platform);
  const compareAt = price * 2;
  const bird = BIRDS[size];

  return (
    <div id={id} className="mx-auto max-w-[1080px]">
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-bb-ink3">Challenge path</span>
          <Segmented options={PATHS} value={path} onChange={setPath} ariaLabel="Challenge path" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-bb-ink3">Platform</span>
          <Segmented options={PLATFORMS} value={platform} onChange={setPlatform} ariaLabel="Platform" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-bb-ink3">Account size</span>
          <Segmented options={SIZES} value={size} onChange={setSize} size="sm" ariaLabel="Account size" />
        </div>
      </div>

      <div className="bb-card mt-10 overflow-hidden rounded-[28px]">
        <div className="grid gap-0 md:grid-cols-[380px_1fr]">
          <div className="relative flex flex-col items-center justify-center gap-4 border-b border-bb-line bg-gradient-to-b from-[#0A1B36] to-[#0C2040] p-8 md:border-b-0 md:border-r">
            <img
              key={bird.image}
              src={bird.image}
              alt={`${bird.name} challenge artwork`}
              width={560}
              height={560}
              className="w-56 rounded-[20px] md:w-64"
              loading="lazy"
            />
            <div className="text-center">
              <h3 className="bb-display text-4xl text-bb-ink">{bird.name}</h3>
              <p className="mt-1 text-sm text-bb-ink3">{size} account</p>
              <p className="mx-auto mt-2 max-w-[30ch] text-sm leading-relaxed text-bb-ink2">{bird.blurb}</p>
            </div>
          </div>

          <div className="p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-[52px] font-bold tracking-[-0.03em] text-bb-ink">
                  <AnimatedPrice value={price} />
                </div>
                <p className="mt-1 text-sm text-bb-ink3">
                  <span className="line-through">${compareAt.toLocaleString("en-US")}</span>
                  {"  "}for the {size} account, one time fee
                </p>
                <p className="mt-1 text-[13px] text-bb-accent">30% off at checkout with code LAUNCH</p>
              </div>
              <a href={CHECKOUT_URL} className="bb-cta-primary rounded-full px-7 py-3.5 text-[15px] font-semibold">
                Get Funded
              </a>
            </div>

            <div className="mt-6 divide-y divide-bb-line rounded-[14px] border border-bb-line bg-bb-raised/40">
              <SpecRow label="Profit target" value={specs.profit} />
              <SpecRow label="Maximum daily loss" value={specs.daily} />
              <SpecRow label="Maximum loss" value={specs.max} />
              <SpecRow label="Account leverage" value={specs.lev} />
              <SpecRow label="Rewards" value={specs.reward} />
              <SpecRow label="Profit split" value={specs.split} />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-bb-ink3">
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1.5l5.5 2v4c0 3.4-2.3 5.9-5.5 7-3.2-1.1-5.5-3.6-5.5-7v-4l5.5-2z" stroke="#38BDF8" strokeWidth="1.2" strokeLinejoin="round"/></svg>
                Reward guarantee
              </span>
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.2" stroke="#38BDF8" strokeWidth="1.2"/><path d="M5.5 8.2l1.8 1.8 3.4-3.8" stroke="#38BDF8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Up to 100% profit split
              </span>
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.2" stroke="#38BDF8" strokeWidth="1.2"/><path d="M8 4.5V8l2.4 1.6" stroke="#38BDF8" strokeWidth="1.2" strokeLinecap="round"/></svg>
                Unlimited trading time
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
