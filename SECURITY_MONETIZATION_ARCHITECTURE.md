# Security & Monetization Architecture v1

This document defines a production-safe structure for protecting the site, preserving SEO, preventing abuse, and supporting revenue operations.

## 1) Product principle
- Public SEO pages must stay open.
- Admin and finance operations must be closed.
- Redirect tracking must stay server-side.
- Raw affiliate URLs must never be exposed in the UI.
- Secrets must remain server-only.

## 2) Public vs protected surface

### Public pages
Keep public for SEO and conversion:
- `/`
- `/category/[slug]`
- `/tool/[slug]`
- `/robots.txt`
- `/sitemap.xml`
- `/go/[id]` (public redirect endpoint, but rate-limited)

### Protected pages
Protect with auth:
- `/admin`
- import/seeding pages if they are not strictly public
- finance/payout pages
- partner dashboard if added later
- any write/configuration route

## 3) Security layers

### Layer A: application-level
- NextAuth protection for admin routes.
- Server-only Supabase service role usage.
- No secrets in client components.
- No raw affiliate URLs in page UI.
- Safe redirect responses only.

### Layer B: platform-level
- Cloudflare or equivalent WAF.
- Bot protection / challenge on suspicious traffic.
- Rate limiting for `/go/[id]` and admin sign-in.
- Geo / ASN blocking if abuse appears.
- DDoS protection.

### Layer C: repo / code-level
- Private repository.
- Branch protection.
- Required review for protected branches.
- Dependency audit.
- Secrets scanning.
- Disable source maps in production if not needed.

## 4) Recommended rate limit policy

### `/go/[id]`
- Per IP:
  - burst limit for short windows
  - daily soft cap
- Per tool:
  - detect abnormal spikes
- Per country / ASN:
  - flag suspicious patterns

### `/admin`
- Sign-in throttling.
- Lockout/extra challenge on repeated failures.

### Forms / future APIs
- CAPTCHA or Turnstile.
- Honeypot field.
- Server-side spam scoring.

## 5) Anti-scraping guidance
Important: any public website can be scraped. The goal is to make scraping expensive, noisy, and low-value.

### What helps
- Server-rendered content with minimal extra JSON.
- No internal data leak in markup.
- Pagination and internal linking that favors real users over bulk export.
- Rate limiting and WAF rules.
- Challenge suspicious automation.
- Hide internal IDs when they are not needed.

### What does not help much
- Obfuscating normal HTML.
- Hiding text in the browser with CSS/JS tricks.
- Blocking all bots indiscriminately, because SEO bots must be allowed.

## 6) Monetization model

### Inbound revenue
- Affiliate / RevShare links via `/go/[id]`.
- Click logging in Supabase.
- Tool-level revenue estimation in admin.

### Operational metrics
Track:
- clicks
- unique clicks if possible
- country
- device
- referer
- UTM source/medium/campaign
- top tools
- estimated revenue
- EPC

### Formulas
- `estimated_revenue = clicks × conversion_rate × avg_product_price × commission_rate`
- Keep conversion assumptions configurable in admin later.

## 7) Payout / money-out design
If you need to pay partners or creators, add a separate accounting layer.

### Suggested tables
- `users`
- `partner_accounts`
- `earnings_ledger`
- `payout_requests`
- `payouts`
- `wallet_balances`
- `referrals`

### Suggested workflow
1. Click / conversion is tracked.
2. Earnings are added to a pending ledger.
3. After a hold period, earnings become approved.
4. Partner requests payout.
5. Admin approves.
6. Payout is marked paid.

### Money-out methods
Choose based on jurisdiction and operations:
- manual bank transfer
- payout provider
- Stripe Connect if applicable
- other provider only if legally and operationally suitable

## 8) Authorization recommendation

### Do you need user auth on the public site?
- **No** for the main catalog pages.
- **Yes** for admin and financial dashboards.
- **Maybe later** for partner accounts, saved lists, or contributions.

### Best practice
- Keep public catalog open.
- Put all revenue/admin actions behind auth.
- Add partner auth only when there is a real payout/accounting use case.

## 9) SEO safety
Do not protect public SEO pages with auth.

### Keep open
- home
- category pages
- tool pages
- sitemap
- robots

### SEO controls
- canonical URLs
- hreflang `ru-RU`
- schema.org JSON-LD
- server-side content
- internal linking
- clean categories and slugs

## 10) Recommended next steps
1. Add rate limiting middleware or edge protection.
2. Add Cloudflare WAF rules.
3. Add admin audit logs.
4. Add payout tables only if partner payouts are actually planned.
5. Keep public pages open for SEO.
6. Validate `next build` and production headers.

## 11) Final recommendation
The strongest production setup is:
- public SEO catalog open
- `/go/[id]` public but rate-limited
- `/admin` protected by NextAuth
- finance and payout pages protected by auth + roles
- WAF + bot protection at the edge
- server-side tracking only
- Supabase as the secure source of truth
