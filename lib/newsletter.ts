import { createClient } from "@/lib/supabase/client";

/**
 * Subscribe an email from the client.
 * - If Supabase is configured, insert into the `subscribers` table (RLS-guarded).
 * - Otherwise resolve optimistically (static build with no backend yet).
 *
 * On GitHub Pages there is no Node server, so this runs entirely in the browser.
 * The Xendit/transactional pieces will live in Supabase Edge Functions later.
 */
export async function subscribeEmail(email: string): Promise<void> {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email");
  }

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const supabase = createClient();
    const { error } = await supabase
      .from("subscribers")
      .upsert({ email }, { onConflict: "email" });
    if (error) throw error;
  }
  // No Supabase configured yet → treat as success for the live demo.
}
