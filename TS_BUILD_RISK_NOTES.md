# TS / Build Risk Notes

This document lists the most likely TypeScript/build issues by file and line area, with a practical fix suggestion for each.

## 1) `app/layout.tsx:5-14`
**Potential risk:** `metadataBase: new URL(siteUrl)` will throw during build if `siteUrl` is empty, invalid, or not an absolute URL.

**Why it matters:** A bad production env var can break the whole app build.

**Fix direction:** Keep the guarded fallback in `lib/config.ts` and verify `NEXT_PUBLIC_SITE_URL` is always absolute in production.

## 2) `lib/data.ts:5-15`
**Potential risk:** Supabase fallback to `localTools` can cause data-source divergence between build/runtime environments.

**Why it matters:** Routes generated from Supabase may not match runtime lookups from local JSON, causing missing pages or inconsistent metadata.

**Fix direction:** Treat Supabase as the single source of truth in production and keep fallback only for local development.

## 3) `lib/catalog.ts`
**Potential risk:** Relaxed JSON/raw typing can hide malformed tool records.

**Why it matters:** A bad field shape can surface later in category pages, tool pages, sitemap generation, or admin metrics.

**Fix direction:** Add strict validation at import time and reject malformed entries early.

## 4) `app/admin/page.tsx:33-45`
**Potential risk:** Analytics row shape depends on Supabase view columns (`tracked_clicks`, `click_count`, `total_clicks`, `mobile_clicks`, `desktop_clicks`). If the view schema drifts, the page can compile but show wrong metrics.

**Why it matters:** Admin revenue and click reporting may become incorrect.

**Fix direction:** Lock the SQL view schema and align TypeScript types with a single canonical metric shape.

## 5) `app/go/[id]/route.ts`
**Potential risk:** If click logging insert fails and the code path isn’t fully isolated, redirect reliability may degrade.

**Why it matters:** Monetization depends on fast 302 redirect even if analytics is unavailable.

**Fix direction:** Ensure redirect is always returned even when logging throws, and log errors without blocking response.

## 6) `app/sitemap.ts`
**Potential risk:** Invalid or missing timestamps can break sitemap serialization or produce poor lastmod values.

**Why it matters:** SEO endpoint quality affects indexing and crawl trust.

**Fix direction:** Use safe fallback dates and validate the production base URL.

## 7) `app/api/auth/[...nextauth]/route.ts`
**Potential risk:** `GITHUB_ID` / `GITHUB_SECRET` defaulting to empty strings can make auth configuration look valid at compile time but fail at runtime.

**Why it matters:** `/admin` can become inaccessible or sign-in can fail silently.

**Fix direction:** Fail fast in staging if auth env vars are missing; verify sign-in flow before release.

## 8) `middleware.ts`
**Potential risk:** Middleware auth logic can be sensitive to NextAuth session shape and env setup.

**Why it matters:** Incorrect matcher or auth assumptions can block `/admin` unexpectedly.

**Fix direction:** Test protected route behavior in production-like env with real cookies/session.

## 9) `supabase-schema.sql`
**Potential risk:** If table/view/trigger names don’t match app queries exactly, TypeScript won’t catch it and runtime analytics will fail.

**Why it matters:** This is the biggest source of silent production issues.

**Fix direction:** Keep a single canonical SQL schema and verify every queried column exists.

## 10) `index.html`
**Potential risk:** Legacy static entry could be deployed accidentally instead of the Next.js app.

**Why it matters:** This is a deployment/process failure, not a TS issue, but it can completely bypass the new app.

**Fix direction:** Confirm hosting target serves the Next.js build output only.

## 11) `package.json`
**Potential risk:** Dependency version mismatch can cause build/type incompatibilities.

**Why it matters:** Next.js, NextAuth, React, and Supabase packages need version compatibility.

**Fix direction:** Run a real install and build in a clean environment before release.

## 12) `tsconfig.json`
**Potential risk:** Path alias or strictness settings can break imports/build unexpectedly.

**Why it matters:** Build errors can appear only in CI or after dependency changes.

**Fix direction:** Verify `next build` in a clean environment.

## Highest confidence release blockers to verify first
1. `NEXT_PUBLIC_SITE_URL` is valid and absolute.
2. Supabase schema matches the app query names.
3. NextAuth env vars are set and GitHub login works.
4. `/go/[id]` redirects even when logging fails.
5. The production host serves the Next.js app, not the legacy `index.html`.
