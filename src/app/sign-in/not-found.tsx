import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/ui/empty-state";

export default function SignInNotFound() {
  return (
    <div className="container mx-auto max-w-md px-4 py-24">
      <EmptyState
        title="Sign-in unavailable"
        description="We could not find the sign-in page."
        action={
          <Link href="/" className={cn(buttonVariants(), "inline-flex")}>
            Back to home
          </Link>
        }
      />
    </div>
  );
}