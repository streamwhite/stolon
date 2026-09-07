"use client";

import { ShieldOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Shown when the user lacks permission for a page or action. */
export function UnauthorizedState({ className }: { className?: string }) {
  const { t } = useTranslation("common");
  const router = useRouter();
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-12 text-center",
        className,
      )}
    >
      <ShieldOff aria-hidden className="size-8 text-muted-foreground" />
      <p className="font-medium">{t("states.unauthorizedTitle")}</p>
      <p className="max-w-sm text-sm text-muted-foreground">
        {t("states.unauthorizedDescription")}
      </p>
      <Button variant="outline" size="sm" onClick={() => router.back()}>
        {t("actions.back")}
      </Button>
    </div>
  );
}
