import React, { useState, useEffect, useCallback } from 'react';
import { Box } from 'ink';
import { createDebate } from '../debate.js';
import DebateView from './DebateView.js';
import Input from './Input.js';

const e = React.createElement;

export default function App({ topic, rounds = 5 }) {
  const [messages, setMessages] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [streamingSpeaker, setStreamingSpeaker] = useState(null);
  const [streamingText, setStreamingText] = useState('');
  const [status, setStatus] = useState('Initializing debate...');
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [debate, setDebate] = useState(null);

  useEffect(() => {
    const d = createDebate(topic, rounds);

    d.on('debateStart', ({ topic }) => {
      setStatus(`Topic: "${topic}"`);
      setMessages((prev) => [...prev, { speaker: 'System', text: `Debate topic: "${topic}"` }]);
    });

    d.on('roundStart', ({ round, totalRounds }) => {
      setCurrentRound(round);
      setStatus(`Round ${round} of ${totalRounds}`);
    });

    d.on('turnStart', ({ speaker }) => {
      setStreamingSpeaker(speaker);
      setStreamingText('');
    });

    d.on('token', ({ token }) => {
      setStreamingText((prev) => prev + token);
    });

    d.on('turnEnd', ({ speaker, text }) => {
      setMessages((prev) => [...prev, { speaker, text }]);
      setStreamingSpeaker(null);
      setStreamingText('');
    });

    d.on('roundEnd', ({ round }) => {
      setStatus(`Round ${round} complete`);
    });

    d.on('debateEnd', () => {
      setStatus('Debate finished!');
      setIsFinished(true);
    });

    d.on('paused', () => { setIsPaused(true); setStatus('⏸  Paused'); });
    d.on('resumed', () => { setIsPaused(false); setStatus('▶  Resumed'); });
    d.on('moderatorQuestion', (q) => {
      setMessages((prev) => [...prev, { speaker: 'Moderator', text: q }]);
    });

    setDebate(d);
    d.start().catch((err) => setStatus(`Error: ${err.message}`));

    return () => d.stop();
  }, [topic, rounds]);

  const handleSubmit = useCallback((text) => { if (debate) debate.addModeratorQuestion(text); }, [debate]);
  const handlePause = useCallback(() => { if (debate) debate.pause(); }, [debate]);
  const handleResume = useCallback(() => { if (debate) debate.resume(); }, [debate]);

  return e(Box, { flexDirection: 'column', minHeight: 20 },
    e(DebateView, { messages, currentRound, totalRounds: rounds, streamingSpeaker, streamingText, status }),
    e(Input, { onSubmit: handleSubmit, onPause: handlePause, onResume: handleResume, isPaused, isFinished })
  );
}
