import type { PublicLegalDocument } from "@/types/legal";

import { privacyPolicy } from "./privacy-policy";
import { termsOfService } from "./terms-of-service";
import { acceptableUse } from "./acceptable-use";
import { cookiePolicy } from "./cookie-policy";
import { dataProcessingAgreement } from "./data-processing-agreement";

/**
 * Aggregated public legal documents, keyed by slug.
 * Per-document content lives in ./<slug>.ts so each document can be edited in
 * isolation. Keep this index thin — it should only import and assemble.
 */
export const legalDocumentsBySlug: Record<string, PublicLegalDocument> = {
  [privacyPolicy.slug]: privacyPolicy,
  [termsOfService.slug]: termsOfService,
  [acceptableUse.slug]: acceptableUse,
  [cookiePolicy.slug]: cookiePolicy,
  [dataProcessingAgreement.slug]: dataProcessingAgreement,
};
