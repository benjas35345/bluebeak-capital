"use server";

import { createClient } from "@supabase/supabase-js";
import { BASE_PRICES, PATH_MULT, PLATFORM_MULT, type Path, type Platform, type Size } from "@/lib/site-data";

type OrderInput = {
  name: string;
  email: string;
  size: Size;
  path: Path;
  platform: Platform;
  coupon?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitOrder(data: OrderInput): Promise<{ ok: true; total: number }> {
  const name = (data.name ?? "").trim().slice(0, 200);
  const email = (data.email ?? "").trim().slice(0, 320);
  const coupon = (data.coupon ?? "").trim().toUpperCase().slice(0, 40);

  // Price is always recomputed on the server; never trusted from the client.
  const base = BASE_PRICES[data.size];
  const pathMult = PATH_MULT[data.path];
  const platMult = PLATFORM_MULT[data.platform];
  if (!name || !EMAIL_RE.test(email) || base == null || pathMult == null || platMult == null) {
    throw new Error("Invalid order");
  }
  const price = Math.round(base * pathMult * platMult * 100) / 100;
  const total = coupon === "LAUNCH" ? Math.round(price * 0.7 * 100) / 100 : price;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://dngrtzjupoezzyhdguvz.supabase.co";
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "sb_publishable_ONC6Q9Hde32eNDbe-Z0XqA_5Itw0N2m";

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { error } = await supabase.from("checkout_orders").insert({
    name,
    email,
    account_size: data.size,
    challenge_path: data.path,
    platform: data.platform,
    price_usd: price,
    coupon: coupon || null,
    total_usd: total,
  });
  if (error) {
    console.error("order insert failed:", error.message);
    throw new Error("Could not save your order");
  }
  return { ok: true, total };
}
