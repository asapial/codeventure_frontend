import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getSession } from "@/lib/auth/session";

import { SignUpForm } from "./_components/sign-up-form";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create a CodeVenture client account.",
  alternates: { canonical: "/sign-up" },
  robots: { index: false, follow: false },
};

export default async function SignUpPage() {
  const session = await getSession();
  if (session) redirect("/account");

  return (
    <div className="bg-gradient-to-b from-background to-muted/30">
      <section className="container mx-auto max-w-md px-4 py-16">
        <header className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Free to start. No credit card required.
          </p>
        </header>

        <div className="mt-8 rounded-lg border border-border bg-card p-6 shadow-sm">
          <SignUpForm />
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>

        <p className="mt-2 text-center text-xs text-muted-foreground">
          By creating an account you agree to our{" "}
          <Link href="/terms" className="underline-offset-4 hover:underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline-offset-4 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            ← Back to home
          </Link>
        </div>
      </section>
    </div>
  );
}