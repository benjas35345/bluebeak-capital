import type { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Questions about funding, payouts, or your account? Message BlueBeak Capital support, 24/7.",
};

export default function Page() {
  return <ContactClient />;
}
