"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Scroll reveal: transform+blur only (opacity never drops), IO adds .bb-in once. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("bb-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("bb-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const T = Tag as "div";
  return (
    <T ref={ref} className={`bb-reveal ${className}`} style={{ "--bb-delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </T>
  );
}

/** Animated counter that counts up when scrolled into view. */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1600,
  className = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [started, setStarted] = useState(false);
  const [value, setValue] = useState(to); // SSR renders the final value (screenshot safe)

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let raf = 0;
    const t0 = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      setValue(Math.round(to * ease(p)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    setValue(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

/** Uppercase kicker label (rationed: max 4 on home). */
export function Kicker({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="h-px w-6 bg-bb-accent/60" />
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-bb-accent">{children}</span>
    </div>
  );
}

export function DisplayTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <h2 className={`bb-display text-[clamp(40px,5.4vw,72px)] text-bb-ink ${className}`}>{children}</h2>;
}

/** Smooth accordion item. */
export function AccordionItem({
  q,
  a,
  defaultOpen = false,
}: {
  q: string;
  a: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`bb-card overflow-hidden rounded-[14px] ${open ? "bb-acc-open" : ""}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-[15px] font-semibold text-bb-ink md:text-base">{q}</span>
        <svg className="bb-acc-chevron h-4 w-4 shrink-0 text-bb-ink3" viewBox="0 0 16 16" fill="none">
          <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="bb-acc-body">
        <div>
          <p className="px-6 pb-5 text-[15px] leading-relaxed text-bb-ink2">{a}</p>
        </div>
      </div>
    </div>
  );
}

/** Segmented pill control with sliding indicator. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  size = "md",
  ariaLabel,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  size?: "sm" | "md";
  ariaLabel: string;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [ind, setInd] = useState<{ left: number; width: number; top: number; height: number } | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const update = () => {
      const active = wrap.querySelector<HTMLButtonElement>(`[data-val="${CSS.escape(value)}"]`);
      if (active) {
        setInd({ left: active.offsetLeft, width: active.offsetWidth, top: active.offsetTop, height: active.offsetHeight });
        // keep the active pill in view by scrolling ONLY the horizontal track — never the page.
        // (scrollIntoView would scroll the whole window vertically, dropping visitors mid-page on load.)
        if (wrap.scrollWidth > wrap.clientWidth) {
          const target = active.offsetLeft - (wrap.clientWidth - active.offsetWidth) / 2;
          const max = wrap.scrollWidth - wrap.clientWidth;
          wrap.scrollLeft = Math.max(0, Math.min(target, max));
        }
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [value]);

  return (
    <div
      ref={wrapRef}
      role="radiogroup"
      aria-label={ariaLabel}
      className="bb-seg bb-rail inline-flex max-w-full flex-nowrap gap-1 overflow-x-auto rounded-full border border-bb-line bg-bb-raised/80 p-1"
    >
      {ind ? <span className="bb-seg-ind" style={{ left: ind.left, width: ind.width, top: ind.top, height: ind.height }} aria-hidden /> : null}
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            type="button"
            data-val={opt}
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt)}
            className={`bb-seg-btn shrink-0 whitespace-nowrap rounded-full font-medium ${
              size === "sm" ? "px-3.5 py-1.5 text-[13px]" : "px-4 py-2 text-sm"
            } ${active ? "text-[#052442]" : "text-bb-ink2 hover:text-bb-ink"}`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
