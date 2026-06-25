"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useAppStore } from "@/stores/useAppStore";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import type { User } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  firebaseReady: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  firebaseReady: false,
});

const AUTH_INIT_TIMEOUT_MS = 2500;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [firebaseReady] = useState(isFirebaseConfigured());
  const setStoreUser = useAppStore((s) => s.setUser);

  useEffect(() => {
    if (!firebaseReady) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    let unsubscribe: (() => void) | undefined;

    const timeout = window.setTimeout(() => {
      if (!cancelled) setLoading(false);
    }, AUTH_INIT_TIMEOUT_MS);

    import("@/lib/firebase/auth")
      .then(({ onAuthChange }) => {
        if (cancelled) return;
        unsubscribe = onAuthChange(async (firebaseUser) => {
          if (cancelled) return;
          setUser(firebaseUser);
          setStoreUser(
            firebaseUser
              ? {
                  uid: firebaseUser.uid,
                  email: firebaseUser.email,
                  displayName: firebaseUser.displayName,
                }
              : null
          );
          if (firebaseUser) {
            try {
              await firebaseUser.getIdToken();
              const { createUserProfile, ensureUserBillingProfile } = await import(
                "@/lib/firebase/firestore"
              );
              await createUserProfile(firebaseUser.uid, {
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
              });
              await ensureUserBillingProfile(firebaseUser.uid);
            } catch {
              // Profile sync is best-effort; billing falls back gracefully.
            }
          }
          setLoading(false);
        });
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      unsubscribe?.();
    };
  }, [firebaseReady, setStoreUser]);

  return (
    <AuthContext.Provider value={{ user, loading, firebaseReady }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
