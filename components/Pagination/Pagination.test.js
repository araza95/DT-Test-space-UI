import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "./Pagination";
import "@testing-library/jest-dom";

describe("Pagination Component", () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    onNextPage: jest.fn(),
    onPrevPage: jest.fn(),
  };

  beforeEach(() => {
    // Clear mock function calls before each test
    jest.clearAllMocks();
  });

  // Test 1: Basic Rendering
  it("renders pagination controls correctly", () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("Page 1 of 5")).toBeInTheDocument();
  });

  // Test 2: Previous Button Disabled State
  it("disables previous button on first page", () => {
    render(<Pagination {...defaultProps} currentPage={1} />);

    const prevButton = screen.getByText("Previous");
    expect(prevButton).toBeDisabled();

    fireEvent.click(prevButton);
    expect(defaultProps.onPrevPage).not.toHaveBeenCalled();
  });

  // Test 3: Next Button Disabled State
  it("disables next button on last page", () => {
    render(<Pagination {...defaultProps} currentPage={5} />);

    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();

    fireEvent.click(nextButton);
    expect(defaultProps.onNextPage).not.toHaveBeenCalled();
  });

  // Test 4: Previous Button Click
  it("calls onPrevPage when previous button is clicked", () => {
    render(<Pagination {...defaultProps} currentPage={2} />);

    const prevButton = screen.getByText("Previous");
    fireEvent.click(prevButton);
    expect(defaultProps.onPrevPage).toHaveBeenCalledTimes(1);
  });

  // Test 5: Next Button Click
  it("calls onNextPage when next button is clicked", () => {
    render(<Pagination {...defaultProps} currentPage={1} />);

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    expect(defaultProps.onNextPage).toHaveBeenCalledTimes(1);
  });

  // Test 6: Middle Page Navigation
  it("enables both buttons on middle pages", () => {
    render(<Pagination {...defaultProps} currentPage={3} />);

    const prevButton = screen.getByText("Previous");
    const nextButton = screen.getByText("Next");

    expect(prevButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });

  // Test 7: Page Info Display
  it("displays correct page information", () => {
    const { rerender } = render(
      <Pagination {...defaultProps} currentPage={2} />
    );
    expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();

    // Test with different page numbers
    rerender(<Pagination {...defaultProps} currentPage={4} />);
    expect(screen.getByText("Page 4 of 5")).toBeInTheDocument();
  });

  // Test 8: Style Classes
  it("applies correct CSS classes", () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByText("Previous").parentElement).toHaveClass(
      "pagination"
    );
    expect(screen.getByText("Previous")).toHaveClass("button");
    expect(screen.getByText("Next")).toHaveClass("button");
  });

  // Test 9: Edge Cases
  it("handles edge cases gracefully", () => {
    // Test with 0 total pages
    render(<Pagination {...defaultProps} totalPages={0} />);
    expect(screen.getByText("Page 1 of 0")).toBeInTheDocument();

    // Test with negative current page (should still render)
    render(<Pagination {...defaultProps} currentPage={-1} />);
    expect(screen.getByText("Page -1 of 5")).toBeInTheDocument();
  });
});
