export function pickPhrase(
  phrases: readonly string[],
  last: string | undefined,
  random: () => number = Math.random,
): string | undefined {
  if (phrases.length === 0) {
    return undefined;
  }
  const candidates = phrases.length > 1 ? phrases.filter((p) => p !== last) : phrases;
  const index = Math.min(Math.floor(random() * candidates.length), candidates.length - 1);
  return candidates[index];
}

export function shouldHype(
  enabled: boolean,
  nowMs: number,
  lastShownMs: number | undefined,
  cooldownSeconds: number,
): boolean {
  if (!enabled) {
    return false;
  }
  return lastShownMs === undefined || nowMs - lastShownMs >= cooldownSeconds * 1000;
}

// Returns null when the phrase is blank or already present (case-insensitive).
export function addPhrase(phrases: readonly string[], input: string): string[] | null {
  const phrase = input.trim();
  if (phrase === "" || phrases.some((p) => p.toLowerCase() === phrase.toLowerCase())) {
    return null;
  }
  return [...phrases, phrase];
}

export function removePhrases(phrases: readonly string[], toRemove: readonly string[]): string[] {
  const remove = new Set(toRemove);
  return phrases.filter((p) => !remove.has(p));
}
