"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  resetPasswordSchema,
  scorePassword,
  type PasswordStrength,
  type ResetPasswordInput,
} from "@/types/auth";
import { ApiError, resetPassword } from "@/lib/api/auth";

const STRENGTH_LABEL: Record<PasswordStrength, string> = {
  "too-weak": "Too weak",
  weak: "Weak",
  ok: "Okay",
  strong: "Strong",
};

const STRENGTH_BAR: Record<PasswordStrength, string> = {
  "too-weak": "bg-destructive",
  weak: "bg-destructive/70",
  ok: "bg-amber-500",
  strong: "bg-emerald-500",
};

const STRENGTH_WIDTH: Record<PasswordStrength, string> = {
  "too-weak": "w-1/4",
  weak: "w-2/4",
  ok: "w-3/4",
  strong: "w-full",
};

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token,
      password: "",
      confirmPassword: "",
    },
  });

  const password = useWatch({ control, name: "password" }) ?? "";
  const strength = scorePassword(password);

  async function onSubmit(values: ResetPasswordInput) {
    try {
      setSubmitting(true);
      await resetPassword(values);
      setDone(true);
      toast.success("Password reset — please sign in.");
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 410 || err.status === 400) {
          toast.error("This reset link is invalid or has expired.");
        } else if (err.body.fieldErrors) {
          const first = Object.values(err.body.fieldErrors).flat()[0];
          toast.error(first ?? err.body.message);
        } else {
          toast.error(err.body.message);
        }
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Could not reset your password.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div role="status" aria-live="polite" className="space-y-4 text-center">
        <h2 className="text-xl font-semibold">All set</h2>
        <p className="text-sm text-muted-foreground">
          Your password has been updated. You can now sign in with the new
          password.
        </p>
        <Link href="/sign-in" className="inline-block">
          <Button type="button" className="w-full">
            Go to sign-in
          </Button>
        </Link>
        <button
          type="button"
          onClick={() => router.refresh()}
          className="block w-full text-xs text-muted-foreground underline-offset-4 hover:underline"
        >
          Stay on this page
        </button>
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
      {/* Token is hidden but passed via the resolver default. */}
      <input type="hidden" {...register("token")} />

      <div className="space-y-2">
        <Label htmlFor="reset-password">New password</Label>
        <Input
          id="reset-password"
          type="password"
          autoComplete="new-password"
          aria-invalid={!!errors.password}
          {...register("password")}
        />
        {password.length > 0 ? (
          <div className="space-y-1">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full transition-all ${STRENGTH_BAR[strength]} ${STRENGTH_WIDTH[strength]}`}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Strength: {STRENGTH_LABEL[strength]}
            </p>
          </div>
        ) : null}
        {errors.password ? (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="reset-confirm">Confirm password</Label>
        <Input
          id="reset-confirm"
          type="password"
          autoComplete="new-password"
          aria-invalid={!!errors.confirmPassword}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword ? (
          <p className="text-sm text-destructive">
            {errors.confirmPassword.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Updating…" : "Update password"}
      </Button>
    </form>
  );
}