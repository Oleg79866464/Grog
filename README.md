# Grog

Premium AI tools directory for Russian-speaking marketers, SMM specialists, copywriters, bloggers, SEO teams and agencies.

## Stack
- Next.js 14 App Router
- React 18
- TypeScript strict
- Tailwind CSS
- Supabase PostgreSQL

## Features
- premium home page
- SEO category pages
- tool detail pages
- `/go/[id]` affiliate redirect flow
- server-side tracking ready
- sitemap and robots metadata
- schema.org JSON-LD
- admin revenue dashboard
- parser/import workflow for Supabase

## Run locally
```bash
npm install
npm run dev
```

## Import data
```bash
npm run import:tools
```

## Deploy
1. Add Supabase env vars:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. Apply `supabase-schema.sql` in Supabase.
3. Import `ai-tools-clean.json`.
4. Run `npm run build`.
5. Deploy to Vercel.

## SEO map
- `/` — home
- `/category/[slug]` — commercial category landing pages
- `/tool/[slug]` — software application pages
- `/go/[id]` — redirect and tracking
- `/admin` — revenue analytics
- `/import` — import instructions
