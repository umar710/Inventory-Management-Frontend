import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "../../context/AuthContext";

// Mock the auth API
jest.mock("../../services/auth", () => ({
  authAPI: {
    login: jest.fn(),
    register: jest.fn(),
  },
  setAuthToken: jest.fn(),
  getStoredToken: jest.fn(() => null),
}));

// Test component that uses the auth context
const TestComponent = () => {
  const { user, login, register, logout } = useAuth();

  return (
    <div>
      <div data-testid="user-info">{user ? user.username : "No user"}</div>
      <button onClick={() => login("testuser", "password")}>Login</button>
      <button
        onClick={() => register("newuser", "test@example.com", "password")}
      >
        Register
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe("AuthContext", () => {
  test("provides authentication context", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("user-info")).toHaveTextContent("No user");
  });
});
