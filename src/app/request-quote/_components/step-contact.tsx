"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { QuoteDraft } from "@/types/quote";

function FieldError({ name }: { name: keyof QuoteDraft }) {
  const {
    formState: { errors },
  } = useFormContext<QuoteDraft>();
  const msg = errors[name]?.message;
  if (!msg) return null;
  return (
    <p role="alert" className="text-sm text-destructive">
      {String(msg)}
    </p>
  );
}

export function StepContact() {
  const { register } = useFormContext<QuoteDraft>();
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="fullName">Full name</Label>
        <Input
          id="fullName"
          autoComplete="name"
          aria-invalid={Boolean(useFormContextErr("fullName"))}
          {...register("fullName")}
        />
        <FieldError name="fullName" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Work email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          aria-invalid={Boolean(useFormContextErr("email"))}
          {...register("email")}
        />
        <FieldError name="email" />
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            {...register("phone")}
          />
          <FieldError name="phone" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="company">Company (optional)</Label>
          <Input
            id="company"
            autoComplete="organization"
            {...register("company")}
          />
          <FieldError name="company" />
        </div>
      </div>
    </div>
  );
}

// Tiny helper so we can both read the error and bind aria-invalid in one hook call.
function useFormContextErr(name: keyof QuoteDraft): unknown {
  const {
    formState: { errors },
  } = useFormContext<QuoteDraft>();
  return errors[name];
}