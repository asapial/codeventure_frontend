import "server-only";
import { cookies } from "next/headers";
import { fetchSession } from "@/lib/api/auth";
import type { Session } from "@/types/auth";

const SESSION_COOKIE = "cv_session";

/**
 * Server-only session helpers. The session cookie holds an opaque token
 * that the backend exchanges for the user record via `GET /auth/session`.
 */

export async function getSession(): Promise<Session | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    return await fetchSession();
  } catch {
    // Network / 5xx — surface as "not authenticated" so the route renders
    // the public fallback rather than throwing into the React tree.
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  return (await getSession()) !== null;
}