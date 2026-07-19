import Link from "next/link";
import type { z } from "zod";
import type { serviceSummarySchema } from "@/types/home";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageContainer } from "@/components/shared/layout/page-container";
import { ScrollReveal, Stagger } from "@/components/shared/motion";
import { ArrowUpRight, Bot, CloudCog, CodeXml, Palette, ShoppingBag, TrendingUp } from "lucide-react";

type Service = z.infer<typeof serviceSummarySchema>;

const serviceIcons = {
  "web-development": CodeXml,
  ecommerce: ShoppingBag,
  "seo-growth": Bot,
  "product-design": Palette,
  "cloud-devops": CloudCog,
  "growth-optimization": TrendingUp,
};

export function ServicesStrip({ services }: { services: Service[] }) {
  if (services.length === 0) return null;

  return (
    <section className="border-b" id="services">
      <PageContainer size="5xl" className="py-20 sm:py-28">
        <ScrollReveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
            What we do
          </p>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-[-0.035em] sm:text-5xl">
            One team for the whole product journey.
          </h2>
          <p className="mt-5 text-pretty text-lg leading-8 text-muted-foreground">
            The strategic thinking, design craft, and engineering depth to take your product from an
            open question to a confident launch.
          </p>
        </ScrollReveal>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {services.map((service, index) => {
            const Icon = serviceIcons[service.slug as keyof typeof serviceIcons] ?? CodeXml;
            return (
              <Card
                key={service.slug}
                className="group relative h-full overflow-hidden rounded-2xl border-blue-100/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_24px_70px_-32px_rgba(37,99,235,.45)] dark:border-blue-950 dark:hover:border-blue-800"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <CardHeader className="pb-4">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950/60 dark:text-blue-400 dark:ring-blue-900">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">0{index + 1}</span>
                  </div>
                  <CardTitle className="text-xl tracking-tight">{service.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <p className="text-sm leading-6 text-muted-foreground">{service.summary}</p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Explore service{" "}
                    <ArrowUpRight
                      className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </Stagger>
      </PageContainer>
    </section>
  );
}
