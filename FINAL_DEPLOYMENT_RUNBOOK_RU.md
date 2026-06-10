# Grog — финальный deployment runbook

## 1) Цель
Запустить Grog как production-ready premium AI tools directory с SEO-first архитектурой, Supabase data layer, server-side click logging и защищённой админкой.

## 2) Рекомендуемая production-схема
- **App host:** VPS + Docker + reverse proxy
- **Reverse proxy:** Caddy или Nginx
- **DNS/CDN:** Cloudflare
- **Database:** Supabase PostgreSQL
- **Auth:** NextAuth

## 3) Подготовка Supabase
### Выполнить SQL
- применить `supabase-schema.sql`;
- проверить создание таблиц `tools` и `clicks`;
- проверить view `tools_analytics`;
- проверить triggers и indexes;
- проверить RLS policies.

### Проверка после SQL
- `tools` содержит данные;
- `clicks` принимает server-side inserts;
- `tools_analytics` отдаёт totals и breakdowns.

## 4) Import workflow
1. Запустить parser/cleaner.
2. Сгенерировать `ai-tools-clean.json`.
3. Проверить `parsing_errors.json`, если он есть.
4. Импортировать данные в Supabase.
5. Проверить дедупликацию.
6. Проверить нормализацию pricing/category/tags.

## 5) Environment variables
### Core
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.ru
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

### Auth
```env
NEXTAUTH_URL=https://your-domain.ru
NEXTAUTH_SECRET=...
ADMIN_EMAIL=admin@your-domain.ru
GITHUB_ID=...
GITHUB_SECRET=...
```

### Optional
```env
NEXT_PUBLIC_DEFAULT_LOCALE=ru-RU
```

## 6) Build / validation
Перед релизом выполнить:
```bash
npm install
npm run typecheck
npm run build
```

## 7) Smoke tests
Проверить вручную:
- `/`
- `/admin`
- `/go/[id]`
- `/robots.txt`
- `/sitemap.xml`
- category pages
- tool pages

## 8) Redirect and tracking
### `/go/[id]`
Поведение должно быть таким:
- определить tool по id;
- записать клик в `clicks` на сервере;
- захватить UTM;
- захватить referer, device type, country, IP если доступен;
- вернуть `302` на affiliate_url или fallback url;
- не показывать raw affiliate URL в UI.

### Важно
- если запись клика упала, redirect всё равно должен работать;
- analytics insert не должен блокировать пользователя.

## 9) SEO infrastructure
Проверить наличие и корректность:
- `/robots.txt`
- `/sitemap.xml`
- canonical URLs
- `hreflang="ru-RU"`
- schema.org JSON-LD:
  - `ItemList`
  - `SoftwareApplication`
  - `BreadcrumbList`

## 10) Admin dashboard
Admin должен показывать:
- total clicks
- total tools
- estimated revenue
- revenue per click
- top tools
- device breakdown
- country breakdown
- CSV / JSON export

### Access control
- только через NextAuth;
- только разрешённый admin email;
- server-side guard обязателен.

## 11) Rollout sequence
1. Применить Supabase schema.
2. Импортировать данные.
3. Прописать env vars.
4. Прогнать typecheck и build.
5. Деплоить приложение.
6. Проверить redirects, SEO endpoints и admin.
7. Подключить домен и SSL.
8. Отправить sitemap в Search Console и Yandex Webmaster.

## 12) Search Console
1. Добавить и подтвердить домен.
2. Отправить `/sitemap.xml`.
3. Проверить coverage и indexing.
4. Отследить первые категории и tool pages.

## 13) Security controls
- public SEO pages остаются открытыми;
- `/admin` закрыт NextAuth;
- `/go/[id]` публичный, но rate-limited;
- сервисные ключи только на сервере;
- WAF / bot protection на уровне CDN;
- CSP и security headers включены;
- affiliate URLs не светятся в клиенте.

## 14) Rollback plan
- держать предыдущий рабочий release;
- при проблемах с Supabase или auth — откат к последнему стабильному коммиту;
- при проблемах с tracking — временно отключить новые redirect rules.

## 15) Final go/no-go checklist
### GO
- schema применена;
- env vars заданы;
- build/typecheck зелёные;
- `/go/[id]` пишет клики;
- admin защищён;
- sitemap/robots доступны.

### NO-GO
- отсутствует `tools_analytics`;
- `clicks` не пишется;
- admin открыт без auth;
- sitemap/robots недоступны;
- build падает.
