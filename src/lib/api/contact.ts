import { z } from "zod";
import { apiFetch, type ApiResult } from "./client";
import {
  contactDetailsSchema,
  contactMessageSchema,
  contactSubmissionResponseSchema,
  type ContactDetails,
  type ContactMessage,
  type ContactSubmissionResponse,
} from "@/types/contact";

/** GET /public/contact — about-page-ready details (offices, social links). */
export async function fetchContactDetails(): Promise<ApiResult<ContactDetails>> {
  return apiFetch("/public/contact", {
    schema: contactDetailsSchema,
    next: { revalidate: 3600, tags: ["public:contact"] },
  });
}

/**
 * POST /contact/messages — generic messages routed by `topic`.
 *
 * Validates the *payload* against `contactMessageSchema` (client-side) and
 * the response against `contactSubmissionResponseSchema`.
 */
export async function submitContactMessage(
  payload: ContactMessage,
): Promise<ContactSubmissionResponse> {
  // Defensive re-validation — guards against caller bugs at module boundaries.
  const parsedPayload = contactMessageSchema.parse(payload);

  const rawReceipt = z
    .object({ success: z.literal(true) })
    .or(contactSubmissionResponseSchema)
    .nullable()
    .optional();

  const result = await apiFetch("/contact/messages", {
    method: "POST",
    body: parsedPayload,
    schema: rawReceipt,
  });
  if (!result.ok) throw new Error(result.error.error.message);

  const parsed = contactSubmissionResponseSchema.safeParse(result.data);
  if (parsed.success) return parsed.data;
  // Server returned only `{ success: true }` (no id) — synthesise a
  // best-effort client receipt so the success screen can still render.
  return { id: `local-${Date.now()}` };
}
