"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/feedback/error-state";
import { PageContainer } from "@/components/layout/page-container";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Integration point for structured logging / observability.
    console.error(error);
  }, [error]);

  return (
    <PageContainer className="flex min-h-svh items-center">
      <ErrorState className="w-full max-w-lg" onRetry={reset} />
    </PageContainer>
  );
}
