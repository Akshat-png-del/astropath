/** Dev-only testing helpers — never active in production builds. */

import { FREE_TRIAL_CREDITS } from "./credits-constants";

/** Credits written by dev reset API (matches free trial allocation) */
export const DEV_TEST_CREDITS = FREE_TRIAL_CREDITS;

export function isDevEnvironment(): boolean {
  return process.env.NODE_ENV === "development";
}

export function getDevTestUserUid(): string | null {
  const uid = process.env.NEXT_PUBLIC_DEV_TEST_USER_UID?.trim();
  return uid || null;
}

export function isDevTestUser(uid: string | null | undefined): boolean {
  if (!isDevEnvironment() || !uid) return false;
  const allowed = getDevTestUserUid();
  return !!allowed && uid === allowed;
}
