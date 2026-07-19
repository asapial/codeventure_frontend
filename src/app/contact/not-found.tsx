import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/ui/empty-state";

export default function ContactNotFound() {
  return (
    <div className="container mx-auto max-w-xl px-4 py-24">
      <EmptyState
        title="Contact page unavailable"
        description="We could not load this page right now."
        action={
          <Link href="/" className={cn(buttonVariants(), "inline-flex")}>
            Back to home
          </Link>
        }
      />
    </div>
  );
}
