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
