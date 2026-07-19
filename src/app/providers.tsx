import { ReactNode } from "react";
import { getSession } from "@/lib/auth/session";
import { ClientProviders } from "./client-providers";

/**
 * Server wrapper around `ClientProviders` — pulls the current session on
 * every request so the Client cache is pre-populated (avoids a 401 flash).
 */
export async function Providers({ children }: { children: ReactNode }) {
  const session = await getSession();
  return (
    <ClientProviders
      initialAuth={{
        user: session?.user ?? null,
        expiresAt: session?.expiresAt ?? null,
      }}
    >
      {children}
    </ClientProviders>
  );
}