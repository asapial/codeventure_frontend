"use client";

import { AuthError } from "@/components/shared/auth-error";

export default function SignInError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <AuthError variant="sign-in" error={error} reset={reset} />;
}