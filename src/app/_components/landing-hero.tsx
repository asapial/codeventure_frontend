import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Check,
  Code2,
  Layers3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface Props {
  headline: string;
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export function LandingHero({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
}: Props) {
  return (
    <section className="hero-grid relative isolate overflow-hidden border-b">
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-blue-50/90 via-background to-background dark:from-blue-950/35" />
      <div className="hero-orb absolute -right-24 top-8 -z-10 size-[34rem] rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-500/15" />
      <div className="absolute -left-48 top-40 -z-10 size-96 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/80 px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-sm backdrop-blur dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Digital product studio for ambitious teams
          </div>
          <h1 className="mt-7 text-balance text-5xl font-bold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            {headline.split("digital products")[0]}
            <span className="premium-gradient-text">digital products</span>
            {headline.split("digital products")[1]}
          </h1>
          <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
            {subheadline}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href={primaryCta.href}
              className={cn(buttonVariants({ size: "lg" }), "group h-12 rounded-full px-6 shadow-xl shadow-blue-600/20")}
            >
              {primaryCta.label}
              <ArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href={secondaryCta.href}
              className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-12 rounded-full border-blue-200/80 bg-white/70 px-6 backdrop-blur hover:border-blue-300 dark:border-blue-900 dark:bg-blue-950/20")}
            >
              {secondaryCta.label}
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
            {["No layers of account management", "Weekly working releases", "Built to scale"].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:mx-0">
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-blue-500/20 via-cyan-400/5 to-transparent blur-2xl" />
          <div className="overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/80 shadow-2xl shadow-blue-950/15 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/75 dark:shadow-black/40">
            <div className="flex items-center justify-between border-b border-slate-200/70 px-5 py-4 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-red-400" />
                <span className="size-2.5 rounded-full bg-amber-400" />
                <span className="size-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold text-slate-500 dark:bg-white/5 dark:text-slate-400">PROJECT / LIVE</div>
            </div>
            <div className="grid gap-4 p-5 sm:p-6">
              <div className="rounded-2xl bg-gradient-to-br from-blue-600 via-blue-600 to-cyan-500 p-6 text-white shadow-lg shadow-blue-600/20">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">Launch velocity</p>
                    <p className="mt-3 text-3xl font-bold tracking-tight">From idea to impact.</p>
                  </div>
                  <Sparkles className="size-6 text-cyan-100" aria-hidden="true" />
                </div>
                <div className="mt-8 flex items-end gap-1.5" aria-hidden="true">
                  {[30, 46, 38, 62, 54, 78, 88, 100].map((height, index) => (
                    <span key={index} className="flex-1 rounded-t-sm bg-white/75" style={{ height: `${height * 0.55}px` }} />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Layers3, label: "Design", value: "Clear" },
                  { icon: Code2, label: "Build", value: "Robust" },
                  { icon: ShieldCheck, label: "Scale", value: "Secure" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-white/10 dark:bg-white/[0.03]">
                    <Icon className="size-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                    <p className="mt-5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
                    <p className="mt-0.5 text-sm font-bold">{value}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/80 px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex items-center gap-3">
                  <div className="grid size-8 place-items-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    <Check className="size-4" strokeWidth={3} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">Sprint milestone delivered</p>
                    <p className="text-[10px] text-muted-foreground">On scope · Ready for review</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">100%</span>
              </div>
            </div>
          </div>
          <div className="float-slow absolute -bottom-7 -left-5 hidden rounded-2xl border border-white/70 bg-white/90 p-4 shadow-xl shadow-blue-950/10 backdrop-blur sm:block dark:border-white/10 dark:bg-slate-900/90">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Partner mode</p>
            <p className="mt-1 text-sm font-bold">Think. Ship. Improve.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
