# AI Debate Simulator - Project Spec

**Build tonight for high school students**

## Core Concept

Two local AI models debate any topic, live in terminal. Students can moderate and interject questions.

## Features (MVP)

### 1. Debate Engine
- Two distinct AI personas (Pro and Con)
- Take any topic as input
- Run 5 rounds of back-and-forth debate
- Each AI responds to the other's arguments

### 2. Interactive Moderation
- Student can type questions during debate
- Both AIs incorporate moderator input into next round
- Pause/resume debate

### 3. Terminal UI
- Clean, readable output
- Streaming text (like real conversation)
- Color-coded personas (Pro = green, Con = red)
- Show round numbers
- Moderator input at any time

### 4. Local AI Integration
- Use Ollama with local models
- Fast response time (<5 seconds per turn)
- Works offline

## Tech Stack

- **Runtime:** Node.js
- **UI:** Ink (React for terminal)
- **AI:** Ollama API (local LLMs)
- **CLI:** Commander.js
- **Streaming:** Node streams

## User Flow

```bash
# Start a debate
$ ai-debate "Should homework be banned?"

[Initializing debate...]

PRO: I believe homework should be banned because...
CON: I disagree. Homework is essential because...

[You can type a question or press Enter to continue]

> ask both: what about students who need extra practice?

PRO: That's a fair point. For students needing practice...
CON: Exactly, which is why homework serves an important role...

[5 rounds later]

[Debate complete. Winner: PRO (by moderator decision)]
```

## Architecture

```
src/
├── index.js          # CLI entry point
├── debate.js         # Debate orchestration
├── ai/
│   ├── personas.js   # AI persona definitions
│   ├── ollama.js     # Ollama API client
│   └── prompts.js    # Prompt templates
├── ui/
│   ├── App.jsx       # Main Ink component
│   ├── DebateView.jsx
│   └── Input.jsx
└── utils/
    └── stream.js     # Text streaming helpers
```

## Models to Use

- **Pro:** `llama3.2:latest` (optimistic, constructive)
- **Con:** `llama3.2:latest` (skeptical, analytical)
- Use different system prompts to create distinct personas

## Build Plan

1. **Phase 1:** Core debate engine (AI integration, prompt engineering)
2. **Phase 2:** Terminal UI (Ink components, streaming)
3. **Phase 3:** Interactive moderation (input handling, mid-debate injection)
4. **Phase 4:** Polish (colors, formatting, help text)

## Success Criteria

- Student can start debate with one command
- Both AIs sound distinct and engaging
- Moderator can ask questions anytime
- Debate flows naturally (no awkward pauses)
- Runs on any Mac/Linux with Ollama installed

---

**Build time estimate:** 4-5 hours  
**Deployment:** npm package, GitHub repo, easy install
