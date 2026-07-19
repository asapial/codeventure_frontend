import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/ui/empty-state";

export default function CaseStudyNotFound() {
  return (
    <div className="container mx-auto max-w-xl px-4 py-24">
      <EmptyState
        title="Case study not found"
        description="The case study you are looking for does not exist or has been archived."
        action={
          <>
            <Link href="/portfolio" className={cn(buttonVariants(), "inline-flex")}>
              Browse all case studies
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