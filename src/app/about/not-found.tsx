import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/ui/empty-state";

export default function AboutNotFound() {
  return (
    <div className="container mx-auto max-w-xl px-4 py-24">
      <EmptyState
        title="About page unavailable"
        description="We could not load the about page right now."
        action={
          <>
            <Link href="/" className={cn(buttonVariants(), "inline-flex")}>
              Back to home
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "ml-3 inline-flex",
              )}
            >
              Contact us
            </Link>
          </>
        }
      />
    </div>
  );
}