import type { EducationArticle } from "../types";
import { DEFAULT_AUTHOR } from "../author";

export const twelveZodiacSigns: EducationArticle = {
  slug: "twelve-zodiac-signs",
  title: "The Twelve Zodiac Signs Explained",
  description:
    "Meet all twelve zodiac signs — their elements, modalities, core themes, and how to think about sign symbolism beyond sun-sign stereotypes.",
  category: "zodiac-signs",
  updatedAt: "2026-06-15",
  publishedAt: "2026-06-15",
  author: DEFAULT_AUTHOR,
  keywords: [
    "zodiac signs",
    "twelve signs astrology",
    "aries to pisces",
    "zodiac sign meanings",
    "astrology signs explained",
  ],
  sections: [
    {
      id: "what-zodiac-signs-represent",
      heading: "What Zodiac Signs Represent",
      paragraphs: [
        "The zodiac is a circle of twelve thirty-degree segments along the ecliptic. Each segment is a sign with a distinct symbolic profile. Signs are not personality boxes; they are styles of expression that planets use. When astrologers say someone has Venus in Taurus, they mean affection and values tend to express through Taurus themes: steadiness, sensory pleasure, loyalty, and patience.",
        "Signs belong to elements and modalities that refine their character. Fire signs emphasize inspiration and action. Earth signs emphasize form and practicality. Air signs emphasize ideas and connection. Water signs emphasize feeling and intuition. Cardinal signs initiate, fixed signs stabilize, mutable signs adapt. Every sign combines one element with one modality, creating twelve unique archetypes.",
        "In tropical Western astrology, signs align with seasons rather than star constellations. Aries begins at the spring equinox; Cancer at the summer solstice; Libra at the autumn equinox; Capricorn at the winter solstice. This seasonal framing links signs to cycles of growth, fullness, harvest, and consolidation in the natural year.",
      ],
    },
    {
      id: "fire-signs",
      heading: "Fire Signs: Aries, Leo, Sagittarius",
      paragraphs: [
        "Aries, the cardinal fire sign, symbolizes initiation, courage, and direct action. Its archetype is the pioneer who starts before overthinking. Aries energy can be impulsive, competitive, and refreshingly honest. In a chart, Aries placements often seek challenge and autonomy.",
        "Leo, fixed fire, symbolizes creative self-expression, visibility, and heart-centered leadership. It radiates warmth and wants meaningful recognition, not empty applause. Leo placements often care about craft, loyalty, and showing up generously for people they love.",
        "Sagittarius, mutable fire, symbolizes exploration, belief, and horizon-widening experience. It chases meaning through travel, study, and philosophy. Sagittarius placements often need freedom, humor, and a sense that life is going somewhere worthwhile.",
      ],
      example:
        "Mars in Aries may assert quickly and prefer straightforward conflict. Mars in Leo may fight for pride and creative honor. Mars in Sagittarius may argue about principles or walk away to preserve freedom — same planet, different sign style.",
    },
    {
      id: "earth-signs",
      heading: "Earth Signs: Taurus, Virgo, Capricorn",
      paragraphs: [
        "Taurus, fixed earth, symbolizes stability, sensory pleasure, and patient building. It values what endures: craft, comfort, loyal bonds, and material security. Taurus placements often resist rushed change and thrive when rhythm and beauty are respected.",
        "Virgo, mutable earth, symbolizes analysis, service, and refinement. It notices detail others miss and improves systems through careful work. Virgo placements often carry high standards — for themselves first — and find meaning through useful contribution.",
        "Capricorn, cardinal earth, symbolizes ambition, structure, and long-horizon responsibility. It climbs steadily, respects time, and understands that reputation is earned. Capricorn placements often mature early in some life area and take duty seriously even when it costs comfort.",
      ],
    },
    {
      id: "air-signs",
      heading: "Air Signs: Gemini, Libra, Aquarius",
      paragraphs: [
        "Gemini, mutable air, symbolizes curiosity, language, and nimble connection. It gathers information, tells stories, and links people and ideas. Gemini placements often need mental variety and can hold multiple perspectives at once without contradiction feeling threatening.",
        "Libra, cardinal air, symbolizes balance, partnership, and aesthetic harmony. It sees both sides and seeks fair exchange. Libra placements often care deeply about courtesy, design, and relationships that feel reciprocal rather than one-sided.",
        "Aquarius, fixed air, symbolizes innovation, collective concern, and principled independence. It questions convention when convention blocks progress. Aquarius placements often identify with communities, causes, or futures larger than personal drama.",
      ],
    },
    {
      id: "water-signs",
      heading: "Water Signs: Cancer, Scorpio, Pisces",
      paragraphs: [
        "Cancer, cardinal water, symbolizes protection, memory, and emotional belonging. It nurtures roots — family, home, chosen kin — and reads atmosphere instinctively. Cancer placements often need safe harbors to replenish before giving again.",
        "Scorpio, fixed water, symbolizes depth, transformation, and psychological honesty. It wants truth beneath surface politeness and can tolerate intensity others avoid. Scorpio placements often bond loyally or not at all, with little patience for performance.",
        "Pisces, mutable water, symbolizes empathy, imagination, and dissolution of rigid boundaries. It feels collective currents and dreams possibilities into being. Pisces placements often need creative or spiritual outlets so sensitivity becomes gift rather than overwhelm.",
      ],
      example:
        "Moon in Cancer may need cozy routines to feel secure. Moon in Scorpio may need emotional honesty and privacy. Moon in Pisces may need music, water, or solitude to process feelings — three water moons, three different needs.",
    },
    {
      id: "cardinal-fixed-mutable",
      heading: "Cardinal, Fixed, and Mutable Modes",
      paragraphs: [
        "Modalities describe how signs move energy through time. Cardinal signs — Aries, Cancer, Libra, Capricorn — start seasons and initiate projects. They lean toward leadership, decision, and fresh direction, sometimes struggling to finish what they begin without other chart support.",
        "Fixed signs — Taurus, Leo, Scorpio, Aquarius — sustain and concentrate. They preserve, deepen, and resist unnecessary change. They offer loyalty and stamina but may dig in when flexibility would serve better.",
        "Mutable signs — Gemini, Virgo, Sagittarius, Pisces — adapt, translate, and close cycles. They integrate lessons from change and often excel at mediation, editing, and multitasking. They may scatter energy without grounding from earth or fixed placements elsewhere in the chart.",
        "Modalities explain why signs of the same element differ. Aries and Leo are both fire, but Aries starts abruptly while Leo maintains creative focus. Cancer and Pisces are both water, but Cancer builds shells while Pisces dissolves them.",
      ],
    },
    {
      id: "signs-beyond-sun",
      heading: "Signs Beyond the Sun",
      paragraphs: [
        "Sun sign columns made zodiac signs famous, but every planet occupies a sign in your chart. You have a moon sign, Mercury sign, Venus sign, and so on. Rising sign — the ascendant — is so important it colors the entire chart's house framework. Reducing someone to sun sign alone is like describing a novel by its genre.",
        "Repetition matters. Three planets in Virgo intensify Virgo themes regardless of sun sign. No planets in fire may describe someone who warms slowly or delegates risk-taking to others. Element and modality tallies reveal temperament as much as individual sign placements do.",
        "When reading sign descriptions online, ask which planet they discuss. Generic Leo memes target sun in Leo; your Leo Mercury may show witty speech rather than theatrical ego. Precision about planet plus sign prevents misfit interpretations.",
      ],
    },
    {
      id: "stereotypes-and-nuance",
      heading: "Stereotypes and Nuance",
      paragraphs: [
        "Pop astrology loves caricature: stubborn Taurus, flaky Gemini, vengeful Scorpio. Real people complicate every archetype. Chart context — houses, aspects, upbringing — modifies sign expression enormously. A shy Leo with Saturn conjunct the sun may fear visibility despite craving recognition inside.",
        "Signs describe tendencies, not moral grades. No sign is toxic; no sign is blessed. Each has shadow and gift. Aries courage can become recklessness; Libra diplomacy can become avoidance; Capricorn discipline can become rigidity. Mature astrology names both potentials without shaming the sign.",
        "Cultural lens matters too. Gender roles, family expectations, and economic pressure shape how a sign shows up. Astrology speaks in symbols; sociology explains constraints. Hold both when you apply sign language to real lives, including your own.",
      ],
    },
    {
      id: "learning-signs-systematically",
      heading: "Learning the Signs Systematically",
      paragraphs: [
        "Memorize signs in wheel order with their element and modality: Aries cardinal fire, Taurus fixed earth, Gemini mutable air, and so on. Chant the sequence until it is muscle memory. Then study one sign per week, noting famous chart examples and observing people you know with prominent placements.",
        "Create flashcards: sign on one side, three keywords on the other. Add a planet each round — Venus in Libra, Mars in Libra — to practice combining functions with styles. Quiz yourself until planet-plus-sign pairs feel natural.",
        "Return to your own chart repeatedly. Which signs dominate? Which are absent? Absence does not mean lack — it often means those themes express through houses or aspects instead. Systematic study turns twelve names into a living vocabulary you can use for years.",
      ],
    },
  ],
  faq: [
    {
      question: "Why doesn't my sun sign description fit me?",
      answer:
        "You are more than your sun. Moon, rising, and other placements modify personality. Generic descriptions also ignore houses and aspects. Read your full chart for a fairer picture.",
    },
    {
      question: "Are zodiac signs the same as constellations?",
      answer:
        "In Western tropical astrology, signs are seasonal divisions, not identical to constellational boundaries. Sidereal systems align differently with stars. Know which system you are using.",
    },
    {
      question: "What is the rarest zodiac sign?",
      answer:
        "Birth rates vary by region and season, so no sign is universally rarest. Statistical differences are modest compared to chart factors beyond sun sign alone.",
    },
    {
      question: "Can two people with the same sun sign be totally different?",
      answer:
        "Yes. Moon, rising, houses, and aspects differentiate charts dramatically. Sun sign is a shared starting point, not a clone.",
    },
    {
      question: "How long are the zodiac seasons?",
      answer:
        "Each sign spans roughly thirty degrees and about one month on the calendar, though exact sun ingress times vary year to year.",
    },
  ],
  relatedSlugs: [
    "elements-and-modalities",
    "sun-moon-rising-explained",
    "what-is-astrology",
  ],
};
