"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CHECKOUT_URL, SUPPORT_EMAIL } from "../../lib/site-data";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/challenges", label: "Challenges" },
  { to: "/competition", label: "Competition" },
  { to: "/affiliate", label: "Affiliate" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function AnnouncementBar() {
  const [copied, setCopied] = useState(false);
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <div className="relative z-[110] flex items-center justify-center gap-3 bg-gradient-to-r from-[#2563EB] to-[#38BDF8] px-4 py-2 text-[13px] font-medium text-white">
      <span className="hidden sm:inline">Launch offer: 30% off, limited time</span>
      <span className="sm:hidden">30% off at launch</span>
      <button
        type="button"
        className="bb-chip-copy rounded-md px-2.5 py-0.5 text-[12px] tracking-wider text-white"
        onClick={() => {
          void navigator.clipboard.writeText("LAUNCH").then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          });
        }}
        aria-label="Copy code LAUNCH"
      >
        {copied ? "Copied ✓" : "Code: LAUNCH"}
      </button>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => setHidden(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

export function SiteNav() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`bb-nav-glass sticky top-0 z-[100] transition-all duration-300 ${compact ? "py-2" : "py-4"}`}>
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-5">
        <Link href="/" aria-label="BlueBeak Capital home" className="flex items-center gap-3">
          <img src="/assets/brand/logo.png" alt="BlueBeak Capital logo" className="h-9 w-auto" />
          <span className="bb-display hidden text-xl text-bb-ink md:inline">Blue Beak Capital</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              href={l.to}
              data-active={pathname === l.to}
              className="bb-nav-link text-sm font-medium text-bb-ink2 hover:text-bb-ink data-[active=true]:text-bb-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={CHECKOUT_URL} className="bb-cta-primary rounded-full px-6 py-2.5 text-sm font-semibold">
            Get Funded
          </a>
        </div>

        <button
          type="button"
          className="lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-bb-ink">
            {open ? (
              <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div className="border-t border-bb-line px-5 pb-6 pt-3 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                href={l.to}
                className="rounded-lg px-3 py-3 text-base font-medium text-bb-ink2 hover:bg-bb-raised hover:text-bb-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex gap-3">
            <a href={CHECKOUT_URL} className="bb-cta-primary flex-1 rounded-full px-5 py-3 text-center text-sm font-semibold">
              Get Funded
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-bb-line bg-[#040B19]">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src="/assets/brand/logo.png" alt="BlueBeak Capital logo" className="h-10 w-auto" />
            <span className="bb-display text-xl text-bb-ink">Blue Beak Capital</span>
          </div>
          <p className="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-bb-ink3">
            Empowering traders worldwide with capital to achieve their trading goals.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { label: "Instagram", href: "https://instagram.com", d: "M8 3h8a5 5 0 015 5v8a5 5 0 01-5 5H8a5 5 0 01-5-5V8a5 5 0 015-5zm4 5.2a3.8 3.8 0 100 7.6 3.8 3.8 0 000-7.6zM17.5 6a1 1 0 100 2 1 1 0 000-2z" },
              { label: "X", href: "https://x.com", d: "M4 4l7.1 9.3L4.4 20h2.5l5.3-5.2L16.8 20H20l-7.4-9.7L18.9 4h-2.5l-4.8 4.8L8.2 4H4z" },
              { label: "YouTube", href: "https://youtube.com", d: "M21.6 7.2a2.6 2.6 0 00-1.8-1.9C18.2 5 12 5 12 5s-6.2 0-7.8.3a2.6 2.6 0 00-1.8 1.9A27 27 0 002 12c0 1.6.1 3.2.4 4.8a2.6 2.6 0 001.8 1.9c1.6.3 7.8.3 7.8.3s6.2 0 7.8-.3a2.6 2.6 0 001.8-1.9c.3-1.6.4-3.2.4-4.8s-.1-3.2-.4-4.8zM10 15V9l5.2 3L10 15z" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-bb-line text-bb-ink3 transition-colors hover:border-bb-accent hover:text-bb-accent"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-bb-ink3">Quick links</h3>
          <ul className="mt-4 space-y-3 text-[15px]">
            <li><Link href="/challenges" className="text-bb-ink2 hover:text-bb-accent">Challenges</Link></li>
            <li><Link href="/competition" className="text-bb-ink2 hover:text-bb-accent">Competitions</Link></li>
            <li><Link href="/affiliate" className="text-bb-ink2 hover:text-bb-accent">Affiliate program</Link></li>
            <li><a href={CHECKOUT_URL} className="text-bb-ink2 hover:text-bb-accent">Get Funded</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-bb-ink3">Support</h3>
          <ul className="mt-4 space-y-3 text-[15px]">
            <li><Link href="/faq" className="text-bb-ink2 hover:text-bb-accent">FAQ</Link></li>
            <li><Link href="/contact" className="text-bb-ink2 hover:text-bb-accent">Contact us</Link></li>
            <li><Link href="/privacy" className="text-bb-ink2 hover:text-bb-accent">Privacy policy</Link></li>
            <li><Link href="/refunds" className="text-bb-ink2 hover:text-bb-accent">Refund policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-bb-ink3">Contact</h3>
          <p className="mt-4 text-[15px] text-bb-ink2">{SUPPORT_EMAIL}</p>
          <p className="mt-2 text-[15px] text-bb-ink3">24/7 live chat available</p>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="bb-cta-framed mt-5 inline-flex items-center gap-2 rounded-[12px] px-5 py-3 text-sm font-medium text-bb-ink"
          >
            Get support
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M2 8h11M9 3.5L13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      <div className="border-t border-bb-line">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 px-5 py-6 text-[13px] text-bb-ink3 md:flex-row">
          <p>© 2026 BlueBeak Capital. All rights reserved.</p>
          <p className="max-w-[64ch] text-center md:text-right">
            Trading involves risk. All accounts are simulated evaluations, and funding is subject to our terms.
          </p>
        </div>
      </div>
    </footer>
  );
}
