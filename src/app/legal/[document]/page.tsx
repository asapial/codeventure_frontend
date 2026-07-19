import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getLegalDocument } from "@/lib/api/legal";
import { ApiError } from "@/lib/api/auth";

import { LegalDocumentView } from "./_components/legal-document";

const KNOWN_SLUGS = [
  "privacy-policy",
  "terms-of-service",
  "acceptable-use",
  "cookie-policy",
  "data-processing-agreement",
] as const;

interface PageProps {
  params: Promise<{ document: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { document: slug } = await params;
  if (!KNOWN_SLUGS.includes(slug as (typeof KNOWN_SLUGS)[number])) {
    return { title: "Document not found" };
  }
  try {
    const doc = await getLegalDocument(slug);
    return {
      title: doc.title,
      description: `${doc.title} — CodeVenture legal documents, version ${doc.version}, effective ${new Date(doc.effectiveAt).toLocaleDateString("en-US")}.`,
      alternates: { canonical: `/legal/${slug}` },
      robots: { index: true, follow: true },
    };
  } catch {
    return { title: "Document not found" };
  }
}

export default async function LegalDocumentPage({ params }: PageProps) {
  const { document: slug } = await params;
  if (!KNOWN_SLUGS.includes(slug as (typeof KNOWN_SLUGS)[number])) {
    notFound();
  }

  let document;
  try {
    document = await getLegalDocument(slug);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      notFound();
    }
    throw err;
  }

  return (
    <article className="bg-gradient-to-b from-background to-muted/30">
      <section className="container mx-auto max-w-3xl px-4 py-16">
        <header className="border-b border-border pb-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Legal
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            {document.title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Version {document.version} · effective{" "}
            {new Date(document.effectiveAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {document.requiresReconsent
              ? " · you'll be asked to re-consent on next sign-in"
              : ""}
          </p>
        </header>

        <LegalDocumentView body={document.body} />

        <footer className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
          <p>
            Questions?{" "}
            <Link
              href="/contact"
              className="text-primary underline-offset-4 hover:underline"
            >
              Get in touch
            </Link>
            .
          </p>
        </footer>
      </section>
    </article>
  );
}
