import { beforeEach, describe, expect, it, vi } from "vitest";
import { apiFetch } from "./client";
import { ApiError } from "./auth";
import { acceptInvitation, register } from "./register";

vi.mock("./client", () => ({
  apiFetch: vi.fn(),
  ApiTransportError: class ApiTransportError extends Error {},
}));

const mockedApiFetch = vi.mocked(apiFetch);

beforeEach(() => {
  mockedApiFetch.mockReset();
});

describe("register", () => {
  it("POSTs the parsed payload to /auth/register", async () => {
    mockedApiFetch.mockResolvedValueOnce({
      ok: true,
      status: 201,
      data: { userId: "user_1", requiresEmailVerification: true },
    });

    await register({
      email: "ada@example.com",
      password: "Sup3rSecret!",
      firstName: "Ada",
      lastName: "Lovelace",
      signupSource: "direct",
      acceptTerms: true,
      acceptPrivacy: true,
      marketingOptIn: false,
    });

    expect(mockedApiFetch).toHaveBeenCalledWith("/auth/register", {
      method: "POST",
      body: expect.objectContaining({
        email: "ada@example.com",
        password: "Sup3rSecret!",
        firstName: "Ada",
        lastName: "Lovelace",
      }),
      schema: expect.anything(),
    });
  });

  it("throws an ApiError on a 409 ACCOUNT_EXISTS response", async () => {
    mockedApiFetch.mockResolvedValueOnce({
      ok: false,
      status: 409,
      error: {
        error: { code: "ACCOUNT_EXISTS", message: "Email already registered" },
      },
    });

    await expect(
      register({
        email: "ada@example.com",
        password: "Sup3rSecret!",
        firstName: "Ada",
        lastName: "Lovelace",
        signupSource: "direct",
        acceptTerms: true,
        acceptPrivacy: true,
        marketingOptIn: false,
      }),
    ).rejects.toBeInstanceOf(ApiError);
  });
});

describe("acceptInvitation", () => {
  it("POSTs to /auth/invitations/accept with the invite token + names", async () => {
    mockedApiFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      data: undefined,
    });

    await acceptInvitation({
      token: "abcdefghijklmnopqrstuvwxyz",
      firstName: "Grace",
      lastName: "Hopper",
      password: "Sup3rSecret!",
      acceptTerms: true,
    });

    expect(mockedApiFetch).toHaveBeenCalledWith("/auth/invitations/accept", {
      method: "POST",
      body: expect.objectContaining({
        token: "abcdefghijklmnopqrstuvwxyz",
        firstName: "Grace",
        lastName: "Hopper",
        password: "Sup3rSecret!",
      }),
      schema: undefined,
    });
  });
});