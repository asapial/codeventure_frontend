"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const strength = scorePassword(password);

  async function onSubmit(values: SignUpInput) {
    if (values.website && values.website.length > 0) {
      toast.success("Account created.");
      router.replace("/account");
      return;
    }
    try {
      setSubmitting(true);
      await signUp(values);
      toast.success("Account created — welcome to CodeVenture!");
      router.replace("/account");
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
      <div className="space-y-2">
        <Label htmlFor="signup-name">Full name</Label>
        <Input
          id="signup-name"
          autoComplete="name"
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        {errors.name ? (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email ? (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <Input
          id="signup-password"
          type="password"
          autoComplete="new-password"
          aria-invalid={!!errors.password}
          aria-describedby="signup-password-strength"
          {...register("password")}
        />
        {password.length > 0 ? (
          <div id="signup-password-strength" className="space-y-1">
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
        <Label htmlFor="signup-confirm">Confirm password</Label>
        <Input
          id="signup-confirm"
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

      <label className="flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 rounded border-input"
          aria-invalid={!!errors.acceptTerms}
          {...register("acceptTerms")}
        />
        <span className="text-muted-foreground">
          I agree to the{" "}
          <Link
            href="/terms"
            className="text-foreground underline-offset-4 hover:underline"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-foreground underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </span>
      </label>
      {errors.acceptTerms ? (
        <p className="text-sm text-destructive">{errors.acceptTerms.message}</p>
      ) : null}

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-input"
          {...register("marketingOptIn")}
        />
        <span className="text-muted-foreground">
          Email me product updates and tips
        </span>
      </label>

      {/* Honeypot */}
      <div aria-hidden="true" className="hidden">
        <Label htmlFor="signup-website">Website</Label>
        <Input
          id="signup-website"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
