import type { PillarArticle, PillarFAQ, PillarSection } from "../types";
import { PLANET_META, PLANET_SLUGS, type PlanetSlug } from "./meta";

type PlanetContent = {
  description: string;
  sections: PillarSection[];
  faq: PillarFAQ[];
};

const PLANET_CONTENT: Record<PlanetSlug, PlanetContent> = {
  sun: {
    description:
      "Learn what the Sun means in your birth chart—identity, vitality, and life purpose. Explore Sun in signs and houses, transits, mythology, and expert FAQs.",
    sections: [
      {
        id: "symbolism-mythology",
        heading: "Sun Symbolism and Mythology",
        paragraphs: [
          "The Sun (☉) is astrology's central luminary—the visible source of light, warmth, and life on Earth. In symbolic terms it represents consciousness, the ego, and the drive to become fully oneself. Ancient cultures treated the Sun as divine: Ra sailed his solar barque across the Egyptian sky, Apollo drove the chariot of day in Greek myth, and Sol Invictus—the unconquered Sun—became an emblem of imperial Rome. These stories share a theme: the Sun marks what is vital, sovereign, and impossible to ignore.",
          "As a luminary alongside the Moon, the Sun describes the yang pole of personality—active, expressive, and outward-facing. It rules Leo and is exalted in Aries, dignified placements where creative confidence and initiative flow naturally. In detriment in Aquarius and fall in Libra, solar expression may feel filtered through collective ideals or relational compromise. Keywords associated with the Sun include identity, vitality, purpose, ego, and conscious will—qualities that describe how you shine when you are most authentically yourself.",
          "In chart work, the Sun is never merely 'who you are' in a simplistic sense. It is the hero's journey encoded in the horoscope: the story you are here to live, the qualities you are learning to embody, and the center from which all other planetary functions receive light. Understanding solar symbolism is the foundation for reading every other placement in the chart.",
        ],
      },
      {
        id: "birth-chart-meaning",
        heading: "The Sun in Your Birth Chart",
        paragraphs: [
          "Your natal Sun sign describes the core style through which you express identity and seek meaning. It is the zodiac placement most people know, yet it is only one layer of solar meaning. The Sun's house shows the life arena where you naturally seek visibility and purpose—career, home, partnership, or another domain depending on placement. Aspects to the Sun from Mars, Saturn, or outer planets modify how easily confidence flows and what challenges refine your sense of self.",
          "A well-supported Sun in the chart often correlates with clarity of direction, physical resilience, and the ability to lead without dominating. A Sun under stress—square Saturn, opposed Neptune, or conjunct Pluto—may indicate periods when identity feels tested, dissolved, or transformed. These configurations are not deficits; they describe the specific work your soul chose around self-definition and creative authority.",
          "When reading the Sun, always consider its dispositor—the planet ruling the sign it occupies. A Sun in Scorpio answers to Mars or Pluto; a Sun in Taurus answers to Venus. The condition of that ruling planet colors how solar energy manifests. The Sun in a birth chart is your lifelong project of becoming: not a fixed label, but a developing center of purpose.",
        ],
      },
      {
        id: "influence-by-sign",
        heading: "Sun Influence by Zodiac Sign",
        paragraphs: [
          "The Sun expresses differently through each of the twelve signs. In fire signs (Aries, Leo, Sagittarius), solar energy is direct, enthusiastic, and fueled by inspiration. Aries Sun seeks pioneering action; Leo Sun craves creative self-expression and recognition; Sagittarius Sun expands through philosophy, travel, and belief. These placements tend toward visibility and spontaneous confidence.",
          "Earth and air Suns ground or intellectualize identity. Taurus and Capricorn Suns build identity through tangible achievement and endurance; Virgo Sun refines the self through skill and service. Gemini and Libra Suns define themselves through ideas, dialogue, and relationship; Aquarius Sun orients identity toward innovation and collective progress. Water Suns—Cancer, Scorpio, Pisces—experience identity emotionally and intuitively, often needing depth and privacy before full self-expression emerges.",
          "Because the Sun rules Leo, Leo Sun is in domicile—naturally radiant and generous when healthy. Exaltation in Aries grants courage and initiative. In Aquarius (detriment), the Sun may express through humanitarian ideals rather than personal spotlight. In Libra (fall), identity develops through partnership and aesthetic balance. Sign placement is the costume your solar purpose wears; the house and aspects tell where and how that costume performs.",
        ],
      },
      {
        id: "influence-by-house",
        heading: "Sun Influence by House Placement",
        paragraphs: [
          "The house containing your natal Sun reveals where life asks you to shine. Sun in the 1st house places identity at the forefront—people notice you, and self-presentation is central to your path. Sun in the 10th house often correlates with public visibility, career ambition, and legacy-building; many leaders and public figures have strong 10th-house solar emphasis.",
          "Angular houses (1, 4, 7, 10) amplify the Sun's visibility. Sun in the 4th house may root identity in family, ancestry, or private foundations; in the 7th, identity develops through partnership and mirroring. Succedent houses (2, 5, 8, 11) stabilize solar expression around resources, creativity, shared assets, or community. Cadent houses (3, 6, 9, 12) direct solar energy toward learning, daily work, belief systems, or spiritual retreat.",
          "House placement answers the question: where does my life force want to go? A Sun in the 6th house may find purpose through craft, health, and useful service; a Sun in the 9th through teaching, publishing, or cross-cultural exploration. Combine house with sign: a Pisces Sun in the 10th expresses differently from a Pisces Sun in the 12th. Both share Piscean sensitivity, but the stage differs.",
        ],
      },
      {
        id: "transits-timing",
        heading: "Sun Transits and Timing",
        paragraphs: [
          "The transiting Sun moves through the entire zodiac in approximately one year, spending about thirty days in each sign. The annual solar return—when the transiting Sun returns to its natal degree—marks a personal new year, a moment to set intentions aligned with your evolving identity. Many astrologers read the solar return chart as a forecast for the year ahead.",
          "Transiting Sun aspects to natal planets activate those planets briefly but potently. A transit Sun conjunct natal Jupiter may bring a day or two of optimism and opportunity; square natal Saturn may highlight duty and limitation. The Sun illuminates whatever it touches, making hidden themes visible for conscious response. Tracking the Sun through your houses shows which life area receives monthly focus.",
          "Eclipses, which occur near the nodal axis when the Sun and Moon align, are major solar timing events. Solar eclipses in particular seed new chapters related to the house and degree they activate. When a solar eclipse falls on a natal planet, expect developments in that planet's themes over the following six to eighteen months. The Sun's transit rhythm is the heartbeat of mundane astrology—predictable, cyclical, and always returning you to center.",
        ],
      },
    ],
    faq: [
      {
        question: "What does the Sun represent in astrology?",
        answer:
          "The Sun represents your core identity, vitality, conscious will, and life purpose. It describes how you express ego, creativity, and the drive to become your fullest self. While the Moon governs emotional needs, the Sun governs the outward expression of who you are becoming.",
      },
      {
        question: "Is the Sun sign the most important placement in a chart?",
        answer:
          "The Sun sign is significant but not the whole chart. The Moon, rising sign, and chart ruler often feel equally or more immediate in daily life. Professional astrologers synthesize all placements. The Sun describes long-term purpose; the Ascendant describes approach; the Moon describes emotional security needs.",
      },
      {
        question: "What is the difference between Sun sign and rising sign?",
        answer:
          "Your Sun sign reflects core identity and purpose; your rising sign (Ascendant) reflects persona, first impressions, and how you navigate the world. Someone with a quiet Cancer Sun and an outgoing Sagittarius rising may seem adventurous initially while needing deep emotional roots privately.",
      },
      {
        question: "How long does the Sun stay in each zodiac sign?",
        answer:
          "The Sun transits each zodiac sign for approximately thirty days, completing the full zodiac in about a year. Exact dates shift slightly each year. Your solar return occurs when the transiting Sun returns to the precise degree of your natal Sun, marking your astrological birthday.",
      },
    ],
  },

  moon: {
    description:
      "Explore the Moon in astrology—emotions, instincts, and inner needs. Natal Moon meaning, sign and house influence, transits, lunar mythology, and detailed FAQs.",
    sections: [
      {
        id: "symbolism-mythology",
        heading: "Moon Symbolism and Mythology",
        paragraphs: [
          "The Moon (☽) is astrology's second luminary—the reflective, yin counterpart to the Sun's radiance. Where the Sun shines consciously, the Moon glows instinctively. It governs the tides, menstrual cycles, and the rhythms of sleep and mood. In myth, lunar deities embody mystery and change: Selene and Artemis in Greece, Diana the huntress, Khonsu in Egypt, and Chang'e of Chinese legend. The Moon is never the same two nights running, and its symbolism embraces flux, memory, and the unconscious.",
          "Ruling Cancer and exalted in Taurus, the Moon finds comfort in nurturing, stability, and sensory security. In detriment in Capricorn and fall in Scorpio, emotional needs may be disciplined to the point of suppression or intensified to the point of obsession. Keywords—emotions, habits, memory, needs, instinct—point to the Moon's domain: what you require to feel safe, how you self-soothe, and the private self beneath public identity.",
          "The Moon is the fastest-moving luminary, changing signs every two to three days. This speed mirrors its astrological role as the mood-maker, the part of you that reacts before the mind catches up. In traditional astrology the Moon is the sect light for nocturnal charts and the primary significator of the body and daily well-being.",
        ],
      },
      {
        id: "birth-chart-meaning",
        heading: "The Moon in Your Birth Chart",
        paragraphs: [
          "Your natal Moon sign describes your emotional temperament and what you need to feel nourished. Unlike the Sun, which you grow into, the Moon is often felt from childhood—it reflects early caregiving experiences and the habits formed in response. The Moon's house shows where you seek comfort and emotional fulfillment, whether through home, career, friendship, or solitude.",
          "Aspects to the Moon are among the most psychologically revealing in a chart. Moon conjunct Venus softens emotional expression; Moon square Mars may indicate reactive moods or inner conflict between needs and action. Moon with Saturn can suggest emotional reserve or early responsibility; Moon with Neptune may heighten empathy and sensitivity to atmosphere. The Moon's phase at birth—New, Full, waxing, or waning—adds another layer used by some astrologers to describe life orientation.",
          "The Moon is the chart's memory bank. It stores impressions, comforts, and triggers. When transits activate your natal Moon, emotional themes surface for processing. Understanding your Moon is essential for self-care, parenting, and relationship compatibility, because it describes what you need—not what you want to project.",
        ],
      },
      {
        id: "influence-by-sign",
        heading: "Moon Influence by Zodiac Sign",
        paragraphs: [
          "Moon in fire signs (Aries, Leo, Sagittarius) processes emotion quickly and expressively. Aries Moon needs independence and directness; Leo Moon needs warmth, appreciation, and play; Sagittarius Moon needs freedom, optimism, and meaning. These Moons may dislike prolonged emotional dwelling and prefer action or humor.",
          "Earth Moons (Taurus, Virgo, Capricorn) seek practical security. Taurus Moon—the exaltation placement—finds deep comfort in routine, beauty, and physical pleasure. Virgo Moon calms through order and usefulness; Capricorn Moon, though in detriment, stabilizes through achievement and structure, sometimes at the cost of vulnerability. Air Moons (Gemini, Libra, Aquarius) intellectualize feelings and need conversation, fairness, or space to process.",
          "Water Moons (Cancer, Scorpio, Pisces) feel deeply. Cancer Moon is in domicile—nurturing, protective, and strongly tied to home and family. Scorpio Moon (fall) experiences emotions with intensity and needs trust and depth. Pisces Moon dissolves boundaries, absorbing environments and requiring creative or spiritual outlets. Moon sign compatibility in relationships often hinges on whether two people can meet each other's emotional language.",
        ],
      },
      {
        id: "influence-by-house",
        heading: "Moon Influence by House Placement",
        paragraphs: [
          "Moon in the 4th house is angular and traditionally strong—home, family, and roots dominate emotional life. Moon in the 1st house wears feelings on the surface; moods are visible and the body may be sensitive. Moon in the 7th house seeks emotional fulfillment through partnership; in the 10th, through public role or reputation, sometimes blurring professional and personal boundaries.",
          "The Moon in cadent houses directs emotional energy inward or toward specific functions. Moon in the 3rd house needs talk, learning, and local connection; in the 6th, routine, health, and meaningful work; in the 9th, travel, philosophy, or belief; in the 12th, solitude, dreams, and spiritual retreat. Moon in the 5th craves creative play and joy; in the 8th, depth, intimacy, and transformation.",
          "House placement shows where you look for comfort when stressed. A person with Moon in the 11th house may self-soothe through friends and community; one with Moon in the 2nd through financial security and sensory pleasure. Transiting planets through the house of your natal Moon activate emotional processing in that life area.",
        ],
      },
      {
        id: "transits-timing",
        heading: "Moon Transits and Timing",
        paragraphs: [
          "The transiting Moon completes the zodiac in roughly twenty-seven and a half days, spending about two and a half days in each sign. This rapid cycle makes the Moon the primary timer of daily and weekly mood fluctuations. Void-of-course Moon periods—when the Moon makes no major aspects before leaving its sign—are traditionally used for rest rather than initiating important matters.",
          "Lunar transits to natal planets are felt immediately. A transit Moon conjunct natal Venus might bring social ease; square natal Saturn, emotional heaviness or obligation. Many astrologers track the Moon's daily sign and house transit for timing meetings, creative work, or rest. The Moon's return to its natal sign each month marks a brief emotional reset—a monthly check-in with your inner needs.",
          "Progressed Moon techniques move the natal Moon forward symbolically, spending about two and a half years in each sign. A progressed Moon change often coincides with shifts in emotional priorities and life focus. Lunar eclipses, occurring when the Earth shadows the Moon, bring culmination and release in the house axis they activate. The Moon's timing is intimate and fast—the astrology of felt experience.",
        ],
      },
    ],
    faq: [
      {
        question: "What does the Moon represent in astrology?",
        answer:
          "The Moon represents emotions, instincts, habits, memory, and inner needs. It describes how you nurture and wish to be nurtured, your relationship with the past, and your private emotional self. It is the fastest luminary and reflects daily mood and comfort patterns.",
      },
      {
        question: "Why is my Moon sign so different from my Sun sign?",
        answer:
          "Sun and Moon measure different things—purpose versus emotional nature. Many people identify with both at different times. The Sun is who you are becoming; the Moon is how you feel and what you need right now. A Capricorn Sun with a Pisces Moon might pursue ambitious goals while needing quiet, compassionate downtime.",
      },
      {
        question: "How does the Moon affect relationships?",
        answer:
          "Moon sign compatibility reflects whether partners understand each other's emotional needs. Harmonious Moon aspects between charts suggest natural comfort; challenging aspects require conscious effort to bridge different security styles. The Moon is often more important than Sun sign for long-term domestic compatibility.",
      },
      {
        question: "What is a void-of-course Moon?",
        answer:
          "A void-of-course Moon occurs when the Moon makes its last major aspect in a sign before entering the next sign. Traditional astrology advises against starting important ventures during void periods, as outcomes may not develop as expected. It is considered favorable for reflection, rest, and routine tasks.",
      },
    ],
  },

  mercury: {
    description:
      "Master Mercury in astrology—communication, thinking, and learning styles. Natal chart meaning, sign and house effects, retrograde transits, mythology, and FAQs.",
    sections: [
      {
        id: "symbolism-mythology",
        heading: "Mercury Symbolism and Mythology",
        paragraphs: [
          "Mercury (☿) is the messenger planet—swift, adaptable, and endlessly curious. In Roman myth Mercury (Hermes in Greece) traveled between worlds: guiding souls, delivering divine messages, and outwitting opponents with clever speech. He wore the caduceus and winged sandals, symbols of mediation between opposites. Astrologically Mercury bridges mind and matter, self and other, conscious and unconscious.",
          "As a personal planet, Mercury rules Gemini and Virgo and is exalted in Virgo. It governs communication, thinking, learning, curiosity, and logic—the mental tools you use to navigate daily life. In detriment in Sagittarius and fall in Pisces, Mercury's precision may give way to big-picture enthusiasm or intuitive impression. Mercury never travels far from the Sun, keeping mental functions tied to identity and will.",
          "Mercury is neither masculine nor feminine in the traditional sense—it is neutral, taking on the tone of the signs and planets it contacts. Its retrograde periods, when Mercury appears to move backward, have become cultural phenomena, though astrologers debate their scope. Fundamentally Mercury asks: how do you think, speak, and learn?",
        ],
      },
      {
        id: "birth-chart-meaning",
        heading: "Mercury in Your Birth Chart",
        paragraphs: [
          "Your natal Mercury describes cognitive style, communication preferences, and how you process information. Mercury sign shows whether you think analytically or holistically, quickly or deeply, verbally or visually. Mercury house reveals where the mind focuses—education, career, home, or relationships depending on placement.",
          "Mercury aspects shape mental temperament profoundly. Mercury conjunct Sun fuses identity with intellect; Mercury square Neptune may indicate vivid imagination alongside occasional confusion or miscommunication. Mercury with Uranus speeds thinking and invites unconventional ideas; with Saturn, careful, structured thought. The speed and condition of Mercury in the chart often correlate with learning style and professional communication needs.",
          "Because Mercury rules both Gemini (curiosity, breadth) and Virgo (analysis, precision), a single Mercury can express either pole depending on sign, house, and aspects. A Mercury in Sagittarius (detriment) may prefer philosophy over detail; in Virgo (domicile and exaltation), craft and accuracy dominate. Read Mercury with its dispositor and any stellium it joins.",
        ],
      },
      {
        id: "influence-by-sign",
        heading: "Mercury Influence by Zodiac Sign",
        paragraphs: [
          "Mercury in fire signs thinks fast and speaks boldly. Aries Mercury is direct and competitive in debate; Leo Mercury is dramatic and persuasive; Sagittarius Mercury (detriment) thinks in broad strokes, favoring principles over particulars. These placements excel at inspiration and initiative but may overlook nuance.",
          "Earth Mercuries ground thought in practicality. Taurus Mercury learns through repetition and sensory experience; Virgo Mercury (exalted) excels at editing, analysis, and technical skill; Capricorn Mercury plans strategically and speaks with authority. Air Mercuries—Gemini (domicile), Libra, Aquarius—are verbal, social, and conceptual. Gemini Mercury is quick and versatile; Libra Mercury weighs options diplomatically; Aquarius Mercury innovates and systematizes.",
          "Water Mercuries think intuitively. Cancer Mercury remembers emotionally and communicates with care; Scorpio Mercury probes beneath surfaces; Pisces Mercury (fall) thinks in images, symbols, and impressions, sometimes struggling with linear structure. No Mercury sign is superior—each suits different tasks. The goal is to know your mental style and develop its strengths.",
        ],
      },
      {
        id: "influence-by-house",
        heading: "Mercury Influence by House Placement",
        paragraphs: [
          "Mercury in the 3rd house is in its joy—communication, siblings, local travel, and early education thrive. Mercury in the 10th may indicate a career in writing, teaching, media, or commerce. Mercury in the 1st places intellect at the forefront of personality; others perceive you as talkative or mentally agile.",
          "Angular Mercury placements make the mind visible. In the 4th, thinking turns toward family history and private reflection; in the 7th, toward dialogue and negotiation with partners. Mercury in the 6th house suits detailed work, editing, and health research; in the 9th, higher education, publishing, and cross-cultural study. Cadent house Mercuries often indicate minds that work behind the scenes or in specialized domains.",
          "House placement shows where you think and talk most. Mercury in the 5th enjoys wordplay, games, and creative writing; in the 8th, research, psychology, and confidential matters; in the 11th, group planning and social networks; in the 12th, private journaling, meditation, and subconscious processing. Combine house with sign for a full picture of mental focus.",
        ],
      },
      {
        id: "transits-timing",
        heading: "Mercury Transits and Timing",
        paragraphs: [
          "Mercury transits each sign in about three weeks, but retrograde cycles—three to four times per year, lasting roughly three weeks each—slow and complicate matters. During Mercury retrograde, review, revision, and reconnection are favored; launching brand-new contracts or tech setups is traditionally cautioned. Not every mishap is Mercury retrograde, but the period does invite slower, more deliberate communication.",
          "Transiting Mercury aspects to natal planets activate mental themes. A transit Mercury conjunct natal Mars may sharpen debate; trine natal Jupiter, expand learning opportunities. Mercury transits through your houses show where conversations and decisions cluster each month. Mercury return charts, cast when transiting Mercury returns to its natal degree, can highlight mental focus for that cycle.",
          "Mercury's synodic relationship with the Sun creates morning star and evening star phases that some astrologers use for timing. Electional astrologers choose Mercury hours for contracts, writing, and travel. Tracking Mercury's sign and retrograde status is among the most practical transit work for daily life—because communication and logistics touch everything.",
        ],
      },
    ],
    faq: [
      {
        question: "What does Mercury rule in astrology?",
        answer:
          "Mercury rules communication, thinking, learning, writing, speaking, commerce, and short-distance travel. It governs Gemini and Virgo and describes how you process and share information. It is the planet of the rational mind and everyday logistics.",
      },
      {
        question: "What happens during Mercury retrograde?",
        answer:
          "Mercury retrograde is an optical illusion caused by Earth's orbit, but astrologically it marks a period favoring review, editing, and revisiting past topics. Miscommunications and delays may increase. It is a poor time for signing major contracts or launching new tech, but excellent for reflection and finishing old projects.",
      },
      {
        question: "Can Mercury be in the same sign as my Sun?",
        answer:
          "Yes. Mercury never strays more than one sign from the Sun. You may have Mercury in the same sign as your Sun, or in the sign immediately before or after. This keeps mental style closely linked to identity, though house placement and aspects still create variation.",
      },
      {
        question: "How does Mercury affect learning style?",
        answer:
          "Mercury sign and house suggest how you learn best. Earth Mercuries prefer hands-on practice; air Mercuries thrive on discussion and reading; fire Mercuries need engagement and challenge; water Mercuries absorb through story, emotion, and immersion. Mercury aspects to Saturn or Neptune further modify concentration and imagination.",
      },
    ],
  },

  venus: {
    description:
      "Understand Venus in astrology—love, beauty, values, and attraction. Birth chart Venus, sign and house meaning, transit timing, mythology, and expert FAQs.",
    sections: [
      {
        id: "symbolism-mythology",
        heading: "Venus Symbolism and Mythology",
        paragraphs: [
          "Venus (♀) is the planet of attraction—love, beauty, pleasure, and what you value. Roman Venus descends from Greek Aphrodite, born from sea foam and celebrated as the fairest of goddesses. Her myths explore desire, jealousy, and the binding power of beauty. In astrology Venus describes not only romance but aesthetics, finances, social grace, and the principle of harmony that draws unlike things into relationship.",
          "Ruling Taurus and Libra and exalted in Pisces, Venus finds strength in sensory pleasure, partnership, and compassionate devotion. In detriment in Aries and fall in Virgo, Venus may express as impulsive desire or critical perfectionism in love. Keywords—love, beauty, values, pleasure, attraction—map the territory where Venus operates: what you want, what you find beautiful, and what you are willing to invest in.",
          "Venus is a personal planet, never far from the Sun, linking values closely to identity. As the lesser benefic in traditional astrology, Venus brings ease, charm, and reconciliation. Its cycle includes a dramatic retrograde every eighteen months, revisiting relationship and financial themes. Venus asks: what do you love, and how do you attract what you desire?",
        ],
      },
      {
        id: "birth-chart-meaning",
        heading: "Venus in Your Birth Chart",
        paragraphs: [
          "Natal Venus describes your love language, aesthetic preferences, and relationship patterns. Venus sign shows how you express affection and what you find attractive; Venus house reveals where you seek pleasure and harmony. A person with Venus in the 7th house may define fulfillment through partnership; Venus in the 2nd through material comfort and sensory beauty.",
          "Venus aspects color relational experience. Venus conjunct Mars blends desire and affection; Venus square Saturn may indicate delayed love or lessons in self-worth; Venus with Neptune romanticizes and spiritualizes attraction. Venus trine Jupiter often brings social ease and generosity. Hard Venus aspects are not curses—they describe the specific work of learning to receive and give love authentically.",
          "Venus also governs money and possessions in traditional astrology, reflecting what you value enough to acquire. Taurus Venus tends toward stability and quality; Libra Venus toward balance and shared resources. Reading Venus with its dispositor and the condition of the 7th house ruler gives a complete picture of relational style.",
        ],
      },
      {
        id: "influence-by-sign",
        heading: "Venus Influence by Zodiac Sign",
        paragraphs: [
          "Venus in fire signs loves boldly and passionately. Aries Venus (detriment) pursues conquest and excitement; Leo Venus craves admiration and grand romance; Sagittarius Venus needs adventure and philosophical connection in love. These placements may fall in love quickly and value independence within relationship.",
          "Earth Venuses express love through tangible devotion. Taurus Venus (domicile) is loyal, sensual, and patient; Virgo Venus (fall) shows care through acts of service and practical support; Capricorn Venus commits seriously and values status and reliability. Air Venuses—Libra (domicile), Gemini, Aquarius—love through conversation, ideas, and social connection.",
          "Water Venuses feel love deeply. Cancer Venus nurtures and protects; Scorpio Venus desires intensity and soul-merging; Pisces Venus (exaltation) loves unconditionally and idealistically, sometimes sacrificing boundaries for union. Venus sign compatibility in synastry compares whether two people share compatible values and affection styles.",
        ],
      },
      {
        id: "influence-by-house",
        heading: "Venus Influence by House Placement",
        paragraphs: [
          "Venus in the 7th house emphasizes partnership—marriage and close alliances often central to happiness. Venus in the 1st bestows charm and physical appeal; in the 10th, social grace may support career and public image. Venus in the 4th seeks beauty and harmony at home; in the 5th, creative and romantic pleasure dominate.",
          "Venus in the 2nd house links values to income and possessions—financial luck or talent for attracting resources may appear. Venus in the 8th deepens intimacy and shared finances; in the 11th, friendship and community bring joy. Venus in cadent houses may express more privately: the 3rd through pleasant conversation, the 6th through harmonious work environments, the 9th through cultural appreciation, the 12th through spiritual or hidden love.",
          "House placement shows where Venusian themes—pleasure, attraction, and harmony—seek expression. Transiting planets aspecting natal Venus or transiting through Venus's house activate relationship and financial developments. A strong Venus by house and aspect is one indicator of social and romantic ease, though free will and growth always modify outcomes.",
        ],
      },
      {
        id: "transits-timing",
        heading: "Venus Transits and Timing",
        paragraphs: [
          "Venus transits each sign in about four weeks, except during retrograde when it lingers in one sign for months. Venus retrograde, occurring roughly every eighteen months, invites reassessment of relationships, values, and finances. Ex-partners may reappear; aesthetic tastes may shift. It is a time for clarifying what you truly value rather than chasing novelty.",
          "Transiting Venus aspects to natal planets bring brief but pleasant—or challenging—social weather. Venus conjunct natal Sun boosts confidence and charm; square natal Pluto may intensify desire and power dynamics in relationships. Venus transiting the 7th house is traditionally favorable for romance and partnership; through the 2nd, for income and purchases.",
          "Venus's synodic cycle creates morning star and evening star phases with distinct mythic tones—some astrologers associate the evening star Venus with introspective love and the morning star with outward pursuit. Electional astrologers choose Venus hours for weddings, art, and negotiations. Tracking Venus through your chart is practical magic for timing social and financial moves.",
        ],
      },
    ],
    faq: [
      {
        question: "What does Venus represent in astrology?",
        answer:
          "Venus represents love, beauty, pleasure, values, attraction, and harmony. It governs romance, aesthetics, social grace, and what you find worth having. It rules Taurus and Libra and shows how you give and receive affection.",
      },
      {
        question: "Is Venus only about romantic love?",
        answer:
          "No. Venus also governs friendship, art, money, self-worth, and sensory pleasure. It describes what you value in all forms—not only partners but also possessions, creative expression, and social harmony.",
      },
      {
        question: "What is Venus retrograde good for?",
        answer:
          "Venus retrograde favors reviewing relationships, renegotiating values, and reconnecting with past loves or creative projects. It is less ideal for weddings, major purchases, or cosmetic changes you might later regret. Reflection beats impulse during this cycle.",
      },
      {
        question: "How does Venus affect compatibility?",
        answer:
          "Synastry compares Venus placements between charts. Harmonious Venus aspects suggest mutual attraction and shared values; challenging aspects indicate different love languages requiring awareness. Venus-Mars contacts often signal strong physical chemistry.",
      },
    ],
  },

  mars: {
    description:
      "Learn Mars in astrology—drive, action, desire, and courage. Natal Mars placement, sign and house effects, transit timing, warrior mythology, and FAQs.",
    sections: [
      {
        id: "symbolism-mythology",
        heading: "Mars Symbolism and Mythology",
        paragraphs: [
          "Mars (♂) is the god of war—aggressive, passionate, and unyielding. Roman Mars (Ares in Greece) embodied martial courage, sexual drive, and the raw force required to defend territory and pursue desire. Unlike strategic Minerva, Mars charges forward. In astrology Mars represents how you act, assert, compete, and channel anger. It is the engine of will applied to the world.",
          "Ruling Aries and exalted in Capricorn, Mars thrives in direct action and disciplined ambition. In detriment in Libra and fall in Cancer, martial energy may express through passive aggression, indecision, or protective defensiveness rather than open confrontation. Keywords—drive, action, desire, conflict, courage—define Mars's territory: what you fight for, how you pursue goals, and where friction arises.",
          "Mars is a personal planet with a cycle of roughly two years through the zodiac. Its retrograde, occurring every two years for about two months, internalizes drive and may frustrate outward action. Mars is traditionally the lesser malefic, not because it is evil, but because its heat and dryness can disrupt if unmanaged. Mars asks: what do you want, and what are you willing to do to get it?",
        ],
      },
      {
        id: "birth-chart-meaning",
        heading: "Mars in Your Birth Chart",
        paragraphs: [
          "Natal Mars describes your assertiveness style, physical energy, and relationship to anger and desire. Mars sign shows whether you act impulsively or strategically, openly or indirectly. Mars house reveals where you invest drive—career, home, relationships, or hidden arenas depending on placement.",
          "Mars aspects are critical for understanding conflict and motivation. Mars conjunct Sun fuses identity with action; Mars square Saturn may indicate blocked anger or disciplined endurance; Mars with Pluto intensifies willpower and sometimes obsession. Mars-Venus aspects blend desire and affection, shaping sexual and creative expression. A suppressed Mars can manifest as passive behavior or somatic tension; an overactive Mars as recklessness or burnout.",
          "Mars also rules tools, surgery, athletes, and soldiers in traditional significations. Its condition in the chart correlates with energy levels and how you handle competition. Read Mars with its dispositor and the houses it rules (by sign on cusps) for a complete martial profile.",
        ],
      },
      {
        id: "influence-by-sign",
        heading: "Mars Influence by Zodiac Sign",
        paragraphs: [
          "Mars in fire signs acts with speed and confidence. Aries Mars (domicile) is pioneering and combative; Leo Mars fights for honor and creative expression; Sagittarius Mars pursues ideals and adventure. These placements need physical outlets and may grow restless without challenge.",
          "Earth Marses act methodically. Taurus Mars persists with stubborn strength; Virgo Mars applies energy to craft and precision; Capricorn Mars (exaltation) is among the most strategically effective—patient, ambitious, and enduring. Air Marses—Gemini, Libra, Aquarius—fight with words and ideas. Libra Mars (detriment) may avoid direct conflict, preferring negotiation or passive resistance.",
          "Water Marses act emotionally. Cancer Mars (fall) defends home and family fiercely but may struggle with direct assertion; Scorpio Mars pursues with intensity and secrecy; Pisces Mars channels drive into imagination or spiritual service, sometimes diffusing focus. Healthy Mars expression in any sign requires conscious channeling—not suppression—of anger and desire.",
        ],
      },
      {
        id: "influence-by-house",
        heading: "Mars Influence by House Placement",
        paragraphs: [
          "Mars in the 1st house places drive on the surface—assertive, visible, sometimes combative personality. Mars in the 10th fuels career ambition and public action; in the 7th, it may attract dynamic partners or partnership conflict. Mars in the 4th can indicate active home life or family tension; in the 5th, creative passion and competitive play.",
          "Mars in the 6th house drives work ethic and may correlate with inflammation or acute health issues if stressed. Mars in the 8th intensifies sexuality and shared resources; in the 12th, anger may be hidden or sublimated into spiritual or artistic pursuit. Angular Mars placements make action conspicuous; cadent placements may direct energy toward learning, service, or retreat.",
          "House placement shows where you fight and strive. Transiting Mars through a house energizes that life area for roughly six weeks—excellent for initiative if handled consciously, frustrating if it triggers impulsive conflict. Mars return charts, cast every two years, highlight action themes for the coming cycle.",
        ],
      },
      {
        id: "transits-timing",
        heading: "Mars Transits and Timing",
        paragraphs: [
          "Mars transits each sign in about six to seven weeks, longer during retrograde. Transiting Mars conjunct natal planets ignites those planets' themes with urgency. Mars square natal Moon may bring irritability; trine natal Sun, productive energy and confidence. Mars through the 10th house often correlates with career push; through the 7th, relationship activation or conflict.",
          "Mars retrograde turns drive inward. Projects may stall; anger may require processing rather than expression. Starting major fights or surgeries during Mars retrograde is traditionally cautioned, though life does not pause. Use the period to refine strategy and understand what you truly want to pursue.",
          "Electional astrologers avoid Mars afflictions for peaceable events and may invoke Mars hours for competition or surgery when necessary. Mars timing is blunt and fast—ideal for launching physical efforts, athletic training, and decisive action when aligned with your natal chart.",
        ],
      },
    ],
    faq: [
      {
        question: "What does Mars represent in astrology?",
        answer:
          "Mars represents drive, action, desire, anger, courage, and conflict. It shows how you assert yourself, pursue goals, and handle competition. It rules Aries and describes your physical energy and motivational style.",
      },
      {
        question: "Is a strong Mars bad in a chart?",
        answer:
          "A strong Mars is not bad—it indicates vitality, courage, and initiative. Challenges arise when Mars is unmanaged: impulsivity, aggression, or burnout. Conscious channeling through exercise, constructive competition, and assertiveness training transforms Mars into productive force.",
      },
      {
        question: "What is Mars retrograde like?",
        answer:
          "Mars retrograde occurs roughly every two years for about two months. Outward action may slow; frustration can build. It is a time to revise strategies, process anger, and reconsider what you are fighting for rather than launching new confrontations or major physical initiatives.",
      },
      {
        question: "How does Mars affect sexuality?",
        answer:
          "Mars is a primary significator of sexual drive and physical desire. Its sign, house, and aspects to Venus describe how desire is expressed and what ignites passion. Mars-Venus contacts in synastry often indicate strong physical chemistry between partners.",
      },
    ],
  },

  jupiter: {
    description:
      "Discover Jupiter in astrology—expansion, faith, growth, and wisdom. Natal Jupiter meaning, sign and house influence, lucky transits, mythology, and FAQs.",
    sections: [
      {
        id: "symbolism-mythology",
        heading: "Jupiter Symbolism and Mythology",
        paragraphs: [
          "Jupiter (♃) is the greater benefic—planet of expansion, faith, and abundance. Roman Jupiter (Zeus in Greece) ruled Olympus, hurled thunderbolts, and dispensed justice from on high. Kings sought his favor; travelers invoked his protection. Astrologically Jupiter represents growth, optimism, wisdom, and the belief that life can improve. Where Jupiter touches the chart, things tend to expand—sometimes wisely, sometimes excessively.",
          "Ruling Sagittarius and exalted in Cancer, Jupiter finds strength in exploration, philosophy, and nurturing growth. In detriment in Gemini and fall in Capricorn, expansion may scatter into trivia or be constrained by pragmatism and hierarchy. Keywords—expansion, faith, growth, luck, wisdom—capture Jupiter's promise: opportunity, meaning, and the courage to think bigger.",
          "Jupiter's cycle of roughly twelve years brings a return to its natal position—a milestone of personal growth and renewed purpose. As a social planet, Jupiter describes how you engage with belief systems, education, law, and cultural horizons. Jupiter asks: what do you believe, and where are you called to grow?",
        ],
      },
      {
        id: "birth-chart-meaning",
        heading: "Jupiter in Your Birth Chart",
        paragraphs: [
          "Natal Jupiter describes where you find luck, meaning, and natural confidence. Jupiter sign shows the style of your faith and expansion—fire Jupiter takes risks; earth Jupiter builds steadily; air Jupiter learns and connects; water Jupiter feels and intuits. Jupiter house reveals the life arena where opportunities tend to appear.",
          "Jupiter aspects modify how grace flows. Jupiter trine Sun often brings ease and visibility; Jupiter square Neptune may inflate expectations or invite disillusionment; Jupiter conjunct Pluto intensifies ambition and transformative growth. A challenged Jupiter is not unlucky—it may indicate learning to earn wisdom through experience rather than assuming ease.",
          "Jupiter also governs higher education, publishing, foreign travel, and religious or philosophical orientation in traditional astrology. Its condition correlates with generosity, tolerance, and the ability to inspire others. Read Jupiter with its dispositor and houses it rules for full context.",
        ],
      },
      {
        id: "influence-by-sign",
        heading: "Jupiter Influence by Zodiac Sign",
        paragraphs: [
          "Jupiter in fire signs expands through vision and adventure. Aries Jupiter pioneers new beliefs; Leo Jupiter grows through creative leadership; Sagittarius Jupiter (domicile) is the archetypal seeker—philosophical, optimistic, and restless for truth. These placements may take risks others avoid.",
          "Earth Jupiters grow through practical application. Taurus Jupiter expands resources and sensory enjoyment; Virgo Jupiter (detriment) finds meaning in skill and service; Capricorn Jupiter (fall) builds legacy through discipline and institutional knowledge. Air Jupiters—Gemini, Libra, Aquarius—expand through ideas, relationships, and social systems.",
          "Water Jupiters grow emotionally and spiritually. Cancer Jupiter (exaltation) nurtures generously and finds faith through family and belonging; Scorpio Jupiter seeks depth and transformative truth; Pisces Jupiter dissolves boundaries toward compassion and mystical experience. Jupiter sign in synastry can indicate shared beliefs and mutual encouragement.",
        ],
      },
      {
        id: "influence-by-house",
        heading: "Jupiter Influence by House Placement",
        paragraphs: [
          "Jupiter in the 1st house bestows confidence, visibility, and often physical presence. Jupiter in the 10th supports career growth and public reputation; in the 7th, partnership blessings and beneficial alliances. Jupiter in the 2nd may correlate with financial expansion; in the 8th, with inheritances or shared resources.",
          "Jupiter in the 9th house is in its joy—travel, higher education, and publishing thrive. Jupiter in the 5th brings creative abundance and joy with children; in the 11th, community support and network growth. Cadent Jupiter placements expand learning (3rd), service (6th), or spiritual life (12th) depending on house.",
          "House placement shows where life says yes more often. Transiting Jupiter through a house—roughly one year per house—expands that domain: career during 10th house transit, home during 4th. Jupiter transits are among the most welcomed in predictive astrology, though overextension remains a risk.",
        ],
      },
      {
        id: "transits-timing",
        heading: "Jupiter Transits and Timing",
        paragraphs: [
          "Jupiter transits each sign for about one year, completing the zodiac in roughly twelve years. The Jupiter return at ages 12, 24, 36, 48, and so on marks cycles of renewed growth and purpose assessment. Transiting Jupiter conjunct natal planets brings opportunity and expansion to those planets' themes.",
          "Jupiter trines and sextiles to natal placements are classic windows for launching ventures, studying, traveling, or marrying. Jupiter squares may indicate overconfidence or growth through challenge. Saturn-Jupiter combinations in transit often mark economic and social policy shifts as well as personal maturation.",
          "Electional astrologers favor Jupiter hours for weddings, business launches, and legal matters. Tracking Jupiter through your houses provides a twelve-year map of where expansion is supported. Jupiter rewards faith—but wisdom lies in knowing which opportunities to accept.",
        ],
      },
    ],
    faq: [
      {
        question: "What does Jupiter represent in astrology?",
        answer:
          "Jupiter represents expansion, faith, growth, wisdom, luck, and abundance. It shows where you find meaning, optimism, and opportunity. It rules Sagittarius and describes your relationship with belief, education, and horizons.",
      },
      {
        question: "Is Jupiter always lucky?",
        answer:
          "Jupiter brings ease and opportunity, but not guaranteed success. Excess, overconfidence, and wasted chances are Jupiter shadows. A well-used Jupiter attracts growth through generosity, learning, and wise risk; a neglected one may manifest as complacency or missed openings.",
      },
      {
        question: "What is a Jupiter return?",
        answer:
          "A Jupiter return occurs approximately every twelve years when transiting Jupiter returns to its natal sign and degree. It marks a new cycle of growth, often coinciding with educational milestones, career expansion, or philosophical shifts. Ages 12, 24, 36, and 48 are common return years.",
      },
      {
        question: "How does Jupiter affect career?",
        answer:
          "Jupiter in the 10th house or strong aspects to the Midheaven often support career growth, public recognition, and leadership roles. Jupiter transits through the 10th house frequently coincide with promotions, new ventures, or expanded professional visibility.",
      },
    ],
  },

  saturn: {
    description:
      "Study Saturn in astrology—discipline, limits, maturity, and karma. Natal Saturn meaning, sign and house lessons, transit cycles, mythology, and detailed FAQs.",
    sections: [
      {
        id: "symbolism-mythology",
        heading: "Saturn Symbolism and Mythology",
        paragraphs: [
          "Saturn (♄) is the greater malefic—and the great teacher. Roman Saturn (Cronus in Greece) devoured his children until Zeus overthrew him, a myth of time, limitation, and the inevitability of change. Saturn was also a golden-age god of agriculture and harvest, reminding us that restriction and reward are linked. In astrology Saturn represents structure, discipline, fear, maturity, and the consequences of choice.",
          "Ruling Capricorn and exalted in Libra, Saturn builds lasting foundations and fair contracts. In detriment in Cancer and fall in Aries, discipline may feel emotionally cold or blocked by impulsivity. Keywords—discipline, limits, maturity, structure, karma—describe Saturn's lessons: what you must work for, what you fear, and what endures when glamour fades.",
          "Saturn's cycle of roughly twenty-nine and a half years brings the Saturn return—a rite of passage at ages 29–30, 58–59, and 87–88. As a social planet, Saturn describes institutions, authority, and societal boundaries. Saturn asks: what are you building, and what must you take responsibility for?",
        ],
      },
      {
        id: "birth-chart-meaning",
        heading: "Saturn in Your Birth Chart",
        paragraphs: [
          "Natal Saturn describes where you encounter limits, fear, and the need for mastery. Saturn sign shows the style of your discipline—Capricorn Saturn is traditional; Aquarius Saturn innovates within structure. Saturn house reveals the life arena demanding patience and long-term effort.",
          "Saturn aspects are among the most formative. Saturn conjunct Moon may indicate emotional reserve or early responsibility; Saturn trine Sun supports disciplined achievement; Saturn square Venus may delay love or teach self-worth through relationship tests. Saturn with Uranus or Pluto in aspect marks generational tension between structure and change.",
          "A well-integrated Saturn brings authority earned through experience, not dominance. A challenged Saturn may manifest as fear, rigidity, or avoidance of responsibility. Saturn is not punishment—it is the planet of mastery through time. Read Saturn with its dispositor and the houses it rules.",
        ],
      },
      {
        id: "influence-by-sign",
        heading: "Saturn Influence by Zodiac Sign",
        paragraphs: [
          "Saturn in fire signs disciplines impulse. Aries Saturn (fall) learns patience with initiative; Leo Saturn may fear visibility or earn authority through creative endurance; Sagittarius Saturn structures belief and travel. These placements grow through repeated effort in self-expression.",
          "Earth Saturns are strong. Taurus Saturn builds material security slowly; Virgo Saturn masters craft through meticulous work; Capricorn Saturn (domicile) embodies ambition, responsibility, and institutional power. Air Saturns—Gemini, Libra, Aquarius—structure thought and social systems. Libra Saturn (exaltation) excels at fair agreements.",
          "Water Saturns carry emotional weight. Cancer Saturn (detriment) may fear vulnerability or parent early; Scorpio Saturn confronts power and control; Pisces Saturn structures compassion or struggles with boundaries. Saturn sign shows the flavor of your lifelong homework.",
        ],
      },
      {
        id: "influence-by-house",
        heading: "Saturn Influence by House Placement",
        paragraphs: [
          "Saturn in the 1st house may delay self-confidence but ultimately forges strong character. Saturn in the 10th often indicates career ambition with slow climb to authority. Saturn in the 7th teaches relationship responsibility; in the 4th, family duty and ancestral patterns.",
          "Saturn in the 2nd house structures finances—often teaching thrift before abundance. Saturn in the 8th confronts shared resources and mortality; in the 12th, hidden fears and spiritual discipline. Angular Saturn makes limitation visible; cadent Saturn may internalize lessons through work, study, or service.",
          "House placement shows where Saturn says not yet. Transiting Saturn through a house—roughly two and a half years per house—demands maturity in that domain. The Saturn return resets life structure around the houses Saturn rules and occupies.",
        ],
      },
      {
        id: "transits-timing",
        heading: "Saturn Transits and Timing",
        paragraphs: [
          "Saturn transits each sign for about two and a half years, completing the zodiac in roughly twenty-nine and a half years. The Saturn return at the end of the twenties is the most famous—a reckoning with adulthood, career, and authenticity. Saturn square natal Saturn in the early forties marks midlife structural review.",
          "Transiting Saturn conjunct natal planets tests and consolidates those themes. Saturn conjunct Sun demands identity maturity; conjunct Moon, emotional responsibility. Saturn transits are not punishments—they remove what is not built to last. What survives Saturn is real.",
          "Electional astrologers use Saturn cautiously but respect its power for foundations, contracts, and long-term commitments. Saturn timing rewards patience. Launch what you intend to endure when Saturn supports your chart, not when it afflicts your angles without remediation.",
        ],
      },
    ],
    faq: [
      {
        question: "What does Saturn represent in astrology?",
        answer:
          "Saturn represents discipline, limits, maturity, structure, responsibility, and karma. It shows where you face fear, work hard, and build lasting results. It rules Capricorn and marks life's essential lessons through time.",
      },
      {
        question: "What is a Saturn return?",
        answer:
          "A Saturn return occurs when transiting Saturn returns to its natal sign and degree, around ages 29–30, 58–59, and 87–88. It marks transitions into new life chapters, often involving career, relationships, and identity restructuring. It is demanding but clarifying.",
      },
      {
        question: "Is Saturn bad luck?",
        answer:
          "Saturn is not bad luck—it is the planet of reality and mastery. Its transits remove illusions and demand effort. Difficulty during Saturn transits often reflects necessary growth. What you build under Saturn tends to last.",
      },
      {
        question: "How long do Saturn transits last?",
        answer:
          "Saturn spends about two and a half years in each sign and house. A conjunction to a natal planet may be felt for months within that window, especially during retrograde passes. Saturn's effects are slow, deep, and cumulative.",
      },
    ],
  },

  uranus: {
    description:
      "Explore Uranus in astrology—innovation, rebellion, freedom, and sudden change. Natal Uranus, generational signs, house awakening, transits, and FAQs.",
    sections: [
      {
        id: "symbolism-mythology",
        heading: "Uranus Symbolism and Mythology",
        paragraphs: [
          "Uranus (♅) is the sky god of revolution—unpredictable, brilliant, and liberating. Greek Ouranos was the primordial heaven, father of the Titans, overthrown by his son Cronus (Saturn). The myth encodes astrology's Uranus-Saturn tension: innovation versus tradition, freedom versus structure. Discovered in 1781 during the Enlightenment and American Revolution, Uranus fits its archetype perfectly.",
          "Ruling Aquarius, Uranus governs innovation, rebellion, freedom, sudden change, and awakening. Unlike personal planets, Uranus moves slowly—spending roughly seven years per sign—making sign placement generational. Keywords—innovation, rebellion, freedom, sudden change, awakening—describe where the chart resists conformity and craves authenticity.",
          "Uranus electrifies whatever it touches. Its transits often coincide with breakthroughs, breakdowns, and unexpected turns. Uranus asks: where must you break free, and what truth can you no longer suppress?",
        ],
      },
      {
        id: "birth-chart-meaning",
        heading: "Uranus in Your Birth Chart",
        paragraphs: [
          "Natal Uranus sign describes your generation's relationship to change and technology—shared with peers born within the same seven-year span. Personal distinction comes from Uranus house, aspects, and whether Uranus is angular or connected to personal planets.",
          "Uranus conjunct Sun or Moon marks individuals who feel different from family or culture—often pioneers or rebels. Uranus square Saturn internalizes the tension between duty and freedom. Uranus trine Jupiter may bring inventive luck; conjunct Neptune, generational spiritual disruption.",
          "Uranus in the chart shows where you innovate and where you resist control. A prominent Uranus correlates with originality, nervous energy, and attraction to unconventional paths. Integration means honoring difference without chaos for its own sake.",
        ],
      },
      {
        id: "influence-by-sign",
        heading: "Uranus Influence by Zodiac Sign",
        paragraphs: [
          "Uranus in fire signs (Aries, Leo, Sagittarius) revolutionizes identity, creativity, and belief. These generations challenge leadership models and inspire direct action for freedom. Uranus in Aries (2010–2018) accelerated individual assertion and startup culture globally.",
          "Uranus in earth signs (Taurus, Virgo, Capricorn) disrupts economics, work, and institutions. Uranus in Taurus (2018–2026) reshapes money, agriculture, and values—cryptocurrency and climate innovation exemplify this transit. Earth Uranus generations reform practical systems.",
          "Uranus in air signs (Gemini, Libra, Aquarius) innovates communication, relationship, and social networks. Aquarius Uranus is in domicile—generations defined by technology, humanitarian ideals, and collective awakening. Water Uranus signs (Cancer, Scorpio, Pisces) revolutionize emotion, power, and spirituality.",
        ],
      },
      {
        id: "influence-by-house",
        heading: "Uranus Influence by House Placement",
        paragraphs: [
          "Uranus house placement is highly personal and shows where sudden change and originality manifest. Uranus in the 1st house marks an unconventional persona; in the 10th, an unusual career path or public disruption. Uranus in the 7th attracts unconventional partners or unstable alliances.",
          "Uranus in the 11th house—natural territory—fuels friendship with outsiders and group innovation. Uranus in the 4th may indicate an unusual home life or sudden relocations; in the 8th, sudden shifts in shared resources or intimacy. Cadent Uranus awakens through learning (3rd), daily routines (6th), or spiritual insight (12th).",
          "Transiting Uranus through a house electrifies that domain for seven years. Uranus transit through the 10th may bring career pivots; through the 7th, relationship changes. Uranus removes stale patterns abruptly—preparation is less possible than flexibility.",
        ],
      },
      {
        id: "transits-timing",
        heading: "Uranus Transits and Timing",
        paragraphs: [
          "Uranus transits are slow but shocking. The Uranus opposition around age 42—midlife awakening—often triggers rebellion against paths that no longer fit. Uranus square natal Uranus in the early twenties marks generational individuation.",
          "Transiting Uranus conjunct natal planets liberates or destabilizes those themes. Conjunct Venus, sudden relationship changes; conjunct Mercury, mental breakthroughs. Uranus transits favor innovation, not stability. Launch the unconventional when Uranus supports your chart.",
          "Uranus stations and retrogrades extend its influence. Because Uranus moves slowly, its aspects unfold over years. Track Uranus through houses for the seven-year map of where life demands authenticity over comfort.",
          "When Uranus aspects personal planets by transit, the effect is unmistakable: routines break, assumptions shatter, and solutions appear from unexpected directions. The key is to cooperate with change rather than cling to obsolete security. Uranus rewards those who update their lives before the universe does it for them.",
        ],
      },
    ],
    faq: [
      {
        question: "What does Uranus represent in astrology?",
        answer:
          "Uranus represents innovation, rebellion, freedom, sudden change, and awakening. It rules Aquarius and describes where you break from convention. It is an outer planet with generational sign influence and personal house and aspect effects.",
      },
      {
        question: "Why is Uranus sign considered generational?",
        answer:
          "Uranus spends about seven years in each sign, so millions share the same Uranus sign. It describes collective attitudes toward change and technology. Personal expression comes from Uranus house placement and aspects to individual planets.",
      },
      {
        question: "What is the Uranus opposition?",
        answer:
          "The Uranus opposition occurs around age 42 when transiting Uranus opposes natal Uranus. It is a midlife awakening period often marked by desire for freedom, career change, or rebellion against restrictive structures. It parallels the classic midlife crisis archetype.",
      },
      {
        question: "Are Uranus transits always disruptive?",
        answer:
          "Uranus transits often bring sudden change, but disruption clears stagnation. Breakthroughs in creativity, technology, and authenticity are Uranus gifts. Flexibility and willingness to update outdated patterns reduce unnecessary chaos.",
      },
      {
        question: "How does Uranus relate to Aquarius?",
        answer:
          "Uranus is the modern ruler of Aquarius, linking the sign to innovation, humanitarian ideals, and collective progress. Traditional astrologers also assign Saturn as Aquarius co-ruler, blending structure with revolution. Both rulers describe Aquarius complexity.",
      },
    ],
  },

  neptune: {
    description:
      "Understand Neptune in astrology—dreams, spirituality, illusion, and compassion. Natal Neptune meaning, sign and house dissolving, transits, mythology, and FAQs.",
    sections: [
      {
        id: "symbolism-mythology",
        heading: "Neptune Symbolism and Mythology",
        paragraphs: [
          "Neptune (♆) is the god of the sea—vast, mysterious, and boundaryless. Roman Neptune (Poseidon in Greece) ruled oceans and earthquakes, capable of calm and catastrophe alike. Discovered in 1846 alongside photography, anesthesia, and spiritualism, Neptune embodies dreams, illusion, and dissolution of the solid. In astrology it governs what cannot be pinned down.",
          "Ruling Pisces, Neptune represents dreams, spirituality, illusion, compassion, and dissolution. Its fourteen-year sign cycles mark generational spiritual and artistic climates. Keywords—dreams, spirituality, illusion, compassion, dissolution—point to Neptune's realm: the imaginal, the escapist, and the transcendent.",
          "Neptune beautifies and deceives. It is the planet of artists, mystics, addicts, and martyrs. Where Neptune flows unchecked, boundaries dissolve—sometimes into grace, sometimes into confusion. Neptune asks: what do you dream of, and what are you avoiding seeing clearly?",
        ],
      },
      {
        id: "birth-chart-meaning",
        heading: "Neptune in Your Birth Chart",
        paragraphs: [
          "Natal Neptune sign is generational, coloring collective spirituality and aesthetics. Personal Neptune expression comes from house placement and aspects. Neptune conjunct Sun or Moon may indicate sensitivity, creativity, or difficulty maintaining firm identity. Neptune square Mercury can blur communication; trine Venus, artistic grace.",
          "Neptune in the chart shows where you idealize, escape, and connect to the invisible. A strong Neptune correlates with empathy, artistic talent, and spiritual longing—and with tendencies toward confusion, projection, and avoidance. Healthy Neptune channels into art, service, and contemplation.",
          "Neptune dissolves ego structures. Its lessons involve discernment: telling compassion from codependency, faith from fantasy. Read Neptune with its dispositor and connections to the 12th house for spiritual and psychological context.",
        ],
      },
      {
        id: "influence-by-sign",
        heading: "Neptune Influence by Zodiac Sign",
        paragraphs: [
          "Neptune in fire signs (Aries, Leo, Sagittarius) spiritualizes identity, creativity, and belief. These generations idealize leadership, romance, and truth-seeking—sometimes blinding themselves to flaws in heroes and ideologies.",
          "Neptune in earth signs (Taurus, Virgo, Capricorn) dissolves material certainty. Taurus Neptune generations rethink values and ecology; Virgo Neptune, health and service ideals; Capricorn Neptune, institutions and authority—often experiencing disillusionment with structures once deemed solid.",
          "Neptune in air signs (Gemini, Libra, Aquarius) idealizes ideas, partnership, and utopian social visions. Neptune in Pisces (2011–2026) is in domicile—heightening global empathy, artistic fusion, and also escapism, misinformation, and boundary confusion in the digital age.",
        ],
      },
      {
        id: "influence-by-house",
        heading: "Neptune Influence by House Placement",
        paragraphs: [
          "Neptune house shows where illusion and inspiration concentrate. Neptune in the 12th house is at home—spiritual retreat, hidden sensitivity, and connection to the collective unconscious. Neptune in the 1st may grant ethereal presence or unclear self-image; in the 10th, idealized public roles or scandal.",
          "Neptune in the 7th idealizes partners—learning discernment in love is essential. Neptune in the 2nd may dissolve or spiritualize finances; in the 8th, merge boundaries in intimacy and shared resources. Neptune in the 5th favors artistic creativity; in the 6th, service and healing vocations.",
          "Transiting Neptune through a house—for roughly fourteen years—gradually dissolves old forms in that domain. Neptune through the 10th may dissolve career identity before reforming it; through the 4th, family myths and living situations. Neptune works slowly, like water wearing stone.",
        ],
      },
      {
        id: "transits-timing",
        heading: "Neptune Transits and Timing",
        paragraphs: [
          "Neptune transits are subtle and long. Neptune conjunct natal Sun may coincide with spiritual awakening or identity confusion over years. Neptune square natal Moon can heighten emotional sensitivity and need for creative or spiritual outlets.",
          "Neptune transits favor artistic projects, meditation, and compassionate service—not clear contracts or hard boundaries. Misinformation and deception rise under Neptune afflictions; verify before trusting. Neptune dissolves what was falsely solid—painful but ultimately clarifying.",
          "The Neptune return around age 165 is theoretical for human lifespans, but Neptune opposition in the eighties marks late-life spiritual integration for those who live to see it. For most, tracking Neptune through houses across decades maps slow spiritual and creative evolution.",
          "Practically, Neptune transits ask you to soften grip on outcomes and trust process. Artists often produce masterworks under Neptune; seekers deepen meditation practice; relationships undergo tests of honesty when glamour fades. Neptune ultimately teaches that not everything real can be measured—and not everything measured is real.",
        ],
      },
    ],
    faq: [
      {
        question: "What does Neptune represent in astrology?",
        answer:
          "Neptune represents dreams, spirituality, illusion, compassion, and dissolution. It rules Pisces and describes where boundaries blur between reality and imagination. It governs art, mysticism, empathy, and escapism.",
      },
      {
        question: "Is Neptune negative in a birth chart?",
        answer:
          "Neptune is not inherently negative—it gifts creativity, spirituality, and compassion. Challenges arise when its dissolving quality avoids reality through addiction, deception, or martyrdom. Integrated Neptune produces artists, healers, and mystics with healthy boundaries.",
      },
      {
        question: "How long does Neptune stay in a sign?",
        answer:
          "Neptune spends approximately fourteen years in each zodiac sign due to its slow orbit. Sign placement is generational; house placement and aspects personalize Neptune's influence in an individual chart.",
      },
      {
        question: "What are Neptune transits good for?",
        answer:
          "Neptune transits favor spiritual practice, artistic creation, charitable work, and releasing outdated illusions. They are poor times for signing contracts without scrutiny, making major financial commitments based on hype, or ignoring red flags in relationships.",
      },
      {
        question: "How does Neptune relate to Pisces?",
        answer:
          "Neptune is the modern ruler of Pisces, amplifying the sign's empathy, imagination, and spiritual sensitivity. Traditional astrologers also assign Jupiter as Pisces co-ruler, linking faith and expansion to Piscean themes. Neptune intensifies Pisces boundary-dissolving nature.",
      },
    ],
  },

  pluto: {
    description:
      "Master Pluto in astrology—transformation, power, death, rebirth, and shadow. Natal Pluto meaning, sign and house depth, transit cycles, mythology, and FAQs.",
    sections: [
      {
        id: "symbolism-mythology",
        heading: "Pluto Symbolism and Mythology",
        paragraphs: [
          "Pluto (♇) is lord of the underworld—hidden power, death, and rebirth. Roman Pluto (Hades in Greece) ruled the realm of shades, guarding treasures beneath the earth. Abduction of Persephone bound him to cycles of descent and return, mirroring seasonal death and renewal. Discovered in 1930 amid atomic physics and rising totalitarianism, Pluto embodies transformation at the deepest level.",
          "Ruling Scorpio, Pluto governs transformation, power, death, rebirth, and shadow. Its generational sign placements span twelve to thirty-one years per sign. Keywords—transformation, power, death, rebirth, shadow—describe Pluto's territory: what must die for new life to emerge, and where power is concentrated or contested.",
          "Pluto strips away the superficial. It is the planet of crisis, therapy, obsession, and regeneration. Where Pluto operates, control is an issue—gaining it, losing it, or confronting its misuse. Pluto asks: what must transform, and what power do you fear or wield?",
        ],
      },
      {
        id: "birth-chart-meaning",
        heading: "Pluto in Your Birth Chart",
        paragraphs: [
          "Natal Pluto sign is generational, defining collective attitudes toward power and transformation. Personal Pluto expression emerges through house placement and aspects. Pluto conjunct Sun or Moon indicates intense identity and emotional depth; square Mars, powerful will and potential conflict; trine Neptune, transformative creativity.",
          "Pluto in the chart shows where you encounter depth, compulsion, and renewal. A prominent Pluto correlates with psychological intensity, survival instinct, and capacity for profound change. Pluto aspects often mark family legacies of trauma or power passed through generations.",
          "Pluto teaches surrender of what no longer serves. Resistance creates crisis; conscious engagement produces regeneration. Read Pluto with its dispositor and the 8th house for themes of shared resources, intimacy, and mortality.",
        ],
      },
      {
        id: "influence-by-sign",
        heading: "Pluto Influence by Zodiac Sign",
        paragraphs: [
          "Pluto in fire signs (Aries, Leo, Sagittarius) transforms identity, creativity, and belief systems. Pluto in Leo (1937–1958) marked the nuclear age and charismatic leadership cults. Fire Pluto generations confront power through self-assertion and ideological struggle.",
          "Pluto in earth signs (Taurus, Virgo, Capricorn) transforms economics, work, and institutions. Pluto in Capricorn (2008–2024) dismantled financial structures and authority models globally—recession, corporate reckoning, and governmental crisis exemplify this transit.",
          "Pluto in air signs (Gemini, Libra, Aquarius) transforms communication, relationships, and social systems. Pluto in Scorpio (1983–1995) was in domicile—generations marked by AIDS crisis, sexual frankness, and psychological depth culture. Water Pluto signs transform emotion and spirituality collectively.",
        ],
      },
      {
        id: "influence-by-house",
        heading: "Pluto Influence by House Placement",
        paragraphs: [
          "Pluto house placement is intensely personal. Pluto in the 1st house marks a powerful, sometimes intimidating presence and lifelong identity transformation. Pluto in the 10th may indicate career power struggles or public regeneration; in the 7th, deep and sometimes controlling partnerships.",
          "Pluto in the 8th house is natural territory—inheritance, sexuality, psychology, and shared resources carry Plutonian intensity. Pluto in the 4th may indicate ancestral trauma or secret family dynamics; in the 12th, unconscious shadow work and spiritual death-rebirth cycles.",
          "Transiting Pluto through a house—for twelve to thirty years—fundamentally restructures that domain. Pluto through the 4th transforms home and family; through the 7th, relationships; through the 10th, career and public role. Pluto transits are among the most profound life markers.",
        ],
      },
      {
        id: "transits-timing",
        heading: "Pluto Transits and Timing",
        paragraphs: [
          "Pluto transits are slow, deep, and irreversible. Pluto conjunct natal Sun—occurring once if at all—marks a years-long identity death and rebirth. Pluto square natal Moon may coincide with emotional purging and family transformation. Multiple exact passes occur due to retrograde motion.",
          "Pluto return occurs around age 248—beyond human lifespan—but Pluto opposition in the late thirties to early forties marks power confrontation for those with angular Pluto. Generational Pluto aspects between charts describe collective power dynamics in relationships and society.",
          "Pluto transits favor therapy, research, elimination of toxicity, and rebuilding from authentic foundations. They are not periods for superficial change. What Pluto removes cannot be recovered—but what it rebuilds is more honest and resilient.",
          "Working consciously with Pluto means naming power dynamics, facing fears of loss, and choosing transformation over control. The underworld god does not negotiate with denial. Those who descend willingly—through therapy, honest confrontation, or surrender of outdated ambitions—emerge with resources they did not know they possessed.",
        ],
      },
    ],
    faq: [
      {
        question: "What does Pluto represent in astrology?",
        answer:
          "Pluto represents transformation, power, death, rebirth, and the shadow. It rules Scorpio and describes where deep change, compulsion, and regeneration occur. It governs crisis, psychology, obsession, and hidden resources.",
      },
      {
        question: "Is Pluto still used since its reclassification?",
        answer:
          "Yes. Astronomical reclassification as a dwarf planet does not affect astrological practice. Pluto remains a primary significator of depth, power, and transformation. Astrologers continue to track Pluto transits as among the most significant life markers.",
      },
      {
        question: "Why is Pluto sign generational?",
        answer:
          "Pluto's elliptical orbit keeps it in each sign for twelve to thirty-one years. Entire generations share Pluto sign placement, defining collective attitudes toward power and transformation. House placement and aspects personalize Pluto in individual charts.",
      },
      {
        question: "How long do Pluto transits last?",
        answer:
          "Pluto transits to a natal planet can last two to three years with multiple exact hits due to retrograde motion. Pluto through a house may span over a decade. Effects are gradual, deep, and often recognized only in retrospect.",
      },
      {
        question: "How does Pluto relate to Scorpio?",
        answer:
          "Pluto is the modern ruler of Scorpio, deepening the sign's association with intensity, secrecy, and regeneration. Traditional astrologers assign Mars as Scorpio co-ruler, linking desire and courage to Scorpio's transformative power. Pluto adds psychological depth to Mars martial drive.",
      },
    ],
  },
};

export function buildPlanetPillar(slug: PlanetSlug): PillarArticle {
  const meta = PLANET_META[slug];
  const content = PLANET_CONTENT[slug];

  return {
    hub: "planets",
    slug: meta.slug,
    title: `${meta.name} in Astrology: Complete Guide`,
    description: content.description,
    publishedAt: "2025-06-01",
    updatedAt: "2025-06-28",
    keywords: meta.keywords,
    sections: content.sections,
    faq: content.faq,
  };
}

export const PLANET_PILLARS: PillarArticle[] = PLANET_SLUGS.map(buildPlanetPillar);

export function getPlanetPillar(slug: string): PillarArticle | undefined {
  if (!(PLANET_SLUGS as readonly string[]).includes(slug)) {
    return undefined;
  }
  return buildPlanetPillar(slug as PlanetSlug);
}
