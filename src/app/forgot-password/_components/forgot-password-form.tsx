"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    if (values.website && values.website.length > 0) {
      setReceipt({ reference: "bot-suppressed" });
      return;
    }
    try {
      setSubmitting(true);
      const next = await requestPasswordReset(values);
      setReceipt(next);
      reset();
      toast.success("Check your inbox for the reset link.");
    } catch (err) {
      if (err instanceof ApiError) {
        // Don't reveal whether the email exists; same UX either way.
        toast.success("If that email is on file, a reset link is on its way.");
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (receipt) {
    return (
      <div role="status" aria-live="polite" className="space-y-4 text-center">
        <h2 className="text-xl font-semibold">Check your email</h2>
        <p className="text-sm text-muted-foreground">
          If an account exists for the address you entered, we just sent a
          password-reset link. It expires in 30 minutes.
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          Reference: {receipt.reference}
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => setReceipt(null)}
          className="w-full"
        >
          Send to a different email
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-busy={submitting}
      className="space-y-5"
    >
      <div className="space-y-2">
        <Label htmlFor="forgot-email">Email</Label>
        <Input
          id="forgot-email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email ? (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        ) : null}
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" className="hidden">
        <Label htmlFor="forgot-website">Website</Label>
        <Input
          id="forgot-website"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Sending link…" : "Send reset link"}
      </Button>
    </form>
  );
}