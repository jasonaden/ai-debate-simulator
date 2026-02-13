# 🎭 AI Debate Simulator

Watch two AI models debate any topic, live in your terminal.

Built for high school students to explore arguments, learn critical thinking, and have fun watching AIs argue about literally anything.

![Demo](https://via.placeholder.com/800x400?text=Demo+Coming+Soon)

## ✨ Features

- **Live AI debates** on any topic you choose
- **Interactive moderation** - ask questions mid-debate
- **Distinct AI personas** - Pro (optimistic) vs Con (skeptical)
- **Runs locally** - no API keys, no internet required (after setup)
- **Beautiful terminal UI** - color-coded, streaming text
- **Educational** - see both sides of any argument

## 🚀 Quick Start

### Prerequisites

1. **Install Ollama** (local AI runtime)
   ```bash
   # macOS
   brew install ollama
   
   # Start Ollama service
   ollama serve
   ```

2. **Pull the AI model**
   ```bash
   ollama pull llama3.2:latest
   ```

### Install AI Debate Simulator

```bash
# Clone the repo
git clone https://github.com/yourusername/ai-debate-simulator.git
cd ai-debate-simulator

# Install dependencies
npm install

# Run a debate!
npm start "Should homework be banned?"
```

Or install globally:

```bash
npm install -g .

# Now run from anywhere
ai-debate "Is pineapple on pizza acceptable?"
```

## 📖 Usage

### Basic Debate

```bash
ai-debate "Should social media be banned for under 13s?"
```

### Custom Rounds

```bash
ai-debate "Is climate change the biggest threat?" --rounds 7
```

### During the Debate

- **Ask a question:** Type your question and press Enter
- **Continue without input:** Just press Enter
- **Exit early:** Press Ctrl+C

Example:
```
[Debate running...]

PRO: I believe homework should be banned because it causes unnecessary stress...
CON: I disagree. Homework reinforces classroom learning and builds discipline...

[Type a question or press Enter to continue]
> ask both: what about students who actually enjoy homework?

PRO: That's a great point. For students who enjoy it...
CON: Exactly, and those students benefit significantly...
```

## 🎯 Use Cases

### For Students
- **Essay research** - see both sides of an argument
- **Debate prep** - learn argumentation techniques
- **Critical thinking** - evaluate AI reasoning
- **Fun** - watch AIs argue about silly topics

### For Teachers
- **Classroom tool** - demonstrate perspective-taking
- **Discussion starter** - controversial topics made safe
- **Writing prompts** - generate ideas from debates

## 🏗️ How It Works

1. **Two AI personas** - Same model (llama3.2), different system prompts
2. **Pro persona** - Optimistic, finds benefits, constructive
3. **Con persona** - Skeptical, finds risks, analytical
4. **Debate rounds** - AIs respond to each other's arguments
5. **Moderator input** - Your questions get injected into next round

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **UI:** Ink (React for terminal)
- **AI:** Ollama (local LLMs)
- **Models:** llama3.2:latest (can use others)

## 📝 Development

```bash
# Install dependencies
npm install

# Run in dev mode (auto-reload)
npm run dev "Test topic"

# Project structure
src/
├── index.js          # CLI entry point
├── debate.js         # Debate orchestration
├── ai/
│   ├── personas.js   # AI persona definitions
│   ├── ollama.js     # Ollama API client
│   └── prompts.js    # Prompt templates
└── ui/
    ├── App.jsx       # Main Ink component
    ├── DebateView.jsx
    └── Input.jsx
```

## 🤝 Contributing

This was built in one night as a demo project for high school students. PRs welcome!

Ideas for improvements:
- [ ] Save debate transcripts
- [ ] Vote for winner at the end
- [ ] More AI personas (neutral moderator, expert witness)
- [ ] Web UI version
- [ ] Support for other local LLM providers

## 📜 License

MIT

## 🙏 Acknowledgments

Built by Nix Tanaka  
Product direction by Riley Chase  
For high school students everywhere who love a good argument 🎓

---

**Have fun! Try controversial topics. Watch AIs struggle with philosophy. Learn something new.**
