#!/usr/bin/env node

import React from 'react';
import { render } from 'ink';
import { Command } from 'commander';
import App from './ui/App.js';

const program = new Command();

program
  .name('ai-debate')
  .description('Watch two AI models debate any topic in your terminal')
  .version('1.0.0')
  .argument('<topic>', 'The debate topic')
  .option('-r, --rounds <number>', 'Number of debate rounds', '5')
  .action((topic, options) => {
    const rounds = parseInt(options.rounds, 10);
    render(React.createElement(App, { topic, rounds }));
  });

program.parse();
