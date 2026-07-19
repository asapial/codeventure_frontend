"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import type { CaseStudySummary } from "@/types/portfolio";
import { PageHero } from "@/components/shared/page-hero";

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
      <PageHero eyebrow="Selected work" title="Products designed to make a difference" description="Explore how thoughtful strategy, polished experience design, and robust engineering come together." />

      <section className="border-b border-blue-100 bg-blue-50/40 dark:border-blue-950 dark:bg-blue-950/10">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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
                className="flex h-11 w-full rounded-xl border border-blue-100 bg-background/80 px-3.5 text-sm shadow-sm outline-none transition-all hover:border-blue-200 focus:border-blue-300 focus:ring-4 focus:ring-blue-500/10 dark:border-blue-950"
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
                className="flex h-11 w-full rounded-xl border border-blue-100 bg-background/80 px-3.5 text-sm shadow-sm outline-none transition-all hover:border-blue-200 focus:border-blue-300 focus:ring-4 focus:ring-blue-500/10 dark:border-blue-950"
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
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
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
                  <Card className="group h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:hover:border-blue-800">
                    {c.thumbnailUrl ? (
                      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-lg">
                        <Image
                          src={c.thumbnailUrl}
                          alt={c.thumbnailAlt ?? c.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                        className="text-sm font-semibold text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
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
