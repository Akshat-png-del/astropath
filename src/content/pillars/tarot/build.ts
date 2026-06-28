import type { PillarArticle, PillarFAQ, PillarSection } from "../types";
import { MAJOR_ARCANA } from "@/lib/tarot/major-arcana";
import type { MajorArcanaCard } from "@/lib/tarot/types";
import { tarotCardSlug, TAROT_CARD_SLUGS } from "./meta";

const PUBLISHED_AT = "2025-06-01";
const UPDATED_AT = "2025-06-28";

type SectionId =
  | "card-overview"
  | "upright-meaning"
  | "reversed-meaning"
  | "love-relationships"
  | "career-finances"
  | "spiritual-meaning";

interface CardContent {
  description: string;
  keywords: string[];
  sections: Record<SectionId, { paragraphs: string[]; example?: string }>;
  faq: PillarFAQ[];
}

const SECTION_META: { id: SectionId; heading: string }[] = [
  { id: "card-overview", heading: "Card Overview" },
  { id: "upright-meaning", heading: "Upright Meaning" },
  { id: "reversed-meaning", heading: "Reversed Meaning" },
  { id: "love-relationships", heading: "Love & Relationships" },
  { id: "career-finances", heading: "Career & Finances" },
  { id: "spiritual-meaning", heading: "Spiritual Meaning" },
];

const CARD_CONTENT: Record<string, CardContent> = {
  "the-fool": {
    description:
      "The Fool (0) marks the start of the Major Arcana — new beginnings, trust, and the leap into the unknown. Learn Rider-Waite symbolism, upright and reversed meanings, and how The Fool reads in love, career, and spiritual practice.",
    keywords: ["the fool tarot", "fool card meaning", "major arcana 0", "tarot new beginnings", "fool upright reversed"],
    sections: {
      "card-overview": {
        paragraphs: [
          "The Fool is numbered zero in the Rider-Waite-Smith tradition, placing it both before and after the entire Major Arcana cycle. Zero is the void of pure potential — unformed, unlimited, and untouched by experience. In Arthur Edward Waite's deck, a young traveler stands at a cliff edge, white rose in hand, small dog at his heels, possessions bundled on a stick over one shoulder. He looks upward, not down, embodying faith over foresight.",
          "The white rose symbolizes purity of intention; the small bag holds everything he thinks he needs, though he carries little. The white sun behind him suggests divine protection and optimism. The dog can represent loyal instinct warning of danger, or the faithful companion urging him forward — both readings appear in traditional teaching. The cliff reminds us that every beginning involves risk.",
          "As the first card of the Fool's Journey, this archetype opens the twenty-two-card spiritual narrative. The Magician, High Priestess, and cards that follow describe what the Fool encounters once he steps into the world. When The Fool appears in a reading, ask where innocence, curiosity, or a blank slate is active — and whether the querent is leaping wisely or avoiding preparation entirely.",
          "Numerologically, zero contains all numbers and none. It corresponds to Uranian themes of breakthrough and unpredictability in some astrological tarot correspondences. The Fool is not foolishness in the insulting sense; it is beginner's mind — the willingness to learn without pretending to already know the path.",
        ],
        example:
          "The Fool in the 'outcome' position after a job-change reading often signals a genuine fresh start rather than a repeat of old patterns — especially if paired with Ace of Pentacles or The World.",
      },
      "upright-meaning": {
        paragraphs: [
          "Upright, The Fool invites trust in the next step. A fresh start is near. Trust the step in front of you — not every detail. This is the card of spontaneous beginnings, adventure, and saying yes before the full map exists. It favors courage over cynicism and openness over rigid planning.",
          "In daily life, The Fool can describe travel, relocation, a new relationship, returning to school, or any situation where you are genuinely inexperienced and willing to learn. The energy is light, hopeful, and unburdened by past failure — at least for the moment.",
          "The upright Fool asks: what would you begin if you were not afraid of looking naive? It rewards authenticity and penalizes performative expertise. You do not need every credential before you start; you need honest intention and willingness to adapt.",
        ],
      },
      "reversed-meaning": {
        paragraphs: [
          "Reversed, The Fool warns of recklessness, avoidance, or fear disguised as caution. The leap may be impulsive without any grounding — quitting stability without a plan, trusting strangers too quickly, or ignoring the dog's bark at the cliff edge. Recklessness and naivety flip the card's gift into liability.",
          "Alternatively, reversal can show paralysis at the threshold: you know a new chapter wants to begin, but fear of embarrassment keeps you frozen. The reversed Fool sometimes appears when someone mocks beginner energy in themselves or others, blocking growth.",
          "When reversed, slow down and distinguish genuine new beginnings from escapism. Are you running toward something true or away from responsibility? A small, informed step beats a dramatic plunge or permanent hesitation.",
        ],
      },
      "love-relationships": {
        paragraphs: [
          "In love, upright The Fool signals new energy — a spark, a first date energy, or renewal within a long partnership that feels young again. New energy in love. Be open, but don't ignore red flags. The card favors openness, playfulness, and meeting someone without projecting an entire future on the first conversation.",
          "For singles, it can mean being ready to date differently after a hiatus, or meeting someone while traveling or outside your usual routine. For couples, it may describe a shared adventure or choosing to forgive the past and start a new chapter together.",
          "Reversed in love, watch for ignoring compatibility issues because chemistry feels exciting, or refusing to open your heart after healing is actually complete. The Fool asks for balanced openness — wonder with eyes open.",
        ],
      },
      "career-finances": {
        paragraphs: [
          "Career-wise, upright The Fool supports calculated leaps: freelance pivots, startups, creative projects, or entry-level roles in a field you love. A new path or opportunity is opening. Take a calculated leap. Investors and employers sometimes favor hungry beginners who learn fast over burned-out experts.",
          "Financially, it can mean living lightly while building something new — not necessarily poverty, but prioritizing growth over immediate security. Budget for the transition if you can; impulsive quitting without savings reads more reversed.",
          "Reversed, watch contracts you sign without reading, get-rich-quick schemes, or leaving stable income without a runway. The career Fool succeeds when enthusiasm meets a single concrete next step, not when it meets denial.",
        ],
      },
      "spiritual-meaning": {
        paragraphs: [
          "Spiritually, The Fool is the soul before the fall into density — or the mystic who retains childlike wonder after decades of practice. Many traditions associate this card with faith that the universe supports sincere seekers, even when teachings are incomplete.",
          "Meditation with The Fool can focus on the breath at the edge of the unknown: each inhale a new moment, each exhale releasing the need to control outcomes. The card appears frequently for people beginning tarot, astrology, or contemplative paths.",
          "On the Fool's Journey, this is departure from the ordinary world. Every later Major Arcana card will test and refine what begins here as raw trust. Returning to Fool consciousness in advanced practice means humility — admitting you do not know, so wisdom can enter.",
        ],
      },
    },
    faq: [
      {
        question: "Is The Fool a positive card?",
        answer:
          "Usually yes in the upright position — it signals opportunity, freedom, and new beginnings. It is not a guarantee of success without effort. Reversed, it cautions against recklessness or fear-based stagnation. Context from surrounding cards and question matters.",
      },
      {
        question: "Why is The Fool numbered zero?",
        answer:
          "Zero represents potential before manifestation — the unnumbered space from which all other cards emerge. Some decks place The Fool at the end (XXII) as completion returning to innocence. The Rider-Waite system uses zero to emphasize limitless beginnings.",
      },
      {
        question: "Does The Fool mean someone is foolish?",
        answer:
          "No. The name describes sacred innocence and willingness to begin, not stupidity. The archetype honors beginner's mind. Recklessness is a reversed shadow, not the card's core identity.",
      },
    ],
  },

  "the-magician": {
    description:
      "The Magician (I) channels will into manifestation — tools, focus, and conscious action. Explore Rider-Waite symbolism, Mercury correspondences, upright and reversed meanings, and readings for love, work, and spiritual practice.",
    keywords: ["the magician tarot", "magician card meaning", "major arcana 1", "tarot manifestation", "magician mercury"],
    sections: {
      "card-overview": {
        paragraphs: [
          "The Magician is Major Arcana I — the first numbered card after The Fool's unformed potential crystallizes into agency. In the Rider-Waite deck, a robed figure stands before a table bearing the four suit symbols: Wand, Cup, Sword, and Pentacle, representing Fire, Water, Air, and Earth. One hand points to heaven, one to earth, echoing the Hermetic axiom 'As above, so below.'",
          "Above his head floats a lemniscate — the infinity symbol — suggesting limitless creative power when will aligns with universal law. Red roses and white lilies appear in the garden behind him, symbolizing desire purified by wisdom. He wears white for purity of motive and red for passionate execution.",
          "The Magician corresponds to Mercury in many Golden Dawn correspondences: communication, skill, trickery, and intelligence. He is the conscious self that chooses how to deploy resources. Unlike The Fool's unconscious trust, The Magician knows he has tools and deliberately uses them.",
          "In the Fool's Journey, this is the moment the traveler discovers personal power — speech, emotion, intellect, and material craft. Every subsequent card will test whether that power is used wisely. When The Magician appears, examine what you can influence directly right now.",
        ],
        example:
          "The Magician as 'advice' in a creative block reading often means stop waiting for inspiration and start using the skills you already have — write badly, draft badly, then refine.",
      },
      "upright-meaning": {
        paragraphs: [
          "Upright, The Magician declares: you have the tools. Focus your will and act with intention. Resources, talent, and opportunity are present; the missing ingredient is focused application. This is one of tarot's clearest 'make it happen' cards.",
          "It favors presentations, negotiations, launches, and any situation requiring clear communication of value. The Magician does not wait for permission. He demonstrates capability. Confidence here is earned through preparation, not empty bravado.",
          "The card also asks about integrity: are you manifesting truth or manipulation? Upright energy is transparent power — the con artist is typically reversed or accompanied by shadow cards.",
        ],
      },
      "reversed-meaning": {
        paragraphs: [
          "Reversed, The Magician warns of scattered energy, unused talent, or manipulation. You may have all the tools on the table but lack focus — starting ten projects, mastering none. Imposter syndrome that blocks action is a common reversed theme.",
          "Darker reversals include deceit, gaslighting, or selling something you cannot deliver. The Mercurial shadow is the trickster who confuses eloquence with substance. Ask whether you or someone nearby is all presentation, no substance.",
          "Healing the reversal means choosing one channel for your will, practicing honestly, and aligning words with actions. Reconnect skill to service rather than image.",
        ],
      },
      "love-relationships": {
        paragraphs: [
          "In love, upright The Magician says you can shape this relationship — speak clearly about what you want. Communication is magnetic; charm is high. For singles, it favors putting yourself out there with clarity — dating apps, introductions, direct expression of interest.",
          "In established relationships, it supports honest conversations about needs, initiating repair, or consciously co-creating the next phase. The Magician builds connection through words and deliberate gesture, not passive hoping.",
          "Reversed, watch mixed messages, manipulation, or someone who says everything right but follows through inconsistently. It can also mean you are hiding your true intentions from a partner or yourself.",
        ],
      },
      "career-finances": {
        paragraphs: [
          "Career-wise, upright The Magician is excellent for interviews, pitches, sales, teaching, and entrepreneurship. Your skills are enough. Stop waiting for permission. Show what you can do with what you already possess.",
          "Financially, it supports earning through communication, craft, and initiative — side hustles, freelance work, or negotiating better terms. Money follows demonstrated value under this card.",
          "Reversed, beware contracts with hidden clauses, overselling your capabilities, or failing to invoice for work completed. Talent without follow-through leaves money on the table.",
        ],
      },
      "spiritual-meaning": {
        paragraphs: [
          "Spiritually, The Magician is the practitioner at the altar — ritual as focused intention. Magic in tarot terms is not supernatural override; it is aligning inner will with outer action until reality shifts.",
          "Meditation can focus on the four elements within: grounding (Earth), feeling (Water), thinking (Air), and willing (Fire). The Magician asks which element you overuse and which you neglect.",
          "On the mystical path, this card often appears when students are ready to move from passive learning to active practice — casting first circles, keeping first journals, speaking first prayers with full attention.",
        ],
      },
    },
    faq: [
      {
        question: "What planet is associated with The Magician?",
        answer:
          "Mercury is the most common correspondence in Golden Dawn and Rider-Waite tradition — linking the card to communication, intellect, and skillful action. Some readers also emphasize solar aspects of conscious will.",
      },
      {
        question: "Is The Magician the same as a witch or wizard?",
        answer:
          "The archetype shares DNA with the mage or ceremonial practitioner, but in tarot it broadly means anyone who consciously directs energy and resources. You do not need to practice magic to embody this card — teachers, founders, and healers often carry Magician energy.",
      },
      {
        question: "What do the four tools on the table mean?",
        answer:
          "They represent the four suits and elements: Wands (Fire), Cups (Water), Swords (Air), Pentacles (Earth). Together they show that manifestation requires balancing passion, emotion, thought, and material action.",
      },
    ],
  },

  "the-high-priestess": {
    description:
      "The High Priestess (II) guards intuition, mystery, and the subconscious. Learn lunar symbolism, Rider-Waite imagery, upright and reversed meanings, and how this card reads in love, career, and inner work.",
    keywords: ["high priestess tarot", "priestess card meaning", "major arcana 2", "tarot intuition", "high priestess moon"],
    sections: {
      "card-overview": {
        paragraphs: [
          "The High Priestess is Major Arcana II — the guardian of what is hidden, felt, and not yet spoken. She sits between two pillars marked B and J (Boaz and Jachin from Solomon's Temple), a veil of pomegranates behind her, the crescent moon at her feet, Torah scroll partly visible in her robes.",
          "In Rider-Waite symbolism, she is still water reflecting deep knowing. The black and white pillars represent duality — conscious and unconscious, seen and unseen — and she mediates between them without choosing sides rashly. The pomegranates on the veil echo Persephone's underworld wisdom: knowledge that requires descent.",
          "She corresponds to the Moon in many systems — cycles, dreams, intuition, and the tidal pull of emotion beneath rational surfaces. Where The Magician acts outward, The High Priestess receives inward. She does not rush to announce what she knows.",
          "Numerologically, two is polarity, reflection, and the inner pair. The High Priestess asks you to listen before speaking, to observe patterns before intervening. In spreads, she often marks secrets, pregnancy (literal or metaphorical), spiritual study, or timing that is not yet ripe.",
        ],
        example:
          "The High Priestess in the 'hidden influences' position often points to information the querent senses but has not confirmed — trust the gut while gathering facts.",
      },
      "upright-meaning": {
        paragraphs: [
          "Upright, The High Priestess says: listen inward. Not everything should be rushed or announced. Patience, silence, and intuitive discernment are favored. Answers may come in dreams, synchronicities, or quiet knowing rather than loud external validation.",
          "This card supports research, therapy, spiritual study, and any phase requiring observation over action. The High Priestess holds confidence without performance. She knows without needing to prove.",
          "Practically, delay major announcements until inner clarity solidifies. Some knowledge is sacred and premature sharing dissipates its power.",
        ],
      },
      "reversed-meaning": {
        paragraphs: [
          "Reversed, The High Priestess can indicate ignored intuition, surface-level living, or secrets turning toxic. You may be outsourcing authority to noisy opinions while dismissing your inner voice. Alternatively, hidden information may be distorting a situation — what is concealed is harming rather than protecting.",
          "Another reversed theme is passivity mistaken for wisdom: never acting, never speaking, never leaving the veil because 'the time is not right' when it passed long ago.",
          "Healing requires honest inner dialogue — journaling, therapy, meditation — and willingness to name what you already know beneath denial.",
        ],
      },
      "love-relationships": {
        paragraphs: [
          "In love, upright The High Priestess emphasizes depth over display. Your gut about this person matters more than mixed signals. Attraction may be psychic or soul-level; words may lag behind knowing. The card favors slow revelation and emotional privacy early on.",
          "For established couples, it can mean unspoken understanding, spiritual connection, or a period where less talking and more listening heals distance. Not everything needs to be analyzed aloud.",
          "Reversed, secrets in love — affairs, undisclosed feelings, or ignoring red flags because intuition is suppressed — are common themes. Trust actions over charming words.",
        ],
      },
      "career-finances": {
        paragraphs: [
          "Career-wise, upright The High Priestess advises holding plans close until the right moment. Research competitors quietly, develop skills privately, and avoid premature launches. Roles in counseling, research, archives, or spiritual guidance fit this energy.",
          "Financially, it favors conservative moves and listening to subtle market intuitions — but verify hunches with data before large commitments. Hidden expenses may exist; read fine print.",
          "Reversed, office politics, undisclosed agendas, or ignoring professional instincts can destabilize work. Something important is not being said in meetings.",
        ],
      },
      "spiritual-meaning": {
        paragraphs: [
          "Spiritually, The High Priestess is the inner temple — direct gnosis without intermediary. She appears for mystics, dream workers, and anyone deepening relationship with the unconscious.",
          "Practice includes moon journaling, dream recording, and silent sitting. The scroll in her lap suggests esoteric study whose meaning unfolds over years, not weekends.",
          "She teaches that the veil is not a wall but a membrane — cross it with respect, not force. Some mysteries reveal only to those who stop demanding immediate answers.",
        ],
      },
    },
    faq: [
      {
        question: "Is The High Priestess a yes or no card?",
        answer:
          "Traditionally maybe — the answer exists but is not yet visible or ready to be acted upon. Upright often means 'wait and listen'; reversed may mean hidden factors are blocking a clear yes.",
      },
      {
        question: "What is the difference between The High Priestess and The Empress?",
        answer:
          "The High Priestess is inward mystery, intuition, and unmanifest potential. The Empress is outward abundance, creation, and embodied nurture. One guards the seed in darkness; one grows the garden in light.",
      },
      {
        question: "Does The High Priestess mean someone is keeping secrets?",
        answer:
          "It can — upright may mean sacred privacy or information not yet ripe to share. Reversed more strongly suggests concealment that harms, or secrets you are avoiding within yourself.",
      },
    ],
  },

  "the-empress": {
    description:
      "The Empress (III) embodies abundance, creativity, and nurturing growth. Explore Venus symbolism, Rider-Waite fertility imagery, upright and reversed meanings, and readings for love, career, and spiritual practice.",
    keywords: ["the empress tarot", "empress card meaning", "major arcana 3", "tarot abundance", "empress venus"],
    sections: {
      "card-overview": {
        paragraphs: [
          "The Empress is Major Arcana III — the archetype of fertile creation, sensory beauty, and maternal abundance. In Rider-Waite art she reclines on cushions in a lush wheat field, crown of twelve stars on her head, Venus symbol on her heart-shaped shield, waterfall and forest behind her. She is nature embodied: generous, sensual, and unhurried.",
          "The number three in tarot often means synthesis and expression — the Empress takes the Magician's will and Priestess's intuition and grows them into tangible life. Wheat suggests harvest; her gown's pomegranates echo the Priestess's veil, linking hidden wisdom to visible fruit.",
          "Astrologically she corresponds to Venus — love, art, pleasure, and attraction. Unlike the Emperor's structure, she rules through nurture. Crops grow in their season; forcing rarely works under her gaze.",
          "When The Empress appears, examine what you are growing — a child, a business, a body of work, a relationship — and whether it receives enough water, rest, and sunlight to thrive.",
          "Her twelve-star crown links her to celestial rhythm and the zodiacal year — abundance is not accidental but seasonal. Readers tracing the Fool's Journey see her as the first experience of unconditional nurture after the Magician's skill and Priestess's mystery: life that feeds itself when tended patiently.",
        ],
        example:
          "The Empress in a home-focused reading often signals beautifying space, pregnancy, or a creative project finally bearing visible results.",
      },
      "upright-meaning": {
        paragraphs: [
          "Upright, The Empress promises growth, nurture, and patience bringing results. Conditions favor creativity, comfort, and expansion through care rather than force. This is harvest energy when prior work has been steady.",
          "The card supports self-care as strategy, not luxury. You cannot pour from an empty cup; the Empress refills through beauty, rest, and connection to the body.",
          "Socially, she favors hospitality, collaboration, and environments where people feel safe enough to create. Harsh criticism and sterile conditions wither her gifts.",
          "Growth, nurture, and patience bring results — the card's keyword abundance is earned through steady tending, not lottery luck. In yes-or-no questions, Empress upright leans yes when the question involves cultivation, creativity, or healing timelines that respect natural pace.",
        ],
      },
      "reversed-meaning": {
        paragraphs: [
          "Reversed, The Empress warns of neglect — of self, dependents, or projects. Smothering control can also appear: love that suffocates rather than nourishes. Creative blocks often trace to depleted bodies or overgiving without boundaries.",
          "Financial or domestic instability may disrupt growth. Reversed can also indicate dependency — waiting for someone else to provide abundance you must cultivate internally.",
          "Restore small rituals of pleasure and practical care: sleep, food, nature, creative play. Abundance returns when the soil is tended.",
          "Reversed Empress can also signal creative projects aborted before maturity, or environments so chaotic that nothing roots. Ask whether you are starving the garden while demanding fruit.",
        ],
      },
      "love-relationships": {
        paragraphs: [
          "In love, upright The Empress says love flourishes when you care for yourself first. Romance deepens through affection, physical warmth, and emotional safety. For singles, it attracts through embodied confidence and genuine warmth, not performance.",
          "Fertility and family themes are traditional — pregnancy, commitment to building home, or deepening intimacy. The card favors expressing love through acts of care.",
          "Reversed, codependency, jealousy, or emotional starvation may appear. One partner may give endlessly while resenting unmet needs.",
          "In synastry-heavy questions, Empress energy asks whether the bond feels nourishing after six months, not only exciting for six weeks. Sensual compatibility matters, but so does whether love makes both people more alive.",
        ],
      },
      "career-finances": {
        paragraphs: [
          "Career-wise, upright The Empress supports creative industries, hospitality, design, healing arts, and any role involving cultivation over extraction. Creative or steady effort pays off soon.",
          "Financially, it favors organic growth — investments that mature, side income from creative work, improving quality of life. Spend on what genuinely nourishes long-term wellbeing.",
          "Reversed, undervaluing creative labor or burning out from overwork without compensation undermines prosperity.",
          "Teams under Empress energy produce best when deadlines allow craft — rushing a creative Empress project often yields shallow results that fail in market.",
        ],
      },
      "spiritual-meaning": {
        paragraphs: [
          "Spiritually, The Empress is the immanent divine in nature — sacred femininity, earth-based practice, and honoring cycles. She appears when devotion wants to move from temple to garden.",
          "Meditation in green spaces, altar work with flowers and fruit, and gratitude for the body are Empress practices. Creation itself is prayer.",
          "She teaches that spirit is not only transcendent escape but embodied presence — pleasure and holiness intertwined when approached with reverence.",
          "Goddess traditions map her to Venus, Demeter, and Freya — different faces of fertile love. Working with Empress archetype means honoring menstrual, seasonal, and creative cycles rather than overriding them with hustle.",
        ],
      },
    },
    faq: [
      {
        question: "Does The Empress always mean pregnancy?",
        answer:
          "No. It can indicate literal pregnancy, but more often it symbolizes fertility of any kind — creative projects, business growth, or emotional ripeness. Context and question guide the reading.",
      },
      {
        question: "What planet rules The Empress?",
        answer:
          "Venus is the standard correspondence, linking the card to love, beauty, harmony, and material comfort.",
      },
      {
        question: "How is The Empress different from The Emperor?",
        answer:
          "The Empress nurtures and grows through organic abundance; The Emperor structures and protects through order and authority. Together they represent complementary creative and stabilizing forces.",
      },
    ],
  },

  "the-emperor": {
    description:
      "The Emperor (IV) represents structure, authority, and disciplined leadership. Learn Aries symbolism, Rider-Waite throne imagery, upright and reversed meanings, and how this card reads in love, career, and spiritual life.",
    keywords: ["the emperor tarot", "emperor card meaning", "major arcana 4", "tarot authority", "emperor aries"],
    sections: {
      "card-overview": {
        paragraphs: [
          "The Emperor is Major Arcana IV — archetype of order, sovereignty, and protective structure. In Rider-Waite art he sits on a stone throne adorned with ram heads (Aries), holding an ankh scepter and orb, red robes over armor, barren mountains behind him contrasting the Empress's fertile valley.",
          "Four is stability, foundation, and material manifestation. Where the Empress flows, the Emperor defines borders. His kingdom is built on rules that keep chaos at bay — laws, schedules, boundaries, and clear chains of command.",
          "Aries correspondence brings initiative, martial courage, and sometimes rigidity. The Emperor is father figure, CEO, architect, and strategist. He is not cruel by nature; cruelty is shadow when structure becomes domination.",
          "In the Fool's Journey, this is the first external authority the Fool meets — the lesson that freedom requires containers. When The Emperor appears, ask where structure would help rather than hinder.",
        ],
        example:
          "The Emperor as 'advice' after chaotic conflict often means set one clear boundary and enforce it calmly — not more emotional debate.",
      },
      "upright-meaning": {
        paragraphs: [
          "Upright, The Emperor says set boundaries. Order creates calm. Take leadership, make decisions, and build systems others can rely on. This card favors discipline over improvisation when stakes are high.",
          "It supports legal matters, contracts, long-term planning, and stepping into authority you have earned. Fatherhood, mentorship, and protective roles resonate.",
          "The upright Emperor leads by example — reliable, present, and fair within stated rules. Flexibility exists inside structure, not despite it.",
        ],
      },
      "reversed-meaning": {
        paragraphs: [
          "Reversed, The Emperor warns of tyranny, rigidity, or abdicated responsibility. Micromanagement, emotional coldness, or control disguised as protection are common shadows. Alternatively, lack of structure — refusing to decide, lead, or parent appropriately.",
          "Rebellion against unhealthy authority may be necessary when reversed. Ask whether you are chafing against legitimate boundaries or illegitimate control.",
          "Healing means proportional structure: enough order for safety, enough humanity for growth.",
        ],
      },
      "love-relationships": {
        paragraphs: [
          "In love, upright The Emperor wants clarity and respect — not guessing games. Commitment, reliability, and explicit agreements strengthen bonds. For singles, it may attract stable partners or signal readiness for serious partnership.",
          "Traditional gender roles can appear symbolically — not as prescription, but as questions about who provides structure and how power is shared.",
          "Reversed, emotional unavailability, controlling behavior, or refusal to define the relationship creates friction.",
        ],
      },
      "career-finances": {
        paragraphs: [
          "Career-wise, upright The Emperor excels in management, law, military, engineering, and executive leadership. Lead with discipline. Structure beats chaos.",
          "Financially, it favors budgets, savings plans, and conservative protection of assets. Build foundations before speculative leaps.",
          "Reversed, toxic bosses, bureaucratic paralysis, or refusing to document agreements hurts professional and financial stability.",
        ],
      },
      "spiritual-meaning": {
        paragraphs: [
          "Spiritually, The Emperor is sacred order — ritual at fixed hours, ethical codes, and disciplined practice. Mysticism without grounding can scatter; he provides the container.",
          "He also asks whether your spiritual community has healthy authority or charismatic abuse. Structure should protect seekers, not exploit them.",
          "Integration pairs Emperor boundaries with Empress compassion — firm spine, open heart.",
        ],
      },
    },
    faq: [
      {
        question: "Is The Emperor a negative card in love?",
        answer:
          "Not inherently. Upright it favors commitment, clarity, and reliability. It becomes difficult when reversed into control, coldness, or emotional withholding.",
      },
      {
        question: "What zodiac sign is linked to The Emperor?",
        answer:
          "Aries is the most common correspondence in Golden Dawn tradition, reflected in the ram heads on his throne — initiative, leadership, and martial energy.",
      },
      {
        question: "Emperor vs Empress in a reading?",
        answer:
          "Together they often represent partnership dynamics, parents, or balancing nurture with structure. Alone, each asks whether you need more of their quality in the situation.",
      },
    ],
  },

  "the-hierophant": {
    description:
      "The Hierophant (V) represents tradition, spiritual teaching, and institutional wisdom. Explore Taurus symbolism, Rider-Waite ritual imagery, and meanings for love, career, and inner growth.",
    keywords: ["the hierophant tarot", "hierophant card meaning", "major arcana 5", "tarot tradition", "hierophant taurus"],
    sections: {
      "card-overview": {
        paragraphs: [
          "The Hierophant is Major Arcana V — keeper of tradition, ritual, and transmitted wisdom. In Rider-Waite art he sits between two pillars like the High Priestess, but his space is public: two acolytes kneel before him, triple crown on his head, papal cross staff in hand, keys of heaven at his feet.",
          "He is the outward teacher where the High Priestess is inward oracle. Churches, schools, initiatory orders, and cultural customs fall under his domain. The number five introduces conflict and mediation — he resolves chaos through shared belief and established rite.",
          "Taurus correspondence grounds spiritual teaching in embodied, repeatable practice — chant, pilgrimage, seasonal festival. Not all tradition is oppression; much is memory encoded for survival.",
          "When The Hierophant appears, ask whether you need a mentor, a proven method, or honest examination of beliefs inherited without questioning.",
        ],
        example:
          "The Hierophant beside the Two of Pentacles may suggest formal training or certification as the stabilizing choice amid options.",
      },
      "upright-meaning": {
        paragraphs: [
          "Upright, The Hierophant says wisdom comes from proven paths and honest guidance. Seek teachers, read foundational texts, honor ceremonies that connect you to lineage. Conventional solutions may work better than experimental ones now.",
          "Marriage, ordination, graduation, and formal agreements are favored. Community support through shared values strengthens outcomes.",
          "The card does not demand blind conformity — it asks whether you have learned from those who walked before you before reinventing wheels.",
        ],
      },
      "reversed-meaning": {
        paragraphs: [
          "Reversed, The Hierophant signals dogma, hypocrisy, or rebellion against hollow institutions. Rules without compassion, gurus without integrity, or staying in traditions that no longer fit.",
          "Alternatively, refusing all guidance out of pride — lone-wolf spirituality that lacks grounding. The reversal asks: what belief must be updated?",
          "Healthy response may be leaving toxic structures while retaining genuine wisdom they carried.",
        ],
      },
      "love-relationships": {
        paragraphs: [
          "In love, upright The Hierophant often indicates marriage, meeting through community or family, or aligning values before deepening commitment. Old patterns may repeat — name them and choose differently.",
          "Shared spiritual or cultural background may matter now. For some, parental approval or traditional milestones surface.",
          "Reversed, pressure to conform, staying for appearance, or rejecting commitment because of past religious hurt are common themes.",
        ],
      },
      "career-finances": {
        paragraphs: [
          "Career-wise, upright The Hierophant favors academia, counseling with credentials, institutions, and apprenticeship. A mentor or established method can help now.",
          "Financially, conventional instruments — insurance, pensions, trusted advisors — may suit better than exotic schemes.",
          "Reversed, workplace politics dressed as morality, or credentialism blocking capable people.",
        ],
      },
      "spiritual-meaning": {
        paragraphs: [
          "Spiritually, The Hierophant is the bridge between human and divine through ritual form. He appears when students need lineage, initiation, or return to practice abandoned in chaos.",
          "Study sacred texts with teachers who encourage questions. Ritual repetition trains attention; it is not lesser than spontaneous mysticism.",
          "Reversed invites discernment: keep the essence, release the performance that lost soul.",
        ],
      },
    },
    faq: [
      {
        question: "Is The Hierophant only about religion?",
        answer:
          "No. It represents any established system transmitting values — universities, professional guilds, cultural customs, and mentorship traditions included.",
      },
      {
        question: "Hierophant vs High Priestess?",
        answer:
          "The Hierophant teaches publicly through doctrine and ritual; the High Priestess knows privately through intuition and mystery. External scripture versus inner gnosis.",
      },
      {
        question: "Does reversed Hierophant mean leave my church?",
        answer:
          "Not always. It can mean question harmful dogma, find teachers who live their ethics, or develop personal practice alongside — or instead of — failing institutions.",
      },
    ],
  },

  "the-lovers": {
    description:
      "The Lovers (VI) symbolize choice, alignment, and sacred partnership. Learn Gemini symbolism, Rider-Waite Adam and Eve imagery, and upright and reversed meanings for love, career, and spiritual path.",
    keywords: ["the lovers tarot", "lovers card meaning", "major arcana 6", "tarot relationships", "lovers gemini"],
    sections: {
      "card-overview": {
        paragraphs: [
          "The Lovers is Major Arcana VI — card of choice, union, and values made visible. Rider-Waite depicts a naked man and woman beneath an angel (Raphael in Waite's symbolism), Tree of Knowledge with serpent behind the woman, Tree of Life behind the man, mountain of ascent between them.",
          "This is not only romance — it is ethical alignment. The angel blesses conscious choice. Six is harmony and negotiation: two become three when something new emerges from commitment.",
          "Gemini correspondence adds duality, communication, and the fork in the road. The Lovers asks which version of yourself you marry through daily decisions.",
          "In the Fool's Journey, this is the first profound bond — whether with partner, vocation, or value system. When it appears, name the real choice, not just the fantasy.",
        ],
        example:
          "The Lovers in 'career' position often means choosing between two paths that reflect different identities — not which pays more alone.",
      },
      "upright-meaning": {
        paragraphs: [
          "Upright, The Lovers announces a real choice in front of you — align with your values. Genuine connection outweighs superficial attraction. Integrity in decision-making brings peace even when options are hard.",
          "Partnerships of all kinds strengthen when both parties choose openly. Transparency and mutual respect are themes.",
          "The card can also indicate integration of inner opposites — anima and animus, logic and feeling — within one person.",
        ],
      },
      "reversed-meaning": {
        paragraphs: [
          "Reversed, The Lovers warns of misalignment, temptation, or avoiding choice. Affairs, dishonesty, or staying split between options drains energy. Indecision becomes its own decision.",
          "Values conflict — saying you want one thing while acting for another. Relationship inequality or incompatible life goals may surface.",
          "Healing requires honest conversation and willingness to lose illusions.",
        ],
      },
      "love-relationships": {
        paragraphs: [
          "In love, upright The Lovers is among the strongest cards for soulmate chemistry, marriage, and deep compatibility — this is about genuine connection, not just attraction. Vulnerability and truth deepen bonds.",
          "For singles, meaningful encounter is likely when you show up authentically. For couples, recommitment or resolving a pivotal fork.",
          "Reversed, third-party situations, fear of commitment, or love based on image over substance.",
        ],
      },
      "career-finances": {
        paragraphs: [
          "Career-wise, upright The Lovers means two paths are open. Pick what fits who you are. Partnerships and co-founders can succeed with shared vision.",
          "Financial decisions tied to ethics — whose money, what compromises — need scrutiny. Align income with values for lasting satisfaction.",
          "Reversed, split loyalties between employers or selling out core principles for profit.",
        ],
      },
      "spiritual-meaning": {
        paragraphs: [
          "Spiritually, The Lovers is sacred marriage — union of soul with source, or conscious integration of shadow and light. Tantric and mystical traditions see earthly love as mirror of divine union.",
          "Meditation on heart alignment: does your daily life reflect what you claim to believe?",
          "The angel above reminds that blessed choice requires awareness, not sleepwalking.",
        ],
      },
    },
    faq: [
      {
        question: "Do The Lovers always mean romance?",
        answer:
          "No. They often indicate important choices, value alignment, and partnership generally — business allies, creative collaborators, or internal integration included.",
      },
      {
        question: "What do the two trees represent?",
        answer:
          "In Rider-Waite symbolism, the Tree of Knowledge (with serpent) and Tree of Life represent experiential wisdom and divine pattern — temptation and blessing integrated through conscious choice.",
      },
      {
        question: "Is this a good card for marriage?",
        answer:
          "Upright, yes — it favors authentic union and mutual choosing. Reversed suggests unresolved conflicts or misalignment that should be addressed before vows.",
      },
    ],
  },

  "the-chariot": {
    description:
      "The Chariot (VII) drives forward through willpower, focus, and reconciled opposites. Explore Cancer symbolism, Rider-Waite sphinx imagery, and meanings for love, career, and spiritual victory.",
    keywords: ["the chariot tarot", "chariot card meaning", "major arcana 7", "tarot determination", "chariot cancer"],
    sections: {
      "card-overview": {
        paragraphs: [
          "The Chariot is Major Arcana VII — triumph through focused will. The charioteer stands in a starry canopy chariot pulled by black and white sphinxes (or horses in older decks), city behind him, armor beneath royal robes, crescent moons on shoulders, laurel and wand symbols of victory.",
          "He holds no reins — control is mental and spiritual. Opposing forces (sphinxes, conscious/unconscious, heart/mind) must pull together or the chariot veers. Seven is spiritual victory and mastery through trial.",
          "Cancer correspondence adds protective drive, emotional fuel, and movement homeward or toward security. The Chariot wins battles, completes journeys, and asserts direction.",
          "After The Lovers' choice comes The Chariot's commitment to move. When it appears, success requires undivided focus.",
        ],
        example:
          "The Chariot as outcome after exam or competition prep strongly favors victory when effort has been consistent.",
      },
      "upright-meaning": {
        paragraphs: [
          "Upright, The Chariot says stay focused. Momentum is on your side if you commit. Push through resistance with disciplined confidence. Travel, relocation, and conquering obstacles are favored.",
          "Emotional self-control channels power — not suppression, but steering feeling toward goal. Victory comes through focus, not scattered effort.",
          "Assert boundaries against distractions. This is a green light for forward motion after decision.",
        ],
      },
      "reversed-meaning": {
        paragraphs: [
          "Reversed, The Chariot warns of lost direction, aggression without strategy, or forces pulling apart. Road rage, career burnout, or relationship pursuit that ignores reciprocity.",
          "Alternatively, fear of success that brakes just before the finish line. Ask what opposes your advance internally.",
          "Pause to realign motives before accelerating again.",
        ],
      },
      "love-relationships": {
        paragraphs: [
          "In love, upright The Chariot favors pursuit with clarity — declaring interest, long-distance closure, or fighting for relationship repair when both want it. Mixed signals won't fix themselves — be direct.",
          "Passion and determination attract; arrogance repels. Balance chase with listening.",
          "Reversed, one-sided pursuit, control battles, or emotional volatility derailing intimacy.",
        ],
      },
      "career-finances": {
        paragraphs: [
          "Career-wise, upright The Chariot supports promotions, launches, sales targets, and competitive wins. Push through resistance. Victory comes through focus.",
          "Financially, aggressive saving or debt payoff plans succeed with discipline. Travel for work may feature.",
          "Reversed, reckless spending to prove status, or projects without steering.",
        ],
      },
      "spiritual-meaning": {
        paragraphs: [
          "Spiritually, The Chariot is the will aligned with divine purpose — yoga of disciplined practice, pilgrimage, or integrating shadow drives without being ruled by them.",
          "The sphinxes teach that enlightenment requires both instinct and intellect harnessed to one aim.",
          "Victory here is ego in service of soul, not ego triumphant over others.",
        ],
      },
    },
    faq: [
      {
        question: "Why are there no reins on The Chariot?",
        answer:
          "Waite emphasized mastery through will and alignment rather than brute force. The charioteer controls opposing energies mentally — a metaphor for inner discipline.",
      },
      {
        question: "Is The Chariot a travel card?",
        answer:
          "Often yes — literal travel, relocation, or metaphorical journey toward a goal. Upright movement is favored.",
      },
      {
        question: "What sign corresponds to The Chariot?",
        answer:
          "Cancer in Golden Dawn correspondences — protective drive, emotional motivation, and tenacious forward movement.",
      },
    ],
  },

  strength: {
    description:
      "Strength (VIII) embodies quiet courage, compassion, and mastery over instinct. Learn Leo symbolism, Rider-Waite lion imagery, and upright and reversed meanings for love, career, and spiritual growth.",
    keywords: ["strength tarot", "strength card meaning", "major arcana 8", "tarot courage", "strength leo"],
    sections: {
      "card-overview": {
        paragraphs: [
          "Strength is Major Arcana VIII — though numbered eight, it traditionally follows The Chariot as inner victory over outer conquest. A woman in white robes gently closes a lion's jaws, infinity symbol above her head, garland of flowers around her waist and in her hair.",
          "This is not domination but taming through love — Hercules reworked as compassionate power. The lion represents id, anger, sexuality, and raw fear. She meets it without armor, suggesting vulnerability as strength.",
          "Leo correspondence links solar courage, heart-centered leadership, and creative fire regulated by kindness. Eight is strength, karma, and endurance — power accumulated through patience.",
          "When Strength appears, the task is emotional regulation and moral bravery, not louder force.",
        ],
        example:
          "Strength in conflict readings advises calm firmness — naming truth without attacking character.",
      },
      "upright-meaning": {
        paragraphs: [
          "Upright, Strength promises gentle persistence beats force. Courage, patience, and compassion overcome obstacles brute aggression cannot. Self-mastery and confidence without arrogance.",
          "Influence through warmth wins loyalty. Animals, children, and volatile situations respond to steady presence.",
          "The card favors long-term resilience — keep going quietly; resilience is noticed.",
        ],
      },
      "reversed-meaning": {
        paragraphs: [
          "Reversed, Strength warns of self-doubt, suppressed anger exploding sideways, or cruelty mistaken for toughness. Bullying, anxiety, or addiction to adrenaline undermine true power.",
          "Alternatively, weakness disguised as niceness — avoiding necessary confrontation. Compassion without boundaries enables harm.",
          "Rebuild inner strength through small acts of courage and somatic regulation.",
        ],
      },
      "love-relationships": {
        paragraphs: [
          "In love, upright Strength favors honest, calm courage — speaking needs without drama, forgiving without forgetting patterns. Passionate bonds tempered by patience deepen trust.",
          "For turbulent relationships, regulated emotion heals what shouting cannot.",
          "Reversed, jealousy, passive aggression, or staying where fear of loneliness outweighs self-respect.",
        ],
      },
      "career-finances": {
        paragraphs: [
          "Career-wise, upright Strength suits leadership through mentorship, healthcare, advocacy, and any role requiring grace under pressure. Keep going quietly — resilience is noticed.",
          "Financially, steady discipline outperforms risky grabs. Negotiate firmly but fairly.",
          "Reversed, imposter syndrome blocking promotion, or workplace intimidation.",
        ],
      },
      "spiritual-meaning": {
        paragraphs: [
          "Spiritually, Strength is the soul gentling the beast of ego — meditation on heart, loving-kindness practice, and facing inner shadows without exile.",
          "Many traditions place this virtue above miraculous power. The infinity crown suggests divine strength flowing through human softness.",
          "True spiritual authority whispers; it does not roar.",
        ],
      },
    },
    faq: [
      {
        question: "Strength vs The Chariot — what is the difference?",
        answer:
          "The Chariot wins through directed will and external movement. Strength wins through inner calm and compassionate control of instinct. Outer battle versus inner mastery.",
      },
      {
        question: "Why is Strength numbered VIII but placed after VII?",
        answer:
          "Historical deck ordering varies; Rider-Waite follows Strength as VIII after The Chariot VII, emphasizing that outer victory must become inner integration.",
      },
      {
        question: "What zodiac sign matches Strength?",
        answer:
          "Leo — solar heart, creative fire, and noble courage expressed through warmth rather than domination.",
      },
    ],
  },

  "the-hermit": {
    description:
      "The Hermit (IX) illuminates truth through solitude, reflection, and inner guidance. Explore Virgo symbolism, Rider-Waite lantern imagery, and meanings for love, career, and spiritual seeking.",
    keywords: ["the hermit tarot", "hermit card meaning", "major arcana 9", "tarot solitude", "hermit virgo"],
    sections: {
      "card-overview": {
        paragraphs: [
          "The Hermit is Major Arcana IX — the wise elder who walks alone with a lantern containing a six-pointed star, staff in hand, mountain peak behind him, gray cloak hiding all but his face. He has withdrawn from society not from hatred but to see clearly.",
          "Nine is completion of a cycle before the decimal turn — introspection before Wheel of Fortune's external shift. The lantern lights only the next step, not the entire path. Inner truth precedes public action.",
          "Virgo correspondence brings discernment, service, and analytical refinement. The Hermit sifts experience for meaning. He may be literal mentor, therapist, or your own need for silence.",
          "When The Hermit appears, the answer is not in more noise. Step back. Solitude brings the answer.",
        ],
        example:
          "The Hermit in 'advice' during burnout almost always means reduce commitments and recover perspective before deciding.",
      },
      "upright-meaning": {
        paragraphs: [
          "Upright, The Hermit counsels pause, study, and soul-searching. Withdraw temporarily to gain wisdom. Mentors appear or you become mentor through earned experience.",
          "Quality over quantity in relationships and projects. Night hours, journals, and retreats favor insight.",
          "Not loneliness — chosen solitude with purpose.",
        ],
      },
      "reversed-meaning": {
        paragraphs: [
          "Reversed, The Hermit warns of isolation that became avoidance, bitterness, or refusing help. Hiding from intimacy, feedback, or medical advice.",
          "Alternatively, superficial busyness blocking reflection. You cannot hear the lantern if you never stop moving.",
          "Balance solitude with re-entry — wisdom unshared rots.",
        ],
      },
      "love-relationships": {
        paragraphs: [
          "In love, upright The Hermit may indicate needing space within partnership, dating hiatus for self-knowledge, or attraction to someone older or spiritually mature. Alone time isn't rejection — it's clarity.",
          "For singles, slow courtship and depth over swiping volume.",
          "Reversed, emotional unavailability, ghosting, or using 'I need space' to avoid accountability.",
        ],
      },
      "career-finances": {
        paragraphs: [
          "Career-wise, upright The Hermit favors research roles, writing sabbaticals, specialized expertise, and pause before the next big move. Deep work beats networking spam.",
          "Financially, conservative holding pattern — audit accounts, plan quietly, avoid flashy moves.",
          "Reversed, career stagnation from fear, or refusing mentorship that would accelerate growth.",
        ],
      },
      "spiritual-meaning": {
        paragraphs: [
          "Spiritually, The Hermit is the contemplative path — desert fathers, mountain monks, and midnight meditation. The star in the lantern is inner divinity guiding outward steps.",
          "Retreats, pilgrimages alone, and prolonged study of one tradition deepen under this card.",
          "He teaches that enlightenment is often lonely before it is shareable.",
        ],
      },
    },
    faq: [
      {
        question: "Is The Hermit a bad sign for relationships?",
        answer:
          "Not necessarily. It often means timing for depth, healing alone, or space within healthy bonds. Reversed isolation or avoidance is the warning.",
      },
      {
        question: "What does the lantern symbolize?",
        answer:
          "Inner truth illuminating one step at a time — intuition refined by experience, not blazing certainty about the entire future.",
      },
      {
        question: "Which zodiac sign links to The Hermit?",
        answer:
          "Virgo is the common correspondence — analysis, service, and purification through discernment.",
      },
    ],
  },

  "wheel-of-fortune": {
    description:
      "Wheel of Fortune (X) marks cycles, destiny, and turning points beyond personal control. Learn Jupiter symbolism, Rider-Waite wheel imagery, and readings for love, career, and spiritual trust.",
    keywords: ["wheel of fortune tarot", "wheel card meaning", "major arcana 10", "tarot cycles", "wheel jupiter"],
    sections: {
      "card-overview": {
        paragraphs: [
          "Wheel of Fortune is Major Arcana X — the great cycle that lifts and lowers without moral judgment in the moment. Rider-Waite shows a wheel inscribed with TARO/ROTA, alchemical symbols, sphinx atop, descending serpent, Anubis rising, and winged creatures in corners reading books.",
          "Ten is completion of numeric root (1+0=1) — return to beginning at higher turn. What rises must fall; what falls will rise. Jupiter correspondence expands luck, faith, and philosophical meaning in change.",
          "This card is famously neutral in tone — good or bad depends on position in cycle and surrounding cards. It announces motion, not direction alone.",
          "Life is turning. This phase won't last forever. When it appears, notice where you are on the wheel and prepare for shift.",
        ],
        example:
          "Wheel of Fortune after a long stagnation spread often marks the first unmistakable turn — job offer, breakup, or sudden opportunity.",
      },
      "upright-meaning": {
        paragraphs: [
          "Upright, Wheel of Fortune brings change, synchronicity, and destiny in motion. Luck tilts — sometimes favorably, sometimes challenging but necessary. Adaptability wins.",
          "Karmic patterns surface: consequences arrive, blessings return. Accept impermanence.",
          "Timing is moving. Watch for an opening door.",
        ],
      },
      "reversed-meaning": {
        paragraphs: [
          "Reversed, the Wheel warns of bad luck streaks, resisting inevitable change, or repeating cycles unconsciously. Same lesson, new costume.",
          "Feeling stuck at bottom — but even reversed, the wheel still turns, slowly. Victim mentality blocks seeing agency within pattern.",
          "Journal recurring themes to break loops.",
        ],
      },
      "love-relationships": {
        paragraphs: [
          "In love, upright Wheel means luck in love can shift — meet-cute, reconciliation, or fated feeling encounters. Stay open to change. Relationships evolve phases quickly.",
          "Karmic connections — intense, familiar, sometimes repetitive — are common.",
          "Reversed, on-again-off-again patterns, bad timing, or clinging when the cycle demands release.",
        ],
      },
      "career-finances": {
        paragraphs: [
          "Career-wise, upright Wheel signals promotions, layoffs, industry shifts, or lottery-like opportunities. External forces matter; agility matters more.",
          "Financial windfalls or losses possible — diversify and avoid gambling hubris when upright looks generous.",
          "Reversed, missed timing, economic headwinds, or refusing to pivot skills.",
        ],
      },
      "spiritual-meaning": {
        paragraphs: [
          "Spiritually, Wheel of Fortune teaches trust in cosmic timing — bhavacakra, fate, and grace. Humility at the top, hope at the bottom.",
          "Meditation on impermanence reduces suffering when seasons change.",
          "You are not only the rider on the wheel but also the still center watching it spin.",
        ],
      },
    },
    faq: [
      {
        question: "Is Wheel of Fortune always good luck?",
        answer:
          "No. It means change and cyclical movement. Context determines whether the turn feels fortunate. It always means 'pay attention — status quo is shifting.'",
      },
      {
        question: "What planet is linked to the Wheel?",
        answer:
          "Jupiter — expansion, fortune, faith, and the larger pattern behind events.",
      },
      {
        question: "What does ROTA on the wheel mean?",
        answer:
          "ROTA is Latin for wheel; TARO references tarot itself. The letters rotate, suggesting cycles and hidden order in change.",
      },
    ],
  },

  justice: {
    description:
      "Justice (XI) demands truth, fairness, and accountability. Explore Libra symbolism, Rider-Waite scales imagery, and upright and reversed meanings for love, career, and spiritual integrity.",
    keywords: ["justice tarot", "justice card meaning", "major arcana 11", "tarot balance", "justice libra"],
    sections: {
      "card-overview": {
        paragraphs: [
          "Justice is Major Arcana XI — in Rider-Waite, a crowned figure seated between pillars, scales in left hand, upright sword in right, purple veil behind. She faces the viewer directly — truth without hiding.",
          "The sword cuts illusion; scales weigh evidence. Unlike Judgement's soul-calling, Justice is earthly fairness: contracts, courts, karma's bookkeeping. Eleven reduces to two — duality judged with clarity.",
          "Libra correspondence emphasizes partnership equilibrium, aesthetics of fairness, and diplomatic honesty. Actions have consequences; Justice ensures they are seen.",
          "Truth and fairness matter. Act with integrity. When this card appears, account for your side of the ledger.",
        ],
        example:
          "Justice in legal matters upright strongly favors honest presentation of facts and equitable outcomes.",
      },
      "upright-meaning": {
        paragraphs: [
          "Upright, Justice favors truth, legal victory when deserved, and ethical decisions. Cause and effect are transparent. Own your part; expect others to own theirs.",
          "Documentation, contracts, and impartial third parties help. Decisions should be reasoned, not vengeful.",
          "Balance is not automatic — it is chosen through honest reckoning.",
        ],
      },
      "reversed-meaning": {
        paragraphs: [
          "Reversed, Justice warns of bias, dishonesty, unfair outcomes, or avoiding accountability. Legal complications, self-righteousness, or scales tipped by prejudice.",
          "You may be judged harshly for others' crimes or leniently when conscience knows otherwise.",
          "Restore integrity before seeking external vindication.",
        ],
      },
      "love-relationships": {
        paragraphs: [
          "In love, upright Justice asks are you giving and receiving equally? Fair fights, clear agreements, and divorce settlements done ethically appear. Relationship decisions based on truth, not fantasy.",
          "Marriage contracts, prenups, or defining fairness in parenting.",
          "Reversed, scorekeeping, lies, or staying where imbalance is chronic.",
        ],
      },
      "career-finances": {
        paragraphs: [
          "Career-wise, upright Justice suits law, compliance, HR investigations, and performance reviews. Contracts, decisions, and facts surface now.",
          "Financial audits, tax matters, and equitable splits favor honesty.",
          "Reversed, fraud exposure, biased management, or signing unfair deals.",
        ],
      },
      "spiritual-meaning": {
        paragraphs: [
          "Spiritually, Justice is karma — not punishment fantasy but precise alignment between action and result. Meditation on right speech and right action.",
          "Ritual confession or amends restores inner scales.",
          "Divine justice may delay but rarely forgets; human justice requires your participation.",
        ],
      },
    },
    faq: [
      {
        question: "Does Justice mean someone will go to court?",
        answer:
          "It can indicate legal themes, but more broadly it means accountability, contracts, and fair resolution. Not every reading is literal litigation.",
      },
      {
        question: "Justice vs Judgement — how do they differ?",
        answer:
          "Justice weighs earthly truth and fairness; Judgement calls spiritual awakening and redemption. One is courtroom; one is resurrection.",
      },
      {
        question: "What sign corresponds to Justice?",
        answer:
          "Libra — balance, partnership, diplomacy, and aesthetic sense of what is fair.",
      },
    ],
  },

  "the-hanged-man": {
    description:
      "The Hanged Man (XII) surrenders control for new perspective and sacred pause. Learn Neptune symbolism, Rider-Waite suspension imagery, and meanings for love, career, and spiritual surrender.",
    keywords: ["the hanged man tarot", "hanged man meaning", "major arcana 12", "tarot surrender", "hanged man neptune"],
    sections: {
      "card-overview": {
        paragraphs: [
          "The Hanged Man is Major Arcana XII — a man hangs upside down from a living T-shaped tree, one leg crossed behind the other forming a four, halo around his head, serene expression. He is not punished; he volunteers for reversal.",
          "Twelve completes a zodiacal year — sacrifice before rebirth. Neptune correspondence dissolves ego, blurs boundaries, and opens mystical perception. Stop forcing. A new angle will appear.",
          "The crossed leg creates a triangle with the trunk — some read this as uniting spirit and matter through voluntary stillness. Blood rushes to the head; sight changes literally and metaphorically.",
          "When The Hanged Man appears, progress may look like pause. Waiting hurts, but pushing won't help either.",
        ],
        example:
          "The Hanged Man blocking an 'action' column means the useful move is observation, not another email.",
      },
      "upright-meaning": {
        paragraphs: [
          "Upright, The Hanged Man counsels surrender, patience, and reframing. Let go of timeline obsession. Insight arrives when striving stops.",
          "Sacrifice of short-term comfort for long-term wisdom. Spiritual initiation through limbo.",
          "Delay isn't denial — use the pause wisely.",
        ],
      },
      "reversed-meaning": {
        paragraphs: [
          "Reversed, The Hanged Man warns of martyrdom, stagnation, or refusing to act when the pause has taught its lesson. Playing victim or endless procrastination dressed as spirituality.",
          "Alternatively, fighting surrender when release is required — white-knuckling a dead situation.",
          "Discern productive waiting from fear masquerading as patience.",
        ],
      },
      "love-relationships": {
        paragraphs: [
          "In love, upright Hanged Man may mean waiting for clarity, long-distance limbo, or seeing partner from new angle. Waiting hurts, but pushing won't help either.",
          "Sacrifice themes — putting career on hold, delaying intimacy until healing — need mutual consent.",
          "Reversed, one-sided sacrifice, staying suspended in undefined situationship, or refusing to leave when love is over.",
        ],
      },
      "career-finances": {
        paragraphs: [
          "Career-wise, upright Hanged Man indicates project delays, sabbaticals, or strategic non-action. Delay isn't denial — use the pause wisely.",
          "Financial holding pattern — do not force investments; review assumptions upside down.",
          "Reversed, missed deadlines from inertia, or quitting without plan.",
        ],
      },
      "spiritual-meaning": {
        paragraphs: [
          "Spiritually, The Hanged Man is Odin on Yggdrasil, Christ imagery echoes, and voluntary ego death. Mystical truths invert normal priorities.",
          "Hanging meditation — literally lying with feet elevated — can embody the card.",
          "Wisdom purchased by surrender is retained longer than wisdom bought by force.",
        ],
      },
    },
    faq: [
      {
        question: "Is The Hanged Man a negative card?",
        answer:
          "It looks alarming but often means productive pause and perspective shift. Reversed stagnation or martyrdom is more troubling than upright voluntary stillness.",
      },
      {
        question: "Why does he look peaceful while hanging?",
        answer:
          "He chooses suspension for insight — the halo marks spiritual illumination through reversal, not torture.",
      },
      {
        question: "What planet links to The Hanged Man?",
        answer:
          "Neptune — dissolution, sacrifice, dreams, and transcendence of ordinary viewpoint.",
      },
    ],
  },

  death: {
    description:
      "Death (XIII) transforms through endings that clear space for rebirth. Explore Scorpio symbolism, Rider-Waite skeleton imagery, and upright and reversed meanings for love, career, and spiritual metamorphosis.",
    keywords: ["death tarot", "death card meaning", "major arcana 13", "tarot transformation", "death scorpio"],
    sections: {
      "card-overview": {
        paragraphs: [
          "Death is Major Arcana XIII — among tarot's most misunderstood cards. Rider-Waite shows a skeleton knight in black armor carrying a flag with a white rose, bishop pleading, maiden fallen, king trampled, sun setting between twin towers. Transformation spares no rank.",
          "Thirteen frightens superstition, but in tarot it means necessary ending. Scorpio correspondence rules decay, regeneration, sex, and merged depths. What dies fertilizes what follows.",
          "The white rose on the banner is beauty born of compost. The river in background flows to renewal. Death is not the enemy of life but its gardener.",
          "An ending clears space for something truer. Rarely literal death — ask what chapter must close.",
        ],
        example:
          "Death with Ace of Cups often means emotional rebirth after grief — new love or healing after closure.",
      },
      "upright-meaning": {
        paragraphs: [
          "Upright, Death announces transformation, closure, and irreversible change. Grief may accompany, but clinging prolongs pain. Release identity tied to what ended.",
          "Physical decluttering, quitting habits, ending jobs or relationships — clean cuts heal faster than rot.",
          "Let an old pattern die so real growth can begin.",
        ],
      },
      "reversed-meaning": {
        paragraphs: [
          "Reversed, Death warns of resisting necessary endings, zombie situations, or fear of change paralyzing life. Near-death transformations refused.",
          "Stagnant decay instead of swift transition. The lesson repeats louder.",
          "Ask what you are afraid to bury that is already dead.",
        ],
      },
      "love-relationships": {
        paragraphs: [
          "In love, upright Death may mean breakup, profound transformation of bond, or shedding toxic dynamic for healthier relating. Let an old pattern die so real love can grow.",
          "Sometimes the relationship survives but the old version must go.",
          "Reversed, staying past expiration, on-again cycles without change, or fear of being alone blocking honest ending.",
        ],
      },
      "career-finances": {
        paragraphs: [
          "Career-wise, upright Death supports leaving roles, industry pivots, and shutting failed ventures. Close one chapter to start a better one.",
          "Financially, cutting losses, debt elimination, estate matters, or inheritance.",
          "Reversed, throwing good money after bad, or refusing to update skills in dying field.",
        ],
      },
      "spiritual-meaning": {
        paragraphs: [
          "Spiritually, Death is ego annihilation before mystical rebirth — dark night, initiation, compost mysticism.",
          "Rituals of release — burning lists, funeral for old self — honor the card.",
          "Every spiritual path includes dying before you die — releasing attachment while alive.",
        ],
      },
    },
    faq: [
      {
        question: "Does the Death card predict physical death?",
        answer:
          "Very rarely in modern practice. It almost always means metaphorical endings and transformation. Surrounding cards and context matter for literal interpretations.",
      },
      {
        question: "Why is Death numbered thirteen?",
        answer:
          "Thirteen follows twelve's completion, signaling threshold beyond ordinary cycles — taboo transformation and regeneration in Scorpio territory.",
      },
      {
        question: "Is Death positive or negative?",
        answer:
          "Neutral but intense. Endings hurt yet enable growth. Upright honest closure is healthier than reversed stagnation.",
      },
    ],
  },

  temperance: {
    description:
      "Temperance (XIV) blends opposites with patience, healing, and measured harmony. Learn Sagittarius symbolism, Rider-Waite angel imagery, and readings for love, career, and spiritual alchemy.",
    keywords: ["temperance tarot", "temperance card meaning", "major arcana 14", "tarot balance", "temperance sagittarius"],
    sections: {
      "card-overview": {
        paragraphs: [
          "Temperance is Major Arcana XIV — an angel with one foot on land, one in water, pours liquid between two cups in impossible flow. Iris flowers grow nearby; path leads to crown of light between mountains. Sun on forehead, triangle on chest.",
          "Fourteen reduces to five (1+4) — change mediated by harmony. Sagittarius correspondence seeks higher meaning through integration, travel between worlds, and faith in gradual progress.",
          "Alchemical mixing is literal art: combine unlike elements patiently until third substance emerges. Balance and patience heal what force cannot.",
          "After Death's severing comes Temperance's gentle recombination. When it appears, moderation and trust in process win.",
        ],
        example:
          "Temperance after conflict cards suggests reconciliation through steady small gestures, not one dramatic apology.",
      },
      "upright-meaning": {
        paragraphs: [
          "Upright, Temperance promises healing, cooperation, and middle paths. Blend patience with action. Long-term recovery — physical, emotional, financial — proceeds steadily.",
          "Creative synthesis, teamwork, and spiritual practice requiring daily rhythm.",
          "Slow and steady wins — avoid extremes.",
        ],
      },
      "reversed-meaning": {
        paragraphs: [
          "Reversed, Temperance warns of excess, impatience, discord, or incompatible mixing. All-or-nothing swings, substance issues, or teams that cannot cooperate.",
          "Forced unity without honest difference creates resentment.",
          "Recalibrate pace — neither flood nor drought.",
        ],
      },
      "love-relationships": {
        paragraphs: [
          "In love, upright Temperance favors stable deepening, healing after conflict, and partners who complement without cloning. Slow and steady wins — avoid extremes.",
          "Long-distance or cross-cultural bonds harmonized over time.",
          "Reversed, mismatched libidos, values, or lifestyles no amount of patience fixes without change.",
        ],
      },
      "career-finances": {
        paragraphs: [
          "Career-wise, upright Temperance supports mediation, healthcare, blending roles, and gradual career pivots. Blend patience with action.",
          "Financially, balanced portfolios, moderate saving, and avoiding speculative extremes.",
          "Reversed, workplace friction, burnout from overwork without rest.",
        ],
      },
      "spiritual-meaning": {
        paragraphs: [
          "Spiritually, Temperance is the alchemist's grace — daily practice integrating body and spirit, shadow and light.",
          "Pouring between cups models prayer as exchange with divine until distinction softens.",
          "Patience is not passive; it is sustained attention.",
        ],
      },
    },
    faq: [
      {
        question: "What does the angel pouring water mean?",
        answer:
          "Alchemical blending — mixing conscious and unconscious, material and spiritual, until harmonious third state emerges. Flow between cups defies gravity, suggesting grace.",
      },
      {
        question: "Temperance vs Justice?",
        answer:
          "Justice weighs and decides; Temperance mixes and heals over time. One is verdict; one is infusion.",
      },
      {
        question: "Which sign matches Temperance?",
        answer:
          "Sagittarius — questing wisdom, optimism, and integration of diverse experiences into meaning.",
      },
    ],
  },

  "the-devil": {
    description:
      "The Devil (XV) exposes bondage, attachment, and shadow patterns that feel inescapable until named. Learn Capricorn symbolism, Rider-Waite chain imagery, and meanings for love, career, and spiritual liberation.",
    keywords: ["the devil tarot", "devil card meaning", "major arcana 15", "tarot attachment", "devil capricorn"],
    sections: {
      "card-overview": {
        paragraphs: [
          "The Devil is Major Arcana XV — a horned Baphomet figure on a black pedestal, naked man and woman chained loosely with horns and tails sprouting, inverted pentagram above, torch burning on his hand. Chains are loose enough to remove; captivity is partly consent.",
          "Fifteen reduces to six (1+5) — Lovers' choice distorted into addiction. Capricorn correspondence links material ambition, status fear, and rigid control. Name what's holding you — habit, fear, or control.",
          "This card is shadow work, not demonic omen. Sexuality, money shame, substance patterns, and toxic power dynamics live here. The Devil shows the cage so you can see the door.",
          "When it appears, honesty about compulsion matters more than spiritual bypassing.",
        ],
        example:
          "The Devil beside Seven of Swords may indicate deceptive arrangement you could leave but fear losing comfort.",
      },
      "upright-meaning": {
        paragraphs: [
          "Upright, The Devil highlights bondage to habit, materialism, or unhealthy dynamics. Awareness is first step to freedom. Temptation is strong; willpower alone may fail without support.",
          "Passion without ethics, greed, obsession, and gaslighting environments.",
          "Ask what payoff you receive from staying stuck — secondary gains often maintain chains.",
        ],
      },
      "reversed-meaning": {
        paragraphs: [
          "Reversed, The Devil signals breaking free, exposing lies, or deeper entanglement if denial persists. Recovery begins; or shadow swallowed whole.",
          "Releasing debt, leaving abusive situation, or confronting addiction.",
          "Freedom requires naming the devil — precise language, not vague guilt.",
        ],
      },
      "love-relationships": {
        paragraphs: [
          "In love, upright Devil asks is this love or dependency? Jealousy, control, trauma bonds, and staying for sex or security over compatibility. Chemistry can mask exploitation.",
          "Kink or intense passion is not automatically Devil — coercion and shame are the warning signs.",
          "Reversed, liberation from toxic ex, seeing manipulation clearly, or rebuilding self-worth after codependency.",
        ],
      },
      "career-finances": {
        paragraphs: [
          "Career-wise, upright Devil warns golden handcuffs, unethical industries, or power harassment. Money fear may be driving bad choices.",
          "Financial debt traps, gambling, or lifestyle inflation enslaving you to work you hate.",
          "Reversed, leaving exploitative job, debt payoff plan working, or refusing corrupt deal.",
        ],
      },
      "spiritual-meaning": {
        paragraphs: [
          "Spiritually, The Devil is unintegrated shadow — projected evil out there instead of owned within. Every tradition has tempter archetype teaching discernment.",
          "Rituals of release, sponsorship in recovery, and brutal honesty break his grip.",
          "Chains loosen when you stop negotiating with what diminishes soul.",
        ],
      },
    },
    faq: [
      {
        question: "Is The Devil card dangerous to pull?",
        answer:
          "No card is dangerous — The Devil highlights uncomfortable truths about attachment and control. It invites liberation through awareness, not fear.",
      },
      {
        question: "Why are the chains loose?",
        answer:
          "Waite emphasized that bondage is often psychological and voluntary at some level — you can remove chains when you see them clearly.",
      },
      {
        question: "What sign links to The Devil?",
        answer:
          "Capricorn — ambition, material structure, and shadow side of worldly achievement and control.",
      },
    ],
  },

  "the-tower": {
    description:
      "The Tower (XVI) shatters false structures through sudden upheaval and revelatory lightning. Explore Mars symbolism, Rider-Waite destruction imagery, and readings for love, career, and spiritual awakening.",
    keywords: ["the tower tarot", "tower card meaning", "major arcana 16", "tarot upheaval", "tower mars"],
    sections: {
      "card-overview": {
        paragraphs: [
          "The Tower is Major Arcana XVI — lightning strikes a crown tower, flames bursting, figures falling headlong, Yod-shaped lightning bolts, twenty-two drops of fire. What was built on false premise cannot stand when truth strikes.",
          "Sixteen reduces to seven (1+6) — Chariot's victory overturned by higher force. Mars correspondence brings explosive energy, war, and surgical removal of disease. A shake-up clears what wasn't built on truth.",
          "The crown flying symbolizes ego dethroned. The Tower is terrifying and liberating — earthquake clears land for honest foundation.",
          "Unexpected change is scary but necessary. When it appears, brace for revelation, not gentle tweak.",
        ],
        example:
          "The Tower as outcome after hiding infidelity in earlier positions often means discovery and forced reckoning.",
      },
      "upright-meaning": {
        paragraphs: [
          "Upright, The Tower announces sudden disruption, scandal, natural disaster metaphor, or belief collapse. Structures — jobs, marriages, identities — that ignored cracks fall at once.",
          "Painful clarity beats prolonged illusion. Lightning illuminates then burns.",
          "Sudden truth can hurt — but it frees you.",
        ],
      },
      "reversed-meaning": {
        paragraphs: [
          "Reversed, The Tower may mean averting disaster at last second, internalizing upheaval, or prolonging inevitable collapse through denial. Smaller repeated crises instead of one big purge.",
          "Fear of change delaying necessary demolition.",
          "Controlled teardown beats catastrophic failure — act before lightning chooses for you.",
        ],
      },
      "love-relationships": {
        paragraphs: [
          "In love, upright Tower can mean breakup, affair exposure, or fight that changes relationship forever. Sudden truth can hurt — but it frees you.",
          "Foundations built on lies cannot survive this card upright.",
          "Reversed, patching without addressing structural issues, or disaster narrowly avoided if honesty arrives now.",
        ],
      },
      "career-finances": {
        paragraphs: [
          "Career-wise, upright Tower signals layoffs, company collapse, whistleblowing, or abrupt industry disruption. Unexpected change is scary but necessary.",
          "Financially, market crashes, uninsured losses, or sudden expenses forcing rebuild.",
          "Reversed, delayed layoff, quiet restructuring, or preparing emergency fund before shock.",
        ],
      },
      "spiritual-meaning": {
        paragraphs: [
          "Spiritually, The Tower is kundalini crisis, dark night destroying false self-image, and lightning enlightenment that cannot be unseen.",
          "Sacred disasters humble pride — mystics speak of necessary ruin.",
          "After ashes, build with truth stones only.",
        ],
      },
    },
    faq: [
      {
        question: "Is The Tower always bad?",
        answer:
          "It is painful but often necessary — removing what was unstable or dishonest. Many readers call it tough love from the universe.",
      },
      {
        question: "What does the crown falling mean?",
        answer:
          "Ego, pride, and false authority toppled — institutions or personal identities that claimed unearned permanence.",
      },
      {
        question: "What planet corresponds to The Tower?",
        answer:
          "Mars — sudden force, conflict, and catalytic destruction clearing path for rebuild.",
      },
    ],
  },

  "the-star": {
    description:
      "The Star (XVII) restores hope, healing, and quiet faith after devastation. Learn Aquarius symbolism, Rider-Waite naked pourer imagery, and meanings for love, career, and spiritual renewal.",
    keywords: ["the star tarot", "star card meaning", "major arcana 17", "tarot hope", "star aquarius"],
    sections: {
      "card-overview": {
        paragraphs: [
          "The Star is Major Arcana XVII — a naked woman kneels pouring water onto land and pool, one foot in water, large eight-pointed star above with seven smaller stars, ibis in tree (Thoth reference), distant hills. Calm follows Tower's storm.",
          "Seventeen reduces to eight (1+7) — Strength's inner power now expressed as vulnerable openness. Aquarius correspondence brings humanitarian vision, future orientation, and eccentric healing paths.",
          "Nudity here is purity, not exhibition — nothing to hide after Tower stripped pretense. Healing and renewal are real. Keep faith.",
          "When The Star appears, recovery is underway even if slow.",
        ],
        example:
          "The Star after Tower in timeline spreads marks recovery phase — often months of gentle rebuilding.",
      },
      "upright-meaning": {
        paragraphs: [
          "Upright, The Star promises hope, inspiration, and spiritual renewal. Wounds receive balm. Creative and emotional channels reopen.",
          "Wish fulfillment possible with patience — not lottery, but aligned longing.",
          "Recognition and calm progress are building.",
        ],
      },
      "reversed-meaning": {
        paragraphs: [
          "Reversed, The Star warns of despair, disconnection from purpose, or cynicism blocking healing. Faith wound unaddressed.",
          "Creative drought, pessimism, or refusing help offered.",
          "Hope returns in small doses — collect evidence of goodness daily.",
        ],
      },
      "love-relationships": {
        paragraphs: [
          "In love, upright Star means healing after heartbreak, honest vulnerable intimacy, and hope in love is justified — stay open. Soulmate energy soft and spiritual.",
          "Reconciliation possible when both choose authenticity.",
          "Reversed, inability to trust after betrayal, or idealizing unavailable people.",
        ],
      },
      "career-finances": {
        paragraphs: [
          "Career-wise, upright Star favors creative careers, public recognition after struggle, and aligned vocation. Recognition and calm progress are building.",
          "Financial recovery, charitable giving, and long-term investing in meaningful work.",
          "Reversed, undervaluing talents, or losing vision in grind.",
        ],
      },
      "spiritual-meaning": {
        paragraphs: [
          "Spiritually, The Star is grace after ordeal — baptism, starseed clichés aside, it is renewed trust in benevolent cosmos.",
          "Night sky meditation, pouring offerings, and art as prayer suit this card.",
          "You are both healer and healed when water flows both directions.",
        ],
      },
    },
    faq: [
      {
        question: "Star vs Sun — what is the difference?",
        answer:
          "The Star is quiet nighttime hope and healing after trauma. The Sun is bright daytime clarity and joy. Star whispers; Sun shouts.",
      },
      {
        question: "Is The Star a wish card?",
        answer:
          "Traditionally yes — it supports heartfelt intentions manifesting through patience and aligned action, not passive waiting.",
      },
      {
        question: "What sign links to The Star?",
        answer:
          "Aquarius — vision, humanitarian ideals, and unconventional healing.",
      },
    ],
  },

  "the-moon": {
    description:
      "The Moon (XVIII) navigates illusion, dreams, and the uncertain path through subconscious fear. Explore Pisces symbolism, Rider-Waite wolf imagery, and readings for love, career, and spiritual mystery.",
    keywords: ["the moon tarot", "moon card meaning", "major arcana 18", "tarot illusion", "moon pisces"],
    sections: {
      "card-overview": {
        paragraphs: [
          "The Moon is Major Arcana XVIII — a full moon and crescent between towers, dog and wolf howling, crayfish emerging from pool, winding path leading into mountains. Everything is reflected, distorted, doubled.",
          "Eighteen reduces to nine (1+8) — Hermit's solitude now haunted by imagination. Pisces correspondence rules dreams, mysticism, confusion, and compassion. Not everything is clear yet. Go slowly.",
          "This card is famous for anxiety, deception, and psychic sensitivity. The path is real but visibility is poor. Trust actions over appearances.",
          "When The Moon appears, verify before committing. Illusions or secrets may be involved.",
        ],
        example:
          "The Moon in 'their feelings' position suggests mixed signals — trust patterns over words.",
      },
      "upright-meaning": {
        paragraphs: [
          "Upright, The Moon warns of uncertainty, dreams, fears, and possible deception. Intuition is heightened but unreliable without grounding — paranoia and genuine insight blur.",
          "Creativity and spiritual visions flourish; contracts and diagnoses need second opinions.",
          "Don't sign or decide until the fog lifts.",
        ],
      },
      "reversed-meaning": {
        paragraphs: [
          "Reversed, The Moon can mean secrets surfacing, mental fog lifting, or delusion deepening. Nightmares named lose power; or confusion becomes psychosis if ignored.",
          "Gaslighting exposed, or finally seeing situation clearly.",
          "Journal dreams; distinguish fear fantasy from data.",
        ],
      },
      "love-relationships": {
        paragraphs: [
          "In love, upright Moon means ambiguity, hidden feelings, or projection. Illusions or secrets may be involved — trust actions. Attraction with red flags obscured by fantasy.",
          "Deep psychic connection possible — so is self-deception.",
          "Reversed, lies revealed, clarity after confusion, or leaving manipulative bond.",
        ],
      },
      "career-finances": {
        paragraphs: [
          "Career-wise, upright Moon cautions unclear job descriptions, office rumors, and creative fields with unstable income. Don't sign or decide until the fog lifts.",
          "Financial scams, unclear terms, or anxiety-driven choices.",
          "Reversed, fraud discovered, or contract terms clarified.",
        ],
      },
      "spiritual-meaning": {
        paragraphs: [
          "Spiritually, The Moon is the dark mystery path — lunar rituals, dreamwork, and facing ancestral fear. Not all spirits are benevolent; discernment required.",
          "Meditation on fear itself — naming monsters reduces their size.",
          "Mystery schools placed this trial before solar clarity of The Sun.",
        ],
      },
    },
    faq: [
      {
        question: "Is The Moon a bad omen?",
        answer:
          "It warns of confusion and possible deception, not doom. Slow down, verify, and ground intuition. Many creative breakthroughs happen under Moon energy.",
      },
      {
        question: "What do the dog and wolf represent?",
        answer:
          "Tamed instinct versus wild fear — both howl at the moon. Anxiety and loyalty may be indistinguishable in fog.",
      },
      {
        question: "What sign corresponds to The Moon?",
        answer:
          "Pisces — dreams, dissolution, compassion, and boundary blur.",
      },
    ],
  },

  "the-sun": {
    description:
      "The Sun (XIX) radiates joy, clarity, vitality, and honest success. Learn Sun symbolism, Rider-Waite child imagery, and upright and reversed meanings for love, career, and spiritual illumination.",
    keywords: ["the sun tarot", "sun card meaning", "major arcana 19", "tarot joy", "sun tarot astrology"],
    sections: {
      "card-overview": {
        paragraphs: [
          "The Sun is Major Arcana XIX — a naked child rides a white horse beneath a huge sunflower sun with straight and wavy rays, walled garden behind, banner of victory. After Moon's fog comes undeniable daylight.",
          "Nineteen reduces to ten (1+9) — Wheel's cycles now illuminated consciously. Solar correspondence is vitality, ego integrated healthily, fame, and father energy blessed.",
          "The child represents innocence regained after trials — not ignorance, but joy without guilt. Warmth, clarity, and good news are likely.",
          "One of tarot's most welcome cards. Truth is visible; celebrate proportionally.",
        ],
        example:
          "The Sun as final outcome is strong yes — success, birth, wedding, publication, recovery.",
      },
      "upright-meaning": {
        paragraphs: [
          "Upright, The Sun promises success, happiness, visibility, and vitality. Projects flourish, health improves, lies evaporate. Confidence earned and expressed.",
          "Play, summer energy, and childlike delight appropriate now.",
          "Honesty and warmth bring positive news.",
        ],
      },
      "reversed-meaning": {
        paragraphs: [
          "Reversed, The Sun warns of temporary cloud — success delayed, ego burn, or joy blocked by pessimism. Inner child wounded; sunlight filtered.",
          "Overexposure, vanity, or party ending hangover.",
          "Joy is still available — perhaps internal before external.",
        ],
      },
      "love-relationships": {
        paragraphs: [
          "In love, upright Sun means warmth, commitment joy, wedding, pregnancy, or relationship that feels easy and visible. Honesty and warmth bring positive news.",
          "Partners celebrate each other publicly.",
          "Reversed, relationship good but unacknowledged, or ego clashes dimming warmth.",
        ],
      },
      "career-finances": {
        paragraphs: [
          "Career-wise, upright Sun favors promotions, launches, awards, and leadership with goodwill. Success and visibility are favored.",
          "Financial prosperity, profitable visibility, and investments in growth sectors.",
          "Reversed, success you minimize, or burnout from constant performance.",
        ],
      },
      "spiritual-meaning": {
        paragraphs: [
          "Spiritually, The Sun is illumination — samadhi glimpses, answered prayer, integration of shadow into golden self.",
          "Solar meditations, dawn rituals, and gratitude practices amplify this card.",
          "Enlightenment here is embodied joy, not escape from earth.",
        ],
      },
    },
    faq: [
      {
        question: "Is The Sun the best tarot card?",
        answer:
          "Many readers consider it the most positive — clarity, joy, and success. Reversed softens but rarely reverses completely. Context still matters.",
      },
      {
        question: "Does The Sun mean pregnancy?",
        answer:
          "It can symbolize fertility, birth, and creative fruition broadly — literal pregnancy is one possible expression.",
      },
      {
        question: "Sun vs Star after Tower?",
        answer:
          "Star is quiet healing hope; Sun is full celebration and visible thriving. Star bandages; Sun dances.",
      },
    ],
  },

  judgement: {
    description:
      "Judgement (XX) calls awakening, reckoning, and renewal from a higher perspective. Explore Pluto symbolism, Rider-Waite resurrection imagery, and meanings for love, career, and spiritual rebirth.",
    keywords: ["judgement tarot", "judgement card meaning", "major arcana 20", "tarot awakening", "judgement pluto"],
    sections: {
      "card-overview": {
        paragraphs: [
          "Judgement is Major Arcana XX — angel Gabriel trumpets from clouds, naked figures rise from coffins with arms raised, mountains and sea between. Resurrection, review, and vocation call.",
          "Twenty reduces to two (2+0) — High Priestess polarity now answered by cosmic verdict. Pluto correspondence transforms through underworld review and rebirth.",
          "A truth you've avoided is ready to be faced. Second chances appear when accountability is genuine.",
          "Unlike Justice's scales, Judgement is soul-summons — forgive and be forgiven, rise renewed.",
        ],
        example:
          "Judgement in career readings often means callback, revival of old dream, or calling you can no longer ignore.",
      },
      "upright-meaning": {
        paragraphs: [
          "Upright, Judgement announces awakening, life review, and pivotal decision from higher perspective. Past actions integrate into wisdom.",
          "Forgiveness — self and others — unlocks forward motion.",
          "A callback or fresh start is possible.",
        ],
      },
      "reversed-meaning": {
        paragraphs: [
          "Reversed, Judgement warns of self-judgment paralysis, ignoring call, or refusing amends. Stagnant guilt without change.",
          "Fear of visibility blocking purpose.",
          "Answer the trumpet or accept limbo — half-alive is exhausting.",
        ],
      },
      "love-relationships": {
        paragraphs: [
          "In love, upright Judgement can mean reconciliation after honest reckoning, relationship leveling up spiritually, or release with blessing. A second chance or honest reckoning may come.",
          "Forgiving past hurts without forgetting lessons.",
          "Reversed, holding grudges, refusing apology, or repeating karmic pattern.",
        ],
      },
      "career-finances": {
        paragraphs: [
          "Career-wise, upright Judgement favors reinvention, returning to former field transformed, and public recognition of growth. A callback or fresh start is possible.",
          "Financially, debt forgiveness, inheritance decisions, or evaluating life work ROI.",
          "Reversed, ignoring vocational calling for safe misery.",
        ],
      },
      "spiritual-meaning": {
        paragraphs: [
          "Spiritually, Judgement is resurrection consciousness — past lives, ancestral healing, and direct experience of divine call.",
          "Life review meditations, sound healing, and amends work embody the card.",
          "You are not judged to punish but to awaken.",
        ],
      },
    },
    faq: [
      {
        question: "Judgement vs Justice?",
        answer:
          "Justice is earthly fairness and facts; Judgement is spiritual awakening and redemption. Courtroom versus resurrection.",
      },
      {
        question: "Does Judgement mean religion?",
        answer:
          "It uses Christian resurrection imagery but broadly means inner calling, review, and rebirth — applicable across traditions.",
      },
      {
        question: "What planet links to Judgement?",
        answer:
          "Pluto in modern correspondences — transformation, underworld review, and rebirth from depth.",
      },
    ],
  },

  "the-world": {
    description:
      "The World (XXI) completes the Fool's Journey with integration, wholeness, and embodied success. Learn Saturn symbolism, Rider-Waite wreath imagery, and readings for love, career, and spiritual fulfillment.",
    keywords: ["the world tarot", "world card meaning", "major arcana 21", "tarot completion", "world saturn"],
    sections: {
      "card-overview": {
        paragraphs: [
          "The World is Major Arcana XXI — a dancing figure within laurel wreath tied with purple ribbons, four corner creatures (human, eagle, lion, bull) echoing apocalyptic vision and fixed signs. Wands in each hand — mastery expressed as movement.",
          "Twenty-one reduces to three (2+1) — Empress's creation fulfilled at cosmic scale. Saturn correspondence crowns achievement through time, discipline, and maturity.",
          "A cycle completes. Honour how far you've come. The Fool who began at zero arrives integrated; the next Fool's Journey can begin consciously.",
          "When The World appears, celebrate completion before rushing next quest.",
        ],
        example:
          "The World as outcome after multi-year spread markers graduation, citizenship, marriage, or project launch at scale.",
      },
      "upright-meaning": {
        paragraphs: [
          "Upright, The World promises completion, travel, recognition, and wholeness. Goals achieved, lessons integrated, status earned.",
          "Global perspective, successful conclusions, and dancing with life.",
          "A goal you've worked for is within reach.",
        ],
      },
      "reversed-meaning": {
        paragraphs: [
          "Reversed, The World warns of incomplete endings, fear of success, or shortcuts blocking full integration. Almost there but not quite.",
          "Imposter syndrome at finish line.",
          "Tie loose ends — last ten percent matters.",
        ],
      },
      "love-relationships": {
        paragraphs: [
          "In love, upright World means fulfilled partnership, long-distance closure, marriage completing arc, or single wholeness before new cycle. A chapter in love is finishing — with meaning.",
          "Feeling complete with or without partner.",
          "Reversed, staying in relationship past natural end, or fear of committing at finish line.",
        ],
      },
      "career-finances": {
        paragraphs: [
          "Career-wise, upright World signals graduation, promotion to global role, successful launch, and legacy projects. A goal you've worked for is within reach.",
          "Financial stability from sustained effort; international income.",
          "Reversed, delaying launch, or success without satisfaction.",
        ],
      },
      "spiritual-meaning": {
        paragraphs: [
          "Spiritually, The World is enlightenment as embodiment — sage dancing in marketplace, all elements integrated.",
          "Circumambulation rituals, completion ceremonies, and gratitude for path traveled.",
          "Ending that is beginning — return to Fool with wisdom.",
        ],
      },
    },
    faq: [
      {
        question: "Is The World the best outcome card?",
        answer:
          "It is the strongest completion and success card in the Majors — wholeness and achievement. Sun emphasizes joy; World emphasizes integration and closure.",
      },
      {
        question: "What are the four corner figures?",
        answer:
          "They reference Revelation's four living creatures and astrological fixed signs — Aquarius, Scorpio, Leo, Taurus — representing totality of experience.",
      },
      {
        question: "What happens after The World?",
        answer:
          "The Fool's Journey can restart at a higher spiral — The World is not the end of life but completion of a major cycle.",
      },
    ],
  },
};

/** Additional educational paragraphs merged at build time per section */
const CARD_SUPPLEMENTS: Record<string, Partial<Record<SectionId, string[]>>> = {
  "the-emperor": {
    "card-overview": [
      "Waite placed barren mountains behind the Emperor to contrast the Empress's fertile river valley — structure without nurture becomes desert. The ankh on his scepter ties rulership to life force rightly directed. In Thoth and Golden Dawn systems, he connects to Aries season: spring initiative that must learn patience by summer.",
    ],
    "upright-meaning": [
      "Set boundaries. Order creates calm — the card's core teaching from the app's keyword structure. Upright Emperor in a health reading may prescribe routine: sleep schedule, meal planning, exercise protocol. Discipline is medicine here.",
    ],
    "reversed-meaning": [
      "When authority figures appear reversed as Emperor, examine whether rules serve people or people serve rules. Corporate cultures and family systems both manifest this archetype — naming which side you're on clarifies action.",
    ],
    "love-relationships": [
      "You need clarity and respect — not guessing games. Emperor love is protective when healthy: showing up, keeping promises, defining exclusivity. It chills when affection becomes audit and control.",
    ],
    "career-finances": [
      "Lead with discipline. Structure beats chaos — especially in project management, operations, and any rebuild after Tower-style disruption. Document decisions; future you will need paper trail.",
    ],
    "spiritual-meaning": [
      "Sacred masculinity in spiritual work includes container-holding for community — start time, end time, ethical guidelines — so mystery can be explored safely.",
    ],
  },
  "the-hierophant": {
    "card-overview": [
      "The triple crown and crossed keys at the Hierophant's feet reference papal authority and access to mystery schools — outer gatekeeper of inner truth. Waite's acolytes wear floral robes suggesting initiation into living tradition, not dead letter.",
    ],
    "upright-meaning": [
      "Wisdom comes from proven paths and honest guidance. Before reinventing your career or spirituality, ask who has walked the path and what they learned. Mentorship compresses decades into years when the teacher is ethical.",
    ],
    "reversed-meaning": [
      "Old patterns may repeat — name them and choose differently. Reversed Hierophant in family readings often shows inherited beliefs about money, love, or God that no longer fit.",
    ],
    "love-relationships": [
      "Marriage counseling, pre-marital classes, and meeting through religious or alumni communities are classic Hierophant channels. Values alignment matters more than chemistry alone long-term.",
    ],
    "career-finances": [
      "A mentor or established method can help now — apprenticeships, certifications, and licensing pay off under upright Hierophant. Shortcuts around credentials may backfire.",
    ],
    "spiritual-meaning": [
      "Lineage matters when lineage is alive: teachers who encourage your direct experience rather than permanent dependence. The Hierophant blesses initiation, not indoctrination.",
    ],
  },
  "the-lovers": {
    "card-overview": [
      "Raphael the angel above the couple blesses conscious union — choice made with awareness, not sleepwalking into fate. The mountain between trees suggests ascent through aligned partnership or values climbing together.",
      "Numerologically VI reduces to harmony through dialogue — Gemini's twins choosing each other daily, not once. In Kabbalistic paths, this key opens the heart center where values become visible action.",
    ],
    "upright-meaning": [
      "A real choice is in front of you — align with your values. Lovers upright in career can mean ethical fork: lucrative path versus meaningful path. The card rewards integrity over convenience.",
    ],
    "reversed-meaning": [
      "Misaligned partnerships of all kinds surface when reversed — business co-founders, creative duos, not only romance. Split loyalties drain power until one path is chosen.",
    ],
    "love-relationships": [
      "This is about genuine connection, not just attraction. Soul-level recognition feels like coming home and terror simultaneously — Lovers honors both.",
    ],
    "career-finances": [
      "Two paths are open. Pick what fits who you are. Partnership contracts need explicit values clauses under this card — what happens if goals diverge?",
    ],
    "spiritual-meaning": [
      "Inner marriage of opposites precedes healthy outer partnership in Jungian reading. Integrate anima/animus work before projecting wholeness onto a partner.",
    ],
  },
  "the-chariot": {
    "card-overview": [
      "The Chariot's canopy of stars suggests celestial protection for the victor who masters opposing forces. Black and white sphinxes (replacing horses in Waite) cannot be yoked with reins — only aligned intention steers.",
      "VII is the chariot of the soul in Platonic imagery — victory through aligning conflicting inner drives toward one sacred aim. Cancer's shell protects the soft center while the charioteer advances.",
    ],
    "upright-meaning": [
      "Stay focused. Momentum is on your side if you commit. Chariot weeks favor sprints: launch week, exam week, closing week. Protect sleep so willpower does not collapse mid-push.",
      "In three-card spreads, Chariot center means the querent holds the steering wheel — outcomes depend on follow-through more than external luck.",
    ],
    "reversed-meaning": [
      "Mixed signals won't fix themselves — be direct. Reversed Chariot often describes projects with no driver: committees that cannot decide, relationships where neither person steers.",
      "Road rage, burnout, and winning-at-all-costs damage relationships when Chariot shadow takes the wheel.",
    ],
    "love-relationships": [
      "Pursuit with clarity beats ambiguous orbiting. Chariot in love favors defining the relationship, closing distance, or fighting fairly for repair when both want it.",
      "Long-distance closure and decisive commitment conversations resonate — stop circling the airport emotionally.",
    ],
    "career-finances": [
      "Push through resistance. Victory comes through focus. Sales quotas, athletic competition, and political campaigns resonate — but define winning ethically.",
      "Relocation for career and commute victories appear when Chariot meets Pentacles — movement toward material goal.",
    ],
    "spiritual-meaning": [
      "The charioteer is yogi who unites ida and pingala — lunar and solar channels. Breath practice that balances nostrils embodies this card practically.",
      "Will aligned with divine purpose differs from ego conquest — ask who benefits from your victory.",
    ],
  },
  strength: {
    "card-overview": [
      "Strength's infinity lemniscate mirrors The Magician's, but power here is receptive — channeling rather than forcing. The lion's jaws close gently; teeth do not pierce. Waite retitled Lust or Force traditions into compassionate mastery.",
      "VIII in some traditions was Justice before renumbering — inner moral strength precedes outer verdict. Leo's heart courage regulates fire without extinguishing it.",
    ],
    "upright-meaning": [
      "Gentle persistence beats force. Strength upright appears when anger management, patient parenting, or long advocacy campaigns succeed through steadiness, not spectacle.",
      "When Strength opposes Tower in spread, prefer regulated response over reactive explosion — soft power de-escalates.",
    ],
    "reversed-meaning": [
      "Honest, calm courage is your strength here when upright; reversed, shame about needs or explosive temper undermines. Somatic therapy and regulated nervous system work align with this card.",
      "Bullying and anxiety loops feed each other reversed — break cycle with one honest vulnerable conversation.",
    ],
    "love-relationships": [
      "Passionate bonds need soft hands on the reins. Strength counsels naming jealousy without accusation, desire without coercion.",
      "Couples therapy and nonviolent communication embody Strength methodology in practice.",
    ],
    "career-finances": [
      "Keep going quietly — resilience is noticed. Leaders who do not need credit for every win embody Strength in office politics.",
      "Endurance sports, rehabilitation careers, and animal training metaphors fit — patience with progress.",
    ],
    "spiritual-meaning": [
      "Taming the lion is shadow integration — not killing instinct but befriending it. Tibetan Buddhist tonglen and Christian agape both echo this archetype.",
      "Infinity above head suggests divine strength flowing through human gentleness — channel, not source.",
    ],
  },
  "the-hermit": {
    "card-overview": [
      "The Hermit's gray cloak hides rank and gender — wisdom without persona. His staff is active support, not mere decoration: even solitaries walk paths requiring tools. The mountain is achievement of altitude through effort.",
      "IX precedes Wheel — inner lantern must be lit before external cycles make sense. Virgo discernment sifts experience for usable truth.",
    ],
    "upright-meaning": [
      "Step back. Solitude brings the answer. Hermit phases are productive, not lazy — writing retreats, sabbaticals, and silent meditation weekends belong here.",
      "Mentors appearing in life often carry Hermit energy — few words, precise guidance, no need for applause.",
    ],
    "reversed-meaning": [
      "Alone time isn't rejection — it's clarity upright; reversed, isolation becomes punishment or weapon in relationships.",
      "Hermit reversed can also mean refusing mentorship out of pride — you do not have to learn alone.",
    ],
    "love-relationships": [
      "Attraction to mentors, age gaps, or slow-burn courtship fits Hermit. Depth requires time unavailable in swipe culture.",
      "Partners honoring solo nights without threat strengthen bonds under this card.",
    ],
    "career-finances": [
      "Pause before the next big move. Research papers, patent applications, and specialized credentials mature under Hermit lamp light.",
      "Consulting as expert advisor suits Hermit — depth over breadth, premium rates for rare knowledge.",
    ],
    "spiritual-meaning": [
      "The lantern's six-pointed star is soul light — hexagram of union. Hermit years on any path separate tourists from committed practitioners.",
      "Dark retreat and cave meditation traditions worldwide echo this archetype — silence as teacher.",
    ],
  },
  "wheel-of-fortune": {
    "card-overview": [
      "Anubis ascending and serpent descending on the Wheel map rise and fall cycles in Egyptian symbolism Waite adopted. Corner creatures with books suggest fixed signs witnessing change they cannot stop.",
      "X completes numeric root — 1+0=1, return to Magician's agency but informed by cycle wisdom. Jupiter expands whatever phase you occupy; humility at peak prevents crash.",
    ],
    "upright-meaning": [
      "Life is turning. This phase won't last forever — stock both humility for peaks and hope for valleys. External events may dominate; agility matters more than ego.",
      "Synchronicities cluster under Wheel — meaningful coincidence, not mere randomness, when you track patterns.",
    ],
    "reversed-meaning": [
      "Luck in love can shift — stay open to change upright; reversed, repeating the same partner dynamic or job pattern without learning.",
      "Bad luck streaks end faster when you change behavior, not only wait for wheel to turn.",
    ],
    "love-relationships": [
      "Karmic timing surfaces: meet at the right wrong moment, or reunion when both have grown. Wheel resists forcing.",
      "On-again-off-again dynamics mirror wheel literal — name the cycle to choose consciously.",
    ],
    "career-finances": [
      "Timing is moving. Watch for an opening door — and for closing ones that redirect you. Economic cycles are Wheel lessons macro scale.",
      "Windfalls and sudden losses both possible — avoid tying identity to peak income.",
    ],
    "spiritual-meaning": [
      "Bhavacakra — wheel of becoming — teaches every realm is temporary. Meditation on impermanence reduces panic when the wheel dips.",
      "Fortuna is goddess, not enemy — honor change as teacher wearing many masks.",
    ],
  },
  justice: {
    "card-overview": [
      "Justice's squared posture and direct gaze differ from High Priestess's sideways mystery — truth faces you. Purple veil behind is impartiality, not hiding. Sword points up: ready but not swung in anger.",
      "XI scales and sword balance mercy and severity — Libra partnership extended to cosmic equilibrium. Legal and moral law intersect but are not identical.",
    ],
    "upright-meaning": [
      "Truth and fairness matter. Act with integrity. Legal outcomes favor documented honesty. Personal integrity means admitting fault before being caught.",
      "Justice upright in health may mean balanced regimen — neither ascetic punishment nor indulgent neglect.",
    ],
    "reversed-meaning": [
      "Are you giving and receiving equally? Reversed Justice in friendship shows one-sided labor. In courts, bias or missing evidence.",
      "Self-righteousness without self-examination is reversed Justice shadow — judge others, excuse self.",
    ],
    "love-relationships": [
      "Contracts, decisions, and facts surface now — prenups, custody, or defining equity in household labor.",
      "Divorce mediation done fairly honors Justice more than scorched-earth victory.",
    ],
    "career-finances": [
      "Contracts, decisions, and facts surface now in work readings — audits, reviews, settlement negotiations.",
      "Whistleblowing and compliance roles carry Justice signature — truth has professional cost and reward.",
    ],
    "spiritual-meaning": [
      "Karma is precise accounting, not punishment fantasy. Every action seeds consequence — Justice invites willing alignment before the ledger closes.",
      "Ma'at's feather and sword echo across traditions — heart weighed against truth.",
    ],
  },
  "the-hanged-man": {
    "card-overview": [
      "The living tree from which he hangs suggests sacrifice that feeds growth — not dead gallows. Crossed leg forms four, number of stability paradoxically found in suspension. Halo confirms enlightenment, not execution.",
      "XII is Hanged Man's number — sacrifice before Death's XIII transformation. Neptune dissolves certainty so new perception floods in.",
    ],
    "upright-meaning": [
      "Stop forcing. A new angle will appear. Hanged Man productivity looks like journaling, therapy, and strategic patience while competitors burn out rushing.",
      "Voluntary pause differs from imposed stagnation — choose suspension when possible.",
    ],
    "reversed-meaning": [
      "Waiting hurts, but pushing won't help either upright; reversed, martyrdom or refusal to act when lesson is complete.",
      "Playing victim to avoid decision is reversed shadow — you can unhook when ready.",
    ],
    "love-relationships": [
      "Undefined situationships and long-distance pauses are classic. Sacrifice must be mutual — one-sided hanging breeds resentment.",
      "Seeing partner from radically new perspective can renew or end bond honestly.",
    ],
    "career-finances": [
      "Delay isn't denial — use the pause wisely. Sabbaticals, visa delays, and funding gaps can be Hanged Man seasons.",
      "Strategic patience in negotiations — let other side speak first — wins under this card.",
    ],
    "spiritual-meaning": [
      "Voluntary ego death precedes mystic sight. Odin, Christ, and shamanic dismemberment myths echo this posture across cultures.",
      "Inversion meditation — literally seeing room upside down — playful practice for perspective shift.",
    ],
  },
  death: {
    "card-overview": [
      "The white rose on Death's banner is beauty in endings — Waite insisted transformation, not morbidity. Bishop, maiden, and king fall regardless of status; ego's titles do not exempt anyone from change.",
      "XIII reduces to IV — Emperor's structure dies so truer foundation rebuilds. Scorpio rules elimination and regeneration in tandem.",
    ],
    "upright-meaning": [
      "An ending clears space for something truer. Grief is appropriate; resistance prolongs suffering. Death upright supports decluttering, quitting, and funeral rituals that honor what passed.",
      "Transformation keyword means compost, not cruelty — what releases feeds next growth.",
    ],
    "reversed-meaning": [
      "Let an old pattern die so real love can grow upright; reversed, zombie situations — relationship, job, habit — neither alive nor buried.",
      "Near-death transformations refused return louder — universe repeats lesson.",
    ],
    "love-relationships": [
      "Breakups that free both people, or transformation of bond into friendship or co-parenting, are Death done well.",
      "Grief work together can deepen intimacy if both honor what died — old dynamic, not necessarily union.",
    ],
    "career-finances": [
      "Close one chapter to start a better one. Severance, industry obsolescence, and pivot courage belong here.",
      "Estate planning and inheritance are Death's mundane face — practical transformation.",
    ],
    "spiritual-meaning": [
      "Scorpio-Pluto territory: compost mysticism. What you release becomes soil. Rituals of burning, burying, and naming endings sanctify the card.",
      "Phoenix logic applies — ash is prerequisite, not punishment.",
    ],
  },
  temperance: {
    "card-overview": [
      "Temperance's impossible flow between cups defies gravity — grace, not effort, blends elements. Foot on land and water bridges conscious and unconscious. Iris flowers reference messenger goddess and rainbow after storm.",
      "XIV reduces to V — Hierophant's tradition alchemically transformed into living harmony. Sagittarius seeks meaning through integrating diverse experience.",
    ],
    "upright-meaning": [
      "Balance and patience heal what force cannot. Recovery from illness, addiction, or conflict proceeds by degrees under Temperance — not zero to hero overnight.",
      "Harmony keyword invites middle path — neither ascetic denial nor binge excess.",
    ],
    "reversed-meaning": [
      "Slow and steady wins — avoid extremes upright; reversed, binge-purge cycles in diet, spending, emotion.",
      "Incompatible elements forced together without patience create explosion, not synthesis.",
    ],
    "love-relationships": [
      "Blend patience with action in repair — daily small gestures outweigh one grand apology.",
      "Cross-cultural and long-distance love succeed through Temperance pacing — gradual blending.",
    ],
    "career-finances": [
      "Moderate portfolios, blended roles, and interdisciplinary careers thrive. Financial extremes burn under reversed Temperance.",
      "Healthcare, counseling, and mixology metaphors — skilled blending of unlike inputs.",
    ],
    "spiritual-meaning": [
      "Alchemical coniunctio — sacred marriage of opposites — is Temperance at mystical pitch. Daily practice integrates what peak experiences merely hint.",
      "Angel intermediary suggests grace assists human effort — you pour, but flow is gift.",
    ],
  },
  "the-devil": {
    "card-overview": [
      "Loose chains on Devil's captives are Waite's crucial detail: bondage is often consent maintained by fear. Horns and tails sprouting suggest identity fusion with shadow — you become what you refuse to examine.",
      "XV reduces to VI — Lovers' choice degraded into addiction when values abandoned. Capricorn ambition without ethics becomes golden cage.",
    ],
    "upright-meaning": [
      "Name what's holding you — habit, fear, or control. Awareness without shaming is first freedom. Recovery communities, therapy, and honest friends loosen chains.",
      "Attachment keyword asks what payoff you get from staying stuck — secondary gains maintain chains.",
    ],
    "reversed-meaning": [
      "Ask: is this love or dependency? Reversed can mean liberation underway or deeper denial if intervention is refused.",
      "Breaking addiction cycle begins with naming — precise language, not vague guilt.",
    ],
    "love-relationships": [
      "Trauma bonds, jealousy scripts, and staying for lifestyle not love are Devil patterns. Chemistry is not absolution.",
      "Ethical kink versus coercion distinguishes healthy intensity from Devil shadow — consent and aftercare matter.",
    ],
    "career-finances": [
      "Money fear may be driving bad choices — golden handcuffs, predatory loans, unethical commissions.",
      "Luxury lifestyle debt enslaves earners to hated work — classic Devil bargain.",
    ],
    "spiritual-meaning": [
      "Shadow work is non-negotiable under Devil. What you project onto 'evil others' often lives in your own attachment patterns.",
      "Facing Devil in meditation means sitting with shame without becoming it.",
    ],
  },
  "the-tower": {
    "card-overview": [
      "Yod-shaped lightning is Hebrew letter of divine hand — intervention from above, not random bad luck. Crown blown from tower is false authority; what was built on lie cannot stand lightning's truth.",
      "XVI reduces to VII — Chariot's constructed victory shattered when built on sand. Mars strikes surgically, not cruelly random.",
    ],
    "upright-meaning": [
      "A shake-up clears what wasn't built on truth. Painful liberation — affair discovered, company bankrupt, belief shattered — frees energy for honest rebuild.",
      "Upheaval keyword is neutral long-term — destruction of unstable is mercy disguised as crisis.",
    ],
    "reversed-meaning": [
      "Sudden truth can hurt — but it frees you upright; reversed, delaying demolition until collapse is total.",
      "Internalizing Tower — anxiety without external event — still demands rebuilding beliefs.",
    ],
    "love-relationships": [
      "Foundations of sand — lies, finances hidden, incompatible life goals — Tower exposes before more years invest.",
      "Sudden breakup hurts but may save decades — honor the lightning's honesty.",
    ],
    "career-finances": [
      "Unexpected change is scary but necessary. Industry disruption, whistleblowing, natural disaster metaphor all possible.",
      "Insurance and emergency funds are Tower pragmatics — prepare without paranoia.",
    ],
    "spiritual-meaning": [
      "Dark night and kundalini crisis destroy false self. After Tower, only authentic structure is worth building.",
      "Lightning enlightenment is instant and destabilizing — integration takes years after flash.",
    ],
  },
  "the-star": {
    "card-overview": [
      "Eight-pointed star echoes Venus and Ishtar — hope goddess after underworld journey. Naked pourer has nothing left to hide post-Tower; vulnerability is strength. Ibis in tree nods to Thoth, divine scribe of wisdom.",
      "XVII reduces to VIII — Strength's inner power now expressed as gentle hope. Aquarius humanitarian vision pours healing publicly.",
    ],
    "upright-meaning": [
      "Healing and renewal are real. Keep faith. Star follows disaster in Fool's Journey sequence — statistically common in readings after hardship cards.",
      "Hope keyword is justified — not naive optimism but evidence-based trust in recovery.",
    ],
    "reversed-meaning": [
      "Hope in love is justified — stay open upright; reversed, cynicism armoring a tender heart that still wants healing.",
      "Creative drought lifts when you create badly again — permission precedes flow.",
    ],
    "love-relationships": [
      "Quiet soulmate energy, reconciliation, and healing intimacy after betrayal suit Star's gentle light.",
      "Vulnerability without armor attracts healthy partners under Star.",
    ],
    "career-finances": [
      "Recognition and calm progress are building. Creative careers and nonprofit alignment resonate.",
      "Wish fulfillment through aligned action — vision boards plus work sessions.",
    ],
    "spiritual-meaning": [
      "Grace after ordeal. Pouring water on earth and pool feeds conscious and unconscious — blessing both.",
      "Star meditation under night sky reconnects petty problems to vast cosmos — perspective heals.",
    ],
  },
  "the-moon": {
    "card-overview": [
      "Crayfish from pool is primitive psyche emerging — instinct before reason. Dog and wolf howl at reflected moon: tame and wild fear indistinguishable in fog. Path between towers winds into unknown mountains.",
      "XVIII reduces to IX — Hermit's solitude now haunted by imagination and fear. Pisces boundary blur requires discernment training.",
    ],
    "upright-meaning": [
      "Not everything is clear yet. Go slowly. Moon readings need journaling, second opinions, and delayed signatures.",
      "Uncertainty keyword is honest — act on verified facts, not anxiety narratives alone.",
    ],
    "reversed-meaning": [
      "Illusions or secrets may be involved — trust actions upright; reversed, fog lifting or paranoia deepening.",
      "Gaslighting exposure or self-deception ending — clarity returns gradually.",
    ],
    "love-relationships": [
      "Projection and fantasy in early dating are Moon classics — verify person matches image over months.",
      "Psychic connection possible — verify with consistent behavior over time.",
    ],
    "career-finances": [
      "Don't sign or decide until the fog lifts. Scams, unclear titles, and rumor-driven markets.",
      "Creative and psychic professions thrive under Moon — but contracts still need daylight review.",
    ],
    "spiritual-meaning": [
      "Dreamwork, lunar ritual, and facing ancestral fear are Moon path. Not all spirits are friendly — discern.",
      "Moon meditation honors fear without obeying it — name the wolf, keep walking.",
    ],
  },
  "the-sun": {
    "card-overview": [
      "Sunflower sun with alternating straight and wavy rays maps active and receptive solar force. Child on white horse is innocence regained — naked truth without shame. Walled garden is protected joy, not isolation.",
      "XIX reduces to X — Wheel's cycles illuminated consciously. Solar success is visible, warm, and shareable.",
    ],
    "upright-meaning": [
      "Warmth, clarity, and good news are likely. Sun is among strongest yes cards — success, vitality, truth revealed.",
      "Joy keyword is embodied — laugh, play, celebrate proportionally to achievement.",
    ],
    "reversed-meaning": [
      "Honesty and warmth bring positive news upright; reversed, joy blocked by pessimism or success you won't let yourself feel.",
      "Inner child wounded needs reparenting before outer Sun fully shines.",
    ],
    "love-relationships": [
      "Weddings, pregnancies, public commitment, relationships that feel easy and celebrated.",
      "Childlike play together rekindles long partnerships under Sun.",
    ],
    "career-finances": [
      "Success and visibility are favored. Promotions, launches, awards, profitable clarity.",
      "Public recognition and leadership with goodwill — Sun leaders inspire, not only command.",
    ],
    "spiritual-meaning": [
      "Solar illumination — embodied enlightenment, child sage, gratitude practice at dawn.",
      "Sun salutations and dawn rituals align body with card's vitality.",
    ],
  },
  judgement: {
    "card-overview": [
      "Gabriel's trumpet awakens coffin figures — resurrection archetype across Abrahamic imagery. Mountains and sea between suggest passage completed; rising is collective, not solo hero only.",
      "XX reduces to II — High Priestess polarity answered by cosmic call. Pluto transforms through review and rebirth.",
    ],
    "upright-meaning": [
      "A truth you've avoided is ready to be faced. Life review, amends, and vocation call converge.",
      "Awakening keyword is accountability plus mercy — not punishment without path forward.",
    ],
    "reversed-meaning": [
      "A second chance or honest reckoning may come upright; reversed, guilt without change, or ignoring call.",
      "Fear of visibility blocks purpose — Judgement reversed asks what you avoid hearing.",
    ],
    "love-relationships": [
      "Reconciliation after honest accounting, or release with blessing and closure.",
      "Past-life and karmic reunion tropes appear — verify with present behavior.",
    ],
    "career-finances": [
      "A callback or fresh start is possible. Reinvention and public recognition of growth.",
      "Vocational calling loud enough to ignore becomes health problem — answer or ail.",
    ],
    "spiritual-meaning": [
      "Awakening is not comfort — it is accountability plus mercy. Answer the trumpet.",
      "Life review meditation — what would you regret not doing — clarifies Judgement themes.",
    ],
  },
  "the-world": {
    "card-overview": [
      "Dancer within laurel wreath holds wands in both hands — active and receptive mastery united. Four corner creatures map fixed signs and totality of elemental experience. Purple sash is spirit permeating matter.",
      "XXI reduces to III — Empress's creation fulfilled at cosmic scale. Saturn crowns achievement through time and maturity.",
    ],
    "upright-meaning": [
      "A cycle completes. Honour how far you've come. World is graduation, immigration, marriage, book published — closure with dignity.",
      "Completion keyword includes celebration — ritualize arrival before next departure.",
    ],
    "reversed-meaning": [
      "A goal you've worked for is within reach upright; reversed, last-mile procrastination or fear of finishing.",
      "Imposter syndrome at finish line — you earned wreath, wear it.",
    ],
    "love-relationships": [
      "A chapter in love is finishing — with meaning. Wholeness with or without partner.",
      "Long-distance union closing distance, or graceful ending with gratitude.",
    ],
    "career-finances": [
      "Global roles, successful launches, legacy projects within reach.",
      "International income and travel — World expands geography literally.",
    ],
    "spiritual-meaning": [
      "Enlightenment as dance — sage returns to marketplace integrated. Next Fool's Journey begins wiser.",
      "Circumambulation — walking sacred circle — embodies World completion ritually.",
    ],
  },
};

const CARD_EXTRA_FAQ: Record<string, PillarFAQ[]> = {
  "the-lovers": [
    {
      question: "How does The Lovers relate to Gemini?",
      answer:
        "Golden Dawn correspondence links The Lovers to Gemini — duality, communication, and the fork in the road. Twins in the sign mirror inner and outer choice: integrating two parts of self before projecting wholeness onto a partner. Air element favors honest conversation as sacred practice.",
    },
  ],
  strength: [
    {
      question: "Why is the woman taming the lion instead of fighting it?",
      answer:
        "Waite revised older 'Force' cards that showed brute domination. Strength teaches that lasting influence comes from calm courage and compassion — closing the lion's jaws without bloodshed. In readings, this often means regulating emotion rather than suppressing or exploding it.",
    },
  ],
  "the-hermit": [
    {
      question: "How long does Hermit energy typically last in a reading?",
      answer:
        "Timing varies by context, but Hermit phases often span weeks to months — sabbaticals, research periods, or relationship pauses for clarity. It is seldom a permanent state unless chosen as lifestyle. The lantern lights one step; patience is feature, not bug.",
    },
  ],
  "wheel-of-fortune": [
    {
      question: "Can you change your luck when Wheel of Fortune appears?",
      answer:
        "You cannot control every external event, but you can control response and preparation. Upright Wheel favors agile adaptation — saving in peaks, investing in skills in valleys, and avoiding hubris when fortune smiles. Reversed loops break when behavior changes, not only when waiting.",
    },
  ],
  justice: [
    {
      question: "Does Justice always mean legal court?",
      answer:
        "Not always. It broadly signifies fairness, truth, contracts, and cause-effect accountability. Legal themes are common, but personal integrity — owning your side of any dispute — is the deeper lesson.",
    },
    {
      question: "How does Justice differ from the scales in Libra astrology?",
      answer:
        "Both seek equilibrium, but tarot Justice adds sword of decisive truth — cutting illusion so scales can weigh accurately. Libra diplomacy plus surgical honesty equals this card.",
    },
    {
      question: "What does the upright sword symbolize?",
      answer:
        "Ready discernment — truth that can be spoken clearly when needed. Unlike reversed sword, it is not swung in rage but held as standard of accountability.",
    },
  ],
  "the-hanged-man": [
    {
      question: "Is The Hanged Man voluntary or forced?",
      answer:
        "Rider-Waite depicts voluntary suspension — the halo confirms spiritual choice. You may feel stuck externally, but inner surrender to new perspective is the active work. Forced imprisonment without growth is closer to reversed Devil or Tower themes.",
    },
    {
      question: "What practical action fits The Hanged Man?",
      answer:
        "Pause strategic pushes, journal from inverted assumptions, and ask what you see differently when not chasing outcomes. Therapy and meditation excel here. Action returns after perspective shifts.",
    },
  ],
  death: [
    {
      question: "What should I do when Death appears in a reading?",
      answer:
        "Honor what is ending without clinging. Ritualize closure — goodbye letter, declutter, quit notice, therapy session — so grief moves. Do not rush rebirth; compost needs time. Ask what identity must die for truer self to grow.",
    },
    {
      question: "Can Death mean positive transformation?",
      answer:
        "Absolutely. Ending toxic job, leaving misaligned relationship, or quitting harmful habit are Death victories. Transformation clears space for truer life — grief and relief often coexist.",
    },
  ],
  temperance: [
    {
      question: "Why does water flow upward between the cups?",
      answer:
        "The impossible flow signals grace and alchemical mystery — elements blend beyond literal physics when patience and right proportion align. Metaphorically, conscious and unconscious, or two opposed life areas, integrate through steady daily practice rather than force.",
    },
    {
      question: "Is Temperance about moderation only?",
      answer:
        "Moderation is part, but the card is also active synthesis — finding third path between false binaries. Healing, recovery, and creative blending all belong here. It is not bland neutrality but harmonized vitality.",
    },
    {
      question: "What role does the angel play?",
      answer:
        "Intermediary between human effort and divine grace — you pour, but harmonious flow exceeds what force alone achieves. Temperance is co-creation with patience.",
    },
    {
      question: "When does Temperance appear in timing readings?",
      answer:
        "Often indicates gradual progress over weeks or months — recovery, reconciliation, or skill-building that cannot be rushed. Unlike Chariot sprint, Temperance is marathon pacing toward stable harmony.",
    },
  ],
  "the-devil": [
    {
      question: "Can The Devil represent addiction?",
      answer:
        "Yes — substances, behaviors, relationships, or thought patterns that feel binding despite knowing harm. Loose chains remind that recovery is possible with support and honesty. The card names bondage without shaming the bonded.",
    },
    {
      question: "How do you work with Devil energy constructively?",
      answer:
        "Name the attachment precisely, seek support, and examine secondary gains from staying stuck. Shadow integration — owning desire and fear — loosens chains faster than pretending they do not exist.",
    },
  ],
  "the-tower": [
    {
      question: "How do you rebuild after The Tower?",
      answer:
        "Start with truth audit — what was false in the fallen structure? Grieve quickly, then build smaller and honest. Star and Temperance often follow in time. Emergency self-care and community support matter; pride slows recovery.",
    },
    {
      question: "Can The Tower be avoided?",
      answer:
        "Sometimes honest preemptive change softens impact — leaving bad job before firing, confessing before exposure. Reversed Tower can mean narrow escape. But structures built on lies eventually fall; earlier honesty is mercy.",
    },
    {
      question: "Is The Tower always catastrophic?",
      answer:
        "Intensity is high, but outcome can be liberating. Necessary breakups, honest restructuring, and belief upgrades hurt then heal. The card clears unstable forms so truer ones can be built.",
    },
  ],
  "the-star": [
    {
      question: "Why does The Star follow The Tower in the Majors?",
      answer:
        "The Fool's Journey places hope after devastation — when false structures fall, authentic healing begins. Star's naked vulnerability is possible only after Tower removes pretense. In readings, Star after Tower is classic recovery arc.",
    },
    {
      question: "Is The Star a wish card?",
      answer:
        "Traditionally yes — heartfelt intentions aligned with patient action can manifest. It is not passive lottery hope but calm faith during recovery.",
    },
    {
      question: "What does pouring into land and pool mean?",
      answer:
        "Blessing both practical life (land) and emotional unconscious (pool) — healing must reach body and soul. Star recovery is holistic, not cosmetic positivity.",
    },
    {
      question: "Which planet corresponds to The Star?",
      answer:
        "Aquarius in Golden Dawn tradition — humanitarian hope, future vision, and unconventional healing paths after crisis.",
    },
    {
      question: "Can The Star indicate creative inspiration?",
      answer:
        "Yes — calm muse after block, especially when paired with Cups or Wands. Inspiration flows gently, not manically.",
    },
  ],
  "the-moon": [
    {
      question: "How do you read The Moon when anxious?",
      answer:
        "Separate intuition from anxiety — both feel similar in body. Moon favors journaling, delayed decisions, and verifying stories with trusted friends. Actions over weeks reveal truth; single dramatic moments may be fog.",
    },
    {
      question: "What does the crayfish symbolize?",
      answer:
        "Primitive psyche emerging from unconscious depths — instinct before rational narrative. New situations may trigger old fears; Moon asks you to distinguish present threat from memory.",
    },
    {
      question: "How long does Moon confusion last?",
      answer:
        "Varies, but Moon phases suggest weeks rather than hours for clarity. Track patterns, avoid irreversible decisions, and revisit questions after the next lunar cycle if needed.",
    },
    {
      question: "Are Moon intuitions always wrong?",
      answer:
        "No — they may be early signal before facts arrive. Moon asks to hold intuition lightly, verify with behavior over time, and neither dismiss nor obey fear blindly.",
    },
  ],
  "the-sun": [
    {
      question: "How positive is The Sun compared to The World?",
      answer:
        "Both are strongly positive. The Sun emphasizes joy, clarity, and vitality in the moment. The World emphasizes completion, integration, and closing a major cycle. Sun is peak daylight; World is graduation ceremony.",
    },
    {
      question: "What does the child on the horse represent?",
      answer:
        "Innocence regained after trials — not ignorance, but transparent joy. Successful outcomes feel natural and shareable. Inner child healed enough to play publicly.",
    },
    {
      question: "Does reversed Sun mean permanent failure?",
      answer:
        "Rarely. Reversed usually softens or delays joy — pessimism, blocked celebration, or success you minimize. Core solar energy remains available when self-permission returns.",
    },
    {
      question: "What careers resonate with The Sun?",
      answer:
        "Leadership, entertainment, childcare, solar-themed wellness, and any visible role celebrating life. Success through authenticity and warmth rather than manipulation.",
    },
    {
      question: "What does the walled garden behind the child mean?",
      answer:
        "Protected joy — success within healthy boundaries, not exposure without safety. Sun celebration is real but not reckless; innocence thrives where nurture exists.",
    },
    {
      question: "Is The Sun a yes card?",
      answer:
        "Among the strongest yes cards upright — clarity, success, and positive outcomes likely when acting with integrity.",
    },
  ],
  judgement: [
    {
      question: "Why is the card spelled Judgement?",
      answer:
        "Rider-Waite uses British spelling. Some decks title it Judgment. Meaning is identical — awakening, review, and resurrection call regardless of spelling on the card face.",
    },
    {
      question: "Does Judgement mean religious judgment day?",
      answer:
        "Imagery borrows resurrection symbolism, but tarot meaning is psychological and spiritual awakening — facing truth, making amends, and answering vocation. Secular readers emphasize life review and honest reckoning.",
    },
    {
      question: "What is the trumpet call?",
      answer:
        "Vocation you can no longer ignore — career pivot, creative calling, relationship reckoning, or spiritual awakening demanding response. Answering may be uncomfortable but relief follows honesty.",
    },
    {
      question: "Does Judgement guarantee a second chance?",
      answer:
        "It opens the door — reconciliation and renewal are possible when accountability is genuine. Others must also choose forgiveness or reunion; Judgement invites your honest part first.",
    },
    {
      question: "Who are the figures rising from coffins?",
      answer:
        "Everyday people answering collective call — awakening is not elite-only. Family, community, and past selves may all 'rise' when truth is faced together.",
    },
    {
      question: "Is Judgement related to Pluto?",
      answer:
        "Modern correspondences link Pluto — transformation, underworld review, and rebirth from depths. Traditional imagery emphasizes angelic call more than planet.",
    },
    {
      question: "What number is Judgement in the Majors?",
      answer:
        "XX — twenty, reducing to two, echoing High Priestess polarity now answered by awakened choice and accountability.",
    },
  ],
  "the-world": [
    {
      question: "What comes after The World in tarot?",
      answer:
        "The Fool's Journey can restart at a higher level — World completion leads to new Fool leap with wisdom intact. In readings, celebrate closure before asking the next question. Wholeness is not stagnation.",
    },
    {
      question: "Does The World mean travel?",
      answer:
        "Often yes — international relocation, global career, or successful trip. Metaphorically it means integrating all life areas into coherent whole. Completion and expansion both belong to this card.",
    },
    {
      question: "What do the four corner creatures mean?",
      answer:
        "They reference Revelation's four living creatures and fixed signs Aquarius, Scorpio, Leo, Taurus — totality of elemental experience integrated in the dancer.",
    },
    {
      question: "How do you celebrate The World in practice?",
      answer:
        "Ritualize completion — graduation party, portfolio launch, anniversary of sobriety, or gratitude letter to collaborators. Naming arrival anchors wisdom before the next Fool leap begins.",
    },
    {
      question: "What does the laurel wreath symbolize?",
      answer:
        "Victory earned through full cycle — Olympic and academic laurels echo here. Completion is crowned, not accidental; honor effort that brought you to the dance.",
    },
  ],
};

function buildSections(content: CardContent, slug: string): PillarSection[] {
  const supplements = CARD_SUPPLEMENTS[slug] ?? {};
  return SECTION_META.map(({ id, heading }) => {
    const section = content.sections[id];
    const extra = supplements[id] ?? [];
    return {
      id,
      heading,
      paragraphs: [...section.paragraphs, ...extra],
      ...(section.example ? { example: section.example } : {}),
    };
  });
}

function buildFromCard(card: MajorArcanaCard): PillarArticle {
  const slug = tarotCardSlug(card.name);
  const content = CARD_CONTENT[slug];
  if (!content) {
    throw new Error(`Missing tarot pillar content for slug: ${slug}`);
  }

  return {
    hub: "tarot",
    slug,
    title: `${card.name} Tarot Card Meaning`,
    description: content.description,
    publishedAt: PUBLISHED_AT,
    updatedAt: UPDATED_AT,
    keywords: content.keywords,
    sections: buildSections(content, slug),
    faq: [...content.faq, ...(CARD_EXTRA_FAQ[slug] ?? [])],
  };
}

export function buildTarotPillar(slug: string): PillarArticle {
  const card = MAJOR_ARCANA.find((c) => tarotCardSlug(c.name) === slug);
  if (!card) {
    throw new Error(`Unknown tarot pillar slug: ${slug}`);
  }
  return buildFromCard(card);
}

export const TAROT_PILLARS: PillarArticle[] = TAROT_CARD_SLUGS.map((slug) =>
  buildTarotPillar(slug)
);

export function getTarotPillar(slug: string): PillarArticle | undefined {
  return TAROT_PILLARS.find((article) => article.slug === slug);
}
