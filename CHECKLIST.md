# Release Checklist

Use this checklist before every deployment.

## 1) Code readiness
- [ ] `npm install`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] No console errors in browser
- [ ] No runtime errors in server logs
- [ ] If using Docker, the image builds successfully

## 2) Environment variables
- [ ] `NEXT_PUBLIC_SITE_URL` is set to the production domain
- [ ] `SUPABASE_URL` is set
- [ ] `SUPABASE_ANON_KEY` is set
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is set
- [ ] `NEXTAUTH_URL` is set
- [ ] `NEXTAUTH_SECRET` is set
- [ ] `GITHUB_ID` is set if GitHub auth is enabled
- [ ] `GITHUB_SECRET` is set if GitHub auth is enabled
- [ ] `ADMIN_EMAIL` is set
- [ ] Cloudflare DNS points the domain to the chosen host

## 3) Supabase
- [ ] SQL schema imported successfully
- [ ] Tables exist: `tools`, `clicks`
- [ ] View exists: `tools_analytics`
- [ ] RLS policies are enabled
- [ ] Triggers and indexes are installed
- [ ] Seed/import data loaded
- [ ] `click_count` updates correctly

## 4) SEO / infrastructure
- [ ] `robots.txt` returns correctly
- [ ] `sitemap.xml` returns correctly
- [ ] Canonical URLs point to production domain
- [ ] `hreflang` is set to `ru-RU`
- [ ] Open Graph metadata is correct
- [ ] Tool pages return `SoftwareApplication` schema
- [ ] Home/category pages return `ItemList` and `BreadcrumbList`

## 5) Revenue tracking
- [ ] `/go/[id]` returns 302 redirect
- [ ] Clicks are written to Supabase
- [ ] UTM params are captured
- [ ] Referer is captured
- [ ] Country/device logging works
- [ ] Affiliate URLs are not exposed directly in UI

## 6) Admin
- [ ] `/admin` is protected
- [ ] NextAuth sign-in works
- [ ] Metrics load from Supabase
- [ ] Export buttons work
- [ ] Revenue estimate displays correctly

## 7) Launch checks
- [ ] Home page loads correctly
- [ ] Category pages load correctly
- [ ] Tool pages load correctly
- [ ] Redirect pages work for real IDs
- [ ] Search Console sitemap submitted
- [ ] Yandex Webmaster sitemap submitted
- [ ] Analytics / click tracking verified
- [ ] Production rollback plan is documented
- [ ] Docker restart / deploy procedure is documented
