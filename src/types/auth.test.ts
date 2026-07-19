import { describe, expect, it } from "vitest";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  scorePassword,
  signInSchema,
  signUpSchema,
} from "./auth";

describe("signInSchema", () => {
  it("accepts a valid payload with defaults", () => {
    const result = signInSchema.safeParse({
      email: "[email protected]",
      password: "Sup3rSecret!",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.rememberMe).toBe(false);
    }
  });

  it("flags honeypot fields filled by bots", () => {
    const result = signInSchema.safeParse({
      email: "[email protected]",
      password: "Sup3rSecret!",
      website: "http://spam.example",
    });
    expect(result.success).toBe(false);
  });

  it("requires a password of at least 8 chars", () => {
    const result = signInSchema.safeParse({
      email: "[email protected]",
      password: "short",
    });
    expect(result.success).toBe(false);
  });
});

describe("signUpSchema", () => {
  it("requires passwords to match", () => {
    const result = signUpSchema.safeParse({
      name: "Ada Lovelace",
      email: "[email protected]",
      password: "Sup3rSecret!",
      confirmPassword: "Different1!",
      acceptTerms: true,
    });
    expect(result.success).toBe(false);
  });

  it("requires acceptance of terms", () => {
    const result = signUpSchema.safeParse({
      name: "Ada Lovelace",
      email: "[email protected]",
      password: "Sup3rSecret!",
      confirmPassword: "Sup3rSecret!",
      acceptTerms: false,
    });
    expect(result.success).toBe(false);
  });

  it("accepts a strong matching pair", () => {
    const result = signUpSchema.safeParse({
      name: "Ada Lovelace",
      email: "[email protected]",
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
      forgotPasswordSchema.safeParse({ email: "[email protected]" }).success,
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
