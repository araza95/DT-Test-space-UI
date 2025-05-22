import { render, screen } from "@testing-library/react";
import { LaunchCard } from "./LaunchCard";
import { formatDate } from "@/utils/dateFormatter";
import "@testing-library/jest-dom";

const mockLaunch = {
  id: "test-id",
  name: "Test Launch",
  date_utc: "2023-01-01T00:00:00.000Z",
  success: true,
  upcoming: false,
  details: "Test launch details",
  links: {
    patch: {
      small: "https://example.com/patch.png",
    },
  },
};

describe("LaunchCard Component", () => {
  it("renders launch information correctly", () => {
    render(<LaunchCard launch={mockLaunch} />);

    expect(screen.getByText("Test Launch")).toBeInTheDocument();
    expect(screen.getByText(/Test launch details/)).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(
      screen.getByText(formatDate(mockLaunch.date_utc))
    ).toBeInTheDocument();
  });

  it("handles successful launch status", () => {
    render(<LaunchCard launch={mockLaunch} />);
    const statusElement = screen.getByText(/success/i);
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveClass("status");
  });

  it("handles failed launch with failure reason", () => {
    const failedLaunch = {
      ...mockLaunch,
      success: false,
      failures: [{ reason: "Engine failure" }],
    };
    render(<LaunchCard launch={failedLaunch} />);

    expect(screen.getByText(/Engine failure/i)).toBeInTheDocument();
    // Use data-testid to uniquely identify the status element
    const statusElement = screen.getByTestId("launch-status");
    expect(statusElement).toHaveTextContent(/failure/i);
    expect(statusElement).toHaveClass("status");
  });

  it("displays fallback for missing details", () => {
    const launchNoDetails = {
      ...mockLaunch,
      details: null,
    };
    render(<LaunchCard launch={launchNoDetails} />);
    expect(screen.getByText(/no details available/i)).toBeInTheDocument();
  });
});
