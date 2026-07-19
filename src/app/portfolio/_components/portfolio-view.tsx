"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import type { CaseStudySummary } from "@/types/portfolio";

interface Props {
  cases: CaseStudySummary[];
  industries: string[];
  services: string[];
  initialFilters: { industry: string; service: string; q: string };
}

export function PortfolioView({
  cases,
  industries,
  services,
  initialFilters,
}: Props) {
  const router = useRouter();
  const [industry, setIndustry] = useState(initialFilters.industry);
  const [service, setService] = useState(initialFilters.service);
  const [q, setQ] = useState(initialFilters.q);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return cases.filter((c) => {
      if (industry && c.industry !== industry) return false;
      if (service && !(c.serviceSlugs ?? []).includes(service)) return false;
      if (needle) {
        const haystack = `${c.title} ${c.summary ?? ""} ${c.industry ?? ""}`.toLowerCase();
        if (!haystack.includes(needle)) return false;
      }
      return true;
    });
  }, [cases, industry, service, q]);

  function syncUrl(next: { industry?: string; service?: string; q?: string }) {
    const params = new URLSearchParams();
    const ind = next.industry ?? industry;
    const svc = next.service ?? service;
    const query = next.q ?? q;
    if (ind) params.set("industry", ind);
    if (svc) params.set("service", svc);
    if (query) params.set("q", query);
    const qs = params.toString();
    router.replace(qs ? `/portfolio?${qs}` : "/portfolio", { scroll: false });
  }

  return (
    <>
      <header className="border-b bg-gradient-to-b from-background to-muted/40">
        <div className="container mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <p className="text-sm font-medium text-muted-foreground">Portfolio</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            Selected work
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Recent engagements and the outcomes they delivered for our clients.
          </p>
        </div>
      </header>

      <section className="border-b">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <form
            role="search"
            aria-label="Filter case studies"
            className="grid gap-4 sm:grid-cols-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid gap-2">
              <label htmlFor="pf-q" className="text-sm font-medium">
                Search
              </label>
              <Input
                id="pf-q"
                type="search"
                placeholder="Search title, summary, industry…"
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  syncUrl({ q: e.target.value });
                }}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="pf-industry" className="text-sm font-medium">
                Industry
              </label>
              <select
                id="pf-industry"
                value={industry}
                onChange={(e) => {
                  setIndustry(e.target.value);
                  syncUrl({ industry: e.target.value });
                }}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="">All industries</option>
                {industries.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="pf-service" className="text-sm font-medium">
                Service
              </label>
              <select
                id="pf-service"
                value={service}
                onChange={(e) => {
                  setService(e.target.value);
                  syncUrl({ service: e.target.value });
                }}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="">All services</option>
                {services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </form>
          <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
            {filtered.length} of {cases.length} case studies
          </p>
        </div>
      </section>

      <section className="border-b">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          {filtered.length === 0 ? (
            <EmptyState
              title="No matching case studies"
              description="Try clearing the filters or refining your search."
              action={{ label: "Clear filters", href: "/portfolio" }}
            />
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((c) => (
                <li key={c.slug}>
                  <Card className="h-full">
                    {c.thumbnailUrl ? (
                      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-lg">
                        <Image
                          src={c.thumbnailUrl}
                          alt={c.thumbnailAlt ?? c.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    ) : null}
                    <CardHeader>
                      {c.industry ? (
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                          {c.industry}
                        </p>
                      ) : null}
                      <CardTitle className="text-lg">{c.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {c.summary ? (
                        <p className="text-sm text-muted-foreground">
                          {c.summary}
                        </p>
                      ) : null}
                      <Link
                        href={`/portfolio/${c.slug}`}
                        className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                      >
                        Read case study →
                      </Link>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}