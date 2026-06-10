# Grog — Deployment & Growth Runbook

Этот файл собран как единый, упорядоченный набор подсказок по:
- настройке деплоя,
- Supabase,
- SEO,
- продвижению,
- аналитике,
- таблицам,
- чеклистам перед и после релиза.

---

## 1) Цель релиза

Перед публикацией убедиться, что:

- каталог работает на Supabase data layer;
- `/go/[id]` пишет клики в `clicks`;
- `/admin` закрыт через NextAuth;
- SEO-инфраструктура готова: sitemap, robots, canonical, hreflang, JSON-LD;
- build/typecheck проходят на production env;
- сайт можно отправлять в Google Search Console и Yandex Webmaster.

---

## 2) Архитектура проекта

### Stack
- Next.js 14 App Router
- React 18
- TypeScript strict
- Tailwind CSS
- Supabase PostgreSQL
- NextAuth для защиты `/admin`
- server-side click tracking
- SEO metadata / sitemap / robots / schema.org

### Data flow
1. Страницы каталога читают данные из Supabase через server-side helpers.
2. Если Supabase недоступен, используется локальный fallback JSON.
3. Все переходы на affiliate-цели идут через `/go/[id]`.
4. `/go/[id]` пишет клик в Supabase и делает redirect.
5. `/admin` читает агрегаты из `tools_analytics`.

### Core principles
- SEO-first
- conversion-first
- trust-first
- affiliate-first
- server-rendered content
- no raw affiliate links in UI

---

## 3) Структура файлов

```txt
/
├─ app/
│  ├─ admin/page.tsx
│  ├─ api/auth/[...nextauth]/route.ts
│  ├─ category/[slug]/page.tsx
│  ├─ go/[id]/route.ts
│  ├─ import/page.tsx
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ robots.ts
│  ├─ sitemap.ts
│  └─ tool/[slug]/page.tsx
├─ lib/
│  ├─ auth.ts
│  ├─ catalog.ts
│  ├─ config.ts
│  ├─ data.ts
│  ├─ supabase-server.ts
│  ├─ supabase.ts
│  ├─ types.ts
│  └─ url.ts
├─ ai-tools-clean.json
├─ import-parser.js
├─ supabase-schema.sql
├─ README.md
├─ package.json
├─ tailwind.config.ts
├─ tsconfig.json
└─ next-env.d.ts
```

---

## 4) SEO map

### Primary keyword clusters
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

### Pages

#### Home
- value proposition
- premium hero
- trust signals
- featured tools
- category grid
- commercial copy
- FAQs
- comparison / benefits blocks

#### Category pages
- H1 под ключ
- intro / use-case copy
- tools list
- internal links
- ItemList schema

#### Tool pages
- description
- pricing
- benefits
- CTA
- related tools
- SoftwareApplication schema
- canonical

#### SEO infrastructure
- `robots.txt`
- `sitemap.xml`
- `hreflang="ru-RU"`
- canonical URLs
- OpenGraph / Twitter cards
- JSON-LD:
  - `ItemList`
  - `SoftwareApplication`
  - `BreadcrumbList`

---

## 5) Монетизация

### Flow
1. Пользователь видит карточку инструмента.
2. Нажимает CTA.
3. Переходит на `/go/[id]`.
4. Server-side логируется клик.
5. Происходит redirect на `affiliate_url` или `url`.
6. В админке считаются:
   - total clicks
   - revenue estimate
   - top tools
   - country/device breakdown

### Revenue formula
```text
estimated_revenue = clicks × conversion_rate × avg_product_price × commission_rate
```

### Recommended defaults
- `conversion_rate = 0.15`
- `avg_product_price = 29`
- `commission_rate = 0.10–0.30`

### Rule
- raw affiliate links **не показывать** в UI.

---

## 6) Database schema plan

### Tables

#### `tools`
Main catalog table.

Recommended fields:
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
- `featured`
- `verified`
- `created_at`
- `updated_at`

#### `clicks`
Click log table.

Recommended fields:
- `id`
- `tool_id`
- `clicked_at`
- `country`
- `device_type`
- `referer`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `ip_hash`
- `user_agent`

#### `tools_analytics`
Analytics view for admin.

Should expose:
- click counts
- top tools
- revenue estimates
- device/country breakdown

### Important DB requirements
- unique index on `tools.slug`
- indexes for analytics columns
- RLS policies
- trigger for `updated_at`
- trigger / view logic for `click_count`

---

## 7) Supabase SQL deployment sequence

1. Открыть Supabase SQL editor.
2. Применить `supabase-schema.sql`.
3. Проверить создание таблиц `tools` и `clicks`.
4. Проверить создание view `tools_analytics`.
5. Проверить индексы.
6. Проверить RLS policies.
7. Проверить trigger на `updated_at`.
8. Проверить trigger / view logic для `click_count`.
9. Импортировать `ai-tools-clean.json`.
10. Проверить отсутствие дублей по `slug`.

### Что проверить после SQL
- `tools` существует;
- `clicks` существует;
- `tools_analytics` возвращает ожидаемые поля;
- уникальность `slug` работает;
- insert в `clicks` не блокируется для server-side flow.

---

## 8) Env vars for production

### Required variables
```bash
SITE_URL=https://your-domain.ru
NEXTAUTH_URL=https://your-domain.ru
NEXTAUTH_SECRET=...
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
GITHUB_ID=...
GITHUB_SECRET=...
ADMIN_EMAIL=...
```

### Important rules
- `SITE_URL` должен быть абсолютным URL.
- `NEXTAUTH_URL` должен совпадать с production domain.
- `SUPABASE_SERVICE_ROLE_KEY` должен быть только server-side.
- не использовать localhost в production env.

---

## 9) Build / typecheck

### Commands
```bash
npm install
npm run typecheck
npm run build
```

Если скриптов нет:
```bash
npx tsc --noEmit
npx next build
```

### What must pass
- App Router страницы
- metadata / sitemap / robots
- admin page
- redirect route
- Supabase imports
- NextAuth route

---

## 10) Manual smoke test

### Core pages
- `/`
- `/category/[slug]`
- `/tool/[slug]`
- `/go/[id]`
- `/admin`
- `/sitemap.xml`
- `/robots.txt`

### What to verify
- `/` — premium hero, categories, featured tools, CTA, SEO copy, FAQ.
- `/category/[slug]` — H1, intro copy, tools list, internal links, schema.
- `/tool/[slug]` — pricing, CTA, related tools, SoftwareApplication schema.
- `/go/[id]` — redirect + logging + no raw affiliate URL in UI.
- `/admin` — protected by NextAuth.
- `/sitemap.xml` — valid XML and production URLs.
- `/robots.txt` — correct production rules.

---

## 11) Click tracking / monetization checks

### Test flow
1. Сделать тестовый переход через `/go/[id]`.
2. Проверить запись в `clicks`.
3. Проверить сохранение:
   - `referer`
   - `utm_source`
   - `utm_medium`
   - `utm_campaign`
   - `country`
   - `device_type`
4. Убедиться, что redirect работает даже при ошибке логирования.

### Admin metrics to verify
- total clicks
- total tools
- estimated revenue
- revenue per click
- top tools
- device breakdown
- country breakdown

---

## 12) SEO checklist

### Must check
- canonical URL указывает на production domain
- `hreflang="ru-RU"` присутствует
- JSON-LD валиден
- `ItemList` присутствует
- `SoftwareApplication` присутствует
- `BreadcrumbList` присутствует
- в HTML нет localhost ссылок

### Search engines
- добавить сайт в Google Search Console
- добавить сайт в Yandex Webmaster
- отправить `sitemap.xml`
- проверить индексацию
- убедиться, что robots не блокирует важные страницы

---

## 13) Admin / security

### Checks
- `/admin` недоступен без авторизации
- админ входит через NextAuth
- только нужный email имеет доступ
- `SUPABASE_SERVICE_ROLE_KEY` не попадает в client bundle
- импорт/служебные страницы не доступны случайно всем

### Common auth env vars
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `GITHUB_ID`
- `GITHUB_SECRET`
- `ADMIN_EMAIL`

---

## 14) Deployment steps in Vercel

1. Подключить репозиторий.
2. Добавить production env vars.
3. Проверить preview build.
4. Выполнить production deploy.
5. Привязать домен.
6. Проверить SSL.

### After deploy
- проверить `/`
- проверить `/admin`
- проверить `/go/[id]`
- проверить `/sitemap.xml`
- проверить `/robots.txt`
- проверить click tracking в Supabase

---

## 15) Release-blocker checklist

- [ ] `SITE_URL` задан и валиден
- [ ] `NEXTAUTH_URL` задан
- [ ] `NEXTAUTH_SECRET` задан
- [ ] `SUPABASE_URL` задан
- [ ] `SUPABASE_ANON_KEY` задан
- [ ] `SUPABASE_SERVICE_ROLE_KEY` задан только server-side
- [ ] `GITHUB_ID` задан
- [ ] `GITHUB_SECRET` задан
- [ ] `ADMIN_EMAIL` задан
- [ ] Supabase SQL применён
- [ ] `tools` и `clicks` существуют
- [ ] `tools_analytics` view существует
- [ ] `/go/[id]` пишет в `clicks`
- [ ] `/admin` защищён
- [ ] canonical / hreflang / sitemap / robots работают
- [ ] `npm run typecheck` проходит
- [ ] `npm run build` проходит

---

## 16) Post-release monitoring

### First 24 hours
- проверить главную
- проверить категории
- проверить tool pages
- проверить `/admin`
- проверить `/go/[id]`
- проверить `/sitemap.xml`
- проверить `/robots.txt`
- посмотреть Vercel logs
- проверить ошибки Supabase
- проверить первые записи в `clicks`

### First 48 hours
- проверить indexing
- усилить CTR на топовых карточках
- проверить country/device breakdown
- оценить первые top tools
- улучшить category copy по данным

---

## 17) Growth plan

### 30-day SEO / content plan
- расширить индексируемые страницы
- добавить новые long-tail category pages
- усилить commercial copy
- добавить comparison / FAQ blocks
- улучшить internal linking
- пересортировать featured tools по CTR

### 90-day scaling plan
- увеличить каталог до большого SEO-актива
- масштабировать content system
- добавить больше comparison / alternatives pages
- улучшать monetization по данным кликов
- превращать каталог в устойчивый revshare asset

---

## 18) Roadmap table

| Задача | Приоритет | Срок | Результат |
|---|---:|---:|---|
| Проверить production env vars | High | Day 1 | Нет build/runtime blockers |
| Применить `supabase-schema.sql` | High | Day 1 | БД соответствует коду |
| Импортировать `ai-tools-clean.json` | High | Day 1–2 | Каталог наполнен данными |
| Проверить `/go/[id]` tracking | High | Day 1–2 | Клики пишутся в `clicks` |
| Проверить `/admin` protection | High | Day 1–2 | Админка закрыта NextAuth |
| Проверить canonical / hreflang / sitemap / robots | High | Day 1–2 | SEO infra готова |
| Прогнать build/typecheck | High | Day 1–2 | Релизный билд зелёный |
| Усилить CTA на featured tools | Medium | Day 3–5 | Выше CTR карточек |
| Добавить trust signals | Medium | Day 3–5 | Выше конверсия в клик |
| Пересортировать featured tools | Medium | Day 3–5 | Лучшие карточки наверху |
| Улучшить category SEO copy | Medium | Day 4–7 | Выше релевантность и ранжирование |
| Добавить comparison / FAQ blocks | Medium | Day 4–7 | Лучший SEO intent и trust |
| Проверить admin metrics accuracy | Medium | Day 5–7 | Понятные данные для роста |
| Расширить каталог новыми pages | Medium | Week 2 | Больше indexable страниц |
| Добавить internal links | Medium | Week 2 | Сильнее SEO mesh |
| Оптимизировать mobile UX | Medium | Week 2 | Выше CTR на мобилках |

---

## 19) Final go/no-go rule

### GO only if all answers are “yes”
1. `SITE_URL` валиден?
2. `NEXTAUTH_URL` совпадает с production domain?
3. `NEXTAUTH_SECRET` задан?
4. Supabase SQL применён без ошибок?
5. `tools` и `clicks` существуют?
6. `/go/[id]` пишет запись в `clicks`?
7. Redirect работает даже если tracking сломался?
8. `/admin` закрыт?
9. `sitemap.xml`, `robots.txt`, canonical и hreflang работают?
10. `npm run typecheck` и `npm run build` проходят?

### Decision rule
- 10/10 “yes” → GO
- 1+ “no” → NO-GO

---

## 20) Short final status

- **Done:** каталог на Next.js 14, Supabase-first data layer, `/go/[id]` tracking, `/admin` protection, SEO infra, release docs.
- **Needs checking:** production env vars, Supabase SQL/view/policies, реальный build/typecheck на прод-окружении.
- **Next action:** финальный deploy → smoke test `/`, `/admin`, `/go/[id]`, `/sitemap.xml`, `/robots.txt` → Search Console/Yandex Webmaster.
