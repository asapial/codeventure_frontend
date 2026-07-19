import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/ui/empty-state";

export default function ForgotPasswordNotFound() {
  return (
    <div className="container mx-auto max-w-md px-4 py-24">
      <EmptyState
        title="Page unavailable"
        description="We could not find this page."
        action={
          <Link href="/sign-in" className={cn(buttonVariants(), "inline-flex")}>
            Back to sign-in
          </Link>
        }
      />
    </div>
  );
}