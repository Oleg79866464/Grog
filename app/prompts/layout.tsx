import type { ReactNode } from 'react';
import Link from 'next/link';

export default function PromptsLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <nav className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
            Grog
          </Link>
          <div className="flex gap-3 text-sm text-slate-300">
            <Link href="/prompts" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10">
              Промпты
            </Link>
            <Link href="/prompts/category/marketing" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10">
              Маркетинг
            </Link>
            <Link href="/prompts/category/seo" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10">
              SEO
            </Link>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
