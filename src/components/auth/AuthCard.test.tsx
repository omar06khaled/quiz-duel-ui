import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as community from "@/lib/community";
import { AuthCard } from "./AuthCard";

vi.mock("@/lib/community", () => ({
  sendEmailCode: vi.fn(),
  signInWithPassword: vi.fn(),
  signUpWithPassword: vi.fn(),
  verifyEmailCode: vi.fn(),
}));

const renderAuthCard = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <AuthCard title="Contribute" description="Sign in to continue." />
    </QueryClientProvider>
  );
};

const sendEmailCodeMock = vi.mocked(community.sendEmailCode);
const signUpWithPasswordMock = vi.mocked(community.signUpWithPassword);
const verifyEmailCodeMock = vi.mocked(community.verifyEmailCode);

describe("AuthCard", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("shows the verification step after sending a sign-up code", async () => {
    sendEmailCodeMock.mockResolvedValue(undefined);

    renderAuthCard();

    fireEvent.click(screen.getByRole("button", { name: /create account/i }));
    fireEvent.change(screen.getByLabelText(/display name/i), { target: { value: "Quiz Host" } });
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: "player@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /send sign-up code/i }));

    expect(await screen.findByLabelText(/verification code/i)).toBeInTheDocument();
    expect(screen.getByText(/finish creating your account/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /verify code/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /resend code/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /use a different email/i })).toBeInTheDocument();
  });

  it("preserves a 7-digit email code when verifying", async () => {
    sendEmailCodeMock.mockResolvedValue(undefined);
    verifyEmailCodeMock.mockResolvedValue(undefined);

    renderAuthCard();

    fireEvent.click(screen.getByRole("button", { name: /create account/i }));
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: "player@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /send sign-up code/i }));

    const verificationInput = await screen.findByLabelText(/verification code/i);
    fireEvent.change(verificationInput, { target: { value: "1234567" } });
    fireEvent.click(screen.getByRole("button", { name: /verify code/i }));

    await waitFor(() => {
      expect(verifyEmailCodeMock).toHaveBeenCalledWith("player@example.com", "1234567");
    });
    expect(verificationInput).toHaveValue("1234567");
  });

  it("stays on the request step when sending the code fails", async () => {
    sendEmailCodeMock.mockRejectedValue(new Error("Unable to send code"));

    renderAuthCard();

    fireEvent.click(screen.getByRole("button", { name: /create account/i }));
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: "player@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /send sign-up code/i }));

    expect(await screen.findByText("Unable to send code")).toBeInTheDocument();
    expect(screen.queryByLabelText(/verification code/i)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send sign-up code/i })).toBeInTheDocument();
  });

  it("shows the updated password signup message without entering code mode", async () => {
    signUpWithPasswordMock.mockResolvedValue(undefined);

    renderAuthCard();

    fireEvent.click(screen.getByRole("button", { name: /create account/i }));
    fireEvent.click(screen.getByRole("button", { name: /password/i }));
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: "player@example.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "secret123" } });
    fireEvent.click(screen.getAllByRole("button", { name: /^create account$/i })[1]!);

    expect(
      await screen.findByText(/account created\. check your email if confirmation is enabled, then sign in\./i)
    ).toBeInTheDocument();
    expect(screen.queryByLabelText(/verification code/i)).not.toBeInTheDocument();
  });
});
