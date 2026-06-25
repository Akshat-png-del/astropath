/** Avoid repeating the same closing advice across turns. */

function hashIndex(seed: string, length: number): number {
  const hash = seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return hash % length;
}

function wasUsedRecently(text: string, priorAssistantMessages: string[]): boolean {
  const needle = text.slice(0, 50).toLowerCase();
  return priorAssistantMessages.some((prior) => prior.toLowerCase().includes(needle.slice(0, 30)));
}

/** Pick from options, skipping any already used in recent assistant replies. */
export function pickFreshAdvice(
  seed: string,
  options: string[],
  priorAssistantMessages: string[]
): string {
  const recent = priorAssistantMessages.slice(-5);
  const available = options.filter((o) => !wasUsedRecently(o, recent));
  const pool = available.length > 0 ? available : options;
  return pool[hashIndex(seed + String(recent.length), pool.length)];
}

export function hashPick(seed: string, options: string[]): string {
  return options[hashIndex(seed, options.length)];
}
