#!/usr/bin/env node
/**
 * Demo script - runs a debate from the command line.
 * Usage: node src/demo.js "Should homework be banned?"
 */

import { Debate } from './debate.js';
import { checkHealth } from './ai/ollama.js';
import { createInterface } from 'readline';

const topic = process.argv[2] || 'Should homework be banned?';

// ANSI colors
const green = t => `\x1b[32m${t}\x1b[0m`;
const red = t => `\x1b[31m${t}\x1b[0m`;
const yellow = t => `\x1b[33m${t}\x1b[0m`;
const bold = t => `\x1b[1m${t}\x1b[0m`;
const dim = t => `\x1b[2m${t}\x1b[0m`;

async function main() {
  // Health check
  const health = await checkHealth();
  if (!health.ok) {
    console.error(red('✗ Ollama is not running. Start it with: ollama serve'));
    process.exit(1);
  }
  if (!health.modelAvailable) {
    console.error(red('✗ llama3.2:latest not found. Pull it with: ollama pull llama3.2:latest'));
    console.error(dim(`  Available models: ${health.models?.join(', ') || 'none'}`));
    process.exit(1);
  }

  console.log(bold(`\n🎤 AI Debate Simulator\n`));
  console.log(`Topic: ${bold(topic)}`);
  console.log(dim(`5 rounds • Type a question anytime to moderate\n`));
  console.log(dim('─'.repeat(60)));

  const debate = new Debate({ topic });

  // Set up stdin for moderator input
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  rl.on('line', (line) => {
    const input = line.trim();
    if (!input) return;
    if (input === '/pause') { debate.pause(); console.log(yellow('\n⏸  Debate paused. Type /resume to continue.')); return; }
    if (input === '/resume') { debate.resume(); console.log(yellow('\n▶  Debate resumed.')); return; }
    if (input === '/stop') { debate.stop(); rl.close(); return; }
    debate.injectModeratorInput(input);
    console.log(yellow(`\n📝 Moderator question queued: "${input}"\n`));
  });

  // Events
  let currentPersona = null;

  debate.on('round-start', ({ round, persona }) => {
    currentPersona = persona;
    const label = persona === 'pro' ? green(`[PRO]`) : red(`[CON]`);
    const roundLabel = dim(`Round ${round}/${debate.totalRounds}`);
    process.stdout.write(`\n${label} ${roundLabel}\n`);
  });

  debate.on('chunk', ({ persona, text }) => {
    const color = persona === 'pro' ? green : red;
    process.stdout.write(color(text));
  });

  debate.on('turn-end', () => {
    process.stdout.write('\n');
    console.log(dim('─'.repeat(60)));
  });

  debate.on('moderator', ({ question }) => {
    console.log(yellow(`\n🎙  Moderator: "${question}"\n`));
  });

  debate.on('complete', () => {
    console.log(bold('\n🏁 Debate complete!\n'));
    rl.close();
  });

  await debate.run();
}

main().catch(err => {
  console.error(red(`Error: ${err.message}`));
  process.exit(1);
});
