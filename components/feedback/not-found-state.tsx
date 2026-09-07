"use client";

import { SearchX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** 404 fallback for unknown pages or missing resources. */
export function NotFoundState({
  className,
  title,
  description,
}: {
  className?: string;
  title?: string;
  description?: string;
}) {
  const { t } = useTranslation("common");
  const router = useRouter();
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-12 text-center",
        className,
      )}
    >
      <SearchX aria-hidden className="size-8 text-muted-foreground" />
      <p className="font-medium">{title ?? t("states.notFoundTitle")}</p>
      <p className="max-w-sm text-sm text-muted-foreground">
        {description ?? t("states.notFoundDescription")}
      </p>
      <Button variant="outline" size="sm" onClick={() => router.back()}>
        {t("actions.back")}
      </Button>
    </div>
  );
}
