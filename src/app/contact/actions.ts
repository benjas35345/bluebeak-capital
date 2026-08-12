"use server";

import { createClient } from "@supabase/supabase-js";

type ContactInput = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(data: ContactInput): Promise<{ ok: true }> {
  const name = (data.name ?? "").trim().slice(0, 200);
  const email = (data.email ?? "").trim().slice(0, 320);
  const subject = (data.subject ?? "").trim().slice(0, 300);
  const message = (data.message ?? "").trim().slice(0, 5000);

  if (!name || !message || !EMAIL_RE.test(email)) {
    throw new Error("Invalid submission");
  }

  // Publishable key: safe to ship publicly; the table is protected by row-level
  // security (insert-only for anonymous visitors). Env vars override if set.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://dngrtzjupoezzyhdguvz.supabase.co";
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "sb_publishable_ONC6Q9Hde32eNDbe-Z0XqA_5Itw0N2m";

  if (url && key) {
    const supabase = createClient(url, key, { auth: { persistSession: false } });
    const { error } = await supabase
      .from("contact_messages")
      .insert({ name, email, subject, message });
    if (error) {
      console.error("contact insert failed:", error.message);
      throw new Error("Could not save your message");
    }
  } else {
    console.warn("Supabase env vars missing: contact message not persisted");
  }

  return { ok: true };
}
