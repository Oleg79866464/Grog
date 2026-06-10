'use client';

import { useState } from 'react';

export function SecurityChallenge({ onSolved }: { onSolved?: () => void }) {
  const [verified, setVerified] = useState(false);
  const [selected, setSelected] = useState(false);

  function handleVerify() {
    setVerified(true);
    onSolved?.();
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-premium backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Human verification</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Выполните быструю проверку</h2>
        </div>
        <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">Premium challenge</div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
          <p className="text-sm text-slate-400">Нажмите на элемент, который выглядит как core UX</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {['AI assistant', 'Admin panel', 'Sitemap', 'Marketing tools'].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setSelected(item === 'AI assistant')}
                className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${selected && item === 'AI assistant' ? 'border-cyan-300 bg-cyan-400/20 text-white' : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'}`}
              >
                {item}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={handleVerify}
            className="mt-4 rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Verify
          </button>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-cyan-500/20 to-slate-950/70 p-5">
          <p className="text-sm text-cyan-200">Why this exists</p>
          <p className="mt-3 text-sm leading-7 text-slate-100">
            Эта капча включается только при подозрительном трафике. Для обычных пользователей сайт остаётся быстрым и SEO-friendly.
          </p>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
            Status: {verified ? 'verified' : 'waiting'}
          </div>
        </div>
      </div>
    </section>
  );
}
