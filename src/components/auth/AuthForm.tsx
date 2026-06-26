"use client";

import { useState } from "react";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import {
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
  formatAuthError,
} from "@/lib/firebase/auth";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Lock, User } from "lucide-react";

export function AuthForm() {
  const { firebaseReady } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isSignUp) await signUpWithEmail(email, password, displayName);
      else await signInWithEmail(email, password);
    } catch (err: unknown) {
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err: unknown) {
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-white/20 text-sm";

  if (!firebaseReady) {
    return (
      <GlassCard glow className="p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-4 text-white/40">
            ☽
          </div>
          <h2 className="font-display text-2xl text-white/80">Accounts Coming Soon</h2>
          <p className="text-sm text-white/35 mt-3 leading-relaxed">
            Firebase sign-in isn&apos;t configured for this environment yet. Your astrology
            reading works fully without an account.
          </p>
        </div>
        <CosmicButton href="/chat" className="w-full">
          Continue to Reading
        </CosmicButton>
        <CosmicButton variant="ghost" href="/" className="w-full mt-3">
          Back to Home
        </CosmicButton>
      </GlassCard>
    );
  }

  return (
    <GlassCard glow className="p-8 max-w-md w-full">
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-4 text-white/40">
          ☽
        </div>
        <h2 className="font-display text-2xl text-white/80">
          {isSignUp ? "Join the Cosmos" : "Welcome Back"}
        </h2>
        <p className="text-sm text-white/30 mt-1">
          {isSignUp ? "Create your account" : "Continue your journey"}
        </p>
      </div>

      <CosmicButton
        onClick={handleGoogleSignIn}
        variant="secondary"
        className="w-full mb-6"
        disabled={loading}
      >
        Continue with Google
      </CosmicButton>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/[0.06]" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-3 text-white/20 bg-transparent">or</span>
        </div>
      </div>

      <form onSubmit={handleEmailAuth} className="space-y-4">
        {isSignUp && (
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Display name"
              className={inputClass}
            />
          </div>
        )}
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={inputClass}
            autoComplete="email"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={inputClass}
            autoComplete={isSignUp ? "new-password" : "current-password"}
          />
        </div>
        {error && (
          <p className="text-sm text-red-400/80 text-center leading-relaxed">{error}</p>
        )}
        <CosmicButton type="submit" className="w-full" disabled={loading}>
          {loading ? "Connecting..." : isSignUp ? "Create Account" : "Sign In"}
        </CosmicButton>
      </form>

      <p className="text-center text-sm text-white/25 mt-6">
        {isSignUp ? "Have an account?" : "New here?"}{" "}
        <button
          type="button"
          onClick={() => {
            setIsSignUp(!isSignUp);
            setError("");
          }}
          className="text-white/50 hover:text-white/70"
        >
          {isSignUp ? "Sign in" : "Sign up"}
        </button>
      </p>
    </GlassCard>
  );
}
