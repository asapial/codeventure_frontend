import { beforeEach, describe, expect, it, vi } from "vitest";

const cookieStore = new Map<string, string>();

vi.mock("next/headers", () => ({
  cookies: vi.fn(async () => ({
    get: (name: string) => {
      const value = cookieStore.get(name);
      return value ? { name, value } : undefined;
    },
  })),
}));

vi.mock("@/lib/api/auth", () => ({
  fetchSession: vi.fn(async () =>
    cookieStore.get("cv_session")
      ? {
          user: { id: "u1", email: "[email protected]", name: "Ada" },
          expiresAt: "2026-01-01T00:00:00Z",
        }
      : null,
  ),
}));

import { getSession, isAuthenticated } from "./session";

describe("getSession", () => {
  beforeEach(() => cookieStore.clear());

  it("returns null when no session cookie is present", async () => {
    expect(await getSession()).toBeNull();
  });

  it("returns the session when the cookie is present", async () => {
    cookieStore.set("cv_session", "opaque-token");
    await expect(getSession()).resolves.toMatchObject({
      user: { id: "u1" },
    });
  });

  it("swallows fetchSession errors and returns null", async () => {
    cookieStore.set("cv_session", "opaque-token");
    const { fetchSession } = await import("@/lib/api/auth");
    vi.mocked(fetchSession).mockRejectedValueOnce(new Error("network down"));
    await expect(getSession()).resolves.toBeNull();
  });
});

describe("isAuthenticated", () => {
  beforeEach(() => cookieStore.clear());

  it("returns false when there is no cookie", async () => {
    await expect(isAuthenticated()).resolves.toBe(false);
  });

  it("returns true when the cookie is present", async () => {
    cookieStore.set("cv_session", "opaque-token");
    await expect(isAuthenticated()).resolves.toBe(true);
  });
});
