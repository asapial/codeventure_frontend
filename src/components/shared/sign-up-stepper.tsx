import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SignUpStepperProps {
  step: 1 | 2 | 3;
  className?: string;
}

const steps = [
  { id: 1, label: "You" },
  { id: 2, label: "Secure" },
  { id: 3, label: "Finalize" },
] as const;

export function SignUpStepper({ step, className }: SignUpStepperProps) {
  return (
    <ol
      className={cn(
        "mb-7 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em]",
        className,
      )}
      aria-label="Sign-up progress"
    >
      {steps.map((s, index) => {
        const isComplete = step > s.id;
        const isCurrent = step === s.id;
        return (
          <li
            key={s.id}
            aria-current={isCurrent ? "step" : undefined}
            className="flex flex-1 items-center gap-2"
          >
            <span
              className={cn(
                "grid size-6 place-items-center rounded-full text-[10px] font-bold transition-colors",
                isComplete && "bg-emerald-500 text-white",
                isCurrent && "bg-blue-600 text-white shadow-md shadow-blue-600/30",
                !isComplete && !isCurrent && "bg-muted text-muted-foreground",
              )}
            >
              {isComplete ? (
                <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
              ) : (
                s.id
              )}
            </span>
            <span
              className={cn(
                "whitespace-nowrap",
                isCurrent ? "text-blue-700 dark:text-blue-300" : "text-muted-foreground",
                isComplete && "text-emerald-600 dark:text-emerald-400",
              )}
            >
              {s.label}
            </span>
            {index < steps.length - 1 ? (
              <span
                aria-hidden="true"
                className={cn(
                  "h-px flex-1 transition-colors",
                  isComplete ? "bg-emerald-400/70" : "bg-border",
                )}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
