import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getRelatedTools, getToolBySlug } from '@/lib/catalog';
import { getToolsData } from '@/lib/data';
import { absoluteUrl } from '@/lib/url';

export async function generateStaticParams() {
  return (await getToolsData()).map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tools = await getToolsData();
  const tool = getToolBySlug(params.slug, tools);

  if (!tool) {
    return { title: 'Инструмент не найден' };
  }

  return {
    title: `${tool.name} — AI-сервис для ${tool.categoryLabel} | Grog`,
    description: `${tool.name} помогает решать задачи в категории ${tool.categoryLabel}. Цена, преимущества, use cases и переход на официальный сайт через безопасный tracking.`,
    alternates: {
      canonical: absoluteUrl(`/tool/${tool.slug}`),
      languages: {
        'ru-RU': absoluteUrl(`/tool/${tool.slug}`),
      },
    },
    openGraph: {
      type: 'website',
      locale: 'ru_RU',
      url: absoluteUrl(`/tool/${tool.slug}`),
      siteName: 'Grog',
      title: `${tool.name} — AI-сервис для ${tool.categoryLabel}`,
      description: `${tool.name} для ${tool.categoryLabel}: возможности, pricing, use cases и переход через affiliate tracking.`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} — AI-сервис для ${tool.categoryLabel}`,
      description: `${tool.name} для ${tool.categoryLabel}: возможности, pricing, use cases и переход через affiliate tracking.`,
    },
  };
}

export default async function ToolPage({ params }: { params: { slug: string } }) {
  const tools = await getToolsData();
  const tool = getToolBySlug(params.slug, tools);

  if (!tool) notFound();

  const relatedTools = getRelatedTools(tool.slug, tool.category, tools);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: tool.categoryLabel,
    operatingSystem: 'Web',
    url: tool.url,
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-premium">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">{tool.categoryLabel}</p>
        <h1 className="mt-4 text-4xl font-black text-white">{tool.name}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-300">{tool.description}</p>
        <div className="mt-6 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-white/10 px-3 py-1 text-slate-200">{tool.pricing}</span>
          <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-200">verified</span>
          <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-cyan-200">commission {Math.round(tool.commission_rate * 100)}%</span>
        </div>
        <div className="mt-8 flex gap-3">
          <Link href={`/go/${tool.id}`} className="rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950">
            Перейти через трекинг
          </Link>
          <Link href={tool.url} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white">
            Официальный сайт
          </Link>
        </div>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
          <h2 className="text-2xl font-bold text-white">Use cases</h2>
          <ul className="mt-4 space-y-3 text-slate-300">
            {tool.use_cases.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
          <h2 className="text-2xl font-bold text-white">Benefits</h2>
          <ul className="mt-4 space-y-3 text-slate-300">
            {tool.benefits.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-white">Похожие инструменты</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {relatedTools.map((related) => (
            <Link key={related.id} href={`/tool/${related.slug}`} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-cyan-300">{related.categoryLabel}</p>
              <p className="mt-2 text-lg font-semibold text-white">{related.name}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
