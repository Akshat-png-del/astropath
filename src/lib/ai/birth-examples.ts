/** Copy-paste friendly examples — keep in sync across chat UI and bot prompts */

export const BIRTH_DATE_EXAMPLE = "15 March 1995";
export const BIRTH_DATE_EXAMPLE_ALT = "12/06/2000";
export const BIRTH_TIME_EXAMPLE = "6 pm";
export const BIRTH_TIME_EXAMPLE_ALT = "around 8:30 am";
export const BIRTH_PLACE_EXAMPLE = "Mumbai";

export const BIRTH_FULL_EXAMPLE = `${BIRTH_DATE_EXAMPLE}, ${BIRTH_TIME_EXAMPLE}, ${BIRTH_PLACE_EXAMPLE}`;
export const BIRTH_FULL_EXAMPLE_ALT = `DOB ${BIRTH_DATE_EXAMPLE_ALT}, ${BIRTH_TIME_EXAMPLE}, Delhi`;

export const BIRTH_PROMPTS: Record<string, string> = {
  "birth date": `What's your date of birth? For example: **${BIRTH_DATE_EXAMPLE}** or **${BIRTH_DATE_EXAMPLE_ALT}** (day/month/year).`,
  "birth time": `What time were you born? Even approximate is fine — e.g. **${BIRTH_TIME_EXAMPLE}** or **"${BIRTH_TIME_EXAMPLE_ALT}"**. It sets your rising sign.`,
  "birth place": `Which city were you born in? e.g. **${BIRTH_PLACE_EXAMPLE}** or **Delhi, India**.`,
};

/** Short prompts without markdown — for fallback / plain text */
export const BIRTH_PROMPTS_PLAIN: Record<string, string> = {
  "birth date": `What's your date of birth? (e.g. ${BIRTH_DATE_EXAMPLE} or ${BIRTH_DATE_EXAMPLE_ALT})`,
  "birth time": `Birth time? Even "${BIRTH_TIME_EXAMPLE}" or "${BIRTH_TIME_EXAMPLE_ALT}" works.`,
  "birth place": `Which city were you born in? (e.g. ${BIRTH_PLACE_EXAMPLE})`,
};

export const CHAT_EXAMPLE_CHIPS = [
  {
    label: "Full birth details",
    text: `My name is Priya. DOB ${BIRTH_FULL_EXAMPLE}. I want a love reading.`,
  },
  {
    label: "Date only",
    text: `Career question — my birth date is ${BIRTH_DATE_EXAMPLE_ALT}.`,
  },
  {
    label: "Love + DOB",
    text: `My boyfriend left me. DOB 12 June 1998, ${BIRTH_PLACE_EXAMPLE}.`,
  },
] as const;

export const INPUT_PLACEHOLDER = "Ask the stars — love, career, timing…";
