"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, LogIn, Mail, ShieldCheck } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { AuthField } from "@/components/shared/auth-field";
import { signInSchema, type SignInInput } from "@/types/auth";
import { ApiError, signIn } from "@/lib/api/auth";

interface Props {
  redirectTo: string;
}

export function SignInForm({ redirectTo }: Props) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.input<typeof signInSchema>, unknown, z.output<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
      website: "",
    },
  });

  const remember = useWatch({ control, name: "rememberMe" }) ?? false;

  async function onSubmit(values: SignInInput) {
    if (values.website && values.website.length > 0) {
      // Honeypot — silently "succeed" without calling the API.
      toast.success("Signed in.");
      router.replace(redirectTo);
      return;
    }
    try {
      setSubmitting(true);
      await signIn(values);
      toast.success("Welcome back!");
      router.replace(redirectTo);
      router.refresh();
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 401) {
          toast.error("Email or password is incorrect.");
        } else if (err.body.fieldErrors) {
          const first = Object.values(err.body.fieldErrors).flat()[0];
          toast.error(first ?? err.body.message);
        } else {
          toast.error(err.body.message);
        }
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Could not sign in. Please try again.");
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
      <AuthField
        label="Work email"
        type="email"
        placeholder="you@company.com"
        autoComplete="email"
        icon={<Mail className="size-4" aria-hidden="true" />}
        aria-invalid={!!errors.email}
        aria-errormessage={errors.email?.message ?? null}
        hint="We'll never share your email."
        {...register("email")}
      />

      <AuthField
        label="Password"
        type="password"
        placeholder="••••••••"
        autoComplete="current-password"
        reveal
        icon={<ShieldCheck className="size-4" aria-hidden="true" />}
        aria-invalid={!!errors.password}
        aria-errormessage={errors.password?.message ?? null}
        trailing={
          <Link
            href="/forgot-password"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400"
          >
            Forgot?
          </Link>
        }
        {...register("password")}
      />

      <button
        type="button"
        role="switch"
        aria-checked={remember}
        onClick={(event) => {
          const target = event.currentTarget;
          const input = target.parentElement?.querySelector<HTMLInputElement>(
            "input[name='rememberMe']",
          );
          if (input) {
            input.click();
          }
        }}
        className="group/check flex w-full items-center justify-between gap-3 rounded-xl border border-blue-100 bg-blue-50/40 px-3.5 py-3 text-left text-sm transition-all hover:border-blue-200 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-blue-950 dark:bg-blue-950/20 dark:hover:border-blue-900 dark:hover:bg-blue-950/40"
      >
        <div className="space-y-0.5">
          <p className="font-semibold text-foreground">Keep me signed in</p>
          <p className="text-xs text-muted-foreground">
            Skip the password on this device for 30 days.
          </p>
        </div>
        <span
          className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
            remember ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700"
          }`}
        >
          <span
            aria-hidden="true"
            className={`inline-block size-4 transform rounded-full bg-white shadow transition ${
              remember ? "translate-x-4" : "translate-x-0.5"
            }`}
          />
        </span>
        <input
          type="checkbox"
          className="sr-only"
          aria-label="Remember me on this device"
          {...register("rememberMe")}
        />
      </button>

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
            Signing you in…
          </>
        ) : (
          <>
            <LogIn className="size-4 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
            Step inside
          </>
        )}
      </Button>

    </form>
  );
}
