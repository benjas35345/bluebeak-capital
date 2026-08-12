import type { Metadata } from "next";
import AffiliateClient from "./affiliate-client";

export const metadata: Metadata = {
  title: "Affiliate Program",
  description:
    "Earn up to 30% recurring commission and free funded accounts by referring traders to BlueBeak Capital.",
};

export default function Page() {
  return <AffiliateClient />;
}
