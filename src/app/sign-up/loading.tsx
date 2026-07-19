import { AuthSkeleton } from "@/components/shared/auth-skeleton";

export default function SignUpLoading() {
  return <AuthSkeleton variant="sign-up" fieldCount={4} />;
}