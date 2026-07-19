import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { aboutPage } from "@/content/about-page";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PageHero } from "@/components/shared/page-hero";
import { PageContainer } from "@/components/shared/layout/page-container";
import { FadeIn, ScrollReveal, Stagger } from "@/components/shared/motion";

export const metadata: Metadata = {
  title: "About CodeVenture",
  description:
    "CodeVenture designs, builds, and operates websites, eCommerce, and SEO programs for growing businesses.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — CodeVenture",
    description:
      "Our story, values, and the team behind CodeVenture.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  const about = aboutPage;

  return (
    <>
      <PageHero eyebrow="About CodeVenture" title={about.headline} description={about.intro} />

      {about.mission ? (
        <section className="border-b">
          <PageContainer size="5xl" className="py-16 sm:py-20">
            <FadeIn trigger="mount">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Our mission
                </h2>
              </div>
              <p className="mt-4 whitespace-pre-line text-muted-foreground">
                {about.mission}
              </p>
            </FadeIn>
          </PageContainer>
        </section>
      ) : null}

      {about.values.length > 0 ? (
        <section className="border-b">
          <PageContainer size="5xl" className="py-12">
            <ScrollReveal>
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  What we value
                </h2>
              </div>
            </ScrollReveal>
            <Stagger className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
              {about.values.map((v) => (
                <div
                  key={v.title}
                className="rounded-2xl border border-blue-100 bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-blue-950"
                >
                  <p className="font-semibold">{v.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {v.description}
                  </p>
                </div>
              ))}
            </Stagger>
          </PageContainer>
        </section>
      ) : null}

      {about.milestones.length > 0 ? (
        <section className="border-b">
          <PageContainer size="5xl" className="py-12">
            <ScrollReveal>
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Our journey
                </h2>
              </div>
            </ScrollReveal>
            <Stagger className="mt-8 space-y-6" stagger={0.06}>
              {about.milestones.map((m) => (
                <div key={`${m.year}-${m.title}`} className="flex gap-4">
                  <span className="w-16 shrink-0 text-lg font-semibold text-primary">
                    {m.year}
                  </span>
                  <div>
                    <p className="font-semibold">{m.title}</p>
                    {m.description ? (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {m.description}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </Stagger>
          </PageContainer>
        </section>
      ) : null}

      {about.team.length > 0 ? (
        <section className="border-b">
          <PageContainer size="5xl" className="py-12">
            <ScrollReveal>
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  The team
                </h2>
              </div>
            </ScrollReveal>
            <Stagger className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
              {about.team.map((member) => (
                <Card key={member.name}>
                  {member.photoUrl ? (
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-lg">
                      <Image
                        src={member.photoUrl}
                        alt={member.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                  <CardHeader>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {member.role}
                    </p>
                  </CardHeader>
                  {member.bio ? (
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {member.bio}
                      </p>
                    </CardContent>
                  ) : null}
                </Card>
              ))}
            </Stagger>
          </PageContainer>
        </section>
      ) : null}

      {about.certifications.length > 0 ? (
        <section className="border-b">
          <PageContainer size="5xl" className="py-12">
            <ScrollReveal>
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Certifications
                </h2>
              </div>
            </ScrollReveal>
            <Stagger className="mt-6 divide-y divide-border rounded-lg border border-border" stagger={0.05}>
              {about.certifications.map((c) => (
                <div
                  key={`${c.name}-${c.issuer}`}
                  className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
                >
                  <div>
                    <p className="font-medium">{c.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {c.issuer}
                      {c.year ? ` · ${c.year}` : ""}
                    </p>
                  </div>
                  {c.url ? (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary underline-offset-4 hover:underline"
                    >
                      View →
                    </a>
                  ) : null}
                </div>
              ))}
            </Stagger>
          </PageContainer>
        </section>
      ) : null}

      <Separator />

      <section className="bg-foreground text-background">
        <PageContainer size="5xl" className="py-16">
          <FadeIn trigger="mount" className="flex flex-col items-start justify-between gap-6 text-center sm:flex-row sm:items-center sm:text-left">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold sm:text-3xl">
                Let&rsquo;s work together
              </h2>
              <p className="mt-3 text-background/80">
                Tell us about your project and we will reply within two business
                days.
              </p>
            </div>
            <Link
              href="/request-quote"
              className={cn(
                buttonVariants({ size: "lg" }),
                "shrink-0 bg-background text-foreground hover:bg-background/90",
              )}
            >
              Request a quote
            </Link>
          </FadeIn>
        </PageContainer>
      </section>
    </>
  );
}
