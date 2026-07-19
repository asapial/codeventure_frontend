import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { fetchAboutPage } from "@/lib/api/about";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AboutFallback } from "./_components/about-fallback";

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

export default async function AboutPage() {
  const result = await fetchAboutPage();

  if (!result.ok) {
    return (
      <AboutFallback
        status={result.status}
        message={result.error.error.message}
      />
    );
  }

  const about = result.data;

  return (
    <>
      <header className="border-b bg-gradient-to-b from-background to-muted/40">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-24">
          <p className="text-sm font-medium text-muted-foreground">About</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            {about.headline}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {about.intro}
          </p>
        </div>
      </header>

      {about.mission ? (
        <section className="border-b">
          <div className="container mx-auto max-w-3xl px-4 py-12">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Our mission
            </h2>
            <p className="mt-4 whitespace-pre-line text-muted-foreground">
              {about.mission}
            </p>
          </div>
        </section>
      ) : null}

      {about.values.length > 0 ? (
        <section className="border-b">
          <div className="container mx-auto max-w-6xl px-4 py-12">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              What we value
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {about.values.map((v) => (
                <li
                  key={v.title}
                  className="rounded-lg border border-border bg-card p-5"
                >
                  <p className="font-semibold">{v.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {v.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {about.milestones.length > 0 ? (
        <section className="border-b">
          <div className="container mx-auto max-w-4xl px-4 py-12">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Our journey
            </h2>
            <ol className="mt-8 space-y-6">
              {about.milestones.map((m) => (
                <li key={`${m.year}-${m.title}`} className="flex gap-4">
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
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {about.team.length > 0 ? (
        <section className="border-b">
          <div className="container mx-auto max-w-6xl px-4 py-12">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              The team
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {about.team.map((member) => (
                <li key={member.name}>
                  <Card>
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
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {about.certifications.length > 0 ? (
        <section className="border-b">
          <div className="container mx-auto max-w-4xl px-4 py-12">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Certifications
            </h2>
            <ul className="mt-6 divide-y divide-border rounded-lg border border-border">
              {about.certifications.map((c) => (
                <li
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
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <Separator />

      <section className="bg-foreground text-background">
        <div className="container mx-auto max-w-3xl px-4 py-16 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Let&rsquo;s work together
          </h2>
          <p className="mt-3 text-background/80">
            Tell us about your project and we will reply within two business
            days.
          </p>
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
    </>
  );
}