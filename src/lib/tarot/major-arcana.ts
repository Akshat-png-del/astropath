import type { MajorArcanaCard } from "./types";

export const MAJOR_ARCANA: MajorArcanaCard[] = [
  { id: 0, name: "The Fool", roman: "0", keyword: "new beginning", general: "A fresh start is near. Trust the step in front of you — not every detail.", love: "New energy in love. Be open, but don't ignore red flags.", career: "A new path or opportunity is opening. Take a calculated leap.", yesNo: "maybe" },
  { id: 1, name: "The Magician", roman: "I", keyword: "power", general: "You have the tools. Focus your will and act with intention.", love: "You can shape this relationship — speak clearly about what you want.", career: "Your skills are enough. Stop waiting for permission.", yesNo: "yes" },
  { id: 2, name: "The High Priestess", roman: "II", keyword: "intuition", general: "Listen inward. Not everything should be rushed or announced.", love: "Your gut about this person matters more than mixed signals.", career: "Hold your plans close until the right moment.", yesNo: "maybe" },
  { id: 3, name: "The Empress", roman: "III", keyword: "abundance", general: "Growth, nurture, and patience bring results.", love: "Love flourishes when you care for yourself first.", career: "Creative or steady effort pays off soon.", yesNo: "yes" },
  { id: 4, name: "The Emperor", roman: "IV", keyword: "structure", general: "Set boundaries. Order creates calm.", love: "You need clarity and respect — not guessing games.", career: "Lead with discipline. Structure beats chaos.", yesNo: "yes" },
  { id: 5, name: "The Hierophant", roman: "V", keyword: "tradition", general: "Wisdom comes from proven paths and honest guidance.", love: "Old patterns may repeat — name them and choose differently.", career: "A mentor or established method can help now.", yesNo: "maybe" },
  { id: 6, name: "The Lovers", roman: "VI", keyword: "choice", general: "A real choice is in front of you — align with your values.", love: "This is about genuine connection, not just attraction.", career: "Two paths are open. Pick what fits who you are.", yesNo: "yes" },
  { id: 7, name: "The Chariot", roman: "VII", keyword: "drive", general: "Stay focused. Momentum is on your side if you commit.", love: "Mixed signals won't fix themselves — be direct.", career: "Push through resistance. Victory comes through focus.", yesNo: "yes" },
  { id: 8, name: "Strength", roman: "VIII", keyword: "courage", general: "Gentle persistence beats force.", love: "Honest, calm courage is your strength here.", career: "Keep going quietly — resilience is noticed.", yesNo: "yes" },
  { id: 9, name: "The Hermit", roman: "IX", keyword: "reflection", general: "Step back. Solitude brings the answer.", love: "Alone time isn't rejection — it's clarity.", career: "Pause before the next big move.", yesNo: "maybe" },
  { id: 10, name: "Wheel of Fortune", roman: "X", keyword: "change", general: "Life is turning. This phase won't last forever.", love: "Luck in love can shift — stay open to change.", career: "Timing is moving. Watch for an opening door.", yesNo: "maybe" },
  { id: 11, name: "Justice", roman: "XI", keyword: "balance", general: "Truth and fairness matter. Act with integrity.", love: "Are you giving and receiving equally?", career: "Contracts, decisions, and facts surface now.", yesNo: "maybe" },
  { id: 12, name: "The Hanged Man", roman: "XII", keyword: "pause", general: "Stop forcing. A new angle will appear.", love: "Waiting hurts, but pushing won't help either.", career: "Delay isn't denial — use the pause wisely.", yesNo: "no" },
  { id: 13, name: "Death", roman: "XIII", keyword: "transformation", general: "An ending clears space for something truer.", love: "Let an old pattern die so real love can grow.", career: "Close one chapter to start a better one.", yesNo: "maybe" },
  { id: 14, name: "Temperance", roman: "XIV", keyword: "harmony", general: "Balance and patience heal what force cannot.", love: "Slow and steady wins — avoid extremes.", career: "Blend patience with action.", yesNo: "yes" },
  { id: 15, name: "The Devil", roman: "XV", keyword: "attachment", general: "Name what's holding you — habit, fear, or control.", love: "Ask: is this love or dependency?", career: "Money fear may be driving bad choices.", yesNo: "no" },
  { id: 16, name: "The Tower", roman: "XVI", keyword: "upheaval", general: "A shake-up clears what wasn't built on truth.", love: "Sudden truth can hurt — but it frees you.", career: "Unexpected change is scary but necessary.", yesNo: "no" },
  { id: 17, name: "The Star", roman: "XVII", keyword: "hope", general: "Healing and renewal are real. Keep faith.", love: "Hope in love is justified — stay open.", career: "Recognition and calm progress are building.", yesNo: "yes" },
  { id: 18, name: "The Moon", roman: "XVIII", keyword: "uncertainty", general: "Not everything is clear yet. Go slowly.", love: "Illusions or secrets may be involved — trust actions.", career: "Don't sign or decide until the fog lifts.", yesNo: "no" },
  { id: 19, name: "The Sun", roman: "XIX", keyword: "joy", general: "Warmth, clarity, and good news are likely.", love: "Honesty and warmth bring positive news.", career: "Success and visibility are favored.", yesNo: "yes" },
  { id: 20, name: "Judgement", roman: "XX", keyword: "awakening", general: "A truth you've avoided is ready to be faced.", love: "A second chance or honest reckoning may come.", career: "A callback or fresh start is possible.", yesNo: "yes" },
  { id: 21, name: "The World", roman: "XXI", keyword: "completion", general: "A cycle completes. Honour how far you've come.", love: "A chapter in love is finishing — with meaning.", career: "A goal you've worked for is within reach.", yesNo: "yes" },
];

export function getCardById(id: number): MajorArcanaCard {
  return MAJOR_ARCANA.find((c) => c.id === id) ?? MAJOR_ARCANA[0];
}
