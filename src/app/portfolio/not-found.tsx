import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/ui/empty-state";

export default function PortfolioNotFound() {
  return (
    <div className="container mx-auto max-w-xl px-4 py-24">
      <EmptyState
        title="No case studies found"
        description="We could not find any case studies to show right now."
        action={
          <>
            <Link href="/" className={cn(buttonVariants(), "inline-flex")}>
              Back to home
            </Link>
            <Link
              href="/request-quote"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "ml-3 inline-flex",
              )}
            >
              Request a quote
            </Link>
          </>
        }
      />
    </div>
  );
}