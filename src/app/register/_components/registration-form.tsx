"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  registerSchema,
  scorePassword,
  type PasswordStrength,
  type RegisterInput,
} from "@/types/auth";
import { ApiError } from "@/lib/api/auth";
import { register as registerApi } from "@/lib/api/register";

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

interface Props {
  inviteToken?: string;
}

export function RegistrationForm({ inviteToken }: Props) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.input<typeof registerSchema>, unknown, z.output<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      signupSource: undefined,
      referralCode: "",
      inviteToken: inviteToken ?? "",
      acceptTerms: false as unknown as true, // overwritten by checkbox
      acceptPrivacy: false as unknown as true,
      marketingOptIn: false,
      website: "",
    },
  });

  const password = useWatch({ control, name: "password" }) ?? "";
  const strength = scorePassword(password);

  async function onSubmit(values: RegisterInput) {
    if (values.website && values.website.length > 0) {
      // Honeypot — silently redirect to the verify-email page so bots don't
      // realise they were caught.
      toast.success("Almost there — check your email.");
      router.replace("/verify-email");
      return;
    }
    try {
      setSubmitting(true);
      const result = await registerApi({
        ...values,
        inviteToken: values.inviteToken?.length ? values.inviteToken : undefined,
        referralCode: values.referralCode?.length ? values.referralCode : undefined,
      });
      toast.success("Account created — check your email to verify.");
      const qs = new URLSearchParams({ email: result.email });
      router.replace(`/verify-email?${qs.toString()}`);
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 409) {
          toast.error("An account with that email already exists.");
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
      {/* Honeypot */}
      <div aria-hidden="true" className="hidden">
        <Label htmlFor="reg-website">Website</Label>
        <Input
          id="reg-website"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {inviteToken ? (
        <input type="hidden" {...register("inviteToken")} />
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="reg-firstName">First name</Label>
          <Input
            id="reg-firstName"
            autoComplete="given-name"
            aria-invalid={!!errors.firstName}
            {...register("firstName")}
          />
          {errors.firstName ? (
            <p className="text-sm text-destructive">{errors.firstName.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="reg-lastName">Last name</Label>
          <Input
            id="reg-lastName"
            autoComplete="family-name"
            aria-invalid={!!errors.lastName}
            {...register("lastName")}
          />
          {errors.lastName ? (
            <p className="text-sm text-destructive">{errors.lastName.message}</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reg-email">Work email</Label>
        <Input
          id="reg-email"
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
        <Label htmlFor="reg-password">Password</Label>
        <Input
          id="reg-password"
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

      {!inviteToken ? (
        <div className="space-y-2">
          <Label htmlFor="reg-referral">Referral code (optional)</Label>
          <Input
            id="reg-referral"
            autoComplete="off"
            placeholder="FRIEND-2026"
            aria-invalid={!!errors.referralCode}
            {...register("referralCode")}
          />
        </div>
      ) : null}

      <div className="space-y-2 text-sm">
        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-input"
            {...register("acceptTerms")}
          />
          <span className="text-muted-foreground">
            I agree to the{" "}
            <a
              href="/legal/terms-of-service"
              className="text-primary underline-offset-4 hover:underline"
            >
              Terms of Service
            </a>
            .
          </span>
        </label>
        {errors.acceptTerms ? (
          <p className="text-sm text-destructive">
            {errors.acceptTerms.message as string}
          </p>
        ) : null}

        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-input"
            {...register("acceptPrivacy")}
          />
          <span className="text-muted-foreground">
            I have read the{" "}
            <a
              href="/legal/privacy-policy"
              className="text-primary underline-offset-4 hover:underline"
            >
              Privacy Policy
            </a>
            .
          </span>
        </label>
        {errors.acceptPrivacy ? (
          <p className="text-sm text-destructive">
            {errors.acceptPrivacy.message as string}
          </p>
        ) : null}

        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-input"
            {...register("marketingOptIn")}
          />
          <span className="text-muted-foreground">
            Send me product updates and tips. You can unsubscribe any time.
          </span>
        </label>
      </div>

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
