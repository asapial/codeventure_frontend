import { notFound } from "next/navigation";

import { getSession } from "@/lib/auth/session";
import { pageAllowedRoles, type DashboardRole } from "./dashboard-nav-config";

/**
 * Server-side guard for individual `/dashboard/*` pages.
 *
 * Resolves the active session and, if the user's role is not allowed for the
 * current pathname, calls `notFound()` so the route renders the global 404.
 * Pages stay declarative — they just await `roleGate(pathname)` at the top.
 */
export async function roleGate(pathname: string): Promise<{
  role: DashboardRole;
  user: { id: string; name: string; email: string };
}> {
  const session = await getSession();
  if (!session) {
    notFound();
  }

  const role = session.user.role;
  const allowed = pageAllowedRoles[pathname];
  if (allowed && !allowed.includes(role)) {
    notFound();
  }

  return {
    role,
    user: {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
    },
  };
}