'use client';

import { useMemo, useState } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type Props = {
  enabled?: boolean;
};

export function AiAssistant({ enabled = true }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Привет! Я AI-ассистент Grog. Могу помочь с подбором AI-инструментов, SEO, SMM, контентом, монетизацией или просто пообщаться.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const apiMessages = useMemo(
    () => messages.map((message) => ({ role: message.role, content: message.content })),
    [messages],
  );

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const nextMessages: Message[] = [...messages, { role: 'user', content: input.trim() }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages.concat({ role: 'user', content: input.trim() }) }),
      });

      const data = (await response.json()) as { reply?: string; error?: string; challengeUrl?: string };
      if (data.error === 'challenge_required') {
        setMessages((current) => [...current, { role: 'assistant', content: `Нужна быстрая проверка. Откройте ${data.challengeUrl ?? '/challenge'} и попробуйте снова.` }]);
        return;
      }
      setMessages((current) => [...current, { role: 'assistant', content: data.reply || 'Не удалось получить ответ.' }]);
    } catch {
      setMessages((current) => [...current, { role: 'assistant', content: 'Сейчас AI-ассистент недоступен. Попробуйте ещё раз.' }]);
    } finally {
      setLoading(false);
    }
  }

  if (!enabled) {
    return null;
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-premium">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">AI assistant</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Живое общение и помощь по сайту</h2>
        </div>
        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">llama-3.3-70b-versatile</span>
      </div>

      <div className="mt-6 max-h-[360px] space-y-3 overflow-y-auto rounded-3xl border border-white/10 bg-slate-950/60 p-4">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={message.role === 'user' ? 'ml-auto max-w-[85%] rounded-2xl bg-cyan-500/20 p-3 text-right text-sm text-white' : 'max-w-[85%] rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-200'}
          >
            {message.content}
          </div>
        ))}
        {loading ? <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-400">Думаю...</div> : null}
      </div>

      <div className="mt-4 flex gap-3">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              void sendMessage();
            }
          }}
          className="flex-1 rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
          placeholder="Спроси что угодно: по сайту, AI, маркетингу, жизни..."
        />
        <button
          type="button"
          onClick={() => void sendMessage()}
          className="rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          Отправить
        </button>
      </div>
    </section>
  );
}
