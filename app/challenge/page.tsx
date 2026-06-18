import Link from 'next/link';

export default function ChallengePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center px-4 py-12 sm:px-6 lg:px-8">
      <section className="w-full rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-premium backdrop-blur-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Security check</p>
        <h1 className="mt-4 text-4xl font-black text-white">Подтвердите, что вы человек</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
          На этом сайте включена премиальная anti-abuse защита. Если вы видите эту страницу, система заметила подозрительно частые запросы или автоматизацию.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
            <p className="text-sm text-slate-400">What to do</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              <li>• Подождите несколько секунд и обновите страницу.</li>
              <li>• Выключите VPN / подозрительные расширения.</li>
              <li>• Если это вы — вернитесь к работе через обычный браузер.</li>
            </ul>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 p-5">
            <p className="text-sm text-cyan-200">Pro mode</p>
            <p className="mt-3 text-sm leading-7 text-slate-100">
              Защита автоматически отключается для обычного пользовательского поведения. Для админа доступ остаётся через авторизацию.
            </p>
            <Link href="/" className="mt-5 inline-flex rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950">
              Вернуться на сайт
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
