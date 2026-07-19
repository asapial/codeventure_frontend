import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Bot,
  Boxes,
  ChevronDown,
  CloudCog,
  Code2,
  Compass,
  Hammer,
  Layers,
  Palette,
  Rocket,
  RotateCw,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Wrench,
} from "lucide-react";
import {
  servicesBySlug,
  servicesList,
} from "@/content/services";
import {
  CATEGORY_LABELS,
  type ServiceCategory,
} from "@/types/service";
import { buttonVariants } from "@/components/ui/button";
import { PageContainer } from "@/components/shared/layout/page-container";
import { FadeIn, ScrollReveal, Stagger } from "@/components/shared/motion";
import { cn } from "@/lib/utils";

type Params = { slug: string };

const ICONS: Record<string, LucideIcon> = {
  "code-xml": Code2,
  "shopping-bag": ShoppingBag,
  palette: Palette,
  bot: Bot,
  "cloud-cog": CloudCog,
  "trending-up": TrendingUp,
};

const TIER_ICONS: LucideIcon[] = [Rocket, Layers, RotateCw];

const PROCESS_STEPS: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Discover",
    description:
      "We start with a working session to understand the product, the constraints, and the outcome that actually matters.",
    icon: Compass,
  },
  {
    title: "Design",
    description:
      "Tight IA, interaction flows, and visual systems that hold up once real engineers start building.",
    icon: Palette,
  },
  {
    title: "Build",
    description:
      "Senior engineering shipping in weekly increments, with quality gates your team can actually trust.",
    icon: Hammer,
  },
  {
    title: "Launch",
    description:
      "Hardening, observability, and the stabilisation window that gets a product safely to production.",
    icon: Rocket,
  },
  {
    title: "Operate",
    description:
      "A retainer that compounds — experiments, reliability work, and roadmap ownership.",
    icon: Wrench,
  },
];

const SECTION_NAV: Array<{ id: string; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "deliverables", label: "Deliverables" },
  { id: "pricing", label: "Pricing" },
  { id: "process", label: "Process" },
  { id: "faqs", label: "FAQs" },
  { id: "related", label: "Related" },
];

function Icon({
  iconKey,
  className,
}: {
  iconKey?: string | null;
  className?: string;
}) {
  const Icon = (iconKey && ICONS[iconKey]) || Sparkles;
  return <Icon className={className} aria-hidden="true" />;
}

function SectionHeading({
  eyebrow,
  title,
  description,
  id,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="mt-3 text-balance text-2xl font-bold tracking-[-0.03em] sm:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-pretty text-base text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function generateStaticParams(): Params[] {
  return servicesList.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const svc = servicesBySlug[slug];
  if (!svc) {
    return { title: "Service not found", robots: { index: false, follow: false } };
  }
  return {
    title: `${svc.name} — CodeVenture services`,
    description: svc.summary,
    alternates: { canonical: `/services/${svc.slug}` },
    openGraph: {
      title: `${svc.name} — CodeVenture`,
      description: svc.summary,
      url: `/services/${svc.slug}`,
      type: "website",
      ...(svc.heroImageUrl ? { images: [{ url: svc.heroImageUrl }] } : {}),
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const svc = servicesBySlug[slug];

  if (!svc) notFound();

  const category = svc.category as ServiceCategory;
  const relatedServices = servicesList.services.filter((s) => s.slug !== svc.slug);
  const hintParam = encodeURIComponent(svc.name);
  const deliverablesCount = svc.deliverables.length;
  const faqCount = svc.faqs.length;
  const tierCount = svc.pricingTiers.length;

  return (
    <div className="bg-gradient-to-b from-background to-blue-50/30 dark:to-blue-950/10">
      {/* ─────────────────────────── HERO ─────────────────────────── */}
      <header className="hero-grid relative isolate overflow-hidden border-b border-blue-100 dark:border-blue-950">
        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-blue-50/90 via-background to-background dark:from-blue-950/35" />
        <div className="absolute -right-28 -top-40 -z-10 size-[34rem] rounded-full bg-blue-500/15 blur-3xl" aria-hidden="true" />
        <PageContainer size="5xl" className="py-14 sm:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/services" className="underline-offset-4 hover:underline">
                  All services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-foreground">{svc.name}</li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-3 rounded-full border border-blue-100 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 backdrop-blur dark:border-blue-950 dark:bg-blue-950/30 dark:text-blue-300">
                <Icon iconKey={svc.iconKey} className="size-3.5" aria-hidden="true" />
                <span>{CATEGORY_LABELS[category]}</span>
              </div>

              <h1 className="mt-5 text-balance text-4xl font-bold tracking-[-0.04em] sm:text-6xl">
                {svc.name}
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
                {svc.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/request-quote?hint=${hintParam}`}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "group rounded-full px-6 shadow-xl shadow-blue-600/20",
                  )}
                >
                  Request a quote
                  <ArrowRight
                    className="transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href="/portfolio"
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "rounded-full px-6",
                  )}
                >
                  See related work
                </Link>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <dl className="grid gap-4 rounded-2xl border border-blue-100 bg-card/80 p-5 shadow-[0_18px_50px_-32px_rgba(30,64,175,.45)] backdrop-blur sm:grid-cols-3 sm:p-6 dark:border-blue-950">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Category
                  </dt>
                  <dd className="mt-2 text-lg font-semibold">
                    {CATEGORY_LABELS[category]}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Starting at
                  </dt>
                  <dd className="mt-2 text-lg font-semibold">
                    {svc.startingPriceText ?? "Custom"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Engagement
                  </dt>
                  <dd className="mt-2 text-lg font-semibold">
                    {tierCount > 0 ? `${tierCount} tier${tierCount > 1 ? "s" : ""}` : "Bespoke"}
                  </dd>
                </div>
                <div className="sm:col-span-3">
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    At a glance
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-2 text-sm">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                      <Boxes className="size-3.5" aria-hidden="true" />
                      {deliverablesCount} deliverables
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                      <Sparkles className="size-3.5" aria-hidden="true" />
                      {faqCount} FAQs answered
                    </span>
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </PageContainer>
      </header>

      {/* ──────────────────────── STICKY IN-PAGE NAV ──────────────────────── */}
      {(() => {
        const visibleSections = SECTION_NAV.filter((s) => {
          if (s.id === "pricing") return svc.pricingTiers.length > 0;
          if (s.id === "faqs") return svc.faqs.length > 0;
          if (s.id === "deliverables") return svc.deliverables.length > 0;
          if (s.id === "related") return relatedServices.length > 0;
          return true;
        });
        if (visibleSections.length === 0) return null;
        return (
          <nav
            aria-label="Service sections"
            className="sticky top-16 z-30 border-b border-blue-100 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-blue-950"
          >
            <PageContainer size="5xl" className="overflow-x-auto py-3">
              <ul className="flex items-center gap-1 text-sm">
                {visibleSections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="inline-flex items-center rounded-full px-3 py-1.5 font-medium text-muted-foreground transition-colors hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 motion-reduce:transition-none dark:hover:bg-blue-950/50 dark:hover:text-blue-300"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </PageContainer>
          </nav>
        );
      })()}

      {/* ─────────────────────────── OVERVIEW ─────────────────────────── */}
      <section
        id="overview"
        aria-labelledby="overview-heading"
        className="border-b border-blue-100/70 dark:border-blue-950/70"
      >
        <PageContainer size="5xl" className="py-14 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading
                id="overview-heading"
                eyebrow="Overview"
                title="What this service is"
              />
            </div>
            <div className="lg:col-span-8">
              <p className="whitespace-pre-line text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
                {svc.description}
              </p>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ───────────────────────── DELIVERABLES ───────────────────────── */}
      {svc.deliverables.length > 0 ? (
        <section
          id="deliverables"
          aria-labelledby="deliverables-heading"
          className="border-b border-blue-100/70 bg-blue-50/30 dark:border-blue-950/70 dark:bg-blue-950/10"
        >
          <PageContainer size="5xl" className="py-14 sm:py-20">
            <ScrollReveal>
              <SectionHeading
                id="deliverables-heading"
                eyebrow="What you get"
                title="Concrete deliverables, end to end"
                description="Everything you receive during the engagement — written down so there are no surprises."
              />
            </ScrollReveal>
            <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
              {svc.deliverables.map((d) => (
                <div
                  key={d.title}
                  className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-card p-6 shadow-[0_12px_36px_-28px_rgba(30,64,175,.45)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-blue-950 dark:hover:border-blue-800"
                >
                  <span
                    aria-hidden="true"
                    className="mb-5 inline-flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 ring-1 ring-blue-100 transition-colors group-hover:bg-blue-100 dark:bg-blue-950/50 dark:text-blue-300 dark:ring-blue-900"
                  >
                    <Sparkles className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {d.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {d.description}
                  </p>
                </div>
              ))}
            </Stagger>
          </PageContainer>
        </section>
      ) : null}

      {/* ──────────────────────────── PRICING ──────────────────────────── */}
      {svc.pricingTiers.length > 0 ? (
        <section
          id="pricing"
          aria-labelledby="pricing-heading"
          className="border-b border-blue-100/70 dark:border-blue-950/70"
        >
          <PageContainer size="5xl" className="py-14 sm:py-20">
            <ScrollReveal>
              <SectionHeading
                id="pricing-heading"
                eyebrow="Pricing"
                title="Engagement options"
                description="Pick the engagement shape that fits the moment. Each tier covers senior time, clear deliverables, and weekly working output."
              />
            </ScrollReveal>

            <Stagger className="mt-10 grid gap-6 lg:grid-cols-3" stagger={0.08}>
              {svc.pricingTiers.map((t, idx) => {
                const TierIcon = TIER_ICONS[idx % TIER_ICONS.length] ?? Layers;
                return (
                  <article
                    key={t.name}
                    className={cn(
                      "relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-6 shadow-[0_18px_50px_-32px_rgba(30,64,175,.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                      t.highlighted
                        ? "border-blue-500 ring-2 ring-blue-500/60 dark:border-blue-400"
                        : "border-blue-100 hover:border-blue-300 dark:border-blue-950 dark:hover:border-blue-800",
                    )}
                  >
                    {t.highlighted ? (
                      <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-sm">
                        <Sparkles className="size-3" aria-hidden="true" />
                        Most chosen
                      </span>
                    ) : null}

                    <div
                      aria-hidden="true"
                      className={cn(
                        "inline-flex size-11 items-center justify-center rounded-xl ring-1",
                        t.highlighted
                          ? "bg-blue-600 text-white ring-blue-600"
                          : "bg-blue-50 text-blue-700 ring-blue-100 dark:bg-blue-950/50 dark:text-blue-300 dark:ring-blue-900",
                      )}
                    >
                      <TierIcon className="size-5" aria-hidden="true" />
                    </div>

                    <h3 className="mt-5 text-xl font-bold tracking-tight">
                      {t.name}
                    </h3>
                    <p className="mt-1 text-2xl font-semibold tracking-tight">
                      {t.priceText}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {t.description}
                    </p>

                    <ul className="mt-6 space-y-3 text-sm">
                      {t.features.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <span
                            aria-hidden="true"
                            className={cn(
                              "mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                              t.highlighted
                                ? "bg-blue-600 text-white"
                                : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
                            )}
                          >
                            ✓
                          </span>
                          <span className="text-pretty text-muted-foreground">
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/request-quote?hint=${hintParam}`}
                      className={cn(
                        buttonVariants({
                          variant: t.highlighted ? "default" : "outline",
                          size: "lg",
                        }),
                        "mt-8 w-full rounded-full",
                      )}
                    >
                      Choose {t.name}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </article>
                );
              })}
            </Stagger>
          </PageContainer>
        </section>
      ) : null}

      {/* ──────────────────────────── PROCESS ──────────────────────────── */}
      <section
        id="process"
        aria-labelledby="process-heading"
        className="border-b border-blue-100/70 bg-blue-50/30 dark:border-blue-950/70 dark:bg-blue-950/10"
      >
        <PageContainer size="5xl" className="py-14 sm:py-20">
          <ScrollReveal>
            <SectionHeading
              id="process-heading"
              eyebrow="How we work"
              title="From kickoff to launch in five steps"
              description="A predictable rhythm so your team always knows what is happening, what is next, and how decisions get made."
            />
          </ScrollReveal>

          <Stagger className="mt-10 grid gap-8 lg:grid-cols-5" stagger={0.07}>
            {PROCESS_STEPS.map((step, idx) => (
              <li
                key={step.title}
                className="group relative flex flex-col rounded-2xl border border-blue-100 bg-card p-6 shadow-[0_12px_36px_-28px_rgba(30,64,175,.45)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-blue-950 dark:hover:border-blue-800"
              >
                <span className="absolute -top-4 left-6 inline-flex h-8 items-center justify-center rounded-full border border-blue-100 bg-white px-3 text-xs font-bold text-blue-700 shadow-sm dark:border-blue-950 dark:bg-blue-950 dark:text-blue-300">
                  Step {String(idx + 1).padStart(2, "0")}
                </span>
                <div
                  aria-hidden="true"
                  className="mt-4 inline-flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 ring-1 ring-blue-100 dark:bg-blue-950/50 dark:text-blue-300 dark:ring-blue-900"
                >
                  <step.icon
                    className="size-5"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </li>
            ))}
          </Stagger>
        </PageContainer>
      </section>

      {/* ───────────────────────────── FAQS ───────────────────────────── */}
      {svc.faqs.length > 0 ? (
        <section
          id="faqs"
          aria-labelledby="faqs-heading"
          className="border-b border-blue-100/70 dark:border-blue-950/70"
        >
          <PageContainer size="4xl" className="py-14 sm:py-20">
            <ScrollReveal>
              <SectionHeading
                id="faqs-heading"
                eyebrow="Frequently asked"
                title="Answers to common questions"
                description="If yours isn't here, reach out — we'll come back with specifics within one business day."
              />
            </ScrollReveal>

            <ul className="mt-10 space-y-3">
              {svc.faqs.map((f, idx) => (
                <li
                  key={f.question}
                  className="group overflow-hidden rounded-2xl border border-blue-100 bg-card shadow-[0_8px_28px_-24px_rgba(30,64,175,.45)] transition-colors hover:border-blue-300 dark:border-blue-950 dark:hover:border-blue-800"
                >
                  <details
                    className="group/details"
                    open={idx === 0}
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-left text-base font-semibold tracking-tight [&::-webkit-details-marker]:hidden">
                      <span>{f.question}</span>
                      <ChevronDown
                        className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-open/details:rotate-180 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </summary>
                    <div className="border-t border-blue-100 px-5 py-4 text-sm leading-7 text-muted-foreground dark:border-blue-950">
                      {f.answer}
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </PageContainer>
        </section>
      ) : null}

      {/* ───────────────────────── RELATED WORK ───────────────────────── */}
      {svc.relatedCaseStudies.length > 0 ? (
        <section
          id="related-work"
          aria-labelledby="related-work-heading"
          className="border-b border-blue-100/70 bg-blue-50/30 dark:border-blue-950/70 dark:bg-blue-950/10"
        >
          <PageContainer size="5xl" className="py-14 sm:py-20">
            <ScrollReveal>
              <SectionHeading
                id="related-work-heading"
                eyebrow="Related work"
                title={`Selected ${svc.name.toLowerCase()} engagements`}
                description="Real work delivered for teams like yours. Tap a card to read the case study."
              />
            </ScrollReveal>
            <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
              {svc.relatedCaseStudies.map((c) => (
                <Link
                  key={c.slug}
                  href={`/portfolio/${c.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-blue-100 bg-card p-6 shadow-[0_12px_36px_-28px_rgba(30,64,175,.45)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-blue-950 dark:hover:border-blue-800"
                >
                  {c.industry ? (
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                      {c.industry}
                    </span>
                  ) : null}
                  <h3 className="mt-4 text-lg font-semibold tracking-tight">
                    {c.title}
                  </h3>
                  {c.summary ? (
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {c.summary}
                    </p>
                  ) : null}
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400">
                    Read case study
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              ))}
            </Stagger>
          </PageContainer>
        </section>
      ) : null}

      {/* ──────────────────────────── RELATED SERVICES ──────────────────────────── */}
      {relatedServices.length > 0 ? (
        <section
          id="related"
          aria-labelledby="related-heading"
          className="border-b border-blue-100/70 dark:border-blue-950/70"
        >
          <PageContainer size="5xl" className="py-14 sm:py-20">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <ScrollReveal>
                <SectionHeading
                  id="related-heading"
                  eyebrow="Explore more"
                  title="Other capabilities"
                />
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
                >
                  View all services
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </ScrollReveal>
            </div>

            <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
              {relatedServices.slice(0, 3).map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-blue-100 bg-card p-6 shadow-[0_12px_36px_-28px_rgba(30,64,175,.45)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-blue-950 dark:hover:border-blue-800"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 ring-1 ring-blue-100 dark:bg-blue-950/50 dark:text-blue-300 dark:ring-blue-900">
                      <Icon
                        iconKey={s.iconKey}
                        className="size-5"
                      />
                    </span>
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                      {CATEGORY_LABELS[s.category as ServiceCategory]}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {s.summary}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400">
                    Learn more
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              ))}
            </Stagger>
          </PageContainer>
        </section>
      ) : null}

      {/* ──────────────────────────── FINAL CTA ──────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-foreground text-background">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-br from-blue-700/40 via-transparent to-blue-950/40"
        />
        <PageContainer size="5xl" className="py-16 sm:py-24">
          <FadeIn trigger="mount" className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                <Sparkles className="size-3.5" aria-hidden="true" />
                Ready when you are
              </p>
              <h2 className="mt-4 text-balance text-3xl font-bold tracking-[-0.03em] sm:text-5xl">
                Ready to start with {svc.name}?
              </h2>
              <p className="mt-4 max-w-xl text-pretty text-base text-blue-100/80 sm:text-lg">
                Send a quick brief and we&apos;ll come back with the right senior
                team within one business day.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
              <Link
                href={`/request-quote?hint=${hintParam}`}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "group rounded-full bg-background px-6 text-foreground shadow-xl hover:bg-background/90",
                )}
              >
                Request a quote
                <ArrowRight
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "rounded-full border-blue-400/30 px-6 text-background hover:bg-blue-500/10 hover:text-background",
                )}
              >
                Talk to a partner
              </Link>
            </div>
          </FadeIn>
        </PageContainer>
      </section>
    </div>
  );
}