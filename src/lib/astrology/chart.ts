import {
  MakeTime,
  Body,
  EclipticGeoMoon,
  SiderealTime,
  SunPosition,
  GeoVector,
  Ecliptic,
} from "astronomy-engine";

const ZODIAC_SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
] as const;

const PLANET_BODIES: { name: string; body: Body }[] = [
  { name: "Mercury", body: Body.Mercury },
  { name: "Venus", body: Body.Venus },
  { name: "Mars", body: Body.Mars },
  { name: "Jupiter", body: Body.Jupiter },
  { name: "Saturn", body: Body.Saturn },
  { name: "Uranus", body: Body.Uranus },
  { name: "Neptune", body: Body.Neptune },
  { name: "Pluto", body: Body.Pluto },
];

export type ZodiacSign = (typeof ZODIAC_SIGNS)[number];

export function getSunSign(date: Date): ZodiacSign {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
  return "Pisces";
}

function longitudeToSign(longitude: number): ZodiacSign {
  const index = Math.floor((((longitude % 360) + 360) % 360) / 30);
  return ZODIAC_SIGNS[index];
}

function longitudeToDegree(longitude: number): number {
  return ((longitude % 360) + 360) % 360 % 30;
}

function getEclipticLongitude(body: Body, time: ReturnType<typeof MakeTime>): number {
  if (body === Body.Sun) {
    return SunPosition(time).elon;
  }
  const vector = GeoVector(body, time, true);
  return Ecliptic(vector).elon;
}

function estimateRisingSign(date: Date, latitude: number, longitude: number): ZodiacSign {
  const time = MakeTime(date);
  const gst = SiderealTime(time);
  const lst = (gst + longitude / 15 + 24) % 24;
  const ascendantDeg =
    (lst * 15 + Math.atan(Math.tan((latitude * Math.PI) / 180)) * (180 / Math.PI)) % 360;
  return longitudeToSign(ascendantDeg < 0 ? ascendantDeg + 360 : ascendantDeg);
}

export interface ChartCalculationInput {
  date: Date;
  latitude: number;
  longitude: number;
}

export async function calculateBirthChart(input: ChartCalculationInput) {
  const time = MakeTime(input.date);

  const sunLon = SunPosition(time).elon;
  const planets = [
    {
      name: "Sun",
      sign: longitudeToSign(sunLon),
      degree: Math.round(longitudeToDegree(sunLon) * 100) / 100,
      house: (Math.floor(sunLon / 30) % 12) + 1,
      retrograde: false,
    },
    ...PLANET_BODIES.map(({ name, body }) => {
      const eclipticLon = getEclipticLongitude(body, time);
      return {
        name,
        sign: longitudeToSign(eclipticLon),
        degree: Math.round(longitudeToDegree(eclipticLon) * 100) / 100,
        house: (Math.floor(eclipticLon / 30) % 12) + 1,
        retrograde: false,
      };
    }),
  ];

  const moonSphere = EclipticGeoMoon(time);
  const moonSign = longitudeToSign(moonSphere.lon);
  planets.push({
    name: "Moon",
    sign: moonSign,
    degree: Math.round(longitudeToDegree(moonSphere.lon) * 100) / 100,
    house: (Math.floor(moonSphere.lon / 30) % 12) + 1,
    retrograde: false,
  });

  const risingSign = estimateRisingSign(input.date, input.latitude, input.longitude);

  const aspects: { planet1: string; planet2: string; type: string; orb: number }[] = [];

  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const p1Lon = planets[i].degree + ZODIAC_SIGNS.indexOf(planets[i].sign as ZodiacSign) * 30;
      const p2Lon = planets[j].degree + ZODIAC_SIGNS.indexOf(planets[j].sign as ZodiacSign) * 30;
      const diff = Math.abs(p1Lon - p2Lon) % 360;
      const angle = diff > 180 ? 360 - diff : diff;

      if (angle < 8) aspects.push({ planet1: planets[i].name, planet2: planets[j].name, type: "conjunction", orb: Math.round(angle * 100) / 100 });
      else if (Math.abs(angle - 60) < 6) aspects.push({ planet1: planets[i].name, planet2: planets[j].name, type: "sextile", orb: Math.round(Math.abs(angle - 60) * 100) / 100 });
      else if (Math.abs(angle - 90) < 8) aspects.push({ planet1: planets[i].name, planet2: planets[j].name, type: "square", orb: Math.round(Math.abs(angle - 90) * 100) / 100 });
      else if (Math.abs(angle - 120) < 8) aspects.push({ planet1: planets[i].name, planet2: planets[j].name, type: "trine", orb: Math.round(Math.abs(angle - 120) * 100) / 100 });
      else if (Math.abs(angle - 180) < 8) aspects.push({ planet1: planets[i].name, planet2: planets[j].name, type: "opposition", orb: Math.round(Math.abs(angle - 180) * 100) / 100 });
    }
  }

  const sunSign = getSunSign(input.date);
  const moonPlanet = planets.find((p) => p.name === "Moon");

  return {
    sunSign,
    moonSign: moonPlanet?.sign ?? moonSign,
    risingSign,
    chartData: {
      planets,
      houses: Array.from({ length: 12 }, (_, i) => i + 1),
      aspects: aspects.slice(0, 15),
    },
  };
}

export function getSignElement(sign: string): string {
  const elements: Record<string, string> = {
    Aries: "Fire", Leo: "Fire", Sagittarius: "Fire",
    Taurus: "Earth", Virgo: "Earth", Capricorn: "Earth",
    Gemini: "Air", Libra: "Air", Aquarius: "Air",
    Cancer: "Water", Scorpio: "Water", Pisces: "Water",
  };
  return elements[sign] ?? "Unknown";
}

export { ZODIAC_SIGNS };
