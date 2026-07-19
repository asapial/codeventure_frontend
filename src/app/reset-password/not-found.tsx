import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/ui/empty-state";

export default function ResetPasswordNotFound() {
  return (
    <div className="container mx-auto max-w-md px-4 py-24">
      <EmptyState
        title="Invalid or expired link"
        description="This reset link is invalid or has expired."
        action={
          <Link
            href="/forgot-password"
            className={cn(buttonVariants(), "inline-flex")}
          >
            Request a new link
          </Link>
        }
      />
    </div>
  );
}