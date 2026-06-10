# Grog — Ultimate Release Control Center

## Назначение
Единая точка входа для релизной подготовки, деплоя, контроля качества, SEO и монетизации.

---

## 1. Главный порядок действий

### Шаг 1 — инфраструктура
- Применить Supabase SQL.
- Проверить env vars.
- Проверить домен и SSL.
- Убедиться, что `/admin` защищён.

### Шаг 2 — данные
- Запустить импорт.
- Проверить `tools`.
- Проверить `clicks`.
- Проверить `tools_analytics`.

### Шаг 3 — приложение
- Прогнать build.
- Прогнать typecheck.
- Проверить главную.
- Проверить категории.
- Проверить инструмент.
- Проверить `/go/[id]`.
- Проверить `/admin`.

### Шаг 4 — SEO
- Проверить `/robots.txt`.
- Проверить `/sitemap.xml`.
- Проверить canonical.
- Проверить hreflang.
- Проверить schema.org.

### Шаг 5 — релиз
- Сделать backup.
- Отправить sitemap.
- Проверить индексацию.
- Проверить клики.
- Проверить доход.

---

## 2. Основные документы
- `GO_LIVE_CHECKLIST_RU.md`
- `MASTER_RELEASE_PACK_RU.md`
- `RELEASE_DOCS_INDEX_RU.md`
- `FINAL_RELEASE_STATUS_RU.md`
- `FINAL_DEPLOYMENT_RUNBOOK_RU.md`
- `FINAL_RELEASE_README_RU.md`
- `NEXT_ACTIONS_TIMELINE_RU.md`
- `OPERATOR_BRIEF_RU.md`

---

## 3. Аудит и контроль
- `PRE_RELEASE_AUDIT.md`
- `PRE_BUILD_AUDIT_BY_FILE.md`
- `PRE_RELEASE_VERDICT_RU.md`
- `TS_BUILD_RISK_NOTES.md`

---

## 4. SEO и монетизация
- `SEO_METADATA_PACK_RU.md`
- `SECURITY_MONETIZATION_ARCHITECTURE.md`
- `app/robots.ts`
- `app/sitemap.ts` или эквивалентный sitemap route, если он реализован иначе.

---

## 5. Supabase и импорт
- `supabase-schema.sql`
- `supabase-ops.sql`
- `supabase-site-controls.sql`
- `import-parser.js`
- `ai-tools-clean.json`

---

## 6. Перед финальным go-live проверь обязательно
1. База применена.
2. Импорт выполнен.
3. Build успешен.
4. Typecheck успешен.
5. SEO routes работают.
6. Кликовый редирект пишет в базу.
7. Админка защищена.
8. Метрики читаются.
9. Документы актуальны.
10. Путь деплоя понятен.

---

## 7. Принцип использования
Если нужно быстро — смотри:
1. `GO_LIVE_CHECKLIST_RU.md`
2. `FINAL_DEPLOYMENT_RUNBOOK_RU.md`
3. `ULTIMATE_RELEASE_CONTROL_CENTER_RU.md`

Если нужно глубоко — читай весь пакет по разделам.

---

## 8. Итог
Проект готов к финальной операционной подготовке: документы упорядочены, маршрут запуска понятен, контрольные точки собраны в одном месте.
