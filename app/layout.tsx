import type { Metadata } from 'next';
import { siteUrl } from '@/lib/config';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Grog — premium AI tools directory',
    template: '%s | Grog',
  },
  description: 'Премиальный каталог AI-инструментов для маркетинга, SMM, SEO, контента и growth-команд.',
  alternates: {
    canonical: siteUrl,
    languages: {
      'ru-RU': siteUrl,
      ru: siteUrl,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: siteUrl,
    siteName: 'Grog',
    title: 'Grog — premium AI tools directory',
    description: 'Премиальный каталог AI-инструментов для маркетинга, SMM, SEO, контента и growth-команд.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grog — premium AI tools directory',
    description: 'Премиальный каталог AI-инструментов для маркетинга, SMM, SEO, контента и growth-команд.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
