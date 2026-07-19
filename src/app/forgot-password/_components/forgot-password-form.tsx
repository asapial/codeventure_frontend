"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CircleCheckBig, Loader2, Mail, RotateCcw, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AuthField } from "@/components/shared/auth-field";
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
  type PasswordResetRequest,
} from "@/types/auth";
import { ApiError, requestPasswordReset } from "@/lib/api/auth";

export function ForgotPasswordForm() {
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<PasswordResetRequest | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "", website: "" },
  });

  async function onSubmit(values: ForgotPasswordInput) {
    if (values.website) {
      setReceipt({ reference: "request-received" });
      return;
    }
    try {
      setSubmitting(true);
      const next = await requestPasswordReset(values);
      setReceipt(next);
      reset();
      toast.success("Check your inbox for the reset link.");
    } catch (error) {
      if (error instanceof ApiError) {
        toast.success("If that email is on file, a reset link is on its way.");
      } else {
        toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (receipt) {
    return (
      <div role="status" aria-live="polite" className="space-y-5 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900">
          <CircleCheckBig className="size-7" aria-hidden="true" />
        </span>
        <div className="space-y-2">
          <h2 className="text-xl font-bold tracking-tight">Check your inbox</h2>
          <p className="text-sm leading-6 text-muted-foreground">
            If an account exists for that address, a secure reset link is on its way. It expires in 30 minutes.
          </p>
        </div>
        <p className="rounded-lg bg-muted/60 px-3 py-2 font-mono text-[11px] text-muted-foreground">
          Reference: {receipt.reference}
        </p>
        <Button type="button" variant="outline" onClick={() => setReceipt(null)} className="h-11 w-full rounded-xl">
          <RotateCcw className="size-4" aria-hidden="true" />
          Use a different email
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-busy={submitting} className="space-y-5">
      <AuthField
        label="Account email"
        type="email"
        placeholder="you@company.com"
        autoComplete="email"
        icon={<Mail className="size-4" aria-hidden="true" />}
        aria-invalid={!!errors.email}
        aria-errormessage={errors.email?.message ?? null}
        hint="We’ll send a secure, single-use link if the address is registered."
        {...register("email")}
      />

      <div aria-hidden="true" className="hidden">
        <input tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <Button type="submit" disabled={submitting} className="group h-12 w-full rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-base font-bold text-white shadow-lg shadow-blue-600/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/35">
        {submitting ? (
          <><Loader2 className="size-4 animate-spin" aria-hidden="true" /> Sending secure link…</>
        ) : (
          <><Send className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" /> Email my reset link</>
        )}
      </Button>
    </form>
  );
}
