# Deployment Runbook

This document is the operational guide for production release, infrastructure setup, import, SEO, and growth.

## 1) Project summary
- Stack: Next.js 14 App Router, React 18, TypeScript strict, Tailwind CSS.
- Backend: Supabase PostgreSQL.
- Auth: NextAuth for admin protection.
- Monetization: RevShare through `/go/[id]` redirect tracking.
- SEO: metadata, canonical URLs, hreflang, sitemap, robots, schema.org.

## 2) Deployment order
1. Prepare Supabase schema.
2. Import and clean tool data.
3. Configure environment variables.
4. Validate typecheck and build.
5. Deploy to the selected host.
6. Verify redirects, SEO endpoints, and admin access.
7. Submit sitemap in Search Console.

## 3) Supabase SQL
Run `supabase-schema.sql` in the Supabase SQL editor.

### Required objects
- `tools`
- `clicks`
- `tools_analytics`
- triggers for `updated_at`, slug generation, and click count maintenance
- indexes for search, slug lookup, analytics
- RLS policies for protected write access

### Validation after import
- Confirm `tools` rows exist.
- Confirm `clicks` inserts work.
- Confirm `tools_analytics` returns totals.
- Confirm `click_count` increments on redirect.

## 4) Import workflow
1. Run the parser on the raw source data.
2. Generate `ai-tools-clean.json`.
3. Review `parsing_errors.json` if present.
4. Import the cleaned data into Supabase.
5. Verify duplicates are removed.
6. Verify category and pricing normalization.

## 5) Environment variables
Set these in local `.env` and in the selected hosting platform.

### Core
- `NEXT_PUBLIC_SITE_URL`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### Auth
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `GITHUB_ID`
- `GITHUB_SECRET`
- `ADMIN_EMAIL`

### Optional
- `NEXT_PUBLIC_DEFAULT_LOCALE=ru-RU`

## 6) Redirect and tracking
### `/go/[id]`
- Look up tool by `id`.
- Insert click row server-side into `clicks`.
- Capture UTM parameters.
- Capture referer, device type, country, IP if available.
- Respond with `302` redirect to affiliate URL or fallback URL.
- Never expose raw affiliate URLs in UI.

### Tracking expectations
- Click logging should never block the redirect.
- Redirect should still work if analytics insert fails.
- Admin metrics must read from Supabase, not local data.

## 7) SEO infrastructure
### Required endpoints
- `/robots.txt`
- `/sitemap.xml`
- canonical URLs on all pages
- `hreflang="ru-RU"`
- schema.org JSON-LD:
  - `ItemList`
  - `SoftwareApplication`
  - `BreadcrumbList`

### Verification
- Home page has premium hero and commercial copy.
- Category pages target high-intent RU keywords.
- Tool pages include pricing, use cases, CTA, and related tools.
- Canonical URLs match the production domain.

## 8) Admin dashboard
### Purpose
- total clicks
- total tools
- estimated revenue
- revenue per click
- top tools
- device breakdown
- country breakdown
- CSV / JSON export

### Access control
- Protect `/admin` with NextAuth.
- Allow only the configured admin email.
- Keep the route server-side guarded.

## 9) Build and validation
Run the following before release:
- `npm install`
- `npm run typecheck`
- `npm run build`

### Manual checks
- `/`
- `/admin`
- `/go/[id]`
- `/sitemap.xml`
- `/robots.txt`
- category pages
- tool pages

## 10) Recommended hosting options for production

### Option A — Cloudflare Pages + Cloudflare Workers style edge deployment
Best when you want low cost, global CDN, and no card-dependent platform lock-in.

- Pros:
  - usually cheaper than traditional app platforms;
  - strong CDN and caching;
  - simple custom domain setup;
  - good for SEO pages and static assets.
- Cons:
  - some Next.js features may need adaptation;
  - server-side jobs and auth flows need validation.

### Option B — VPS + Docker + reverse proxy
Best when you want maximum control and predictable cost.

- Good fits:
  - Hetzner Cloud
  - Contabo
  - Selectel
  - Timeweb Cloud
  - Yandex Cloud VM
- Typical stack:
  - Ubuntu VM
  - Docker / docker-compose
  - Caddy or Nginx as reverse proxy
  - managed domain + SSL via Let’s Encrypt
- Pros:
  - lowest operational lock-in;
  - works well from Russia;
  - easy to keep `/go/[id]`, auth, and Supabase integration stable.
- Cons:
  - you manage deploys and restarts yourself.

### Option C — Managed app hosting with RU-friendly payment/access
Use only if you confirm payment and signup availability from your region.

- Evaluate:
  - Railway
  - Render
  - Fly.io
  - other VPS-backed app platforms

### Recommendation
For this project, the safest default is:
- **Frontend app:** a small VPS with Docker;
- **Database:** Supabase;
- **DNS/CDN:** Cloudflare;
- **Auth / analytics / redirects:** inside the Next.js app on the VPS.

### Practical pick
If you want the most balanced default, choose:
- **Selectel / Timeweb Cloud / Yandex Cloud VM** for a simple VM,
- **Caddy** as reverse proxy,
- **Cloudflare** for DNS and basic edge caching.

## 11) Deployment order
1. Prepare Supabase schema.
2. Import and clean tool data.
3. Configure environment variables.
4. Validate typecheck and build.
5. Deploy to the selected host.
6. Verify redirects, SEO endpoints, and admin access.
7. Submit sitemap in Search Console.

## 11) Search Console
1. Add and verify the domain.
2. Submit `/sitemap.xml`.
3. Monitor indexing and coverage.
4. Inspect category and tool pages after deploy.

## 12) Growth and monetization
### Content expansion
- Add more category landing pages.
- Add comparison pages.
- Add use-case pages for intent keywords.
- Add FAQ blocks for long-tail SEO.

### Monetization priorities
- Keep trust-first layout.
- Place CTA after value and proof.
- Use affiliate redirects only through `/go/[id]`.
- Measure revenue per click in admin.

## 13) Release checklist
Use `CHECKLIST.md` before shipping.

## 14) Rollback plan
- Keep the previous production release available.
- Revert to last working commit if Supabase schema or auth fails.
- Disable new redirects if tracking errors are detected.
