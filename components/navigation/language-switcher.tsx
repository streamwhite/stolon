"use client";

import { Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { project } from "@/lib/config/project";
import { LOCALE_COOKIE } from "@/lib/i18n/config";

const LOCALE_LABELS: Record<string, string> = {
  en: "English",
  zh: "中文",
};

/** Switches the active locale via cookie and refreshes server content. */
export function LanguageSwitcher() {
  const router = useRouter();
  const { t, i18n } = useTranslation("common");

  const changeLocale = (locale: string) => {
    // biome-ignore lint/suspicious/noDocumentCookie: simplest client-side locale persistence
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
    void i18n.changeLanguage(locale);
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label={t("language.label")}
          />
        }
      >
        <Globe className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {project.supportedLocales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => changeLocale(locale)}
            aria-current={i18n.language === locale ? "true" : undefined}
          >
            {LOCALE_LABELS[locale] ?? locale}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
