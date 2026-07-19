import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { legalDocumentsBySlug } from "@/content/legal";

import { LegalPageLayout } from "../_components/legal-page-layout";

interface PageProps {
  params: Promise<{ document: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { document: slug } = await params;
  const doc = legalDocumentsBySlug[slug];
  if (!doc) {
    return { title: "Document not found" };
  }
  return {
    title: doc.title,
    description: `${doc.title} — CodeVenture legal documents, version ${doc.version}, effective ${new Date(doc.effectiveAt).toLocaleDateString("en-US")}.`,
    alternates: { canonical: `/legal/${slug}` },
    robots: { index: true, follow: true },
  };
}

export default async function LegalDocumentPage({ params }: PageProps) {
  const { document: slug } = await params;
  const document = legalDocumentsBySlug[slug];

  if (!document) notFound();

  return <LegalPageLayout document={document} />;
}
