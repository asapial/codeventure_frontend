import { apiFetch, ApiTransportError } from "./client";
import {
  authSuccessSchema,
  passwordResetRequestSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
  forgotPasswordSchema,
  sessionSchema,
  type ForgotPasswordInput,
  type PasswordResetRequest,
  type ResetPasswordInput,
  type Session,
  type SignInInput,
  type SignUpInput,
} from "@/types/auth";

/**
 * Auth-domain API helpers.
 *
 * The auth endpoints set a session cookie on success. Because the cookie
 * store is read on the server with `cookies()` and not on the client, we
 * forward it explicitly for endpoints that need to read it back.
 */

export async function signIn(input: SignInInput): Promise<void> {
  const parsed = signInSchema.parse(input);
  const result = await apiFetch("/auth/sign-in", {
    method: "POST",
    body: parsed,
    schema: authSuccessSchema.optional(),
    forwardCookies: true,
  });
  if (!result.ok) {
    throw new ApiError(result.status, result.error.error);
  }
}

export async function signUp(input: SignUpInput): Promise<void> {
  const parsed = signUpSchema.parse(input);
  const result = await apiFetch("/auth/sign-up", {
    method: "POST",
    body: parsed,
    schema: authSuccessSchema.optional(),
    forwardCookies: true,
  });
  if (!result.ok) {
    throw new ApiError(result.status, result.error.error);
  }
}

export async function signOut(): Promise<void> {
  const result = await apiFetch("/auth/sign-out", {
    method: "POST",
    schema: authSuccessSchema.optional(),
    forwardCookies: true,
  });
  if (!result.ok) {
    throw new ApiError(result.status, result.error.error);
  }
}

export async function requestPasswordReset(
  input: ForgotPasswordInput,
): Promise<PasswordResetRequest> {
  const parsed = forgotPasswordSchema.parse(input);
  const result = await apiFetch("/auth/forgot-password", {
    method: "POST",
    body: parsed,
    schema: passwordResetRequestSchema,
  });
  if (!result.ok) {
    throw new ApiError(result.status, result.error.error);
  }
  return result.data;
}

export async function resetPassword(input: ResetPasswordInput): Promise<void> {
  const parsed = resetPasswordSchema.parse(input);
  const result = await apiFetch("/auth/reset-password", {
    method: "POST",
    body: parsed,
    schema: authSuccessSchema.optional(),
  });
  if (!result.ok) {
    throw new ApiError(result.status, result.error.error);
  }
}

export async function fetchSession(): Promise<Session | null> {
  const result = await apiFetch("/auth/session", {
    schema: sessionSchema.nullable(),
    forwardCookies: true,
  });
  if (!result.ok) {
    if (result.status === 401) return null;
    throw new ApiError(result.status, result.error.error);
  }
  return result.data;
}

/**
 * Lightweight typed error so forms can render `error.error.fieldErrors`.
 */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: {
      code: string;
      message: string;
      fieldErrors?: Record<string, string[]>;
      requestId?: string;
    },
  ) {
    super(body.message);
    this.name = "ApiError";
  }
}

export { ApiTransportError };