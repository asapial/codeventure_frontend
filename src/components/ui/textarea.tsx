import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[110px] w-full rounded-xl border border-blue-100 bg-background/80 px-3.5 py-3 text-sm shadow-sm shadow-slate-950/[0.02] transition-all dark:border-blue-950",
        "ring-offset-background placeholder:text-muted-foreground",
        "hover:border-blue-200 focus-visible:border-blue-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/10 dark:hover:border-blue-900",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive",
        className,
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
