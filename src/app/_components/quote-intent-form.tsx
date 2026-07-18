"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const intentSchema = z.object({
  email: z.string().email("Enter a valid work email"),
  serviceHint: z.string().max(120).optional().or(z.literal("")),
});
type IntentInput = z.infer<typeof intentSchema>;

export function QuoteIntentForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IntentInput>({
    resolver: zodResolver(intentSchema),
    defaultValues: { email: "", serviceHint: "" },
  });

  function onSubmit(values: IntentInput) {
    setSubmitting(true);
    const params = new URLSearchParams();
    if (values.email) params.set("email", values.email);
    if (values.serviceHint) params.set("hint", values.serviceHint);
    router.push(`/request-quote?${params.toString()}`);
  }

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Get a quote in minutes</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          aria-describedby={errors.email ? "intent-email-error" : undefined}
        >
          <div className="grid gap-2">
            <Label htmlFor="intent-email">Work email</Label>
            <Input
              id="intent-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email")}
            />
            {errors.email ? (
              <p id="intent-email-error" role="alert" className="text-sm text-destructive">
                {errors.email.message}
              </p>
            ) : null}
          </div>

          <div className="mt-4 grid gap-2">
            <Label htmlFor="intent-hint">What do you need help with? (optional)</Label>
            <Input
              id="intent-hint"
              placeholder="e.g. New eCommerce store, SEO audit"
              {...register("serviceHint")}
            />
          </div>

          <Button type="submit" disabled={submitting} className="mt-6">
            {submitting ? "Preparing your quote…" : "Continue"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
