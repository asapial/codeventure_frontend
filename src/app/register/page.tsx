import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { AuthShell } from "@/components/shared/auth-shell";
import { RegistrationForm } from "./_components/registration-form";

export const metadata: Metadata = { title: "Create your account", description: "Create your CodeVenture client workspace.", alternates: { canonical: "/register" }, robots: { index: false, follow: false } };

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ invite?: string }> }) {
  const session = await getSession();
  const sp = await searchParams;
  if (session) redirect("/dashboard");
  const inviteToken = sp.invite && sp.invite.length >= 20 && sp.invite.length <= 256 ? sp.invite : undefined;
  return (
    <AuthShell
      variant="sign-up"
      eyebrow={inviteToken ? "You’re invited" : "Get started"}
      title="Create your workspace"
      description={inviteToken ? "Finish a few details to join your organisation’s CodeVenture workspace." : "Tell us a little about yourself and your secure client workspace will be ready."}
      after={<><span>Already have an account? </span><Link href="/sign-in" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400">Sign in</Link></>}>
      <RegistrationForm inviteToken={inviteToken} />
      <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">By creating an account, you agree to our <Link href="/legal/terms-of-service" className="underline hover:text-foreground">Terms</Link>, <Link href="/legal/privacy-policy" className="underline hover:text-foreground">Privacy Policy</Link>, and <Link href="/legal/acceptable-use" className="underline hover:text-foreground">Acceptable Use</Link>.</p>
    </AuthShell>
  );
}
