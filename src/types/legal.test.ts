import { describe, expect, it } from "vitest";
import {
  legalDocumentStatusSchema,
  legalDocumentTypeSchema,
  publicLegalDocumentSchema,
} from "./legal";

describe("legalDocumentTypeSchema", () => {
  it("accepts the five canonical document types", () => {
    for (const t of [
      "privacy-policy",
      "terms-of-service",
      "acceptable-use",
      "cookie-policy",
      "data-processing-agreement",
    ] as const) {
      expect(legalDocumentTypeSchema.safeParse(t).success).toBe(true);
    }
  });

  it("rejects unknown slugs", () => {
    expect(legalDocumentTypeSchema.safeParse("nope").success).toBe(false);
  });
});

describe("legalDocumentStatusSchema", () => {
  it("accepts the three statuses", () => {
    for (const s of ["DRAFT", "PUBLISHED", "ARCHIVED"] as const) {
      expect(legalDocumentStatusSchema.safeParse(s).success).toBe(true);
    }
  });
});

describe("publicLegalDocumentSchema", () => {
  const baseDoc = {
    slug: "privacy-policy",
    type: "privacy-policy" as const,
    title: "Privacy Policy",
    status: "PUBLISHED" as const,
    publishedAt: "2026-01-01T00:00:00.000Z",
    version: 1,
    effectiveAt: "2026-01-01T00:00:00.000Z",
    requiresReconsent: false,
    body: "We respect your privacy.",
  };

  it("accepts a fully-populated document", () => {
    expect(publicLegalDocumentSchema.safeParse(baseDoc).success).toBe(true);
  });

  it("accepts a document with a null publishedAt", () => {
    expect(
      publicLegalDocumentSchema.safeParse({ ...baseDoc, publishedAt: null })
        .success,
    ).toBe(true);
  });

  it("rejects a non-positive version", () => {
    expect(
      publicLegalDocumentSchema.safeParse({ ...baseDoc, version: 0 }).success,
    ).toBe(false);
  });
});
