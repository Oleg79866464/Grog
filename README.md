# Grog

Премиальный AI tools directory для русскоязычной аудитории: маркетинг, SMM, SEO, контент, видео и business AI.

## Что внутри

- premium landing page в стиле дорогого B2B SaaS;
- SEO-структура под коммерческие RU-запросы;
- affiliate-first карточки и `/go/[id]` redirect flow;
- server-side click tracking через Supabase;
- схема БД с `tools`, `clicks` и `tools_analytics`;
- parser/import flow для `ai-tools-clean.json`;
- JSON-LD для `ItemList` и `SoftwareApplication`;
- документация по production deploy.

## Архитектура

- `index.html` — основной каталог и premium UI;
- `ai-tools-clean.json` — нормализованный каталог инструментов;
- `supabase-schema.sql` — таблицы, индексы, RLS и триггеры;
- `import-parser.js` — парсер markdown-экспорта в чистый JSON.

## SEO map

Целевые запросы:

- нейросети для маркетинга
- AI для SMM
- генератор текста
- AI для SEO
- AI для контента
- генератор изображений
- AI для видео
- AI для бизнеса
- каталог AI инструментов
- лучшие нейросети
- AI сервисы для маркетологов

Структура контента:

- Home: hero, trust, category grid, featured tools, SEO copy, FAQ;
- Category pages: H1, intro, use cases, tools list, comparison, ItemList;
- Tool pages: description, pricing, tags, benefits, CTA, related tools, SoftwareApplication;
- Redirect: `/go/[id]` with server-side logging and 302 redirect;
- Admin: clicks, revenue, revenue/click, breakdowns, export;
- SEO infra: robots.txt, sitemap.xml, hreflang, canonical, OG, Twitter cards.

## Monetization flow

Формула:

`estimated_revenue = clicks × conversion_rate × avg_product_price × commission_rate`

По умолчанию:

- `conversion_rate = 0.15`
- `avg_product_price = 29`
- `commission_rate = 0.10–0.30`

Правила:

- не показывать raw affiliate links в UI;
- использовать `/go/[id]`;
- логировать клики server-side;
- показывать estimated revenue в админке;
- поднимать trust before CTA.

## Database schema

### `tools`

Поля:

- `id`
- `slug`
- `name`
- `description`
- `url`
- `affiliate_url`
- `category`
- `pricing`
- `tags`
- `commission_rate`
- `click_count`
- `featured`
- `verified`
- `country`
- `device_type`
- `referer`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `created_at`
- `updated_at`

### `clicks`

Поля:

- `tool_id`
- `slug`
- `country`
- `device_type`
- `referer`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `ip`
- `clicked_at`

### `tools_analytics`

Агрегированный view для админки.

## Import flow

1. Подготовить markdown-экспорт в `taaft-export.md`.
2. Запустить:

```bash
node import-parser.js
```

3. Получить:

- `ai-tools-clean.json`
- `parsing_errors.json`

4. Импортировать schema в Supabase.
5. Загрузить JSON в таблицу `tools`.

## Deploy checklist

- проверить env vars;
- загрузить schema в Supabase;
- импортировать `ai-tools-clean.json`;
- проверить `/`, `/admin`, `/go/[id]`, `/sitemap.xml`, `/robots.txt`;
- убедиться, что click logging работает;
- выполнить build/typecheck;
- задеплоить на Vercel или другой hosting;
- отправить sitemap в Google Search Console.

## Notes

Текущая версия репозитория — статический delivery, поэтому next.js routes, admin protection и server-side redirect endpoint нужно внедрять в отдельном приложении или следующей фазе миграции. В этом репозитории уже подготовлены: premium UI, SEO copy, монетизация, схема БД и parser flow.
