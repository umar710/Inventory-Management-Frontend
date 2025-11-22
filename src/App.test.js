import { render, screen } from "@testing-library/react";
import App from "./App";

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
}));

// Mock the auth context
jest.mock("./context/AuthContext", () => ({
  AuthProvider: ({ children }) => children,
  useAuth: () => ({
    user: null,
    loading: false,
  }),
}));

test("renders inventory management app", () => {
  render(<App />);
  const loginElement = screen.getByText(/sign in to inventory manager/i);
  expect(loginElement).toBeInTheDocument();
});
