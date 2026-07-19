import Link from "next/link";

import { PageHero } from "@/components/shared/page-hero";
import { Separator } from "@/components/ui/separator";
import { LegalDocumentView } from "../[document]/_components/legal-document";
import { LegalToc } from "../[document]/_components/legal-toc";
import { extractHeadings } from "../[document]/_components/parse-headings";

import type { PublicLegalDocument } from "@/types/legal";

interface Props {
  document: PublicLegalDocument;
}

/**
 * Shared layout used by every legal page (the dynamic [document] route plus
 * the /legal/{cookies,terms,privacy} slug aliases).
 */
export function LegalPageLayout({ document }: Props) {
  const headings = extractHeadings(document.body);

  return (
    <article className="bg-gradient-to-b from-background to-muted/30">
      <PageHero
        eyebrow="Legal"
        title={document.title}
        description={`Version ${document.version} · effective ${new Date(document.effectiveAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}${document.requiresReconsent ? " · you'll be asked to re-consent on next sign-in" : ""}`}
        compact
      />

      <section className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <LegalToc headings={headings} />
          </aside>

          <div className="min-w-0">
            <LegalDocumentView body={document.body} />

            <Separator className="my-12" />

            <footer className="text-sm text-muted-foreground">
              <p>
                Questions?{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Get in touch
                </Link>
                .
              </p>
            </footer>
          </div>
        </div>
      </section>
    </article>
  );
}
