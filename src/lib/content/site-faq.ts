/** Site-wide FAQ for /faq page — AdSense & trust readiness */

export const SITE_FAQ = [
  {
    question: "What is AstroPath?",
    answer:
      "AstroPath is an astrology and tarot platform that combines educational guides, birth-chart learning, interactive tarot readings, and daily cosmic insights. It is designed for reflection, self-discovery, and learning — not fear-based predictions or professional advice.",
  },
  {
    question: "Is AstroPath free to use?",
    answer:
      "Yes. You can start without an account using free trial credits stored in your browser. Signed-in free accounts receive monthly credits. Paid plans offer unlimited tarot and remove in-app advertisements.",
  },
  {
    question: "Are AstroPath readings medical, legal, or financial advice?",
    answer:
      "No. All astrology and tarot on AstroPath is for entertainment, education, and personal reflection only. It is not a substitute for licensed medical, legal, financial, or mental-health professionals.",
  },
  {
    question: "How do credits work?",
    answer:
      "Credits are consumed when you use tarot spreads, birth-chart reports, forecasts, and other premium features. Costs are displayed before you start an action. Credits are deducted only after a successful reading. See our pricing page for a full cost table.",
  },
  {
    question: "How do tarot readings work?",
    answer:
      "Choose a spread, ask a question, and draw cards. Each spread explains its purpose, depth, and credit cost before you begin. Interpretations use symbolic language for reflection — not fixed predictions.",
  },
  {
    question: "How accurate are birth charts on AstroPath?",
    answer:
      "Chart accuracy depends on correct birth date, time, and location. Without an exact birth time, rising sign and house placements may be approximate. AstroPath explains uncertainty when data is incomplete rather than presenting guesses as facts.",
  },
  {
    question: "Do I need an account?",
    answer:
      "No. Anonymous users can explore tarot with trial credits. Creating a free account saves progress, unlocks dashboard features, and provides monthly credits. Cloud reading history requires a paid plan.",
  },
  {
    question: "How does AstroPath handle my privacy?",
    answer:
      "We collect only information needed to operate the service — account details if you sign in and usage metrics. We do not sell your data. See our Privacy Policy for full details and your rights.",
  },
  {
    question: "Does AstroPath show advertisements?",
    answer:
      "Free-tier users may see Google AdSense advertisements. Paid subscribers on eligible plans do not see in-app ads. See our Cookie Policy for how advertising cookies work and how to manage them.",
  },
  {
    question: "What cookies does AstroPath use?",
    answer:
      "We use essential cookies for sign-in and security, functional storage for trial credits and preferences, and advertising cookies for free-tier users through Google AdSense. You can manage cookies in your browser settings.",
  },
  {
    question: "Can I delete my data?",
    answer:
      "Yes. Email us from the Contact page with a privacy request to access or delete account data. Anonymous trial data stored in your browser can be cleared by removing site data for AstroPath in your browser settings.",
  },
  {
    question: "Is AstroPath safe for teenagers?",
    answer:
      "Users must meet the minimum age required in their jurisdiction (typically 13+). If you are under 18, use AstroPath with a parent or guardian's permission. The service is not designed for children under 13.",
  },
  {
    question: "What should I do in a crisis or emergency?",
    answer:
      "AstroPath is not a crisis service. If you are in immediate danger or experiencing thoughts of self-harm, contact local emergency services or a qualified crisis helpline — not a tarot session.",
  },
  {
    question: "How is tarot different from astrology on AstroPath?",
    answer:
      "Astrology interprets birth charts and planetary patterns through educational content and dashboard insights. Tarot uses symbolic card spreads for reflection on specific questions. Both are tools for self-inquiry, not certainty.",
  },
  {
    question: "Can I repeat tarot readings?",
    answer:
      "Yes, but we recommend waiting until something meaningful shifts before repeating the same question. Immediate repeats often produce similar cards and less useful reflection.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "Paid subscriptions will be processed through Stripe when billing is fully enabled in production. Until then, free credits and trials are available without payment.",
  },
  {
    question: "How do I cancel a subscription?",
    answer:
      "When paid billing is active, you will be able to manage or cancel your subscription from your Account page or through the payment provider's portal. Contact us if you need assistance.",
  },
  {
    question: "Does AstroPath guarantee relationship or career outcomes?",
    answer:
      "No. We never guarantee specific outcomes in love, career, health, or finances. Readings use probabilistic language (may, could, suggests) and are intended to support reflection, not replace your judgment.",
  },
  {
    question: "Where can I learn astrology basics?",
    answer:
      "Visit our Learn section for free long-form guides on birth charts, zodiac signs, planets, houses, aspects, tarot, and compatibility. The Blog publishes the same educational articles in journal format.",
  },
  {
    question: "Who writes AstroPath educational content?",
    answer:
      "Articles are produced by the AstroPath Editorial team with a focus on beginner-friendly, accurate astrology education. Content is reviewed for clarity, responsible language, and alignment with our disclaimer.",
  },
  {
    question: "How do I contact AstroPath support?",
    answer:
      "Email us through the Contact page. We aim to respond within 2–3 business days. Include your account email and a clear description of your issue for faster help.",
  },
  {
    question: "How often are policies updated?",
    answer:
      "Privacy, Terms, Cookie, and Disclaimer pages show a last-updated date. We revise policies when our practices or legal requirements change. Continued use after updates constitutes acceptance of the revised terms.",
  },
] as const;

export type SiteFAQItem = (typeof SITE_FAQ)[number];
