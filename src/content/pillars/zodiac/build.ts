import type { PillarArticle, PillarFAQ, PillarSection } from "../types";
import { ZODIAC_SIGNS_ORDER, ZODIAC_TRAITS } from "@/lib/astrology/zodiac-traits";
import { ZODIAC_META } from "./meta";

type ZodiacSign = (typeof ZODIAC_SIGNS_ORDER)[number];

type SectionId =
  | "personality-traits"
  | "strengths"
  | "weaknesses"
  | "love-style"
  | "career-tendencies"
  | "friendships"
  | "ruling-planet-and-element"
  | "compatibility"
  | "in-the-birth-chart";

const SECTION_HEADINGS: Record<SectionId, string> = {
  "personality-traits": "Personality Traits",
  strengths: "Strengths",
  weaknesses: "Weaknesses & Growth Edges",
  "love-style": "Love Style & Relationships",
  "career-tendencies": "Career Tendencies",
  friendships: "Friendships & Social Life",
  "ruling-planet-and-element": "Ruling Planet & Element",
  compatibility: "Compatibility",
  "in-the-birth-chart": "Beyond Sun Sign: In the Birth Chart",
};

interface SignPillarContent {
  title: string;
  description: string;
  keywords: string[];
  sections: Record<SectionId, string[]>;
  faq: PillarFAQ[];
}

function capitalizeSign(slug: string): string {
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

function formatSignList(slugs: string[]): string {
  return slugs.map(capitalizeSign).join(", ");
}

const PUBLISHED = "2026-06-25";

const SIGN_CONTENT: Record<ZodiacSign, SignPillarContent> = {
  Aries: {
    title: "Aries Zodiac Sign: Personality, Love, Career & Compatibility",
    description:
      "Your definitive Aries zodiac sign guide: personality traits, love and career tendencies, Mars rulership, compatible signs, growth edges, and birth chart placements explained.",
    keywords: [
      "Aries zodiac sign",
      "Aries personality",
      "Aries compatibility",
      "Mars ruling planet",
      "Aries love style",
      "Aries career",
      "fire sign Aries",
    ],
    sections: {
      "personality-traits": [
        "Aries is the first sign of the zodiac — the archetypal Pioneer who meets life head-on. Born between March 21 and April 19, Aries carries cardinal fire energy: initiative, courage, and an instinct to begin what others only talk about. Ruled by Mars, the planet of action and desire, Aries people often feel most alive when they are moving toward a challenge, not waiting for permission.",
        "At their core, Aries natives are direct, honest, and refreshingly unfiltered. They tend to trust their gut before spreadsheets or second opinions, which makes them natural starters in creative projects, athletic pursuits, and leadership roles. Their keywords — leadership, courage, impulsiveness, pioneering — reflect a personality built for momentum rather than maintenance.",
        "Aries is not reckless by nature; they are responsive. When something matters, they respond quickly and fully. This can read as impatience to slower signs, but within Aries it is simply how vitality expresses itself. They process the world through action and competition, often discovering what they feel by doing rather than by sitting still and analyzing.",
      ],
      strengths: [
        "Bold initiative is the hallmark Aries gift. Where others hesitate at the threshold, Aries crosses it. This makes them exceptional in roles that require quick decisions, entrepreneurial risk, and the ability to rally people around a new direction. Their fearless authenticity also inspires loyalty — people know where they stand with an Aries.",
        "Natural leadership flows from Aries without forced authority. They lead by example, often out front physically and energetically. Combined with their cardinal modality, they excel at launching cycles: new teams, new products, new chapters. They are the spark that gets the engine turning.",
        "Aries strengths also include resilience under pressure. Mars does not teach retreat; it teaches strategic forward motion. After setbacks, Aries typically recovers faster than most because they refocus on the next objective rather than dwelling on the last defeat.",
      ],
      weaknesses: [
        "Impatience is the most cited Aries growth edge. When progress slows — whether in relationships, careers, or personal projects — frustration can boil over into blunt words or abrupt exits. Learning to distinguish between genuine stagnation and necessary incubation time helps Aries sustain what they start.",
        "Acting before thinking is another pattern to watch. The same speed that makes Aries effective in emergencies can create unnecessary conflict in delicate situations. Pausing to ask \"What outcome do I actually want?\" before responding transforms impulsive reactions into intentional choices.",
        "Burnout from overdrive affects many Aries natives who treat rest as optional. Mars energy is powerful but not infinite. Scheduling recovery — physical rest, unstructured play, and moments of stillness — prevents the crash that follows prolonged sprint mode.",
      ],
      "love-style": [
        "In love, Aries loves passionately and directly. They need a partner who matches their fire without trying to dim it — someone who appreciates honesty, adventure, and emotional transparency. Games and passive aggression drain Aries; they prefer clear signals and reciprocal enthusiasm.",
        "Aries often falls fast and expresses affection through action: planning dates, defending their partner, initiating difficult conversations rather than avoiding them. They are physically affectionate and thrive when romance includes shared challenges — travel, fitness, creative projects, or building something together.",
        "Long-term, Aries partners need independence within commitment. They are loyal when respected, but controlling dynamics trigger their fight-or-flight reflex. The healthiest Aries relationships balance excitement with trust, giving both people room to grow while maintaining a strong core connection.",
      ],
      "career-tendencies": [
        "Aries is built to lead, initiate, and break new ground. Roles with autonomy and challenge fuel them — entrepreneurship, sales leadership, emergency services, athletics, surgery, military strategy, and startup culture often fit their temperament. They perform best when metrics reward speed and results, not endless committee approval.",
        "Routine without purpose drains Aries quickly. They need visible impact and the freedom to improve systems rather than follow them blindly. Management that micromanages will lose an Aries employee; management that sets a goal and gets out of the way will earn their best work.",
        "Career growth for Aries often involves learning follow-through. Their gift is starting; their mastery comes when they develop systems — or partnerships with detail-oriented colleagues — that carry projects across the finish line. The Pioneer who also finishes becomes unstoppable.",
      ],
      friendships: [
        "Aries friends are fiercely loyal defenders who show up when it counts. They prefer small circles of trusted allies over large networks of acquaintances. Social energy is spent on people who match their directness and who do not take their blunt honesty personally.",
        "In group settings, Aries often becomes the one who suggests the plan, picks the restaurant, or organizes the adventure. They enjoy friendly competition — sports, games, debates — and friendships that include physical activity or shared goals tend to last longest.",
        "Aries can struggle with friends who need extensive emotional processing without moving toward solutions. They care deeply but express care through action: fixing the problem, driving over at midnight, confronting someone who hurt you. Learning to simply listen — without immediately solving — deepens their friendships with water and earth signs.",
      ],
      "ruling-planet-and-element": [
        "Aries is a cardinal fire sign ruled by Mars, the Roman god of war and the planet associated with drive, assertion, and physical vitality. Mars gives Aries its competitive edge, sexual charisma, and instinct to protect what matters. When Mars is prominent in a chart, themes of courage, conflict, and conquest intensify.",
        "Fire signs — Aries, Leo, Sagittarius — share warmth, inspiration, and action orientation. As the cardinal fire sign, Aries initiates the fire cycle: spark first, sustain later. This differs from fixed Leo (sustained radiance) and mutable Sagittarius (expansive flame). Aries fire is the match strike.",
        "Understanding Mars rulership helps explain why Aries responds to challenges as invitations rather than threats. Mars also connects Aries to the body — athleticism, physical confidence, and the need to channel anger constructively through movement, sport, or disciplined work.",
      ],
      compatibility: [
        "Aries tends to harmonize naturally with fellow fire signs Leo and Sagittarius, who share enthusiasm and appetite for life. Air signs Gemini and Aquarius also complement Aries well — air feeds fire with ideas, conversation, and social variety, creating dynamic partnerships full of movement and novelty.",
        "Earth signs Cancer and Capricorn can present growth-oriented friction for Aries. Cancer's need for emotional security and indirect communication may clash with Aries directness, while Capricorn's cautious, long-game strategy can feel like braking to an Aries who wants acceleration. These pairings work when both partners respect different tempos.",
        "Compatibility is never determined by sun sign alone. Moon, Venus, and Mars placements modify how Aries shows up in love and conflict. Two people with challenging sun sign pairings can thrive with supportive moon aspects, while easy sun pairings may struggle if deeper chart dynamics clash.",
      ],
      "in-the-birth-chart": [
        "Your sun in Aries describes core identity and conscious will — how you shine, choose, and pursue purpose. But an Aries sun with a Pisces moon feels different from an Aries sun with a Capricorn moon. The moon shapes emotional needs; the rising sign shapes first impressions and life approach.",
        "Aries rising individuals enter rooms with visible confidence and direct eye contact. They may be seen as leaders regardless of sun sign. Mars placement by house and sign shows where you fight, desire, and assert — Mars in the tenth house pushes career ambition; Mars in the seventh highlights partnership dynamics.",
        "Venus in Aries loves boldly and prefers pursuit to passivity. Mercury in Aries communicates quickly and decisively, sometimes before fully editing thoughts. Examining the full chart prevents reducing a complex person to a single archetype — the Pioneer is one chapter, not the whole book.",
      ],
    },
    faq: [
      {
        question: "What dates is Aries?",
        answer:
          "Aries season runs from approximately March 21 to April 19 each year, marking the astrological new year at the spring equinox in the Northern Hemisphere. Exact cusp dates vary slightly by year and timezone.",
      },
      {
        question: "What planet rules Aries?",
        answer:
          "Mars rules Aries, governing drive, courage, competition, and physical energy. Mars placement in your birth chart shows where you assert yourself and how you handle conflict and desire.",
      },
      {
        question: "Who is Aries most compatible with?",
        answer:
          "Aries often pairs well with Leo, Sagittarius, Gemini, and Aquarius — signs that match their energy or stimulate them intellectually. Earth signs Cancer and Capricorn may require more patience and communication but can offer grounding balance.",
      },
      {
        question: "What are Aries biggest weaknesses?",
        answer:
          "Common growth edges include impatience, acting before thinking, and burnout from sustained overdrive. Aries benefits from strategic pauses, delegation, and partners who help sustain projects after the initial launch.",
      },
      {
        question: "Is Aries only about being aggressive?",
        answer:
          "No. Aries courage includes initiating healing conversations, defending vulnerable people, and starting creative work others fear to attempt. Mars energy is assertion, not cruelty — how it expresses depends on the full chart and personal development.",
      },
      {
        question: "How is Aries different from other fire signs?",
        answer:
          "Aries is cardinal fire — the initiator. Leo is fixed fire, sustaining radiance and creative pride. Sagittarius is mutable fire, expanding through philosophy and exploration. Aries starts; Leo performs; Sagittarius teaches.",
      },
    ],
  },

  Taurus: {
    title: "Taurus Zodiac Sign: Personality, Love, Career & Compatibility",
    description:
      "Complete Taurus zodiac guide: fixed earth traits, Venus love style, career strengths, loyal friendships, best matches with Virgo and Capricorn, and birth chart nuance.",
    keywords: [
      "Taurus zodiac sign",
      "Taurus personality",
      "Taurus compatibility",
      "Venus ruling planet",
      "Taurus love style",
      "earth sign Taurus",
      "Taurus career",
    ],
    sections: {
      "personality-traits": [
        "Taurus, born April 20 through May 20, embodies the Builder archetype — steady, sensory, and deeply rooted in the physical world. As a fixed earth sign ruled by Venus, Taurus seeks stability, beauty, and tangible results. Where Aries rushes forward, Taurus evaluates whether the ground can hold what is being built.",
        "Taureans are known for loyalty, patience, and a refined relationship with comfort. Their keywords — stability, loyalty, comfort, sensuality — reflect a personality that values consistency over novelty for its own sake. They often have strong aesthetic instincts and notice texture, flavor, sound, and atmosphere that others overlook.",
        "Taurus moves deliberately. This is not laziness; it is conservation of energy for what truly matters. Once committed — to a person, job, or craft — Taurus demonstrates remarkable endurance. Change is not impossible for them, but it must prove its worth before they uproot what already works.",
      ],
      strengths: [
        "Unwavering loyalty defines Taurus at their best. Friends, partners, and employers who earn a Taurus trust receive steadfast devotion through difficulty. They do not abandon ship at the first storm; they reinforce the hull and keep sailing.",
        "Grounded wisdom comes from Taurus connection to the material world. They understand value — financial, emotional, and aesthetic — and make decisions that compound over time. Their patience allows investments, relationships, and skills to mature fully.",
        "Creating beauty and security is a creative strength. Taurus excels at making spaces feel safe and pleasurable: a well-cooked meal, a thoughtfully designed home, a garden that rewards years of care. They build environments where others can relax and thrive.",
      ],
      weaknesses: [
        "Resistance to change can become stagnation when Taurus stays in situations — jobs, relationships, habits — that no longer serve growth. Learning to distinguish between wise patience and fear-based inertia unlocks their next chapter.",
        "Stubbornness is the shadow of fixed modality. Once a Taurus opinion forms, shifting it requires evidence, not pressure. Partners and colleagues benefit from presenting change as enhancement rather than rejection of what Taurus already built.",
        "Holding on too long applies to possessions, grudges, and outdated self-concepts. Taurus attachment is powerful; releasing what is finished — physically or emotionally — prevents clutter from blocking new abundance.",
      ],
      "love-style": [
        "Taurus builds love slowly and deeply. Consistency and physical affection are primary love languages: touch, quality time, shared meals, and reliable presence matter more than grand verbal declarations. They show love by creating comfort and by being there year after year.",
        "Venus rulership gives Taurus romantic sensuality and appreciation for beauty in partners and environments. They are attracted to stability and authenticity — flashy drama without substance loses them quickly. Trust is built through repeated actions, not promises alone.",
        "In long-term partnership, Taurus needs security and respect for their pace. They are possessive only when anxious about loss; reassurance and honest communication dissolve jealousy. A partner who honors Taurus need for routine while occasionally introducing gentle novelty keeps the bond alive.",
      ],
      "career-tendencies": [
        "Taurus thrives where patience, craftsmanship, and long-term value are rewarded. Finance, agriculture, culinary arts, interior design, music, luxury goods, real estate, and skilled trades align with their talents. They prefer steady advancement over volatile gambles.",
        "Workplace stability matters. Frequent restructuring and ambiguous roles stress Taurus, who performs best with clear expectations and tangible outcomes. They are the colleague who maintains systems others neglect and who delivers quality without rushing.",
        "Leadership for Taurus is quiet and dependable rather than flashy. They lead by demonstrating competence and by protecting their team resources. Career growth often involves embracing calculated change — updating skills, negotiating fair compensation, and releasing roles that undervalue their loyalty.",
      ],
      friendships: [
        "Taurus friendships are durable and low-drama. They prefer regular, predictable contact — weekly coffee, annual traditions, standing dinner dates — over sporadic intense bursts. Loyalty runs deep; betraying a Taurus trust is difficult to repair.",
        "Socially, Taurus enjoys sensory pleasures with friends: concerts, wine tastings, hiking, cooking together. They are generous hosts who take pride in creating welcoming spaces. Quality over quantity defines their social circle.",
        "They may seem quiet in large groups but open fully with trusted friends. Taurus listens more than they perform, offering practical help — lending money carefully, fixing things, showing up with food during hard times — as expressions of care.",
      ],
      "ruling-planet-and-element": [
        "Venus rules Taurus, sharing rulership with Libra but expressing differently here. In Taurus, Venus governs physical pleasure, material abundance, art, and the body. Taurus Venus seeks to touch, taste, and possess beauty in tangible form.",
        "Earth signs — Taurus, Virgo, Capricorn — engage reality through practicality and persistence. Fixed earth makes Taurus the most immovable of the earth trigon: the fertile field that yields harvest after patient cultivation. Taurus earth is loam, not sand.",
        "The Taurus symbol, the Bull, reflects quiet strength and defensive power when provoked. Normally gentle, Taurus boundaries harden when pushed too far. Understanding this rhythm — calm persistence with rare but memorable firmness — explains much of Taurus interpersonal style.",
      ],
      compatibility: [
        "Taurus harmonizes with fellow earth signs Virgo and Capricorn through shared practicality and respect for commitment. Water signs Cancer and Pisces soften Taurus with emotional depth and creativity, forming nurturing pairs when both honor different processing speeds.",
        "Leo and Aquarius can challenge Taurus fixed nature. Leo desire for spotlight may compete with Taurus preference for quiet luxury, while Aquarius unpredictability can unsettle Taurus need for routine. Success requires explicit negotiation of lifestyle and values.",
        "Sun sign compatibility is a starting point. A Taurus with fire moon may crave more adventure than typical profiles suggest, while Taurus sun with heavy Aquarius placements may prioritize friendship over traditional romance. Always read the full chart.",
      ],
      "in-the-birth-chart": [
        "Sun in Taurus describes identity rooted in stability, self-worth, and sensory engagement with life. Moon sign modifies emotional needs: Taurus sun with Gemini moon intellectualizes comfort, while Taurus sun with Scorpio moon adds intensity beneath calm surfaces.",
        "Taurus rising presents as calm, attractive, and physically grounded. First impressions emphasize reliability and aesthetic sense regardless of inner sun sign complexity. Venus placement shows love style and values; Venus in Taurus doubles down on sensual loyalty.",
        "House placements reveal where Taurus energy concentrates. Second house themes — money, possessions, self-esteem — resonate naturally. Planets in Taurus in any house slow and stabilize that life area, rewarding patience and quality over speed.",
      ],
    },
    faq: [
      {
        question: "What are Taurus dates?",
        answer:
          "Taurus season spans approximately April 20 to May 20. People born on cusp days should verify their sun sign with a birth chart calculator using exact birth time and location.",
      },
      {
        question: "Why is Taurus considered stubborn?",
        answer:
          "Taurus is a fixed sign, astrologically wired for persistence and stability. What reads as stubbornness is often commitment to values already tested. They change when shown trustworthy evidence, not when rushed.",
      },
      {
        question: "What careers suit Taurus best?",
        answer:
          "Taurus excels in finance, design, culinary fields, agriculture, music, real estate, and any role rewarding craftsmanship and long-term results. They prefer stable environments with clear quality standards.",
      },
      {
        question: "How does Taurus show love?",
        answer:
          "Taurus expresses love through physical affection, consistent presence, gift-giving, and creating comfortable shared spaces. They demonstrate devotion over time rather than through dramatic speeches.",
      },
      {
        question: "Who is Taurus most compatible with?",
        answer:
          "Strong matches often include Virgo, Capricorn, Cancer, and Pisces. Leo and Aquarius pairings can work with mutual respect for different social and emotional rhythms.",
      },
      {
        question: "Is Taurus only about money and luxury?",
        answer:
          "No. Taurus values security and beauty, but their deeper drive is building lasting worth — in relationships, skills, and environments — not superficial status alone.",
      },
    ],
  },

  Gemini: {
    title: "Gemini Zodiac Sign: Personality, Love, Career & Compatibility",
    description:
      "Gemini zodiac sign guide: mutable air traits, Mercury communication style, love and career paths, Libra compatibility, growth edges, and full birth chart context.",
    keywords: [
      "Gemini zodiac sign",
      "Gemini personality",
      "Gemini compatibility",
      "Mercury ruling planet",
      "Gemini love style",
      "air sign Gemini",
      "Gemini career",
    ],
    sections: {
      "personality-traits": [
        "Gemini, spanning May 21 to June 20, is the Messenger of the zodiac — curious, articulate, and endlessly adaptable. Mutable air ruled by Mercury gives Gemini a mind that collects information, connects patterns, and reframes ideas faster than most signs can follow.",
        "Keywords like curiosity, communication, duality, and adaptability capture Gemini essence. They often juggle multiple interests simultaneously and feel bored when life narrows to a single track. This is not superficiality; it is cognitive hunger. Gemini learns by sampling widely before specializing.",
        "The Twins symbol reflects legitimate multiplicity within one person. Gemini can hold contradictory viewpoints, shift moods with context, and socialize differently across friend groups. Integration — naming which voice speaks when — is a lifelong Gemini task.",
      ],
      strengths: [
        "Quick wit and verbal agility make Gemini exceptional communicators. They excel in conversation, negotiation, teaching, and any role requiring translation between audiences — technical to layperson, artist to accountant, youth to elder.",
        "Versatile minds connect disparate ideas into fresh insights. Gemini sees bridges where others see walls, making them valuable in brainstorming, journalism, marketing, and innovation labs where cross-pollination drives breakthroughs.",
        "Adaptability allows Gemini to navigate change with less trauma than fixed signs. New cities, jobs, and social scenes energize rather than terrify them when basic intellectual stimulation is present.",
      ],
      weaknesses: [
        "Scattered focus dilutes Gemini impact when they commit to too many threads without closing any. Learning to finish one project before launching three more transforms versatility into mastery.",
        "Surface-level engagement can hurt partners and colleagues who crave depth. Gemini sometimes skims topics and people, moving on when novelty fades. Cultivating sustained attention — especially in relationships — deepens trust.",
        "Restlessness drives perpetual motion that masks anxiety or grief. Not every urge to change scenery is adventure; sometimes it is avoidance. Gemini grows by staying long enough to discover what lies beneath the initial boredom.",
      ],
      "love-style": [
        "Gemini needs intellectual chemistry in love. A partner who stimulates their mind — through debate, humor, shared learning, and unpredictable conversation — keeps their heart engaged. Physical attraction matters, but mental connection is the glue.",
        "They express affection through words: texts, letters, inside jokes, and playful banter. Silence without explanation frustrates Gemini; they prefer partners who communicate frequently and honestly, even when topics are difficult.",
        "Long-term Gemini love requires novelty within stability. Routine is fine if it includes weekly adventures, new books, travel plans, or creative projects together. Possessive partners who restrict social variety will trigger Gemini claustrophobia.",
      ],
      "career-tendencies": [
        "Writing, teaching, media, sales, technology, and any role involving ideas and connection suit Gemini mercurial gifts. They thrive in fast-paced environments with variety — consulting, journalism, podcasting, UX research, and multilingual work.",
        "Dual careers or portfolio professional lives appeal to many Geminis. Side projects are not distractions; they are oxygen. Employers who allow cross-functional movement retain Gemini talent longer than those boxing them into single repetitive tasks.",
        "Career growth involves depth alongside breadth. Gemini masters fields when they apply their curiosity systematically — certifications, focused mentorship, and deliberate practice — rather than relying on natural quickness alone.",
      ],
      friendships: [
        "Gemini collects friends across social worlds — work, hobbies, neighborhoods, online communities — and often connects people who would never meet otherwise. They are social facilitators who remember details and make introductions effortlessly.",
        "Friendship maintenance happens through communication. Regular messages, voice notes, and spontaneous plans keep bonds alive. Gemini friends are fun, informed, and willing to explore new restaurants, exhibits, and ideas on short notice.",
        "They struggle with friends who communicate primarily through subtext or long silent treatments. Gemini prefers explicit conversation and may need coaching to sit with emotions that cannot be immediately verbalized.",
      ],
      "ruling-planet-and-element": [
        "Mercury rules Gemini, governing language, logic, travel, and information processing. Mercury placement in a chart shows learning style and communication habits — Mercury in Gemini doubles verbal speed; Mercury in Capricorn adds structure to Gemini sun expression.",
        "Air signs — Gemini, Libra, Aquarius — live in the realm of ideas, social connection, and abstraction. Mutable air makes Gemini the most flexible air sign: breeze that shifts direction, carrying pollen between flowers. Gemini air is mobile, not stagnant.",
        "Understanding Mercury helps explain Gemini nervous system sensitivity. Mental overload manifests physically — insomnia, anxiety, digestive tension. Practices that slow the mind — meditation, journaling, limited news consumption — support Gemini health.",
      ],
      compatibility: [
        "Gemini pairs naturally with Libra and Aquarius, fellow air signs who prioritize conversation and social intelligence. Fire signs Aries and Leo add passion and adventure, feeding Gemini need for excitement and dynamic energy.",
        "Virgo and Pisces present classic growth tensions. Virgo may critique Gemini inconsistency, while Pisces emotional depth can overwhelm Gemini analytical style. These matches succeed when both honor different languages of care.",
        "Compatibility extends beyond sun signs. Venus and moon placements reveal whether Gemini intellectual love style aligns with a partner emotional needs. Chart synastry comparing Mercury aspects often predicts communication success better than sun sign alone.",
      ],
      "in-the-birth-chart": [
        "Sun in Gemini describes conscious identity as learner, connector, and communicator. Rising sign shapes social presentation; Gemini rising appears youthful, talkative, and quick regardless of sun sign. Moon sign shows emotional needs — Gemini moon processes feelings through words.",
        "Mercury house placement indicates where thinking concentrates: third house Mercury emphasizes siblings and local community; ninth house Mercury seeks philosophical and foreign study. Mars in Gemini fights with words and strategic debate.",
        "Hard aspects to Gemini planets may create mental restlessness or decision paralysis. Supportive aspects channel versatility into published work, teaching careers, or multilingual mastery. Never reduce Gemini to gossip stereotype — the Messenger carries sacred information.",
      ],
    },
    faq: [
      {
        question: "What dates is Gemini?",
        answer:
          "Gemini season runs approximately May 21 through June 20. Cusp births near Taurus or Cancer should confirm sun sign with an accurate birth chart tool.",
      },
      {
        question: "Are Geminis two-faced?",
        answer:
          "The Twins symbol reflects complexity, not dishonesty. Gemini holds multiple perspectives genuinely. Maturity involves transparent communication about shifting viewpoints rather than hiding contradictions.",
      },
      {
        question: "What planet rules Gemini?",
        answer:
          "Mercury rules Gemini, influencing communication, learning, travel, and mental processing. Mercury sign and house in your chart refine how Gemini sun expresses intellectually.",
      },
      {
        question: "Who is Gemini most compatible with?",
        answer:
          "Gemini often matches well with Libra, Aquarius, Aries, and Leo. Challenging pairings with Virgo and Pisces can thrive with patience and explicit emotional communication.",
      },
      {
        question: "Why do Geminis get bored easily?",
        answer:
          "Mutable air craves stimulation and novelty. Boredom signals unmet intellectual or social needs rather than character flaw. Structured variety — new skills within stable commitments — helps.",
      },
      {
        question: "What careers fit Gemini?",
        answer:
          "Journalism, teaching, marketing, tech, translation, podcasting, and sales suit Gemini strengths. Roles combining writing, speaking, and rapid learning maximize their Mercurial gifts.",
      },
    ],
  },

  Cancer: {
    title: "Cancer Zodiac Sign: Personality, Love, Career & Compatibility",
    description:
      "Cancer zodiac sign deep dive: cardinal water traits, Moon rulership, nurturing love style, career paths, Scorpio compatibility, growth edges, and birth chart layers.",
    keywords: [
      "Cancer zodiac sign",
      "Cancer personality",
      "Cancer compatibility",
      "Moon ruling planet",
      "Cancer love style",
      "water sign Cancer",
      "Cancer career",
    ],
    sections: {
      "personality-traits": [
        "Cancer, born June 21 through July 22, is the Nurturer — cardinal water guided by the Moon. Emotional intelligence, memory, and protective instinct define this sign. Cancer feels the atmosphere of a room before reading the agenda and remembers slights and kindnesses with equal clarity.",
        "Keywords — emotions, family, intuition, nurturing — reflect a personality oriented toward belonging and care. Cancer creates home wherever they land: not merely a physical address, but a felt sense of safety, ritual, and emotional continuity.",
        "Cardinal water initiates through feeling. Cancer starts families, communities, and traditions. They may appear shy initially, testing whether environments are safe before revealing depth. Once trust forms, their loyalty and empathy become foundational to everyone around them.",
      ],
      strengths: [
        "Deep empathy allows Cancer to sense unspoken pain and offer care precisely when needed. They excel in caregiving professions and in friendships where emotional attunement matters more than witty performance.",
        "Protective devotion makes Cancer fierce defenders of loved ones. They will sacrifice comfort, sleep, and resources to shield children, partners, friends, and even causes that feel like family.",
        "Emotional intelligence — reading subtext, remembering histories, navigating complex family dynamics — gives Cancer strategic social skill often underestimated because it expresses softly rather than dominantly.",
      ],
      weaknesses: [
        "Mood swings tied to lunar cycles and environmental stress can confuse partners who expect constant temperament. Cancer benefits from tracking emotional patterns and communicating when tides shift.",
        "Taking things personally amplifies minor slights into major wounds. Learning to distinguish intentional harm from neutral events reduces unnecessary suffering and conflict.",
        "Retreating into shell — silence, withdrawal, passive distance — protects Cancer but can abandon relationships mid-repair. Practicing direct vulnerability before full shutdown keeps connections alive.",
      ],
      "love-style": [
        "Cancer loves with whole soul. Home, family, and emotional safety are non-negotiable foundations for partnership. They invest in domestic life: cooking, remembering anniversaries, integrating partners into family systems, and building private worlds of intimacy.",
        "They need reassurance and reciprocity. One-sided emotional labor exhausts Cancer quickly. Partners who express appreciation, show up consistently, and respect their sensitivity thrive with them.",
        "Long-term Cancer love deepens through shared history. They rarely forget formative moments and honor relationship timelines with ritual. Betrayal of trust cuts deeply; repair requires sustained honesty and patience.",
      ],
      "career-tendencies": [
        "Caregiving, creative work, hospitality, real estate, therapy, education, and roles where emotional intelligence matters let Cancer shine. They excel when work feels like service to people they genuinely care about.",
        "Workplace culture affects Cancer productivity profoundly. Hostile or emotionally sterile environments drain them; supportive teams unlock loyalty and creative problem-solving. They remember colleagues birthdays and notice when someone is struggling.",
        "Financial security matters for Cancer peace of mind. They save instinctively and may choose stable income over risky ventures, especially when family depends on them. Career growth includes setting boundaries so caregiving at work does not erase self-care.",
      ],
      friendships: [
        "Cancer friendships resemble chosen family. They remember details — allergies, breakup anniversaries, favorite songs — and show love through practical nurture: meals, check-ins, guest rooms ready for crises.",
        "Social circles tend to be intimate rather than expansive. Cancer prefers depth with a few trusted souls over networking for its own sake. They are the friend who holds secrets and shows up at hospitals.",
        "They need friends who respect mood fluctuations without taking withdrawal personally. Direct invitation back into connection — gentle, not demanding — helps Cancer re-emerge from shell periods.",
      ],
      "ruling-planet-and-element": [
        "The Moon rules Cancer, governing cycles, memory, body rhythms, and the subconscious. Lunar transits affect Cancer more visibly than most signs — sleep, appetite, and mood often shift with moon phases.",
        "Water signs — Cancer, Scorpio, Pisces — navigate life through emotion, intuition, and empathy. Cardinal water makes Cancer the initiator of emotional bonds: the first to invite vulnerability, create tradition, or shelter others in storm.",
        "Cancer symbol, the Crab, carries home on its back and sidesteps when direct confrontation feels unsafe. Understanding this metaphor explains indirect communication patterns and the priority placed on secure base camps.",
      ],
      compatibility: [
        "Cancer harmonizes with Scorpio and Pisces, fellow water signs who respect emotional depth. Earth signs Taurus and Virgo offer practical stability and grounded affection that Cancer craves.",
        "Aries and Libra can challenge Cancer. Aries directness may bruise sensitive Cancer, while Libra intellectualized conflict avoidance may feel emotionally distant. Success requires explicit negotiation of needs and pacing.",
        "Moon sign compatibility often matters more for Cancer than sun sign alone. Two people with supportive moon-Venus links may thrive despite challenging sun combinations. Always examine emotional planets in synastry.",
      ],
      "in-the-birth-chart": [
        "Sun in Cancer describes identity tied to belonging, memory, and protective care. Cancer moon — regardless of sun — amplifies emotional sensitivity and home focus. Cancer rising presents as nurturing and approachable, sometimes motherly regardless of gender.",
        "Moon placement by house shows where emotional energy concentrates: fourth house moon emphasizes family roots; tenth house moon may seek public caregiving roles. Venus in Cancer loves protectively and nostalgically.",
        "Saturn or Pluto aspects to Cancer planets add complexity — guardedness, ancestral trauma, or profound resilience. Chart reading prevents reducing Cancer to moodiness stereotype; the Nurturer carries profound initiatory water power.",
      ],
    },
    faq: [
      {
        question: "What dates is Cancer?",
        answer:
          "Cancer season runs approximately June 21 to July 22, beginning at the summer solstice in the Northern Hemisphere. Verify cusp dates with a birth chart calculator.",
      },
      {
        question: "Why is the Moon Cancer ruling planet?",
        answer:
          "Traditional astrology assigns the Moon to Cancer, linking the sign to cycles, memory, nourishment, and emotional tides. The Moon placement colors how feelings express throughout any chart.",
      },
      {
        question: "Are Cancers overly sensitive?",
        answer:
          "Cancer sensitivity is attunement — reading environments and people accurately. Boundaries and self-care transform sensitivity from overwhelm into gift.",
      },
      {
        question: "Who is Cancer most compatible with?",
        answer:
          "Strong matches often include Scorpio, Pisces, Taurus, and Virgo. Aries and Libra relationships benefit from patience and clear emotional communication.",
      },
      {
        question: "What careers suit Cancer?",
        answer:
          "Nursing, therapy, teaching, hospitality, culinary arts, social work, and creative storytelling roles align with Cancer empathy and memory-driven skill.",
      },
      {
        question: "How does Cancer handle conflict?",
        answer:
          "Cancer may withdraw or respond indirectly when hurt. Direct, gentle honesty from partners helps them stay present. They forgive deeply when safety is restored.",
      },
    ],
  },

  Leo: {
    title: "Leo Zodiac Sign: Personality, Love, Career & Compatibility",
    description:
      "Leo zodiac sign guide: fixed fire personality, Sun rulership, generous love style, creative careers, Aries compatibility, pride growth edges, and chart depth.",
    keywords: [
      "Leo zodiac sign",
      "Leo personality",
      "Leo compatibility",
      "Sun ruling planet",
      "Leo love style",
      "fire sign Leo",
      "Leo career",
    ],
    sections: {
      "personality-traits": [
        "Leo, born July 23 through August 22, radiates the Sovereign archetype — fixed fire ruled by the Sun itself. Leo seeks expression, recognition, and creative selfhood. They enter spaces with warmth and expect to matter, not from arrogance alone but from genuine belief that life is meant to be lived visibly and generously.",
        "Keywords — creativity, confidence, recognition, generosity — map a personality that creates and shares. Leo wants their light to warm others, not blind them. They often excel at performance, mentorship, and leadership that elevates the whole group.",
        "Fixed fire sustains. Where Aries sparks and Sagittarius spreads, Leo maintains a steady blaze — loyal, dramatic when necessary, and committed to honoring their word once given. Leo identity ties closely to pride; wounded pride is their deepest vulnerability.",
      ],
      strengths: [
        "Magnetic presence draws people toward Leo naturally. They command attention without always trying and inspire others to show up more fully. Their confidence becomes contagious in teams and families.",
        "Creative fire fuels art, entertainment, entrepreneurship, and any domain requiring personal vision. Leo does not hide in anonymous labor; they sign their work and take ownership of outcomes.",
        "Loyal heart defines Leo friendship and partnership. They defend their people publicly, celebrate victories loudly, and remember loyalty long after others forget. Betrayal is unforgettable; devotion is equally lasting.",
      ],
      weaknesses: [
        "Need for validation can shift Leo from authentic expression to performance for applause. Growth involves creating for intrinsic joy and serving audiences without becoming dependent on constant praise.",
        "Pride blocks apologies and repair when Leo feels humiliated. Learning that vulnerability strengthens leadership — rather than weakening it — transforms relational conflict.",
        "Performing instead of being leads to exhaustion and hollow connections. Partners and friends want the person, not only the persona. Scheduled off-stage time helps Leo reconnect with unobserved self.",
      ],
      "love-style": [
        "Leo loves grandly and generously — gifts, public affection, protective gestures, and wholehearted celebration of partners. They need admiration and genuine appreciation in return, not flattery alone but noticed effort.",
        "Romance thrives on play, creativity, and shared spotlight. Leo enjoys being proud of their partner and being seen as part of an enviable team. They are loyal when respected and devastated by dismissive criticism.",
        "Long-term Leo love requires mutual recognition. Partners who cheer Leo dreams and receive equal enthusiasm thrive. Controlling or chronically critical partners trigger Leo withdrawal or dramatic exit.",
      ],
      "career-tendencies": [
        "Performance, leadership, creative industries, entertainment, branding, and any stage — literal or metaphorical — calls Leo. They excel when personal charisma and vision translate into measurable impact.",
        "Leo managers inspire through praise and clear standards. Micromanagement is unnecessary when loyalty is earned; Leo protects high performers and expects excellence in return. They struggle in invisible roles without creative outlet.",
        "Career mastery involves sharing credit and developing successors. The Sovereign who mentors other leaders multiplies influence beyond personal performance and builds lasting legacy.",
      ],
      friendships: [
        "Leo friends are enthusiastic cheerleaders and loyal defenders. They organize celebrations, remember milestones, and introduce friends to valuable connections. Social life often centers on shared fun and visible adventures.",
        "They prefer friends who reciprocate enthusiasm and honesty. One-sided admiration eventually feels empty; mutual respect and play sustain Leo friendships for decades.",
        "Leo can dominate group dynamics unconsciously. Practicing active listening and spotlight-sharing deepens bonds, especially with quieter friends who offer depth Leo might otherwise overlook.",
      ],
      "ruling-planet-and-element": [
        "The Sun rules Leo, symbolizing core identity, vitality, and purpose. Solar themes emphasize self-expression, life force, and the courage to be seen. Sun placement in any chart modifies how Leo sun radiates personally.",
        "Fixed fire makes Leo the sustained hearth — warmth that lasts through winter. Leo fire is creative and heart-centered rather than purely combative. Understanding solar rulership clarifies why rejection of Leo essence feels like existential dimming.",
        "Leo symbol, the Lion, reflects regal bearing and protective pride. The mane is both crown and vulnerability — Leo strength includes allowing trusted others behind the public roar.",
      ],
      compatibility: [
        "Leo harmonizes with Aries and Sagittarius, fellow fire signs sharing adventure and enthusiasm. Air signs Gemini and Libra stimulate Leo intellectually and socially, creating vibrant partnerships full of conversation and eventful living.",
        "Taurus and Scorpio may challenge Leo. Taurus resists Leo spending and drama; Scorpio power dynamics can clash with Leo need for visible control. These pairs succeed with explicit respect for different love languages.",
        "Synastry involving Sun, Venus, and moon reveals more than sun sign lists. Leo with supportive Saturn aspects may crave stability atypical of fire stereotypes. Read full charts before judging compatibility.",
      ],
      "in-the-birth-chart": [
        "Sun in Leo describes conscious identity as creator, leader, and heart-centered will. Leo rising shines regardless of sun sign — charismatic first impressions and performative ease. Moon in Leo needs emotional recognition and playful affection.",
        "House placement shows where Leo radiates: fifth house themes of romance and art feel natural; tenth house Leo seeks public legacy. Planets in Leo express dramatically in their house topics.",
        "Challenging aspects to Leo planets may create secret shame around visibility or compensatory arrogance. Healing involves safe spaces to be seen without judgment — therapy, creative communities, trusted partners.",
      ],
    },
    faq: [
      {
        question: "What dates is Leo?",
        answer:
          "Leo season spans approximately July 23 to August 22. Births near Cancer or Virgo cusps should confirm sun sign with exact birth data.",
      },
      {
        question: "Why is the Sun Leo ruling planet?",
        answer:
          "Astrology assigns the Sun to Leo as the sign of central identity, vitality, and creative self-expression. The Sun placement refines how Leo qualities manifest in any chart.",
      },
      {
        question: "Are Leos attention-seeking?",
        answer:
          "Leo seeks authentic expression and mutual recognition, not empty attention. They shine to inspire and connect. Healthy Leo channels visibility into generosity and leadership.",
      },
      {
        question: "Who is Leo most compatible with?",
        answer:
          "Leo often matches Aries, Sagittarius, Gemini, and Libra well. Taurus and Scorpio pairings require respect for different pacing and power styles.",
      },
      {
        question: "What careers fit Leo?",
        answer:
          "Entertainment, design, executive leadership, teaching, politics, and creative entrepreneurship suit Leo charisma. Roles allowing visible impact and personal vision maximize fulfillment.",
      },
      {
        question: "How does Leo handle criticism?",
        answer:
          "Leo may react strongly to public criticism or dismissive tone. Private, respectful feedback lands better. Their growth edge is separating ego from craft improvement.",
      },
    ],
  },

  Virgo: {
    title: "Virgo Zodiac Sign: Personality, Love, Career & Compatibility",
    description:
      "Virgo zodiac sign guide: mutable earth traits, Mercury precision, devoted love style, analytical careers, Taurus matches, perfectionism growth, birth chart nuance.",
    keywords: [
      "Virgo zodiac sign",
      "Virgo personality",
      "Virgo compatibility",
      "Mercury Virgo",
      "Virgo love style",
      "earth sign Virgo",
      "Virgo career",
    ],
    sections: {
      "personality-traits": [
        "Virgo, born August 23 through September 22, embodies the Alchemist — mutable earth refined by Mercury. Virgo discerns, improves, and serves. They notice what others miss: the typo, the inefficient process, the subtle shift in a friend's voice indicating distress.",
        "Keywords — perfectionism, analysis, service, precision — describe a mind that sorts, categorizes, and optimizes. Virgo seeks usefulness, not glory. Their identity often ties to competence and helpfulness rather than dramatic self-display.",
        "Mutable earth adapts practically. Virgo adjusts systems, diets, and routines incrementally toward better function. They are skeptical of untested hype and prefer evidence, craftsmanship, and repeatable results.",
      ],
      strengths: [
        "Keen discernment separates signal from noise. Virgo excels in editing, diagnostics, research, quality control, and any field where details determine outcomes. Their standards elevate collective work.",
        "Devoted service expresses love through practical help. Virgo shows up with solutions, schedules, and follow-through. They are the colleague who proofreads the deck before the client meeting.",
        "Practical wisdom accumulates through observation. Virgo learns from mistakes — theirs and others — and builds protocols that prevent recurrence. This makes them invaluable in healthcare, operations, and education.",
      ],
      weaknesses: [
        "Self-criticism erodes confidence and joy when perfection becomes identity rather than aspiration. Virgo grows by celebrating good-enough milestones and separating worth from flawless output.",
        "Overthinking paralyzes decision-making. Analysis loops delay action indefinitely. Time-boxing decisions and trusting body signals help Virgo move from rumination to implementation.",
        "Difficulty accepting imperfection in others creates harsh judgment and relational friction. Compassion practice — recognizing humanity in mess — softens Virgo edge without abandoning standards.",
      ],
      "love-style": [
        "Virgo shows love through acts of service — fixing, organizing, remembering preferences, managing logistics so partners can breathe. They need appreciation for invisible labor and partners who notice quiet devotion.",
        "They express affection practically more than poetically. Partners expecting constant verbal romance may miss Virgo care unless taught to read their language. Virgo loyalty is steady when respected, not flashy.",
        "Long-term Virgo love thrives with cleanliness agreements, shared routines, and honest feedback delivered kindly. Criticism without warmth wounds deeply; constructive partnership includes praise for effort, not only results.",
      ],
      "career-tendencies": [
        "Analysis, health, editing, data science, veterinary medicine, nutrition, and detail-oriented work align with Virgo nature. They excel where accuracy, ethics, and systematic improvement matter.",
        "Workplace chaos stresses Virgo physiology. Clear workflows, documented expectations, and meaningful quality metrics unlock productivity. They advocate for processes that protect clients and colleagues from preventable errors.",
        "Career growth involves delegating and trusting others imperfection. Virgo leaders multiply impact when they mentor rather than micromanage, building teams that meet standards without sole dependence on Virgo eyes.",
      ],
      friendships: [
        "Virgo friends offer reliable advice, practical help, and honest feedback. They remember health restrictions, help move apartments, and send articles relevant to your exact situation.",
        "Social circles may skew smaller and purpose-driven — book clubs, volunteer groups, professional networks. Virgo prefers meaningful interaction over idle gossip, though Mercury wit makes them sharp conversationalists.",
        "They need friends who do not interpret critique as rejection. Explicit appreciation for Virgo care — and gentle boundaries when advice is unsolicited — sustains long friendships.",
      ],
      "ruling-planet-and-element": [
        "Mercury rules Virgo alongside Gemini, but here Mercury expresses through earth: analytical, methodical, embodied. Virgo Mercury sorts reality into workable categories and language of improvement.",
        "Mutable earth makes Virgo the harvest season sign — gathering, assessing, preserving what nourishes and composting what does not. Virgo earth is fertile through refinement, not sheer accumulation.",
        "The Virgin symbol represents wholeness and selective purity, not prudishness alone. Virgo integrates body and mind, seeking clean systems in diet, work, and relationship ethics.",
      ],
      compatibility: [
        "Virgo pairs well with Taurus and Capricorn, fellow earth signs valuing reliability. Water signs Cancer and Scorpio add emotional depth and intuition that soften Virgo analytical style.",
        "Gemini and Sagittarius challenge Virgo. Gemini scatter contrasts Virgo order; Sagittarius blunt optimism may dismiss Virgo caution. These matches work when adventure and precision are negotiated explicitly.",
        "Mercury aspects in synastry predict communication ease. Virgo sun with fire moon may socialize more broadly than profiles suggest. Full chart reading essential.",
      ],
      "in-the-birth-chart": [
        "Sun in Virgo describes identity through service, skill, and discernment. Virgo rising appears competent, modest, and health-conscious regardless of sun sign. Moon in Virgo needs order and meaningful routine to feel safe.",
        "Mercury house and sign refine thinking style. Sixth house emphasis — daily work, health, habits — often prominent. Venus in Virgo loves carefully and shows affection through helpful acts.",
        "Neptune or Jupiter hard aspects may create confusion between idealism and critique. Virgo mastery integrates spiritual compassion with practical skill — the Alchemist transmuting lead into gold through patient work.",
      ],
    },
    faq: [
      {
        question: "What dates is Virgo?",
        answer:
          "Virgo season runs approximately August 23 to September 22. Verify cusp births with a chart calculator using birth time and location.",
      },
      {
        question: "Are Virgos perfectionists?",
        answer:
          "Virgo strives for improvement and precision, which can become perfectionism under stress. Healthy Virgo channels discernment into useful service without harsh self-judgment.",
      },
      {
        question: "How does Virgo show love?",
        answer:
          "Virgo expresses love through acts of service, reliability, health support, and practical problem-solving. They notice and address needs before being asked.",
      },
      {
        question: "Who is Virgo most compatible with?",
        answer:
          "Strong matches include Taurus, Capricorn, Cancer, and Scorpio. Gemini and Sagittarius pairings benefit from mutual respect for different rhythms.",
      },
      {
        question: "What careers suit Virgo?",
        answer:
          "Healthcare, editing, research, accounting, data analysis, nutrition, and quality assurance align with Virgo precision. Roles with clear ethical standards maximize satisfaction.",
      },
      {
        question: "Is Virgo the same as Gemini since both are Mercury-ruled?",
        answer:
          "Both are Mercury-ruled but express differently: Gemini is mutable air (breadth, conversation); Virgo is mutable earth (depth, refinement). Mercury sign and house personalize further.",
      },
    ],
  },

  Libra: {
    title: "Libra Zodiac Sign: Personality, Love, Career & Compatibility",
    description:
      "Libra zodiac sign guide: cardinal air harmony, Venus love style, diplomatic careers, Gemini compatibility, indecision growth edges, and birth chart beyond sun.",
    keywords: [
      "Libra zodiac sign",
      "Libra personality",
      "Libra compatibility",
      "Venus ruling planet",
      "Libra love style",
      "air sign Libra",
      "Libra career",
    ],
    sections: {
      "personality-traits": [
        "Libra, born September 23 through October 22, is the Harmonizer — cardinal air ruled by Venus. Libra seeks balance, beauty, and fair relationship. They weigh perspectives instinctively and feel physical discomfort in ugly or hostile environments.",
        "Keywords — harmony, relationships, balance, beauty — reflect social intelligence and aesthetic sensitivity. Libra often mediates conflict, designs elegant solutions, and champions justice as interpersonal equilibrium.",
        "Cardinal air initiates through connection. Libra starts partnerships, collaborations, and diplomatic processes. They may seem indecisive when honoring multiple valid viewpoints simultaneously — a feature of fairness, not weakness alone.",
      ],
      strengths: [
        "Diplomatic grace navigates tense rooms with tact. Libra excels in law, mediation, design, public relations, and any role requiring negotiation and aesthetic judgment.",
        "Aesthetic sensibility elevates environments and experiences. Libra notices proportion, color, and social choreography — making them natural curators, stylists, and hosts who put people at ease.",
        "Fair-mindedness anchors ethical decision-making when Libra trusts their inner scale. They advocate for marginalized voices when balance skews unjust, not only when conflict is comfortable.",
      ],
      weaknesses: [
        "Indecision delays action while Libra waits for perfect equilibrium that never arrives. Growth involves accepting good-enough choices and trusting capacity to adjust later.",
        "People-pleasing sacrifices authentic needs to preserve surface peace. Libra matures by naming preferences before resentment accumulates.",
        "Avoiding conflict allows problems to fester. Direct, kind confrontation — learned skill for Libra — prevents passive-aggressive explosions and relationship erosion.",
      ],
      "love-style": [
        "Partnership is central to Libra identity. They flourish with a true equal beside them — intellectually, socially, and aesthetically matched. Solo phases feel incomplete even when necessary for growth.",
        "Libra loves romance as art: thoughtful dates, beautiful settings, verbal affection, and social couple identity. They need reciprocity and hate feeling like the only one maintaining harmony.",
        "Long-term Libra love requires honest conflict resolution. Partners who discuss issues calmly and reaffirm commitment after disagreements earn Libra deepest trust.",
      ],
      "career-tendencies": [
        "Law, design, mediation, diplomacy, fashion, counseling, and roles requiring social intelligence suit Libra balanced nature. They excel when work involves pairing opposites into workable wholes.",
        "Workplace aesthetics and culture matter. Hostile or visually chaotic environments drain Libra focus. They contribute morale through fairness, team-building, and client-facing polish.",
        "Career growth includes decisive leadership — making calls when consensus is impossible. Libra executives thrive when they balance listening with timely authority.",
      ],
      friendships: [
        "Libra friends are charming connectors who introduce people across social worlds. They remember preferences, host gatherings, and seek fairness in group dynamics — who was invited, who was heard.",
        "Friendships thrive on mutual respect and shared beauty — museums, concerts, styled dinners. Libra avoids friends who thrive on drama or cruel gossip.",
        "They may struggle to choose between friend groups when schedules conflict. Honest communication about limits prevents overcommitment and guilt cycles.",
      ],
      "ruling-planet-and-element": [
        "Venus rules Libra, emphasizing partnership, art, and social grace. In Libra, Venus seeks symmetrical relationship and justice as beauty — fair treaties, elegant design, reciprocal affection.",
        "Cardinal air initiates ideas and social structures. Libra air is relational breeze — circulating through communities, carrying pollen between factions. Unlike Gemini information air, Libra air organizes connection.",
        "Scales symbol reflects weighing options and ethical measurement. Libra integrates opposites — self and other, beauty and truth — seeking dynamic balance rather than static perfection.",
      ],
      compatibility: [
        "Libra harmonizes with Gemini and Aquarius, fellow air signs sharing conversation and ideals. Fire signs Leo and Sagittarius add passion and adventure, energizing Libra social life.",
        "Cancer and Capricorn may challenge Libra. Cancer emotional indirectness frustrates Libra need for verbal clarity; Capricorn austerity may clash with Libra aesthetic values. Explicit lifestyle negotiation helps.",
        "Venus and seventh house themes deepen compatibility analysis. Libra sun with independent Aries moon may need more solitude than stereotypes suggest.",
      ],
      "in-the-birth-chart": [
        "Sun in Libra describes identity through relationship and aesthetic ideals. Libra rising appears charming and cooperative regardless of sun sign. Moon in Libra needs peaceful environments and partnership emotional support.",
        "Mars in Libra fights indirectly or for justice causes — passive resistance or advocacy rather than brute force. Saturn in Libra lessons involve boundaries and self-worth independent of partnership status.",
        "Chart stelliums in Scorpio or Aries modify Libra sun significantly. Never assume Libra is conflict-avoidant in all areas — house placements reveal where harmony work concentrates.",
      ],
    },
    faq: [
      {
        question: "What dates is Libra?",
        answer:
          "Libra season spans approximately September 23 to October 22. Confirm cusp births with an accurate natal chart calculator.",
      },
      {
        question: "Why is Libra indecisive?",
        answer:
          "Libra sees multiple valid perspectives and weighs fairness carefully. Decisiveness grows when they accept imperfection and prioritize values over unanimous approval.",
      },
      {
        question: "Who is Libra most compatible with?",
        answer:
          "Libra often matches Gemini, Aquarius, Leo, and Sagittarius. Cancer and Capricorn relationships work with clear communication about emotional and practical needs.",
      },
      {
        question: "What planet rules Libra?",
        answer:
          "Venus rules Libra, shaping love style, aesthetic values, and partnership priorities. Venus placement modifies Libra expression in every chart.",
      },
      {
        question: "What careers fit Libra?",
        answer:
          "Law, design, diplomacy, HR, fashion, couples therapy, and event planning suit Libra strengths in negotiation, beauty, and social intelligence.",
      },
      {
        question: "Do Libras need relationships to be happy?",
        answer:
          "Libra often orients toward partnership, but fulfillment also comes from art, justice work, and friendship. Healthy Libra balances selfhood with connection.",
      },
    ],
  },

  Scorpio: {
    title: "Scorpio Zodiac Sign: Personality, Love, Career & Compatibility",
    description:
      "Scorpio zodiac sign guide: fixed water depth, Pluto rulership, intense love style, healing careers, Cancer compatibility, trust growth edges, birth chart layers.",
    keywords: [
      "Scorpio zodiac sign",
      "Scorpio personality",
      "Scorpio compatibility",
      "Pluto ruling planet",
      "Scorpio love style",
      "water sign Scorpio",
      "Scorpio career",
    ],
    sections: {
      "personality-traits": [
        "Scorpio, born October 23 through November 21, embodies the Phoenix — fixed water transformed by Pluto (traditionally Mars). Scorpio penetrates surfaces, seeks truth, and regenerates after crisis. They sense hidden motives and rarely accept easy answers.",
        "Keywords — transformation, depth, intensity, mystery — map a personality comfortable with shadow, secrecy, and high-stakes emotion. Scorpio loyalty is legendary; Scorpio betrayal is equally unforgettable.",
        "Fixed water sustains feeling at depth. Where Cancer nurtures and Pisces dissolves boundaries, Scorpio concentrates emotion into power — psychological, sexual, financial, or spiritual. They are strategists of the inner world.",
      ],
      strengths: [
        "Emotional depth allows Scorpio to hold space for taboo topics — grief, desire, power, death — others avoid. They excel in therapy, crisis work, research, and investigative fields.",
        "Resilience through crisis defines Phoenix archetype. Scorpio rebuilds after loss with fewer illusions and greater strength. They model transformation for communities in transition.",
        "Penetrating insight reads people and systems accurately. Scorpio detects dishonesty quickly and values authentic intimacy over polite pretense.",
      ],
      weaknesses: [
        "Jealousy and possessiveness emerge when trust feels threatened. Scorpio grows by communicating fears before surveillance and control behaviors damage bonds.",
        "Control tendencies mask vulnerability. Letting partners see uncertainty — without weaponizing it — deepens intimacy Scorpio craves.",
        "Difficulty trusting prolongs isolation. Not everyone betrays; Scorpio heals by distinguishing past trauma from present partners through therapy and gradual vulnerability experiments.",
      ],
      "love-style": [
        "Scorpio craves soul-level intimacy. Surface connections leave them starving for truth. They bond through shared secrets, physical intensity, and loyalty tests that mature partners navigate with patience.",
        "All-or-nothing love style means Scorpio merges deeply or withdraws completely. They need partners who honor privacy, keep confidences, and match emotional honesty without games.",
        "Long-term Scorpio love transforms repeatedly — death and rebirth cycles within relationship. Partners willing to evolve together build unbreakable trust; stagnant dynamics trigger Scorpio exit.",
      ],
      "career-tendencies": [
        "Psychology, research, surgery, finance, cybersecurity, healing arts, and transformative work align with Scorpio regenerative power. They excel where discretion, intensity, and strategic thinking matter.",
        "Workplace politics do not fool Scorpio; they map power structures instinctively. They prefer roles with autonomy and access to hidden information — investigator, strategist, therapist, surgeon.",
        "Career growth involves sharing power and crediting collaborators. Scorpio leaders multiply impact when vulnerability replaces secrecy as default management style.",
      ],
      friendships: [
        "Scorpio friendships are few and sacred. They test loyalty over time and offer fierce protection once trust is earned. Betrayal ends friendships permanently in many cases.",
        "Social style is selective — deep late-night conversations over large parties. Scorpio friends remember secrets, advocate in crises, and expect reciprocal discretion.",
        "They benefit from friends who encourage joy and lightness without dismissing depth. Balance prevents Scorpio from drowning in perpetual intensity.",
      ],
      "ruling-planet-and-element": [
        "Pluto rules Scorpio in modern astrology, governing transformation, power, and the underworld. Traditional ruler Mars adds fight, desire, and courage. Together they explain Scorpio intensity and strategic passion.",
        "Fixed water makes Scorpio emotional ice that holds shape under pressure — deep lakes rather than flowing streams. Scorpio water concentrates; it does not scatter.",
        "Scorpion symbol reflects defensive sting and regenerative tail. Scorpio protects soft interior with sharp boundaries — understanding this prevents misreading silence as absence of care.",
      ],
      compatibility: [
        "Scorpio harmonizes with Cancer and Pisces, fellow water signs honoring emotional depth. Earth signs Virgo and Capricorn offer stability and practical loyalty Scorpio respects.",
        "Leo and Aquarius may challenge Scorpio. Leo need for public visibility clashes with Scorpio privacy; Aquarius detachment frustrates merging instinct. Success requires explicit agreements about space and expression.",
        "Pluto and Mars aspects in synastry intensify bonds. Sun sign alone cannot predict whether Scorpio depth feels supportive or suffocating — examine moon and Venus links.",
      ],
      "in-the-birth-chart": [
        "Sun in Scorpio describes identity through transformation, truth-seeking, and power awareness. Scorpio rising appears magnetic and guarded regardless of sun sign. Moon in Scorpio feels everything at maximum volume.",
        "Eighth house themes — shared resources, intimacy, inheritance — often prominent. Venus in Scorpio loves with intensity and tests loyalty unconsciously. Mercury in Scorpio speaks strategically and researches thoroughly.",
        "Chart healing work often addresses ancestral trauma and trust wounds. Scorpio mastery channels Plutonian power into healing others rather than controlling outcomes.",
      ],
    },
    faq: [
      {
        question: "What dates is Scorpio?",
        answer:
          "Scorpio season runs approximately October 23 to November 21. Verify cusp dates with birth time and location for accuracy.",
      },
      {
        question: "What planets rule Scorpio?",
        answer:
          "Pluto is Scorpio modern ruler; Mars is traditional ruler. Both contribute themes of desire, courage, transformation, and strategic intensity.",
      },
      {
        question: "Are Scorpios jealous?",
        answer:
          "Scorpio depth includes fear of betrayal, which can manifest as jealousy when trust is unsteady. Open communication and consistent loyalty reduce destructive patterns.",
      },
      {
        question: "Who is Scorpio most compatible with?",
        answer:
          "Strong matches include Cancer, Pisces, Virgo, and Capricorn. Leo and Aquarius pairings need clear boundaries around privacy and emotional expression.",
      },
      {
        question: "What careers suit Scorpio?",
        answer:
          "Therapy, research, surgery, finance, investigation, and crisis management align with Scorpio depth, discretion, and resilience.",
      },
      {
        question: "Is Scorpio the most intense sign?",
        answer:
          "Scorpio is associated with concentrated emotion and transformation, but intensity appears in every sign through different planets and aspects. Chart context matters.",
      },
    ],
  },

  Sagittarius: {
    title: "Sagittarius Zodiac Sign: Personality, Love, Career & Compatibility",
    description:
      "Sagittarius zodiac sign guide: mutable fire optimism, Jupiter rulership, adventurous love style, teaching careers, Aries compatibility, bluntness growth, chart depth.",
    keywords: [
      "Sagittarius zodiac sign",
      "Sagittarius personality",
      "Sagittarius compatibility",
      "Jupiter ruling planet",
      "Sagittarius love style",
      "fire sign Sagittarius",
      "Sagittarius career",
    ],
    sections: {
      "personality-traits": [
        "Sagittarius, born November 22 through December 21, is the Explorer — mutable fire expanded by Jupiter. Sagittarius seeks meaning, adventure, and truth. They ask big questions, travel far literally and philosophically, and infect others with optimism.",
        "Keywords — freedom, exploration, philosophy, optimism — describe a personality allergic to small thinking and cramped spaces. Sagittarius needs horizon lines: future plans, ethical frameworks, and experiences that broaden perspective.",
        "Mutable fire spreads inspiration. Where Aries initiates and Leo sustains performance, Sagittarius teaches, publishes, and connects dots across cultures. They are natural storytellers and sometimes blunt truth-tellers.",
      ],
      strengths: [
        "Expansive vision sees possibility where others see walls. Sagittarius excels in education, publishing, international work, and entrepreneurship requiring faith in uncertain outcomes.",
        "Philosophical mind integrates experience into wisdom. They help friends reframe setbacks as learning and communities articulate shared values during change.",
        "Infectious optimism mobilizes teams through difficulty. Sagittarius belief is not naive — it is chosen hope backed by experience that humans adapt.",
      ],
      weaknesses: [
        "Restlessness abandons projects and relationships when novelty fades. Sagittarius grows by distinguishing genuine misalignment from fear of depth.",
        "Bluntness wounds sensitive people when truth lacks tact. Learning delivery — timing, tone, context — preserves honesty while protecting connection.",
        "Commitment avoidance keeps Sagittarius free but lonely. Freedom within chosen bonds, not escape from all bonds, satisfies mature Sagittarius.",
      ],
      "love-style": [
        "Sagittarius needs a partner who is also fellow adventurer — travel, learning, shared ideals matter as much as chemistry. Freedom within love is essential; possessive partners trigger flight.",
        "They express affection through shared experiences and philosophical conversation. Grand romantic gestures matter less than planning the next journey together.",
        "Long-term Sagittarius love requires growth orientation. Partners who evolve intellectually and spiritually retain Sagittarius interest; stagnant dynamics prompt wandering attention.",
      ],
      "career-tendencies": [
        "Travel, education, publishing, law, coaching, and horizon-expanding work feed Sagittarius spirit. They excel when roles include teaching, speaking, or cross-cultural connection.",
        "Routine without meaning drains them. Sagittarius performs best with flexible schedules and missions aligned with personal ethics. Micromanagement feels like cage.",
        "Career mastery involves finishing what they preach — depth alongside breadth. Sagittarius authority grows when they commit to specialized expertise, not only inspirational overview.",
      ],
      friendships: [
        "Sagittarius friends are fun, honest, and culturally curious. They introduce you to new ideas, cuisines, and travel destinations and forgive easily when intentions are good.",
        "Friend groups span backgrounds and beliefs. Sagittarius enjoys debate without taking differences personally — unless core values are violated.",
        "They may forget plans or run late exploring side adventures. Friends who communicate boundaries clearly help Sagittarius show up without feeling caged.",
      ],
      "ruling-planet-and-element": [
        "Jupiter rules Sagittarius, governing expansion, faith, law, and higher learning. Jupiter placement shows where luck, growth, and excess concentrate in any chart.",
        "Mutable fire makes Sagittarius flame that travels — campfire stories, torch carried between villages. Sagittarius fire inspires rather than dominates.",
        "Archer symbol aims toward distant targets. Sagittarius misses sometimes, but direction matters more than perfect accuracy — they course-correct while moving.",
      ],
      compatibility: [
        "Sagittarius harmonizes with Aries and Leo, fellow fire signs sharing enthusiasm. Air signs Libra and Aquarius stimulate intellectually and socially, creating dynamic partnerships.",
        "Virgo and Pisces present growth tensions. Virgo detail focus may frustrate Sagittarius big picture; Pisces emotional absorption may overwhelm blunt Sagittarius. Mutual teaching sustains these pairs.",
        "Jupiter-Venus aspects in synastry enhance romance. Sagittarius sun with heavy Capricorn placements may be more cautious than typical profiles suggest.",
      ],
      "in-the-birth-chart": [
        "Sun in Sagittarius describes identity through exploration and belief systems. Sagittarius rising appears open, jovial, and restless regardless of sun sign. Moon in Sagittarius needs space and meaning to feel emotionally secure.",
        "Ninth house themes — travel, philosophy, publishing — resonate strongly. Mercury in Sagittarius speaks in big ideas, sometimes skipping steps. Venus in Sagittarius loves adventurously and idealistically.",
        "Saturn aspects to Sagittarius planets add discipline to expansion dreams. Chart reading prevents reducing Sagittarius to commitment-phobe stereotype — many build lasting institutions when purpose aligns.",
      ],
    },
    faq: [
      {
        question: "What dates is Sagittarius?",
        answer:
          "Sagittarius season spans approximately November 22 to December 21. Confirm cusp births with exact birth data.",
      },
      {
        question: "What planet rules Sagittarius?",
        answer:
          "Jupiter rules Sagittarius, influencing growth, optimism, travel, and philosophical outlook. Jupiter placement refines Sagittarius expression in every chart.",
      },
      {
        question: "Are Sagittarians commitment-phobic?",
        answer:
          "Sagittarius values freedom and may resist premature binding, but many commit deeply when partnership supports growth and adventure rather than restriction.",
      },
      {
        question: "Who is Sagittarius most compatible with?",
        answer:
          "Strong matches include Aries, Leo, Libra, and Aquarius. Virgo and Pisces relationships thrive with patience and complementary strengths.",
      },
      {
        question: "What careers suit Sagittarius?",
        answer:
          "Teaching, travel, publishing, coaching, international business, and law align with Sagittarius love of expansion, truth, and cross-cultural connection.",
      },
      {
        question: "Why are Sagittarians so blunt?",
        answer:
          "Mutable fire prioritizes truth and efficiency in communication. Maturity adds tact without sacrificing honesty — learning when silence serves love.",
      },
    ],
  },

  Capricorn: {
    title: "Capricorn Zodiac Sign: Personality, Love, Career & Compatibility",
    description:
      "Capricorn zodiac sign guide: cardinal earth ambition, Saturn rulership, loyal love style, leadership careers, Taurus compatibility, workaholism growth, birth chart nuance.",
    keywords: [
      "Capricorn zodiac sign",
      "Capricorn personality",
      "Capricorn compatibility",
      "Saturn ruling planet",
      "Capricorn love style",
      "earth sign Capricorn",
      "Capricorn career",
    ],
    sections: {
      "personality-traits": [
        "Capricorn, born December 22 through January 19, is the Architect — cardinal earth structured by Saturn. Capricorn builds legacy through discipline, responsibility, and long horizons. They respect time, hierarchy when earned, and results that compound.",
        "Keywords — ambition, discipline, responsibility, structure — describe a personality oriented toward achievement and maturity. Capricorn often seems older than their years in youth and younger in later life as rules relax.",
        "Cardinal earth initiates materially. Capricorn starts companies, families, institutions, and reputations. They climb mountains slowly, measuring oxygen and planning camps rather than sprinting recklessly.",
      ],
      strengths: [
        "Strategic thinking maps multi-year paths with realistic milestones. Capricorn excels in executive leadership, finance, engineering, governance, and any domain requiring patience.",
        "Unshakeable discipline sustains effort when motivation fades. They show up on hard days and model reliability for teams and families.",
        "Long-term vision prioritizes sustainable success over flashy shortcuts. Capricorn builds monuments — careers, communities, wealth — meant to outlast trends.",
      ],
      weaknesses: [
        "Workaholism substitutes achievement for emotional needs. Capricorn grows by scheduling rest, play, and intimacy as seriously as meetings.",
        "Emotional suppression creates distance in relationships. Naming feelings — even inefficiently — prevents coldness mistaken for absence of care.",
        "Harsh self-judgment erodes joy after milestones. Celebrating wins before chasing the next summit heals Capricorn chronic insufficiency.",
      ],
      "love-style": [
        "Capricorn loves through commitment and reliability — keeping promises, building shared security, planning futures concretely. They demonstrate devotion with actions over poetry.",
        "They need partners who respect ambition and understand seasonal busyness without interpreting it as rejection. Capricorn loyalty deepens over years of proven partnership.",
        "Long-term Capricorn love includes private softness behind public composure. Partners who create safe space for vulnerability unlock warmth few outsiders see.",
      ],
      "career-tendencies": [
        "Leadership, business, law, architecture, administration, and mastery paths suit Capricorn mountain-climbing soul. They excel when promotion ties to demonstrated competence.",
        "Capricorn managers set clear expectations and reward performance fairly. They tolerate little chaos and invest in mentees who show discipline.",
        "Career growth involves delegating and trusting joy. Capricorn legacy expands when they build institutions that function without their constant presence.",
      ],
      friendships: [
        "Capricorn friendships are loyal, low-maintenance, and long-lasting. They show up for crises with practical help — logistics, money advice, introductions — rather than only emotional words.",
        "Social circles often include professional peers and longtime allies. Capricorn prefers scheduled contact over spontaneous chaos but deeply values history.",
        "They relax with friends who humor their dry wit and do not pressure constant emotional disclosure. Trust builds slowly then solidifies permanently.",
      ],
      "ruling-planet-and-element": [
        "Saturn rules Capricorn, governing structure, time, karma, and mastery through limitation. Saturn placement shows where effort, fear, and authority concentrate in any chart.",
        "Cardinal earth initiates practical structures — foundations, governments, savings accounts. Capricorn earth is bedrock, not sand; slow to move, immovable when set.",
        "Sea-goat symbol climbs from ocean to summit, integrating emotion with ambition. Capricorn success includes integrating feeling life, not conquering it.",
      ],
      compatibility: [
        "Capricorn harmonizes with Taurus and Virgo, fellow earth signs sharing stability. Water signs Scorpio and Pisces add emotional depth and intuition Capricorn secretly craves.",
        "Aries and Libra may challenge Capricorn. Aries speed frustrates Capricorn caution; Libra indecision irritates Capricorn decisiveness when deadlines loom. Respect for tempo differences helps.",
        "Saturn aspects in synastry reveal long-term durability. Capricorn sun with fire moon may socialize more actively than profiles suggest.",
      ],
      "in-the-birth-chart": [
        "Sun in Capricorn describes identity through achievement, integrity, and mature responsibility. Capricorn rising appears competent and reserved regardless of sun sign. Moon in Capricorn needs structure and respect to feel safe.",
        "Tenth house themes — career, public reputation — often prominent. Venus in Capricorn loves cautiously and values status compatibility carefully. Mars in Capricorn fights strategically for long-term goals.",
        "Uranus or Pluto transits to Capricorn planets trigger legacy rewrites. Chart reading honors Capricorn depth beyond workhorse stereotype.",
      ],
    },
    faq: [
      {
        question: "What dates is Capricorn?",
        answer:
          "Capricorn season runs approximately December 22 to January 19. Winter solstice marks Capricorn beginning in the Northern Hemisphere.",
      },
      {
        question: "What planet rules Capricorn?",
        answer:
          "Saturn rules Capricorn, teaching mastery through discipline, limits, and time. Saturn placement shows life lessons and authority themes in every chart.",
      },
      {
        question: "Are Capricorns workaholics?",
        answer:
          "Capricorn often prioritizes achievement and responsibility, which can become overwork without boundaries. Scheduled rest and relationships restore balance.",
      },
      {
        question: "Who is Capricorn most compatible with?",
        answer:
          "Strong matches include Taurus, Virgo, Scorpio, and Pisces. Aries and Libra pairings benefit from mutual respect for different pacing.",
      },
      {
        question: "How does Capricorn show love?",
        answer:
          "Capricorn demonstrates love through loyalty, practical support, long-term planning, and building shared security rather than constant verbal affirmation.",
      },
      {
        question: "What careers suit Capricorn?",
        answer:
          "Executive leadership, finance, law, engineering, government, and skilled trades requiring mastery align with Capricorn discipline and strategic patience.",
      },
    ],
  },

  Aquarius: {
    title: "Aquarius Zodiac Sign: Personality, Love, Career & Compatibility",
    description:
      "Aquarius zodiac sign guide: fixed air innovation, Uranus rulership, friendship-first love, tech careers, Gemini compatibility, detachment growth, birth chart layers.",
    keywords: [
      "Aquarius zodiac sign",
      "Aquarius personality",
      "Aquarius compatibility",
      "Uranus ruling planet",
      "Aquarius love style",
      "air sign Aquarius",
      "Aquarius career",
    ],
    sections: {
      "personality-traits": [
        "Aquarius, born January 20 through February 18, is the Visionary — fixed air electrified by Uranus (traditionally Saturn). Aquarius innovates, humanizes, and thinks in futures. They often feel slightly ahead of or outside their time.",
        "Keywords — innovation, individuality, vision, humanity — reflect intellectual independence and concern for collective welfare. Aquarius can love humanity abstractly while struggling with messy individual intimacy.",
        "Fixed air sustains ideas. Aquarius commits to principles, friendships, and causes with surprising stubbornness beneath progressive reputation. They are reformers who also resist pressure to conform personally.",
      ],
      strengths: [
        "Original thinking generates solutions others dismiss as impossible until Aquarius builds them. They excel in technology, science, activism, and community design.",
        "Humanitarian vision connects personal talent to collective need. Aquarius mobilizes networks for social change and inclusive systems.",
        "Intellectual independence resists peer pressure and trendy thought. They question assumptions ethically, not merely to rebel.",
      ],
      weaknesses: [
        "Emotional detachment protects Aquarius from overwhelm but isolates them from partners needing warmth. Learning somatic and emotional literacy deepens connection.",
        "Rebellion for its own sake wastes energy. Aquarius matures by choosing battles aligned with values, not every available fight.",
        "Feeling misunderstood becomes self-fulfilling when Aquarius hides authentic needs behind eccentric persona. Vulnerability invites recognition.",
      ],
      "love-style": [
        "Aquarius needs friendship at the core of romance — a partner who respects uniqueness and shares ideals. Possessive or traditional scripts feel suffocating.",
        "They express love through loyalty, intellectual companionship, and supporting partners freedom. Grand emotional displays may be rare; consistent alliance is their signature.",
        "Long-term Aquarius love thrives with space, shared causes, and honest unconventional agreements. Partners who treat them as equals in ideas and autonomy last decades.",
      ],
      "career-tendencies": [
        "Technology, activism, innovation, research, astronomy, social enterprise, and future-oriented work align with Aquarius visionary mind. They excel in teams solving systemic problems.",
        "Hierarchical workplaces stifle Aquarius unless merit and mission outweigh politics. They advocate for inclusive policies and often become unofficial culture changers.",
        "Career growth involves integrating emotional intelligence with systems thinking. Aquarius leaders inspire when they connect data to human stories.",
      ],
      friendships: [
        "Aquarius friendships are diverse, ideological, and long-lasting. They network across differences and remember friends as chosen family of the future.",
        "Social life includes groups — clubs, movements, online communities — more than dyadic intensity alone. Aquarius introduces friends to big ideas and mutual aid.",
        "They need friends who accept periodic disappearance during project hyperfocus. Gentle re-entry invitations beat guilt trips.",
      ],
      "ruling-planet-and-element": [
        "Uranus rules Aquarius in modern astrology, governing revolution, technology, and sudden insight. Saturn as traditional ruler adds structure to innovation — blueprints for utopia.",
        "Fixed air makes Aquarius sustained wind — jet stream, not puff. Ideas persist and circulate through communities Aquarius builds.",
        "Water-bearer symbol pours knowledge for collective thirst. Aquarius gifts are meant to be shared, not hoarded for status.",
      ],
      compatibility: [
        "Aquarius harmonizes with Gemini and Libra, fellow air signs sharing intellect and social breadth. Fire signs Aries and Sagittarius add passion and adventure Aquarius enjoys.",
        "Taurus and Scorpio may challenge Aquarius. Taurus routine clashes with Aquarius change; Scorpio intensity overwhelms detached Aquarius. Explicit agreements about pace and privacy help.",
        "Uranus-heavy synastry creates electric bonds or sudden breaks. Moon compatibility predicts emotional sustainability better than sun sign lists alone.",
      ],
      "in-the-birth-chart": [
        "Sun in Aquarius describes identity through ideals, innovation, and community. Aquarius rising appears unique and friendly-aloof regardless of sun sign. Moon in Aquarius processes feelings intellectually first.",
        "Eleventh house themes — friends, networks, hopes — resonate strongly. Venus in Aquarius loves unconventionally and values mental connection. Mars in Aquarius fights for causes and freedom.",
        "Heavy water placements modify Aquarius sun significantly. Never assume all Aquarians avoid emotion — chart context reveals private depth.",
      ],
    },
    faq: [
      {
        question: "What dates is Aquarius?",
        answer:
          "Aquarius season spans approximately January 20 to February 18. Verify cusp births with a natal chart calculator.",
      },
      {
        question: "What planets rule Aquarius?",
        answer:
          "Uranus is Aquarius modern ruler; Saturn is traditional ruler. Together they blend innovation with structure and long-term social responsibility.",
      },
      {
        question: "Are Aquarians emotionally cold?",
        answer:
          "Aquarius processes feelings intellectually and may need space, but they care deeply about people and principles. Emotional skills vary by full chart and life experience.",
      },
      {
        question: "Who is Aquarius most compatible with?",
        answer:
          "Strong matches include Gemini, Libra, Aries, and Sagittarius. Taurus and Scorpio relationships work with clear boundaries and mutual respect.",
      },
      {
        question: "What careers suit Aquarius?",
        answer:
          "Technology, science, activism, social entrepreneurship, research, and community organizing align with Aquarius vision and systems thinking.",
      },
      {
        question: "Why is Aquarius called the water bearer?",
        answer:
          "The symbol represents pouring knowledge and life-giving insight to humanity — metaphorical water, not water element. Aquarius is an air sign.",
      },
    ],
  },

  Pisces: {
    title: "Pisces Zodiac Sign: Personality, Love, Career & Compatibility",
    description:
      "Pisces zodiac sign guide: mutable water intuition, Neptune rulership, soulful love style, creative careers, Cancer compatibility, boundary growth, birth chart depth.",
    keywords: [
      "Pisces zodiac sign",
      "Pisces personality",
      "Pisces compatibility",
      "Neptune ruling planet",
      "Pisces love style",
      "water sign Pisces",
      "Pisces career",
    ],
    sections: {
      "personality-traits": [
        "Pisces, born February 19 through March 20, is the Mystic — mutable water dissolved in Neptune (traditionally Jupiter). Pisces feels collectively, imagines boundlessly, and navigates liminal spaces between worlds. They absorb atmospheres like sponges.",
        "Keywords — intuition, imagination, empathy, spirituality — map a personality oriented toward compassion and transcendence. Pisces often artistically gifted, psychically sensitive, or drawn to healing professions.",
        "Mutable water adapts emotionally. Pisces shape-shifts to comfort others, sometimes losing outline of self. Boundaries and creative containers transform sensitivity from burden to gift.",
      ],
      strengths: [
        "Boundless compassion serves suffering others without judgment. Pisces excels in nursing, therapy, music, film, spiritual counseling, and charity work.",
        "Creative imagination generates art that moves collective emotion — songs, stories, images that name what logic cannot.",
        "Psychic sensitivity reads environments and people accurately when grounded. Pisces intuition becomes reliable skill with practice and protection rituals.",
      ],
      weaknesses: [
        "Escapism through fantasy, substances, or overwork avoids pain that needs processing. Pisces grows by facing grief with support rather than numbing.",
        "Boundary issues merge self with others pain until depletion. Learning no as sacred protects capacity to serve sustainably.",
        "Absorbing others pain without filtration causes confusion about whose feelings are whose. Grounding practices — water, solitude, art — restore clarity.",
      ],
      "love-style": [
        "Pisces loves with transcendent depth — merging souls, romantic idealism, spiritual union language. They see partners potential and sometimes overlook present reality.",
        "They express affection through empathy, art, sacrifice, and intuitive care. Harsh criticism crushes Pisces; gentle honesty preserves trust.",
        "Long-term Pisces love requires partners who anchor without controlling — helping distinguish fantasy from fact while honoring emotional and creative life.",
      ],
      "career-tendencies": [
        "Arts, healing, spirituality, film, music, psychology, and creative expression channel Pisces oceanic sensitivity. They excel when work feels like calling, not only paycheck.",
        "Structured corporate environments drain Pisces unless mission aligns spiritually. They need flexible schedules and managers who respect nonlinear productivity.",
        "Career growth involves financial and practical skills alongside gifts. Pisces mastery includes building containers — agents, budgets, routines — so art and service survive market realities.",
      ],
      friendships: [
        "Pisces friends offer nonjudgmental listening and creative inspiration. They remember dreams, play music that matches your mood, and show up spiritually during grief.",
        "Friendships may include artists, healers, and fellow sensitive souls. Pisces avoids harsh competitive environments but welcomes gentle co-creation.",
        "They need friends who encourage boundaries and celebrate Pisces without exploiting their giving nature. Reciprocal care sustains decades-long bonds.",
      ],
      "ruling-planet-and-element": [
        "Neptune rules Pisces in modern astrology, governing dreams, illusion, spirituality, and dissolution. Jupiter as traditional ruler adds faith, expansion, and philosophical compassion.",
        "Mutable water makes Pisces mist, ocean, and river simultaneously — adapting form while remaining essentially water. Pisces emotion flows around obstacles rather than crashing through.",
        "Two fish symbol swimming opposite directions reflects worldly and spiritual pulls. Integration — not choosing one fish — is Pisces life task.",
      ],
      compatibility: [
        "Pisces harmonizes with Cancer and Scorpio, fellow water signs honoring depth. Earth signs Taurus and Capricorn offer grounding and practical stability Pisces needs.",
        "Gemini and Sagittarius may challenge Pisces. Gemini detachment frustrates merging instinct; Sagittarius bluntness bruises sensitivity. These pairs thrive with explicit emotional protocols.",
        "Neptune aspects in synastry create soulmate illusions or spiritual bonds. Saturn contacts ground Pisces romance in workable daily life.",
      ],
      "in-the-birth-chart": [
        "Sun in Pisces describes identity through compassion, imagination, and spiritual seeking. Pisces rising appears soft, dreamy, and approachable regardless of sun sign. Moon in Pisces feels collectively and needs creative or spiritual outlet.",
        "Twelfth house themes — solitude, unconscious, service — often prominent. Venus in Pisces loves romantically and idealistically. Mars in Pisces fights indirectly or for compassionate causes.",
        "Strong earth placements modify Pisces sun with practicality. Chart reading prevents reducing Pisces to victim stereotype — many are resilient healers and accomplished artists.",
      ],
    },
    faq: [
      {
        question: "What dates is Pisces?",
        answer:
          "Pisces season runs approximately February 19 to March 20, closing the zodiac wheel before Aries begins again at the spring equinox.",
      },
      {
        question: "What planets rule Pisces?",
        answer:
          "Neptune is Pisces modern ruler; Jupiter is traditional ruler. Together they blend spirituality, compassion, imagination, and expansive faith.",
      },
      {
        question: "Are Pisces psychic?",
        answer:
          "Pisces often reports strong intuition and environmental sensitivity. Skills vary by chart and practice; grounding turns sensitivity into reliable insight.",
      },
      {
        question: "Who is Pisces most compatible with?",
        answer:
          "Strong matches include Cancer, Scorpio, Taurus, and Capricorn. Gemini and Sagittarius pairings benefit from gentle communication and shared growth work.",
      },
      {
        question: "What careers suit Pisces?",
        answer:
          "Music, film, nursing, therapy, spiritual counseling, charity work, and fine arts align with Pisces empathy and imagination.",
      },
      {
        question: "How can Pisces set better boundaries?",
        answer:
          "Regular solitude, creative outlets, saying no without guilt, and partners who respect limits help Pisces serve others without self-erasure.",
      },
    ],
  },
};

/** Extra paragraphs per section to meet depth targets for longer-form pillar pages */
const SECTION_SUPPLEMENTS: Partial<
  Record<ZodiacSign, Partial<Record<SectionId, string[]>>>
> = {
  Gemini: {
    "personality-traits": [
      "Gemini season bridges spring and summer — a liminal moment reflected in their comfort with transitions. They often excel in roles requiring code-switching between audiences and translating specialized knowledge for general readers.",
    ],
    strengths: [
      "Gemini learns languages, tools, and social codes quickly, making them valuable during organizational change when teams need agile communicators who can document processes while relationships stay intact.",
    ],
    weaknesses: [
      "When overwhelmed, Gemini may talk faster rather than pause — flooding conversations with information to avoid feeling. Breath work and deliberate listening exercises restore conversational quality.",
    ],
    "love-style": [
      "Gemini partners appreciate shared playlists, book exchanges, and inside references that evolve over years. Memory games and verbal affection sustain intimacy when physical distance or busy schedules intervene.",
    ],
    "career-tendencies": [
      "Hybrid remote roles suit Gemini especially well: variety of clients, flexible hours, and digital communication channels align with Mercurial rhythm without forcing false extroversion in static offices.",
    ],
    friendships: [
      "Gemini remembers friends' niche interests and sends articles, podcast episodes, or event links unprompted — a love language of curation that keeps distant friendships feeling active and intellectually alive.",
    ],
    "ruling-planet-and-element": [
      "Retrograde Mercury periods affect Gemini strongly — backup plans for travel, contracts, and devices reduce stress. Treating these cycles as review seasons rather than catastrophe improves mental health.",
    ],
    compatibility: [
      "Gemini with earth moon partners often balances scatter with grounding; with water moon partners, emotional depth increases when Gemini learns to stay present during feelings that cannot be immediately named.",
    ],
    "in-the-birth-chart": [
      "Saturn aspecting Gemini planets adds discipline to curiosity — researchers, editors, and technical writers often carry this signature. Jupiter aspects expand publishing luck and teaching opportunities.",
    ],
  },
  Cancer: {
    "personality-traits": [
      "Cancer memory is relational — they recall how events felt and who was present, making them natural historians of family and team culture. This gift supports genealogy, oral storytelling, and preserving institutional wisdom.",
    ],
    strengths: [
      "In crisis, Cancer organizes care networks efficiently — meal trains, childcare swaps, fundraising — translating empathy into logistics that actually help rather than performative concern alone.",
    ],
    weaknesses: [
      "Cancer may confuse comfort with control when protecting loved ones, especially children or vulnerable friends. Allowing others to choose their own risks — within reason — respects autonomy Cancer genuinely values.",
    ],
    "love-style": [
      "Seasonal rituals anchor Cancer partnerships: holiday traditions, anniversary trips to meaningful places, and photo albums that document shared history reinforce bonds during stressful career or family transitions.",
    ],
    "career-tendencies": [
      "Cancer excels in client retention roles because they remember preferences and follow up sincerely. Customer success, account management, and patient relations benefit from Cancer relational memory.",
    ],
    friendships: [
      "Cancer friends often host the gatherings where quieter members feel included — noticing who has not spoken and gently drawing them in without spotlight pressure.",
    ],
    "ruling-planet-and-element": [
      "Tracking moon phases in a journal helps Cancer anticipate energy shifts and communicate needs proactively to partners who might otherwise misread withdrawal as rejection.",
    ],
    compatibility: [
      "Cancer with fire sun partners often provides emotional anchoring while receiving motivation and courage. Explicit appreciation of each other's elemental gifts prevents resentment over different pacing.",
    ],
    "in-the-birth-chart": [
      "Fourth house stelliums intensify home and ancestry themes regardless of sun sign. Cancer planets in the tenth house may express nurture publicly — through leadership, politics, or visible caregiving professions.",
    ],
  },
  Leo: {
    "personality-traits": [
      "Leo season coincides with high summer in the Northern Hemisphere — a symbolic peak that mirrors their desire to live fully and visibly. They often inspire others to take creative risks by modeling courageous self-expression.",
    ],
    strengths: [
      "Leo generosity extends to mentorship: many successful Leos remember who believed in them early and pay forward through scholarships, introductions, and public praise of emerging talent.",
    ],
    weaknesses: [
      "Comparison steals Leo joy when social media highlights others' wins. Curating feeds, celebrating offline achievements, and limiting envy triggers protect creative confidence.",
    ],
    "love-style": [
      "Leo partners thrive on planned celebrations — not only birthdays but promotion dinners, recovery milestones, and arbitrary Tuesdays marked special because the relationship deserves joy.",
    ],
    "career-tendencies": [
      "Leo builds personal brand naturally; ethical use of visibility — advocating for causes, spotlighting team wins — turns charisma into leadership capital rather than narcissism.",
    ],
    friendships: [
      "Leo friends defend loyalty fiercely in group settings. If someone disparages a friend who is not present, Leo often intervenes — sometimes dramatically — to uphold honor codes they take seriously.",
    ],
    "ruling-planet-and-element": [
      "Solar returns — the annual moment when the sun returns to natal degree — are natural Leo reflection points for setting creative and leadership intentions for the year ahead.",
    ],
    compatibility: [
      "Leo with air partners often enjoys social couple identity — events, launches, collaborative content — while earth partners ground Leo spending and help translate vision into sustainable plans.",
    ],
    "in-the-birth-chart": [
      "Sun aspects to outer planets add complexity: Uranus sun may rebel against traditional performance; Neptune sun merges art and spirituality. Leo sun is never one-dimensional in full charts.",
    ],
  },
  Virgo: {
    "personality-traits": [
      "Virgo season harvests what was planted — metaphorically and literally — making this sign attuned to ripeness, timing, and quality control. They notice when something is almost but not quite ready for market or relationship commitment.",
    ],
    strengths: [
      "Virgo documents knowledge for others — manuals, SOPs, tutorials — ensuring skills outlive individual tenure. This makes them force multipliers in organizations that otherwise depend on tribal memory.",
    ],
    weaknesses: [
      "Health anxiety may accompany Virgo hyperawareness of bodily signals. Partnering with clinicians rather than Dr. Google, and scheduling worry time, prevents catastrophizing minor symptoms.",
    ],
    "love-style": [
      "Virgo partners often maintain shared calendars, medication schedules, and travel documents — unglamorous labor that keeps families functioning. Partners who verbally acknowledge this work prevent resentment.",
    ],
    "career-tendencies": [
      "Continuous improvement methodologies — Lean, Kaizen, clinical quality review — align with Virgo mindset. They find satisfaction in measurable error reduction and client safety improvements.",
    ],
    friendships: [
      "Virgo friends give thoughtful gifts: exactly the book you mentioned once, tools matching your new hobby, supplements researched carefully. Their care is precise rather than generic.",
    ],
    "ruling-planet-and-element": [
      "Mercury retrograde invites Virgo to revise rather than launch — editing drafts, reorganizing files, refining routines. Reframing retrograde as productive review reduces anxiety.",
    ],
    compatibility: [
      "Virgo with water signs often learns emotional vocabulary; with fire signs, learns spontaneity. Mutual teaching sustains pairs that look incompatible on sun sign lists alone.",
    ],
    "in-the-birth-chart": [
      "Chiron in Virgo or sixth house themes may indicate healing journeys through health and service — turning wound into expertise that helps others navigate similar terrain.",
    ],
  },
  Libra: {
    "personality-traits": [
      "Libra season arrives at autumn equinox — daylight and darkness balanced — echoing their lifelong negotiation between self and other, work and rest, truth and tact. They feel seasonal shifts aesthetically and emotionally.",
      "Many Libras develop early sensitivity to unfairness in schoolyard dynamics or family systems, fueling lifelong advocacy for inclusion and proportional response in conflict.",
    ],
    strengths: [
      "Libra excels at stakeholder mapping — who needs to be consulted, in what order, with what framing — making them natural project managers in politically complex organizations.",
      "Their aesthetic intelligence improves products, spaces, and documents — margins, typography, color harmony — elevating functional work into experiences people enjoy using.",
    ],
    weaknesses: [
      "Decision fatigue accumulates when Libra serves as default mediator in friend groups. Rotating facilitation and charging for professional mediation skills protects Libra energy.",
      "Shopping or researching indefinitely can substitute for choosing. Libra benefits from satisficing — good enough today beats perfect never.",
    ],
    "love-style": [
      "Libra often invests in couples therapy early as maintenance rather than emergency intervention — valuing relationship craft and believing partnership skills can be learned like music or language.",
      "Anniversary aesthetics matter: Libra remembers to dress well, choose meaningful locations, and photograph milestones because visual memory anchors emotional commitment.",
    ],
    "career-tendencies": [
      "Contract negotiation, union representation, and DEI facilitation use Libra fairness instincts constructively. They advocate for equitable processes, not only harmonious atmospheres.",
      "Client-facing roles benefit from Libra polish — presentations, pitches, and difficult conversations delivered with grace that preserves relationships while stating hard truths.",
    ],
    friendships: [
      "Libra friends gift experiences — styled picnics, gallery memberships, concert tickets with perfect seats — creating shared beauty that deepens platonic bonds beyond casual coffee catch-ups.",
      "They notice social exclusion and often repair it — inviting the overlooked person, balancing conversation airtime, and following up after gatherings if someone seemed hurt.",
    ],
    "ruling-planet-and-element": [
      "Venus retrograde periods invite Libra to revisit relationship agreements and aesthetic choices — ex contacts, wardrobe edits, home redesigns that reflect who they are now versus who they were.",
      "Libra cardinal air initiates social seasons — launching collaborations, coalitions, and campaigns that require diplomatic sequencing to succeed without burning bridges.",
    ],
    compatibility: [
      "Libra with Capricorn pairs build impressive public partnerships when earth provides structure and air provides social grace — power couples in business and community leadership.",
      "Fire sign partners energize Libra socially; water sign partners deepen emotional literacy — both pairings work when Libra communicates needs before resentment crystallizes.",
    ],
    "in-the-birth-chart": [
      "Aries north node Libra south node axis — regardless of sun — often describes soul growth through balanced partnership versus excessive self-sacrifice. Nodes modify Libra themes significantly.",
      "Venus house placement shows where Libra seeks beauty and harmony — second house Venus aestheticizes finances; seventh house Venus doubles partnership focus beyond sun sign alone.",
    ],
  },
  Scorpio: {
    "personality-traits": [
      "Scorpio season coincides with deepening autumn and cultural focus on mortality and inheritance in many traditions — fitting for a sign comfortable with endings that fertilize new beginnings.",
      "Many Scorpios develop early radar for hypocrisy — detecting when words and actions misalign — which later supports investigative instincts in career and relationship boundary enforcement.",
    ],
    strengths: [
      "Scorpio research stamina uncovers facts others miss — forensic accounting, investigative journalism, academic scholarship benefiting from years of focused digging without premature publication.",
      "Financial acumen often accompanies Scorpio intensity — managing debt, investments, and shared resources strategically during eighth house life phases.",
    ],
    weaknesses: [
      "Testing partners or colleagues to prove loyalty backfires when trust could be requested directly. Scorpio grows by stating needs before designing unconscious trials.",
      "Grudge-holding poisons Scorpio from inside. Ritual release — therapy, journaling, symbolic closure ceremonies — prevents past betrayals from colonizing present joy.",
    ],
    "love-style": [
      "Sexual and emotional honesty are intertwined for many Scorpios — intimacy deepens when partners discuss desire, fear, and power dynamics openly without shame or manipulation.",
      "Scorpio often prefers few past relationship artifacts displayed publicly — privacy protects sacred intimacy from casual observation or competitive social comparison.",
    ],
    "career-tendencies": [
      "Scorpio handles confidential information responsibly — vaults, NDAs, classified work — earning roles in finance, intelligence, therapy, and executive leadership requiring discretion.",
      "Turnaround specialists — fixing failing units, rehabilitating toxic cultures — use Scorpio comfort with underworld journeys productively when ethics guide power use.",
    ],
    friendships: [
      "Scorpio friends sit with you in grief without rushing silver linings. Their presence during divorce, death, or betrayal is often the most healing gift they offer.",
      "They expect reciprocal secrecy — gossip ends friendships. Scorpio loyalty includes never weaponizing vulnerabilities shared in confidence.",
    ],
    "ruling-planet-and-element": [
      "Pluto transits mark Scorpio life chapters — deaths, rebirths, power shifts. Understanding transits as developmental rather than punitive helps Scorpio navigate transformation consciously.",
      "Mars co-rulership adds athletic and surgical precision — Scorpio excels in physical disciplines requiring controlled intensity and strategic timing.",
    ],
    compatibility: [
      "Scorpio with Taurus oppositions often magnetize around stability versus change themes — learning compromise on finances, possession, and sexual rhythm sustains high-chemistry pairs.",
      "Water sign partners deepen emotional understanding; earth sign partners offer loyalty Scorpio trusts — both require explicit conversation about jealousy triggers.",
    ],
    "in-the-birth-chart": [
      "Eighth house profection years intensify Scorpio themes for everyone, but especially Scorpio suns — times of inheritance, debt restructuring, and intimacy deepening regardless of age.",
      "Pluto aspects to personal planets add generational and karmic flavor — Scorpio sun with Pluto conjunct sun carries concentrated transformative mandate throughout life.",
    ],
  },
  Sagittarius: {
    "personality-traits": [
      "Sagittarius season includes year-end holidays in many cultures — a time of travel and reflection matching their need to celebrate meaning and connection across distances and belief systems.",
      "Many Sagittarians collect stamps in passports, degrees, and philosophical frameworks — evidence of lives measured in horizons expanded rather than possessions accumulated.",
    ],
    strengths: [
      "Sagittarius cross-cultural fluency — languages, customs, humor — supports international business, diplomacy, and academic exchange programs requiring respectful curiosity rather than colonial arrogance.",
      "Humor disarms tension in Sagittarius hands — they defuse conflict with truth wrapped in wit when maturity balances bluntness with timing.",
    ],
    weaknesses: [
      "Preaching without practicing undermines Sagittarius credibility. Aligning daily habits with stated values — ethics at work, honesty in relationships — closes integrity gaps.",
      "Overpromising enthusiasm can disappoint others when Sagittarius optimism exceeds calendar capacity. Under-promising with reliable delivery rebuilds trust.",
    ],
    "love-style": [
      "Long-distance relationships often work for Sagittarius when travel schedules are honest and reunion quality is high. Digital intimacy plus periodic adventures can sustain years before cohabitation.",
      "Sagittarius partners appreciate philosophical alignment — shared ethics on honesty, freedom, and growth matter as much as chemistry for long-term satisfaction.",
    ],
    "career-tendencies": [
      "Sagittarius professors, coaches, and speakers inspire through storytelling grounded in lived experience — not abstract motivation alone but tales from roads actually traveled.",
      "Export, import, tourism, and immigration law align with Sagittarius cross-border instincts when paired with formal credentials and ethical practice.",
    ],
    friendships: [
      "Sagittarius friends push you to apply for the fellowship, book the flight, or publish the essay — believing in your expansion sometimes before you do.",
      "They forgive easily when intentions are good but remember ethical breaches — Sagittarius friendship tolerates mistakes, not cruelty or chronic dishonesty.",
    ],
    "ruling-planet-and-element": [
      "Jupiter transits bring Sagittarius opportunity windows — enrollments, promotions, publications. Saying yes selectively during Jupiter highs maximizes growth without overcommitment.",
      "Mutable fire adapts teachings to audience — Sagittarius explains the same truth differently to children, executives, and spiritual seekers without losing core message.",
    ],
    compatibility: [
      "Sagittarius with Virgo pairs teach each other precision and vision — when they stop trying to convert the other into a duplicate self and honor complementary skills instead.",
      "Fire sign partners match adventure pace; air sign partners match intellectual range — both need honesty about freedom expectations early in relationship.",
    ],
    "in-the-birth-chart": [
      "Ninth house emphasis amplifies Sagittarius themes in any chart — advanced degrees, immigration stories, spiritual seeking — even when sun sign differs.",
      "Jupiter aspects to Venus expand romantic generosity; to Mars expand righteous anger — chart context moderates Sagittarius sun expression significantly.",
    ],
  },
  Capricorn: {
    "personality-traits": [
      "Capricorn season spans year boundary — solstice and New Year — symbolically apt for a sign obsessed with timelines, legacy, and measuring progress across decades rather than days alone.",
      "Many Capricorns mature early through family responsibility — caregiving for siblings, working young, or navigating hardship — forging competence before peers finish experimenting.",
    ],
    strengths: [
      "Capricorn institutional memory preserves organizations during leadership transitions — documenting decisions, mentoring successors, and maintaining standards when founders depart.",
      "Risk assessment protects teams from reckless gambles — Capricorn asks what could go wrong and plans contingencies others prefer not to imagine.",
    ],
    weaknesses: [
      "Comparing milestones to younger peers or social media highlights ignores Capricorn late-bloom advantage. Many Capricorns achieve greatest success after forty when patience compounds.",
      "Dismissing rest as weakness invites illness and relationship erosion. Capricorn health often improves when play is scheduled with same seriousness as quarterly reviews.",
    ],
    "love-style": [
      "Capricorn may schedule date nights and therapy appointments with equal seriousness — treating relationship maintenance as infrastructure worth investing in, not optional luxury.",
      "Public composure plus private tenderness defines many Capricorn marriages — partners who see both sides feel uniquely trusted and cherished.",
    ],
    "career-tendencies": [
      "Capricorn builds credentials methodically — licenses, degrees, certifications — understanding that formal recognition opens doors raw talent alone cannot always access.",
      "Succession planning — developing leaders beneath them — marks mature Capricorn executives who build institutions outlasting their tenure.",
    ],
    friendships: [
      "Capricorn friends offer introductions that advance your career without expecting immediate return — playing long games of mutual elevation characteristic of earth sign loyalty.",
      "Dry humor and loyalty through decades define Capricorn friendship — they may not text daily but appear when stakes are highest.",
    ],
    "ruling-planet-and-element": [
      "Saturn return near age twenty-nine marks Capricorn adulthood initiation — restructuring career, relationships, and self-concept. Preparation during late twenties eases transition.",
      "Cardinal earth initiates material structures — Capricorn starts businesses, families, and foundations meant to endure generations with proper maintenance.",
    ],
    compatibility: [
      "Capricorn with Pisces pairs blend practicality and dream — earth gives water form; water softens earth rigidity — common in lasting couples who build both homes and art together.",
      "Earth sign partners share values around commitment; water sign partners soften emotional expression — both require explicit affection rituals Capricorn might forget.",
    ],
    "in-the-birth-chart": [
      "Tenth house Capricorn stelliums amplify public reputation themes. Capricorn planets in the fourth house may build family legacy through property, business, or caregiving dynasties.",
      "Saturn aspects to sun or moon add gravity and early responsibility — Capricorn themes intensify even without Capricorn sun when Saturn dominates chart tone.",
    ],
  },
  Aquarius: {
    "personality-traits": [
      "Aquarius season bridges deep winter and early spring in the Northern Hemisphere — a transitional innovator mirroring their role introducing future norms before mainstream adoption.",
      "Many Aquarians felt like outsiders in childhood — different interests, social timing, or values — later converting alienation into originality and community for fellow misfits.",
    ],
    strengths: [
      "Aquarius community organizing scales impact — mutual aid networks, open-source projects, cooperative housing — turning individual brilliance into collective infrastructure.",
      "Systems thinking identifies root causes — Aquarius fixes pipelines, not only symptoms, in activism, engineering, and organizational design work.",
    ],
    weaknesses: [
      "Intellectualizing partner emotions during conflict dismisses their reality. Aquarius grows by listening somatically — noticing tone, breath, tears — before offering systemic analysis.",
      "Contrarian reflex rejects good ideas because they are popular. Aquarius matures by evaluating proposals on merit, not on whether consensus already formed.",
    ],
    "love-style": [
      "Unconventional relationship structures — living apart together, polyamory with clear agreements, long friendships before romance — often suit Aquarius when chosen consciously rather than fearfully.",
      "Aquarius shows love by defending partner individuality — supporting unusual careers, pronouns, creative risks — expecting reciprocal respect for their own eccentricities.",
    ],
    "career-tendencies": [
      "Aquarius patents, publishes, and open-sources — balancing intellectual property with humanitarian access depending on values. They question who benefits from innovation.",
      "Startup culture suits Aquarius when mission-driven — they tolerate chaos if the vision improves collective future, not only shareholder profit.",
    ],
    friendships: [
      "Aquarius friends remember your weird niche interests and send you the exact obscure article years later — relational glue built on intellectual recognition and shared outsider identity.",
      "Group chats and community servers often center Aquarius social life — they maintain networks spanning years and continents with lightweight but consistent contact.",
    ],
    "ruling-planet-and-element": [
      "Uranus transits electrify Aquarius life — sudden moves, career pivots, awakenings. Flexibility during Uranus activations turns disruption into liberation rather than chaos.",
      "Saturn traditional rulership adds staying power — Aquarius innovations last when built with institutional discipline, not only rebellious flash.",
    ],
    compatibility: [
      "Aquarius with Leo oppositions often attract around visibility themes — learning to share stage and credit sustains high-energy pairs common in activism and entertainment.",
      "Air sign partners match intellectual range; fire sign partners match activist passion — both need space agreements written or spoken clearly.",
    ],
    "in-the-birth-chart": [
      "Eleventh house profection years highlight friendships and collective projects for everyone, especially Aquarius suns — ideal times to launch community initiatives or join movements.",
      "Uranus aspects to personal planets add unpredictability — Aquarius sun with Uranus conjunct moon needs emotional freedom and unconventional home life.",
    ],
  },
  Pisces: {
    "personality-traits": [
      "Pisces closes the zodiac wheel — dissolution before Aries rebirth — explaining their comfort with endings, liminal spaces, and experiences that dissolve ego boundaries such as meditation or art.",
      "Many Pisces report vivid dreams, musical childhoods, or early spiritual experiences — sensitivity often visible before adolescence shapes it into vocation or wound.",
    ],
    strengths: [
      "Pisces symbolic thinking translates between mysticism and mainstream — making spirituality accessible, art therapeutic, and compassion actionable in hospitals, shelters, and crisis hotlines.",
      "Improvisational creativity — music, dance, visual art — flows when Pisces stops self-judging and trusts channel states cultivated through practice and protection.",
    ],
    weaknesses: [
      "Savior complexes exhaust Pisces when they rescue people who do not want change. Discernment about who is ready for help preserves energy for genuinely mutual healing work.",
      "Substance or screen escape provides short relief from porous boundaries. Sobriety, sleep hygiene, and creative ritual replace numbing with sustainable regulation.",
    ],
    "love-style": [
      "Pisces often writes love as poetry, songs, or letters — creative artifacts that document feeling more accurately than everyday conversation alone.",
      "Idealization fades when partners reveal human flaws — Pisces maturity includes loving real people, not only projections of divine union fantasy.",
    ],
    "career-tendencies": [
      "Pisces thrives in behind-the-scenes creative roles — editing, composing, designing — where sensitivity improves final product without requiring constant self-promotion.",
      "Institutional spirituality — hospice chaplaincy, arts therapy, nonprofit service — channels Pisces compassion with structures that prevent burnout.",
    ],
    friendships: [
      "Pisces friends sense when you are performing okayness and offer quiet company — movie nights, walks, shared silence — without forcing confession before you are ready.",
      "They absorb friend group emotions and may need solo recovery after intense gatherings — respecting Pisces recharge time sustains friendship.",
    ],
    "ruling-planet-and-element": [
      "Neptune transits dissolve outdated Pisces identities — addictions confronted, spiritual awakenings, artistic breakthroughs. Grounding practices anchor transformation.",
      "Jupiter traditional rulership adds faith and teaching capacity — Pisces mentors often combine mystical insight with generous encouragement of student creativity.",
    ],
    compatibility: [
      "Pisces with Virgo oppositions attract around service and order themes — learning that perfection and compassion need each other prevents polarized criticism versus chaos dynamics.",
      "Water sign partners deepen emotional understanding; earth sign partners provide practical anchors — both help Pisces maintain boundaries without losing soul.",
    ],
    "in-the-birth-chart": [
      "Twelfth house emphasis amplifies Pisces themes in any chart — retreat, dreams, hidden labor, spiritual calling — even for non-Pisces suns with planets in the twelfth.",
      "Neptune aspects to personal planets increase sensitivity and creative gift — also require grounding practices so intuition becomes skill rather than confusion.",
    ],
  },
};

const EXTRA_FAQ: Partial<Record<ZodiacSign, PillarFAQ>> = {
  Aries: {
    question: "What is the best way to support an Aries partner?",
    answer:
      "Encourage their ambitions without competing for control. Give honest feedback directly and quickly, join them in physical activity when tension rises, and celebrate wins loudly. Aries partners thrive when autonomy and loyalty coexist — trust them to lead sometimes while knowing you can also lead when it matters.",
  },
  Taurus: {
    question: "How do Taurus handle stress?",
    answer:
      "Taurus restores through sensory grounding — good food, nature walks, music, massage, and familiar environments. Sudden upheaval stresses them most. Advance notice of changes, financial stability, and physical comfort rituals help Taurus regulate before problems escalate into stubborn shutdown.",
  },
  Gemini: {
    question: "How can Gemini develop deeper focus?",
    answer:
      "Time-box exploration, finish one creative or professional thread before opening three new ones, and partner with accountability buddies who celebrate completions. Journaling clarifies which interests are genuine callings versus distraction from uncomfortable emotions seeking escape through novelty.",
  },
  Cancer: {
    question: "What helps Cancer feel emotionally secure?",
    answer:
      "Consistent presence, remembered details, gentle honesty, and respect for home as sacred space support Cancer security. They need partners who do not punish mood shifts but ask what kind of care helps today — listening, solitude, or practical help.",
  },
  Leo: {
    question: "How does Leo express creativity outside career?",
    answer:
      "Leo channels solar creativity through hobbies, parenting, community theater, fashion, event hosting, and mentorship. Any arena allowing personal flair and visible impact satisfies Leo creative drive when day jobs feel too constrained or anonymous.",
  },
  Virgo: {
    question: "What wellness practices suit Virgo?",
    answer:
      "Body-based routines — yoga, pilates, meal prep, sleep hygiene — help Virgo exit analysis loops. Scheduled worry time and limiting health Googling reduce anxiety. Nature walks without productivity goals reconnect Virgo to pleasure beyond optimization.",
  },
  Libra: {
    question: "How can Libra make decisions more confidently?",
    answer:
      "Identify core values first, accept that perfect fairness is impossible, set decision deadlines, and trust adjustment later. Libra grows by recognizing that choosing is not rejecting all other options forever — most decisions are revisable.",
  },
  Scorpio: {
    question: "What builds trust with Scorpio?",
    answer:
      "Consistency, confidentiality, emotional honesty, and patience through intensity build Scorpio trust. Avoid white lies, performative loyalty, or sharing their private stories. Trust accumulates slowly and compounds into fierce devotion once earned.",
  },
  Sagittarius: {
    question: "Can Sagittarius be faithful in long-term love?",
    answer:
      "Yes. Sagittarius faithfulness ties to growth within commitment — partners who evolve, travel together intellectually and physically, and honor freedom with transparency often receive lifelong loyalty. Restriction without trust triggers wandering; trust with adventure sustains devotion.",
  },
  Capricorn: {
    question: "When do Capricorns relax and have fun?",
    answer:
      "Capricorn fun often looks structured — planned vacations, skill-based hobbies, dinner with longtime friends, sports with measurable progress. Spontaneity grows as Saturn lessons integrate. Permission to enjoy without earning it is a Capricorn healing milestone.",
  },
  Aquarius: {
    question: "How does Aquarius show they care?",
    answer:
      "Aquarius shows care through loyalty, advocacy, intellectual engagement, and fixing systemic problems affecting you — remembering your causes, introducing allies, defending you publicly. Emotional warmth may be subtle; consistency reveals depth.",
  },
  Pisces: {
    question: "What creative outlets help Pisces most?",
    answer:
      "Music, dance, poetry, photography, film, painting, and spiritual practice channel Pisces sensitivity constructively. Regular creative ritual prevents absorption of others' pain and transforms emotion into art that heals both creator and audience.",
  },
};

function buildSections(
  sign: ZodiacSign,
  content: SignPillarContent,
  traits: (typeof ZODIAC_TRAITS)[string],
  meta: (typeof ZODIAC_META)[ZodiacSign]
): PillarSection[] {
  const sectionIds = Object.keys(SECTION_HEADINGS) as SectionId[];
  return sectionIds.map((id) => {
    let paragraphs = [...content.sections[id]];
    const supplements = SECTION_SUPPLEMENTS[sign]?.[id];
    if (supplements) {
      paragraphs = [...paragraphs, ...supplements];
    }

    if (id === "compatibility") {
      const compatible = formatSignList(meta.compatibleWith);
      const challenging = formatSignList(meta.challengingWith);
      paragraphs = [
        ...paragraphs,
        `Traditional AstroPath compatibility highlights for ${sign} include strong resonance with ${compatible}, while ${challenging} may require conscious bridging of different elemental needs and communication styles.`,
      ];
    }

    if (id === "ruling-planet-and-element") {
      const rulerNote = meta.traditionalRuler
        ? `${meta.rulingPlanet} (modern) and ${meta.traditionalRuler} (traditional)`
        : meta.rulingPlanet;
      paragraphs = [
        ...paragraphs,
        `${sign} dates are ${meta.dates}. As ${meta.modality.toLowerCase()} ${meta.element.toLowerCase()}, the ${traits.archetype} archetype expresses through ${rulerNote} with symbol ${meta.symbol}.`,
      ];
    }

    return {
      id,
      heading: SECTION_HEADINGS[id],
      paragraphs,
    };
  });
}

export function buildZodiacPillar(sign: typeof ZODIAC_SIGNS_ORDER[number]): PillarArticle {
  const traits = ZODIAC_TRAITS[sign];
  const meta = ZODIAC_META[sign];
  const content = SIGN_CONTENT[sign];
  const extraFaq = EXTRA_FAQ[sign];
  const faq = extraFaq ? [...content.faq, extraFaq] : content.faq;

  return {
    hub: "zodiac",
    slug: meta.slug,
    title: content.title,
    description: content.description,
    updatedAt: PUBLISHED,
    publishedAt: PUBLISHED,
    keywords: content.keywords,
    sections: buildSections(sign, content, traits, meta),
    faq,
  };
}

export const ZODIAC_PILLARS: PillarArticle[] = ZODIAC_SIGNS_ORDER.map(buildZodiacPillar);

export function getZodiacPillar(slug: string): PillarArticle | undefined {
  return ZODIAC_PILLARS.find((article) => article.slug === slug);
}
