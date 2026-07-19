import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { AuthShell } from "@/components/shared/auth-shell";
import { SignInForm } from "./_components/sign-in-form";

export const metadata: Metadata = { title: "Sign in", description: "Sign in to the CodeVenture client portal.", alternates: { canonical: "/sign-in" }, robots: { index: false, follow: false } };

export default async function SignInPage({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
  const session = await getSession();
  const sp = await searchParams;
  if (session) redirect(sp.from && sp.from.startsWith("/") ? sp.from : "/dashboard");

  return (
    <AuthShell
      variant="sign-in"
      eyebrow="Client portal"
      title="Welcome back"
      description="Sign in to manage projects, billing, and conversations with your CodeVenture team."
      after={<><span>New here? </span><Link href="/sign-up" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400">Create an account</Link><span className="mx-2 text-border">·</span><Link href="/forgot-password" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400">Reset password</Link></>}>
      <SignInForm redirectTo={sp.from ?? "/dashboard"} />
      <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">By signing in, you agree to our <Link href="/legal/terms" className="underline hover:text-foreground">Terms</Link> and <Link href="/legal/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.</p>
    </AuthShell>
  );
}
