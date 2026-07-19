import { cn } from "@/lib/utils";

interface UserAvatarProps {
  /** Display name used for initials fallback. */
  name: string;
  /** Optional remote avatar URL. Falls back to initials when missing. */
  avatarUrl?: string | null;
  /** Tailwind size utility. Defaults to `size-9`. */
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  xs: { box: "size-7", text: "text-[10px]" },
  sm: { box: "size-8", text: "text-xs" },
  md: { box: "size-9", text: "text-sm" },
  lg: { box: "size-11", text: "text-base" },
} as const;

/** Build 1–2 character initials from a display name. */
function getInitials(name: string): string {
  const cleaned = name.trim().replace(/\s+/g, " ");
  if (!cleaned) return "?";
  const parts = cleaned.split(" ");
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  const combined = `${first}${last}`.toUpperCase();
  return combined || cleaned[0]!.toUpperCase();
}

/**
 * Server-safe avatar. Renders `<img>` if `avatarUrl` is provided,
 * otherwise a gradient circle with the user's initials.
 *
 * Plain `<img>` is intentional — `next/image` would require remote
 * patterns to be configured per host and we'd rather keep this
 * dependency-free.
 */
export function UserAvatar({
  name,
  avatarUrl,
  size = "md",
  className,
}: UserAvatarProps) {
  const { box, text } = sizeMap[size];
  const initials = getInitials(name);

  if (avatarUrl) {
    return (
      <span
        className={cn(
          "relative inline-flex shrink-0 overflow-hidden rounded-full ring-1 ring-blue-100 dark:ring-blue-950",
          box,
          className,
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarUrl}
          alt={name}
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 font-bold text-white shadow-sm shadow-blue-600/20 ring-1 ring-blue-200/60 dark:ring-blue-900/60",
        box,
        text,
        className,
      )}
    >
      {initials}
    </span>
  );
}