import { apiFetch, type ApiResult } from "./client";
import {
  quoteDraftResponseSchema,
  quoteServicesResponseSchema,
  type QuoteDraft,
  type QuoteDraftResponse,
  type QuoteServicesResponse,
} from "@/types/quote";

/**
 * Submit a public quote draft. No auth required — this is the visitor's
 * pre-qualification form. The backend stores it as `received` and
 * notifies sales.
 */
export async function submitQuoteDraft(
  draft: QuoteDraft,
): Promise<QuoteDraftResponse> {
  const result = await apiFetch("/quotes/drafts", {
    method: "POST",
    schema: quoteDraftResponseSchema,
    body: draft,
  });
  if (!result.ok) {
    // Re-throw a normalised error so the Client form can display it.
    throw new Error(result.error.error.message);
  }
  return result.data;
}

/**
 * Fetch the dropdown options for the "which services" picker. Cached at
 * the edge for 1 hour; this list rarely changes.
 */
export async function fetchQuoteServices(): Promise<ApiResult<QuoteServicesResponse>> {
  return apiFetch("/quotes/services", {
    schema: quoteServicesResponseSchema,
    next: { revalidate: 3600, tags: ["public:quote-services"] },
  });
}
