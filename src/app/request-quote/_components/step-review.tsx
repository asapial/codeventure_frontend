"use client";

import { useFormContext } from "react-hook-form";
import {
  BUDGET_LABELS,
  TIMELINE_LABELS,
  type QuoteDraft,
} from "@/types/quote";

export function StepReview() {
  const { getValues } = useFormContext<QuoteDraft>();
  const v = getValues();

  return (
    <dl className="grid gap-4 text-sm sm:grid-cols-2">
      <div>
        <dt className="text-muted-foreground">Name</dt>
        <dd className="font-medium">{v.fullName || "—"}</dd>
      </div>
      <div>
        <dt className="text-muted-foreground">Email</dt>
        <dd className="font-medium">{v.email || "—"}</dd>
      </div>
      <div>
        <dt className="text-muted-foreground">Phone</dt>
        <dd className="font-medium">{v.phone || "—"}</dd>
      </div>
      <div>
        <dt className="text-muted-foreground">Company</dt>
        <dd className="font-medium">{v.company || "—"}</dd>
      </div>
      <div className="sm:col-span-2">
        <dt className="text-muted-foreground">Services</dt>
        <dd className="font-medium">
          {v.serviceSlugs.length > 0 ? v.serviceSlugs.join(", ") : "—"}
        </dd>
      </div>
      <div className="sm:col-span-2">
        <dt className="text-muted-foreground">Summary</dt>
        <dd className="whitespace-pre-wrap font-medium">{v.summary || "—"}</dd>
      </div>
      <div className="sm:col-span-2">
        <dt className="text-muted-foreground">Goals</dt>
        <dd className="whitespace-pre-wrap font-medium">{v.goals || "—"}</dd>
      </div>
      <div>
        <dt className="text-muted-foreground">Budget</dt>
        <dd className="font-medium">{BUDGET_LABELS[v.budget]}</dd>
      </div>
      <div>
        <dt className="text-muted-foreground">Timeline</dt>
        <dd className="font-medium">{TIMELINE_LABELS[v.timeline]}</dd>
      </div>
    </dl>
  );
}