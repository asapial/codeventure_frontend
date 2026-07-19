import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { legalDocumentsBySlug } from "@/content/legal";
import { LegalPageLayout } from "../_components/legal-page-layout";

export const metadata: Metadata = {
  title: "Privacy Policy — CodeVenture",
  description:
    "How CodeVenture collects, uses, retains, and protects personal information across our site and engagements.",
  alternates: { canonical: "/legal/privacy" },
};

export default function PrivacyPage() {
  const document = legalDocumentsBySlug["privacy-policy"];
  if (!document) notFound();

  return <LegalPageLayout document={document} />;
}
