"use client";

import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

/** Centered loading indicator for data-driven screens. */
export function LoadingState({
  className,
  label,
}: {
  className?: string;
  label?: string;
}) {
  const { t } = useTranslation("common");
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center gap-2 py-12",
        className,
      )}
    >
      <Loader2
        aria-hidden
        className="size-6 animate-spin text-muted-foreground"
      />
      <p className="text-sm text-muted-foreground">
        {label ?? t("states.loading")}
      </p>
    </div>
  );
}
