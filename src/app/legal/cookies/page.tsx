import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { legalDocumentsBySlug } from "@/content/legal";
import { LegalPageLayout } from "../_components/legal-page-layout";

export const metadata: Metadata = {
  title: "Cookie Policy — CodeVenture",
  description:
    "How CodeVenture uses cookies — the categories we rely on, what they do, and how you can manage them.",
  alternates: { canonical: "/legal/cookies" },
};

export default function CookiesPage() {
  const document = legalDocumentsBySlug["cookie-policy"];
  if (!document) notFound();

  return <LegalPageLayout document={document} />;
}
