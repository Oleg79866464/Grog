type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const windowMs = 60_000;
const maxRequestsPerWindow = 60;
const store = new Map<string, RateLimitEntry>();

export function isRateLimited(key: string) {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  entry.count += 1;
  store.set(key, entry);
  return entry.count > maxRequestsPerWindow;
}

export function getRateLimitRetryAfterSeconds(key: string) {
  const entry = store.get(key);
  if (!entry) return 0;
  const remainingMs = Math.max(0, entry.resetAt - Date.now());
  return Math.ceil(remainingMs / 1000);
}
