import { streamChat } from './ai/ollama.js';
import { PRO_PERSONA, CON_PERSONA } from './ai/personas.js';
import { EventEmitter } from 'events';

export function createDebate(topic, totalRounds = 5) {
  const emitter = new EventEmitter();
  let currentRound = 0;
  let running = false;
  let paused = false;
  let moderatorQueue = [];
  const history = { pro: [], con: [] };

  function buildMessages(persona, opponentHistory, round) {
    const messages = [{ role: 'system', content: persona.system }];
    messages.push({
      role: 'user',
      content: `The debate topic is: "${topic}". This is round ${round} of ${totalRounds}.`,
    });

    // Interleave history
    const maxHistory = Math.max(opponentHistory.length, 0);
    for (let i = 0; i < maxHistory; i++) {
      if (opponentHistory[i]) {
        messages.push({ role: 'user', content: `Opponent said: ${opponentHistory[i]}` });
      }
    }

    // Add moderator questions if any
    const modQ = moderatorQueue.splice(0);
    if (modQ.length > 0) {
      messages.push({
        role: 'user',
        content: `The moderator asks: ${modQ.join(' | ')}. Address this in your response.`,
      });
    }

    if (round === 1) {
      messages.push({ role: 'user', content: `Make your opening argument.` });
    } else if (round === totalRounds) {
      messages.push({ role: 'user', content: `This is the final round. Make your closing argument.` });
    } else {
      messages.push({ role: 'user', content: `Respond to the opponent's latest argument and strengthen your position.` });
    }

    return messages;
  }

  async function runTurn(persona, opponentHistory, round) {
    const messages = buildMessages(persona, opponentHistory, round);
    let fullText = '';

    emitter.emit('turnStart', { speaker: persona.name, round });

    for await (const token of streamChat(persona.model, messages)) {
      fullText += token;
      emitter.emit('token', { speaker: persona.name, token, round });
    }

    emitter.emit('turnEnd', { speaker: persona.name, text: fullText, round });
    return fullText;
  }

  async function start() {
    running = true;
    emitter.emit('debateStart', { topic, totalRounds });

    for (currentRound = 1; currentRound <= totalRounds; currentRound++) {
      if (!running) break;

      emitter.emit('roundStart', { round: currentRound, totalRounds });

      // Wait while paused
      while (paused && running) {
        await new Promise((r) => setTimeout(r, 200));
      }

      const proText = await runTurn(PRO_PERSONA, history.con, currentRound);
      history.pro.push(proText);

      if (!running) break;
      while (paused && running) {
        await new Promise((r) => setTimeout(r, 200));
      }

      const conText = await runTurn(CON_PERSONA, history.pro, currentRound);
      history.con.push(conText);

      emitter.emit('roundEnd', { round: currentRound, totalRounds });
    }

    if (running) {
      emitter.emit('debateEnd', { topic, totalRounds });
    }
    running = false;
  }

  return {
    on: (e, fn) => emitter.on(e, fn),
    start,
    stop: () => { running = false; },
    pause: () => { paused = true; emitter.emit('paused'); },
    resume: () => { paused = false; emitter.emit('resumed'); },
    addModeratorQuestion: (q) => { moderatorQueue.push(q); emitter.emit('moderatorQuestion', q); },
    get currentRound() { return currentRound; },
    get totalRounds() { return totalRounds; },
    get isRunning() { return running; },
    get isPaused() { return paused; },
  };
}
