import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  cta?: { label: string; href: string };
  compact?: boolean;
}

export function PageHero({ eyebrow, title, description, cta, compact = false }: PageHeroProps) {
  return (
    <header className="hero-grid relative isolate overflow-hidden border-b border-blue-100 dark:border-blue-950">
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-blue-50/90 via-background to-background dark:from-blue-950/35" />
      <div className="absolute -right-28 -top-40 -z-10 size-[34rem] rounded-full bg-blue-500/15 blur-3xl" />
      <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", compact ? "py-14 sm:py-18" : "py-16 sm:py-24")}>
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            <Sparkles className="size-3.5" aria-hidden="true" /> {eyebrow}
          </p>
          <h1 className="mt-5 text-balance text-4xl font-bold tracking-[-0.04em] sm:text-6xl">{title}</h1>
          {description ? <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">{description}</p> : null}
          {cta ? (
            <Link href={cta.href} className={cn(buttonVariants({ size: "lg" }), "group mt-8 rounded-full px-6 shadow-xl shadow-blue-600/20")}>
              {cta.label}<ArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
