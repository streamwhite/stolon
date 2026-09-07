"use client";

import { Inbox } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

/** Shown when a data list is empty. */
export function EmptyState({
  className,
  title,
  description,
  action,
  icon,
}: {
  className?: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  const { t } = useTranslation("common");
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-12 text-center",
        className,
      )}
    >
      <div aria-hidden className="text-muted-foreground">
        {icon ?? <Inbox className="size-8" />}
      </div>
      <p className="font-medium">{title ?? t("states.empty")}</p>
      <p className="max-w-sm text-sm text-muted-foreground">
        {description ?? t("states.emptyDescription")}
      </p>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
