import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SessionUser } from "@/types/auth";

import type { DashboardRole } from "../../_components/dashboard-nav-config";

interface Props {
  role: DashboardRole;
  user: Pick<SessionUser, "name" | "email">;
}

/**
 * Role-switched settings form.
 *
 * Owners see the full personal + workspace settings. Editors and viewers see
 * only the profile / notification / security controls that belong to them.
 * Admins get a different shape entirely since their settings are
 * platform-wide rather than workspace-bound.
 */
export function RoleSettingsPanel({ role, user }: Props) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <Row label="Name" value={user.name} />
          <Row label="Email" value={user.email} />
          <Row label="Role" value={role} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Notification preferences will appear here. Controls vary by role.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Security</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Two-factor authentication, password, and active sessions will live
            here.
          </p>
        </CardContent>
      </Card>

      {role === "owner" ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Workspace</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Workspace-level controls such as branding, custom domains, and
              data residency are visible only to owners.
            </p>
          </CardContent>
        </Card>
      ) : null}

      {role === "admin" ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Platform administration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Platform-wide toggles, feature flags, and audit log access.
            </p>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 border-b border-border/60 py-2 last:border-b-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}