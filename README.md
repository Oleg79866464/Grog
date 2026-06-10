# Grog

Premium AI tools directory for the Russian market with SEO-first architecture, affiliate redirect tracking, Supabase data layer, and Next.js 14 App Router.

Premium AI tools directory for Russian-speaking marketers, SMM specialists, copywriters, bloggers, SEO specialists, product/growth teams and digital agencies.

## What this product is
Grog is a premium, trust-first, conversion-first AI tools directory built for organic SEO traffic and affiliate / RevShare monetization.

### Core goals
- premium B2B SaaS-style directory experience
- organic traffic from Google and Yandex
- high CTR to tool cards and redirects
- server-side click tracking
- SEO-rich category and tool pages
- production-ready Supabase data flow

## Stack
- Next.js 14 App Router
- React 18
- TypeScript strict
- Tailwind CSS
- Supabase PostgreSQL
- NextAuth for admin protection

## Key routes
- `/` — premium home page
- `/category/[slug]` — SEO category landing pages
- `/tool/[slug]` — tool detail pages with SoftwareApplication schema
- `/go/[id]` — server-side affiliate redirect and click logging
- `/admin` — revenue analytics dashboard
- `/import` — import and seed workflow
- `/robots.txt` — robots metadata
- `/sitemap.xml` — dynamic sitemap

## SEO map
Primary keywords:
- нейросети для маркетинга
- AI для SMM
- генератор текста
- AI для SEO
- AI для контента
- генератор изображений
- AI для видео
- AI для бизнеса
- каталог AI инструментов
- лучшие нейросети
- AI сервисы для маркетологов

Long-tail keywords:
- лучшие нейросети для маркетолога
- AI инструменты для контент-маркетинга
- нейросети для копирайтинга
- AI сервисы для SMM специалистов
- генератор постов для соцсетей
- инструменты для SEO на базе AI
- нейросети для создания контента
- AI для email маркетинга
- сервисы для создания видео нейросетью
- AI генератор картинок для рекламы

## Monetization flow
1. User opens a tool page or card.
2. CTA points to `/go/[id]`, not to the raw affiliate URL.
3. Redirect route logs the click server-side.
4. UTM parameters are preserved.
5. `clicks` table stores country, device, referer and campaign data.
6. Admin dashboard shows total clicks, estimated revenue and top tools.

Estimated revenue formula:
```text
estimated_revenue = clicks × conversion_rate × avg_product_price × commission_rate
```

Default values:
- conversion_rate = 0.15
- avg_product_price = 29
- commission_rate = 0.10–0.30

## Environment variables
Required:
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXTAUTH_SECRET`
- `ADMIN_EMAIL`
- `GITHUB_ID`
- `GITHUB_SECRET`

Optional:
- `NEXTAUTH_URL`

## Local development
```bash
npm install
npm run dev
```

## Recommended deployment for Russia

### Best default: VPS + Docker + Cloudflare + Supabase
This is the most practical option if payment access to Vercel/other SaaS hosts is difficult.

#### Suggested stack
- **App host:** Hetzner / Contabo / Selectel / Timeweb Cloud / Yandex Cloud VM
- **Reverse proxy:** Caddy or Nginx
- **DNS/CDN:** Cloudflare
- **Database:** Supabase
- **Auth:** NextAuth

#### Why this is recommended
- lower cost than many managed app platforms;
- no dependency on foreign payment cards;
- full control over server-side redirects and click tracking;
- stable SEO and canonical URLs on your own domain;
- easy to scale the app vertically at first.

#### Minimal production flow
1. Buy or rent a small VPS.
2. Install Docker and Docker Compose.
3. Point the domain to Cloudflare.
4. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
5. Configure Supabase env vars.
6. Build and run the app in Docker.
7. Verify `/`, `/admin`, `/go/[id]`, `/robots.txt`, `/sitemap.xml`.
8. Submit sitemap to Google Search Console and Yandex Webmaster.

## Import data
```bash
npm run import:tools
```

## Supabase setup
1. Create a new Supabase project.
2. Apply `supabase-schema.sql` in SQL editor.
3. Import tool data into `public.tools`.
4. Confirm RLS policies and triggers are active.
5. Set environment variables in the chosen hosting platform.

## Production deployment checklist
- [ ] Set all environment variables
- [ ] Apply `supabase-schema.sql`
- [ ] Import `ai-tools-clean.json` into `public.tools`
- [ ] Verify `/`, `/admin`, `/go/[id]`, `/sitemap.xml`, `/robots.txt`
- [ ] Confirm server-side click inserts into `public.clicks`
- [ ] Confirm `tools_analytics` view returns correct metrics
- [ ] Check NextAuth login for admin email only
- [ ] Run `npm run build`
- [ ] Run TypeScript/typecheck in CI
- [ ] Deploy to the chosen hosting platform
- [ ] Submit sitemap to Google Search Console and Yandex Webmaster
- [ ] Test affiliate redirect parameters and click logging

## Design principles
- expensive B2B SaaS look
- premium spacing
- polished cards
- subtle gradients
- trust-first hierarchy
- mobile-first responsive layout
- conversion-oriented CTA flow

## Notes
- Raw affiliate links are not exposed in the UI.
- The redirect layer should remain the only public exit path for monetized CTAs.
- If Supabase env vars are missing, the app falls back to local data for resilience in non-production environments.
