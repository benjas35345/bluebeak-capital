import type { Metadata } from "next";
import CheckoutClient from "./checkout-client";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Choose your BlueBeak Capital challenge account and complete your order in under a minute.",
};

export default function Page() {
  return <CheckoutClient />;
}
