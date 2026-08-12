export const metadata = {
  title: "Refund Policy | BlueBeak Capital",
  description: "BlueBeak Capital refund terms for challenge fees.",
};

import { SUPPORT_EMAIL } from "@/lib/site-data";

const SECTIONS: { h: string; p: string[] }[] = [
  {
    h: "Overview",
    p: [
      "Challenge fees are one time payments that grant access to a trading evaluation. Because an evaluation is a digital service that begins when your account credentials are issued, refunds follow the rules below.",
    ],
  },
  {
    h: "14 day guarantee on unused evaluations",
    p: [
      "If you purchased an evaluation, have not placed a single trade, and contact us within 14 days of purchase, we refund the full fee to your original payment method.",
    ],
  },
  {
    h: "Fee back with your first payout",
    p: [
      "Pass your evaluation and your challenge fee is refunded in full alongside your first profit split as a funded trader.",
    ],
  },
  {
    h: "After trading begins",
    p: [
      "Once a trade has been placed on the evaluation account, the service is considered delivered and the fee is no longer refundable, whether or not the evaluation is passed.",
    ],
  },
  {
    h: "Failed challenges",
    p: [
      "Failing an evaluation does not qualify for a refund, but you receive a 20% discount on your next attempt.",
    ],
  },
  {
    h: "Processing",
    p: [
      "Approved refunds are returned to the original payment method within 5 to 10 business days depending on your bank. If a refund seems missing, check with your card issuer first, then contact us.",
    ],
  },
  {
    h: "How to request",
    p: [`Email ${SUPPORT_EMAIL} from the address on your account with your order reference. We respond within 24 hours.`],
  },
];

export default function RefundsPage() {
  return (
    <main className="py-28">
      <div className="mx-auto max-w-[720px] px-5">
        <h1 className="bb-display text-[clamp(44px,6vw,80px)] text-bb-ink">Refund policy</h1>
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
