import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { PageContainer } from "@/components/shared/layout/page-container";
import { FadeIn } from "@/components/shared/motion";
import { cn } from "@/lib/utils";

interface Props {
  headline: string;
  subheadline?: string;
  ctaLabel: string;
  ctaHref: string;
}

export function ConversionBand({ headline, subheadline, ctaLabel, ctaHref }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-blue-600 text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_0%,rgba(255,255,255,.2),transparent_30%),radial-gradient(circle_at_90%_110%,rgba(8,47,73,.4),transparent_40%)]" />
      <div className="absolute inset-0 -z-10 opacity-10 [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:48px_48px]" />
      <PageContainer
        size="5xl"
        className="flex flex-col items-start justify-between gap-10 py-20 sm:py-24 md:flex-row md:items-center"
      >
        <FadeIn trigger="mount" y={20} duration={0.6} className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-100">
            <CalendarDays className="size-4" aria-hidden="true" /> Your next build starts here
          </div>
          <h2 className="mt-5 text-balance text-4xl font-bold tracking-[-0.04em] sm:text-5xl">{headline}</h2>
          {subheadline ? <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">{subheadline}</p> : null}
        </FadeIn>
        <FadeIn trigger="mount" delay={0.15} y={20} duration={0.6}>
          <Link
            href={ctaHref}
            className={cn(
              buttonVariants({ size: "lg" }),
              "group h-13 shrink-0 rounded-full bg-white px-7 text-blue-700 shadow-xl shadow-blue-950/20 hover:bg-blue-50",
            )}
          >
            {ctaLabel}
            <ArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </FadeIn>
      </PageContainer>
    </section>
  );
}
