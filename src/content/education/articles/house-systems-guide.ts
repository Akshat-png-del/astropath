import type { EducationArticle } from "../types";
import { DEFAULT_AUTHOR } from "../author";

export const houseSystemsGuide: EducationArticle = {
  slug: "house-systems-guide",
  title: "House Systems: A Practical Guide",
  description:
    "Compare Placidus, Whole Sign, Equal, and other house systems — how they differ, why cusps shift, and how to choose a system for your chart practice.",
  category: "houses",
  updatedAt: "2026-06-15",
  publishedAt: "2026-06-15",
  author: DEFAULT_AUTHOR,
  keywords: [
    "house systems",
    "placidus",
    "whole sign houses",
    "equal house",
    "birth chart calculation",
  ],
  sections: [
    {
      id: "why-systems-exist",
      heading: "Why Multiple House Systems Exist",
      paragraphs: [
        "The zodiac is a circle of signs, but houses are a separate framework dividing the sky by earthly reference — horizon, meridian, and birth location. Unlike signs, which are equal thirty-degree slices, house boundaries depend on latitude, time of day, and mathematical choices about how to project three-dimensional space onto a chart wheel.",
        "Ancient and medieval astrologers developed several methods. Modern software makes switching between systems effortless, which paradoxically confuses beginners who see planets change houses with a dropdown menu. The underlying planets and signs do not change — only the stage sets do.",
        "Different traditions favor different systems. Hellenistic revivalists often use Whole Sign; many contemporary Western astrologers default to Placidus; some horary and electional astrologers prefer Regiomontanus or Alcabitius. Understanding options prevents unnecessary chart anxiety.",
      ],
    },
    {
      id: "placidus",
      heading: "Placidus: The Common Default",
      paragraphs: [
        "Placidus is the most widely used house system in contemporary Western natal astrology, especially in English-language software. It divides the diurnal and nocturnal arcs of planets between angles, producing houses that can be unequal in size and sometimes intercept signs at extreme latitudes.",
        "Placidus emphasizes time and angularity. Planets near house cusps are treated as entering new life topics even if they remain in the same sign. Many astrologers find it correlates well with lived experience in mid-latitude births.",
        "Critics note Placidus can produce distorted houses near the poles or when birth time is fuzzy. If your software shows interceptions — entire signs swallowed inside a house without ruling a cusp — Placidus is often the cause.",
      ],
      example:
        "With Placidus, your Mars at 8° Gemini might sit in the third house while Mercury at 25° Gemini lands in the fourth if the fourth cusp is early Cancer. Whole Sign would place both planets in the third house because Gemini is the third sign from the ascendant.",
    },
    {
      id: "whole-sign",
      heading: "Whole Sign Houses",
      paragraphs: [
        "Whole Sign assigns the entire rising sign to the first house, the next sign to the second house, and so on. Each house is exactly thirty degrees and aligns one-to-one with signs from the ascendant. There are no interceptions in Whole Sign.",
        "Revived from Hellenistic practice, Whole Sign is elegant and stable. House topics are read through sign and planetary rulers rather than degree-sensitive cusps. Many practitioners find it especially clear for traditional techniques like profections.",
        "Whole Sign can differ noticeably from Placidus for planets near cusp degrees. Advocates argue sign-based houses reflect ancient intent; skeptics prefer Placidus for angular emphasis. Both camps produce skilled astrologers.",
      ],
    },
    {
      id: "equal-and-campanus",
      heading: "Equal House and Campanus",
      paragraphs: [
        "Equal House places the ascendant degree at the first-house cusp, then marks every subsequent cusp exactly thirty degrees later. Midheaven may not align with the tenth-house cusp, which bothers some astrologers and simplifies life for others.",
        "Equal House is easy to calculate by hand and stable when birth time is approximate. It preserves equal slices without Placidus latitude distortions. Some Vedic-inspired Western hybrids use related equal methods.",
        "Campanus divides the prime vertical into twelve equal segments projected onto the ecliptic. It appears in medieval and horary traditions. You may encounter it less often in pop astrology but more in specialized historical work.",
      ],
    },
    {
      id: "koch-and-regiomontanus",
      heading: "Koch and Regiomontanus",
      paragraphs: [
        "Koch is another quadrant system like Placidus, popular in parts of Europe. It uses a birth-place-based formula for house cusps and can differ subtly from Placidus for the same chart. Some astrologers switch to Koch for personal resonance after comparison.",
        "Regiomontanus was dominant in Renaissance horary and electional astrology. It divides the celestial equator rather than the ecliptic in a specific way, producing houses suited to question-based charts. Natal astrologers occasionally use it for tradition alignment.",
        "Unless you study horary or historical methods, you may never need these systems. They illustrate that house division is a toolkit, not a monolith.",
      ],
    },
    {
      id: "birth-time-sensitivity",
      heading: "Birth Time Sensitivity",
      paragraphs: [
        "All quadrant systems — Placidus, Koch, Campanus, Regiomontanus — make house cusps time-sensitive. A four-minute error can shift the ascendant roughly one degree and move planets between houses, especially near cusps.",
        "Whole Sign and Equal House reduce cusp drama but do not eliminate time issues for the ascendant itself. Wrong rising sign still misidentifies the entire house map in Whole Sign.",
        "If birth time is unknown, astrologers may use solar chart (sun on ascendant), noon chart, or range techniques. Transparency about uncertainty is part of ethical practice.",
      ],
      example:
        "If you know you were born between 2:00 and 4:00 p.m. and your ascendant might be late Virgo or early Libra, compare both rising signs before locking house interpretations. Outer planets may stay in the same houses; inner planets and the moon may not.",
    },
    {
      id: "choosing-a-system",
      heading: "How to Choose a System",
      paragraphs: [
        "Many astrologers pick one primary system and stay consistent for years, comparing others occasionally. Consistency builds interpretive confidence. Flip-flopping daily obscures whether a technique works or whether the label changed.",
        "Try Placidus and Whole Sign for six months each if undecided. Journal correlations with transits. Which system describes your career and home chapters more coherently? Personal fit is valid data.",
        "Traditional study paths may mandate Whole Sign for technique coherence. Psychological astrologers may prefer Placidus for cusp sensitivity. Neither choice makes you less serious.",
      ],
    },
    {
      id: "software-settings",
      heading: "Software and Settings",
      paragraphs: [
        "Check your app’s house setting before comparing articles or readings. AstroPath and most chart calculators expose house system in settings or advanced options. Screenshots of charts should note the system used.",
        "When reading older books, identify the author’s default. A 1970s text assuming Equal House will disagree with modern Placidus Instagram posts for the same birth data.",
        "Saving charts with metadata — system, time source, location — prevents future confusion when you revisit cases months later.",
      ],
    },
    {
      id: "intellectual-humility",
      heading: "Intellectual Humility in House Debates",
      paragraphs: [
        "House wars online rarely convert anyone. Systems are models approximating lived experience, not physical facts like planetary orbits. Debate can sharpen thinking; dogma shuts it down.",
        "Expert astrologers disagree peacefully. What matters is internal consistency, ethical communication, and whether clients feel seen rather than which acronym won a forum poll.",
        "Learn one system deeply, peek at others, and return focus to planets, aspects, and human stories houses contain. That path serves beginners better than paralysis by dropdown menu.",
      ],
    },
    {
      id: "study-exercises",
      heading: "Study Exercises for House Systems",
      paragraphs: [
        "Pick three charts with confirmed birth times and calculate both Placidus and Whole Sign versions side by side. Highlight every planet that changes houses. Journal which system better explains known career, home, and relationship chapters without forcing the narrative.",
        "Track transits through houses for three months in your primary system, then repeat the experiment in an alternate system. Note whether Saturn through the fourth feels more resonant in one framework. This personal A/B test beats abstract arguments.",
        "Teach a friend the difference using only house keywords, not jargon. If you cannot explain why a planet moved houses without sounding defensive, you may need more practice before debating online. Pedagogy clarifies your own understanding.",
        "Document your chosen default in chart notes so future you remembers why you picked it. Revisit the decision annually — growth sometimes means updating tools, not clinging to first software settings.",
      ],
    },
  ],
  faq: [
    {
      question: "Is Placidus more accurate than Whole Sign?",
      answer:
        "Neither is scientifically proven more accurate. Accuracy in astrology is measured by interpretive usefulness and consistency, not laboratory verification. Many astrologers use both for different techniques.",
    },
    {
      question: "Why did my planet change houses when I switched systems?",
      answer:
        "Different systems place cusps differently. Planets near boundaries are especially affected. The planet did not move; the framework dividing life topics changed.",
    },
    {
      question: "What house system does Vedic astrology use?",
      answer:
        "Jyotish commonly uses Whole Sign houses with sidereal zodiac positions. Western tropical astrology is a separate framework even when house names overlap.",
    },
    {
      question: "Can I mix house systems in one reading?",
      answer:
        "Some astrologers compare systems for insight, but beginners should avoid mixing without clear labeling. Mixed messages confuse clients and students.",
    },
    {
      question: "What if I do not know my birth time?",
      answer:
        "Focus on planetary signs and aspects that do not require houses, or use rectification with a professional. Avoid precise house claims when time is uncertain.",
    },
  ],
  relatedSlugs: [
    "twelve-houses-explained",
    "understanding-planetary-transits",
    "moon-signs-explained",
  ],
};
