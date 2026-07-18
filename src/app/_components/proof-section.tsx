import type { z } from "zod";
import {
  outcomeMetricSchema,
  trustSignalSchema,
} from "@/types/home";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Outcome = z.infer<typeof outcomeMetricSchema>;
type Signal = z.infer<typeof trustSignalSchema>;

interface Props {
  outcomes: Outcome[];
  signals: Signal[];
}

export function ProofSection({ outcomes, signals }: Props) {
  return (
    <section className="border-b">
      <div className="container mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((m) => (
            <Card key={m.label}>
              <CardContent className="p-6">
                <p className="text-4xl font-semibold tracking-tight">{m.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{m.label}</p>
                {m.context ? (
                  <p className="mt-1 text-xs text-muted-foreground">{m.context}</p>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>

        {signals.length > 0 ? (
          <div className="mt-10 flex flex-wrap gap-2">
            {signals.map((s) => (
              <Badge key={s.label} variant="secondary">
                <span className="font-semibold">{s.value}</span>
                <span className="ml-1 text-muted-foreground">{s.label}</span>
              </Badge>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
