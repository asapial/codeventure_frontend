import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  headline: string;
  subheadline?: string;
  ctaLabel: string;
  ctaHref: string;
}

export function ConversionBand({
  headline,
  subheadline,
  ctaLabel,
  ctaHref,
}: Props) {
  return (
    <section className="bg-foreground text-background">
      <div className="container mx-auto max-w-6xl px-4 py-16 text-center sm:py-20">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {headline}
        </h2>
        {subheadline ? (
          <p className="mx-auto mt-4 max-w-2xl text-background/80">
            {subheadline}
          </p>
        ) : null}
        <Link
          href={ctaHref}
          className={cn(
            buttonVariants({ size: "lg" }),
            "mt-8 bg-background text-foreground hover:bg-background/90",
          )}
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
