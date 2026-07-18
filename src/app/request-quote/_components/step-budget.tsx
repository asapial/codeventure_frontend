"use client";

import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  BUDGET_LABELS,
  TIMELINE_LABELS,
  type QuoteDraft,
} from "@/types/quote";

export function StepBudget() {
  const {
    register,
    formState: { errors },
  } = useFormContext<QuoteDraft>();

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="grid gap-2">
        <Label htmlFor="budget">Budget range</Label>
        <select
          id="budget"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          {...register("budget")}
        >
          {(Object.keys(BUDGET_LABELS) as Array<keyof typeof BUDGET_LABELS>).map(
            (k) => (
              <option key={k} value={k}>
                {BUDGET_LABELS[k]}
              </option>
            ),
          )}
        </select>
        {errors.budget ? (
          <p role="alert" className="text-sm text-destructive">
            {String(errors.budget.message)}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="timeline">Timeline</Label>
        <select
          id="timeline"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          {...register("timeline")}
        >
          {(Object.keys(TIMELINE_LABELS) as Array<keyof typeof TIMELINE_LABELS>).map(
            (k) => (
              <option key={k} value={k}>
                {TIMELINE_LABELS[k]}
              </option>
            ),
          )}
        </select>
        {errors.timeline ? (
          <p role="alert" className="text-sm text-destructive">
            {String(errors.timeline.message)}
          </p>
        ) : null}
      </div>
    </div>
  );
}