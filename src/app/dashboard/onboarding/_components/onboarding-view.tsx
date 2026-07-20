"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Check,
  Loader2,
  Mail,
  Palette,
  Phone,
  Plus,
  Trash,
  UserPlus,
  UsersRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";
import {
  inviteTeamMember,
  revokeTeamInvitation,
  updateOnboarding,
} from "@/lib/api/portal";
import { ApiError } from "@/lib/api/client";
import type {
  OnboardingBrand,
  OnboardingBusiness,
  OnboardingContact,
  OnboardingState,
  OnboardingStep,
  OnboardingTeam,
} from "@/types/portal";

interface Props {
  state: OnboardingState;
}

type Section = "overview" | "contact" | "business" | "brand" | "team";

const STEP_TONE: Record<
  OnboardingStep["status"],
  { dot: string; pill: string; label: string }
> = {
  "not-started": {
    dot: "bg-slate-300 dark:bg-slate-700",
    pill: "bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-400",
    label: "Not started",
  },
  "in-progress": {
    dot: "bg-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,.18)]",
    pill: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    label: "In progress",
  },
  complete: {
    dot: "bg-emerald-500",
    pill:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    label: "Complete",
  },
};

function CompletionBadge({ percent }: { percent: number }) {
  const rounded = Math.max(0, Math.min(100, Math.round(percent)));
  return (
    <div className="flex items-center gap-3">
      <div className="hidden h-2 w-40 overflow-hidden rounded-full bg-blue-100 dark:bg-blue-950 sm:block">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all"
          style={{ width: `${rounded}%` }}
        />
      </div>
      <span
        aria-label={`${rounded}% complete`}
        className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300"
      >
        {rounded}% complete
      </span>
    </div>
  );
}

function StepsList({ steps }: { steps: OnboardingStep[] }) {
  if (steps.length === 0) {
    return (
      <EmptyState
        title="No steps configured"
        description="Once you save the sections below, your progress steps will appear here."
      />
    );
  }
  return (
    <ol className="space-y-3" aria-label="Onboarding steps">
      {steps
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((step) => {
          const tone = STEP_TONE[step.status];
          return (
            <li
              key={step.id}
              className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-card p-4 shadow-sm dark:border-blue-950"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "mt-1.5 size-2.5 shrink-0 rounded-full",
                  tone.dot,
                )}
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold">{step.title}</p>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                      tone.pill,
                    )}
                  >
                    {tone.label}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </li>
          );
        })}
    </ol>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1 text-xs text-destructive" role="alert">
      {message}
    </p>
  );
}

/**
 * Flatten `Record<string, string[]>` (the wire shape) to `Record<string, string>`
 * for forms that only need to show one error per field.
 */
function pickFieldErrors(
  fieldErrors?: Record<string, string[]>,
): Record<string, string> {
  if (!fieldErrors) return {};
  const out: Record<string, string> = {};
  for (const [key, list] of Object.entries(fieldErrors)) {
    if (Array.isArray(list) && list.length > 0) out[key] = list[0];
  }
  return out;
}

function SectionFormShell({
  title,
  description,
  children,
  onSubmit,
  saving,
  saveLabel = "Save changes",
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  onSubmit: () => void;
  saving: boolean;
  saveLabel?: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
        className="contents"
      >
        <CardContent className="space-y-4">{children}</CardContent>
        <div className="flex items-center justify-end gap-2 px-6 pb-6">
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Saving…
              </>
            ) : (
              <>
                <Check className="size-4" aria-hidden="true" />
                {saveLabel}
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}

function ContactSection({
  initial,
  onSaved,
}: {
  initial: OnboardingContact;
  onSaved: () => void;
}) {
  const [fullName, setFullName] = useState(initial.fullName ?? "");
  const [email, setEmail] = useState(initial.email ?? "");
  const [phone, setPhone] = useState(initial.phone ?? "");
  const [timezone, setTimezone] = useState(initial.timezone ?? "");
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSave() {
    setSaving(true);
    setErrors({});
    try {
      await updateOnboarding({
        contact: { fullName, email, phone, timezone },
      });
      toast.success("Contact details updated");
      onSaved();
    } catch (err) {
      if (err instanceof ApiError) {
        setErrors(pickFieldErrors(err.body?.fieldErrors));
        toast.error(err.body?.message ?? "Failed to save contact details");
      } else {
        toast.error("Failed to save contact details");
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <SectionFormShell
      title="Primary contact"
      description="The person we call when something needs a human answer."
      saving={saving}
      onSubmit={handleSave}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="contact-name">Full name</Label>
          <Input
            id="contact-name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            autoComplete="name"
            aria-invalid={!!errors.fullName}
          />
          <FieldError message={errors.fullName} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contact-email">Email</Label>
          <div className="relative">
            <Mail
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              aria-invalid={!!errors.email}
              className="pl-9"
            />
          </div>
          <FieldError message={errors.email} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contact-phone">Phone</Label>
          <div className="relative">
            <Phone
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="contact-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              aria-invalid={!!errors.phone}
              className="pl-9"
            />
          </div>
          <FieldError message={errors.phone} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contact-timezone">Timezone</Label>
          <Input
            id="contact-timezone"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            placeholder="America/New_York"
            aria-invalid={!!errors.timezone}
          />
          <FieldError message={errors.timezone} />
        </div>
      </div>
    </SectionFormShell>
  );
}

function BusinessSection({
  initial,
  onSaved,
}: {
  initial: OnboardingBusiness;
  onSaved: () => void;
}) {
  const [legalName, setLegalName] = useState(initial.legalName ?? "");
  const [tradingName, setTradingName] = useState(initial.tradingName ?? "");
  const [registrationNumber, setRegistrationNumber] = useState(
    initial.registrationNumber ?? "",
  );
  const [industry, setIndustry] = useState(initial.industry ?? "");
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSave() {
    setSaving(true);
    setErrors({});
    try {
      await updateOnboarding({
        business: { legalName, tradingName, registrationNumber, industry },
      });
      toast.success("Business details updated");
      onSaved();
    } catch (err) {
      if (err instanceof ApiError) {
        setErrors(pickFieldErrors(err.body?.fieldErrors));
        toast.error(err.body?.message ?? "Failed to save business details");
      } else {
        toast.error("Failed to save business details");
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <SectionFormShell
      title="Business details"
      description="The legal entity behind the workspace — used for contracts and invoicing."
      saving={saving}
      onSubmit={handleSave}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="business-legal">Legal name</Label>
          <Input
            id="business-legal"
            value={legalName}
            onChange={(e) => setLegalName(e.target.value)}
            aria-invalid={!!errors.legalName}
          />
          <FieldError message={errors.legalName} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="business-trading">Trading name</Label>
          <Input
            id="business-trading"
            value={tradingName}
            onChange={(e) => setTradingName(e.target.value)}
            aria-invalid={!!errors.tradingName}
          />
          <FieldError message={errors.tradingName} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="business-reg">Registration number</Label>
          <Input
            id="business-reg"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            aria-invalid={!!errors.registrationNumber}
          />
          <FieldError message={errors.registrationNumber} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="business-industry">Industry</Label>
          <Input
            id="business-industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            aria-invalid={!!errors.industry}
          />
          <FieldError message={errors.industry} />
        </div>
      </div>
    </SectionFormShell>
  );
}

function BrandSection({
  initial,
  onSaved,
}: {
  initial: OnboardingBrand;
  onSaved: () => void;
}) {
  const [primaryColor, setPrimaryColor] = useState(initial.primaryColor ?? "");
  const [secondaryColor, setSecondaryColor] = useState(
    initial.secondaryColor ?? "",
  );
  const [voice, setVoice] = useState(initial.voice ?? "");
  const [logoUrl, setLogoUrl] = useState(initial.logoUrl ?? "");
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSave() {
    setSaving(true);
    setErrors({});
    try {
      await updateOnboarding({
        brand: { primaryColor, secondaryColor, voice, logoUrl },
      });
      toast.success("Brand details updated");
      onSaved();
    } catch (err) {
      if (err instanceof ApiError) {
        setErrors(pickFieldErrors(err.body?.fieldErrors));
        toast.error(err.body?.message ?? "Failed to save brand details");
      } else {
        toast.error("Failed to save brand details");
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <SectionFormShell
      title="Brand & voice"
      description="The visual and tonal cues that make your product feel like yours."
      saving={saving}
      onSubmit={handleSave}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="brand-primary">Primary colour</Label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={primaryColor || "#3b82f6"}
              onChange={(e) => setPrimaryColor(e.target.value)}
              aria-label="Primary colour picker"
              className="size-10 shrink-0 cursor-pointer rounded-md border border-input bg-background"
            />
            <Input
              id="brand-primary"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              placeholder="#3b82f6"
              aria-invalid={!!errors.primaryColor}
              className="font-mono"
            />
          </div>
          <FieldError message={errors.primaryColor} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="brand-secondary">Secondary colour</Label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={secondaryColor || "#6366f1"}
              onChange={(e) => setSecondaryColor(e.target.value)}
              aria-label="Secondary colour picker"
              className="size-10 shrink-0 cursor-pointer rounded-md border border-input bg-background"
            />
            <Input
              id="brand-secondary"
              value={secondaryColor}
              onChange={(e) => setSecondaryColor(e.target.value)}
              placeholder="#6366f1"
              aria-invalid={!!errors.secondaryColor}
              className="font-mono"
            />
          </div>
          <FieldError message={errors.secondaryColor} />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="brand-logo">Logo URL</Label>
          <Input
            id="brand-logo"
            type="url"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            placeholder="https://cdn.example.com/logo.svg"
            aria-invalid={!!errors.logoUrl}
          />
          <FieldError message={errors.logoUrl} />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="brand-voice">Brand voice</Label>
          <Textarea
            id="brand-voice"
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
            placeholder="Warm, confident, and quietly technical."
            aria-invalid={!!errors.voice}
          />
          <FieldError message={errors.voice} />
        </div>
      </div>
    </SectionFormShell>
  );
}

function InviteStatusBadge({
  status,
}: {
  status: OnboardingTeam["invites"][number]["status"];
}) {
  const tone: Record<typeof status, string> = {
    pending:
      "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    accepted:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    expired:
      "bg-slate-200 text-slate-600 dark:bg-slate-900 dark:text-slate-400",
    revoked:
      "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  };
  return (
    <Badge className={cn("rounded-full", tone[status])}>{status}</Badge>
  );
}

function TeamSection({
  team,
  onSaved,
}: {
  team: OnboardingTeam;
  onSaved: () => void;
}) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("editor");
  const [inviting, setInviting] = useState(false);
  const [revokingId, setRevokingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleInvite() {
    setInviting(true);
    setErrors({});
    try {
      await inviteTeamMember({ email, role });
      toast.success(`Invitation sent to ${email}`);
      setEmail("");
      onSaved();
    } catch (err) {
      if (err instanceof ApiError) {
        setErrors(pickFieldErrors(err.body?.fieldErrors));
        toast.error(err.body?.message ?? "Failed to send invitation");
      } else {
        toast.error("Failed to send invitation");
      }
    } finally {
      setInviting(false);
    }
  }

  async function handleRevoke(id: string) {
    setRevokingId(id);
    try {
      await revokeTeamInvitation(id);
      toast.success("Invitation revoked");
      onSaved();
    } catch (err) {
      if (err instanceof ApiError) {
        toast.error(err.body?.message ?? "Failed to revoke invitation");
      } else {
        toast.error("Failed to revoke invitation");
      }
    } finally {
      setRevokingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Invite a teammate</CardTitle>
          <CardDescription>
            They'll receive an email with a link to join this workspace.
          </CardDescription>
        </CardHeader>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleInvite();
          }}
          className="contents"
        >
          <CardContent className="grid gap-4 sm:grid-cols-[1fr_180px_auto]">
            <div className="space-y-1.5">
              <Label htmlFor="invite-email">Email</Label>
              <Input
                id="invite-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                required
                aria-invalid={!!errors.email}
              />
              <FieldError message={errors.email} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="invite-role">Role</Label>
              <select
                id="invite-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none dark:bg-input/30"
              >
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
              <FieldError message={errors.role} />
            </div>
            <div className="flex items-end">
              <Button type="submit" disabled={inviting || !email}>
                {inviting ? (
                  <>
                    <Loader2
                      className="size-4 animate-spin"
                      aria-hidden="true"
                    />
                    Sending…
                  </>
                ) : (
                  <>
                    <UserPlus className="size-4" aria-hidden="true" />
                    Send invite
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Active members</CardTitle>
          <CardDescription>
            People with login access to this workspace.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {team.owner ? (
            <div className="flex items-center justify-between rounded-xl border border-blue-100 px-4 py-3 dark:border-blue-950">
              <div>
                <p className="text-sm font-semibold">{team.owner.fullName}</p>
                <p className="text-xs text-muted-foreground">
                  {team.owner.email}
                </p>
              </div>
              <Badge className="rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                Owner
              </Badge>
            </div>
          ) : null}
          {team.members.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No additional members yet.
            </p>
          ) : (
            team.members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between rounded-xl border border-blue-100 px-4 py-3 dark:border-blue-950"
              >
                <div>
                  <p className="text-sm font-semibold">{member.fullName}</p>
                  <p className="text-xs text-muted-foreground">
                    {member.email}
                  </p>
                </div>
                <Badge
                  className="rounded-full bg-slate-100 text-slate-700 capitalize dark:bg-slate-900 dark:text-slate-300"
                >
                  {member.role}
                </Badge>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Pending invitations</CardTitle>
          <CardDescription>
            Invites that haven't been accepted yet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {team.invites.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No pending invitations.
            </p>
          ) : (
            <ul className="space-y-2">
              {team.invites.map((invite) => (
                <li
                  key={invite.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-blue-100 px-4 py-3 dark:border-blue-950"
                >
                  <div>
                    <p className="text-sm font-semibold">{invite.email}</p>
                    <p className="text-xs text-muted-foreground">
                      Role: <span className="capitalize">{invite.role}</span> ·
                      Expires{" "}
                      {new Date(invite.expiresAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <InviteStatusBadge status={invite.status} />
                    {invite.status === "pending" ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        disabled={revokingId === invite.id}
                        onClick={() => handleRevoke(invite.id)}
                        className="text-rose-600 hover:text-rose-700"
                      >
                        {revokingId === invite.id ? (
                          <Loader2
                            className="size-4 animate-spin"
                            aria-hidden="true"
                          />
                        ) : (
                          <Trash className="size-4" aria-hidden="true" />
                        )}
                        Revoke
                      </Button>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function OnboardingView({ state }: Props) {
  const router = useRouter();
  const [section, setSection] = useState<Section>("overview");
  const refresh = () => router.refresh();

  return (
    <div className="space-y-6">
      <header className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/70 p-6 shadow-sm dark:border-blue-950 dark:from-card dark:to-blue-950/20 sm:flex-row sm:items-end">
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
            Workspace
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.035em]">
            Onboarding
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Finish setting up your workspace so we can hit the ground running.
          </p>
        </div>
        <CompletionBadge percent={state.completionPercent} />
      </header>

      <Tabs
        value={section}
        onValueChange={(value) => setSection(value as Section)}
        className="gap-6"
      >
        <TabsList className="h-auto w-full justify-start gap-1 rounded-2xl border border-blue-100 bg-card p-1 dark:border-blue-950">
          <TabsTrigger value="overview" className="rounded-xl">
            Overview
          </TabsTrigger>
          <TabsTrigger value="contact" className="rounded-xl">
            <Mail className="size-4" aria-hidden="true" /> Contact
          </TabsTrigger>
          <TabsTrigger value="business" className="rounded-xl">
            <UsersRound className="size-4" aria-hidden="true" /> Business
          </TabsTrigger>
          <TabsTrigger value="brand" className="rounded-xl">
            <Palette className="size-4" aria-hidden="true" /> Brand
          </TabsTrigger>
          <TabsTrigger value="team" className="rounded-xl">
            <Plus className="size-4" aria-hidden="true" /> Team
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Where you are in onboarding
              </CardTitle>
              <CardDescription>
                Each step below unlocks once we have what we need.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StepsList steps={state.steps} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick links</CardTitle>
              <CardDescription>
                Jump straight to a section if you already know what you're
                updating.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {(
                [
                  {
                    key: "contact",
                    label: "Primary contact",
                    desc: "Who's the point person?",
                  },
                  {
                    key: "business",
                    label: "Business details",
                    desc: "Legal entity and industry.",
                  },
                  {
                    key: "brand",
                    label: "Brand & voice",
                    desc: "Colours, logo, tone.",
                  },
                  {
                    key: "team",
                    label: "Team",
                    desc: "Invites and access.",
                  },
                ] as const
              ).map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setSection(item.key)}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "h-auto justify-start rounded-2xl border-blue-100 px-4 py-3 text-left hover:border-blue-300 dark:border-blue-950",
                  )}
                >
                  <div>
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className="mt-0.5 text-xs font-normal text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <ContactSection initial={state.contact} onSaved={refresh} />
        </TabsContent>

        <TabsContent value="business">
          <BusinessSection initial={state.business} onSaved={refresh} />
        </TabsContent>

        <TabsContent value="brand">
          <BrandSection initial={state.brand} onSaved={refresh} />
        </TabsContent>

        <TabsContent value="team">
          <TeamSection team={state.team} onSaved={refresh} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
