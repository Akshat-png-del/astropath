import type { EducationArticle } from "../types";
import { DEFAULT_AUTHOR } from "../author";

export const astrologicalAspectsGuide: EducationArticle = {
  slug: "astrological-aspects-guide",
  title: "Astrological Aspects: A Complete Guide",
  description:
    "Understand astrological aspects — conjunctions, squares, trines, and more. Learn orbs, aspect patterns, and how planetary geometry shapes chart interpretation.",
  category: "aspects",
  updatedAt: "2026-06-15",
  publishedAt: "2026-06-15",
  author: DEFAULT_AUTHOR,
  keywords: [
    "astrological aspects",
    "conjunction square trine",
    "aspect orbs",
    "natal aspects",
    "chart geometry",
  ],
  sections: [
    {
      id: "what-aspects-are",
      heading: "What Aspects Are",
      paragraphs: [
        "Aspects are angular relationships between planets, points, and sometimes house cusps in a chart. Measured in degrees along the zodiac, they describe how planetary functions cooperate, clash, or blend. If signs are vocabulary and houses are settings, aspects are the dialogue between characters.",
        "Major aspects include conjunction (0°), sextile (60°), square (90°), trine (120°), and opposition (180°). Minor aspects — quincunx, semi-sextile, quintile, and others — add nuance in intermediate and advanced practice.",
        "Aspects appear in natal charts, synastry between two people, transits, and progressions. The same geometric language applies everywhere, which is why learning aspects once pays dividends across techniques.",
      ],
      example:
        "Mars square Saturn in a natal chart might describe disciplined drive or frustrated ambition, depending on signs, houses, and reception. The square is tension that demands skillful channeling, not a curse.",
    },
    {
      id: "major-aspect-families",
      heading: "Major Aspect Families",
      paragraphs: [
        "Conjunctions fuse energies. Two planets in the same vicinity act as a blended unit, sometimes amplifying each other, sometimes competing for the microphone. Context — sign, house, dignity — determines flavor.",
        "Soft aspects — sextiles and trines — traditionally ease cooperation. They describe talents, support, and pathways of least resistance. Ease can become complacency if never challenged; trines still need conscious use.",
        "Hard aspects — squares and oppositions — create awareness through friction. Squares are internal cross-pressure; oppositions project tension outward onto people or circumstances. Both drive growth when engaged honestly.",
      ],
    },
    {
      id: "orbs-and-exactness",
      heading: "Orbs and Exactness",
      paragraphs: [
        "An orb is the allowable distance from exact aspect degree. Tighter orbs are considered stronger. Many astrologers use wider orbs for sun and moon, narrower for minor bodies. Exact aspects within a degree often feel most pronounced in timing work.",
        "Applying aspects are approaching exactness; separating aspects are moving apart. Traditional astrologers sometimes weight applying aspects as building energy. Either way, exact hits are useful anchors when tracking transits.",
        "Software displays aspect lines on chart wheels; tables list orb percentages. Beginners should read both — the wheel for pattern, the table for precision.",
      ],
    },
    {
      id: "aspect-patterns",
      heading: "Aspect Patterns",
      paragraphs: [
        "Multiple aspects link into patterns with names: grand trine (three trines forming a triangle), T-square (two squares and an opposition), grand cross, yod (quincunx-focused), mystic rectangle, and more. Patterns describe systemic chart themes rather than isolated planet pairs.",
        "A grand trine in water signs might indicate emotional flow and creative intuition — or stagnation if nothing provokes action. A T-square might describe a life built around solving a central tension that won't stay quiet.",
        "Patterns are maps, not destiny. Not every chart contains a named pattern, and patterns do not override individual planet condition or lived context.",
      ],
      example:
        "A T-square involving Mars, Saturn, and the moon might show recurring stress between action, duty, and emotional needs. The empty leg — the sign opposite the apex planet — often points to skills worth developing for balance.",
    },
    {
      id: "aspects-by-planet-pair",
      heading: "Reading Planet Pairs",
      paragraphs: [
        "Aspect meaning emerges from both planets' archetypes. Venus square Pluto differs from Venus square Jupiter. Venus-Pluto may intensify desire and transformation in love; Venus-Jupiter may expand pleasure and generosity past comfortable limits.",
        "Personal planets — sun, moon, Mercury, Venus, Mars — in aspect to each other describe everyday personality texture. Outer planet aspects to personal planets often mark generational undertones made personal, like Uranus conjunct a natal sun within a cohort.",
        "Chart ruler aspects deserve special attention. If Leo rises, the sun's aspects color the entire life approach. If Scorpio rises, Mars and Pluto rulership traditions both matter depending on your school.",
      ],
    },
    {
      id: "synastry-and-transits",
      heading: "Aspects in Synastry and Transits",
      paragraphs: [
        "Synastry overlays one chart onto another, forming inter-aspects. Venus trine another's Mars is classic chemistry symbolism; Saturn square another's moon may describe restraint or caregiving burdens. No single aspect makes or breaks relationship.",
        "Transiting aspects activate natal aspects temporarily. A transit may echo a natal square, resurfacing familiar lessons. Tracking transits to natal aspect axes helps explain why certain periods feel like déjà vu.",
        "Composite and Davison charts create relationship charts with their own aspect webs. Beginners should master natal aspects before rushing to composites.",
      ],
    },
    {
      id: "minor-aspects",
      heading: "Minor Aspects and Nuance",
      paragraphs: [
        "Quincunx (150°) links signs with little traditional affinity, often describing adjustment, health themes, or awkward fits that require ongoing calibration. Semi-sextile (30°) is subtle growth friction between adjacent signs.",
        "Quintiles and biquintiles (72° and 144°) appear in creative and talent-focused astrology. Not every practitioner uses them daily.",
        "Add minor aspects after major fluency. They refine; they do not replace conjunction-through-opposition literacy.",
      ],
    },
    {
      id: "common-mistakes",
      heading: "Common Aspect Mistakes",
      paragraphs: [
        "Listing aspects without synthesis produces jargon soup. Five squares do not equal a tragic life; five trines do not equal effortlessness. Synthesis asks which story repeats.",
        "Ignoring sign and house context mislabels aspects. Mars square Saturn in Capricorn differs from Mars square Saturn in Libra. Dignity and reception modify harshness.",
        "Treating hard aspects as moral failure is harmful. Astrology describes pressure gradients, not virtue scores.",
      ],
    },
    {
      id: "practice-path",
      heading: "A Practice Path for Beginners",
      paragraphs: [
        "Memorize major aspect degrees and symbols first. Study your own sun, moon, and chart ruler aspects with journal prompts. Notice transits when they perfect to those degrees.",
        "Draw aspect grids on paper for friends' charts to train pattern recognition. Name one theme per hard aspect and one resource per soft aspect before attempting full readings.",
        "Aspect literacy turns a chart from a list of placements into a living network — the difference between vocabulary flashcards and fluent conversation.",
      ],
    },
    {
      id: "harmonics-and-advanced",
      heading: "Harmonics and Advanced Aspect Work",
      paragraphs: [
        "Beyond minors, some astrologers explore harmonic charts — dividing the circle by whole numbers to reveal hidden aspect relationships. Fourth-harmonic charts emphasize squares; fifth-harmonic emphasizes quintiles. This is advanced material; master majors first.",
        "Midpoint structures blend two planetary positions into a sensitive point aspected by a third planet. Midpoint trees appear in Uranian and some psychological schools. They refine timing and describe compound themes like ambition fused from sun and Saturn midpoints contacted by Mars.",
        "Declination parallels and contra-parallels act like extra conjunctions and oppositions off the ecliptic. Not every software displays them; when available, they explain why two planets behave as if conjunct despite wide zodiacal separation.",
        "Advanced techniques reward practitioners who already read majors fluently in natal, transit, and synastry contexts. Skipping fundamentals for exotic methods produces brittle interpretations that impress beginners briefly and fail under scrutiny.",
        "When learning aspects, sketch the chart wheel and draw lines between planets you are comparing. Visual geometry cements degree relationships faster than tables alone. Color-code hard and soft aspects if that helps memory — personal study aesthetics matter.",
      ],
    },
  ],
  faq: [
    {
      question: "What is the most important aspect?",
      answer:
        "There is no universal winner. Conjunctions and hard aspects involving sun, moon, chart ruler, or angular planets are often weighted heavily, but the full chart context decides emphasis.",
    },
    {
      question: "Are squares bad?",
      answer:
        "Squares describe dynamic tension that motivates action and skill-building. Many accomplished people have prominent squares. They are demanding, not evil.",
    },
    {
      question: "What orb should I use?",
      answer:
        "Beginners often use 6–8° for sun and moon, 4–6° for other planets for major aspects, tighter for minors. Consistency matters more than the exact number.",
    },
    {
      question: "Do aspects work in synastry?",
      answer:
        "Yes. Inter-aspects describe how two charts interact. Chemistry, friction, and long-term glue all show through aspect networks, not sun signs alone.",
    },
    {
      question: "Can two planets be in aspect without touching signs nicely?",
      answer:
        "Yes, if orbs allow out-of-sign aspects, though some astrologers disable them. Sign-based aspects also exist in whole-sign tradition without degree orbs.",
    },
  ],
  relatedSlugs: [
    "major-aspects-explained",
    "understanding-planetary-transits",
    "twelve-houses-explained",
  ],
};
