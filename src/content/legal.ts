/**
 * Public legal documents, keyed by slug.
 *
 * The content lives in `./legal/<slug>.ts` so each document can be edited in
 * isolation. This file is a thin re-export so existing importers
 * (`import { legalDocumentsBySlug } from "@/content/legal"`) keep working.
 * Replace this module with the public legal API once the CMS/server phase begins.
 */
export { legalDocumentsBySlug } from "./legal/index";
export type { PublicLegalDocument } from "@/types/legal";