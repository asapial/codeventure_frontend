"use client";

import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import type { QuoteDraft, QuoteServiceOption } from "@/types/quote";

interface Props {
  services: QuoteServiceOption[];
}

export function StepProject({ services }: Props) {
  const { register, watch, formState: { errors } } = useFormContext<QuoteDraft>();
  const selected = watch("serviceSlugs") ?? [];
  const grouped = services.reduce<Record<string, QuoteServiceOption[]>>(
    (acc, s) => {
      (acc[s.category] ??= []).push(s);
      return acc;
    },
    {},
  );

  return (
    <div className="grid gap-6">
      <fieldset className="grid gap-3">
        <legend className="text-sm font-medium">Which services do you need?</legend>
        <p className="text-sm text-muted-foreground">Pick one or more (up to 6).</p>

        {(["design", "build", "operate"] as const).map((cat) => {
          const items = grouped[cat] ?? [];
          if (items.length === 0) return null;
          return (
            <div key={cat} className="grid gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {cat}
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {items.map((s) => {
                  const id = `svc-${s.slug}`;
                  const checked = selected.includes(s.slug);
                  return (
                    <label
                      key={s.slug}
                      htmlFor={id}
                      className="flex cursor-pointer items-start gap-2 rounded-md border border-input p-3 text-sm hover:bg-accent"
                    >
                      <input
                        id={id}
                        type="checkbox"
                        value={s.slug}
                        className="mt-1 h-4 w-4 rounded border-input"
                        checked={checked}
                        {...register("serviceSlugs")}
                      />
                      <span className="font-medium">{s.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}

        {errors.serviceSlugs ? (
          <p role="alert" className="text-sm text-destructive">
            {String(errors.serviceSlugs.message)}
          </p>
        ) : null}
      </fieldset>

      <div className="grid gap-2">
        <Label htmlFor="summary">Project summary</Label>
        <textarea
          id="summary"
          rows={5}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="What are you building, and what would success look like?"
          {...register("summary")}
        />
        {errors.summary ? (
          <p role="alert" className="text-sm text-destructive">
            {String(errors.summary.message)}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="goals">Goals (optional)</Label>
        <textarea
          id="goals"
          rows={3}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="Specific KPIs or outcomes you're targeting."
          {...register("goals")}
        />
      </div>
    </div>
  );
}