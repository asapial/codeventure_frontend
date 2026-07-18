import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { QuoteIntentForm } from "./quote-intent-form";

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
    <section className="border-b bg-gradient-to-b from-background to-muted/40">
      <div className="container mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          {headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          {subheadline}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={primaryCta.href}
            className={cn(buttonVariants({ size: "lg" }))}
          >
            {primaryCta.label}
          </Link>
          <Link
            href={secondaryCta.href}
            className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
          >
            {secondaryCta.label}
          </Link>
        </div>

        <div className="mt-16">
          <QuoteIntentForm />
        </div>
      </div>
    </section>
  );
}
