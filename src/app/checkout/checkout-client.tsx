"use client";

import { useMemo, useState } from "react";
import { submitOrder } from "./actions";
import {
  BIRDS,
  PATHS,
  PLATFORMS,
  SIZES,
  SPECS,
  priceFor,
  type Path,
  type Platform,
  type Size,
} from "@/lib/site-data";
import { Reveal, Segmented } from "@/components/site/primitives";

type FormState = "idle" | "sending" | "sent" | "error";

const fmt = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });

export default function CheckoutClient() {
  const [path, setPath] = useState<Path>("1 Step");
  const [platform, setPlatform] = useState<Platform>("TradeLocker");
  const [size, setSize] = useState<Size>("5K");
  const [coupon, setCoupon] = useState("LAUNCH");
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  const price = priceFor(size, path, platform);
  const couponValid = coupon.trim().toUpperCase() === "LAUNCH";
  const discount = couponValid ? Math.round(price * 0.3 * 100) / 100 : 0;
  const total = useMemo(() => Math.round((price - discount) * 100) / 100, [price, discount]);
  const bird = BIRDS[size];
  const specs = SPECS[platform][path];

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    if (!name || !email) {
      setError("Please fill in your name and email.");
      setState("error");
      return;
    }
    setState("sending");
    setError(null);
    try {
      await submitOrder({ name, email, size, path, platform, coupon: couponValid ? "LAUNCH" : "" });
      setState("sent");
    } catch {
      setError("Something went wrong. Please try again.");
      setState("error");
    }
  };

  return (
    <main>
      <section className="relative overflow-hidden pb-[clamp(80px,10vw,140px)] pt-24">
        <div
          aria-hidden
          className="absolute left-1/2 top-[-40%] h-[480px] w-[820px] -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(56,189,248,0.1), transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-[1080px] px-5">
          <div className="text-center">
            <h1 className="bb-rise bb-display text-[clamp(48px,6vw,88px)] text-bb-ink">
              Get <span className="bb-gradient-text">funded</span>
            </h1>
            <p className="bb-rise mx-auto mt-3 max-w-[40ch] text-base text-bb-ink2" style={{ "--bb-delay": "120ms" } as React.CSSProperties}>
              Pick your account. Checkout takes under a minute.
            </p>
          </div>

          <div className="bb-rise mt-12 grid gap-10 lg:grid-cols-[1.15fr_1fr]" style={{ "--bb-delay": "240ms" } as React.CSSProperties}>
            {/* Left: configure */}
            <div>
              <div className="flex flex-col gap-6">
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-bb-ink3">Challenge path</p>
                  <Segmented options={PATHS} value={path} onChange={setPath} ariaLabel="Challenge path" />
                </div>
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-bb-ink3">Platform</p>
                  <Segmented options={PLATFORMS} value={platform} onChange={setPlatform} ariaLabel="Platform" />
                </div>
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-bb-ink3">Account size</p>
                  <Segmented options={SIZES} value={size} onChange={setSize} size="sm" ariaLabel="Account size" />
                </div>
              </div>

              <div className="bb-card mt-8 flex items-center gap-5 rounded-[20px] p-5">
                <img
                  key={bird.image}
                  src={bird.image}
                  alt={`${bird.name} challenge artwork`}
                  width={560}
                  height={560}
                  className="w-24 rounded-[14px]"
                />
                <div>
                  <p className="bb-display text-2xl text-bb-ink">{bird.name}</p>
                  <p className="text-sm text-bb-ink3">{size} {path} · {platform}</p>
                  <p className="mt-1 text-[13px] text-bb-ink2">
                    {specs.profit} target · {specs.split} split · {specs.reward}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: order summary */}
            <Reveal delay={120}>
              <form onSubmit={onSubmit} className="bb-card rounded-[24px] p-7" noValidate>
                <h2 className="text-lg font-semibold tracking-tight text-bb-ink">Order summary</h2>

                <div className="mt-5 space-y-3 text-[15px]">
                  <div className="flex items-center justify-between text-bb-ink2">
                    <span>{size} {path} challenge</span>
                    <span className="font-medium text-bb-ink">{fmt(price)}</span>
                  </div>
                  <div className="flex items-center justify-between text-bb-ink2">
                    <span>Coupon {couponValid ? "LAUNCH (−30%)" : ""}</span>
                    <span className={couponValid ? "font-medium text-bb-green" : "text-bb-ink3"}>
                      {couponValid ? `−${fmt(discount)}` : "—"}
                    </span>
                  </div>
                  <div className="border-t border-bb-line pt-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-bb-ink">Total, one-time</span>
                      <span className="text-2xl font-bold tracking-tight text-bb-ink">{fmt(total)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-4">
                  <input
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Full name"
                    className="bb-field w-full rounded-[12px] px-4 py-3.5 text-[15px] text-bb-ink"
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Email address"
                    className="bb-field w-full rounded-[12px] px-4 py-3.5 text-[15px] text-bb-ink"
                  />
                  <input
                    name="coupon"
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Coupon code"
                    className="bb-field w-full rounded-[12px] px-4 py-3.5 text-[15px] uppercase tracking-wider text-bb-ink"
                  />
                </div>

                {state === "error" && error ? (
                  <p className="mt-4 text-sm text-[#F87171]" role="alert">{error}</p>
                ) : null}

                <button
                  type="submit"
                  disabled={state === "sending" || state === "sent"}
                  className={`mt-6 w-full rounded-[14px] px-6 py-4 text-base font-semibold transition-all duration-300 ${
                    state === "sent" ? "bg-bb-green/15 text-bb-green" : "bb-cta-primary disabled:opacity-70"
                  }`}
                >
                  {state === "sending"
                    ? "Placing order..."
                    : state === "sent"
                      ? "Order received ✓"
                      : `Complete order · ${fmt(total)}`}
                </button>
                {state === "sent" ? (
                  <p className="mt-3 text-center text-sm text-bb-ink3">
                    Check your inbox: your secure payment link is on its way, and your account
                    credentials follow right after payment.
                  </p>
                ) : (
                  <p className="mt-3 text-center text-[13px] text-bb-ink3">
                    You&apos;ll receive a secure payment link by email. No card details are entered on
                    this page.
                  </p>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
