import Link from "next/link";
import Image from "next/image";
import type { z } from "zod";
import type { caseStudySummarySchema } from "@/types/home";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Study = z.infer<typeof caseStudySummarySchema>;

export function CaseStudiesStrip({ studies }: { studies: Study[] }) {
  if (studies.length === 0) return null;

  return (
    <section className="border-b" id="work">
      <div className="container mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Selected work
        </h2>
        <p className="mt-2 text-muted-foreground">
          Recent engagements and what they changed for the business.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studies.map((cs) => (
            <Card key={cs.slug}>
              {cs.coverImageUrl ? (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={cs.coverImageUrl}
                    alt={cs.coverImageAlt ?? cs.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : null}
              <CardHeader>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {cs.industry}
                </p>
                <CardTitle className="text-lg">{cs.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{cs.summary}</p>
                {cs.outcome ? (
                  <p className="text-sm font-medium">{cs.outcome}</p>
                ) : null}
                <Link
                  href={`/portfolio/${cs.slug}`}
                  className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  Read case study →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
