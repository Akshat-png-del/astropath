import { getSunSign } from "@/lib/astrology/chart";
import { ZODIAC_SIGNS_ORDER } from "@/lib/astrology/zodiac-traits";

const MONTHS: Record<string, number> = {
  jan: 1, january: 1, feb: 2, february: 2, mar: 3, march: 3, apr: 4, april: 4,
  may: 5, jun: 6, june: 6, jul: 7, july: 7, aug: 8, august: 8, sep: 9, sept: 9,
  september: 9, oct: 10, october: 10, nov: 11, november: 11, dec: 12, december: 12,
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function validDate(y: number, m: number, d: number): boolean {
  if (y < 1920 || y > 2025 || m < 1 || m > 12 || d < 1 || d > 31) return false;
  const dt = new Date(y, m - 1, d);
  return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
}

function toIso(y: number, m: number, d: number): string | null {
  if (!validDate(y, m, d)) return null;
  return `${y}-${pad(m)}-${pad(d)}`;
}

/** Normalise text before parsing — strip labels, extra words */
export function normalizeBirthText(text: string): string {
  return text
    .replace(/\bd\.?o\.?b\.?\s*(is|:)?/gi, " ")
    .replace(/\bdate of birth\s*(is|:)?/gi, " ")
    .replace(/\bbirth date\s*(is|:)?/gi, " ")
    .replace(/\bborn on\b/gi, " ")
    .replace(/\bborn at\b/gi, " ")
    .replace(/\bi was born\b/gi, " ")
    .replace(/\bmy birthday is\b/gi, " ")
    .replace(/\bbirthday\s*(is|:)?/gi, " ")
    .replace(/\bbirth time\s*(is|:)?/gi, " ")
    .replace(/\btime of birth\s*(is|:)?/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function parseBirthDate(text: string): string | null {
  const raw = normalizeBirthText(text);
  if (!raw) return null;

  const iso = raw.match(/\b(19|20)\d{2}-(\d{2})-(\d{2})\b/);
  if (iso) return toIso(parseInt(iso[0].slice(0, 4), 10), parseInt(iso[2], 10), parseInt(iso[3], 10));

  // 12th of June 1998 — before month-first patterns (avoids "June 19" from "1998")
  const ofMonth = raw.match(
    /\b(\d{1,2})(?:st|nd|rd|th)?\s+of\s+(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+(19|20)?(\d{2,4})\b/i
  );
  if (ofMonth) {
    const m = MONTHS[ofMonth[2].toLowerCase()];
    const yStr = (ofMonth[3] ?? "") + ofMonth[4];
    const y = yStr.length <= 2 ? 2000 + parseInt(yStr, 10) : parseInt(yStr, 10);
    return toIso(y, m, parseInt(ofMonth[1], 10));
  }

  // June 12, 1998 | June 12 1998
  const monthDayYear = raw.match(
    /\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+(\d{1,2})(?:st|nd|rd|th)?(?!\d)(?:,?\s+(19|20)(\d{2}))?\b/i
  );
  if (monthDayYear) {
    const m = MONTHS[monthDayYear[1].toLowerCase()];
    const yStr = monthDayYear[3] ? monthDayYear[3] + monthDayYear[4] : null;
    const y = yStr ? parseInt(yStr, 10) : null;
    if (y) return toIso(y, m, parseInt(monthDayYear[2], 10));
  }

  // 12 June 1998 | 12th June 1998 | 12-June-1998
  const dayMonthYear = raw.match(
    /\b(\d{1,2})(?:st|nd|rd|th)?[\s.\-/]+(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)[\s.\-/]+(19|20)?(\d{2,4})\b/i
  );
  if (dayMonthYear) {
    const m = MONTHS[dayMonthYear[2].toLowerCase()];
    const yStr = (dayMonthYear[3] ?? "") + dayMonthYear[4];
    const y = yStr.length <= 2 ? 2000 + parseInt(yStr, 10) : parseInt(yStr, 10);
    return toIso(y, m, parseInt(dayMonthYear[1], 10));
  }

  // 12/06/1998 | 12-06-98 | 12.06.1998 — default DD/MM/YYYY (India-friendly)
  const numeric = raw.match(/\b(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})\b/);
  if (numeric) {
    let d = parseInt(numeric[1], 10);
    let m = parseInt(numeric[2], 10);
    let y = numeric[3];
    const year = y.length === 2 ? (parseInt(y, 10) > 30 ? 1900 + parseInt(y, 10) : 2000 + parseInt(y, 10)) : parseInt(y, 10);
    if (m > 12 && d <= 12) [d, m] = [m, d];
    return toIso(year, m, d);
  }

  // Only year near birth context: "born in 1995"
  const yearOnly = raw.match(/\b(?:born|birth|year)\s*(?:in|is|:)?\s*(19|20)(\d{2})\b/i);
  if (yearOnly) {
    return null; // don't invent day/month
  }

  return null;
}

export function parseBirthTime(text: string): string | null {
  const raw = normalizeBirthText(text);

  const colon24 = raw.match(/\b([01]?\d|2[0-3]):([0-5]\d)\b/);
  if (colon24) {
    const h = parseInt(colon24[1], 10);
    if (h >= 13 || !/\b(am|pm)\b/i.test(raw)) {
      return `${colon24[1]}:${colon24[2]}`;
    }
  }

  const colon12 = raw.match(/\b(\d{1,2}):(\d{2})\s*(a\.?m\.?|p\.?m\.?)\b/i);
  if (colon12) {
    return `${colon12[1]}:${colon12[2]} ${colon12[3].replace(/\./g, "").toLowerCase()}`;
  }

  const compact = raw.match(/\b(\d{1,2})(\d{2})\s*(am|pm)\b/i);
  if (compact) return `${compact[1]}:${compact[2]} ${compact[3].toLowerCase()}`;

  const simple = raw.match(/\b(?:at|time|around|about)?\s*(\d{1,2})\s*(a\.?m\.?|p\.?m\.?)\b/i);
  if (simple) return `${simple[1]} ${simple[2].replace(/\./g, "").toLowerCase()}`;

  const noSpace = raw.match(/\b(\d{1,2})(am|pm)\b/i);
  if (noSpace) return `${noSpace[1]} ${noSpace[2].toLowerCase()}`;

  if (/\b(noon|12\s*pm|midday)\b/i.test(raw)) return "12:00 pm";
  if (/\b(midnight|12\s*am)\b/i.test(raw)) return "12:00 am";
  if (/\b(early )?morning\b/i.test(raw)) return "6:00 am (approx)";
  if (/\b(evening|night)\b/i.test(raw)) return "8:00 pm (approx)";

  return null;
}

export function parseBirthYear(text: string): number | null {
  const m = text.match(/\b(?:born|birth|year)\s*(?:in|is|:)?\s*(19|20)(\d{2})\b/i)
    ?? text.match(/\b(19|20)(\d{2})\b/);
  if (m) {
    const y = parseInt(m[1] + m[2], 10);
    if (y >= 1920 && y <= 2025) return y;
  }
  return null;
}

export function formatBirthDateDisplay(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTH_NAMES[m - 1]} ${y}`;
}

export function sunSignFromIso(iso: string): string | null {
  const [y, m, d] = iso.split("-").map(Number);
  if (!validDate(y, m, d)) return null;
  return getSunSign(new Date(y, m - 1, d));
}

export interface ParsedBirthBundle {
  birthDate: string | null;
  birthTime: string | null;
  birthYear: number | null;
  displayDate: string | null;
  sign: string | null;
}

export function parseBirthBundle(text: string): ParsedBirthBundle {
  const birthDate = parseBirthDate(text);
  const birthTime = parseBirthTime(text);
  const birthYear = birthDate ? parseInt(birthDate.slice(0, 4), 10) : parseBirthYear(text);
  const sign = birthDate ? sunSignFromIso(birthDate) : null;
  return {
    birthDate,
    birthTime,
    birthYear,
    displayDate: birthDate ? formatBirthDateDisplay(birthDate) : null,
    sign,
  };
}

/** What was newly found in this message vs already known */
export function diffBirthUpdate(
  message: string,
  known: { birthDate: string | null; birthTime: string | null; location: string | null }
): { newDate: boolean; newTime: boolean; bundle: ParsedBirthBundle } {
  const bundle = parseBirthBundle(message);
  return {
    newDate: !!bundle.birthDate && bundle.birthDate !== known.birthDate,
    newTime: !!bundle.birthTime && bundle.birthTime !== known.birthTime,
    bundle,
  };
}

export function buildBirthAcknowledgment(
  bundle: ParsedBirthBundle,
  opts: { newDate: boolean; newTime: boolean; location?: string | null; newLocation?: boolean }
): string | null {
  const parts: string[] = [];
  if (opts.newDate && bundle.displayDate) {
    parts.push(`birth date ${bundle.displayDate}`);
  }
  if (opts.newTime && bundle.birthTime) {
    parts.push(`time ${bundle.birthTime}`);
  }
  if (opts.newLocation && opts.location) {
    parts.push(`born in ${opts.location}`);
  }
  if (!parts.length) return null;

  let line = `I've saved your ${parts.join(", ")}`;
  if (bundle.sign) {
    line += ` — you're a ${bundle.sign} Sun`;
  }
  line += ".";
  return line;
}

export function parseName(text: string): string | null {
  const skip = new Set([
    "fine", "good", "ok", "okay", "here", "back", "sad", "happy", "worried",
    "confused", "lost", "tired", "feeling", "looking", "trying", "going", "born",
    "my", "the", "his", "her", "our", "your", "its", "this", "that", "what",
  ]);
  const patterns = [
    /(?:my name is|i am|i'm|im|call me|this is|name['']?s)\s+([a-zA-Z]{2,}(?:\s+[a-zA-Z]{2,})?)/i,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    const name = m?.[1]?.trim();
    if (name && !skip.has(name.toLowerCase()) && name.length > 1) {
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }
  }
  return null;
}

export function parseLocation(text: string): string | null {
  const patterns = [
    /(?:born in|birth place|birthplace|birth city|from|city is|city[:\s]+)([A-Za-z][A-Za-z\s,.-]{2,45})/i,
    /(?:i live in|living in)\s+([A-Za-z][A-Za-z\s,.-]{2,45})/i,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m?.[1]) {
      const loc = m[1].trim().replace(/[.,]$/, "");
      if (!/^\d/.test(loc) && !/^(am|pm|jan|feb|mar)/i.test(loc)) return loc.slice(0, 50);
    }
  }

  // Trailing city after commas: "dob 12 june 1998, 6pm, Mumbai"
  const parts = text.split(",").map((s) => s.trim()).filter(Boolean);
  if (parts.length >= 2) {
    const last = parts.at(-1)!;
    if (
      /^[A-Za-z][A-Za-z\s.-]{2,30}$/.test(last) &&
      !/^(am|pm|morning|evening|night|noon)$/i.test(last) &&
      !Object.keys(MONTHS).some((m) => last.toLowerCase().includes(m))
    ) {
      return last.slice(0, 50);
    }
  }

  return null;
}

export function parseSign(text: string): string | null {
  const lower = text.toLowerCase();
  for (const sign of ZODIAC_SIGNS_ORDER) {
    if (new RegExp(`\\b${sign.toLowerCase()}\\b`).test(lower)) return sign;
  }
  const date = parseBirthDate(text);
  if (date) return sunSignFromIso(date);
  return null;
}
