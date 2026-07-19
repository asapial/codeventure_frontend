import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { getSession } from "@/lib/auth/session";

import { AccountSidebar } from "./_components/account-sidebar";

interface Props {
  children: ReactNode;
}

export default async function AccountLayout({ children }: Props) {
  const session = await getSession();
  if (!session) {
    redirect("/sign-in?from=/account");
  }

  return (
    <div className="min-h-[calc(100svh-4.5rem)] bg-gradient-to-b from-blue-50/60 via-background to-background dark:from-blue-950/20">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="grid gap-7 lg:grid-cols-[17rem_1fr]">
        <AccountSidebar
          user={{
            name: session.user.name,
            email: session.user.email,
            role: session.user.role,
          }}
        />
        <section className="min-w-0" aria-label="Account content">
          {children}
        </section>
      </div>
      </div>
    </div>
  );
}
