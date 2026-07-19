import type { ReactNode } from "react";

interface OAuthProvider {
  id: string;
  label: string;
  icon: ReactNode;
}

interface OAuthRowProps {
  /** Optional list of providers. Defaults to Google + GitHub buttons. */
  providers?: OAuthProvider[];
  /** Shown as muted "or" between social and email form. */
  dividerLabel?: string;
}

const defaultProviders: OAuthProvider[] = [
  {
    id: "google",
    label: "Google",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-4"
      >
        <path
          fill="#4285F4"
          d="M21.6 12.227c0-.709-.063-1.39-.182-2.045H12v3.868h5.382a4.6 4.6 0 0 1-1.995 3.018v2.51h3.226c1.89-1.74 2.987-4.305 2.987-7.35Z"
        />
        <path
          fill="#34A853"
          d="M12 22c2.7 0 4.964-.895 6.618-2.422l-3.226-2.504c-.895.6-2.04.955-3.392.955-2.605 0-4.81-1.76-5.595-4.123H3.073v2.59A9.997 9.997 0 0 0 12 22Z"
        />
        <path
          fill="#FBBC05"
          d="M6.405 13.906a6.005 6.005 0 0 1 0-3.812V7.504H3.073a10.013 10.013 0 0 0 0 8.992l3.332-2.59Z"
        />
        <path
          fill="#EA4335"
          d="M12 6.58c1.468 0 2.786.504 3.823 1.495l2.868-2.868C16.96 3.59 14.7 2.667 12 2.667 8.09 2.667 4.708 4.9 3.073 8.118l3.332 2.59C7.19 8.342 9.395 6.58 12 6.58Z"
        />
      </svg>
    ),
  },
  {
    id: "github",
    label: "GitHub",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-4 fill-foreground"
      >
        <path d="M12 .5a11.5 11.5 0 0 0-3.637 22.413c.575.106.786-.25.786-.555v-2.16c-3.2.696-3.876-1.362-3.876-1.362-.523-1.33-1.278-1.683-1.278-1.683-1.045-.715.08-.7.08-.7 1.156.081 1.764 1.187 1.764 1.187 1.027 1.76 2.694 1.252 3.35.957.103-.744.402-1.252.731-1.541-2.554-.291-5.236-1.278-5.236-5.687 0-1.257.449-2.285 1.184-3.09-.118-.292-.513-1.46.113-3.043 0 0 .966-.31 3.165 1.18a10.99 10.99 0 0 1 5.764 0c2.198-1.49 3.162-1.18 3.162-1.18.629 1.583.234 2.75.116 3.043.737.805 1.182 1.833 1.182 3.09 0 4.422-2.687 5.392-5.247 5.676.413.358.78 1.06.78 2.137v3.169c0 .31.209.667.792.553A11.5 11.5 0 0 0 12 .5Z" />
      </svg>
    ),
  },
];

export function OAuthRow({
  providers = defaultProviders,
  dividerLabel = "or use email",
}: OAuthRowProps) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {providers.map((provider) => (
          <button
            key={provider.id}
            type="button"
            onClick={() => {
              // OAuth is not enabled yet — surface gracefully.
              if (typeof window !== "undefined") {
                window.alert(
                  `Continue with ${provider.label} will be available soon.`,
                );
              }
            }}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-blue-100 bg-background/80 px-3 text-xs font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-blue-950 dark:hover:border-blue-900 dark:hover:bg-blue-950/40 dark:hover:text-blue-300"
          >
            {provider.icon}
            <span className="hidden sm:inline">{provider.label}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3" role="separator" aria-label={dividerLabel}>
        <span className="h-px flex-1 bg-border" />
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          {dividerLabel}
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>
    </div>
  );
}
