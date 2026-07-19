import type { z } from "zod";
import { outcomeMetricSchema, trustSignalSchema } from "@/types/home";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageContainer } from "@/components/shared/layout/page-container";
import { ScrollReveal, Stagger } from "@/components/shared/motion";

type Outcome = z.infer<typeof outcomeMetricSchema>;
type Signal = z.infer<typeof trustSignalSchema>;

export function ProofSection({ outcomes, signals }: { outcomes: Outcome[]; signals: Signal[] }) {
  return (
    <section className="border-b bg-background">
      <PageContainer size="5xl" className="py-14 sm:py-20">
        <Stagger
          className="grid overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/40 shadow-[0_24px_80px_-48px_rgba(30,64,175,.45)] dark:border-blue-950 dark:from-slate-950 dark:to-blue-950/20 lg:grid-cols-3"
          stagger={0.08}
        >
          {outcomes.map((metric) => (
            <Card
              key={metric.label}
              className="rounded-none border-0 border-b border-blue-100 bg-transparent shadow-none last:border-b-0 dark:border-blue-950 lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <CardContent className="p-7 sm:p-8">
                <p className="text-3xl font-bold tracking-[-0.035em] text-blue-600 dark:text-blue-400">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm font-semibold text-foreground">{metric.label}</p>
                {metric.description ? (
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{metric.description}</p>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </Stagger>

        {signals.length > 0 ? (
          <ScrollReveal delay={0.1} className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <span className="mr-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Built with
            </span>
            {signals.map((signal) => (
              <Badge
                key={signal.label}
                variant="outline"
                className="rounded-full border-blue-100 bg-blue-50/60 px-3.5 py-1.5 text-blue-950 dark:border-blue-950 dark:bg-blue-950/30 dark:text-blue-100"
              >
                <span className="font-bold">{signal.value}</span>
                <span className="ml-1.5 text-blue-700/70 dark:text-blue-300/70">{signal.label}</span>
              </Badge>
            ))}
          </ScrollReveal>
        ) : null}
      </PageContainer>
    </section>
  );
}
