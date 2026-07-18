import type { Metadata } from "next";
import Link from "next/link";
import { fetchServices } from "@/lib/api/services";
import {
  CATEGORY_LABELS,
  type ServiceCategory,
  type ServiceSummary,
} from "@/types/service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/ui/empty-state";
import { ServicesFallback } from "./_components/services-fallback";

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

export default async function ServicesPage() {
  const result = await fetchServices();

  if (!result.ok) {
    return (
      <ServicesFallback
        status={result.status}
        message={result.error.error.message}
      />
    );
  }

  const grouped = result.data.services.reduce<Record<ServiceCategory, ServiceSummary[]>>(
    (acc, svc) => {
      (acc[svc.category] ??= []).push(svc);
      return acc;
    },
    { design: [], build: [], operate: [] },
  );

  if (result.data.services.length === 0) {
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
      <header className="border-b bg-gradient-to-b from-background to-muted/40">
        <div className="container mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <p className="text-sm font-medium text-muted-foreground">Services</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            Capabilities that move your business forward
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Design, build, and operate — pick one capability or combine them as
            an end-to-end engagement.
          </p>
          <Link
            href="/request-quote"
            className={cn(buttonVariants({ size: "lg" }), "mt-8")}
          >
            Request a quote
          </Link>
        </div>
      </header>

      {CATEGORY_ORDER.map((cat) => {
        const items = grouped[cat];
        if (!items || items.length === 0) return null;
        return (
          <section
            key={cat}
            id={cat}
            className="border-b last:border-b-0"
            aria-labelledby={`services-${cat}`}
          >
            <div className="container mx-auto max-w-6xl px-4 py-12 sm:py-16">
              <h2
                id={`services-${cat}`}
                className="text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                {CATEGORY_LABELS[cat]}
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((s) => (
                  <Card key={s.slug}>
                    <CardHeader>
                      <CardTitle className="text-lg">{s.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{s.summary}</p>
                      {s.startingPriceText ? (
                        <p className="text-sm font-medium">{s.startingPriceText}</p>
                      ) : null}
                      <Link
                        href={`/services/${s.slug}`}
                        className="inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
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