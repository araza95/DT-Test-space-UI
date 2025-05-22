import { render, screen } from "@testing-library/react";
import { LaunchCard } from "./LaunchCard";

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

const mockFailedLaunch = {
  ...mockLaunch,
  success: false,
  failures: [
    {
      reason: "Engine failure",
    },
  ],
};

describe("LaunchCard", () => {
  it("renders launch information correctly", () => {
    render(<LaunchCard launch={mockLaunch} />);

    expect(screen.getByText("Test Launch")).toBeInTheDocument();
    expect(screen.getByText(/Test launch details/)).toBeInTheDocument();
    expect(screen.getByAltText("Test Launch Patch")).toBeInTheDocument();
  });

  it("displays failure information when launch failed", () => {
    render(<LaunchCard launch={mockFailedLaunch} />);

    expect(
      screen.getByText(/Failure Reason: Engine failure/)
    ).toBeInTheDocument();
  });

  it("handles missing patch image gracefully", () => {
    const launchWithoutPatch = {
      ...mockLaunch,
      links: {
        patch: {
          small: null,
        },
      },
    };

    render(<LaunchCard launch={launchWithoutPatch} />);
    const image = screen.getByAltText("Test Launch Patch");
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("Image-not-found.png")
    );
  });

  it("displays upcoming status correctly", () => {
    const upcomingLaunch = {
      ...mockLaunch,
      upcoming: true,
    };

    render(<LaunchCard launch={upcomingLaunch} />);
    expect(screen.getByText(/Status: Upcoming/)).toBeInTheDocument();
  });
});
