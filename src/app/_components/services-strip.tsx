import Link from "next/link";
import type { z } from "zod";
import type { serviceSummarySchema } from "@/types/home";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Service = z.infer<typeof serviceSummarySchema>;

export function ServicesStrip({ services }: { services: Service[] }) {
  if (services.length === 0) return null;

  return (
    <section className="border-b" id="services">
      <div className="container mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Services
        </h2>
        <p className="mt-2 text-muted-foreground">
          The capabilities we pair to plan, ship, and operate your project.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Card key={s.slug}>
              <CardHeader>
                <CardTitle className="text-lg">{s.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{s.summary}</p>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  Learn more →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
