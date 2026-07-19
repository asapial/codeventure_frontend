import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { AuthShell } from "@/components/shared/auth-shell";
import { SignUpForm } from "./_components/sign-up-form";

export const metadata: Metadata = { title: "Create account", description: "Create a CodeVenture client account.", alternates: { canonical: "/sign-up" }, robots: { index: false, follow: false } };

export default async function SignUpPage() {
  const session = await getSession();
  if (session) redirect("/account");
  return (
    <AuthShell eyebrow="Get started" title="Create your workspace" description="Set up your secure CodeVenture account and keep every project detail within reach."
      after={<><span>Already have an account? </span><Link href="/sign-in" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400">Sign in</Link></>}>
      <SignUpForm />
      <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">By creating an account, you agree to our <Link href="/legal/terms" className="underline hover:text-foreground">Terms</Link> and <Link href="/legal/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.</p>
    </AuthShell>
  );
}
