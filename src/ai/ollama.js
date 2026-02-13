const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';

export async function* streamChat(model, messages) {
  const res = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, messages, stream: true }),
  });

  if (!res.ok) {
    throw new Error(`Ollama error: ${res.status} ${res.statusText}`);
  }

  const decoder = new TextDecoder();
  for await (const chunk of res.body) {
    const lines = decoder.decode(chunk, { stream: true }).split('\n').filter(Boolean);
    for (const line of lines) {
      try {
        const data = JSON.parse(line);
        if (data.message?.content) {
          yield data.message.content;
        }
        if (data.done) return;
      } catch {}
    }
  }
}
