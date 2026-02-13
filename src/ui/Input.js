import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';

const e = React.createElement;

export default function Input({ onSubmit, onPause, onResume, isPaused, isFinished }) {
  const [value, setValue] = useState('');

  useInput((input, key) => {
    if (key.escape) {
      if (isPaused) onResume?.();
      else onPause?.();
    }
  });

  const handleSubmit = (val) => {
    const trimmed = val.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setValue('');
  };

  if (isFinished) {
    return e(Box, { borderStyle: 'round', borderColor: 'green', paddingX: 1, marginTop: 1 },
      e(Text, { color: 'green', bold: true }, '✅ Debate complete! Press Ctrl+C to exit.')
    );
  }

  return e(Box, { flexDirection: 'column', marginTop: 1 },
    e(Box, { borderStyle: 'round', borderColor: isPaused ? 'yellow' : 'gray', paddingX: 1 },
      e(Text, { color: 'yellow', bold: true }, '> '),
      e(TextInput, {
        value,
        onChange: setValue,
        onSubmit: handleSubmit,
        placeholder: isPaused ? 'Paused — type question or press ESC to resume' : 'Ask a question... (ESC to pause)',
      })
    ),
    e(Box, { paddingX: 1 },
      e(Text, { color: 'gray', dimColor: true },
        `Type a question for both debaters • ESC to ${isPaused ? 'resume' : 'pause'} • Ctrl+C to quit`
      )
    )
  );
}
