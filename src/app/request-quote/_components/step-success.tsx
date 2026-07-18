import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  estimatedResponseBy?: string;
}

export function StepSuccess({ id, estimatedResponseBy }: Props) {
  const eta = estimatedResponseBy
    ? new Date(estimatedResponseBy).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="container mx-auto max-w-xl px-4 py-24">
      <Card>
        <CardHeader>
          <CardTitle>Quote request received</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Thanks — a member of our team will review your project and reply with
            a tailored proposal.
            {eta ? <> You can expect a response by <strong>{eta}</strong>.</> : null}
          </p>
          <p className="text-xs text-muted-foreground">
            Reference: <span className="font-mono">{id}</span>
          </p>
          <Link href="/" className={cn(buttonVariants(), "mt-2")}>
            Back to home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}