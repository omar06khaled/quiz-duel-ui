import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  sendEmailCode,
  signInWithPassword,
  signUpWithPassword,
  verifyEmailCode,
} from "@/lib/community";

interface AuthCardProps {
  title: string;
  description: string;
}

type AuthMode = "sign-in" | "sign-up";
type AuthMethod = "password" | "code";
type CodeStep = "request-code" | "verify-code";

export const AuthCard = ({ title, description }: AuthCardProps) => {
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [method, setMethod] = useState<AuthMethod>("code");
  const [codeStep, setCodeStep] = useState<CodeStep>("request-code");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const resetFeedback = () => {
    setMessage(null);
  };

  const resetCodeFlow = () => {
    setCodeStep("request-code");
    setCode("");
  };

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    resetFeedback();
    resetCodeFlow();
  };

  const switchMethod = (nextMethod: AuthMethod) => {
    setMethod(nextMethod);
    resetFeedback();
    resetCodeFlow();
  };

  const passwordMutation = useMutation({
    mutationFn: async () => {
      if (mode === "sign-up") {
        await signUpWithPassword(email, password, displayName.trim() || email.split("@")[0] || "player");
        return "Account created. Check your email if confirmation is enabled, then sign in.";
      }

      await signInWithPassword(email, password);
      return null;
    },
    onSuccess: (successMessage) => {
      setMessage(successMessage);
      if (mode === "sign-in") {
        setPassword("");
      }
    },
  });

  const sendCodeMutation = useMutation({
    mutationFn: async () => {
      await sendEmailCode({
        email,
        displayName: mode === "sign-up" ? displayName.trim() || email.split("@")[0] || "player" : undefined,
        shouldCreateUser: mode === "sign-up",
      });
    },
    onSuccess: () => {
      setCodeStep("verify-code");
      setCode("");
      setMessage(
        mode === "sign-up"
          ? "We sent a verification code to your email. Enter it below to finish creating your account."
          : "We sent a verification code to your email. Enter it below to sign in."
      );
    },
  });

  const verifyCodeMutation = useMutation({
    mutationFn: async () => {
      await verifyEmailCode(email, code.trim());
    },
    onSuccess: () => {
      setMessage("Code verified. You're signed in.");
      resetCodeFlow();
    },
  });

  const activeError =
    passwordMutation.error instanceof Error
      ? passwordMutation.error.message
      : sendCodeMutation.error instanceof Error
        ? sendCodeMutation.error.message
        : verifyCodeMutation.error instanceof Error
          ? verifyCodeMutation.error.message
          : null;

  const isBusy =
    passwordMutation.isPending || sendCodeMutation.isPending || verifyCodeMutation.isPending;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetFeedback();

    if (method === "password") {
      passwordMutation.mutate();
      return;
    }

    if (codeStep === "verify-code") {
      verifyCodeMutation.mutate();
      return;
    }

    sendCodeMutation.mutate();
  };

  return (
    <div className="glass-panel mx-auto w-full max-w-md rounded-2xl p-6 sm:p-8">
      <h1 className="font-display text-3xl font-bold text-white">{title}</h1>
      <p className="mt-2 text-sm text-white/70">{description}</p>

      <div className="mt-5 flex gap-2 rounded-xl bg-white/5 p-1">
        <button
          type="button"
          onClick={() => switchMode("sign-in")}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
            mode === "sign-in" ? "bg-white/10 text-white" : "text-white/60"
          }`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => switchMode("sign-up")}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
            mode === "sign-up" ? "bg-white/10 text-white" : "text-white/60"
          }`}
        >
          Create account
        </button>
      </div>

      <div className="mt-3 flex gap-2 rounded-xl bg-white/5 p-1">
        <button
          type="button"
          onClick={() => switchMethod("code")}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
            method === "code" ? "bg-white/10 text-white" : "text-white/60"
          }`}
        >
          Email code
        </button>
        <button
          type="button"
          onClick={() => switchMethod("password")}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
            method === "password" ? "bg-white/10 text-white" : "text-white/60"
          }`}
        >
          Password
        </button>
      </div>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        {mode === "sign-up" && (
          <label className="block text-sm text-white/75">
            Display name
            <input
              value={displayName}
              onChange={(event) => {
                setDisplayName(event.target.value);
                resetFeedback();
                if (method === "code") {
                  resetCodeFlow();
                }
              }}
              className="glass-panel mt-1.5 w-full rounded-xl px-3 py-2.5 text-white placeholder:text-white/45"
              placeholder="Quiz Host"
            />
          </label>
        )}

        <label className="block text-sm text-white/75">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              resetFeedback();
              if (method === "code") {
                resetCodeFlow();
              }
            }}
            className="glass-panel mt-1.5 w-full rounded-xl px-3 py-2.5 text-white placeholder:text-white/45"
            placeholder="you@example.com"
          />
        </label>

        {method === "password" ? (
          <label className="block text-sm text-white/75">
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                resetFeedback();
              }}
              className="glass-panel mt-1.5 w-full rounded-xl px-3 py-2.5 text-white placeholder:text-white/45"
              placeholder="At least 6 characters"
            />
          </label>
        ) : codeStep === "verify-code" ? (
          <label className="block text-sm text-white/75">
            Verification code
            <p className="mt-1 text-xs text-white/55">
              Enter the email code Supabase sent you to continue.
            </p>
            <input
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              value={code}
              onChange={(event) => {
                setCode(event.target.value.replace(/\D/g, ""));
                resetFeedback();
              }}
              className="glass-panel mt-1.5 w-full rounded-xl px-3 py-2.5 text-white placeholder:text-white/45"
              placeholder="Enter verification code"
            />
          </label>
        ) : null}

        {method === "code" && codeStep === "verify-code" && (
          <div className="flex gap-3 text-sm">
            <button
              type="button"
              onClick={() => sendCodeMutation.mutate()}
              disabled={isBusy}
              className="text-white/70 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Resend code
            </button>
            <button
              type="button"
              onClick={() => {
                resetFeedback();
                resetCodeFlow();
              }}
              disabled={isBusy}
              className="text-white/55 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Use a different email
            </button>
          </div>
        )}

        {message && <p className="text-sm text-emerald-300">{message}</p>}
        {activeError && <p className="text-sm text-rose-300">{activeError}</p>}

        <button
          type="submit"
          disabled={isBusy}
          className="glass-action-primary w-full rounded-xl px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {method === "password"
            ? passwordMutation.isPending
              ? mode === "sign-in"
                ? "Signing in..."
                : "Creating account..."
              : mode === "sign-in"
                ? "Sign in"
                : "Create account"
            : codeStep === "verify-code"
              ? verifyCodeMutation.isPending
                ? "Verifying code..."
                : "Verify code"
              : sendCodeMutation.isPending
                ? "Sending code..."
                : mode === "sign-in"
                  ? "Send sign-in code"
                  : "Send sign-up code"}
        </button>
      </form>
    </div>
  );
};
