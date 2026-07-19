import { beforeEach, describe, expect, it, vi } from "vitest";
import { apiFetch } from "./client";
import { ApiError } from "./auth";
import { resendTwoFactor, verifyTwoFactor } from "./auth-2fa";

vi.mock("./client", () => ({
  apiFetch: vi.fn(),
  ApiTransportError: class ApiTransportError extends Error {},
}));

const mockedApiFetch = vi.mocked(apiFetch);

beforeEach(() => {
  mockedApiFetch.mockReset();
});

describe("verifyTwoFactor", () => {
  it("POSTs to /auth/2fa/verify with parsed body and forwards cookies", async () => {
    mockedApiFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      data: { accessToken: "jwt.access.token", redirectTo: "/account" },
    });

    await verifyTwoFactor({
      challengeToken: "abcdefghijklmnopqrstuvwxyz",
      code: "123456",
      trustDevice: true,
    });

    expect(mockedApiFetch).toHaveBeenCalledWith("/auth/2fa/verify", {
      method: "POST",
      body: {
        challengeToken: "abcdefghijklmnopqrstuvwxyz",
        code: "123456",
        trustDevice: true,
      },
      schema: expect.anything(),
      forwardCookies: true,
    });
  });

  it("throws an ApiError carrying the envelope error on a 400", async () => {
    mockedApiFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      error: {
        error: {
          code: "INVALID_CHALLENGE_TOKEN",
          message: "That code didn't work",
        },
      },
    });

    let caught: unknown;
    try {
      await verifyTwoFactor({
        challengeToken: "abcdefghijklmnopqrstuvwxyz",
        code: "000000",
        trustDevice: false,
      });
    } catch (err) {
      caught = err;
    }

    expect(caught).toBeDefined();
    expect(caught).toBeInstanceOf(ApiError);
    expect(caught).toMatchObject({
      status: 400,
      message: "That code didn't work",
    });
    expect((caught as { body: { code: string } }).body.code).toBe(
      "INVALID_CHALLENGE_TOKEN",
    );
  });
});

describe("resendTwoFactor", () => {
  it("POSTs the challengeToken to /auth/2fa/resend", async () => {
    mockedApiFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      data: undefined,
    });

    await resendTwoFactor({ challengeToken: "abcdefghijklmnopqrstuvwxyz" });

    expect(mockedApiFetch).toHaveBeenCalledWith("/auth/2fa/resend", {
      method: "POST",
      body: { challengeToken: "abcdefghijklmnopqrstuvwxyz" },
      schema: undefined,
    });
  });
});
