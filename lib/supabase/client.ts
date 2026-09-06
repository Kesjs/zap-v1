import { createBrowserClient } from "@supabase/ssr";

// Client Supabase côté navigateur, à utiliser dans les Client Components ("use client").
// Persiste la session dans les cookies (lus par le middleware et lib/supabase/server.ts).
// Instance mise en cache : évite de recréer un client à chaque rendu.
let browserClient: ReturnType<typeof createBrowserClient> | undefined;

export function createClient() {
  if (!browserClient) {
    browserClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return browserClient;
}
