// LaunchSection.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { LaunchSection } from "./LaunchSection";
import "@testing-library/jest-dom";

// Mock the LaunchCard component
jest.mock("../LaunchCard", () => ({
  LaunchCard: ({ launch }) => (
    <div data-testid="launch-card">{launch.name}</div>
  ),
}));

// Mock the LaunchCardSkeleton component
jest.mock("../LaunchCard/LaunchCardSkeleton", () => ({
  LaunchCardSkeleton: () => <div data-testid="skeleton" />,
}));

const mockLaunches = [
  {
    id: "1",
    name: "Launch 1",
    date_utc: "2023-01-01T00:00:00.000Z",
    success: true,
  },
  {
    id: "2",
    name: "Launch 2",
    date_utc: "2023-01-02T00:00:00.000Z",
    success: false,
  },
];

describe("LaunchSection Component", () => {
  // Test 1: Loading State
  it("shows loading skeletons when loading is true", () => {
    render(<LaunchSection launches={[]} loading={true} error={null} />);

    const skeletons = screen.getAllByTestId("skeleton");
    expect(skeletons).toHaveLength(12); // Checking if 12 skeletons are rendered
    expect(screen.queryByRole("card-container")).toBeInTheDocument();
  });

  // Test 2: Error State
  it("shows error message and retry button when there is an error", () => {
    const errorMessage = "Failed to fetch launches";
    render(
      <LaunchSection launches={[]} loading={false} error={errorMessage} />
    );

    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    expect(screen.getByText("Retry")).toBeInTheDocument();
  });

  // Test 3: Retry Functionality
  it("reloads page when retry button is clicked", () => {
    // Mock window.location.reload
    const reloadMock = jest.fn();
    Object.defineProperty(window, "location", {
      value: { reload: reloadMock },
      writable: true,
    });

    render(<LaunchSection launches={[]} loading={false} error="Error" />);

    fireEvent.click(screen.getByText("Retry"));
    expect(reloadMock).toHaveBeenCalledTimes(1);
  });

  // Test 4: Successful Data Rendering
  it("renders launch cards when data is available", () => {
    render(
      <LaunchSection launches={mockLaunches} loading={false} error={null} />
    );

    expect(screen.getAllByTestId("launch-card")).toHaveLength(2);
    expect(screen.getByText("Launch 1")).toBeInTheDocument();
    expect(screen.getByText("Launch 2")).toBeInTheDocument();
  });

  // Test 5: Empty State
  it("handles empty launches array", () => {
    render(<LaunchSection launches={[]} loading={false} error={null} />);

    expect(screen.queryByTestId("launch-card")).not.toBeInTheDocument();
    expect(screen.getByRole("card-container")).toBeEmptyDOMElement();
  });

  // Test 6: Accessibility
  it("has correct ARIA roles", () => {
    render(
      <LaunchSection launches={mockLaunches} loading={false} error={null} />
    );

    expect(screen.getByRole("card-container")).toBeInTheDocument();
  });

  // Test 7: Style Classes
  it("applies correct CSS classes", () => {
    render(
      <LaunchSection launches={mockLaunches} loading={false} error={null} />
    );

    expect(screen.getByRole("card-container")).toHaveClass("section");
  });
});
