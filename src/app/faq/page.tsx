import type { Metadata } from "next";
import FaqClient from "./faq-client";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers on funding, payouts, trading rules, platforms, and the affiliate program.",
};

export default function Page() {
  return <FaqClient />;
}
