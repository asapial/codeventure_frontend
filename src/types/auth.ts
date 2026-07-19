import { z } from "zod";

/**
 * Auth-domain Zod schemas. Mirrors the backend `auth.*` endpoints.
 *
 * Naming convention: each schema mirrors the request body of one endpoint
 * so the same name travels from the form → the fetcher → the API.
 */

export const emailSchema = z
  .string()
  .min(1, "Email is required.")
  .email("Please enter a valid email address.")
  .max(254);

/** P9 — POST /auth/sign-in */
export const signInSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(128),
  rememberMe: z.boolean().default(false),
  // Honeypot — bots fill it, humans don't.
  website: z.string().max(0).optional().or(z.literal("")),
});
export type SignInInput = z.infer<typeof signInSchema>;

/** P10 — POST /auth/sign-up */
export const signUpSchema = z
  .object({
    name: z.string().min(2, "Please enter your full name.").max(120),
    email: emailSchema,
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(128)
      .regex(/[A-Z]/, "Add at least one uppercase letter.")
      .regex(/[a-z]/, "Add at least one lowercase letter.")
      .regex(/[0-9]/, "Add at least one number."),
    confirmPassword: z.string(),
    acceptTerms: z.literal(true, {
      error: "You must accept the terms to continue.",
    }),
    marketingOptIn: z.boolean().default(false),
    website: z.string().max(0).optional().or(z.literal("")),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
export type SignUpInput = z.infer<typeof signUpSchema>;

/** P11 — POST /auth/forgot-password */
export const forgotPasswordSchema = z.object({
  email: emailSchema,
  website: z.string().max(0).optional().or(z.literal("")),
});
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

/** P12 — POST /auth/reset-password */
export const resetPasswordSchema = z
  .object({
    token: z.string().min(20, "Reset link is invalid or expired."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(128)
      .regex(/[A-Z]/, "Add at least one uppercase letter.")
      .regex(/[a-z]/, "Add at least one lowercase letter.")
      .regex(/[0-9]/, "Add at least one number."),
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

/* ---------- Response / session payloads ---------- */

export const sessionUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(["owner", "admin", "editor", "viewer"]).default("viewer"),
  avatarUrl: z.string().url().nullable().optional(),
  createdAt: z.string().datetime().optional(),
});
export type SessionUser = z.infer<typeof sessionUserSchema>;

export const sessionSchema = z.object({
  user: sessionUserSchema,
  expiresAt: z.string().datetime(),
});
export type Session = z.infer<typeof sessionSchema>;

export const authSuccessSchema = z.object({
  success: z.literal(true),
});
export const passwordResetRequestSchema = z.object({
  /** Reference id shown on the success screen. */
  reference: z.string(),
});
export type PasswordResetRequest = z.infer<typeof passwordResetRequestSchema>;

/** Strength meter — pure client-side, no API. */
export const passwordStrengthSchema = z.enum(["too-weak", "weak", "ok", "strong"]);
export type PasswordStrength = z.infer<typeof passwordStrengthSchema>;

export function scorePassword(pw: string): PasswordStrength {
  if (pw.length < 8) return "too-weak";
  const hasLower = /[a-z]/.test(pw);
  const hasUpper = /[A-Z]/.test(pw);
  const hasDigit = /[0-9]/.test(pw);
  const hasSymbol = /[^A-Za-z0-9]/.test(pw);
  const classes = [hasLower, hasUpper, hasDigit, hasSymbol].filter(Boolean).length;
  if (pw.length >= 12 && classes >= 3) return "strong";
  if (pw.length >= 10 && classes >= 2) return "ok";
  return "weak";
}

/* ============================================================================
 * P16 — Two-factor verification
 * ============================================================================
 */

/** Method codes for the 2FA challenge. Mirrors backend `WireTwoFactorMethod`. */
export const twoFactorMethodSchema = z.enum(["totp", "email-otp", "recovery-code"]);
export type TwoFactorMethod = z.infer<typeof twoFactorMethodSchema>;

/** POST /auth/2fa/verify */
export const twoFactorVerifySchema = z
  .object({
    challengeToken: z
      .string()
      .min(20, "Challenge token is missing or malformed.")
      .max(256, "Challenge token is too long."),
    code: z
      .string()
      .regex(/^\d{6}$/, "Code must be 6 digits.")
      .optional()
      .or(z.literal("")),
    recoveryCode: z
      .string()
      .regex(
        /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/i,
        "Recovery code must look like XXXX-XXXX-XXXX-XXXX.",
      )
      .optional()
      .or(z.literal("")),
    trustDevice: z.boolean().default(false),
  })
  .refine(
    (v) => {
      const hasCode = Boolean(v.code && v.code.length > 0);
      const hasRecovery = Boolean(v.recoveryCode && v.recoveryCode.length > 0);
      return hasCode !== hasRecovery;
    },
    {
      message: "Provide either a 6-digit code OR a recovery code, not both.",
      path: ["code"],
    },
  );
export type TwoFactorVerifyInput = z.infer<typeof twoFactorVerifySchema>;

/** POST /auth/2fa/resend */
export const twoFactorResendSchema = z.object({
  challengeToken: z
    .string()
    .min(20, "Challenge token is missing or malformed.")
    .max(256, "Challenge token is too long."),
});
export type TwoFactorResendInput = z.infer<typeof twoFactorResendSchema>;

/* ============================================================================
 * P17 — Customer registration
 * ============================================================================
 */

export const signupSourceSchema = z.enum([
  "direct",
  "organic-search",
  "paid-ad",
  "social",
  "referral",
  "email-campaign",
  "other",
]);
export type SignupSource = z.infer<typeof signupSourceSchema>;

export const accountRoleSchema = z.enum(["owner", "admin", "editor", "viewer"]);

/** Shared password rule for register + accept-invitation. */
const registerPasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(128, "Password is too long.")
  .refine(
    (p) => /[a-z]/.test(p) && /[A-Z0-9]/.test(p),
    "Password must include a lowercase letter and either an uppercase letter or a digit.",
  );

/** POST /auth/register */
export const registerSchema = z
  .object({
    email: emailSchema,
    password: registerPasswordSchema,
    firstName: z
      .string()
      .min(1, "First name is required.")
      .max(60, "First name is too long."),
    lastName: z
      .string()
      .min(1, "Last name is required.")
      .max(60, "Last name is too long."),
    signupSource: signupSourceSchema.optional(),
    referralCode: z
      .string()
      .min(3, "Referral code looks too short.")
      .max(40)
      .regex(/^[A-Z0-9_-]+$/i, "Referral code must be alphanumeric.")
      .optional()
      .or(z.literal("")),
    inviteToken: z.string().min(20).max(256).optional().or(z.literal("")),
    acceptTerms: z.literal(true, {
      error: "You must accept the terms to register.",
    }),
    acceptPrivacy: z.literal(true, {
      error: "You must accept the privacy policy to register.",
    }),
    marketingOptIn: z.boolean().default(false),
    // Honeypot — bots fill it, humans don't.
    website: z.string().max(0).optional().or(z.literal("")),
  });
export type RegisterInput = z.infer<typeof registerSchema>;

/** POST /auth/invitations/accept */
export const acceptInvitationSchema = z.object({
  token: z.string().min(20, "Invitation token is missing or malformed.").max(256),
  firstName: z.string().min(1).max(60),
  lastName: z.string().min(1).max(60),
  password: registerPasswordSchema,
  acceptTerms: z.literal(true, {
    error: "You must accept the terms to continue.",
  }),
  website: z.string().max(0).optional().or(z.literal("")),
});
export type AcceptInvitationInput = z.infer<typeof acceptInvitationSchema>;

export const registerResponseSchema = z.object({
  userId: z.string(),
  email: z.string().email(),
  requiresEmailVerification: z.boolean(),
});
export type RegisterResponse = z.infer<typeof registerResponseSchema>;

/* ============================================================================
 * P18 — Email verification
 * ============================================================================
 */

/** POST /auth/verify-email — accepts either a 6-digit code or a magic-link token. */
export const verifyEmailSchema = z
  .object({
    email: emailSchema,
    code: z
      .string()
      .regex(/^\d{6}$/, "Code must be 6 digits.")
      .optional()
      .or(z.literal("")),
    token: z.string().min(20).max(256).optional().or(z.literal("")),
  })
  .refine(
    (v) => {
      const hasCode = Boolean(v.code && v.code.length > 0);
      const hasToken = Boolean(v.token && v.token.length > 0);
      return hasCode !== hasToken;
    },
    {
      message: "Provide either a 6-digit code OR a magic-link token.",
      path: ["code"],
    },
  );
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;

/** POST /auth/verify-email/resend */
export const resendVerificationSchema = z.object({
  email: emailSchema,
});
export type ResendVerificationInput = z.infer<typeof resendVerificationSchema>;

/* ============================================================================
 * Response envelopes
 * ============================================================================
 */

export const twoFactorVerifyResponseSchema = z.object({
  expiresAt: z.string().datetime(),
  trustedDevice: z.boolean(),
});
export type TwoFactorVerifyResponse = z.infer<typeof twoFactorVerifyResponseSchema>;

export const twoFactorChallengeInfoSchema = z.object({
  challengeToken: z.string().min(20),
  method: twoFactorMethodSchema,
  expiresInSeconds: z.number().int().positive(),
});
export type TwoFactorChallengeInfo = z.infer<typeof twoFactorChallengeInfoSchema>;