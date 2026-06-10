'use client';

import { useState } from 'react';

type Props = {
  endpoint: string;
};

export function ManualMonetizationOfferForm({ endpoint }: Props) {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus('');

    const formData = new FormData(event.currentTarget);
    const payload = {
      id: String(formData.get('id') ?? '').trim(),
      slug: String(formData.get('slug') ?? '').trim(),
      entity_type: String(formData.get('entity_type') ?? '').trim(),
      title: String(formData.get('title') ?? '').trim(),
      description: String(formData.get('description') ?? '').trim(),
      short_description: String(formData.get('short_description') ?? '').trim(),
      url: String(formData.get('url') ?? '').trim(),
      affiliate_url: String(formData.get('affiliate_url') ?? '').trim(),
      cta_label: String(formData.get('cta_label') ?? '').trim(),
      category: String(formData.get('category') ?? '').trim(),
      placement: String(formData.get('placement') ?? '').trim(),
      price_model: String(formData.get('price_model') ?? '').trim(),
      pricing: String(formData.get('pricing') ?? '').trim(),
      commission_rate: Number(formData.get('commission_rate') ?? 0),
      featured: formData.get('featured') === 'on',
      verified: formData.get('verified') === 'on',
      status: String(formData.get('status') ?? '').trim(),
      tags: String(formData.get('tags') ?? '')
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean),
      country: String(formData.get('country') ?? 'RU').trim(),
      device_type: String(formData.get('device_type') ?? 'all').trim(),
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => null)) as { error?: string; ok?: boolean } | null;
      if (!response.ok || !data?.ok) {
        setStatus(data?.error ? `Ошибка: ${data.error}` : 'Ошибка сохранения оффера');
        return;
      }

      setStatus('Оффер сохранён');
      event.currentTarget.reset();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3" onSubmit={onSubmit}>
      {[
        ['id', 'Offer ID'],
        ['slug', 'Slug'],
        ['entity_type', 'Entity type'],
        ['title', 'Title'],
        ['description', 'Description'],
        ['short_description', 'Short description'],
        ['url', 'URL'],
        ['affiliate_url', 'Affiliate URL'],
        ['cta_label', 'CTA label'],
        ['category', 'Category'],
        ['placement', 'Placement'],
        ['price_model', 'Price model'],
        ['pricing', 'Pricing'],
        ['commission_rate', 'Commission rate'],
        ['tags', 'Tags comma separated'],
        ['country', 'Country'],
        ['device_type', 'Device type'],
      ].map(([name, placeholder]) => (
        <input
          key={name}
          name={name}
          placeholder={placeholder}
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500"
        />
      ))}
      <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
        <input type="checkbox" name="featured" className="h-4 w-4" /> Featured
      </label>
      <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
        <input type="checkbox" name="verified" className="h-4 w-4" /> Verified
      </label>
      <input name="status" placeholder="Status" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500" />
      <button type="submit" disabled={loading} className="rounded-2xl bg-emerald-400 px-5 py-3 font-semibold text-slate-950 disabled:opacity-60 xl:col-span-3">
        {loading ? 'Saving...' : 'Save monetization offer'}
      </button>
      {status ? <p className="xl:col-span-3 text-sm text-slate-300">{status}</p> : null}
    </form>
  );
}
