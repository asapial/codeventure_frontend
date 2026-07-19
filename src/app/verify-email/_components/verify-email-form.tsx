"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { KeyRound, Link2, Loader2, Mail, RefreshCw, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AuthField } from "@/components/shared/auth-field";
import {
  verifyEmailSchema,
  resendVerificationSchema,
  type VerifyEmailInput,
} from "@/types/auth";
import { ApiError } from "@/lib/api/auth";
import { verifyEmail, resendEmailOtp } from "@/lib/api/verify-email";

type Mode = "code" | "token";

export function VerifyEmailForm({ initialEmail, initialToken }: { initialEmail: string; initialToken: string }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const [mode, setMode] = useState<Mode>(initialToken ? "token" : "code");
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<VerifyEmailInput>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { email: initialEmail, code: "", token: initialToken },
  });

  async function onSubmit(values: VerifyEmailInput) {
    try {
      setSubmitting(true);
      await verifyEmail({
        email: values.email,
        ...(mode === "code" ? { code: values.code } : { token: values.token }),
      });
      toast.success("Email verified — please sign in.");
      router.replace("/sign-in?reason=verified");
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 400) toast.error("That code or token didn’t work. Try again.");
        else if (error.body.fieldErrors) toast.error(Object.values(error.body.fieldErrors).flat()[0] ?? error.body.message);
        else toast.error(error.body.message);
      } else {
        toast.error(error instanceof Error ? error.message : "Could not verify your email. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function onResend() {
    const parsed = resendVerificationSchema.safeParse({ email: getValues("email") });
    if (!parsed.success) {
      toast.error("Enter a valid email before requesting a new code.");
      return;
    }
    try {
      setResending(true);
      await resendEmailOtp(parsed.data);
    } finally {
      setResending(false);
      toast.success("If the address is on file, a fresh code is on its way.");
    }
  }

  function chooseMode(nextMode: Mode) {
    setMode(nextMode);
    if (nextMode === "code") setValue("token", "", { shouldValidate: false });
    else setValue("code", "", { shouldValidate: false });
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
        {...register("email")}
      />

      <div role="tablist" aria-label="Verification method" className="grid grid-cols-2 gap-1.5 rounded-xl bg-muted/60 p-1.5">
        <button type="button" role="tab" aria-selected={mode === "code"} onClick={() => chooseMode("code")} className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-2 py-2 text-xs font-semibold transition-all ${mode === "code" ? "bg-background text-blue-700 shadow-sm ring-1 ring-blue-100 dark:text-blue-300 dark:ring-blue-950" : "text-muted-foreground hover:text-foreground"}`}>
          <KeyRound className="size-3.5" aria-hidden="true" /> Code
        </button>
        <button type="button" role="tab" aria-selected={mode === "token"} onClick={() => chooseMode("token")} className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-2 py-2 text-xs font-semibold transition-all ${mode === "token" ? "bg-background text-blue-700 shadow-sm ring-1 ring-blue-100 dark:text-blue-300 dark:ring-blue-950" : "text-muted-foreground hover:text-foreground"}`}>
          <Link2 className="size-3.5" aria-hidden="true" /> Magic link
        </button>
      </div>

      {mode === "code" ? (
        <AuthField
          label="Six-digit code"
          inputMode="numeric"
          pattern="\d{6}"
          maxLength={6}
          autoComplete="one-time-code"
          placeholder="123456"
          icon={<KeyRound className="size-4" aria-hidden="true" />}
          className="font-mono text-base tracking-[0.35em]"
          aria-invalid={!!errors.code}
          aria-errormessage={errors.code?.message ?? null}
          hint="Use the newest code in your inbox."
          {...register("code")}
        />
      ) : (
        <AuthField
          label="Magic-link token"
          autoComplete="off"
          placeholder="Paste the token from your email"
          icon={<Link2 className="size-4" aria-hidden="true" />}
          aria-invalid={!!errors.token}
          aria-errormessage={errors.token?.message ?? null}
          hint="Paste the complete token from your verification link."
          {...register("token")}
        />
      )}

      <Button type="submit" disabled={submitting} className="group h-12 w-full rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-base font-bold text-white shadow-lg shadow-blue-600/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/35">
        {submitting ? <><Loader2 className="size-4 animate-spin" aria-hidden="true" /> Verifying…</> : <><ShieldCheck className="size-4" aria-hidden="true" /> Verify and continue</>}
      </Button>

      <button type="button" onClick={onResend} disabled={resending} className="flex w-full items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted/60 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60">
        <RefreshCw className={`size-3.5 ${resending ? "animate-spin" : ""}`} aria-hidden="true" />
        {resending ? "Sending a fresh code…" : "Resend verification email"}
      </button>
    </form>
  );
}
