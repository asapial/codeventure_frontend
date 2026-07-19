import { beforeEach, describe, expect, it, vi } from "vitest";
import { apiFetch } from "./client";
import { resendEmailOtp, verifyEmail } from "./verify-email";

vi.mock("./client", () => ({
  apiFetch: vi.fn(),
  ApiTransportError: class ApiTransportError extends Error {},
}));

const mockedApiFetch = vi.mocked(apiFetch);

beforeEach(() => {
  mockedApiFetch.mockReset();
});

describe("verifyEmail", () => {
  it("POSTs the OTP code to /auth/verify-email", async () => {
    mockedApiFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      data: undefined,
    });

    await verifyEmail({
      email: "ada@example.com",
      code: "123456",
    });

    expect(mockedApiFetch).toHaveBeenCalledWith("/auth/verify-email", {
      method: "POST",
      body: { email: "ada@example.com", code: "123456" },
      schema: undefined,
    });
  });

  it("POSTs a magic-link token when given a token instead of a code", async () => {
    mockedApiFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      data: undefined,
    });

    await verifyEmail({
      email: "ada@example.com",
      token: "abcdefghijklmnopqrstuv",
    });

    expect(mockedApiFetch).toHaveBeenCalledWith("/auth/verify-email", {
      method: "POST",
      body: { email: "ada@example.com", token: "abcdefghijklmnopqrstuv" },
      schema: undefined,
    });
  });
});

describe("resendEmailOtp", () => {
  it("POSTs the email to /auth/verify-email/resend", async () => {
    mockedApiFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      data: undefined,
    });

    await resendEmailOtp({ email: "ada@example.com" });

    expect(mockedApiFetch).toHaveBeenCalledWith("/auth/verify-email/resend", {
      method: "POST",
      body: { email: "ada@example.com" },
      schema: undefined,
    });
  });
});