"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { quoteDraftSchema, type QuoteDraft } from "@/types/quote";
import { submitQuoteDraft } from "@/lib/api/quote";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StepContact } from "./step-contact";
import { StepProject } from "./step-project";
import { StepBudget } from "./step-budget";
import { StepReview } from "./step-review";
import { StepSuccess } from "./step-success";

type QuoteServiceOption = QuoteDraft & { _service?: never };
type ServiceOption = {
  slug: string;
  name: string;
  category: "design" | "build" | "operate";
};

interface Props {
  services: ServiceOption[];
  prefill: { email: string; hint: string };
}

const STEP_FIELDS: Array<keyof QuoteDraft>[] = [
  ["fullName", "email", "phone", "company"],
  ["serviceSlugs", "summary", "goals"],
  ["budget", "timeline"],
];

export function RequestQuoteView({ services, prefill }: Props) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState<{
    id: string;
    estimatedResponseBy?: string;
  } | null>(null);

  const methods = useForm<QuoteDraft>({
    resolver: zodResolver(quoteDraftSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: prefill.email,
      phone: "",
      company: "",
      serviceSlugs: [],
      summary: prefill.hint ? prefill.hint.padEnd(20, " ").slice(0, 20) : "",
      goals: "",
      budget: "15k_50k",
      timeline: "1_3_months",
    },
  });

  async function onSubmit(values: QuoteDraft) {
    try {
      const res = await submitQuoteDraft(values);
      setSubmitted({
        id: res.id,
        estimatedResponseBy: res.estimatedResponseBy,
      });
      toast.success("Quote request received");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Submission failed";
      toast.error(message);
    }
  }

  if (submitted) {
    return <StepSuccess id={submitted.id} estimatedResponseBy={submitted.estimatedResponseBy} />;
  }

  const stepTitles = ["Contact", "Project", "Budget & timeline", "Review"];

  async function goNext() {
    const fields = STEP_FIELDS[step] as (keyof QuoteDraft)[];
    const ok = await methods.trigger(fields, { shouldFocus: true });
    if (!ok) return;
    setStep((s) => Math.min(s + 1, stepTitles.length - 1));
  }

  function goBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        aria-labelledby="rq-heading"
        className="container mx-auto max-w-3xl px-4 py-16"
      >
        <header>
          <h1 id="rq-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Request a quote
          </h1>
          <p className="mt-2 text-muted-foreground">
            Four short steps. We reply within two business days with a tailored proposal.
          </p>
        </header>

        <ol
          aria-label="Progress"
          className="mt-8 flex flex-wrap items-center gap-2 text-sm"
        >
          {stepTitles.map((title, idx) => {
            const state =
              idx < step ? "done" : idx === step ? "current" : "upcoming";
            return (
              <li key={title} className="flex items-center gap-2">
                <span
                  aria-current={state === "current" ? "step" : undefined}
                  className={
                    state === "done"
                      ? "font-semibold text-primary"
                      : state === "current"
                        ? "font-semibold"
                        : "text-muted-foreground"
                  }
                >
                  {idx + 1}. {title}
                </span>
                {idx < stepTitles.length - 1 ? (
                  <Separator
                    orientation="horizontal"
                    className="hidden h-px w-6 bg-border sm:block"
                  />
                ) : null}
              </li>
            );
          })}
        </ol>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>{stepTitles[step]}</CardTitle>
          </CardHeader>
          <CardContent>
            {step === 0 ? <StepContact /> : null}
            {step === 1 ? <StepProject services={services} /> : null}
            {step === 2 ? <StepBudget /> : null}
            {step === 3 ? <StepReview /> : null}
          </CardContent>
        </Card>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
          >
            Back
          </button>
          {step < stepTitles.length - 1 ? (
            <button
              type="button"
              onClick={goNext}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              disabled={methods.formState.isSubmitting}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {methods.formState.isSubmitting ? "Submitting…" : "Submit request"}
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}

// Re-export so consumers don't have to know the type lives elsewhere.
export type { QuoteServiceOption };