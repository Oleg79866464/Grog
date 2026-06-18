const fallbackSiteUrl = 'https://groggrowth.example';
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteUrl = (() => {
  const candidate = configuredSiteUrl || fallbackSiteUrl;

  try {
    const parsed = new URL(candidate);
    return parsed.origin;
  } catch {
    return fallbackSiteUrl;
  }
})();

export const siteLocale = 'ru-RU';

export const analyticsConfig = {
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA4_ID?.trim() || '',
  yandexMetricaId: process.env.NEXT_PUBLIC_YANDEX_METRICA_ID?.trim() || '',
  googleSearchConsoleDomain: process.env.NEXT_PUBLIC_GSC_DOMAIN?.trim() || siteUrl,
};
