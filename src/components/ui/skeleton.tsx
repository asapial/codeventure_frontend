import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-xl bg-gradient-to-r from-muted via-blue-100/60 to-muted bg-[length:200%_100%] dark:via-blue-950/60", className)}
      aria-hidden="true"
      {...props}
    />
  );
}

export { Skeleton };
