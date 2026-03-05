import { Suspense } from "react";
import VerifyInviteForm from "./VerifyInviteForm";

// 1. This configuration works here because this is a Server Component (no "use client")
export const dynamic = "force-dynamic";

export default function VerifyInvitePage() {
  return (
    // 2. We wrap the Client Component in a Suspense boundary.
    // This satisfies Next.js requirement for useSearchParams.
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading verification...
        </div>
      }
    >
      <VerifyInviteForm />
    </Suspense>
  );
}
