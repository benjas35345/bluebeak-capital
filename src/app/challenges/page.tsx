import type { Metadata } from "next";
import ChallengesClient from "./challenges-client";

export const metadata: Metadata = {
  title: "Trading Challenges",
  description:
    "Pick your bird, pass the evaluation, and trade funded capital up to $500K with up to a 100% profit split.",
};

export default function Page() {
  return <ChallengesClient />;
}
