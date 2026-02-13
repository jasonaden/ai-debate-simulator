# Demo Guide

## What It Does

Two AI models (Pro and Con) debate any topic you give them, live in your terminal. Students can ask questions mid-debate and watch the AIs respond.

## Example Session

```bash
$ ai-debate "Should homework be banned?"

╔════════════════════════════════════════════════════════════════╗
║                    AI DEBATE SIMULATOR                         ║
║         Topic: Should homework be banned?                      ║
╚════════════════════════════════════════════════════════════════╝

Progress: ━━╌╌╌  Round 1 of 5

🟢 PRO:
I believe homework should be banned for several compelling reasons.
First, it causes unnecessary stress for students who are already 
dealing with packed schedules. Second, much of homework is busywork
that doesn't actually reinforce learning...

🔴 CON:
I have to disagree. While I understand the stress concern, homework
serves essential functions. It builds discipline, reinforces 
classroom concepts, and develops independent study skills...

[Type your question or press Enter to continue]
> ask both: what about students who actually enjoy homework?

🟡 MODERATOR: ask both: what about students who actually enjoy homework?

Progress: ━━━╌╌  Round 2 of 5

🟢 PRO:
That's an excellent point to raise. For the students who genuinely
enjoy homework, they're typically the self-motivated learners who
would excel regardless. However...

🔴 CON:
Exactly - and those students benefit significantly from the structure
homework provides. They use it to deepen their understanding...

[Debate continues for 5 rounds...]

╔════════════════════════════════════════════════════════════════╗
║                      DEBATE COMPLETE                           ║
╚════════════════════════════════════════════════════════════════╝
```

## Controls

- **Type a question** → Both AIs respond in next round
- **Press Enter** → Continue without input
- **Press ESC** → Pause/resume debate
- **Ctrl+C** → Exit

## Topic Ideas

**Controversial (fun for students):**
- "Is pineapple on pizza acceptable?"
- "Should phones be banned in schools?"
- "Is TikTok making people dumber?"

**Educational (good for essays):**
- "Should college be free?"
- "Is climate change reversible?"
- "Should AI be regulated?"

**Silly (just for laughs):**
- "Are hot dogs sandwiches?"
- "Should pineapple exist?"
- "Is cereal a soup?"

## How It Works

1. **Two personas** from same model (llama3.2:latest)
2. **Pro** = optimistic, finds benefits, constructive arguments
3. **Con** = skeptical, finds risks, analytical counterpoints
4. **5 rounds** of back-and-forth debate
5. **Your questions** get injected into next AI prompt
6. **Streaming text** makes it feel like real conversation

## Requirements

**Before running:**

```bash
# 1. Install Ollama
brew install ollama

# 2. Start Ollama service  
ollama serve

# 3. Pull the model (in another terminal)
ollama pull llama3.2:latest

# 4. Install the debate simulator
cd /path/to/ai-debate-simulator
npm install

# 5. Run a debate!
node src/index.js "Your topic here"
```

## Why High Schoolers Will Love It

- **Instant gratification** - debates start immediately
- **Controversial topics** - watch AIs argue about anything
- **Interactive** - your questions shape the debate
- **Actually useful** - helps with essay research
- **Terminal vibes** - feels like "real" programming
- **Shareable** - easy to show friends

## What's Built

✅ Debate orchestration engine  
✅ Ollama streaming integration  
✅ Pro/Con persona system  
✅ Interactive terminal UI (Ink)  
✅ Color-coded output  
✅ Moderator input system  
✅ Pause/resume controls  
✅ Progress tracking  
✅ Round-by-round history  

**Status:** Complete and working. Just needs Ollama installed to run.

**Repo:** https://github.com/jasonaden/ai-debate-simulator
