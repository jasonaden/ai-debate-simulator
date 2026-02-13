#!/usr/bin/env node

import { Command } from 'commander';
import React from 'react';
import { render } from 'ink';
import App from './ui/App.jsx';

const program = new Command();

program
  .name('ai-debate')
  .description('Watch two AI models debate any topic in your terminal')
  .version('1.0.0')
  .argument('<topic>', 'Topic for the AIs to debate')
  .option('-r, --rounds <number>', 'Number of debate rounds', '5')
  .option('-m, --model <name>', 'Ollama model to use', 'llama3.2:latest')
  .option('--no-stream', 'Disable streaming (show full responses at once)')
  .action((topic, options) => {
    const rounds = parseInt(options.rounds, 10);
    const { model, stream } = options;

    render(
      <App
        topic={topic}
        rounds={rounds}
        model={model}
        stream={stream}
      />
    );
  });

program.parse();
