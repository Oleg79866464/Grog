import type { Metadata } from 'next';
import { siteUrl } from '@/lib/config';
import './globals.css';

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Content-Security-Policy', value: "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline'; connect-src 'self' https:; frame-ancestors 'self'; base-uri 'self'; form-action 'self' https:;" },
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Grog — премиальный каталог AI-инструментов',
    template: '%s | Grog',
  },
  description: 'Премиальный каталог AI-инструментов для маркетинга, SMM, SEO, контента и growth-команд с server-side tracking и affiliate-first UX.',
  alternates: {
    canonical: siteUrl,
    languages: {
      'ru-RU': siteUrl,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: siteUrl,
    siteName: 'Grog',
    title: 'Grog — премиальный каталог AI-инструментов',
    description: 'Премиальный каталог AI-инструментов для маркетинга, SMM, SEO, контента и growth-команд с server-side tracking и affiliate-first UX.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grog — премиальный каталог AI-инструментов',
    description: 'Премиальный каталог AI-инструментов для маркетинга, SMM, SEO, контента и growth-команд с server-side tracking и affiliate-first UX.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className="relative overflow-x-hidden">
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_26%),radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.08),transparent_24%)]" />
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(180deg,rgba(2,6,23,0)_0%,rgba(2,6,23,0.45)_100%)]" />
        {children}
        <footer className="border-t border-white/10 bg-slate-950/70 px-4 py-6 text-center text-xs text-slate-500 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Grog. Все права защищены.</p>
            <p>Авторский проект по каталогу AI-инструментов, SEO и RevShare-монетизации.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    themeColor: '#0f172a',
  };
}
