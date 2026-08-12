import type { Metadata } from "next";
import CompetitionClient from "./competition-client";

export const metadata: Metadata = {
  title: "Trading Championship",
  description:
    "Monthly trading championship with a $50,000 prize pool. Compete with funded traders worldwide.",
};

export default function Page() {
  return <CompetitionClient />;
}
