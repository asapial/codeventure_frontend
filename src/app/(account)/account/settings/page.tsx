import type { Metadata } from "next";

import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = {
  title: "Settings — CodeVenture",
  description: "Update your profile, notifications, and security preferences.",
  alternates: { canonical: "/account/settings" },
  robots: { index: false, follow: false },
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/70 p-6 shadow-sm dark:border-blue-950 dark:from-card dark:to-blue-950/20"><p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">Workspace</p><h1 className="mt-2 text-3xl font-bold tracking-[-0.035em]">Settings</h1><p className="mt-2 text-sm text-muted-foreground">Profile, notifications, security, and workspace preferences.</p></header>
      <EmptyState
        title="Settings coming soon"
        description="Profile, notifications, and security settings will live here."
      />
    </div>
  );
}
