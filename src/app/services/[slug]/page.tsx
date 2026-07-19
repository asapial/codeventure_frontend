import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  servicesBySlug,
  servicesList,
} from "@/content/services";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return servicesList.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const svc = servicesBySlug[slug];
  if (!svc) {
    return { title: "Service not found", robots: { index: false, follow: false } };
  }
  return {
    title: `${svc.name} — CodeVenture services`,
    description: svc.summary,
    alternates: { canonical: `/services/${svc.slug}` },
    openGraph: {
      title: `${svc.name} — CodeVenture`,
      description: svc.summary,
      url: `/services/${svc.slug}`,
      type: "website",
      ...(svc.heroImageUrl ? { images: [{ url: svc.heroImageUrl }] } : {}),
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const svc = servicesBySlug[slug];

  if (!svc) notFound();

  return (
    <>
      <header className="border-b bg-gradient-to-b from-background to-muted/40">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <Link
            href="/services"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            ← All services
          </Link>
          <Badge variant="secondary" className="mt-4">
            {svc.category}
          </Badge>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            {svc.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {svc.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/request-quote?hint=${encodeURIComponent(svc.name)}`}
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Request a quote
            </Link>
            <Link
              href="/portfolio"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
            >
              See related work
            </Link>
          </div>
        </div>
      </header>

      <section className="border-b">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Overview
          </h2>
          <p className="mt-4 whitespace-pre-line text-muted-foreground">
            {svc.description}
          </p>
        </div>
      </section>

      {svc.deliverables.length > 0 ? (
        <section className="border-b">
          <div className="container mx-auto max-w-4xl px-4 py-12">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              What you get
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {svc.deliverables.map((d) => (
                <li
                  key={d.title}
                  className="rounded-lg border border-border bg-card p-4"
                >
                  <p className="font-semibold">{d.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {d.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {svc.pricingTiers.length > 0 ? (
        <section className="border-b">
          <div className="container mx-auto max-w-6xl px-4 py-12">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Pricing
            </h2>
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              {svc.pricingTiers.map((t) => (
                <Card
                  key={t.name}
                  className={cn(t.highlighted && "border-primary ring-2 ring-primary")}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{t.name}</CardTitle>
                    <p className="text-2xl font-semibold">{t.priceText}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {t.description}
                    </p>
                    <Separator />
                    <ul className="space-y-2 text-sm">
                      {t.features.map((f) => (
                        <li key={f} className="flex gap-2">
                          <span aria-hidden="true">✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {svc.faqs.length > 0 ? (
        <section className="border-b">
          <div className="container mx-auto max-w-3xl px-4 py-12">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Frequently asked questions
            </h2>
            <dl className="mt-6 space-y-6">
              {svc.faqs.map((f) => (
                <div key={f.question}>
                  <dt className="font-semibold">{f.question}</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">
                    {f.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      {svc.relatedCaseStudies.length > 0 ? (
        <section className="border-b">
          <div className="container mx-auto max-w-6xl px-4 py-12">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Related work
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {svc.relatedCaseStudies.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/portfolio/${c.slug}`}
                    className="block rounded-lg border border-border p-4 hover:border-primary"
                  >
                    {c.industry ? (
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        {c.industry}
                      </p>
                    ) : null}
                    <p className="mt-1 font-semibold">{c.title}</p>
                    {c.summary ? (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {c.summary}
                      </p>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="bg-foreground text-background">
        <div className="container mx-auto max-w-3xl px-4 py-12 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Ready to start with {svc.name}?
          </h2>
          <Link
            href={`/request-quote?hint=${encodeURIComponent(svc.name)}`}
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-6 bg-background text-foreground hover:bg-background/90",
            )}
          >
            Request a quote
          </Link>
        </div>
      </section>
    </>
  );
}