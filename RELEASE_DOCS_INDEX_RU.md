# Grog — Индекс релизных документов

## 1. С чего начать
1. `GO_LIVE_CHECKLIST_RU.md`
2. `MASTER_RELEASE_PACK_RU.md`
3. `FINAL_RELEASE_STATUS_RU.md`
4. `FINAL_DEPLOYMENT_RUNBOOK_RU.md`

## 2. Основные документы
- `README.md` — основной README проекта.
- `FINAL_RELEASE_README_RU.md` — финальная русскоязычная версия README.
- `FINAL_RELEASE_STATUS_RU.md` — статус готовности к релизу.
- `FINAL_DEPLOYMENT_RUNBOOK_RU.md` — пошаговый deployment runbook.
- `DEPLOYMENT_RUNBOOK.md` — базовый runbook деплоя.
- `PRODUCTION_LAUNCH_RUNBOOK.md` — production launch instructions.

## 3. Аудит и риски
- `PRE_RELEASE_AUDIT.md`
- `PRE_BUILD_AUDIT_BY_FILE.md`
- `PRE_RELEASE_VERDICT_RU.md`
- `TS_BUILD_RISK_NOTES.md`
- `RELEASE_STATUS_RU.md`
- `RELEASE_SUMMARY_TABLE_RU.md`
- `RELEASE_LAUNCH_PACK.md`
- `RELEASE_OPS_CHECKLIST.md`
- `RELEASE_PACKET.md`
- `CHECKLIST.md`

## 4. SEO и монетизация
- `SEO_METADATA_PACK_RU.md`
- `SECURITY_MONETIZATION_ARCHITECTURE.md`

## 5. Supabase и импорт
- `supabase-schema.sql`
- `supabase-ops.sql`
- `supabase-site-controls.sql`
- `import-parser.js`
- `ai-tools-clean.json`

## 6. Финальные операционные файлы
- `MASTER_RELEASE_PACK_RU.md`
- `GO_LIVE_CHECKLIST_RU.md`

## 7. Рекомендуемый порядок действий

### Этап A — инфраструктура
- применить Supabase SQL;
- настроить env vars;
- проверить доступ к домену;
- ограничить админку.

### Этап B — данные
- запустить импорт;
- проверить таблицы;
- сверить counts и записи.

### Этап C — приложение
- прогнать build/typecheck;
- проверить главную, категории, инструменты;
- проверить `/go/[id]`;
- проверить `/admin`.

### Этап D — SEO
- проверить `/robots.txt`;
- проверить `/sitemap.xml`;
- проверить canonical/hreflang;
- проверить schema.org.

### Этап E — релиз
- финальный backup;
- открыть Search Console;
- отправить sitemap;
- включить мониторинг.

## 8. Идеальная логика чтения
Если времени мало — читай только:
1. `GO_LIVE_CHECKLIST_RU.md`
2. `FINAL_DEPLOYMENT_RUNBOOK_RU.md`
3. `FINAL_RELEASE_STATUS_RU.md`

Если нужен полный контроль — читай весь индекс по разделам.
