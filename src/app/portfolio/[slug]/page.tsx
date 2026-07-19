import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  caseStudiesBySlug,
  portfolioList,
} from "@/content/portfolio";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return portfolioList.cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudiesBySlug[slug];
  if (!cs) {
    return { title: "Case study not found", robots: { index: false, follow: false } };
  }
  return {
    title: `${cs.title} — Case study`,
    description: cs.summary ?? cs.problem.slice(0, 160),
    alternates: { canonical: `/portfolio/${cs.slug}` },
    openGraph: {
      title: `${cs.title} — CodeVenture`,
      description: cs.summary ?? cs.problem.slice(0, 160),
      url: `/portfolio/${cs.slug}`,
      type: "article",
      ...(cs.heroImageUrl ? { images: [{ url: cs.heroImageUrl }] } : {}),
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const cs = caseStudiesBySlug[slug];

  if (!cs) notFound();

  return (
    <article>
      <header className="border-b bg-gradient-to-b from-background to-muted/40">
        <div className="container mx-auto max-w-4xl px-4 py-12 sm:py-16">
          <Link
            href="/portfolio"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            ← All case studies
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {cs.industry ? (
              <Badge variant="secondary">{cs.industry}</Badge>
            ) : null}
            {cs.clientName ? (
              <span className="text-sm text-muted-foreground">
                Client: {cs.clientName}
              </span>
            ) : null}
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            {cs.title}
          </h1>
          {cs.summary ? (
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              {cs.summary}
            </p>
          ) : null}
        </div>
        {cs.heroImageUrl ? (
          <div className="container mx-auto max-w-5xl px-4 pb-12">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
              <Image
                src={cs.heroImageUrl}
                alt={cs.heroImageAlt ?? cs.title}
                fill
                priority
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        ) : null}
      </header>

      {cs.metrics.length > 0 ? (
        <section className="border-b">
          <div className="container mx-auto max-w-6xl px-4 py-10">
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cs.metrics.map((m) => (
                <li
                  key={m.label}
                  className="rounded-lg border border-border bg-card p-5"
                >
                  <p className="text-3xl font-semibold tracking-tight">
                    {m.value}
                  </p>
                  <p className="mt-1 text-sm font-medium">{m.label}</p>
                  {m.context ? (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {m.context}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="border-b">
        <div className="container mx-auto max-w-3xl px-4 py-12 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Problem
            </h2>
            <p className="mt-3 whitespace-pre-line text-muted-foreground">
              {cs.problem}
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Approach
            </h2>
            <p className="mt-3 whitespace-pre-line text-muted-foreground">
              {cs.approach}
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Outcome
            </h2>
            <p className="mt-3 whitespace-pre-line text-muted-foreground">
              {cs.outcome}
            </p>
          </div>
        </div>
      </section>

      {cs.sections.length > 0 ? (
        <section className="border-b">
          <div className="container mx-auto max-w-4xl px-4 py-12 space-y-12">
            {cs.sections.map((s, idx) => (
              <div key={s.heading} className="grid gap-6 md:grid-cols-2">
                <div className={idx % 2 === 1 ? "md:order-2" : ""}>
                  <h3 className="text-xl font-semibold">{s.heading}</h3>
                  <p className="mt-2 text-muted-foreground">{s.body}</p>
                </div>
                {s.imageUrl ? (
                  <div
                    className={`relative aspect-[16/10] w-full overflow-hidden rounded-lg ${
                      idx % 2 === 1 ? "md:order-1" : ""
                    }`}
                  >
                    <Image
                      src={s.imageUrl}
                      alt={s.imageAlt ?? s.heading}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {cs.gallery.length > 0 ? (
        <section className="border-b">
          <div className="container mx-auto max-w-6xl px-4 py-12">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Gallery
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cs.gallery.map((g) => (
                <li
                  key={g.url}
                  className="relative aspect-square overflow-hidden rounded-lg"
                >
                  <Image
                    src={g.url}
                    alt={g.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {cs.testimonial ? (
        <section className="border-b">
          <div className="container mx-auto max-w-3xl px-4 py-12">
            <Card>
              <CardContent className="space-y-4 p-6">
                <blockquote className="text-lg leading-relaxed">
                  &ldquo;{cs.testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="text-sm">
                  <span className="font-semibold">
                    {cs.testimonial.authorName}
                  </span>
                  {cs.testimonial.authorRole ? (
                    <span className="text-muted-foreground">
                      {" "}— {cs.testimonial.authorRole}
                      {cs.testimonial.authorCompany
                        ? `, ${cs.testimonial.authorCompany}`
                        : ""}
                    </span>
                  ) : null}
                </figcaption>
              </CardContent>
            </Card>
          </div>
        </section>
      ) : null}

      <section className="bg-foreground text-background">
        <div className="container mx-auto max-w-3xl px-4 py-12 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Want outcomes like this?
          </h2>
          <Link
            href="/request-quote"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-6 bg-background text-foreground hover:bg-background/90",
            )}
          >
            Request a quote
          </Link>
        </div>
      </section>
    </article>
  );
}