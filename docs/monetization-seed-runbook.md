# Monetization seed runbook

## Цель
Подготовить и загрузить в Supabase вертикаль `sponsors / advertisers / bank products` без ручной правки данных в коде.

## Таблицы Supabase
- `monetization_offers`
- `monetization_events`
- `monetization_analytics` (view)

## Рекомендуемые поля `monetization_offers`
- `id` uuid / text
- `slug` text unique
- `entity_type` text (`sponsor`, `advertiser`, `bank_product`)
- `title` text
- `description` text
- `short_description` text
- `url` text
- `affiliate_url` text
- `cta_label` text
- `category` text
- `placement` text
- `price_model` text
- `pricing` text
- `commission_rate` numeric
- `featured` boolean
- `verified` boolean
- `status` text (`draft`, `active`, `paused`, `archived`)
- `tags` text[]
- `country` text
- `device_type` text
- `click_count` integer
- `impression_count` integer
- `created_at` timestamptz
- `updated_at` timestamptz

## Рекомендуемые поля `monetization_events`
- `id` uuid / bigserial
- `offer_id` uuid / text
- `event_type` text (`click`, `impression`)
- `country` text
- `device_type` text
- `referer` text
- `utm_source` text
- `utm_medium` text
- `utm_campaign` text
- `clicked_at` timestamptz
- `created_at` timestamptz

## Подготовка JSON
1. Сформируйте файл `ai-tools-clean.json` для инструмента каталога.
2. Для вертикали монетизации используйте отдельный seed-файл, например:
   - `monetization-seed.json`
3. Внутри seed сохраняйте только активные офферы и валидные URL.

## Пример seed-структуры
```json
[
  {
    "slug": "best-bank-offer",
    "entity_type": "bank_product",
    "title": "Премиальный банковский продукт",
    "description": "Короткое коммерческое описание",
    "short_description": "Краткий оффер",
    "url": "https://example.com",
    "affiliate_url": "https://example.com/?ref=123",
    "cta_label": "Открыть",
    "category": "banking",
    "placement": "homepage_footer",
    "price_model": "revshare",
    "pricing": "free",
    "commission_rate": 0.2,
    "featured": true,
    "verified": true,
    "status": "active",
    "tags": ["bank", "cashback", "business"],
    "country": "RU",
    "device_type": "all"
  }
]
```

## Пошаговый импорт
1. Создайте таблицы и view в Supabase SQL editor.
2. Загрузите seed JSON через Supabase SQL / Studio / API.
3. Проверьте, что все `status = active` и URL доступны.
4. Убедитесь, что RLS разрешает только read для публичных страниц.
5. Админские формы подключите к server actions или защищённому API.

## Проверка
- `/sponsors`
- `/advertise`
- `/admin/monetization`
- home page sponsor blocks
- `/go/[id]` redirect logs

## Rollback
Если seed нужно откатить:
1. Переведите офферы в `draft` или `archived`.
2. Очистите события только после выгрузки отчёта.
3. Не удаляйте схему без резервной копии.
