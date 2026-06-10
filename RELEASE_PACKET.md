# Release Packet

This is the single starting point for release, deployment, validation, and growth.

## What is included
- `README.md` — project overview and quick start.
- `CHECKLIST.md` — pre-release go/no-go checklist.
- `DEPLOYMENT_RUNBOOK.md` — full deployment and operations guide.
- `PRE_RELEASE_AUDIT.md` — file-by-file audit with OK / risky / fix needed labels.
- `TS_BUILD_RISK_NOTES.md` — likely TypeScript/build pitfalls and validation notes.
- `supabase-schema.sql` — database schema.
- `ai-tools-clean.json` — cleaned catalog data.

## Release order
1. Read `CHECKLIST.md`.
2. Verify environment variables.
3. Import `supabase-schema.sql` into Supabase.
4. Load `ai-tools-clean.json`.
5. Run typecheck and build.
6. Deploy to Vercel.
7. Verify `/`, `/admin`, `/go/[id]`, `/robots.txt`, `/sitemap.xml`.
8. Submit sitemap in Search Console.

## Operational priorities
- Supabase must be the production source of truth.
- `/go/[id]` must always redirect even if logging fails.
- `/admin` must stay protected with NextAuth.
- Canonical URLs must use the production domain.
- Legacy `index.html` must not be the deployed entrypoint.

## Final go/no-go gate
Only release when all items in `CHECKLIST.md` are checked and the production environment has been verified with real traffic and real Supabase data.
