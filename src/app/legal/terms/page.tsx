import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { legalDocumentsBySlug } from "@/content/legal";
import { LegalPageLayout } from "../_components/legal-page-layout";

export const metadata: Metadata = {
  title: "Terms of Service — CodeVenture",
  description:
    "The terms that govern your use of the CodeVenture website, and what they do (and don't) cover.",
  alternates: { canonical: "/legal/terms" },
};

export default function TermsPage() {
  const document = legalDocumentsBySlug["terms-of-service"];
  if (!document) notFound();

  return <LegalPageLayout document={document} />;
}
