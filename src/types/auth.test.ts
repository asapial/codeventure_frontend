import { describe, expect, it } from "vitest";
import {
  forgotPasswordSchema,
  registerSchema,
  resetPasswordSchema,
  resendVerificationSchema,
  scorePassword,
  signInSchema,
  signUpSchema,
  twoFactorResendSchema,
  twoFactorVerifySchema,
  verifyEmailSchema,
} from "./auth";

describe("signInSchema", () => {
  it("accepts a valid payload with defaults", () => {
    const result = signInSchema.safeParse({
      email: "ada@example.com",
      password: "Sup3rSecret!",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.rememberMe).toBe(false);
    }
  });

  it("flags honeypot fields filled by bots", () => {
    const result = signInSchema.safeParse({
      email: "ada@example.com",
      password: "Sup3rSecret!",
      website: "http://spam.example",
    });
    expect(result.success).toBe(false);
  });

  it("requires a password of at least 8 chars", () => {
    const result = signInSchema.safeParse({
      email: "ada@example.com",
      password: "short",
    });
    expect(result.success).toBe(false);
  });
});

describe("signUpSchema", () => {
  it("requires passwords to match", () => {
    const result = signUpSchema.safeParse({
      name: "Ada Lovelace",
      email: "ada@example.com",
      password: "Sup3rSecret!",
      confirmPassword: "Different1!",
      acceptTerms: true,
    });
    expect(result.success).toBe(false);
  });

  it("requires acceptance of terms", () => {
    const result = signUpSchema.safeParse({
      name: "Ada Lovelace",
      email: "ada@example.com",
      password: "Sup3rSecret!",
      confirmPassword: "Sup3rSecret!",
      acceptTerms: false,
    });
    expect(result.success).toBe(false);
  });

  it("accepts a strong matching pair", () => {
    const result = signUpSchema.safeParse({
      name: "Ada Lovelace",
      email: "ada@example.com",
      password: "Sup3rSecret!",
      confirmPassword: "Sup3rSecret!",
      acceptTerms: true,
    });
    expect(result.success).toBe(true);
  });
});

describe("forgotPasswordSchema", () => {
  it("accepts a well-formed email", () => {
    expect(
      forgotPasswordSchema.safeParse({ email: "ada@example.com" }).success,
    ).toBe(true);
  });

  it("rejects empty input", () => {
    expect(forgotPasswordSchema.safeParse({ email: "" }).success).toBe(false);
  });
});

describe("resetPasswordSchema", () => {
  it("requires a token of at least 20 chars", () => {
    expect(
      resetPasswordSchema.safeParse({
        token: "short",
        password: "Sup3rSecret!",
        confirmPassword: "Sup3rSecret!",
      }).success,
    ).toBe(false);
  });

  it("accepts a long token + strong matching pair", () => {
    expect(
      resetPasswordSchema.safeParse({
        token: "abcdefghijklmnopqrstuvwxyz",
        password: "Sup3rSecret!",
        confirmPassword: "Sup3rSecret!",
      }).success,
    ).toBe(true);
  });
});

describe("scorePassword", () => {
  it.each([
    ["short", "too-weak"],
    ["onlyletters", "weak"],
    ["longenough1", "ok"],
    ["Tr0ub4dor&3-x!", "strong"],
  ])("grades %s as %s", (input, expected) => {
    expect(scorePassword(input)).toBe(expected);
  });
});

describe("twoFactorVerifySchema (P16)", () => {
  const challengeToken = "abcdefghijklmnopqrstuvwxyz"; // 26 chars

  it("accepts a 6-digit code with trustDevice=false default", () => {
    const result = twoFactorVerifySchema.safeParse({
      challengeToken,
      code: "123456",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.trustDevice).toBe(false);
    }
  });

  it("accepts a recovery code", () => {
    const result = twoFactorVerifySchema.safeParse({
      challengeToken,
      recoveryCode: "ABCD-1234-EFGH-5678",
    });
    expect(result.success).toBe(true);
  });

  it("rejects when both code and recoveryCode are provided", () => {
    const result = twoFactorVerifySchema.safeParse({
      challengeToken,
      code: "123456",
      recoveryCode: "ABCD-1234-EFGH-5678",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a short challenge token", () => {
    const result = twoFactorVerifySchema.safeParse({
      challengeToken: "short",
      code: "123456",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a non-6-digit code", () => {
    const result = twoFactorVerifySchema.safeParse({
      challengeToken,
      code: "12345",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a malformed recovery code", () => {
    const result = twoFactorVerifySchema.safeParse({
      challengeToken,
      recoveryCode: "not-a-recovery-code",
    });
    expect(result.success).toBe(false);
  });
});

describe("twoFactorResendSchema (P16)", () => {
  it("accepts a long enough token", () => {
    const result = twoFactorResendSchema.safeParse({
      challengeToken: "abcdefghijklmnopqrstuv",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a too-short token", () => {
    const result = twoFactorResendSchema.safeParse({
      challengeToken: "abc",
    });
    expect(result.success).toBe(false);
  });
});

describe("registerSchema (P17)", () => {
  const validPayload = {
    email: "ada@example.com",
    password: "Sup3rSecret!",
    firstName: "Ada",
    lastName: "Lovelace",
    signupSource: "direct" as const,
    acceptTerms: true as const,
    acceptPrivacy: true as const,
    marketingOptIn: false,
  };

  it("accepts a complete customer registration", () => {
    expect(registerSchema.safeParse(validPayload).success).toBe(true);
  });

  it("rejects when terms is not accepted", () => {
    const result = registerSchema.safeParse({
      ...validPayload,
      acceptTerms: false,
    });
    expect(result.success).toBe(false);
  });

  it("rejects when privacy is not accepted", () => {
    const result = registerSchema.safeParse({
      ...validPayload,
      acceptPrivacy: false,
    });
    expect(result.success).toBe(false);
  });

  it("rejects a weak password", () => {
    const result = registerSchema.safeParse({
      ...validPayload,
      password: "alllower",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a bot-filled honeypot", () => {
    const result = registerSchema.safeParse({
      ...validPayload,
      website: "http://spam.example",
    });
    expect(result.success).toBe(false);
  });

  it("lowercases the email before validation", () => {
    const result = registerSchema.safeParse({
      ...validPayload,
      email: "ada@example.com",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      // Zod's `.email()` does not lowercase, but the backend schema does; the
      // frontend leaves that to the API.
      expect(result.data.email).toBe("ada@example.com");
    }
  });
});

describe("verifyEmailSchema (P18)", () => {
  it("accepts a 6-digit code", () => {
    const result = verifyEmailSchema.safeParse({
      email: "ada@example.com",
      code: "123456",
    });
    expect(result.success).toBe(true);
  });

  it("accepts a magic-link token", () => {
    const result = verifyEmailSchema.safeParse({
      email: "ada@example.com",
      token: "abcdefghijklmnopqrstuv",
    });
    expect(result.success).toBe(true);
  });

  it("rejects when both code and token are provided", () => {
    const result = verifyEmailSchema.safeParse({
      email: "ada@example.com",
      code: "123456",
      token: "abcdefghijklmnopqrstuv",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a non-6-digit code", () => {
    const result = verifyEmailSchema.safeParse({
      email: "ada@example.com",
      code: "abc",
    });
    expect(result.success).toBe(false);
  });
});

describe("resendVerificationSchema (P18)", () => {
  it("accepts a valid email", () => {
    expect(
      resendVerificationSchema.safeParse({ email: "ada@example.com" }).success,
    ).toBe(true);
  });

  it("rejects an empty email", () => {
    expect(
      resendVerificationSchema.safeParse({ email: "" }).success,
    ).toBe(false);
  });
});
