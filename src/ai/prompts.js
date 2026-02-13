/**
 * Prompt templates for debate rounds.
 * Builds message arrays for Ollama chat API, incorporating
 * debate history and moderator interjections.
 */

/**
 * Build the opening prompt for the first speaker.
 */
export function openingPrompt({ topic, persona }) {
  return [
    { role: 'system', content: persona.systemPrompt },
    {
      role: 'user',
      content: `The debate topic is: "${topic}"

You are arguing ${persona.id === 'pro' ? 'IN FAVOR' : 'AGAINST'} this topic.

Give your opening argument. Be compelling and set the tone for the debate.`,
    },
  ];
}

/**
 * Build a round prompt that includes full debate history.
 * The AI sees the entire conversation so far and responds to the latest argument.
 */
export function roundPrompt({ topic, persona, history, round, totalRounds, moderatorInput }) {
  const messages = [
    { role: 'system', content: persona.systemPrompt },
  ];

  // Add debate context
  let contextParts = [`Debate topic: "${topic}"\nRound ${round} of ${totalRounds}.`];

  if (history.length > 0) {
    contextParts.push('\n--- Debate so far ---');
    for (const entry of history) {
      const label = entry.persona.toUpperCase();
      contextParts.push(`\n[${label}]: ${entry.text}`);
      if (entry.moderatorFollowUp) {
        contextParts.push(`\n[MODERATOR]: ${entry.moderatorFollowUp}`);
      }
    }
    contextParts.push('\n--- End of history ---');
  }

  messages.push({ role: 'user', content: contextParts.join('\n') });

  // Build the response instruction
  let instruction = `Now give your ${round === totalRounds ? 'closing' : 'next'} argument as ${persona.name}.`;
  instruction += ` Directly address your opponent's most recent points.`;

  if (moderatorInput) {
    instruction += `\n\nThe moderator has interjected: "${moderatorInput}"\nAddress this in your response.`;
  }

  if (round === totalRounds) {
    instruction += `\n\nThis is the FINAL round. Summarize your strongest points and make a powerful closing statement.`;
  }

  messages.push({ role: 'user', content: instruction });

  return messages;
}

/**
 * Build a moderator question prompt (for injecting mid-debate).
 */
export function moderatorPrompt({ topic, persona, history, question }) {
  return roundPrompt({
    topic,
    persona,
    history,
    round: history.length + 1,
    totalRounds: 999, // not final
    moderatorInput: question,
  });
}
