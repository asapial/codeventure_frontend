import { apiFetch } from "./client";
import { ApiError } from "./auth";
import {
  verifyEmailSchema,
  resendVerificationSchema,
  type VerifyEmailInput,
  type ResendVerificationInput,
} from "@/types/auth";

/** POST /auth/verify-email — verify via 6-digit code OR magic-link token. */
export async function verifyEmail(input: VerifyEmailInput): Promise<void> {
  const parsed = verifyEmailSchema.parse(input);
  const result = await apiFetch("/auth/verify-email", {
    method: "POST",
    body: parsed,
    schema: undefined,
  });
  if (!result.ok) {
    throw new ApiError(result.status, result.error.error);
  }
}

/** POST /auth/verify-email/resend — always returns success; never leaks whether email exists. */
export async function resendEmailOtp(input: ResendVerificationInput): Promise<void> {
  const parsed = resendVerificationSchema.parse(input);
  const result = await apiFetch("/auth/verify-email/resend", {
    method: "POST",
    body: parsed,
    schema: undefined,
  });
  if (!result.ok) {
    throw new ApiError(result.status, result.error.error);
  }
}
