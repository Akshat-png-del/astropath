import type { EducationArticle } from "../types";
import { DEFAULT_AUTHOR } from "../author";

export const planetsInAstrology: EducationArticle = {
  slug: "planets-in-astrology",
  title: "The Planets in Astrology: Meanings and Roles",
  description:
    "From the sun and moon through Saturn and the outer planets — learn what each planet represents in a birth chart and how sign and house shape its expression.",
  category: "planets",
  updatedAt: "2026-06-15",
  publishedAt: "2026-06-15",
  author: DEFAULT_AUTHOR,
  keywords: [
    "planets in astrology",
    "planet meanings",
    "astrology planets explained",
    "natal planets",
    "sun moon mercury venus mars",
  ],
  sections: [
    {
      id: "planets-as-chart-actors",
      heading: "Planets as the Actors in Your Chart",
      paragraphs: [
        "In astrology, planets are symbols for functions of experience — not merely rocks in space. Each planet names a domain: identity, emotion, thought, love, action, growth, structure, change, dreams, and transformation. Signs describe style; houses describe arena; aspects describe relationships between functions. Planets are the verbs and nouns of chart grammar.",
        "Traditional astrology worked with seven visible planets: sun, moon, Mercury, Venus, Mars, Jupiter, and Saturn. Modern Western astrology adds Uranus, Neptune, and Pluto. Some readers include Chiron, nodes, and asteroids later. Beginners should master the classical seven plus outer planets before symbol overload.",
        "A planet never means one keyword. Mars is not only anger; it is desire, courage, competition, and libido. Context — sign, house, aspects, dignity — refines expression. Good reading describes planets as processes, not labels.",
      ],
    },
    {
      id: "luminaries-sun-moon",
      heading: "The Luminaries: Sun and Moon",
      paragraphs: [
        "The sun symbolizes core identity, vitality, and conscious purpose. It answers who you are becoming and what fuels your sense of aliveness. The sun's sign shows style of self-expression; its house shows life arena where identity seeks visibility.",
        "The moon symbolizes emotion, memory, habit, and security needs. It governs instinctive reactions and private nourishment. Moon sign describes emotional language; moon house shows where feelings seek comfort or fluctuate most visibly.",
        "Sun and moon are often weighted heavily in readings because they are luminaries — visible lights anchoring the chart. Hard aspects between them can describe inner dialogue between purpose and need; conjunctions can describe unified will and feeling.",
      ],
      example:
        "Sun in Aquarius with moon in Taurus may pursue ideals and community change while needing stable routines and sensory comfort to stay grounded — a common big-three tension to integrate consciously.",
    },
    {
      id: "personal-planets",
      heading: "Mercury, Venus, and Mars",
      paragraphs: [
        "Mercury symbolizes thinking, speech, learning, and commerce. It shows how you process information, tell stories, and negotiate daily life. Mercury retrograde periods are famous culturally; natal Mercury describes your permanent cognitive and communicative style, retrograde or not.",
        "Venus symbolizes attraction, values, beauty, and harmony. It governs love, art, money as pleasure, and social grace. Venus sign shows taste and relating style; Venus house shows where affection seeks expression — romance, career, home, or friendship networks.",
        "Mars symbolizes drive, assertion, sexuality, and conflict. It shows how you pursue goals and defend boundaries. Mars sign colors aggression and courage; Mars house shows where action concentrates. Healthy Mars is initiative; suppressed Mars can become passive aggression or burnout.",
      ],
    },
    {
      id: "social-planets",
      heading: "Jupiter and Saturn",
      paragraphs: [
        "Jupiter symbolizes expansion, faith, opportunity, and meaning. It shows where life feels generous and where you take risks believing things will work out. Jupiter can exaggerate — overpromising, overeating, overconfidence — as well as bless.",
        "Saturn symbolizes structure, time, responsibility, and limits. It shows where maturity is demanded and where fear of failure may initially block growth. Saturn transits often correlate with consolidation, not punishment. Saturn in the chart describes the inner teacher, not the inner villain.",
        "Together Jupiter and Saturn frame social integration: optimism versus realism, growth versus commitment. Their aspects to personal planets describe whether confidence and discipline cooperate or debate inside you.",
      ],
    },
    {
      id: "outer-planets",
      heading: "Uranus, Neptune, and Pluto",
      paragraphs: [
        "Uranus symbolizes innovation, disruption, freedom, and sudden change. Its sign placement is generational; personal meaning emerges through house and tight aspects to angles or inner planets. Uranus transits often coincide with breaks from routine or awakenings.",
        "Neptune symbolizes dreams, spirituality, illusion, and dissolution. It can inspire compassion and art or confuse boundaries. Neptune blurs categories — helpful in imagination, challenging in contracts and clarity.",
        "Pluto symbolizes transformation, power, compulsion, and rebirth. It intensifies whatever it touches. Personal Pluto aspects may describe deep psychological processes; generational sign placement alone is background noise unless activated by transit.",
      ],
      example:
        "Pluto conjunct Venus in the natal chart might describe relationships as venues for profound transformation — intensity, jealousy, or renewal themes — not a curse on love.",
    },
    {
      id: "sign-and-house-modifiers",
      heading: "How Sign and House Modify Planets",
      paragraphs: [
        "Planet plus sign answers how. Mars in Aries acts directly; Mars in Libra acts through diplomacy and sometimes hesitation. Venus in Gemini flirts with words; Venus in Scorpio bonds deeply or not at all.",
        "Planet plus house answers where. Jupiter in the second may expand income or values; Jupiter in the ninth may expand through travel and study. Same planet, different life theater.",
        "Dignity and sect are traditional refinements: planets in signs they rule or exalt may express more cleanly; planets in detriment or fall may work harder to manifest their function. Modern readers use dignity lightly with psychological language, but the concept explains why identical planets feel different across charts.",
      ],
    },
    {
      id: "retrograde-planets",
      heading: "Retrograde Planets in the Natal Chart",
      paragraphs: [
        "Retrograde motion is an optical illusion from Earth's perspective; astrologically it marks inward or delayed expression of a planet's function. Natal Mercury retrograde may think reflectively or revisit conversations; natal Venus retrograde may internalize values before expressing affection.",
        "Retrograde is not defective. Many accomplished people have retrograde personal planets. The symbolism suggests processing style differs from cultural norm — more private, iterative, or critical.",
        "Do not blame retrograde planets for all communication failures. Context matters. Aspects to Saturn or Neptune modify retrograde stories substantially.",
      ],
    },
    {
      id: "aspects-between-planets",
      heading: "Aspects Between Planets",
      paragraphs: [
        "Planets in aspect dialogue. Conjunctions merge functions. Oppositions polarize and seek balance. Squares create friction that motivates skill. Trines ease flow that may need conscious activation. Sextiles offer opportunity requiring initiative.",
        "When learning planets, pair each with one major aspect in practice charts. Venus square Saturn: love meets fear of inadequacy — also loyalty and endurance. Moon trine Jupiter: emotional optimism and resilience.",
        "Aspect networks matter more than single lines. A planet participating in a T-square carries focal pressure; a planet in a grand trine may describe talent triangle needing a release point.",
      ],
    },
    {
      id: "traditional-rulerships",
      heading: "Traditional Rulerships and Chart Ruler",
      paragraphs: [
        "Each sign has a ruling planet in classical astrology: Mars rules Aries and Scorpio traditionally; Venus rules Taurus and Libra; Mercury rules Gemini and Virgo; moon rules Cancer; sun rules Leo; Jupiter rules Sagittarius; Saturn rules Capricorn. Modern rulers often assign Uranus to Aquarius, Neptune to Pisces, Pluto to Scorpio.",
        "Chart ruler is the planet ruling the ascendant sign. Its condition — sign, house, aspects — describes a life strategy. Tracking rulership chains links houses: seventh ruler in the tenth ties partnership to career.",
        "Rulership language helps empty houses. No planet in the sixth does not mean no work — look to Mercury or Virgo ruler placement for health and service themes.",
      ],
    },
    {
      id: "study-plan-for-planets",
      heading: "A Study Plan for Planetary Literacy",
      paragraphs: [
        "Week one: luminaries in your chart. Week two: Mercury, Venus, Mars. Week three: Jupiter and Saturn. Week four: outer planets by house and aspect. Recite core keywords daily, then write paragraphs combining sign and house without looking at memes.",
        "Use biography as laboratory. Read charts of historical figures with documented lives. Compare how the same Mars sign expresses in different houses. Observation beats superstition.",
        "Planets are the heart of astrology. Signs flavor them; houses stage them; aspects choreograph them. Master planetary functions and you can read any chart with patience — the sky's grammar learned one actor at a time.",
      ],
    },
  ],
  faq: [
    {
      question: "Which planet is most important in a chart?",
      answer:
        "No single planet dominates universally. Sun and moon are primary for identity and emotion; chart ruler is important for life direction; stellium planets can outweigh others temporarily.",
    },
    {
      question: "Do I include Pluto in modern astrology?",
      answer:
        "Most Western astrologers include Pluto, especially by house and tight aspects. Traditional astrologers may omit outer planets or use them cautiously.",
    },
    {
      question: "What does a stellium of planets mean?",
      answer:
        "Three or more planets in one sign or house intensify that sign or house theme, concentrating energy that shapes biography noticeably.",
    },
    {
      question: "Are retrograde planets bad?",
      answer:
        "No. Retrograde symbolizes inward or revisiting expression, not misfortune. Many charts with retrograde planets function excellently.",
    },
    {
      question: "How do transiting planets affect natal planets?",
      answer:
        "Transits form temporary aspects to natal planets, activating their themes. Saturn transits test; Jupiter transits expand; Mars transits energize or aggravate depending on context.",
    },
  ],
  relatedSlugs: [
    "personal-vs-outer-planets",
    "how-astrology-works",
    "elements-and-modalities",
  ],
};
