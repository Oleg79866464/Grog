export function getClientFingerprint(ip: string | null | undefined, userAgent: string | null | undefined) {
  return `${ip ?? 'unknown'}:${userAgent ?? 'unknown'}`;
}

export function isSuspiciousUserAgent(userAgent: string | null | undefined) {
  if (!userAgent) return true;

  const normalized = userAgent.toLowerCase();
  return [
    'curl',
    'wget',
    'python-requests',
    'scrapy',
    'httpclient',
    'axios',
    'postman',
    'headless',
    'playwright',
    'puppeteer',
  ].some((token) => normalized.includes(token));
}
