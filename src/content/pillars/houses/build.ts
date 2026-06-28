import type { PillarArticle, PillarFAQ, PillarSection } from "../types";
import { HOUSE_META, HOUSE_SLUGS, type HouseSlug } from "./meta";

const PUBLISHED_AT = "2025-06-01";
const UPDATED_AT = "2025-06-28";

interface HouseContent {
  description: string;
  sections: PillarSection[];
  faq: PillarFAQ[];
}

function section(
  id: string,
  heading: string,
  paragraphs: string[],
  example?: string
): PillarSection {
  return { id, heading, paragraphs, example };
}

const HOUSE_CONTENT: Record<HouseSlug, HouseContent> = {
  "first-house": {
    description:
      "Learn what the First House governs in your birth chart—identity, body, first impressions, and your instinctive approach to life. A complete guide to the House of Self.",
    sections: [
      section("life-area-overview", "What the First House Represents", [
        "In astrology, the First House is the anchor of the entire birth chart. It sits at the eastern horizon—the Ascendant or rising sign—and describes how you meet the world before anyone knows your Sun sign, Moon sign, or life story. Traditional astrologers call it the House of Self because it frames vitality, physical presence, and the instinctive stance you take when life asks you to show up. Where the Sun describes core identity and the Moon describes emotional needs, the First House describes the interface: the face, posture, pace, and immediate energy others register when you enter a room.",
        "The life area associated with the First House spans identity, body, first impressions, and approach to life. This is not vanity or surface-level presentation alone. It is the living feedback loop between who you feel yourself to be and how that self expresses through gesture, tone, appetite, and courage. A strong First House often correlates with self-directed momentum—people who initiate, who recover quickly from setbacks, or who feel most alive when they are physically engaged with their environment. A quieter First House may prefer observation before action, yet still carries a distinct signature: the chart shows how initiation happens, not whether it happens at all.",
        "Because the First House opens the chart wheel, it also symbolizes beginnings: birth, first steps, and the courage to claim space. Its natural sign is Aries and its traditional ruler is Mars, which links this house to assertion, heat, and the willingness to compete or pioneer. When you study your First House, you are studying the archetype of becoming visible. That visibility can be loud or subtle, athletic or intellectual, but it is always personal. It answers the question: when life starts moving, what part of you moves first?",
        "Keywords associated with this house—self, appearance, vitality, beginnings, and persona—should be read as integrated themes rather than isolated traits. Vitality is how aliveness moves through the body. Persona is the adaptive mask that protects vulnerability while still allowing contact. Beginnings describe your relationship with risk at the threshold of experience. Together, these themes make the First House one of the most practical placements to understand when you want astrology to improve daily confidence, health habits, or the quality of your first impressions in work and relationships.",
      ]),
      section(
        "planets-in-house",
        "Planets in the First House",
        [
          "Planets in the First House color your default presence. They do not replace your Sun or Moon; they tint the lens through which those deeper layers reach the surface. A First House planet is often obvious to others even when you do not notice it yourself. It can show up as a recurring comment people make about you, a physical trait, a habitual reaction, or a reputation that arrives before your resume does.",
          "The Sun in the First House often produces a person who is meant to be seen. Identity and visibility merge: you may feel most coherent when you are leading, creating, or honestly occupying space. Mars in the First House adds speed, edge, and competitive spark. You may interrupt politely, walk quickly, or feel irritated when life moves too slowly. Venus here softens the presentation with charm, aesthetic awareness, and a desire to be liked on first contact. Mercury makes the body restless and the mind quick; people may experience you as talkative, witty, or mentally alert before they know your history.",
          "Saturn in the First House can delay self-trust or produce a serious first impression. Over time, this placement often matures into authority, discipline, and a composed presence that others rely on. Jupiter expands everything it touches: a Jupiter First House may read as optimistic, larger-than-life, or generously confident. The outer planets leave strong signatures. Uranus suggests an unconventional style or sudden changes in appearance and self-concept. Neptune adds glamour, sensitivity, or elusiveness. Pluto intensifies gaze, willpower, and the sense that you are not easily overlooked.",
          "When interpreting planets here, always combine planet, sign, and aspects. A shy Cancer rising with Mars in the First House may assert indirectly through protection rather than confrontation. A Libra rising with Pluto in the First House may look graceful while carrying enormous inner pressure. The house shows the stage; the sign shows the costume; the aspects show the plot twists.",
        ],
        "Example: Someone with Aries rising and Mercury in the First House may speak before they think, learn through direct experience, and energize meetings simply by arriving."
      ),
      section("sign-on-cusp", "The Rising Sign on the First House Cusp", [
        "The sign on your First House cusp is your Ascendant or rising sign. It is one of the three most important chart factors alongside the Sun and Moon because it governs orientation. If the Sun is what you are growing into and the Moon is what you need to feel safe, the rising sign is how you navigate the present moment. It influences gait, speech rhythm, style choices, and the kind of environment that helps you function without constant self-editing.",
        "Aries rising tends to meet life head-on. You may prefer honest conflict to prolonged ambiguity and often feel best when goals are clear and immediate. Taurus rising seeks stability, sensory comfort, and steady pacing; your presence may feel grounding even when you are nervous inside. Gemini rising scans, connects, and adapts. You learn socially and may appear younger or more curious than your age suggests. Cancer rising protects the soft interior with attentiveness, memory, and emotional intelligence on display.",
        "Leo rising radiates warmth and wants dignity in first encounters. Virgo rising notices detail and improves what it touches; you may seem helpful before you seem dominant. Libra rising prioritizes rapport, fairness, and visual harmony. Scorpio rising is penetrating and controlled; people may feel seen by you before they know why. Sagittarius rising looks toward horizon, meaning, and freedom. Capricorn rising is composed, strategic, and often older in manner than in years.",
        "Aquarius rising can appear friendly yet detached, original without trying. Pisces rising dissolves boundaries and reads atmosphere intuitively. None of these styles is better than another. The rising sign shows the strategy your chart chose for starting things. When transits or progressions aspect your Ascendant, that strategy evolves—sometimes through a visible change in style, sometimes through a deeper change in how you authorize yourself to begin.",
      ]),
      section("transits", "Transits Through the First House", [
        "Transits through the First House are among the most personally felt in predictive astrology because they cross the Ascendant and rewire your interface with the world. When a planet enters your First House, you often feel it in the body first: more energy, less patience, renewed confidence, or a need to withdraw and reset depending on the planet involved.",
        "Jupiter transiting the First House is a classic growth period. Opportunities may find you more easily, and you may feel willing to take up space you previously avoided. This is an excellent time for visibility projects, fitness expansion, or rebranding—provided you avoid overpromising simply because optimism is high. Saturn transiting the First House demands maturity. It can coincide with weight changes, increased responsibility, or a sober reassessment of how you present yourself. The gift is durability: what you build in identity now tends to last.",
        "Mars transits activate courage, irritation, and drive. You may start new physical routines, defend yourself more directly, or clash with anyone who tries to diminish your autonomy. Venus transits often bring aesthetic updates, social ease, and a gentler mirror from others. Mercury transits increase mental restlessness and conversation; you may experiment with new introductions, pitches, or learning paths. Outer planet transits are slower and more transformative. Uranus may change your look or lifestyle abruptly. Neptune can inspire or confuse self-image. Pluto initiates deep identity renovation that can feel like shedding an old skin.",
        "Eclipses on the First–Seventh axis are especially potent. They often mark chapters in personal independence and partnership balance. A First House eclipse may push you toward a more authentic presentation even if relationships must adjust. Track these transits with journaling and body-based practices. The First House responds well to action, movement, and honest feedback from trusted mirrors.",
      ]),
      section("synastry-relevance", "First House Synastry", [
        "In synastry, the First House describes immediate chemistry and the felt sense of recognition between two people. When someone else's planet falls in your First House, they often feel familiar, stimulating, or uncomfortably exposing. You may notice their influence on your posture, confidence, or appearance even if the relationship never becomes romantic.",
        "A partner's Sun or Venus in your First House can feel flattering and affirming. They may admire how you look, move, or initiate, and you may feel more yourself around them. Mars in your First House creates spark and friction in equal measure: attraction is fast, but so is annoyance if boundaries are weak. Saturn here can feel stabilizing or critical depending on maturity; it often teaches self-respect through restraint. Jupiter here expands your confidence and may encourage you to take risks you would not take alone.",
        "The reverse also matters: your planets in a partner's First House show how you impact their self-presentation. If your Mercury lands there, they may talk more around you. If your Pluto lands there, you may intensify their self-image or trigger control issues around autonomy. Synastry is not fate; it is a map of activation points.",
        "For relationship work, compare First House contacts with Seventh House overlays. The First House shows how you meet; the Seventh shows what you contract for over time. Strong First House chemistry without Seventh House durability may produce memorable beginnings that struggle to mature. Balanced contact across both houses supports both spark and commitment.",
      ]),
    ],
    faq: [
      {
        question: "Is the First House the same as my rising sign?",
        answer:
          "The rising sign is the zodiac sign on the cusp of the First House, so they are closely linked but not identical. The house is the life area; the sign is the style. Planets inside the First House and aspects to the Ascendant add further detail beyond the rising sign alone.",
      },
      {
        question: "What is the difference between the First House and the Sun sign?",
        answer:
          "Your Sun sign describes core identity, purpose, and the life force you are learning to express over time. The First House describes how that identity meets the world in real time—your manner, body language, and first impressions. People often notice your rising sign and First House planets before they grasp your Sun.",
      },
      {
        question: "Can the First House affect physical appearance?",
        answer:
          "Astrologers have long associated the First House with the body and overall presentation. While genetics and environment matter most, the rising sign and First House planets often correlate with mannerisms, build, style choices, and the energy others read visually.",
      },
      {
        question: "Which planet rules the First House naturally?",
        answer:
          "The First House is naturally associated with Aries and Mars. In your own chart, the ruler of your Ascendant—the planet that rules your rising sign—acts as the chart ruler and plays a special role in directing your overall approach to life.",
      },
      {
        question: "How do I strengthen a challenged First House?",
        answer:
          "Work with the ruler of your Ascendant and any planets in the First House. Body-based practices, honest self-presentation, and small courageous starts build confidence over time. Astrology here is best used as a mirror for experiments, not a verdict on worth.",
      },
    ],
  },

  "second-house": {
    description:
      "Explore the Second House in astrology: money, possessions, self-worth, talents, and what you truly value. A practical guide to the House of Value in your birth chart.",
    sections: [
      section("life-area-overview", "What the Second House Represents", [
        "The Second House is the House of Value. After the First House establishes that you exist and can act, the Second House asks what you keep, what you earn, and what you believe you deserve. Its life area spans money, possessions, self-worth, and resources—material and intangible alike. This house is not only about salary or luxury. It is about the nervous system of security: how you stabilize yourself when the world is uncertain, and which assets—skills, relationships, savings, or faith—you treat as non-negotiable.",
        "Traditionally linked to Taurus and Venus, the Second House moves slowly and sensually. It cares about quality, continuity, and the felt sense of enough. People with emphasized Second House placements often measure life through tangible feedback: a stocked pantry, a reliable tool, a skill that pays, a body that feels strong. Others may appear minimal outwardly while guarding rich inner values such as loyalty, artistry, or independence. Both patterns are Second House expressions.",
        "Self-worth is the hidden engine of this house. Income and spending often follow belief more than spreadsheets. When the Second House is stressed, you may oscillate between hoarding and spending, undervaluing your labor, or attaching identity too tightly to net worth. When it is integrated, money becomes a tool for stability rather than a scorecard for lovability. The house teaches that value must be embodied—you cannot sustainably charge, save, or receive at levels your psyche has not authorized.",
        "Keywords such as income, security, talents, values, and material comfort interlock here. Talents are resources when cultivated. Values are resources when lived. Security is not only a bank balance but the capacity to recover from loss. Studying this house helps you align earning, spending, and self-respect so that your outer life reflects what you genuinely cherish.",
      ]),
      section(
        "planets-in-house",
        "Planets in the Second House",
        [
          "Planets in the Second House show how you attract, hold, and spend energy and money. They describe earning style, appetite for comfort, and the stories you tell about deservingness. Because this house is fixed and earthy in tone, planets here tend to produce habits that repeat until consciously revised.",
          "Venus in the Second House often enjoys beautiful possessions and may earn through art, diplomacy, or taste. Jupiter here can expand income—and spending. There is generosity, optimism about resources, and sometimes a belief that more will always arrive. Saturn here builds slowly. Early scarcity or discipline may teach frugality; mastery can produce lasting wealth through patience and craft. Mars drives hustle and direct earning; you may make money quickly and spend quickly too unless other factors steady the pattern.",
          "Mercury in the Second House earns through ideas, commerce, writing, or multiple income streams. The Moon ties money to mood: security needs fluctuate, and spending may soothe emotion unless tracked mindfully. The Sun wants resources to reflect identity; you may invest in items or experiences that announce who you are. Uranus brings irregular income, entrepreneurial pivots, or unconventional values. Neptune can glamorize spending or link money to spirituality and art, sometimes blurring financial boundaries. Pluto intensifies attachment, debt themes, or transformational earning power.",
          "Always synthesize planets here with the sign on the cusp and the house ruler's condition. A person with Capricorn on the Second cusp and Venus in the house may build slowly but spend on enduring quality. The same Venus in a mutable sign might monetize charm through variety rather than accumulation.",
        ],
        "Example: Jupiter in the Second House square Neptune may earn generously yet need clear budgets so optimism does not dissolve into invisible leakage."
      ),
      section("sign-on-cusp", "The Sign on the Second House Cusp", [
        "The sign on the Second House cusp colors your default approach to money and self-worth. It is the style of acquisition and the first strategy you use when resources feel thin.",
        "Aries on the Second cusp earns through initiative and courage. You may prefer independent income streams and dislike waiting for permission to profit from your ideas. Taurus here wants stable, sensory security—quality goods, steady growth, and patience. Gemini monetizes curiosity: multiple skills, trading information, and flexible side projects. Cancer links money to family, home, and emotional safety; saving may equal caring.",
        "Leo on the Second invests in pride, creativity, and visible excellence. You may spend on performance, children, or brands that reflect your heart. Virgo earns through service, detail, and improvement; value rises when usefulness is provable. Libra wants fair exchange and attractive surroundings; partnerships may affect finances strongly. Scorpio treats money as power and privacy; debt, inheritance, and shared resources often matter.",
        "Sagittarius on the Second cusp spends on growth—travel, education, and risk. Capricorn plans long-term and respects earned status. Aquarius values freedom and may prefer unconventional assets or income tied to innovation. Pisces links worth to compassion and imagination; boundaries around giving and receiving are essential. The cusp sign is the doorway; planets inside and the ruler's placement show the room.",
      ]),
      section("transits", "Transits Through the Second House", [
        "Transits through the Second House activate finances, body stability, and self-worth narratives. These periods often coincide with raises, expenses, purchases, or internal reckonings about what you will no longer accept for free.",
        "Jupiter here can increase income and appetite. It is favorable for investing in skills, upgrading tools, or expanding a business—if you avoid inflation of lifestyle costs that outpace gains. Saturn demands budgeting, debt reduction, and mature pricing. You may feel temporarily poorer while building structures that last. Mars accelerates earning drive and can trigger impulsive purchases or fights about money in relationships.",
        "Venus transits support negotiations, sales, and aesthetic purchases that genuinely improve daily life. Mercury helps contracts, accounting, and side hustles. Eclipses on the Second–Eighth axis often reset shared and personal resources together: a job change, inheritance matter, or shift in what you owe others emotionally and financially.",
        "Use Second House transits to audit values. List what you pay for that reflects fear versus joy. Renegotiate rates, cancel unused subscriptions, and practice receiving without apology. The house responds to consistency more than dramatic affirmations.",
      ]),
      section("synastry-relevance", "Second House Synastry", [
        "In synastry, Second House overlays reveal how two people affect each other's security, spending, and sense of worth. This is practical relationship astrology: groceries, rent, gifts, and the subtle message of whether you feel expensive or discounted beside someone.",
        "A partner's Venus or Jupiter in your Second House can feel generous and affirming. They may encourage you to enjoy life or believe in your talents financially. Saturn here may stabilize or pinch depending on maturity; you might learn discipline—or feel judged. Mars can motivate earning and also provoke arguments about purchases. Pluto may intensify possession, jealousy around resources, or transformative shared investment.",
        "Your planets in a partner's Second House show how you impact their wallet and worth. Your Moon there may soothe or destabilize their security needs. Your Uranus may disrupt their financial habits—for better or worse. Compare with Eighth House overlays when money is merged through debt, taxes, or shared accounts.",
        "Healthy synastry here supports transparent budgeting and aligned values, not identical incomes. Couples who discuss the Second House themes early—spending styles, saving goals, and emotional meaning of money—often avoid resentments that Seventh House harmony cannot fix alone.",
      ]),
    ],
    faq: [
      {
        question: "Does the Second House predict how rich I will be?",
        answer:
          "It describes attitudes, talents, and patterns around resources rather than a fixed net worth. Strong placements can support earning capacity, but choices, economy, education, and opportunity matter enormously. Use it to understand your relationship with money, not as a lottery ticket.",
      },
      {
        question: "What is the link between the Second House and self-esteem?",
        answer:
          "This house connects material security with felt deservingness. Many people discover that raising income without raising self-worth produces short-lived relief. Integrating the Second House often means practicing fair exchange—charging honestly, receiving gracefully, and separating identity from account balances.",
      },
      {
        question: "Which house opposes the Second House?",
        answer:
          "The Eighth House opposes the Second. While the Second concerns personal income and values, the Eighth concerns shared resources, debt, inheritance, and psychological merging. Transits and chart dynamics between these houses often tell a complete financial story.",
      },
      {
        question: "How does Venus ruling Taurus relate to this house?",
        answer:
          "Venus rules Taurus, the natural sign of the Second House. Venus themes—attraction, pleasure, harmony, and value—echo here through earning, spending, and what you consider beautiful or worthwhile enough to keep.",
      },
      {
        question: "Can the Second House show natural talents?",
        answer:
          "Yes. Planets, sign on the cusp, and aspects to the Second House ruler often describe skills you can monetize or resources you accumulate naturally. Talents become income when developed and priced with respect.",
      },
    ],
  },

  "third-house": {
    description:
      "Understand the Third House: communication, learning, siblings, neighbors, short travel, and the curious mind. Your guide to the House of Communication in astrology.",
    sections: [
      section("life-area-overview", "What the Third House Represents", [
        "The Third House governs the mind in motion. It is the House of Communication, linked traditionally to Gemini and Mercury, and it describes how you learn, speak, listen, and stitch local life together. Its domain includes siblings, cousins, neighbors, early schooling, daily errands, short trips, and the informal networks that keep a week running. If the Ninth House asks big philosophical questions, the Third House asks practical ones: who said what, how do I get there, and what do I need to know before tomorrow?",
        "This house is fundamentally about exchange. You take in data, translate it, and pass it along. That exchange may be verbal, written, digital, or gestural. People with strong Third House emphasis often think best while talking, writing, or moving. They may collect facts, languages, or skills rapidly and enjoy connecting dots across unrelated fields. The shadow side is scatter: too many tabs open, too many commitments, nervous system overstimulation from constant input.",
        "Siblings and peer relationships in childhood often leave imprints here—not because the house is only about brothers and sisters, but because early rivalry and cooperation teach negotiation, humor, and mental agility. Neighbors, classmates, and local communities extend the same pattern into adulthood. The Third House shows whether you prefer intimate local circles or buzzing variety on your block.",
        "Keywords like mind, writing, neighbors, short trips, and curiosity describe a living ecosystem. Curiosity is the fuel. Writing and speaking are outputs. Neighbors and short trips are the geography of everyday intelligence. When you strengthen this house, you improve how you ask questions, how you explain yourself, and how you move through familiar terrain without feeling trapped or bored.",
      ]),
      section(
        "planets-in-house",
        "Planets in the Third House",
        [
          "Planets in the Third House shape voice, learning style, and daily mental habits. They often show up early: a child who reads ahead, a teenager who debates, an adult who cannot drive without podcasts.",
          "Mercury in the Third House is strong in its natural territory. Thinking is quick, witty, and adaptable. You may excel at languages, sales, teaching basics, or troubleshooting. The Moon here ties memory to emotion; you may remember feelings attached to facts or need feelings to retain information. Venus softens speech and may gift writing with charm or diplomacy. Mars sharpens debate and directness; you may interrupt or champion ideas fiercely.",
          "The Sun here wants the mind seen. You may identify as a communicator, influencer, or local leader. Jupiter expands interests and may produce love of publishing, broadcasting, or lifelong casual learning. Saturn can delay speech confidence or deepen mastery through disciplined study. Uranus brings original ideas and sudden insights; learning may be nonlinear. Neptune inspires poetry and imagination but may blur facts unless grounded. Pluto researches deeply and may obsess over secrets, psychology, or investigative truth.",
          "Aspects modify expression. Mercury square Neptune may write beautifully yet need fact-checking routines. Mars trine Mercury can debate productively and act on ideas fast. Always read Third House planets with the condition of Mercury as chart ruler of the house's natural sign.",
        ],
        "Example: Saturn in the Third House may produce a late-blooming writer who becomes authoritative through careful craft rather than early fluency."
      ),
      section("sign-on-cusp", "The Sign on the Third House Cusp", [
        "The sign on the Third House cusp is your default communication style before planets inside modify it.",
        "Aries on the Third speaks directly and prefers short, actionable messages. Taurus communicates slowly and concretely; you may dislike being rushed in conversation. Gemini on the cusp is naturally curious and socially agile. Cancer talks with feeling and memory; topics often return to family or safety. Leo speaks to inspire and be recognized. Virgo values precision, correction, and useful detail.",
        "Libra on the Third seeks balanced dialogue and may avoid harsh wording even when honesty is needed. Scorpio probes and listens beneath surface answers. Sagittarius loves big ideas in casual chat and may storytell rather than bullet-point. Capricorn communicates strategically and sparingly. Aquarius brings unconventional opinions and network thinking. Pisces communicates through metaphor, mood, and compassion.",
        "The cusp sign also colors sibling dynamics and neighborhood preferences. Fire signs may prefer active local scenes; water signs may cherish quiet corners and familiar faces.",
      ]),
      section("transits", "Transits Through the Third House", [
        "Transits through the Third House stir the mind, schedule, and local environment. Expect more calls, emails, errands, classes, or short trips. These transits are excellent for learning projects, content creation, and repairing sibling or neighbor relationships.",
        "Mercury transiting its home field is busy by definition: paperwork, negotiations, and mental multitasking increase. Venus sweetens conversations and may bring pleasant local connections. Mars accelerates debate and travel; watch road rage and impulsive texts. Jupiter expands study, teaching, and outreach. Saturn focuses the mind—good for exams, certifications, and simplifying commitments.",
        "Outer planet transits here are slower but reshape how you think. Uranus may revolutionize your media diet or tech stack. Neptune inspires artistic writing or confusion in contracts—read fine print carefully. Pluto deepens research obsessions and transformative conversations with siblings or peers.",
        "Eclipses on the Third–Ninth axis often coincide with announcements, moves within a region, or shifts in belief systems rooted in daily experience. Journal during these periods; the mind is rewiring quickly.",
      ]),
      section("synastry-relevance", "Third House Synastry", [
        "Third House synastry shows whether two people think well together on a daily basis. This is the house of texts, banter, shared errands, and whether conversation feels alive or draining over time.",
        "A partner's Mercury in your Third House often feels like mental chemistry. You may finish sentences, enjoy long talks, or collaborate on writing and planning. Venus here sweetens communication and local outings. Mars can spark debates that are exciting or exhausting. Saturn may teach disciplined listening—or feel critical.",
        "Your planets in a partner's Third House reveal how you affect their voice and routine. Your Jupiter may encourage their learning; your Neptune may inspire or confuse their thinking. Compare with Mercury–Mercury aspects and Ninth House overlays for the difference between daily chat and shared worldview.",
        "Strong Third House synastry supports friendship and domestic practicality in romance. If only this house is active without emotional or commitment houses, chemistry may remain pleasantly intellectual without depth.",
      ]),
    ],
    faq: [
      {
        question: "What is the difference between the Third and Ninth houses?",
        answer:
          "The Third House covers local mind, daily learning, and nearby travel. The Ninth House covers higher education, philosophy, long-distance travel, and systems of meaning. Think neighborhood library versus university and pilgrimage.",
      },
      {
        question: "Does the Third House always describe siblings?",
        answer:
          "It often correlates with sibling dynamics and peer relationships, but it broadly describes close informal networks and early learning environments. Only part of the story may involve literal brothers or sisters.",
      },
      {
        question: "How does Mercury relate to the Third House?",
        answer:
          "Mercury rules Gemini, the natural sign of the Third House. Mercury's sign, house, and aspects describe how your mind works; the Third House shows where that mental energy lands in life areas like communication and local travel.",
      },
      {
        question: "Can the Third House indicate writing talent?",
        answer:
          "Yes. Planets here—especially Mercury, Venus, Neptune, or Pluto—combined with supportive aspects often appear in charts of writers, journalists, teachers, and podcasters. Craft still requires practice.",
      },
      {
        question: "What careers connect to the Third House?",
        answer:
          "Teaching, journalism, sales, marketing, coding, translation, community organizing, driving, postal work, and any role involving information flow, local networks, or short-range logistics.",
      },
    ],
  },

  "fourth-house": {
    description:
      "Discover the Fourth House in your chart: home, family, roots, emotional foundation, and private life. A thorough guide to the House of Home in astrology.",
    sections: [
      section("life-area-overview", "What the Fourth House Represents", [
        "The Fourth House is the House of Home. It sits at the bottom of the chart—the Imum Coeli or IC—and symbolizes roots, family, ancestry, and the private self beneath public roles. While the Tenth House shows how you are known in the world, the Fourth shows where you go when the world is loud. Its life area spans family, roots, private life, and emotional foundation. This is the chart's base camp: the kitchen table, the childhood bedroom, the ancestral story, and the inner child who still decides whether rest feels safe.",
        "Naturally associated with Cancer and the Moon, the Fourth House is tidal. It swells with memory, nourishment, and belonging. People with strong Fourth House emphasis often build life around home—whether that means literal real estate, a close family, a chosen clan, or an interior sanctuary no one else sees. The house also describes one parent or caregiving figure in many traditions, often the more private or nurturing influence, though chart technique varies.",
        "Emotional foundation is the deeper keyword here. Security in the Fourth House is not only about having a lease or mortgage. It is about whether you can regress a little without shame—cry, cook, cancel plans, and still trust you will re-emerge intact. When this house is wounded, people may overwork to avoid stillness, or attach to partners who feel like family without being healthy. When healed, the Fourth House becomes a well: you draw from it rather than drowning in it.",
        "Keywords such as home, parents, ancestry, inner security, and retreat interweave. Ancestry includes culture, land, and inherited patterns. Retreat is the sacred right to withdraw. Studying this house helps you build a life that has a center—not only achievements pointing outward.",
      ]),
      section(
        "planets-in-house",
        "Planets in the Fourth House",
        [
          "Planets in the Fourth House tint private life, family patterns, and your relationship with home base. These placements are often felt in childhood and revisited in adulthood when you buy property, become a parent, or care for aging relatives.",
          "The Moon in the Fourth House is powerful in lunar territory. Home and mood are inseparable; you may need a nurturing space to regulate emotionally. The Sun here wants pride in family or property and may carry leadership duties at home. Venus brings beauty, harmony, and pleasure to domestic life. Mars can produce family conflict, restless remodeling, or fierce protection of private space.",
          "Mercury here thinks about the past and may produce family storytellers or frequent moves in youth. Jupiter expands the home—large families, generous tables, or multiple properties over time. Saturn may delay domestic ease or deepen responsibility through caregiving and property maintenance. Uranus brings unconventional households, sudden moves, or emotional independence from tradition.",
          "Neptune dissolves boundaries at home—for better through art and spirituality, for worse through confusion or idealization of family. Pluto intensifies family secrets, power dynamics, and transformative relocations. Always combine with the sign on the IC and aspects to the Moon for a full picture.",
        ],
        "Example: Jupiter in the Fourth House may produce a childhood that felt abundant in food, guests, or cultural richness even if money was not always stable."
      ),
      section("sign-on-cusp", "The Sign on the Fourth House Cusp", [
        "The sign on the Fourth House cusp (the IC sign) describes the emotional climate you seek at home and the legacy you unconsciously carry.",
        "Aries on the IC needs independence within home walls; family may be competitive or pioneering. Taurus seeks stability, good food, and physical comfort in private life. Gemini wants conversation, books, and mental stimulation at home. Cancer on the IC craves deep belonging and may cling to memory.",
        "Leo on the Fourth wants warmth, celebration, and dignity in family life. Virgo needs order, routines, and practical care. Libra seeks harmony and attractive surroundings; conflict at home is especially draining. Scorpio on the IC feels intensely private and may guard family secrets.",
        "Sagittarius wants space—literal or philosophical—at home. Capricorn treats home as responsibility and legacy. Aquarius prefers unconventional households or chosen family. Pisces on the IC dreams, heals, and may blur boundaries between family and fantasy. The IC sign is your private compass.",
      ]),
      section("transits", "Transits Through the Fourth House", [
        "Transits through the Fourth House activate home, family, property, and inner emotional life. These periods often coincide with moves, renovations, caregiving changes, or psychological returns to childhood themes.",
        "Saturn transiting the Fourth can feel heavy yet clarifying. You may repair foundations—literal basements or family structures. Jupiter expands home life: bigger space, more guests, or reconciliation. Mars triggers domestic conflict or urgent repairs; channel energy into productive projects. Venus beautifies and soothes family relationships.",
        "Eclipses on the Fourth–Tenth axis are career-and-home pivot points. Promotions may require relocation; family needs may reshape public ambitions. Outer planet transits here rewire belonging over years. Uranus may break you out of stagnant living situations. Neptune inspires spiritual home life or confusion about where you belong. Pluto excavates family psychology.",
        "Honor fatigue during Fourth House transits. Rest is not laziness when the base of the chart is active. Therapy, genealogy, and domestic rituals support integration.",
      ]),
      section("synastry-relevance", "Fourth House Synastry", [
        "Fourth House synastry reveals whether two people feel at home with each other—and what family patterns they trigger. This overlay is crucial for cohabitation and long-term intimacy.",
        "A partner's Moon or Venus in your Fourth House often feels comforting. They may harmonize with your private self and enjoy your space. Saturn here can stabilize or feel parental. Mars may disrupt peace at home or motivate shared projects. Pluto intensifies attachment to domestic life and may unearth family ghosts together.",
        "Your planets in a partner's Fourth House show how you affect their sanctuary. Your Jupiter may enlarge their household joy; your Uranus may make their apartment feel too small for old patterns. Compare with Tenth House overlays to balance private needs and public direction.",
        "Couples planning to live together should study this house carefully. Chemistry without Fourth House compatibility may love well in public yet fray behind closed doors.",
      ]),
    ],
    faq: [
      {
        question: "What is the IC in astrology?",
        answer:
          "The IC, or Imum Coeli, is the cusp of the Fourth House at the bottom of the chart. It represents home, roots, and the most private foundation of your life. The sign on the IC describes your inner base camp.",
      },
      {
        question: "Does the Fourth House represent both parents?",
        answer:
          "Traditions differ. Many modern astrologers associate the Fourth House with one caregiving parent—often the more nurturing or private figure—and the Tenth with the other. Always interpret within the full family context.",
      },
      {
        question: "Can the Fourth House show real estate luck?",
        answer:
          "It describes your relationship with home and property rather than guaranteeing ownership. Benefic planets, supportive rulers, and constructive transits often correlate with positive moves or investments when other factors align.",
      },
      {
        question: "How is the Fourth House different from the First?",
        answer:
          "The First House is your public interface and bodily presence. The Fourth is your private interior and emotional foundation. One is the front door; the other is the kitchen at midnight.",
      },
      {
        question: "What heals a difficult Fourth House?",
        answer:
          "Therapeutic work on family patterns, intentional home-making, boundaries with relatives, and nurturing the inner child through rest and creative privacy often help. Astrology maps the themes; you choose the rituals.",
      },
    ],
  },

  "fifth-house": {
    description:
      "Learn the Fifth House: creativity, romance, children, play, joy, and self-expression. A complete astrology guide to the House of Pleasure in your birth chart.",
    sections: [
      section("life-area-overview", "What the Fifth House Represents", [
        "The Fifth House is the House of Pleasure. After the Fourth establishes inner security, the Fifth asks what you create when you feel safe enough to shine. Its life area spans creativity, romance, children, play, and self-expression. This is where the chart celebrates life—not as duty, but as art, flirtation, sport, and heartfelt risk. Naturally linked to Leo and the Sun, the Fifth House wants visibility for joy rather than for obligation alone.",
        "Romance here is not the same as marriage. The Fifth House describes dating chemistry, crushes, pleasure, and the theater of attraction before contracts form in the Seventh. Children—literal or metaphorical—belong here too: offspring, students you mentor, creative projects you birth, and anything you shepherd with pride. Play is not frivolous in this house; it is how intelligence stays alive.",
        "Self-expression is the through-line. Whether you perform music, lead a classroom, gamble thoughtfully, or throw unforgettable parties, the Fifth House tracks where you pour personality into form. Blocked Fifth House energy may show as creative constipation, fear of being cringe, or romance that stays hypothetical. Open channels may look like generosity of spirit—even when life elsewhere is serious.",
        "Keywords including joy, art, dating, risk, and performance describe a spectrum from hobby to vocation. Risk is essential: love and art require exposure. Studying this house helps you schedule delight on purpose rather than waiting for permission to be vivid.",
        "In chart synthesis, weigh the Fifth House against the Second and Tenth. The Second asks what you value enough to fund; the Tenth asks what you build for legacy. The Fifth asks what you would do if applause were guaranteed but payment were not. When those three houses tell a coherent story, creativity stops feeling selfish and becomes fuel for a life that is both productive and alive.",
      ]),
      section(
        "planets-in-house",
        "Planets in the Fifth House",
        [
          "Planets in the Fifth House spotlight creative drive, romantic style, and relationship with fun. These placements often appear in charts of performers, parents, gamblers, and anyone who treats life as a canvas.",
          "The Sun in the Fifth House is at home in solar joy. Identity shines through creation, romance, and play. You may need an audience or at least an honest mirror. Venus here romances easily and may produce artists, stylists, or lovers of luxury leisure. Mars pursues passion directly—fast crushes, competitive sports, bold creative risks.",
          "The Moon needs emotional play: hobbies that soothe, children to nurture, or romantic rituals that feel safe. Mercury writes, jokes, and flirts with words; teaching young minds may satisfy. Jupiter expands romance and creative output; watch overindulgence in pleasure. Saturn delays fun or matures talent into mastery over time.",
          "Uranus brings unconventional romance and original art. Neptune inspires muse-driven creativity and idealized love. Pluto loves deeply and may create compulsively or parent intensely. Aspects tell whether pleasure is integrated or tangled with ego fear.",
        ],
        "Example: Venus trine Jupiter in the Fifth House often correlates with warm charisma and creative abundance when other factors support stability."
      ),
      section("sign-on-cusp", "The Sign on the Fifth House Cusp", [
        "The sign on the Fifth House cusp colors how you pursue joy, romance, and creative projects by default.",
        "Aries on the Fifth loves competitive play and bold flirtation. Taurus savors slow romance, fine food, and tactile arts. Gemini flirts with wit and needs variety in hobbies. Cancer nurtures through creativity and bonds romantically through care.",
        "Leo on the cusp radiates performative joy and wants heartfelt applause. Virgo crafts skillfully and may express love through helpful acts. Libra romances aesthetically and seeks harmonious pleasure. Scorpio loves intensely and creates with depth.",
        "Sagittarius plays adventurously and romances across cultures or distances. Capricorn creates ambitiously and may delay fun for achievement. Aquarius expresses originally and romances unconventionally. Pisces dreams artistically and loves compassionately.",
      ]),
      section("transits", "Transits Through the Fifth House", [
        "Transits through the Fifth House awaken romance, creativity, and inner child energy. These are among the most enjoyable transits when balanced—dates, performances, vacations, and creative launches often accelerate.",
        "Venus here sweetens dating and artistic output. Mars heats passion and may spark new crushes or competitive events. Jupiter expands pleasure and fertility themes; say yes to showcases. Saturn asks which hobbies deserve discipline. Uranus brings surprise romances or creative breakthroughs.",
        "Eclipses on the Fifth–Eleventh axis may shift between personal joy and group belonging—leaving a scene that no longer fits or committing to a creative community. Outer planet transits reshape how you express heart over years.",
        "Schedule play during these transits deliberately. The Fifth House punishes martyrdom. Even busy charts need applause tracks.",
      ]),
      section("synastry-relevance", "Fifth House Synastry", [
        "Fifth House synastry is classic romance astrology. It shows flirtation, fun, and whether someone makes you feel creatively alive.",
        "A partner's Sun, Venus, or Mars in your Fifth House often sparks attraction and admiration. You may feel seen in your talents and playful self. Jupiter here enlarges joy; Saturn may cool or mature the romance. Pluto intensifies passion and creative obsession.",
        "Your planets in a partner's Fifth House show how you affect their pleasure. Your Mercury may entertain; your Neptune may inspire or idealize. Compare with Seventh House overlays to see if flirtation becomes partnership.",
        "Long-term couples benefit from active Fifth House maintenance—date nights, shared hobbies, and celebrating each other's creations—even when bills and chores dominate.",
      ]),
    ],
    faq: [
      {
        question: "Does the Fifth House predict children?",
        answer:
          "It describes your relationship with children, fertility themes, and creative birthing rather than guaranteeing offspring. Many factors—including biology and choice—matter beyond astrology.",
      },
      {
        question: "What is the difference between the Fifth and Seventh houses?",
        answer:
          "The Fifth House covers romance, play, and personal creativity. The Seventh House covers committed partnership, contracts, and mirrored one-to-one bonds. Dating often lives in the Fifth; marriage lives in the Seventh.",
      },
      {
        question: "Can a strong Fifth House indicate artistic talent?",
        answer:
          "It often correlates with creative drive and performance energy. Talent still requires training, but this house shows where joy and expression want to merge.",
      },
      {
        question: "Is gambling a Fifth House topic?",
        answer:
          "Traditionally yes—speculation, games, and risk for pleasure connect here. Ethical and financial caution still applies; the house describes appetite for risk, not a mandate to gamble.",
      },
      {
        question: "How do I activate my Fifth House positively?",
        answer:
          "Schedule creative play, pursue hobbies without monetizing them immediately, date yourself with sincerity, and allow visible joy. Pleasure practiced becomes resilience.",
      },
    ],
  },

  "sixth-house": {
    description:
      "Master the Sixth House: daily work, health, habits, service, pets, and self-improvement. Your practical guide to the House of Service in astrology.",
    sections: [
      section("life-area-overview", "What the Sixth House Represents", [
        "The Sixth House is the House of Service. It describes how you maintain life on a Tuesday afternoon: work routines, health habits, daily duty, and the craft of improvement. Linked to Virgo and Mercury, this house is humble but indispensable. Without Sixth House function, brilliant Fifth House visions never ship, and Fourth House comfort turns stagnant.",
        "Its life area spans work routines, health, habits, daily duty, and the small accountable choices that compound. This is not necessarily your dream career—that often involves the Tenth—but the labor you perform regularly, including unpaid maintenance of body and environment. Pets frequently appear here because they rhythmize days with care.",
        "Health in the Sixth House is holistic in the practical sense: sleep, nutrition, movement, stress management, and relationship with healthcare workers. Illness themes may arise when routines break or when work and worth become tangled. Healing often returns through modest consistent rituals rather than dramatic cures alone.",
        "Keywords like wellness, craft, pets, organization, and improvement define a mindset of iterative refinement. The Sixth House asks: what system supports your values? Studying it improves productivity without burnout and service without self-erasure.",
        "Employers, managers, and clients often activate this house symbolically. The quality of your daily environment—light, noise, respect for breaks, clarity of tasks—shows up here as strongly as vitamins or step counts. When the Sixth House is emphasized by transit or natal placement, small ergonomic upgrades and boundary scripts around availability can produce disproportionate relief because this house governs the machinery of ordinary survival.",
      ]),
      section(
        "planets-in-house",
        "Planets in the Sixth House",
        [
          "Planets in the Sixth House shape work style, health sensitivities, and attitude toward duty. These placements often show up in jobs, daily schedules, and how you respond to stress.",
          "Mercury here thinks in tasks and timelines. You may excel at analysis, editing, healthcare communication, or logistics. Venus brings grace to service and may link work to aesthetics—design, wellness, or hospitality. Mars drives hustle and can produce inflammation or overwork if unchecked. The Moon ties health to emotion; digestive and nervous system patterns need gentle routines.",
          "The Sun wants meaningful daily work; invisible labor may drain you. Jupiter expands job scope—sometimes generously, sometimes into overwhelm. Saturn rewards disciplined health and craft over time. Uranus needs unconventional schedules or tech-forward workflows. Neptune serves through healing arts but may blur boundaries at work. Pluto transforms health crises into empowerment and may obsess over optimization.",
          "House rulers matter: if Mercury rules your Sixth and sits in the Tenth, daily skill may feed public career directly. If it sits in the Twelfth, service may happen in hospitals, studios, or roles with limited visibility. Always read with the Sixth House ruler and aspects to Mars for stress patterns.",
        ],
        "Example: Mars in the Sixth House may thrive in emergency medicine or fitness coaching yet need deliberate recovery days to avoid chronic fatigue."
      ),
      section("sign-on-cusp", "The Sign on the Sixth House Cusp", [
        "The sign on the Sixth House cusp describes your default approach to daily work and wellness.",
        "Aries on the Sixth works in bursts and needs active outlets. Taurus prefers steady routines and sensory comfort in workspaces. Gemini multitasks and may need variety to avoid boredom. Cancer cares through nurturing service and may work from home easily.",
        "Leo wants recognition even in daily roles. Virgo on the cusp refines processes naturally. Libra seeks harmonious workplaces and balanced health habits. Scorpio works intensely and may research health deeply.",
        "Sagittarius dislikes micromanagement and needs meaning in tasks. Capricorn structures days efficiently. Aquarius innovates systems and prefers flexible protocols. Pisces serves compassionately and needs spiritual or creative hygiene practices.",
      ]),
      section("transits", "Transits Through the Sixth House", [
        "Transits through the Sixth House reorganize work, health, and habits. Expect job task changes, doctor visits, fitness pivots, or pet-related events.",
        "Saturn here builds durable routines—excellent for sobriety, training plans, and professional skill mastery. Jupiter may bring job expansion or need to moderate excess. Mars energizes workouts yet risks injury if reckless. Venus supports pleasant workplace relationships and spa-level self-care.",
        "Mercury transits aid scheduling and health research. Eclipses on the Sixth–Twelfth axis may end unsustainable jobs or highlight hidden health patterns requiring rest. Outer planet transits slowly retool your relationship with duty.",
        "Track sleep and meals during these transits. Small logs reveal big patterns.",
        "If you are recovering from illness, Sixth House transits favor gradual re-entry—part-time schedules, physical therapy, and honest conversations with managers about capacity. Pushing for heroics now often backfires; the house rewards sustainable cadence.",
      ]),
      section("synastry-relevance", "Sixth House Synastry", [
        "Sixth House synastry shows daily compatibility: chores, health habits, and whether love survives mundane mornings.",
        "A partner's planets in your Sixth House affect your routines. Venus may beautify shared habits; Mars may motivate workouts or spark nagging; Saturn may help structure health goals—or feel judgmental. Moon contacts often show emotional caretaking in illness.",
        "Your planets in a partner's Sixth House reveal how you show love practically—meal prep, reminders, fixing things. Compare with Twelfth House overlays if one partner serves while the other withdraws.",
        "Cohabiting couples with strong Sixth House synastry often divide labor fairly. Weak overlays may need explicit chore charts despite great romance elsewhere.",
        "Healthcare couples and pet owners frequently show Sixth House contacts. Shared responsibility for a dependent—animal, patient caseload, or family member—can bond partners when chores are negotiated rather than assumed by gender or status.",
      ]),
    ],
    faq: [
      {
        question: "Is the Sixth House only about paid work?",
        answer:
          "No. It includes daily labor, unpaid maintenance, volunteering, and how you organize life. Paid employment is one expression of service and routine.",
      },
      {
        question: "Does the Sixth House rule illness?",
        answer:
          "It correlates with health habits, stress responses, and periods of vulnerability or recovery. It does not replace medical care or predict specific diagnoses.",
      },
      {
        question: "Why are pets associated with the Sixth House?",
        answer:
          "Pets rhythmize daily care—feeding, walking, vet visits—and teach service without ego. Many astrologers place pets here alongside small animals and practical caregiving.",
      },
      {
        question: "How is the Sixth House different from the Tenth?",
        answer:
          "The Sixth is daily work and craft; the Tenth is public career, reputation, and long-term vocation. You may love your Sixth House job skills while building Tenth House authority elsewhere.",
      },
      {
        question: "Can the Sixth House show perfectionism?",
        answer:
          "Virgo's natural house often highlights refinement and criticism—of self or systems. Healthy expression improves quality; unhealthy expression becomes anxious micromanagement.",
      },
    ],
  },

  "seventh-house": {
    description:
      "Explore the Seventh House: marriage, partnerships, contracts, open enemies, and one-to-one bonds. A definitive guide to the House of Partnership in astrology.",
    sections: [
      section("life-area-overview", "What the Seventh House Represents", [
        "The Seventh House is the House of Partnership. It sits directly opposite the First House on the western horizon—the Descendant—and describes how you meet the Other. Its life area spans marriage, contracts, open enemies, and one-to-one bonds. Where the First House is I, the Seventh is we in negotiated form. This house governs not only romance but business partners, clients, therapists, rivals, and anyone who mirrors you clearly enough to demand adjustment.",
        "Traditionally linked to Libra and Venus, the Seventh House seeks balance, fairness, and aesthetic harmony in relationship. Yet balance does not mean ease. The Descendant often attracts qualities you disown in yourself—assertion if you are polite, softness if you are armored. Partnership becomes a school for integration.",
        "Contracts belong here: vows, leases, legal agreements, and the spoken rules that define mutuality. Open enemies—people whose opposition is visible rather than hidden—also appear. In modern life, this can include public critics, ex-partners in litigation, or competitors you must engage directly.",
        "Keywords like relationships, commitment, balance, mirrors, and negotiation summarize the work. Studying the Seventh House clarifies what you seek in partnership, what you project, and what commitment actually costs you—not romantically alone, but structurally.",
        "Modern life stretches the Seventh House beyond marriage. Co-founders, roommates with legal leases, attorneys, therapists, and public opponents all qualify when the bond is defined by explicit reciprocity or visible friction. The house teaches negotiation as a spiritual discipline: you cannot harmonize with another person until you can name what you are exchanging—time, money, loyalty, space, or truth.",
      ]),
      section(
        "planets-in-house",
        "Planets in the Seventh House",
        [
          "Planets in the Seventh House color partnership needs and the type of people you attract or contract with. These placements often become visible through marriage, business alliances, or defining conflicts.",
          "Venus in the Seventh House values harmony and may marry or partner early—or idealize partnership as life's centerpiece. Mars here attracts fiery partners and may learn conflict skills through intimacy. The Sun wants a partner who reflects identity; relationships feel fated to visibility. The Moon needs emotional partnership and may marry for security or nurturing.",
          "Mercury seeks intellectual equals and talkative bonds. Jupiter expands partnership benefits—sometimes through generous spouses, sometimes through multiple key alliances. Saturn delays or deepens commitment; mature expression chooses partners carefully and keeps vows. Uranus needs freedom within contract and may experience sudden unions or separations.",
          "Neptune romanticizes partners and may dissolve boundaries in love. Pluto attracts intense, transformative bonds where power and merging are central. Read with Descendant sign and Venus condition.",
        ],
        "Example: Saturn in the Seventh House may marry later yet build partnerships that withstand decades when both parties grow responsibly."
      ),
      section("sign-on-cusp", "The Sign on the Seventh House Cusp", [
        "The sign on the Seventh House cusp is your Descendant sign. It describes qualities you often seek in partners and open adversaries.",
        "Aries Descendant attracts independent, direct partners. Taurus seeks stable, sensual allies. Gemini wants witty, curious companions. Cancer seeks nurturing, family-oriented bonds.",
        "Leo Descendant admires confident, expressive partners. Virgo attracts meticulous, helpful types. Libra on the cusp wants graceful equals—sometimes at the cost of avoiding hard truths. Scorpio seeks depth and loyalty with intensity.",
        "Sagittarius wants adventurous, honest partners. Capricorn seeks ambitious, reliable allies. Aquarius attracts unconventional or friendship-first bonds. Pisces wants compassionate, soulful connection—and must watch for savior dynamics.",
        "The Descendant is not a shopping list; it is a learning edge. Difficult Descendant signs in your chart often describe qualities you must integrate, not merely attract. Therapy and conscious dating help you choose partners who embody the lesson without repeating old injuries.",
      ]),
      section("transits", "Transits Through the Seventh House", [
        "Transits through the Seventh House activate partnerships, contracts, and visible conflict. New relationships may form; existing ones face tests or renewal.",
        "Jupiter here expands partnership opportunities—marriage, clients, beneficial alliances. Saturn demands commitment realism—define terms or part ways. Mars heats passion and argument; negotiate actively. Venus sweetens romance and business charm.",
        "Eclipses on the First–Seventh axis redefine identity through relationship. Outer planet transits reshape partnership over years—Uranus liberates, Neptune spiritualizes or confuses, Pluto purges control dynamics.",
        "Use these transits for counseling, contract review, and honest mirroring. Partnership grows when projections become conversations.",
        "Retrograde planets crossing the Seventh House often resurrect ex-partners or unfinished agreements. Treat those returns as data, not destiny: what contract term, apology, or boundary still needs language?",
      ]),
      section("synastry-relevance", "Seventh House Synastry", [
        "Seventh House synastry is central to commitment analysis. A partner's Sun, Moon, or Venus on your Descendant often feels like meeting someone significant.",
        "Planets falling in your Seventh House activate partnership templates. Saturn may feel destined and serious. Pluto may feel fated and consuming. Jupiter may feel generous and expansive. Your planets in a partner's Seventh show how you embody their sought qualities.",
        "Compare Descendant–Ascendant contacts across charts for classic chemistry. Yet Seventh House alone does not guarantee longevity—Fourth and Eighth houses matter for domestic and merged life.",
        "Business partnerships follow similar rules: clarity, fairness, and negotiated mirrors prevent open enemies from becoming hidden ones.",
        "In composite and Davison charts, Seventh House emphasis shows whether a pair functions best as public allies. Wedding timing often consults this house, but so should business incorporation, therapy begins, and any moment you sign your name beside someone else's.",
        "Same-sex and nontraditional partnerships are still Seventh House matters when commitment, contracts, and public recognition of the bond matter. Astrology describes relational structure more than cultural form.",
      ]),
    ],
    faq: [
      {
        question: "What is the Descendant?",
        answer:
          "The Descendant is the cusp of the Seventh House, opposite the Ascendant. It describes partnership style and the qualities you often seek or confront in others one-to-one.",
      },
      {
        question: "Does the Seventh House only rule marriage?",
        answer:
          "No. It includes all significant one-to-one contracts—spouses, business partners, therapists, close clients, and open rivals—not only romance.",
      },
      {
        question: "Why do I attract my Descendant sign energy?",
        answer:
          "Partners often carry traits your First House does not emphasize. The chart seeks wholeness through mirroring, which can feel attractive, irritating, or both.",
      },
      {
        question: "How do eclipses affect the Seventh House?",
        answer:
          "Eclipses on the partnership axis often coincide with relationship milestones—engagements, breakups, legal settlements, or identity shifts triggered by partnership.",
      },
      {
        question: "What if I have no planets in the Seventh House?",
        answer:
          "Many charts have an empty Seventh House. The sign on the cusp and the ruler's placement still describe partnership vividly. Planets transiting the house activate themes over time. Progressions to the Descendant can mark relationship chapters even when the natal house is empty.",
      },
    ],
  },

  "eighth-house": {
    description:
      "Understand the Eighth House: shared resources, intimacy, transformation, inheritance, and psychological depth. A complete guide to the House of Transformation.",
    sections: [
      section("life-area-overview", "What the Eighth House Represents", [
        "The Eighth House is the House of Transformation. It follows the Seventh's contracts and asks what happens when two lives truly merge—financially, emotionally, sexually, and psychologically. Its life area spans shared resources, intimacy, death, rebirth, and depth. Naturally tied to Scorpio and Pluto, this house is not superficial. It governs what you cannot casually leave on read: debt, inheritance, taxes, trauma healing, sexual bonding, and the slow alchemy of crisis.",
        "Shared resources are literal and symbolic. Joint bank accounts, mortgages, venture capital, family trusts, and insurance payouts live here. So do emotional economies—who holds secrets, who has power, who owes whom repair. The Eighth House exposes whether merging feels nourishing or threatening.",
        "Intimacy in this house is more than romance. It is truth under pressure. People with strong Eighth House placements often experience life in chapters that end and restart—career reinventions, near-death insights, therapeutic breakthroughs, or inheritances that change trajectory. The house teaches that control loosens where trust deepens.",
        "Keywords like merging, inheritance, taboo, crisis, and depth interlock. Taboo topics—money shame, grief, sexuality, power—seek honest integration here. Studying this house supports healthier bonds and wiser handling of other people's resources.",
        "Tax season, estate planning, and insurance renewals are mundane Eighth House rituals. On a psychological level, the same house governs the moment you admit you cannot control someone you love, or when you stop performing strength and let another person witness your fear. Those admissions are mergers too—they change who holds power in the bond.",
      ]),
      section(
        "planets-in-house",
        "Planets in the Eighth House",
        [
          "Planets in the Eighth House intensify experience. They often correlate with inheritances, psychological insight, sexual charisma, or periods of crisis that mature the soul.",
          "Pluto in the Eighth House is potent in its domain. Transformation, research, and power awareness are central. Mars here fights for control yet can heal through courageous honesty. Venus attracts depth in love and may gain through partners or estates. The Moon needs emotional merging and may fear abandonment in intimacy.",
          "Mercury investigates secrets, psychology, and finance. The Sun wants authentic power—not performance. Jupiter may benefit from shared resources yet risk overextension. Saturn fears loss yet builds strong boundaries around debt and trust. Uranus brings sudden inheritances or unconventional intimacy agreements.",
          "Neptune spiritualizes merging or confuses financial boundaries. Outer planet combinations here demand ethical clarity.",
          "Benefic aspects to Eighth House planets can ease inheritances and settlements; hard aspects may prolong probate or intensify power struggles until a fair structure emerges. Timing techniques often layer transits to the ruler alongside planets crossing the cusp.",
        ],
        "Example: Venus in the Eighth House may marry into resources or learn that self-worth deepens when vulnerability is honored rather than traded."
      ),
      section("sign-on-cusp", "The Sign on the Eighth House Cusp", [
        "The sign on the Eighth House cusp colors how you approach merging, risk, and psychological depth.",
        "Aries on the Eighth merges boldly and may fight over control. Taurus stabilizes shared assets slowly. Gemini negotiates through talk and contracts. Cancer merges emotionally and guards family inheritances.",
        "Leo wants loyal, proud bonds with shared spotlight. Virgo manages details of taxes, debt, and health protocols. Libra seeks fair mergers yet may avoid ugly truths. Scorpio on the cusp dives deep naturally.",
        "Sagittarius merges through shared adventure and philosophy. Capricorn treats shared resources strategically. Aquarius prefers unconventional agreements. Pisces dissolves boundaries spiritually—or needs firm financial clarity.",
      ]),
      section("transits", "Transits Through the Eighth House", [
        "Transits through the Eighth House stir taxes, debt, inheritances, therapy, sexuality, and endings that enable rebirth. These periods can feel heavy yet clarifying.",
        "Pluto transits here are legendary for deep renovation—grief work, payoff of old debts, sexual healing. Saturn demands financial sobriety and mature intimacy contracts. Jupiter may bring inheritances or generous joint ventures—watch overspending jointly.",
        "Mars accelerates confrontations about money and trust. Venus deepens intimacy and may ease settlements. Eclipses on the Second–Eighth axis reset personal versus shared resource stories.",
        "Support these transits with financial advisors, therapists, and estate planning when appropriate. Secrecy magnifies stress; transparency heals.",
        "Sexual healing and trauma therapy often peak under constructive Eighth House transits when support is available. The house does not demand exposure; it invites chosen vulnerability with skilled witnesses.",
      ]),
      section("synastry-relevance", "Eighth House Synastry", [
        "Eighth House synastry is the astrology of bonding, jealousy, and transformative sex. A partner's Pluto, Mars, or Venus here often feels magnetic and fated.",
        "Planets in your Eighth House show how others impact your depths. Their Saturn may stabilize finances—or feel controlling. Their Moon may soothe fears—or enmesh. Your planets in a partner's Eighth reveal how you trigger their intimacy templates.",
        "Compare with Second House overlays for complete money chemistry. Strong Eighth without Second compatibility may merge intensely yet argue about groceries.",
        "Ethical intimacy requires consent and clarity. Astrology describes activation, not entitlement to another person's psyche.",
        "When counseling couples with heavy Eighth House overlays, track whether passion includes repair skills. Intensity without accountability recreates the same crisis loop. The house rewards couples who can name power dynamics aloud and renegotiate after conflict rather than pretending harmony.",
        "Joint ventures—buying property, starting a business, blending families—are Eighth House laboratories. Document agreements in writing even when love feels infinite; the house respects clarity when resources merge.",
      ]),
    ],
    faq: [
      {
        question: "Is the Eighth House about death literally?",
        answer:
          "It symbolizes endings, transitions, and psychological rebirth as well as literal mortality themes. Many astrologers read it for grief work, inheritances, and life chapters that close.",
      },
      {
        question: "What debts belong to the Eighth House?",
        answer:
          "Shared debts, taxes, loans, mortgages, and financial obligations tied to others—not solo spending habits, which lean Second House.",
      },
      {
        question: "Does a busy Eighth House mean toxic relationships?",
        answer:
          "It indicates intensity and merging themes, not fate. Conscious boundaries, therapy, and financial transparency channel depth constructively.",
      },
      {
        question: "How does Pluto relate to this house?",
        answer:
          "Pluto rules Scorpio, the natural sign of the Eighth House. Pluto themes—power, transformation, taboo—echo through shared resources and intimacy here. Transiting Pluto through the Eighth often coincides with years-long renovation of how you handle trust, debt, and emotional honesty in close bonds.",
      },
      {
        question: "Can the Eighth House show inheritance?",
        answer:
          "It often correlates with inheritances, estates, and partner resources. Timing usually involves transits, progressions, and the ruler's condition—not the house alone. Benefic aspects during Eighth House activations sometimes coincide with insurance payouts, settlements, or favorable loan restructuring when other chart factors agree.",
      },
    ],
  },

  "ninth-house": {
    description:
      "Study the Ninth House: higher education, long travel, philosophy, faith, publishing, and the search for meaning. Your guide to the House of Philosophy in astrology.",
    sections: [
      section("life-area-overview", "What the Ninth House Represents", [
        "The Ninth House is the House of Philosophy. After the Eighth's depths, the Ninth lifts gaze toward horizon. Its life area spans higher education, travel, belief, publishing, and meaning. Linked to Sagittarius and Jupiter, this house asks what you believe, what you teach, and how far you will go—geographically and intellectually—to verify truth.",
        "Higher education includes university study, advanced training, mentorship under masters, and self-directed scholarship. Travel here is long-distance and perspective-shifting: study abroad, pilgrimage, immigration, or journeys that change worldview—not commuting, which belongs to the Third.",
        "Belief systems—religion, ethics, political philosophy, scientific paradigms—live in the Ninth. So does publishing in the broad sense: books, podcasts, courses, and any platform that broadcasts your synthesis. The house rewards honesty about what you do not know yet.",
        "Keywords like faith, adventure, law, teaching, and expansion describe appetite for coherence. Studying this house helps you align career, travel, and spiritual life with a story larger than survival alone.",
        "Immigration, religious conversion, and publishing a first book are Ninth House arcs in modern biographies. Even if you never leave your country, you may travel intellectually—changing political alignment, training in a new field, or mentoring someone whose background differs from yours. The house measures breadth of mind as much as miles flown.",
        "Languages belong here too. Bilingual and multilingual charts often show Ninth House emphasis or strong Jupiter–Mercury links. Learning a language is a form of travel—it rewires belief about who counts as us.",
      ]),
      section(
        "planets-in-house",
        "Planets in the Ninth House",
        [
          "Planets in the Ninth House shape worldview, teaching style, and relationship with foreignness—people, languages, or ideas.",
          "Jupiter in the Ninth House is strong in its joy. Travel, teaching, and philosophy may define life. The Sun wants identity as sage, professor, or explorer. Mercury loves languages, law, and comparative study. Venus attracts foreign cultures and may marry abroad or teach arts cross-culturally.",
          "Mars fights for beliefs and may crusade—constructively as activist, destructively as dogmatist. The Moon needs meaning to feel secure; spiritual homes matter. Saturn studies seriously and may delay travel yet become authoritative teacher. Uranus rebels against dogma and innovates belief.",
          "Neptune inspires mystical faith or confusion about truth. Pluto transforms ideology through intense study or cultural immersion. Multiple planets here often mark people who become cultural translators—anthropologists, diplomats, comparative religion scholars, or travelers who settle far from birth culture.",
        ],
        "Example: Mercury in the Ninth House may produce a lifelong student who turns every trip into field research."
      ),
      section("sign-on-cusp", "The Sign on the Ninth House Cusp", [
        "The sign on the Ninth House cusp colors how you pursue truth and adventure.",
        "Aries on the Ninth pioneers beliefs boldly. Taurus prefers practical ethics and slow cultural immersion. Gemini collects philosophies and languages. Cancer ties faith to ancestry and emotional truth.",
        "Leo teaches dramatically and proudly. Virgo refines doctrine through detail and service. Libra seeks fair universal principles. Scorpio investigates hidden metaphysics and taboo wisdom.",
        "Sagittarius on the cusp lives for horizon. Capricorn structures belief into institutions. Aquarius champions progressive ethics. Pisces seeks mystical unity across traditions.",
        "When the Ninth House cusp ruler is retrograde natally, you may revisit beliefs repeatedly before teaching publicly. That spiral is not indecision; it is depth checking—provided you eventually share what you have tested.",
      ]),
      section("transits", "Transits Through the Ninth House", [
        "Transits through the Ninth House expand—or test—worldview. Travel, enrollment, publishing launches, and legal matters often accelerate.",
        "Jupiter here is classic for study abroad, successful exams, and audience growth. Saturn demands disciplined scholarship and may delay trips until plans mature. Uranus brings sudden relocations or belief breakthroughs.",
        "Eclipses on the Third–Ninth axis shift local versus global orientation—moving, changing majors, or rewriting personal mythology. Mars motivates debate; Venus sweetens cultural exchange.",
        "Document insights during these transits. The Ninth House turns experience into teachable wisdom when captured.",
        "Legal study, ordination, and long-distance moves under Ninth House transits benefit from mentors who have already walked the path. Jupiter returns in this house are classic seasons for publishing proposals and applying to programs that once felt out of reach.",
      ]),
      section("synastry-relevance", "Ninth House Synastry", [
        "Ninth House synastry shows whether two people grow beliefs together or collide over worldview.",
        "A partner's Jupiter in your Ninth House often feels inspiring—you may travel or study together. Saturn may mentor or feel restrictive about faith. Neptune romanticizes shared spirituality. Pluto debates truth intensely.",
        "Your planets in a partner's Ninth show how you influence their meaning-making. Compare with Third House for daily conversation versus life philosophy.",
        "Interfaith and intercultural couples benefit from explicit Ninth House conversations—holidays, ethics, children’s education, and freedom to evolve beliefs.",
        "Academic couples, missionary teams, and co-authors often show strong Ninth House synastry before they show classic Seventh House marriage indicators. Shared curriculum—literal or moral—can bond people for decades when adventure and honesty are mutual.",
        "Debate itself can be Ninth House foreplay for intellectually hungry charts. Partners who disagree well—citing sources, traveling to verify claims—often last longer than couples who agree politely but never test ideas.",
        "Podcast co-hosts, research partners, and travel buddies often have tight Ninth House synastry even when romance is absent. The house builds intellectual loyalty that can outlast many Seventh House flings.",
      ]),
    ],
    faq: [
      {
        question: "What is the difference between Third and Ninth house travel?",
        answer:
          "Third House travel is short, local, and routine. Ninth House travel is long-distance and worldview-changing—immigration, study abroad, pilgrimage, or adventure that alters perspective.",
      },
      {
        question: "Does the Ninth House rule law?",
        answer:
          "It correlates with legal philosophy, higher courts, ethics, and publishing about law. Specific litigation timing involves other techniques, but belief about justice lives here.",
      },
      {
        question: "Can the Ninth House indicate teaching careers?",
        answer:
          "Yes. Emphasized Ninth House placements often appear in educators, professors, clergy, travel writers, and public intellectuals—especially with Jupiter, Sun, or Mercury involved.",
      },
      {
        question: "How does Jupiter relate to this house?",
        answer:
          "Jupiter rules Sagittarius, the natural sign of the Ninth House. Jupiter themes—expansion, faith, travel, wisdom—echo through higher learning and meaning here. Jupiter transits through the Ninth often open doors to study, publishing, and mentors who widen your moral imagination.",
      },
      {
        question: "What if I have no planets in the Ninth House?",
        answer:
          "The sign on the cusp and its ruler still describe your philosophy style. Transits activate the house when growth is due. Even without natal planets, profections or solar returns highlighting the Ninth can mark study and travel seasons.",
      },
    ],
  },

  "tenth-house": {
    description:
      "Navigate the Tenth House: career, public reputation, ambition, authority, and legacy. A comprehensive guide to the House of Career in your birth chart.",
    sections: [
      section("life-area-overview", "What the Tenth House Represents", [
        "The Tenth House is the House of Career. At the top of the chart—the Midheaven or MC—it describes your public direction, reputation, and contribution visible to the world. Its life area spans public reputation, ambition, authority, and legacy. While the Fourth House is private roots, the Tenth is the canopy others see from a distance: job title, awards, scandals, leadership, and the story told about you when you are not in the room.",
        "Naturally linked to Capricorn and Saturn, the Tenth House respects time, structure, and earned authority. It is not only about corporate ladders. Artists, parents, activists, and caregivers can express Tenth House themes through craft mastery, public example, or institutional impact. The question is what you are building that outlives a mood.",
        "Ambition here is existential. You may crave recognition, fear irrelevance, or feel called to serve something larger than comfort. One parent or authority figure often imprints this house in traditional readings—sometimes the more public or disciplining influence. Legacy includes how you handle power: do you mentor, gatekeep, or reinvent the field?",
        "Keywords like career, status, achievement, parents, and calling weave together. Calling is the soulful version of career—work that aligns spine and schedule. Studying the Tenth House helps you choose goals that satisfy both market reality and inner dignity.",
        "Social media has amplified Tenth House themes: personal brand is a public MC phenomenon. Whether you curate a professional persona online or resist visibility, the house asks what reputation you are building on purpose versus accidentally. A coherent Tenth House story survives scandal and plateau because it is rooted in demonstrable craft, not only perception.",
      ]),
      section(
        "planets-in-house",
        "Planets in the Tenth House",
        [
          "Planets in the Tenth House spotlight public life. They often describe career flavor, reputation, and relationship with authority figures.",
          "The Sun in the Tenth House wants visible impact. Leadership, public roles, or being known for expertise may feel inevitable. Saturn here builds slow authority—early pressure, later respect. Mars drives competitive career moves and may clash with bosses. Venus charms the public and may work in arts, diplomacy, or branding.",
          "Mercury produces communicators, analysts, and strategists in public roles. The Moon ties reputation to public emotion—people feel your care or volatility. Jupiter expands professional opportunities and may bring fame or overextension. Uranus brings unconventional careers and sudden pivots.",
          "Neptune inspires public artists and spiritual leaders—or confusion about direction. Pluto magnetizes power roles and transformative institutional impact.",
        ],
        "Example: Saturn conjunct the Midheaven often correlates with careers requiring endurance—medicine, architecture, governance—where credibility compounds over decades."
      ),
      section("sign-on-cusp", "The Sign on the Tenth House Cusp", [
        "The sign on the Tenth House cusp (the MC sign) describes your public style and vocational climate.",
        "Aries MC leads boldly and may entrepreneur early. Taurus MC builds stable brands and tangible excellence. Gemini MC communicates publicly—media, teaching, sales. Cancer MC leads through care—hospitality, family business, emotional intelligence.",
        "Leo MC wants spotlight roles and creative authority. Virgo MC masters craft and public service detail. Libra MC negotiates publicly and values reputation for fairness. Scorpio MC wields strategic power and may work in finance, research, or transformation industries.",
        "Sagittarius MC teaches, travels professionally, or publishes widely. Capricorn MC climbs institutions with discipline. Aquarius MC innovates systems and leads collectives. Pisces MC inspires through art, healing, or compassionate institutions.",
        "Midheaven signs do not dictate one job title; they describe the climate of your public story. A Pisces MC nurse and a Pisces MC filmmaker both serve through empathy, but their audiences differ. Translate sign language into vocation through house rulers and aspects.",
      ]),
      section("transits", "Transits Through the Tenth House", [
        "Transits through the Tenth House reshape career, public image, and life direction. Promotions, firings, launches, and reputation tests cluster here.",
        "Saturn transiting the Tenth is the classic career crucible—more responsibility, clearer boundaries, sometimes exhaustion before respect. Jupiter expands professional visibility—apply, publish, pitch. Pluto transits demand ethical power audits. Uranus brings pivots you cannot ignore.",
        "Eclipses on the Fourth–Tenth axis realign home and career. Mars motivates ambition; Venus improves public likability. Use MC transits to update LinkedIn honestly and align outward role with inner truth.",
        "Public life intensifies during these periods. Rest at home becomes non-negotiable fuel.",
        "MC transits coincide with leadership invitations. Before accepting, ask whether the role matches your Fourth House needs—travel, caregiving load, and private recovery time. Tenth House success without Fourth House stability often collapses within a few years.",
      ]),
      section("synastry-relevance", "Tenth House Synastry", [
        "Tenth House synastry shows how partners affect each other's ambition and public standing.",
        "A partner's Saturn on your Midheaven may mentor your career—or feel like a boss at home. Their Jupiter may boost your visibility. Their Pluto may obsess over your success or control your image. Your planets in a partner's Tenth show how you show up in their professional narrative.",
        "Compare with Fourth House for work–life balance. A couple strong in Tenth but weak in Fourth may achieve publicly while emotionally starving.",
        "Business couples should examine Tenth House overlays for power dynamics and shared brand risk.",
        "Parents also live Tenth House themes when they become known through children’s achievements or public family roles. The house is not only corporate; it is any arena where your name travels beyond private witness.",
      ]),
    ],
    faq: [
      {
        question: "What is the Midheaven?",
        answer:
          "The Midheaven, or MC, is the cusp of the Tenth House at the top of the chart. It describes career direction, public reputation, and how you are known professionally.",
      },
      {
        question: "Can the Tenth House show fame?",
        answer:
          "It correlates with public visibility and reputation rather than guaranteeing celebrity. Strong placements plus supportive transits often coincide with recognition phases.",
      },
      {
        question: "Is the Tenth House only for corporate careers?",
        answer:
          "No. Any public role—parenting in community, art, activism, freelancing—can express Tenth House themes when your contribution is visible and structured.",
      },
      {
        question: "How does Saturn relate to this house?",
        answer:
          "Saturn rules Capricorn, the natural sign of the Tenth House. Saturn themes—discipline, time, authority—shape how ambition matures into legacy here.",
      },
      {
        question: "What if my Tenth House differs from my actual job?",
        answer:
          "Many people work jobs not shown literally in the Tenth. Read it as vocational climate and public identity. Side projects and future direction often match more closely over time. Secondary progressions to the Midheaven can mark career shifts that align outer title with inner calling after years of mismatch.",
      },
    ],
  },

  "eleventh-house": {
    description:
      "Connect with the Eleventh House: friends, groups, hopes, social causes, and future vision. A full astrology guide to the House of Community.",
    sections: [
      section("life-area-overview", "What the Eleventh House Represents", [
        "The Eleventh House is the House of Community. After the Tenth House crowns individual achievement, the Eleventh distributes identity across networks. Its life area spans friends, groups, hopes, social causes, and future vision. Linked to Aquarius and Uranus, this house is forward-looking. It asks who your people are, what collective you serve, and which dreams you refuse to shrink to fit the past.",
        "Friends here are chosen family—peers who share ideals more than blood. Groups include teams, clubs, online communities, professional associations, and activist circles. You may feel more yourself in a congregation of oddballs than in a room of admirers.",
        "Hopes and wishes are traditional Eleventh House topics—not vague fantasy, but aims that require social oxygen: funding, introductions, platform, solidarity. Social causes connect personal values to collective action. Technology often appears because networks scale through tools.",
        "Keywords like networks, ideals, technology, collective, and belonging describe modern life vividly. Studying this house helps you build alliances that support long-range goals without sacrificing authenticity.",
        "Crowdfunding, open-source communities, and mutual-aid networks are Eleventh House structures in contemporary terms. The house asks whether your dreams require collaboration—and whether the groups you join actually embody the future you claim to want. Walking away from misaligned communities is as much an Eleventh House act as joining a cause.",
        "Alumni networks, professional guilds, and fandoms are Eleventh House tribes too. Not every community needs a mission statement; some exist to keep wonder alive. The house supports joy in numbers when ideals are shared.",
      ]),
      section(
        "planets-in-house",
        "Planets in the Eleventh House",
        [
          "Planets in the Eleventh House color friendship style, group roles, and relationship with the future.",
          "Uranus in the Eleventh House is at home in innovation networks. Friends may be unusual; groups may form suddenly. Saturn here values loyal long-term allies and may delay belonging until standards clarify. Jupiter expands social reach and humanitarian impact.",
          "The Sun wants visibility within communities and may lead organizations. Venus attracts popular friends and harmonious groups. Mars advocates fiercely for causes and may debate within teams. Mercury networks constantly—DMs, newsletters, introductions.",
          "The Moon needs emotional belonging in tribes. Neptune idealizes movements—or dissolves group boundaries. Pluto transforms through intense alliances and power-aware organizing.",
        ],
        "Example: Jupiter in the Eleventh House may produce a person whose career advances through referrals, patronage, and community trust."
      ),
      section("sign-on-cusp", "The Sign on the Eleventh House Cusp", [
        "The sign on the Eleventh House cusp describes how you enter groups and pursue collective hopes.",
        "Aries on the Eleventh leads initiatives and may dominate friend groups. Taurus prefers stable, loyal circles. Gemini socializes widely and connects disparate people. Cancer nurtures friend networks like family.",
        "Leo shines in communities and wants appreciation from peers. Virgo serves groups practically. Libra seeks fair, aesthetic collectives. Scorpio forms intense loyal squads with clear inner circles.",
        "Sagittarius joins international or ideological communities. Capricorn networks strategically. Aquarius on the cusp lives for collective vision. Pisces bonds through compassionate causes and artistic circles.",
        "Eleventh House cusp signs also describe the flavor of friendships you collect. Fire signs may lead friend groups; earth signs maintain them; air signs connect disparate circles; water signs emotionalize belonging.",
      ]),
      section("transits", "Transits Through the Eleventh House", [
        "Transits through the Eleventh House refresh friendships, group memberships, and long-term goals. Join, launch, fundraise, or reorganize community during supportive transits.",
        "Jupiter here expands networks—excellent for launches needing audience. Saturn prunes friendships to essentials and formalizes organizations. Uranus brings sudden allies or exits from misaligned groups.",
        "Eclipses on the Fifth–Eleventh axis balance personal joy with collective belonging. Venus sweetens social life; Mars motivates advocacy.",
        "Update your hopes list during these transits. The Eleventh House rewards articulated vision shared with the right people.",
        "Fundraising and launch timing often improve when benefics transit the Eleventh, but Saturn here teaches that the wrong audience cannot buy the right dream. Prune memberships before scaling outreach.",
      ]),
      section("synastry-relevance", "Eleventh House Synastry", [
        "Eleventh House synastry shows friendship within romance and shared social worlds.",
        "A partner's planets in your Eleventh House often feel like best-friend chemistry—you may meet through groups or build shared communities. Uranus here electrifies friendship; Saturn stabilizes long-term teamwork.",
        "Your planets in a partner's Eleventh show how you introduce them to networks or future dreams. Compare with Fifth House for romance versus camaraderie balance.",
        "Couples who thrive long-term often maintain Eleventh House rituals—mutual friends, shared causes, and visions beyond the household.",
        "If friendship dies while romance survives, check Eleventh House synastry and transits. Rebuilding shared community—classes, volunteering, hosting friends—often revives partnership breath more effectively than repeating the same private arguments.",
        "Political activism as a couple is high-voltage Eleventh House work. Align on tactics and rest periods so the relationship does not become only a campaign headquarters.",
        "Friend-group merges—two couples introducing circles—are delicate Eleventh House moments. Name expectations about privacy, group chat norms, and how you exit gracefully if chemistry fails.",
        "Online communities count. Moderating a forum or growing a newsletter list is Eleventh House labor when the goal is collective hope, not solo fame.",
      ]),
    ],
    faq: [
      {
        question: "What is the difference between Eleventh House friends and Seventh House partners?",
        answer:
          "The Seventh House describes one-to-one committed bonds and contracts. The Eleventh House describes peer networks, groups, and collective hopes. Lovers can be friends, but the houses emphasize different social scales.",
      },
      {
        question: "Does the Eleventh House rule social media?",
        answer:
          "Modern astrologers often connect online communities, platforms, and audience-building here because they scale belonging and shared ideals technologically.",
      },
      {
        question: "Can this house show activism?",
        answer:
          "Yes. Social causes, reform, and collective action align with Aquarian themes of justice and future-oriented change. Grassroots organizing and mutual aid often flourish when benefics transit the Eleventh or aspect its ruler.",
      },
      {
        question: "How does Uranus relate to this house?",
        answer:
          "Uranus rules Aquarius, the natural sign of the Eleventh House. Uranus themes—innovation, disruption, freedom—echo through friendships and group life here. Uranus transits can detach you from stale communities while introducing allies who fit your future more than your past.",
      },
      {
        question: "What if I feel lonely with an empty Eleventh House?",
        answer:
          "An empty house is common. Read the sign on the cusp and its ruler, then track transits. Belonging is often a practice of showing up in aligned communities, not a fixed chart sentence. Volunteering for causes you genuinely respect is a reliable way to activate Eleventh House promise without forcing fake popularity.",
      },
    ],
  },

  "twelfth-house": {
    description:
      "Enter the Twelfth House: spirituality, solitude, hidden matters, endings, dreams, and compassion. A deep guide to the House of the Unconscious in astrology.",
    sections: [
      section("life-area-overview", "What the Twelfth House Represents", [
        "The Twelfth House is the House of the Unconscious. It closes the wheel before the First House begins again. Its life area spans spirituality, solitude, hidden matters, endings, and compassion. Naturally associated with Pisces and Neptune, this house is mist and ocean—hard to chart, essential to soul. It governs what operates behind the scenes: dreams, retreats, institutions of seclusion, secret sorrows, and the grace that arrives when ego surrenders.",
        "Spirituality here is experiential—meditation, prayer, art as devotion, service without credit. Solitude is not loneliness when chosen; it is incubation. Hidden matters include confidential work, behind-the-camera roles, research in isolation, and truths you process before speaking.",
        "Endings belong to the Twelfth: hospice seasons, closures, forgiveness, and the quiet after the party. Compassion is the gift—seeing suffering without needing to fix it immediately. The shadow includes escapism, self-undoing, and martyrdom when boundaries dissolve unskillfully.",
        "Keywords like dreams, retreat, karma, healing, and transcendence invite humility. Studying this house helps you honor sensitivity without disappearing, and turn private depth into gentle public service when ready.",
        "Hospitals, monasteries, film sets, and research labs are literal Twelfth House environments—places where ego steps back so something larger can move through. Even if you work in a loud industry, you may need invisible hours to stay sane. Honoring that need is not failure; it is maintenance for charts with strong Twelfth House emphasis.",
        "Charitable giving and anonymous donation are Twelfth House expressions of compassion. So is volunteering where credit is not the point. The house teaches that some of the best work has no byline.",
      ]),
      section(
        "planets-in-house",
        "Planets in the Twelfth House",
        [
          "Planets in the Twelfth House often work indirectly. They may express through dreams, behind-the-scenes labor, spiritual practice, or periods of withdrawal that regenerate gifts.",
          "Neptune in the Twelfth House is potent in mystical territory. Artistic inspiration, spiritual sensitivity, and boundary challenges may cluster. The Moon here feels oceanic—psychic, tired in crowds, renewed in silence. Venus loves quietly and may romance in private or through art.",
          "Mercury thinks in symbols and may write in solitude. Mars fights inner battles and benefits from disciplined movement meditation. The Sun may fear invisibility yet shine in service roles without spotlight. Jupiter finds faith in retreat and may work in hospitals, monasteries, or studios.",
          "Saturn fears isolation yet masters contemplative discipline. Uranus brings sudden spiritual awakenings or nervous system need for unconventional retreat. Pluto transforms through shadow work and deep therapy.",
        ],
        "Example: Moon in the Twelfth House may need daily quiet to process emotion and may dream vividly enough to journal for creative insight."
      ),
      section("sign-on-cusp", "The Sign on the Twelfth House Cusp", [
        "The sign on the Twelfth House cusp colors how you withdraw, pray, and handle hidden material.",
        "Aries on the Twelfth fights private battles with courage yet needs solo movement to discharge anger. Taurus retreats into nature and sensory calm. Gemini processes through private writing or spiritual study.",
        "Cancer on the Twelfth needs emotional sanctuary. Leo creates secretly before performing. Virgo serves behind scenes with meticulous care. Libra seeks peaceful retreat aesthetics.",
        "Scorpio on the Twelfth dives into shadow work naturally. Sagittarius retreats to study philosophy abroad. Capricorn structures solitude disciplinedly. Aquarius needs odd sanctuaries. Pisces on the cusp dissolves into mysticism easily.",
        "Twelfth House cusp signs show how you exit the world when overwhelmed. Knowing your pattern—anger alone, cleaning, sleeping, scrolling, praying—lets you choose healthier retreats before disappearance becomes self-undoing.",
      ]),
      section("transits", "Transits Through the Twelfth House", [
        "Transits through the Twelfth House often feel inward. Energy may dip before renewal. Therapy, meditation retreats, creative solitude, and endings of outdated chapters accelerate.",
        "Saturn here demands honest solitude—strip unsustainable secrets and build spiritual discipline. Jupiter inspires faith and charitable giving. Neptune heightens dreams and requires grounding practices.",
        "Pluto transits excavate unconscious patterns. Uranus liberates from hidden cages—leaving institutions, breaking covert habits. Eclipses on the Sixth–Twelfth axis balance service with rest.",
        "Protect sleep and limit substances during heavy Twelfth House transits. The body speaks in symbols now.",
        "Creative retreats, artist residencies, and meditation intensives align with constructive Twelfth House timing. Schedule them before burnout forces institutional intervention—the house prefers chosen solitude over crisis hospitalization.",
      ]),
      section("synastry-relevance", "Twelfth House Synastry", [
        "Twelfth House synastry is subtle and profound. A partner's planets here may feel spiritual—or invasive if boundaries are weak.",
        "Neptune in a partner's Twelfth overlay can feel like soul recognition and may trigger savior fantasies. Saturn may stabilize hidden anxieties or feel like surveillance. Pluto intensifies psychic bonding and shadow projection.",
        "Your planets in a partner's Twelfth show how you affect their solitude and dreams. Compare with Sixth House for whether you heal or exhaust each other through service.",
        "Healthy Twelfth House contact includes respect for privacy, sleep, and individual spiritual practice—even in devoted partnership.",
        "Therapists and spiritual directors often appear as Twelfth House figures—people who witness hidden material without exploiting it. In synastry, treat that activation with extra ethical care.",
        "Sleep compatibility—schedules, light sensitivity, dream talk—belongs to Twelfth House synastry more than newcomers expect. Partners who protect each other's rest often survive harder transits than couples who only negotiate daytime logistics.",
      ]),
    ],
    faq: [
      {
        question: "Is the Twelfth House bad luck?",
        answer:
          "Traditional astrology called it a house of sorrow, but modern interpreters emphasize spirituality, creativity, and compassion. Challenges often involve boundaries and hidden stress, not punishment.",
      },
      {
        question: "What is self-undoing in the Twelfth House?",
        answer:
          "It refers to patterns that undermine you subtly—escapism, secrecy, martyrdom, or avoiding help. Awareness and support transform self-undoing into self-understanding.",
      },
      {
        question: "Does the Twelfth House rule dreams?",
        answer:
          "Yes. Dreams, symbols, and unconscious material are core themes. Many people track dreams actively when this house is emphasized or transited, using journals to turn night imagery into creative and therapeutic insight.",
      },
      {
        question: "How does Neptune relate to this house?",
        answer:
          "Neptune rules Pisces, the natural sign of the Twelfth House. Neptune themes—mysticism, dissolution, imagination—permeate solitude and transcendence here. Neptune transits may increase dream recall, artistic inspiration, and the need for grounding practices that keep compassion from becoming confusion.",
      },
      {
        question: "Can Twelfth House people succeed publicly?",
        answer:
          "Absolutely. They often succeed as artists, healers, researchers, or leaders who work behind the scenes first. Public success may require deliberate rest and boundary rituals. Many famous performers have strong Twelfth House emphasis—they simply recharge in private at higher intensity than the audience imagines.",
      },
    ],
  },
};

export function buildHousePillar(slug: HouseSlug): PillarArticle {
  const meta = HOUSE_META[slug];
  const content = HOUSE_CONTENT[slug];

  return {
    hub: "houses",
    slug: meta.slug,
    title: `${meta.name}: ${meta.alias}`,
    description: content.description,
    publishedAt: PUBLISHED_AT,
    updatedAt: UPDATED_AT,
    keywords: [...meta.keywords, meta.name.toLowerCase(), meta.alias.toLowerCase(), `house ${meta.number}`],
    sections: content.sections,
    faq: content.faq,
  };
}

export const HOUSE_PILLARS: PillarArticle[] = HOUSE_SLUGS.map(buildHousePillar);

export function getHousePillar(slug: string): PillarArticle | undefined {
  return HOUSE_PILLARS.find((pillar) => pillar.slug === slug);
}
