import { AuthSkeleton } from "@/components/shared/auth-skeleton";

export default function SignInLoading() {
  return <AuthSkeleton variant="sign-in" fieldCount={2} />;
}