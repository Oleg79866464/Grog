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
      <body>{children}</body>
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
