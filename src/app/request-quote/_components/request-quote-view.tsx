"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Check, Sparkles } from "lucide-react";
import { quoteDraftSchema, type QuoteDraft } from "@/types/quote";
import { submitQuoteDraft } from "@/lib/api/quote";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StepContact } from "./step-contact";
import { StepProject } from "./step-project";
import { StepBudget } from "./step-budget";
import { StepReview } from "./step-review";
import { StepSuccess } from "./step-success";

type QuoteServiceOption = QuoteDraft & { _service?: never };
type ServiceOption = { slug: string; name: string; category: "design" | "build" | "operate" };

const stepFields: Array<keyof QuoteDraft>[] = [
  ["fullName", "email", "phone", "company"],
  ["serviceSlugs", "summary", "goals"],
  ["budget", "timeline"],
];

export function RequestQuoteView({ services, prefill }: { services: ServiceOption[]; prefill: { email: string; hint: string } }) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState<{ id: string; estimatedResponseBy?: string } | null>(null);
  const stepTitles = ["Contact", "Project", "Budget & timeline", "Review"];

  const methods = useForm<QuoteDraft>({
    resolver: zodResolver(quoteDraftSchema), mode: "onBlur",
    defaultValues: { fullName: "", email: prefill.email, phone: "", company: "", serviceSlugs: [], summary: prefill.hint ? prefill.hint.padEnd(20, " ").slice(0, 20) : "", goals: "", budget: "15k_50k", timeline: "1_3_months" },
  });

  async function onSubmit(values: QuoteDraft) {
    try {
      const response = await submitQuoteDraft(values);
      setSubmitted({ id: response.id, estimatedResponseBy: response.estimatedResponseBy });
      toast.success("Quote request received");
    } catch (error) { toast.error(error instanceof Error ? error.message : "Submission failed"); }
  }

  if (submitted) return <StepSuccess id={submitted.id} estimatedResponseBy={submitted.estimatedResponseBy} />;

  async function goNext() {
    const fields = stepFields[step] as (keyof QuoteDraft)[];
    if (await methods.trigger(fields, { shouldFocus: true })) setStep((current) => Math.min(current + 1, stepTitles.length - 1));
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate aria-labelledby="rq-heading" className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <header className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50/40 p-6 shadow-[0_24px_70px_-38px_rgba(30,64,175,.45)] dark:border-blue-950 dark:from-blue-950/30 dark:via-card dark:to-cyan-950/20 sm:p-8">
          <div className="absolute -right-16 -top-20 size-56 rounded-full bg-blue-500/10 blur-3xl" />
          <p className="relative inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400"><Sparkles className="size-3.5" aria-hidden="true" /> Start a project</p>
          <h1 id="rq-heading" className="relative mt-3 text-3xl font-bold tracking-[-0.035em] sm:text-5xl">Request a quote</h1>
          <p className="relative mt-3 max-w-2xl text-lg leading-7 text-muted-foreground">Tell us what you are building. Four focused steps help us understand the shape of your project.</p>
        </header>

        <ol aria-label="Progress" className="mt-8 grid gap-2 sm:grid-cols-4">
          {stepTitles.map((title, index) => {
            const state = index < step ? "done" : index === step ? "current" : "upcoming";
            return (
              <li key={title} className="flex items-center gap-3 rounded-xl border border-blue-100 bg-card px-3 py-3 dark:border-blue-950">
                <span aria-current={state === "current" ? "step" : undefined} className={state === "done" ? "grid size-7 shrink-0 place-items-center rounded-full bg-emerald-500 text-xs font-bold text-white" : state === "current" ? "grid size-7 shrink-0 place-items-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-sm shadow-blue-600/25" : "grid size-7 shrink-0 place-items-center rounded-full bg-muted text-xs font-bold text-muted-foreground"}>
                  {state === "done" ? <Check className="size-3.5" strokeWidth={3} aria-hidden="true" /> : index + 1}
                </span>
                <span className={state === "current" ? "text-xs font-bold text-foreground" : "text-xs font-medium text-muted-foreground"}>{title}</span>
              </li>
            );
          })}
        </ol>

        <Card className="mt-6 overflow-hidden">
          <CardHeader><p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">Step {step + 1} of {stepTitles.length}</p><CardTitle className="mt-2 text-2xl">{stepTitles[step]}</CardTitle></CardHeader>
          <CardContent>{step === 0 ? <StepContact /> : null}{step === 1 ? <StepProject services={services} /> : null}{step === 2 ? <StepBudget /> : null}{step === 3 ? <StepReview /> : null}</CardContent>
        </Card>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="button" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0} variant="outline">Back</Button>
          {step < stepTitles.length - 1 ? <Button type="button" onClick={goNext}>Continue</Button> : <Button type="submit" disabled={methods.formState.isSubmitting}>{methods.formState.isSubmitting ? "Submitting…" : "Submit request"}</Button>}
        </div>
      </form>
    </FormProvider>
  );
}

export type { QuoteServiceOption };
