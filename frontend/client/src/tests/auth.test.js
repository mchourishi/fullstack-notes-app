import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "../components/auth/LoginForm";
import { SignupForm } from "../components/auth/SignupForm";
import * as authService from "../services/auth.service";
import { useAuth } from "../context/AuthContext";

jest.mock("react-router-dom");

jest.mock("../services/auth.service.js");

jest.mock("../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("Authentication Tests", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe("SignupForm Component", () => {
    test("renders signup form", () => {
      render(<SignupForm />);
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /sign up/i })
      ).toBeInTheDocument();
    });

    test("validates empty fields", async () => {
      render(<SignupForm />);
      const submitButton = screen.getByRole("button", { name: /sign up/i });
      fireEvent.click(submitButton);

      expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
      expect(
        await screen.findByText(/password is required/i)
      ).toBeInTheDocument();
    });

    test("submits form with valid data", async () => {
      authService.signup.mockResolvedValueOnce();

      render(<SignupForm />);

      const usernameInput = screen.getByLabelText(/username/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      await userEvent.type(usernameInput, "test");
      await userEvent.type(emailInput, "test@example.com");
      await userEvent.type(passwordInput, "password123");

      fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

      expect(authService.signup).toHaveBeenCalledWith({
        username: "test",
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  describe("LoginForm Component", () => {
    beforeEach(() => {
      useAuth.mockReturnValue({
        login: jest.fn(), // Mock the login function
      });
    });
    test("renders login form", () => {
      render(<LoginForm />);
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /login/i })
      ).toBeInTheDocument();
    });

    test("validates empty fields", async () => {
      render(<LoginForm />);
      const submitButton = screen.getByRole("button", { name: /login/i });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/password is required/i)).toBeInTheDocument();
      });
    });

    test("validates email format", async () => {
      render(<LoginForm />);

      const emailInput = screen.getByLabelText(/email/i);
      await userEvent.type(emailInput, "invalid-email");

      const submitButton = screen.getByRole("button", { name: /login/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/please enter a valid email/i)
        ).toBeInTheDocument();
      });
    });

    test("handles successful login", async () => {
      const mockToken = "mock-token";
      const mockUser = { id: 1, email: "test@example.com" };

      authService.login.mockResolvedValueOnce({
        token: mockToken,
        user: mockUser,
      });
      const navigate = jest.fn();
      jest
        .spyOn(require("react-router-dom"), "useNavigate")
        .mockReturnValue(navigate);

      render(<LoginForm />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      await userEvent.type(emailInput, "test@example.com");
      await userEvent.type(passwordInput, "password123");

      fireEvent.click(screen.getByRole("button", { name: /login/i }));

      await waitFor(() => {
        expect(authService.login).toHaveBeenCalledWith({
          username: "test@example.com",
          password: "password123",
        });
        expect(localStorage.getItem("token")).toBe(mockToken);
        expect(navigate);
      });
    });

    test("handles login failure", async () => {
      const errorSeverMessage = "An error occurred. Please try again later.";
      authService.login.mockRejectedValueOnce(new Error(errorSeverMessage));

      render(<LoginForm />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      await userEvent.type(emailInput, "test@example.com");
      await userEvent.type(passwordInput, "wrongpassword");

      fireEvent.click(screen.getByRole("button", { name: /login/i }));

      await waitFor(() => {
        expect(screen.getByText(errorSeverMessage)).toBeInTheDocument();
      });
    });
  });
});
