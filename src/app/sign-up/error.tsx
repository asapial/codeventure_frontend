"use client";

import { AuthError } from "@/components/shared/auth-error";

export default function SignUpError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <AuthError variant="sign-up" error={error} reset={reset} />;
}