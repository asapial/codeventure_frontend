"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  ArrowRight,
  Check,
  Lock,
  Loader2,
  Mail,
  Sparkles,
  User,
} from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { AuthField } from "@/components/shared/auth-field";
import { SignUpStepper } from "@/components/shared/sign-up-stepper";
import {
  scorePassword,
  signUpSchema,
  type PasswordStrength,
  type SignUpInput,
} from "@/types/auth";
import { ApiError, signUp } from "@/lib/api/auth";

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

const REQUIREMENTS = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "One lowercase letter", test: (v: string) => /[a-z]/.test(v) },
  { label: "One uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "One number", test: (v: string) => /[0-9]/.test(v) },
];

export function SignUpForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.input<typeof signUpSchema>, unknown, z.output<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false as unknown as true,
      marketingOptIn: false,
      website: "",
    },
  });

  const password = useWatch({ control, name: "password" }) ?? "";
  const confirm = useWatch({ control, name: "confirmPassword" }) ?? "";
  const name = useWatch({ control, name: "name" }) ?? "";
  const email = useWatch({ control, name: "email" }) ?? "";
  const marketing = useWatch({ control, name: "marketingOptIn" }) ?? false;
  const accepted = useWatch({ control, name: "acceptTerms" }) ?? false;

  const strength = scorePassword(password);
  const confirmMatches = confirm.length > 0 && confirm === password;

  const step: 1 | 2 | 3 = (() => {
    if (!password || !confirmMatches) return 1;
    return accepted ? 3 : 2;
  })();

  async function onSubmit(values: SignUpInput) {
    if (values.website && values.website.length > 0) {
      toast.success("Account created.");
      router.replace("/dashboard");
      return;
    }
    try {
      setSubmitting(true);
      await signUp(values);
      toast.success("Account created — welcome to CodeVenture!");
      router.replace("/dashboard");
      router.refresh();
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 409) {
          toast.error("An account with this email already exists.");
        } else if (err.body.fieldErrors) {
          const first = Object.values(err.body.fieldErrors).flat()[0];
          toast.error(first ?? err.body.message);
        } else {
          toast.error(err.body.message);
        }
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Could not create your account. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-busy={submitting}
      className="space-y-5"
    >
      <SignUpStepper step={step} />

      <AuthField
        label="Your name"
        placeholder="Jane Doe"
        autoComplete="name"
        icon={<User className="size-4" aria-hidden="true" />}
        aria-invalid={!!errors.name}
        aria-errormessage={errors.name?.message ?? null}
        {...register("name")}
      />

      <AuthField
        label="Work email"
        type="email"
        placeholder="you@company.com"
        autoComplete="email"
        icon={<Mail className="size-4" aria-hidden="true" />}
        aria-invalid={!!errors.email}
        aria-errormessage={errors.email?.message ?? null}
        {...register("email")}
      />

      {/* Password strength card */}
      <div className="space-y-2">
        <AuthField
          label="Password"
          type="password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          reveal
          icon={<Lock className="size-4" aria-hidden="true" />}
          aria-invalid={!!errors.password}
          aria-errormessage={errors.password?.message ?? null}
          hint="Use a phrase you'll remember but no one can guess."
          {...register("password")}
        />
        {password.length > 0 ? (
          <div className="space-y-2 rounded-xl border border-blue-100 bg-blue-50/40 p-3 dark:border-blue-950 dark:bg-blue-950/20">
            <div
              className="h-1.5 w-full overflow-hidden rounded-full bg-white/70 dark:bg-slate-800/60"
              aria-hidden="true"
            >
              <div
                className={`h-full transition-all duration-300 ${STRENGTH_BAR[strength]} ${STRENGTH_WIDTH[strength]}`}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-semibold">
              <span
                className={
                  strength === "strong"
                    ? "text-emerald-700 dark:text-emerald-300"
                    : strength === "ok"
                      ? "text-amber-700 dark:text-amber-300"
                      : strength === "weak"
                        ? "text-rose-700 dark:text-rose-300"
                        : "text-destructive"
                }
              >
                Strength: {STRENGTH_LABEL[strength]}
              </span>
              <span className="text-muted-foreground">
                {Math.min(REQUIREMENTS.filter((r) => r.test(password)).length, 4)}/4 met
              </span>
            </div>
            <ul className="grid gap-1 text-[11px] text-muted-foreground">
              {REQUIREMENTS.map((req) => {
                const met = req.test(password);
                return (
                  <li
                    key={req.label}
                    className={`flex items-center gap-1.5 ${
                      met ? "text-emerald-700 dark:text-emerald-300" : ""
                    }`}
                  >
                    <span
                      className={`grid size-3.5 place-items-center rounded-full ${
                        met ? "bg-emerald-500 text-white" : "bg-muted"
                      }`}
                    >
                      {met ? (
                        <Check className="size-2.5" strokeWidth={3} aria-hidden="true" />
                      ) : (
                        <span className="size-1 rounded-full bg-muted-foreground/40" />
                      )}
                    </span>
                    {req.label}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>

      <AuthField
        label="Confirm password"
        type="password"
        placeholder="Re-type your password"
        autoComplete="new-password"
        reveal
        icon={<Lock className="size-4" aria-hidden="true" />}
        aria-invalid={!!errors.confirmPassword}
        aria-errormessage={errors.confirmPassword?.message ?? null}
        matcher={(value) => value === password}
        {...register("confirmPassword")}
      />

      {/* Consent card */}
      <div
        className={`flex w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left transition-all ${
          errors.acceptTerms
            ? "border-destructive/60 bg-destructive/[0.04]"
            : accepted
              ? "border-blue-200 bg-blue-50/40 dark:border-blue-900 dark:bg-blue-950/30"
              : "border-blue-100 hover:border-blue-200 dark:border-blue-950 dark:hover:border-blue-900"
        }`}
      >
        <input
          id="signup-terms"
          type="checkbox"
          className="mt-0.5 size-5 shrink-0 cursor-pointer accent-blue-600"
          aria-invalid={!!errors.acceptTerms}
          {...register("acceptTerms")}
        />
        <div className="space-y-1 text-sm">
          <label htmlFor="signup-terms" className="cursor-pointer font-semibold text-foreground">
            I agree to the Terms & Privacy Policy
          </label>
          <p className="text-xs text-muted-foreground">
            By joining, you accept our{" "}
            <Link
              href="/legal/terms"
              className="font-semibold text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400"
            >
              Terms of Service
            </Link>
            ,{" "}
            <Link
              href="/legal/privacy"
              className="font-semibold text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400"
            >
              Privacy Policy
            </Link>
            , and{" "}
            <Link
              href="/legal/acceptable-use"
              className="font-semibold text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400"
            >
              Acceptable Use
            </Link>
            .
          </p>
        </div>
      </div>
      {errors.acceptTerms ? (
        <p className="-mt-3 flex items-center gap-1.5 text-xs text-destructive">
          {errors.acceptTerms.message}
        </p>
      ) : null}

      {/* Marketing opt-in as a soft card */}
      <div className="flex items-start gap-3 rounded-xl border border-dashed border-blue-100/80 bg-blue-50/30 px-3.5 py-3 text-sm dark:border-blue-950 dark:bg-blue-950/10">
        <Sparkles className="mt-0.5 size-4 text-blue-600" aria-hidden="true" />
        <label
          htmlFor="signup-marketing"
          className="flex flex-1 cursor-pointer flex-col gap-1"
        >
          <span className="font-semibold text-foreground">
            Occasional product updates
          </span>
          <span className="text-xs text-muted-foreground">
            Tips, launches, and one thoughtful email a month. Unsubscribe anytime.
          </span>
        </label>
        <button
          type="button"
          role="switch"
          aria-checked={marketing}
          aria-label="Toggle product update emails"
          onClick={(event) => {
            const input =
              event.currentTarget.parentElement?.querySelector<HTMLInputElement>(
                "input[name='marketingOptIn']",
              );
            if (input) input.click();
          }}
          className="relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors"
        >
          <span
            aria-hidden="true"
            className={`inline-block size-4 transform rounded-full bg-white shadow transition ${
              marketing
                ? "translate-x-4 bg-blue-600"
                : "translate-x-0.5 bg-slate-300 dark:bg-slate-700"
            }`}
          />
        </button>
        <input
          id="signup-marketing"
          type="checkbox"
          className="sr-only"
          {...register("marketingOptIn")}
        />
      </div>

      <input type="hidden" value={name} readOnly aria-hidden="true" />
      <input type="hidden" value={email} readOnly aria-hidden="true" />

      {/* Honeypot */}
      <div aria-hidden="true" className="hidden">
        <input
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          {...register("website")}
        />
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="group h-12 w-full rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-base font-bold text-white shadow-lg shadow-blue-600/25 hover:-translate-y-0.5 hover:from-blue-700 hover:via-indigo-700 hover:to-violet-700 hover:shadow-xl hover:shadow-blue-600/35 active:translate-y-0"
      >
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Creating your workspace…
          </>
        ) : (
          <>
            Join the quest
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </>
        )}
      </Button>

    </form>
  );
}
