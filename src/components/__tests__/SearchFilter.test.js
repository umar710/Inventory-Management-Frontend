import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchFilter from "../SearchFilter";

// Mock axios before any imports
jest.mock("axios", () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  })),
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

const mockCallbacks = {
  onSearch: jest.fn(),
  onFilter: jest.fn(),
  onAddProduct: jest.fn(),
};

describe("SearchFilter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders search input and buttons", () => {
    render(<SearchFilter {...mockCallbacks} />);

    expect(
      screen.getByPlaceholderText("Search products...")
    ).toBeInTheDocument();
    expect(screen.getByText("Add New Product")).toBeInTheDocument();
  });

  test("handles search input changes", () => {
    render(<SearchFilter {...mockCallbacks} />);

    const searchInput = screen.getByPlaceholderText("Search products...");
    fireEvent.change(searchInput, { target: { value: "laptop" } });

    expect(mockCallbacks.onSearch).toHaveBeenCalledWith("laptop");
  });
});
