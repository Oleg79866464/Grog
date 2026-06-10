# Grog — Release Launch Pack

Единый стартовый пакет для выпуска проекта в production.

## Что здесь есть
- краткий статус релиза;
- pre-release audit;
- production launch runbook;
- чеклист перед деплоем;
- рекомендации по SEO, Supabase и инфраструктуре.

## Быстрые ссылки

### 1. Статус релиза
- `RELEASE_STATUS_RU.md`

### 2. Pre-release audit
- `PRE_RELEASE_AUDIT.md`

### 3. Production launch runbook
- `PRODUCTION_LAUNCH_RUNBOOK.md`

### 4. Полный deployment checklist
- `CHECKLIST.md`

### 5. Основной README
- `README.md`

## Порядок запуска

### Шаг 1. Подготовить инфраструктуру
- выбрать хостинг;
- подключить домен;
- настроить DNS и SSL;
- подготовить Supabase проект.

### Шаг 2. Применить схему БД
- выполнить `supabase-schema.sql`;
- проверить таблицы `tools` и `clicks`;
- убедиться, что view `tools_analytics` доступен.

### Шаг 3. Заполнить env vars
- указать `NEXT_PUBLIC_SITE_URL`;
- добавить Supabase keys;
- добавить NextAuth secrets;
- проверить admin access settings.

### Шаг 4. Импортировать данные
- импортировать `ai-tools-clean.json` или актуальный экспорт;
- запустить seed/import workflow;
- проверить количество tools.

### Шаг 5. Проверить build
- `npm install`
- `npm run typecheck`
- `npm run build`

### Шаг 6. Smoke test
- `/`
- `/category/[slug]`
- `/tool/[slug]`
- `/go/[id]`
- `/admin`
- `/robots.txt`
- `/sitemap.xml`

### Шаг 7. Индексация
- добавить сайт в Google Search Console;
- отправить sitemap;
- проверить canonical и hreflang;
- убедиться, что robots.txt не блокирует важные страницы.

## Критерии успешного релиза
- сайт открывается по HTTPS;
- каталог подгружается из Supabase;
- редиректы логируют клики;
- админка защищена;
- SEO-страницы доступны и индексируемы;
- build/typecheck проходят без ошибок.

## Если что-то ломается
Сначала проверять:
1. env vars;
2. схему Supabase;
3. права доступа к таблицам и view;
4. корректность домена в metadata;
5. сборку проекта локально.

## Вывод
Этот пакет собран как единая стартовая точка для запуска проекта в production без необходимости искать разрозненные инструкции по репозиторию.