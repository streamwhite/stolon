import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "@/components/ui/button";
import { I18nProvider } from "@/lib/i18n/client";

function renderWithI18n(ui: React.ReactElement) {
  return render(<I18nProvider locale="en">{ui}</I18nProvider>);
}

describe("Button render prop", () => {
  it("renders anchor semantics for link buttons without Base UI errors", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    renderWithI18n(
      <Button nativeButton={false} render={<a href="/dashboard" />}>
        Dashboard
      </Button>,
    );
    const link = screen.getByRole("button", { name: "Dashboard" });
    expect(link).toHaveAttribute("href", "/dashboard");
    expect(link.tagName).toBe("A");
    const baseUiErrors = consoleError.mock.calls.filter((args) =>
      args.some((arg) => typeof arg === "string" && arg.includes("Base UI")),
    );
    consoleError.mockRestore();
    expect(baseUiErrors).toHaveLength(0);
  });

  it("keeps native button semantics by default", () => {
    renderWithI18n(<Button>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });
});
