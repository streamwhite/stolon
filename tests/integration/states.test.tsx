import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EmptyState } from "@/components/feedback/empty-state";
import { LoadingState } from "@/components/feedback/loading-state";
import { I18nProvider } from "@/lib/i18n/client";

function renderWithI18n(ui: React.ReactElement) {
  return render(<I18nProvider locale="en">{ui}</I18nProvider>);
}

describe("EmptyState", () => {
  it("renders translated defaults", () => {
    renderWithI18n(<EmptyState />);
    expect(screen.getByText("Nothing here yet")).toBeInTheDocument();
  });

  it("renders custom title and action", () => {
    renderWithI18n(
      <EmptyState
        title="No users"
        action={<button type="button">Add user</button>}
      />,
    );
    expect(screen.getByText("No users")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add user" }),
    ).toBeInTheDocument();
  });
});

describe("LoadingState", () => {
  it("exposes a status role", () => {
    renderWithI18n(<LoadingState />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
