import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPromptsData } from '@/lib/prompts';
import { getPromptCategoryBySlug } from '@/lib/prompts-catalog';
import { absoluteUrl } from '@/lib/url';

export async function generateStaticParams() {
  return (await getPromptsData()).map((prompt) => ({ slug: prompt.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const prompt = (await getPromptsData()).find((item) => item.slug === params.slug);

  if (!prompt) {
    return { title: 'Промпт не найден' };
  }

  const canonical = absoluteUrl(`/prompts/${prompt.slug}`);

  return {
    title: `${prompt.title} | Grog`,
    description: prompt.description,
    alternates: {
      canonical,
      languages: {
        'ru-RU': canonical,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'ru_RU',
      url: canonical,
      siteName: 'Grog',
      title: prompt.title,
      description: prompt.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: prompt.title,
      description: prompt.description,
    },
  };
}

export default async function PromptPage({ params }: { params: { slug: string } }) {
  const prompt = (await getPromptsData()).find((item) => item.slug === params.slug);

  if (!prompt) notFound();

  const category = getPromptCategoryBySlug(prompt.category);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: prompt.title,
    description: prompt.description,
    url: absoluteUrl(`/prompts/${prompt.slug}`),
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-premium">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">{prompt.categoryLabel}</p>
        <h1 className="mt-4 text-4xl font-black text-white">{prompt.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-300">{prompt.description}</p>
        <div className="mt-6 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-white/10 px-3 py-1 text-slate-200">{prompt.price} {prompt.currency}</span>
          <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-cyan-200">{prompt.featured ? 'featured' : 'standard'}</span>
        </div>
        <div className="mt-8 flex gap-3">
          <Link href="#details" className="rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950">
            Смотреть детали
          </Link>
          {category ? (
            <Link href={`/prompts/category/${category.slug}`} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white">
              В категорию
            </Link>
          ) : null}
        </div>
      </section>

      <section id="details" className="mt-10 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
          <h2 className="text-2xl font-bold text-white">Preview</h2>
          <p className="mt-4 text-slate-300">{prompt.preview_text}</p>
        </div>
        <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
          <h2 className="text-2xl font-bold text-white">Tags</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {prompt.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-sm text-slate-200">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
