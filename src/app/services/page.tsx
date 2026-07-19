import type { Metadata } from "next";
import Link from "next/link";
import { servicesList } from "@/content/services";
import {
  CATEGORY_LABELS,
  type ServiceCategory,
  type ServiceSummary,
} from "@/types/service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHero } from "@/components/shared/page-hero";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web, eCommerce, and SEO capabilities — designed, built, and operated by CodeVenture.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — CodeVenture",
    description: "Design, build, and operate your next web project.",
    url: "/services",
    type: "website",
  },
};

const CATEGORY_ORDER: ServiceCategory[] = ["design", "build", "operate"];

export default function ServicesPage() {
  const grouped = servicesList.services.reduce<Record<ServiceCategory, ServiceSummary[]>>(
    (acc, svc) => {
      (acc[svc.category] ??= []).push(svc);
      return acc;
    },
    { design: [], build: [], operate: [] },
  );

  if (servicesList.services.length === 0) {
    return (
      <div className="container mx-auto max-w-xl px-4 py-24">
        <EmptyState
          title="Services coming soon"
          description="We are updating our catalogue. Please check back shortly."
          action={{ label: "Request a quote", href: "/request-quote" }}
        />
      </div>
    );
  }

  return (
    <>
      <PageHero eyebrow="Services" title="Capabilities that move your business forward" description="Strategy, design, engineering, and growth expertise — combined around the outcome your product needs." cta={{ label: "Start a project", href: "/request-quote" }} />

      {CATEGORY_ORDER.map((cat) => {
        const items = grouped[cat];
        if (!items || items.length === 0) return null;
        return (
          <section
            key={cat}
            id={cat}
            className="border-b border-blue-100/70 last:border-b-0 dark:border-blue-950/70"
            aria-labelledby={`services-${cat}`}
          >
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
              <h2
                id={`services-${cat}`}
                className="text-2xl font-bold tracking-[-0.03em] sm:text-4xl"
              >
                {CATEGORY_LABELS[cat]}
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((s) => (
                  <Card key={s.slug} className="group transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:hover:border-blue-800">
                    <CardHeader>
                      <CardTitle className="text-lg">{s.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm leading-6 text-muted-foreground">{s.summary}</p>
                      {s.startingPriceText ? (
                        <p className="text-sm font-medium">{s.startingPriceText}</p>
                      ) : null}
                      <Link
                        href={`/services/${s.slug}`}
                        className="inline-flex text-sm font-semibold text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
                      >
                        Learn more →
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
