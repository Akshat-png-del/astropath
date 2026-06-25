/** Free trials before credits / subscription kick in */

export const ANONYMOUS_MESSAGE_LIMIT = 5;
export const ANONYMOUS_TAROT_TRIAL = 1;

/** Signed-in free users: 1 complimentary tarot per billing period */
export const FREE_TAROT_TRIAL_PER_MONTH = 1;

const ANON_MSG_KEY = "cosmic_anon_messages";
const ANON_TAROT_KEY = "cosmic_anon_tarot";

export function getAnonymousMessageCount(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(ANON_MSG_KEY) ?? "0", 10) || 0;
}

export function incrementAnonymousMessageCount(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ANON_MSG_KEY, String(getAnonymousMessageCount() + 1));
}

export function getAnonymousTarotCount(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(ANON_TAROT_KEY) ?? "0", 10) || 0;
}

export function incrementAnonymousTarotCount(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ANON_TAROT_KEY, String(getAnonymousTarotCount() + 1));
}

export function hasAnonymousTarotTrialLeft(): boolean {
  return getAnonymousTarotCount() < ANONYMOUS_TAROT_TRIAL;
}

export function hasAnonymousChatTrialLeft(): boolean {
  return getAnonymousMessageCount() < ANONYMOUS_MESSAGE_LIMIT;
}
