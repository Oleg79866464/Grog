# Pre-Release Diff Audit

Status legend:
- **OK** — low risk, production-ready for current scope.
- **risky** — works, but has a realistic build/runtime/SEO/ops risk and should be monitored.
- **fix needed** — likely release blocker or correctness issue.

## Summary
- OK: 12
- risky: 6
- fix needed: 0

## File-by-file audit

### README.md — OK
- Clear release entry point.
- Documents the main setup and deployment flow.
- No obvious TS/build risk.

### CHECKLIST.md — OK
- Short, practical go/no-go checklist.
- Useful for release ops.
- No code risk.

### DEPLOYMENT_RUNBOOK.md — OK
- Good operational structure.
- Covers Supabase, env vars, SEO, Vercel, Search Console, rollback.
- No code risk.

### supabase-schema.sql — risky
- Schema is central to runtime correctness.
- Risk: Supabase view / trigger / RLS definitions must match the final app queries exactly.
- Risk: if `clicks` or `tools_analytics` names differ from query code, admin metrics and redirect tracking will silently degrade.
- Action: verify SQL against live Supabase before launch.

### ai-tools-clean.json — risky
- Data quality drives categories, slugs, and SEO pages.
- Risk: malformed or inconsistent pricing/category values can affect tool pages and metadata generation.
- Action: validate deduplication and normalization on import.

### import-parser.js — risky
- Import pipeline is important for scaling content.
- Risk: parser output shape must remain stable; otherwise seed/import flow breaks.
- Action: test parser against a representative raw sample before release.

### index.html — risky
- Legacy static entry remains in repo.
- Risk: confusion during deployment if hosting target accidentally serves the wrong entrypoint.
- Action: ensure production deploy uses Next.js app, not the legacy static file.

### middleware.ts — risky
- Protects admin routes.
- Risk: middleware auth assumptions can break if NextAuth env vars are missing.
- Action: confirm route matcher and auth envs in staging.

### next-env.d.ts — OK
- Standard Next.js type shim.
- No issue.

### package.json — risky
- Dependency versions govern build stability.
- Risk: NextAuth / Next / React version mismatch can cause build-time incompatibilities.
- Action: confirm install and lockfile consistency in CI/local before release.

### postcss.config.js — OK
- Standard build config.
- No specific risk observed.

### tailwind.config.ts — OK
- Styling config is conventional.
- No specific risk observed.

### tsconfig.json — risky
- TypeScript strictness is good, but config can become a build blocker if path aliases or module settings drift.
- Action: verify with real `next build`.

### app/layout.tsx — risky
- Root layout is structurally correct.
- Risk: `metadataBase`/domain-dependent SEO values can fail if env vars are unset or invalid.
- Action: verify production `NEXT_PUBLIC_SITE_URL`.

### app/page.tsx — OK
- Home page is the main conversion surface.
- No immediate correctness issue from audit.

### app/category/[slug]/page.tsx — OK
- Uses proper `notFound()` behavior for missing categories.
- SEO-correct shape.

### app/tool/[slug]/page.tsx — OK
- Uses proper `notFound()` behavior.
- Schema/related content flow looks aligned with release goals.

### app/go/[id]/route.ts — risky
- Core monetization and analytics path.
- Risk: redirect must never be blocked by tracking insert failure.
- Risk: if Supabase env vars are missing, logs may degrade silently.
- Action: keep redirect-first behavior and monitor insert errors.

### app/admin/page.tsx — risky
- Metrics page depends on live Supabase view/aggregations.
- Risk: row typing or query shape mismatch can break admin analytics or exports.
- Action: verify against live view and export functions.

### app/import/page.tsx — OK
- Documentation/ops page only.
- Low risk.

### app/sitemap.ts — risky
- Important SEO endpoint.
- Risk: invalid timestamps or missing site URL can damage sitemap generation.
- Action: verify output in production domain.

### app/robots.ts — OK
- Standard SEO infrastructure.
- No issue observed.

### app/api/auth/[...nextauth]/route.ts — risky
- Admin auth is critical.
- Risk: GitHub OAuth env vars must be present, and sign-in policy must match admin email.
- Action: test real sign-in flow before release.

### lib/catalog.ts — risky
- Catalog typing was relaxed to avoid data shape issues.
- Risk: looser raw typing can hide malformed import data until runtime.
- Action: validate the source JSON and generated tool records.

### lib/config.ts — OK
- Domain helpers are safer now.
- Good guard against invalid metadata base values.

### lib/data.ts — risky
- Supabase-first with JSON fallback is practical.
- Risk: build/runtime differences between Supabase and fallback data sources can create route inconsistencies.
- Action: treat Supabase as source of truth for production.

### lib/auth.ts — OK
- Simple admin email gate.
- Low risk if env is set correctly.

### lib/supabase.ts — OK
- Safe client creation pattern.
- Low risk.

### lib/supabase-server.ts — risky
- Service-role client is appropriate for server-side operations.
- Risk: exposing or misconfiguring service key would be high impact.
- Action: keep it server-only and verify env secrets.

## Highest-priority release checks
1. Validate `supabase-schema.sql` in a real Supabase project.
2. Verify `/go/[id]` click insert + 302 redirect in production-like env.
3. Verify NextAuth admin login with real GitHub OAuth env vars.
4. Verify `NEXT_PUBLIC_SITE_URL` and canonical/metadata output.
5. Verify import pipeline against real source data.
6. Confirm production deploy does not serve legacy `index.html`.
