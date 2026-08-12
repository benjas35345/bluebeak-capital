export const metadata = {
  title: "Privacy Policy | BlueBeak Capital",
  description: "How BlueBeak Capital collects, uses, and protects your personal data.",
};

import { SUPPORT_EMAIL } from "@/lib/site-data";

const SECTIONS: { h: string; p: string[] }[] = [
  {
    h: "Who we are",
    p: [
      "BlueBeak Capital operates bluebeakcapital.com, a proprietary trading evaluation service. This policy explains what personal data we collect, why we collect it, and the choices you have.",
    ],
  },
  {
    h: "Data we collect",
    p: [
      "Account data: your name, email address, and country when you create an account or purchase an evaluation.",
      "Payment data: processed by our payment providers. We never store full card numbers on our own systems.",
      "Trading data: evaluation account activity, balances, and rule compliance metrics needed to operate the service.",
      "Support data: messages you send through the contact form or support channels, so we can respond and keep a record of the conversation.",
      "Technical data: IP address, browser type, and pages visited, used for security and to improve the site.",
    ],
  },
  {
    h: "How we use your data",
    p: [
      "To provide and operate evaluations and funded accounts, process payouts, and enforce trading rules.",
      "To respond to support requests and send service messages about your account.",
      "To send marketing emails only where you have opted in. Every marketing email includes an unsubscribe link.",
      "To detect fraud, multiple account abuse, and violations of our terms.",
    ],
  },
  {
    h: "Sharing",
    p: [
      "We share data only with service providers needed to run the business: payment processors, trading platform providers, email delivery, and analytics. We never sell your personal data.",
    ],
  },
  {
    h: "Retention",
    p: [
      "Account and trading records are kept for as long as your account is active and afterwards only as long as required for legal, tax, and dispute purposes. Support messages are kept for up to 2 years.",
    ],
  },
  {
    h: "Your rights",
    p: [
      "You can request a copy of your data, correction of inaccurate data, or deletion of data we no longer need to keep. Contact us and we will respond within 30 days.",
    ],
  },
  {
    h: "Cookies",
    p: [
      "We use essential cookies to keep you signed in and optional analytics cookies to understand how the site is used. You can block non essential cookies in your browser without losing access to the site.",
    ],
  },
  {
    h: "Contact",
    p: [`Questions about this policy: ${SUPPORT_EMAIL}.`],
  },
];

export default function PrivacyPage() {
  return (
    <main className="py-28">
      <div className="mx-auto max-w-[720px] px-5">
        <h1 className="bb-display text-[clamp(44px,6vw,80px)] text-bb-ink">Privacy policy</h1>
        <p className="mt-3 text-sm text-bb-ink3">Last updated: August 2026</p>
        {SECTIONS.map((s) => (
          <section key={s.h} className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight text-bb-ink">{s.h}</h2>
            {s.p.map((para) => (
              <p key={para.slice(0, 32)} className="mt-3 text-[15px] leading-relaxed text-bb-ink2">
                {para}
              </p>
            ))}
          </section>
        ))}
        <p className="mt-12 rounded-[14px] border border-bb-line bg-bb-raised/50 p-5 text-[13px] leading-relaxed text-bb-ink3">
          This policy is a working draft prepared for BlueBeak Capital and should be reviewed by your
          legal counsel before being relied on.
        </p>
      </div>
    </main>
  );
}
