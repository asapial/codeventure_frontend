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