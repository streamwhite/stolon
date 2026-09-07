"use client";

import { AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ERROR_MESSAGE_KEYS } from "@/lib/api/error-messages";
import { ApiError } from "@/lib/api/errors";
import { cn } from "@/lib/utils";

/** User-friendly error display with optional retry. Never shows raw errors. */
export function ErrorState({
  className,
  error,
  title,
  onRetry,
  onGoBack,
}: {
  className?: string;
  error?: unknown;
  title?: string;
  onRetry?: () => void;
  onGoBack?: () => void;
}) {
  const { t } = useTranslation("errors");
  const commonT = useTranslation("common").t;

  const messageKey =
    error instanceof ApiError
      ? (ERROR_MESSAGE_KEYS[error.category] ?? ERROR_MESSAGE_KEYS.unknown)
      : ERROR_MESSAGE_KEYS.unknown;

  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 py-12 text-center",
        className,
      )}
    >
      <AlertTriangle aria-hidden className="size-8 text-destructive" />
      <p className="font-medium">{title ?? commonT("states.errorTitle")}</p>
      <p className="max-w-sm text-sm text-muted-foreground">{t(messageKey)}</p>
      <div className="mt-1 flex gap-2">
        {onRetry ? (
          <Button variant="outline" size="sm" onClick={onRetry}>
            {commonT("actions.retry")}
          </Button>
        ) : null}
        {onGoBack ? (
          <Button variant="ghost" size="sm" onClick={onGoBack}>
            {commonT("actions.back")}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
