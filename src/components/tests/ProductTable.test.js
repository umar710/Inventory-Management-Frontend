import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductTable from "../ProductTable";

// Mock the API
jest.mock("../../services/api", () => ({
  productsAPI: {
    update: jest.fn(() => Promise.resolve({ data: {} })),
    delete: jest.fn(() => Promise.resolve({ data: {} })),
  },
}));

// Mock the auth context
jest.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    user: { username: "testuser" },
  }),
}));

const mockProducts = [
  {
    id: 1,
    name: "Test Laptop",
    unit: "Piece",
    category: "Electronics",
    brand: "Dell",
    stock: 15,
    status: "In Stock",
  },
];

const mockCallbacks = {
  onProductUpdate: jest.fn(),
  onProductDelete: jest.fn(),
  onSelectProduct: jest.fn(),
};

describe("ProductTable", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders product table with data", () => {
    render(<ProductTable products={mockProducts} {...mockCallbacks} />);

    expect(screen.getByText("Test Laptop")).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.getByText("Dell")).toBeInTheDocument();
  });

  test("shows edit and delete buttons", () => {
    render(<ProductTable products={mockProducts} {...mockCallbacks} />);

    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });
});
