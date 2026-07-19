import { apiFetch } from "./client";
import { ApiError } from "./auth";
import {
  twoFactorVerifySchema,
  twoFactorResendSchema,
  twoFactorVerifyResponseSchema,
  type TwoFactorVerifyInput,
  type TwoFactorResendInput,
  type TwoFactorVerifyResponse,
} from "@/types/auth";

/** POST /auth/2fa/verify — exchanges a code or recovery code for a session cookie. */
export async function verifyTwoFactor(input: TwoFactorVerifyInput): Promise<TwoFactorVerifyResponse> {
  const parsed = twoFactorVerifySchema.parse(input);
  const result = await apiFetch("/auth/2fa/verify", {
    method: "POST",
    body: parsed,
    schema: twoFactorVerifyResponseSchema,
    forwardCookies: true,
  });
  if (!result.ok) {
    throw new ApiError(result.status, result.error.error);
  }
  return result.data;
}

/** POST /auth/2fa/resend — resends the email-OTP for the supplied challenge. */
export async function resendTwoFactor(input: TwoFactorResendInput): Promise<void> {
  const parsed = twoFactorResendSchema.parse(input);
  const result = await apiFetch("/auth/2fa/resend", {
    method: "POST",
    body: parsed,
    schema: undefined,
  });
  if (!result.ok) {
    throw new ApiError(result.status, result.error.error);
  }
}
