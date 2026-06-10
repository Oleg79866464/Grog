# Grog — Master Folder Map

## 1. Самые важные файлы для релиза
1. `FINAL_RELEASE_STATUS_RU.md`
2. `FINAL_DEPLOYMENT_RUNBOOK_RU.md`
3. `GO_LIVE_CHECKLIST_RU.md`
4. `ULTIMATE_RELEASE_CONTROL_CENTER_RU.md`
5. `PRODUCTION_READINESS_VERDICT_RU.md`
6. `FINAL_CODE_AUDIT_NOTE_RU.md`
7. `FINAL_MONETIZATION_SECURITY_AUDIT_RU.md`
8. `POST_LAUNCH_MONITORING_RU.md`
9. `LAUNCH_PLAYBOOK_24H_RU.md`

## 2. Документация уровня “всё в одном”
- `MASTER_RELEASE_PACK_RU.md`
- `RELEASE_DOCS_INDEX_RU.md`
- `OPERATOR_BRIEF_RU.md`
- `NEXT_ACTIONS_TIMELINE_RU.md`
- `FINAL_RISK_MAP_RU.md`
- `FINAL_FILE_STATUS_MATRIX_RU.md`

## 3. Основной продуктовый код
- `app/page.tsx`
- `app/category/[slug]/page.tsx`
- `app/tool/[slug]/page.tsx`
- `app/go/[id]/route.ts`
- `app/admin/page.tsx`
- `app/layout.tsx`
- `app/robots.ts`
- `app/sitemap.ts`

## 4. Данные и инфраструктура
- `lib/data.ts`
- `lib/catalog.ts`
- `lib/config.ts`
- `lib/types.ts`
- `lib/supabase-server.ts`
- `lib/site-controls.ts`
- `lib/auth.ts`
- `middleware.ts`

## 5. Auth / API
- `app/api/auth/[...nextauth]/route.ts`
- `app/api/ai/chat/route.ts`

## 6. Supabase и импорт
- `supabase-schema.sql`
- `supabase-ops.sql`
- `supabase-site-controls.sql`
- `import-parser.js`
- `ai-tools-clean.json`

## 7. Когда времени мало
Смотри в таком порядке:
1. `GO_LIVE_CHECKLIST_RU.md`
2. `FINAL_DEPLOYMENT_RUNBOOK_RU.md`
3. `MASTER_RELEASE_PACK_RU.md`
4. `POST_LAUNCH_MONITORING_RU.md`

## 8. Что это даёт
Этот map помогает быстро найти:
- релизные инструкции;
- код приложения;
- маршруты SEO и редиректов;
- Supabase и импорт;
- auth и admin;
- мониторинг после запуска.
