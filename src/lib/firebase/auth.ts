import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { getFirebaseAuth, isFirebaseConfigured } from "./config";

const googleProvider = new GoogleAuthProvider();

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/user-not-found": "No account found with this email.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/invalid-credential": "Invalid email or password.",
  "auth/email-already-in-use": "An account with this email already exists.",
  "auth/weak-password": "Password must be at least 6 characters.",
  "auth/popup-closed-by-user": "Sign-in was cancelled.",
  "auth/popup-blocked": "Pop-up was blocked. Allow pop-ups and try again.",
  "auth/network-request-failed": "Network error. Check your connection and try again.",
  "auth/too-many-requests": "Too many attempts. Please wait a moment and try again.",
};

export function formatAuthError(err: unknown): string {
  if (err && typeof err === "object" && "code" in err) {
    const code = String((err as { code: string }).code);
    if (AUTH_ERROR_MESSAGES[code]) return AUTH_ERROR_MESSAGES[code];
  }
  if (err instanceof Error && err.message) {
    if (err.message.includes("Firebase is not configured")) {
      return "Sign-in is not set up yet. You can still explore tarot without an account.";
    }
    return err.message;
  }
  return "Authentication failed. Please try again.";
}

function requireAuth() {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured");
  }
  return getFirebaseAuth();
}

async function ensureUserProfile(
  user: User,
  extras?: { email?: string | null; displayName?: string | null; photoURL?: string | null }
): Promise<void> {
  try {
    const { createUserProfile, ensureUserBillingProfile } = await import("./firestore");
    await createUserProfile(user.uid, {
      email: extras?.email ?? user.email,
      displayName: extras?.displayName ?? user.displayName,
      photoURL: extras?.photoURL ?? user.photoURL,
    });
    await ensureUserBillingProfile(user.uid);
  } catch {
    // Auth succeeded; profile sync is best-effort (e.g. Firestore rules / offline).
  }
}

export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(requireAuth(), googleProvider);
  await ensureUserProfile(result.user);
  return result.user;
}

export async function signUpWithEmail(email: string, password: string, displayName: string): Promise<User> {
  const result = await createUserWithEmailAndPassword(requireAuth(), email, password);
  await ensureUserProfile(result.user, { email, displayName, photoURL: null });
  return result.user;
}

export async function signInWithEmail(email: string, password: string): Promise<User> {
  const result = await signInWithEmailAndPassword(requireAuth(), email, password);
  await ensureUserProfile(result.user);
  return result.user;
}

export async function logOut(): Promise<void> {
  if (!isFirebaseConfigured()) return;
  await signOut(getFirebaseAuth());
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(requireAuth(), callback);
}
