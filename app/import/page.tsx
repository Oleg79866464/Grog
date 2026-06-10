import Link from 'next/link';

export default function ImportPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-premium">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Import flow</p>
        <h1 className="mt-4 text-4xl font-black text-white">Supabase seed and parser workflow</h1>
        <div className="mt-6 space-y-4 text-slate-300">
          <p>1. Подготовьте ai-tools-clean.json через npm run import:tools.</p>
          <p>2. Примените supabase-schema.sql в Supabase SQL Editor.</p>
          <p>3. Импортируйте данные в tools и clicks, затем включите RLS-политики.</p>
        </div>
        <Link href="/" className="mt-8 inline-flex rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950">
          На главную
        </Link>
      </section>
    </main>
  );
}
