import type { z } from "zod";
import type { testimonialSummarySchema } from "@/types/home";
import { Card, CardContent } from "@/components/ui/card";

type Testimonial = z.infer<typeof testimonialSummarySchema>;

export function TestimonialsStrip({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="border-b">
      <div className="container mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Client perspective</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
          What clients say
        </h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li key={`${t.authorName}-${t.authorRole ?? ""}`}>
              <Card className="h-full border-border/70 bg-card/80 shadow-sm">
                <CardContent className="space-y-4 p-6">
                  <blockquote className="text-sm leading-6">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="text-sm">
                    <span className="font-semibold">{t.authorName}</span>
                    {t.authorRole ? (
                      <span className="text-muted-foreground">
                        {" "}— {t.authorRole}
                      </span>
                    ) : null}
                  </figcaption>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
