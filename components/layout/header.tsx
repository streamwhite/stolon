"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/navigation/language-switcher";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { project } from "@/lib/config/project";
import { cn } from "@/lib/utils";

/** Top navigation bar with project-configured links. */
export function Header() {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
        <Link href="/" className="font-semibold">
          {project.name}
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 sm:flex">
          {project.navigation.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              size="sm"
              // Renders a <Link>, not a native <button>
              nativeButton={false}
              className={cn(
                pathname === item.href && "bg-accent text-accent-foreground",
              )}
              render={
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                />
              }
            >
              {t(item.labelKey)}
            </Button>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
