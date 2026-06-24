export type MessageRole = "user" | "assistant" | "system";

export interface ExtractedInsight {
  category: string;
  value: string;
  confidence: number;
}

export interface ConversationMessage {
  id: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  extractedInsights?: ExtractedInsight[];
  sentiment?: "positive" | "neutral" | "negative" | "mixed";
  topicsDiscussed?: string[];
  isStreaming?: boolean;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Date;
  lastActiveAt: Date;
  onboardingComplete: boolean;
  cosmicDnaProfile?: CosmicDnaProfile;
  sunSign?: string;
  moonSign?: string;
  risingSign?: string;
  subscriptionTier?: "free" | "cosmic" | "oracle";
}

export interface Conversation {
  id: string;
  userId: string;
  status: "active" | "gathering_birth" | "generating_report" | "completed";
  phase: "rapport" | "exploration" | "birth_details" | "report" | "follow_up";
  messageCount: number;
  insights: ExtractedInsight[];
  topicsCovered: string[];
  birthDetailsRequested: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BirthProfile {
  id: string;
  userId: string;
  fullName: string;
  dateOfBirth: string;
  timeOfBirth: string;
  birthLocation: string;
  latitude: number;
  longitude: number;
  timezone: string;
  sunSign: string;
  moonSign: string;
  risingSign: string;
  chartData: BirthChartData;
  createdAt: Date;
}

export interface PlanetPosition {
  name: string;
  sign: string;
  degree: number;
  house: number;
  retrograde: boolean;
}

export interface BirthChartData {
  planets: PlanetPosition[];
  houses: number[];
  aspects: ChartAspect[];
}

export interface ChartAspect {
  planet1: string;
  planet2: string;
  type: string;
  orb: number;
}

export interface CosmicDnaProfile {
  archetype: string;
  coreTraits: string[];
  emotionalPattern: string;
  relationshipStyle: string;
  careerDrive: string;
  hiddenStrength: string;
  soulLesson: string;
  cosmicSignature: string;
}

export interface CuriosityCard {
  id: string;
  type:
    | "hidden_strength"
    | "upcoming_opportunity"
    | "relationship_pattern"
    | "soul_lesson"
    | "ninety_day_outlook";
  title: string;
  content: string;
  confidence: number;
  reasoning: string;
}

export interface CosmicReport {
  id: string;
  userId: string;
  conversationId: string;
  birthProfileId: string;
  title: string;
  summary: string;
  cosmicDna: CosmicDnaProfile;
  curiosityCards: CuriosityCard[];
  sections: ReportSection[];
  sunSign?: string;
  moonSign?: string;
  risingSign?: string;
  createdAt: Date;
}

export interface ReportSection {
  title: string;
  content: string;
  confidence: number;
  reasoning: string;
  astrologicalBasis: string[];
}

export interface DailyInsight {
  id: string;
  userId: string;
  date: string;
  guidance: string;
  focusArea: string;
  affirmation: string;
  planetaryInfluence: string;
  mood: string;
  createdAt: Date;
}

export interface UserMemory {
  id: string;
  userId: string;
  key: string;
  value: string;
  category: string;
  source: "conversation" | "report" | "feedback";
  confidence: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Feedback {
  id: string;
  userId: string;
  targetType: "message" | "report" | "daily_insight";
  targetId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}

export interface ChatState {
  conversationId: string | null;
  messages: ConversationMessage[];
  isLoading: boolean;
  isStreaming: boolean;
  phase: Conversation["phase"];
  insights: ExtractedInsight[];
}

export interface BirthDetailsForm {
  fullName: string;
  dateOfBirth: string;
  timeOfBirth: string;
  birthLocation: string;
}
