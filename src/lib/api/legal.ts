import { apiFetch } from "./client";
import { ApiError } from "./auth";
import { publicLegalDocumentSchema, type PublicLegalDocument } from "@/types/legal";

/** GET /public/legal/:slug — fetches the published version of a legal document. */
export async function getLegalDocument(slug: string): Promise<PublicLegalDocument> {
  const result = await apiFetch(`/public/legal/${encodeURIComponent(slug)}`, {
    schema: publicLegalDocumentSchema,
    // Public endpoint — cache aggressively so we don't hammer the DB.
    next: { revalidate: 3600, tags: [`legal:${slug}`] },
  });
  if (!result.ok) {
    throw new ApiError(result.status, result.error.error);
  }
  return result.data;
}
