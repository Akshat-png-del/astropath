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
import { cn } from "@/lib/utils";
import { BRAND_MARK } from "@/lib/symbols";
import { BTN_SEGMENT, BTN_TEXT } from "@/lib/ui/button-classes";

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
    "w-full pl-10 pr-4 py-2.5 rounded-xl bg-silver/5 border border-silver/15 text-silver/80 placeholder:text-silver-faint/90 focus:outline-none focus:border-silver/30 text-sm";

  if (!firebaseReady) {
    return (
      <GlassCard glow className="p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full border border-silver/20 flex items-center justify-center mx-auto mb-4 text-silver-muted/90">
            {BRAND_MARK}
          </div>
          <h2 className="font-display text-2xl text-silver/90">Accounts Coming Soon</h2>
          <p className="text-sm text-silver-muted/85 mt-3 leading-relaxed">
            Firebase sign-in isn&apos;t configured for this environment yet. Tarot and guides work
            fully without an account.
          </p>
        </div>
        <CosmicButton href="/tarot/reading" className="w-full">
          Continue to Tarot
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
        <div className="w-12 h-12 rounded-full border border-silver/20 flex items-center justify-center mx-auto mb-4 text-silver-muted/90">
          {BRAND_MARK}
        </div>
        <h2 className="font-display text-2xl text-silver/90">
          {isSignUp ? "Create your account" : "Welcome back"}
        </h2>
        <p className="text-sm text-silver-muted/85 mt-2">
          Save readings, track streaks, and sync credits across devices.
        </p>
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className={cn(BTN_SEGMENT, "btn-md w-full mb-4")}
      >
        Continue with Google
      </button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-silver/10" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-3 bg-transparent text-silver-faint">or</span>
        </div>
      </div>

      <form onSubmit={handleEmailAuth} className="space-y-4">
        {isSignUp && (
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-faint/90" />
            <input
              type="text"
              placeholder="Display name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className={inputClass}
            />
          </div>
        )}
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-faint/90" />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-faint/90" />
          <input
            type="password"
            placeholder="Password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </div>

        {error && <p className="text-xs text-red-400/80">{error}</p>}

        <CosmicButton type="submit" className="w-full" disabled={loading}>
          {loading ? "Please wait…" : isSignUp ? "Sign up" : "Sign in"}
        </CosmicButton>
      </form>

      <button
        type="button"
        onClick={() => setIsSignUp(!isSignUp)}
        className={cn(BTN_TEXT, "w-full mt-4")}
      >
        {isSignUp ? "Already have an account? Sign in" : "Need an account? Sign up free"}
      </button>
    </GlassCard>
  );
}
