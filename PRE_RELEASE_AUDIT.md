# Pre-release Audit

Формат оценки:
- **OK** — готово к релизу;
- **risky** — работает, но требует проверки или может ломаться в отдельных средах;
- **fix needed** — требуется исправление до релиза.

## Summary

Состояние проекта: **почти готово к production**, но есть несколько мест, которые нужно проверить до запуска:
- environment variables должны быть заполнены в production;
- Supabase schema должна совпадать с route handlers;
- build/typecheck стоит прогнать в реальной среде;
- fallback-режим на локальные данные остаётся только как аварийный.

## File-by-file audit

### `app/page.tsx` — OK
- Homepage использует серверные данные и отображает premium/SEO-first контент.
- `getSiteControls()` уже вызывается через `await`.
- Риск только в доступности env vars Supabase.

### `app/category/[slug]/page.tsx` — OK
- Страница категории рендерится server-side.
- Использует `getToolsData()` и `getToolsByCategory(...)`.
- Schema.org `ItemList` присутствует.
- Metadata и canonical выглядят корректно.

### `app/tool/[slug]/page.tsx` — OK
- `generateMetadata` и page component исправлены на async.
- Данные берутся через `getToolsData()`.
- `SoftwareApplication` schema присутствует.
- Перейти через `/go/[id]` — правильно для affiliate flow.

### `app/go/[id]/route.ts` — risky
- Server-side click logging реализован.
- Есть rate limit и challenge flow.
- Важно проверить в production, что:
  - `x-forwarded-for` доступен за выбранным reverse proxy;
  - insert в `clicks` соответствует реальной Supabase schema;
  - fallback redirect работает даже при ошибке insert.
- Это самый чувствительный runtime-endpoint проекта.

### `app/admin/page.tsx` — risky
- Доступ защищён через NextAuth.
- Метрики читаются из Supabase.
- Риск: `tools_analytics` должен реально содержать ожидаемые поля (`tracked_clicks`, `total_clicks`, `mobile_clicks`, `desktop_clicks`).
- Если view отличается по колонкам, будет runtime mismatch.

### `app/layout.tsx` — OK
- Metadata и SEO base настроены.
- `siteUrl` проходит через safe fallback.
- Глобальные meta для production выглядят хорошо.

### `lib/data.ts` — risky
- При отсутствии Supabase env vars используется local fallback.
- Это полезно для dev, но в production нужно убедиться, что fallback не активируется случайно.
- Также важно, чтобы таблица `tools` соответствовала `Tool` типу.

### `lib/site-controls.ts` — OK
- Асинхронное чтение `site_controls` корректно.
- Есть безопасный fallback.

### `lib/supabase-server.ts` — OK
- Возвращает `null`, если env vars отсутствуют.
- Это защищает от падений в dev и на misconfigured deploy.

### `middleware.ts` — OK
- Защищает только `/admin`.
- Это правильный компромисс между security и SEO.

### `app/sitemap.ts` — OK
- Генерируется динамически.
- Использует production base URL.
- `lastModified` проверяется безопасно.

### `app/robots.ts` — OK
- Технически соответствует production SEO needs.

### `README.md` — OK
- Теперь ориентирован на VPS + Docker + Cloudflare + Supabase.
- Не создаёт ложной зависимости от Vercel.

### `CHECKLIST.md` — OK
- Чёткий release checklist.
- Подходит для launch discipline.

### `DEPLOYMENT_RUNBOOK.md` — OK
- Хороший operational документ.
- Описывает несколько hosting вариантов и рекомендуемый default.

### `PRODUCTION_LAUNCH_RUNBOOK.md` — OK
- Лучший single-source-of-truth для запуска.
- Покрывает Supabase, VPS, Cloudflare, NextAuth, SEO и rollback.

### `supabase-schema.sql` — risky
- Это центральный источник правды для runtime.
- Нужно проверить:
  - `tools` schema;
  - `clicks` schema;
  - `tools_analytics` view;
  - triggers;
  - RLS policies.
- Любое несоответствие может сломать `/go/[id]` или admin metrics.

### `supabase-site-controls.sql` — OK
- Хороший механизм feature flag / anti-capture control.

### `supabase-ops.sql` — OK
- Полезный задел под payouts / affiliate ledger.

## Potential TypeScript / build risk points

1. **`app/go/[id]/route.ts`**
   - `tool` lookup зависит от структуры данных.
   - `request.ip` может быть недоступен в некоторых runtime окружениях, но fallback уже есть.

2. **`app/admin/page.tsx`**
   - `analyticsQuery.data` is cast to `AnalyticsRow[]`.
   - Если view columns не совпадут, TS не поймает это, но runtime может.

3. **`lib/data.ts`**
   - `return data as Tool[]` assumes Supabase row shape matches `Tool`.
   - If schema diverges, runtime data issues may appear.

4. **`app/category/[slug]/page.tsx` and `app/tool/[slug]/page.tsx`**
   - Metadata/page components now use async correctly.
   - This is a previously high-risk area and looks fixed.

## Fix priority before release

### Must verify before launch
- `supabase-schema.sql` applied successfully.
- `tools`, `clicks`, `tools_analytics` exist and contain the expected columns.
- `/go/[id]` logs a click and still redirects if logging fails.
- `/admin` is accessible only to the admin email.
- Production env vars are set on the host.
- `npm run build` passes on the actual runtime environment.

### Good-to-have
- Add a smoke test for `go` redirect on the chosen host.
- Add one sample row to Supabase and verify admin metrics end-to-end.
- Keep local fallback only for non-production environments.

## Final verdict

**Ready for production after schema/env/build verification.**

The codebase is in a strong state: SEO, monetization, admin auth, and release docs are all in place. The remaining risk is almost entirely in infrastructure alignment, not in product structure.
