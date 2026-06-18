# TS / Build Risk Notes

## Status
Статический pre-build audit показал, что основной риск уже устранён: `/go/[id]` больше не использует устаревший вызов `getToolBySlug(params.id)` без массива tools.

## Проверенные потенциальные риски

### 1) `app/go/[id]/route.ts`
- **Было risky:** `getToolBySlug(params.id)` вызывался с неправильной сигнатурой.
- **Исправлено:** теперь маршрут использует `getToolDataBySlug(params.id)` и fallback на `getToolsData()`.
- **Было risky:** использование `request.ip`.
- **Исправлено:** оставлен только `x-forwarded-for` fallback на `'unknown'`.

### 2) `app/tool/[slug]/page.tsx`
- `getToolBySlug(params.slug, tools)` соответствует текущей сигнатуре `lib/catalog.ts`.
- `generateMetadata` уже async и ожидает `getToolsData()`.
- Риск низкий, если Supabase возвращает корректные поля `Tool`.

### 3) `app/admin/page.tsx`
- Тип `AnalyticsRow` выровнен под агрегатные поля `tools_analytics`.
- Риск средний только если view `tools_analytics` не содержит ожидаемых колонок.

### 4) `lib/data.ts`
- Имеется fallback на `localTools` при отсутствии Supabase или ошибке.
- Это безопасно для build, но для production следует убедиться, что env vars и Supabase доступны.

### 5) `middleware.ts`
- Ограничен только `/admin/:path*`.
- Build-риск отсутствует.

## Итог
С точки зрения TypeScript/build самым опасным местом был `/go/[id]`. После исправления код выглядит значительно безопаснее для production build.

## Что ещё проверить вручную перед релизом
1. `npm run typecheck`
2. `npm run build`
3. Smoke test `/go/[id]` с реальным tool id
4. Smoke test `/admin`
5. Проверить, что `tools_analytics` реально существует в Supabase