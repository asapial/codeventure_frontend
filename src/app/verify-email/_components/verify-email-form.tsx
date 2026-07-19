"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  verifyEmailSchema,
  resendVerificationSchema,
  type VerifyEmailInput,
  type ResendVerificationInput,
} from "@/types/auth";
import { ApiError } from "@/lib/api/auth";
import { verifyEmail, resendEmailOtp } from "@/lib/api/verify-email";

type Mode = "code" | "token";

interface Props {
  initialEmail: string;
  initialToken: string;
}

export function VerifyEmailForm({ initialEmail, initialToken }: Props) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const [mode, setMode] = useState<Mode>(initialToken ? "token" : "code");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<VerifyEmailInput>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: initialEmail,
      code: "",
      token: initialToken,
    },
  });

  async function onSubmit(values: VerifyEmailInput) {
    try {
      setSubmitting(true);
      await verifyEmail({
        email: values.email,
        ...(mode === "code"
          ? { code: values.code }
          : { token: values.token }),
      });
      toast.success("Email verified — please sign in.");
      router.replace("/sign-in?reason=verified");
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 400) {
          toast.error("That code or token didn't work. Try again.");
        } else if (err.body.fieldErrors) {
          const first = Object.values(err.body.fieldErrors).flat()[0];
          toast.error(first ?? err.body.message);
        } else {
          toast.error(err.body.message);
        }
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Could not verify your email. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function onResend() {
    const email = getValues("email");
    const parsed: ResendVerificationInput = resendVerificationSchema.parse({
      email,
    });
    try {
      setResending(true);
      await resendEmailOtp(parsed);
    } finally {
      setResending(false);
      // Always success — backend never reveals whether the email exists.
      toast.success("If the address is on file, a fresh code is on its way.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-busy={submitting}
      className="space-y-5"
    >
      <div className="space-y-2">
        <Label htmlFor="ve-email">Email</Label>
        <Input
          id="ve-email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email ? (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        ) : null}
      </div>

      <div
        role="tablist"
        aria-label="Verification method"
        className="flex gap-2 text-sm"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === "code"}
          onClick={() => setMode("code")}
          className={`rounded-md border px-3 py-1 ${
            mode === "code"
              ? "border-primary text-primary"
              : "border-input text-muted-foreground"
          }`}
        >
          6-digit code
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "token"}
          onClick={() => setMode("token")}
          className={`rounded-md border px-3 py-1 ${
            mode === "token"
              ? "border-primary text-primary"
              : "border-input text-muted-foreground"
          }`}
        >
          Magic link token
        </button>
      </div>

      {mode === "code" ? (
        <div className="space-y-2">
          <Label htmlFor="ve-code">Verification code</Label>
          <Input
            id="ve-code"
            inputMode="numeric"
            pattern="\d{6}"
            maxLength={6}
            autoComplete="one-time-code"
            placeholder="123456"
            aria-invalid={!!errors.code}
            {...register("code")}
          />
          {errors.code ? (
            <p className="text-sm text-destructive">{errors.code.message}</p>
          ) : null}
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="ve-token">Magic-link token</Label>
          <Input
            id="ve-token"
            autoComplete="off"
            placeholder="Paste token from your email"
            aria-invalid={!!errors.token}
            {...register("token")}
          />
          {errors.token ? (
            <p className="text-sm text-destructive">{errors.token.message}</p>
          ) : null}
        </div>
      )}

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Verifying…" : "Verify email"}
      </Button>

      <button
        type="button"
        onClick={onResend}
        disabled={resending}
        className="block w-full text-center text-xs text-muted-foreground underline-offset-4 hover:underline disabled:opacity-60"
      >
        {resending ? "Sending…" : "Resend verification email"}
      </button>
    </form>
  );
}
