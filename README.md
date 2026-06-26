# AstroPath

A full-stack AI-powered astrology platform that feels like a highly personalized AI astrologer. Users engage in a natural conversation before receiving deeply personalized cosmic guidance.

> **"The universe reveals more when it knows you."**

## Features

- **Conversational Discovery** — 3–5 minute adaptive dialogue before any reading
- **Cosmic DNA Profile** — Unique personality map blending astrology + conversation
- **Curiosity Cards** — Hidden strengths, opportunities, relationship patterns, soul lessons, 90-day outlook
- **Why This Insight?** — Transparent reasoning with confidence indicators
- **Daily Cosmic Guidance** — Personalized daily insights per user
- **Session Memory** — Returning users feel remembered
- **AI Follow-up Chat** — Continue asking questions after your report

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15+ (App Router), TypeScript, Tailwind CSS |
| State | Zustand + React Context |
| Backend | Firebase (Auth, Firestore, Functions, Storage, Hosting, Analytics) |
| AI | OpenAI API with streaming responses |
| Astrology | astronomy-engine for birth chart calculations |
| RAG | Curated astrology knowledge base |

## Project Structure

```
astropath/
├── src/
│   ├── app/                    # Next.js App Router pages & API routes
│   │   ├── api/chat/           # Streaming AI chat + report generation
│   │   ├── api/chart/          # Birth chart calculations
│   │   ├── api/daily-insight/  # Daily guidance generation
│   │   ├── api/geocode/        # Birth location geocoding
│   │   ├── auth/               # Authentication page
│   │   ├── chat/               # AI chat interface
│   │   └── dashboard/          # Cosmic report & daily insights
│   ├── components/
│   │   ├── auth/               # Auth forms
│   │   ├── chat/               # Chat UI, birth details form
│   │   ├── cosmic/             # Starfield, glass cards, animations
│   │   └── report/             # Report display components
│   ├── contexts/               # Auth context provider
│   ├── hooks/                  # Firestore real-time listeners
│   ├── lib/
│   │   ├── ai/                 # Prompts, RAG knowledge base
│   │   ├── astrology/          # Chart calculations
│   │   └── firebase/           # Firebase config & services
│   ├── stores/                 # Zustand state management
│   └── types/                  # TypeScript interfaces
├── functions/                  # Firebase Cloud Functions
│   └── src/index.ts            # Message triggers, daily insights, memory
├── firestore.rules             # Security rules
├── firestore.indexes.json      # Composite indexes
├── storage.rules               # Storage security
└── firebase.json               # Firebase project config
```

## Firestore Collections

| Collection | Purpose |
|-----------|---------|
| `users` | User profiles and onboarding state |
| `conversations` | Chat sessions with phase tracking |
| `messages` | Chat messages with insights & sentiment |
| `birthProfiles` | Birth details and chart data |
| `cosmicReports` | Generated personalized reports |
| `dailyInsights` | Per-user daily guidance |
| `userMemories` | Session memory for returning users |
| `feedback` | User feedback on insights |
| `knowledgeEmbeddings` | RAG vector embeddings |

## Getting Started

### Prerequisites

- Node.js 20+
- Firebase CLI (`npm install -g firebase-tools`)
- OpenAI API key
- Firebase project with Auth, Firestore, Functions, Storage enabled

### Setup

```bash
# Clone and install
cd astropath
npm install
cd functions && npm install && cd ..

# Configure environment
cp .env.example .env.local
# Fill in your Firebase and OpenAI credentials

# Link Firebase project
firebase login
firebase use --add

# Start development
npm run dev
```

### Firebase Emulators (optional)

```bash
npm run firebase:emulators
```

### Deploy

```bash
npm run build
npm run functions:build
firebase deploy
```

## Environment Variables

See `.env.example` for all required variables:

- `NEXT_PUBLIC_FIREBASE_*` — Firebase client configuration
- `OPENAI_API_KEY` — OpenAI API key for chat and report generation

## User Journey

1. **Landing Page** — Premium cosmic aesthetic with curiosity hook
2. **AI Chat** — Warm greeting → adaptive questions → rapport building
3. **Birth Details** — Requested after sufficient conversation
4. **Report Generation** — Merges conversation + chart + RAG knowledge
5. **Dashboard** — Cosmic DNA, curiosity cards, daily guidance
6. **Follow-up** — Continue chatting with session memory

## Design Principles

- Never fear-based or absolute predictions
- Supportive, reflective language
- Confidence indicators on all insights
- Astrology as guidance and self-reflection
- Encourage curiosity and self-discovery

## License

Private — All rights reserved.
