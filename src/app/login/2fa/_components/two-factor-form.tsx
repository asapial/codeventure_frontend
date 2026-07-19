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
  twoFactorVerifySchema,
  twoFactorResendSchema,
  type TwoFactorVerifyInput,
  type TwoFactorResendInput,
  type TwoFactorMethod,
} from "@/types/auth";
import { ApiError } from "@/lib/api/auth";
import { verifyTwoFactor, resendTwoFactor } from "@/lib/api/auth-2fa";

interface Props {
  challengeToken: string;
  method: TwoFactorMethod;
  redirectTo: string;
}

export function TwoFactorForm({ challengeToken, method, redirectTo }: Props) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);

  const useRecovery = method === "recovery-code";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TwoFactorVerifyInput>({
    resolver: zodResolver(twoFactorVerifySchema),
    defaultValues: {
      challengeToken,
      code: "",
      recoveryCode: "",
      trustDevice: false,
    },
  });

  async function onSubmit(values: TwoFactorVerifyInput) {
    try {
      setSubmitting(true);
      await verifyTwoFactor(values);
      toast.success("Verified — you're signed in.");
      router.replace(redirectTo);
      router.refresh();
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 400) {
          toast.error("That code didn't work. Try again or use a recovery code.");
        } else if (err.body.fieldErrors) {
          const first = Object.values(err.body.fieldErrors).flat()[0];
          toast.error(first ?? err.body.message);
        } else {
          toast.error(err.body.message);
        }
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Could not verify the code. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function onResend() {
    const input: TwoFactorResendInput = { challengeToken };
    const parsed = twoFactorResendSchema.parse(input);
    try {
      setResending(true);
      await resendTwoFactor(parsed);
      toast.success("If the challenge is still valid, a new code is on its way.");
    } catch (err) {
      // Silent — never leak whether the challenge exists.
      toast.success("If the challenge is still valid, a new code is on its way.");
      void err;
    } finally {
      setResending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-busy={submitting}
      className="space-y-5"
    >
      <input type="hidden" {...register("challengeToken")} />

      {useRecovery ? (
        <div className="space-y-2">
          <Label htmlFor="recovery-code">Recovery code</Label>
          <Input
            id="recovery-code"
            inputMode="text"
            autoComplete="off"
            autoCapitalize="characters"
            placeholder="XXXX-XXXX-XXXX-XXXX"
            aria-invalid={!!errors.recoveryCode}
            {...register("recoveryCode")}
          />
          {errors.recoveryCode ? (
            <p className="text-sm text-destructive">
              {errors.recoveryCode.message}
            </p>
          ) : null}
          <p className="text-xs text-muted-foreground">
            Each recovery code works once. After using it, generate a fresh set
            from your account security centre.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="totp-code">6-digit code</Label>
          <Input
            id="totp-code"
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
      )}

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-input"
          {...register("trustDevice")}
        />
        <span className="text-muted-foreground">
          Trust this device for 30 days
        </span>
      </label>

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Verifying…" : "Verify"}
      </Button>

      {!useRecovery ? (
        <button
          type="button"
          onClick={onResend}
          disabled={resending}
          className="block w-full text-center text-xs text-muted-foreground underline-offset-4 hover:underline disabled:opacity-60"
        >
          {resending ? "Sending…" : "Resend code"}
        </button>
      ) : null}
    </form>
  );
}
