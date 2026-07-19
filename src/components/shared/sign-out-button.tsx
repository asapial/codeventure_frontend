"use client";

import { Button } from "@/components/ui/button";
import { useSignOut } from "@/lib/auth/use-sign-out";

export function SignOutButton({
  variant = "outline",
  className,
  label = "Sign out",
}: {
  variant?: "outline" | "ghost" | "default";
  className?: string;
  label?: string;
}) {
  const { signOut, pending } = useSignOut();
  return (
    <Button
      type="button"
      variant={variant}
      className={className}
      disabled={pending}
      onClick={signOut}
    >
      {pending ? "Signing out…" : label}
    </Button>
  );
}