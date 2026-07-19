import { afterEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { apiFetch } from "./client";

describe("apiFetch", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("unwraps the backend success envelope before schema validation", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          success: true,
          message: "ok",
          data: { userId: "user_1", email: "ada@example.com" },
        }),
        { status: 201, headers: { "content-type": "application/json" } },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    const result = await apiFetch("/auth/register", {
      schema: z.object({ userId: z.string(), email: z.string().email() }),
    });

    expect(result).toEqual({
      ok: true,
      status: 201,
      data: { userId: "user_1", email: "ada@example.com" },
    });
  });

  it("always includes credentials so cross-origin auth cookies persist", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true, data: null }), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await apiFetch("/auth/sign-in", { method: "POST", body: {} });

    expect(fetchMock).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ credentials: "include" }),
    );
  });
});
