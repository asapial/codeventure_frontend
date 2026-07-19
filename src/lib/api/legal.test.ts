import { beforeEach, describe, expect, it, vi } from "vitest";
import { apiFetch } from "./client";
import { getLegalDocument } from "./legal";

vi.mock("./client", () => ({
  apiFetch: vi.fn(),
  ApiTransportError: class ApiTransportError extends Error {},
}));

const mockedApiFetch = vi.mocked(apiFetch);

beforeEach(() => {
  mockedApiFetch.mockReset();
});

describe("getLegalDocument", () => {
  it("GETs the slug with a 1h ISR revalidate and a per-slug cache tag", async () => {
    mockedApiFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      data: {
        slug: "privacy-policy",
        type: "privacy-policy",
        title: "Privacy Policy",
        status: "PUBLISHED",
        publishedAt: "2026-01-01T00:00:00.000Z",
        version: 1,
        effectiveAt: "2026-01-01T00:00:00.000Z",
        requiresReconsent: false,
        body: "We respect your privacy.",
      },
    });

    await getLegalDocument("privacy-policy");

    expect(mockedApiFetch).toHaveBeenCalledWith(
      "/public/legal/privacy-policy",
      {
        schema: expect.anything(),
        next: { revalidate: 3600, tags: ["legal:privacy-policy"] },
      },
    );
  });

  it("encodes slugs that contain special characters", async () => {
    mockedApiFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      data: {
        slug: "acceptable-use",
        type: "acceptable-use",
        title: "Acceptable Use",
        status: "PUBLISHED",
        publishedAt: null,
        version: 2,
        effectiveAt: "2026-02-01T00:00:00.000Z",
        requiresReconsent: false,
        body: "Be kind.",
      },
    });

    await getLegalDocument("acceptable-use");

    expect(mockedApiFetch).toHaveBeenCalledWith(
      "/public/legal/acceptable-use",
      expect.objectContaining({
        next: { revalidate: 3600, tags: ["legal:acceptable-use"] },
      }),
    );
  });
});