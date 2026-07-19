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
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
      <EmptyState
        title="Settings coming soon"
        description="Profile, notifications, and security settings will live here."
      />
    </div>
  );
}