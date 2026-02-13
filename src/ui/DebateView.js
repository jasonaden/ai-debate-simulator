import React from 'react';
import { Box, Text } from 'ink';

const e = React.createElement;

const SPEAKER_STYLES = {
  Pro: { color: 'green', badge: '🟢', label: 'PRO' },
  Con: { color: 'red', badge: '🔴', label: 'CON' },
  Moderator: { color: 'yellow', badge: '🟡', label: 'MOD' },
  System: { color: 'cyan', badge: '⚡', label: 'SYS' },
};

function SpeakerBubble({ speaker, text, isStreaming }) {
  const style = SPEAKER_STYLES[speaker] || SPEAKER_STYLES.System;
  return e(Box, { flexDirection: 'column', marginBottom: 1 },
    e(Box, null,
      e(Text, { bold: true, color: style.color }, `${style.badge} ${style.label}`),
      isStreaming && e(Text, { color: 'gray' }, ' ▊')
    ),
    e(Box, { marginLeft: 3, marginRight: 2 },
      e(Text, { wrap: 'wrap', color: style.color }, text)
    )
  );
}

function RoundHeader({ round, totalRounds }) {
  const progress = '━'.repeat(round) + '╌'.repeat(totalRounds - round);
  return e(Box, { marginY: 1, justifyContent: 'center' },
    e(Text, { bold: true, color: 'white', backgroundColor: 'blueBright' }, ` ⚔  Round ${round}/${totalRounds} `),
    e(Text, { color: 'blueBright' }, ` [${progress}]`)
  );
}

export default function DebateView({ messages, currentRound, totalRounds, streamingSpeaker, streamingText, status }) {
  return e(Box, { flexDirection: 'column', paddingX: 1 },
    // Header
    e(Box, { borderStyle: 'double', borderColor: 'cyan', paddingX: 2, justifyContent: 'center', marginBottom: 1 },
      e(Text, { bold: true, color: 'cyan' }, '⚡ AI DEBATE SIMULATOR ⚡')
    ),
    // Status
    status && e(Box, { marginBottom: 1 },
      e(Text, { color: 'gray', italic: true }, status)
    ),
    // Round header
    currentRound > 0 && e(RoundHeader, { round: currentRound, totalRounds }),
    // History
    ...messages.map((msg, i) =>
      e(SpeakerBubble, { key: i, speaker: msg.speaker, text: msg.text })
    ),
    // Streaming
    streamingSpeaker && streamingText && e(SpeakerBubble, { speaker: streamingSpeaker, text: streamingText, isStreaming: true })
  );
}
