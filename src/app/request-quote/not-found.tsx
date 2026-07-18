import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function RequestQuoteNotFound() {
  return (
    <div className="container mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="mt-2 text-3xl font-semibold">Quote not found</h1>
      <p className="mt-3 text-muted-foreground">
        The quote you are looking for does not exist or has expired.
      </p>
      <Link
        href="/request-quote"
        className={cn(buttonVariants(), "mt-6")}
      >
        Start a new quote
      </Link>
    </div>
  );
}