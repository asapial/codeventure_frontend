"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useAuth } from "@/lib/auth/provider";
import { signOut } from "@/lib/api/auth";

/**
 * Side-effectful sign-out. Returns a stable handler that triggers a route
 * refresh after the cookie is cleared, so Server Components re-evaluate the
 * session guard.
 */
export function useSignOut() {
  const router = useRouter();
  const { clearSession } = useAuth();
  const [pending, startTransition] = useTransition();

  return {
    pending,
    signOut: () => {
      startTransition(async () => {
        try {
          await signOut();
          clearSession();
          toast.success("Signed out.");
          router.replace("/");
          router.refresh();
        } catch (err) {
          const message =
            err instanceof Error ? err.message : "Could not sign out.";
          toast.error(message);
        }
      });
    },
  };
}