import type { z } from "zod";
import type { testimonialSummarySchema } from "@/types/home";
import { Card, CardContent } from "@/components/ui/card";

type Testimonial = z.infer<typeof testimonialSummarySchema>;

export function TestimonialsStrip({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="border-b">
      <div className="container mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          What clients say
        </h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li key={`${t.authorName}-${t.authorRole ?? ""}`}>
              <Card className="h-full">
                <CardContent className="space-y-4 p-6">
                  <blockquote className="text-sm leading-relaxed">
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
