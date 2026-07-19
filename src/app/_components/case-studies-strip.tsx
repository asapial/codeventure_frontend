import Link from "next/link";
import Image from "next/image";
import type { z } from "zod";
import type { caseStudySummarySchema } from "@/types/home";
import { PageContainer } from "@/components/shared/layout/page-container";
import { ScrollReveal, Stagger } from "@/components/shared/motion";
import { ArrowUpRight, BarChart3, HeartPulse, ShoppingBag } from "lucide-react";

type Study = z.infer<typeof caseStudySummarySchema>;

const projectVisuals = [
  { icon: BarChart3, accent: "from-blue-700 via-blue-600 to-cyan-500", bars: [36, 52, 44, 68, 58, 84, 74, 96] },
  { icon: ShoppingBag, accent: "from-indigo-700 via-blue-600 to-sky-400", bars: [42, 60, 54, 72, 66, 78, 90, 100] },
  { icon: HeartPulse, accent: "from-sky-700 via-blue-600 to-indigo-500", bars: [30, 44, 62, 52, 70, 82, 76, 96] },
];

export function CaseStudiesStrip({ studies }: { studies: Study[] }) {
  if (studies.length === 0) return null;

  return (
    <section className="border-b bg-blue-50/45 dark:bg-blue-950/10" id="work">
      <PageContainer size="5xl" className="py-20 sm:py-28">
        <ScrollReveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl flex-1">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
              Capabilities in action
            </p>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-[-0.035em] sm:text-5xl">
              Product thinking you can see.
            </h2>
            <p className="mt-5 text-pretty text-lg leading-8 text-muted-foreground">
              A look at how we approach complex workflows, high-stakes experiences, and products built for growth.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="group inline-flex w-fit items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400"
          >
            View all work{" "}
            <ArrowUpRight
              className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </ScrollReveal>

        <Stagger className="mt-12 grid gap-5 lg:grid-cols-3" stagger={0.08}>
          {studies.map((study, index) => {
            const visual = projectVisuals[index % projectVisuals.length];
            const Icon = visual.icon;
            return (
              <article
                key={study.slug}
                className="group overflow-hidden rounded-[1.5rem] border border-blue-100 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_-38px_rgba(30,64,175,.5)] dark:border-blue-950"
              >
                {study.thumbnailUrl ? (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={study.thumbnailUrl}
                      alt={study.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${visual.accent} p-5 text-white`}>
                    <div className="absolute -right-12 -top-16 size-48 rounded-full border-[24px] border-white/10" />
                    <div className="relative h-full rounded-xl border border-white/20 bg-slate-950/20 p-4 shadow-2xl backdrop-blur-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1.5">
                          <span className="size-1.5 rounded-full bg-white/70" />
                          <span className="size-1.5 rounded-full bg-white/40" />
                          <span className="size-1.5 rounded-full bg-white/40" />
                        </div>
                        <Icon className="size-4 text-white/80" aria-hidden="true" />
                      </div>
                      <div className="mt-6 h-2 w-24 rounded-full bg-white/80" />
                      <div className="mt-2 h-1.5 w-36 rounded-full bg-white/25" />
                      <div className="absolute inset-x-4 bottom-4 flex h-24 items-end gap-1.5" aria-hidden="true">
                        {visual.bars.map((height, barIndex) => (
                          <span
                            key={barIndex}
                            className="flex-1 rounded-t-sm bg-white/65"
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
                    {study.industry}
                  </p>
                  <h3 className="mt-3 text-xl font-bold leading-snug tracking-tight">{study.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{study.summary}</p>
                  {study.outcome ? (
                    <p className="mt-5 border-t border-border/70 pt-4 text-xs font-semibold leading-5 text-foreground">
                      {study.outcome}
                    </p>
                  ) : null}
                </div>
              </article>
            );
          })}
        </Stagger>
      </PageContainer>
    </section>
  );
}
