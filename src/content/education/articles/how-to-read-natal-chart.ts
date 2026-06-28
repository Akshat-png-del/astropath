import type { EducationArticle } from "../types";
import { DEFAULT_AUTHOR } from "../author";

export const howToReadNatalChart: EducationArticle = {
  slug: "how-to-read-natal-chart",
  title: "How to Read a Natal Chart Step by Step",
  description:
    "Follow a clear step-by-step method to read any natal chart — from first glance to synthesis of planets, houses, aspects, and dominant themes.",
  category: "birth-charts",
  updatedAt: "2026-06-15",
  publishedAt: "2026-06-15",
  author: DEFAULT_AUTHOR,
  keywords: [
    "how to read natal chart",
    "natal chart steps",
    "chart delineation",
    "astrology reading method",
    "interpret birth chart",
  ],
  sections: [
    {
      id: "prepare-chart-and-context",
      heading: "Step 1: Prepare the Chart and Context",
      paragraphs: [
        "Before interpreting, verify birth data: date, time, place, time zone, and house system. Note whether time is documented or approximate. Label approximate charts clearly so you do not overinterpret rising sign or houses. Open the wheel and a table of positions side by side for precision.",
        "Gather minimal context if reading for someone else: age range, primary questions, and consent to discuss sensitive topics. Ethical readers do not fish for trauma; they offer symbolic language and let the client connect dots. For self-study, jot current life themes — career, relationships, health — to test symbols against reality.",
        "Choose a consistent tradition for this session. Western tropical with Placidus houses is a common default, but whole sign works well for learners. Mixing systems mid-read produces confusion. State your method upfront, even when reading alone.",
      ],
    },
    {
      id: "first-impression-scan",
      heading: "Step 2: First-Impression Scan",
      paragraphs: [
        "Spend sixty seconds noticing shape before details. Is the chart bowl-shaped with planets clustered opposite empty space? Is it splashy with planets spread evenly? Bundle patterns suggest focused life narrative; splash patterns suggest diversity of interests. Not every software highlights patterns, but visual clustering is obvious on the wheel.",
        "Tally elements and modalities mentally. Lots of water? Emotional emphasis. Lots of cardinal? Initiative. Dominant fixed? Stamina and resistance to change. This climate scan prevents getting lost in individual trees.",
        "Note the ascendant sign and its ruler location. Chart ruler is the backbone of many traditional delineations. If you only remember one technique beyond the big three, make it this: find ruler of rising, note its sign, house, and aspects.",
      ],
      example:
        "A chart with seven planets above the horizon may emphasize public life and visibility; below the horizon, privacy and inner development. First impressions orient deeper reading.",
    },
    {
      id: "establish-big-three",
      heading: "Step 3: Establish the Big Three",
      paragraphs: [
        "Write sun, moon, and rising with signs and houses. Phrase each as a sentence combining planet function, sign style, and house arena. Example: \"Moon in Virgo in the second house seeks emotional security through practical routines and stable resources.\"",
        "Compare the three for harmony or tension. Fire sun with earth moon may balance vision and pragmatism — or internal debate between risk and caution. Air rising with water moon may present socially while feeling deeply in private.",
        "Check aspects involving sun or moon early. Sun square Saturn often describes serious identity development; moon trine Venus may describe emotional grace. Luminaries anchor the personality story; aspects modify the plot.",
      ],
    },
    {
      id: "personal-planets-layer",
      heading: "Step 4: Layer Personal Planets",
      paragraphs: [
        "Add Mercury, Venus, and Mars with sign and house. Mercury: thinking and speech. Venus: values and attraction. Mars: desire and assertion. These three describe daily behavior concretely — how you argue, flirt, work, and pursue goals.",
        "Watch mutual aspects among personal planets. Venus square Mars may describe passionate attraction patterns or creative tension between cooperation and independence. Mercury conjunct Venus may describe charming speech or artistic writing.",
        "If birth time is uncertain, stay at sign level for these planets and skip houses until time is verified. Sign-level reading still yields substantial insight without false precision.",
      ],
    },
    {
      id: "social-and-outer-planets",
      heading: "Step 5: Social and Outer Planets",
      paragraphs: [
        "Jupiter and Saturn describe social integration and maturation. Jupiter expands where it sits; Saturn consolidates and tests. Their houses show where growth and responsibility concentrate. Aspects to personal planets color optimism or doubt.",
        "Uranus, Neptune, and Pluto move slowly; sign placements are generational. Interpret them personally primarily by house and close aspects to angles or personal planets. Uranus conjunct the moon feels individual; Uranus in Aquarius sign placement alone does not.",
        "Nodes, Chiron, and asteroids are optional layers for intermediate readers. Master the classical seven through Saturn before adding minor bodies. Depth comes from synthesis, not symbol inflation.",
      ],
    },
    {
      id: "houses-and-rulerships",
      heading: "Step 6: Houses and Rulership Chains",
      paragraphs: [
        "Walk the houses with planets inside each. Empty houses are normal — their themes often express through the ruling planet's location. If the fifth house is empty but Leo is on the cusp, look to the sun's placement for creative and romantic themes.",
        "Trace rulership chains. Taurus on the second cusp sends you to Venus; where is Venus? Aquarius on the seventh sends you to Saturn or Uranus depending on tradition. Chains link life areas in non-obvious ways: seventh-house ruler in the tenth ties partnership to career.",
        "Angular houses deserve extra weight: first self, fourth home, seventh partners, tenth career. Planets on angles — within a few degrees of ascendant, midheaven, descendant, imum coeli — often describe defining life themes.",
      ],
    },
    {
      id: "aspect-patterns",
      heading: "Step 7: Aspect Patterns and Orbs",
      paragraphs: [
        "List tight aspects first — orb under five degrees for major aspects involving personal planets. Note conjunctions, oppositions, squares, trines, sextiles. Describe each as relationship between functions: \"Saturn square Mars: disciplined action versus frustrated drive.\"",
        "Identify patterns: T-squares, grand trines, yods if present. Name the focal planet or missing leg. Patterns show where energy circulates repeatedly. A grand trine in earth might describe talent that needs conscious activation to avoid complacency.",
        "Do not moralize aspects. Squares build skill through friction; trines gift ease that may lack motivation. Language of challenge and gift keeps readings balanced.",
      ],
      example:
        "A T-square with apex Saturn in the tenth might describe career as the pressure valve where personal planets in square demand mature structure and public accountability.",
    },
    {
      id: "synthesize-narrative",
      heading: "Step 8: Synthesize a Narrative",
      paragraphs: [
        "Merge steps into three paragraphs maximum for beginners: identity and emotion (luminaries), daily conduct (personal planets), life arenas and timing (houses, ruler, outer planets). Use recurring words — if \"service,\" \"depth,\" and \"structure\" repeat, name that theme explicitly.",
        "Test narrative against client or personal experience. Ask: \"Does this match how career has unfolded?\" Adjust emphasis based on feedback. Astrology readings are collaborative even in self-study.",
        "Avoid laundry lists. Twelve bullet placements without story help nobody. Story first; evidence placements second. Good synthesis feels like remembering, not learning a stranger.",
      ],
    },
    {
      id: "timing-and-transits",
      heading: "Step 9: Optional Timing with Transits",
      paragraphs: [
        "Once natal themes are clear, overlay current transits to personal planets and angles. Saturn transiting the natal moon may mark emotional consolidation; Jupiter transiting the ascendant may mark visibility or expansion. Mention duration — Saturn months, Pluto years.",
        "Progressions and solar arcs are advanced timing tools. Beginners can pause at transits. Even transits alone explain why the same chart feels different at twenty-five versus forty.",
        "Timing sections should empower choice: \"This period emphasizes tenth-house themes; what would intentional career alignment look like?\" Not: \"You will get fired in March.\"",
      ],
    },
    {
      id: "document-and-review",
      heading: "Step 10: Document and Review",
      paragraphs: [
        "Save your delineation with date and house system noted. Revisit after six to twelve months. Skill improves when you compare predictions or themes with outcomes, humbly revising technique.",
        "Teach what you learned. Explaining charts to study partners exposes gaps in your method faster than silent reading. Join communities that critique technique respectfully, not drama.",
        "Reading natal charts is repeatable craft. These ten steps scale from your own chart to friends to clients. Mastery is measured in hundreds of wheels, not one perfect keyword list. Keep going.",
      ],
    },
  ],
  faq: [
    {
      question: "How long should a first natal chart reading take?",
      answer:
        "A thorough beginner self-reading might take one to two hours spread over days. Professionals often spend sixty to ninety minutes with clients after years of practice.",
    },
    {
      question: "What aspects should I learn first?",
      answer:
        "Start with conjunction, opposition, square, trine, and sextile between sun, moon, Mercury, Venus, and Mars. Add outer planets once those feel fluent.",
    },
    {
      question: "Should I read planets or houses first?",
      answer:
        "Alternate: learn planet-in-sign, then planet-in-house, then combine. Both are essential; sequencing matters less than consistent practice.",
    },
    {
      question: "Can I skip outer planets initially?",
      answer:
        "Yes for early study. Focus on sun through Saturn for a solid foundation, then add Uranus, Neptune, and Pluto with house and aspect emphasis.",
    },
    {
      question: "How do I avoid overwhelming someone with symbols?",
      answer:
        "Lead with three themes, not thirty placements. Offer depth on request. Ethical readings prioritize clarity and agency over exhaustive data dumps.",
    },
  ],
  relatedSlugs: [
    "understanding-birth-charts",
    "birth-time-importance",
    "reading-your-birth-chart-basics",
  ],
};
