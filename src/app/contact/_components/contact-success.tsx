"use client";

import { Button } from "@/components/ui/button";
import type { ContactSubmissionResponse } from "@/types/contact";

interface Props {
  receipt: ContactSubmissionResponse;
  onReset: () => void;
}

export function ContactSuccess({ receipt, onReset }: Props) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-lg border border-border bg-card p-8 text-center"
    >
      <h2 className="text-2xl font-semibold tracking-tight">
        Thanks — message received
      </h2>
      <p className="mt-3 text-muted-foreground">
        We&rsquo;ll reply within one business day. Keep this reference handy in
        case you need to follow up.
      </p>
      <p className="mt-4 font-mono text-sm text-muted-foreground">
        Reference: <span className="font-semibold">{receipt.id}</span>
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Button type="button" variant="outline" onClick={onReset}>
          Send another message
        </Button>
      </div>
    </div>
  );
}
