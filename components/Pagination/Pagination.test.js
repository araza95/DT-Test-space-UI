import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  const mockProps = {
    currentPage: 2,
    totalPages: 5,
    onNextPage: jest.fn(),
    onPrevPage: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders current page and total pages", () => {
    render(<Pagination {...mockProps} />);
    expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();
  });

  it("calls onNextPage when next button is clicked", () => {
    render(<Pagination {...mockProps} />);
    fireEvent.click(screen.getByText("Next"));
    expect(mockProps.onNextPage).toHaveBeenCalledTimes(1);
  });

  it("calls onPrevPage when previous button is clicked", () => {
    render(<Pagination {...mockProps} />);
    fireEvent.click(screen.getByText("Previous"));
    expect(mockProps.onPrevPage).toHaveBeenCalledTimes(1);
  });

  it("disables previous button on first page", () => {
    render(<Pagination {...mockProps} currentPage={1} />);
    const prevButton = screen.getByText("Previous");
    expect(prevButton).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(<Pagination {...mockProps} currentPage={5} />);
    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });

  it("enables both buttons on middle pages", () => {
    render(<Pagination {...mockProps} />);
    const prevButton = screen.getByText("Previous");
    const nextButton = screen.getByText("Next");
    expect(prevButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });
});
