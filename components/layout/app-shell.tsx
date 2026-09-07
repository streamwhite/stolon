import type { ReactNode } from "react";
import { Header } from "./header";

/**
 * Application shell: header + main content.
 * Sidebar/nav extensions can be composed here per project.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}
