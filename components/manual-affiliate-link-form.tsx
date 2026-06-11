'use client';

import { useState, type FormEvent } from 'react';

type Props = {
  endpoint: string;
};

export function ManualAffiliateLinkForm({ endpoint }: Props) {
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus('');

    const formData = new FormData(event.currentTarget);
    const id = String(formData.get('id') ?? '').trim();
    const affiliate_url = String(formData.get('affiliate_url') ?? '').trim();

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, affiliate_url }),
      });

      const data = (await response.json().catch(() => null)) as { error?: string; ok?: boolean } | null;
      if (!response.ok || !data?.ok) {
        setStatus(data?.error ? `Ошибка: ${data.error}` : 'Ошибка обновления ссылки');
        return;
      }

      setStatus('Affiliate URL сохранён');
      event.currentTarget.reset();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="mt-6 grid gap-4 md:grid-cols-[1fr_2fr_auto]" onSubmit={onSubmit}>
      <input
        name="id"
        placeholder="Tool ID"
        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500"
      />
      <input
        name="affiliate_url"
        placeholder="https://partner-link.example"
        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500"
      />
      <button type="submit" disabled={loading} className="rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 disabled:opacity-60">
        {loading ? 'Saving...' : 'Save URL'}
      </button>
      {status ? <p className="md:col-span-3 text-sm text-slate-300">{status}</p> : null}
    </form>
  );
}
