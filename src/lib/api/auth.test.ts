import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./client", () => ({
  apiFetch: vi.fn(),
}));

import { apiFetch } from "./client";
import { ApiError, signIn, signOut, requestPasswordReset } from "./auth";

describe("signIn", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns void on a successful 2xx", async () => {
    vi.mocked(apiFetch).mockResolvedValue({
      ok: true,
      status: 200,
      data: { success: true },
    });

    await expect(
      signIn({ email: "[email protected]", password: "Sup3rSecret!" }),
    ).resolves.toBeUndefined();
    expect(apiFetch).toHaveBeenCalledWith(
      "/auth/sign-in",
      expect.objectContaining({
        method: "POST",
        forwardCookies: true,
      }),
    );
  });

  it("throws ApiError on a 401", async () => {
    vi.mocked(apiFetch).mockResolvedValue({
      ok: false,
      status: 401,
      error: {
        error: { code: "INVALID_CREDENTIALS", message: "Bad creds" },
      },
    });

    await expect(
      signIn({ email: "[email protected]", password: "Sup3rSecret!" }),
    ).rejects.toBeInstanceOf(ApiError);
  });
});

describe("signOut", () => {
  beforeEach(() => vi.clearAllMocks());

  it("posts to /auth/sign-out", async () => {
    vi.mocked(apiFetch).mockResolvedValue({
      ok: true,
      status: 200,
      data: { success: true },
    });

    await signOut();
    expect(apiFetch).toHaveBeenCalledWith(
      "/auth/sign-out",
      expect.objectContaining({ method: "POST" }),
    );
  });
});

describe("requestPasswordReset", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns the reference id on success", async () => {
    vi.mocked(apiFetch).mockResolvedValue({
      ok: true,
      status: 200,
      data: { reference: "req_abc123" },
    });

    await expect(
      requestPasswordReset({ email: "[email protected]" }),
    ).resolves.toEqual({ reference: "req_abc123" });
  });
});
