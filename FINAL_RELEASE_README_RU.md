# Grog — финальный релизный пакет

Grog — это премиальный русскоязычный каталог AI-инструментов для маркетинга, SEO, контента, SMM, бизнеса и digital-команд.

Цель проекта:
- привлекать органический трафик из Google и Yandex;
- повышать CTR на карточки и переходы;
- монетизировать каталог через affiliate / RevShare;
- выглядеть как дорогой B2B SaaS-product, а не как обычный список ссылок;
- быть готовым к production deployment.

## Ключевые возможности

- Next.js 14 App Router
- React 18
- TypeScript strict
- Tailwind CSS
- Supabase PostgreSQL
- server-side click logging через `/go/[id]`
- защищённая админка через NextAuth
- SEO metadata, canonical URLs, hreflang, sitemap, robots
- schema.org JSON-LD для категорий и инструментов
- import / seed workflow для данных каталога

## Публичные маршруты

- `/` — главная страница
- `/category/[slug]` — SEO-лендинг категории
- `/tool/[slug]` — страница инструмента
- `/go/[id]` — server-side redirect и tracking
- `/robots.txt` — robots metadata
- `/sitemap.xml` — динамический sitemap
- `/admin` — аналитика и управление

## SEO-стратегия

Основные запросы:
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

### Принципы
- уникальные title и description для каждой страницы;
- canonical на production domain;
- hreflang `ru-RU`;
- schema.org `ItemList`, `SoftwareApplication`, `BreadcrumbList`;
- сильные коммерческие блоки на главной и категориях;
- внутренняя перелинковка между категориями и инструментами.

## Монетизация

Формула оценки дохода:

```text
estimated_revenue = clicks × conversion_rate × avg_product_price × commission_rate
```

Дефолтные значения:
- conversion_rate = `0.15`
- avg_product_price = `29`
- commission_rate = `0.10–0.30`

Правила:
- raw affiliate URLs не показываются в UI;
- CTA ведут только через `/go/[id]`;
- клики пишутся сервером в Supabase;
- админка показывает clicks, revenue estimate, top tools и breakdown по странам/устройствам.

## Безопасность

Рекомендуемая модель:
- публичные SEO-страницы остаются открытыми;
- `/admin` защищён NextAuth;
- `/go/[id]` публичный, но rate-limited;
- server-side logging only;
- WAF / bot protection на уровне CDN;
- secrets только на сервере;
- без утечек affiliate links в клиентский код.

Важно: полностью запретить скачивание сайта или скриншоты в браузере невозможно, но можно сильно усложнить автоматический парсинг и злоупотребления.

## Рекомендуемый деплой для РФ

Практичный стек:
- App host: VPS / Docker / Nginx или Caddy
- DNS/CDN: Cloudflare
- Database: Supabase
- Auth: NextAuth

Почему так:
- меньше зависимость от платёжных ограничений;
- полный контроль над server-side routing;
- стабильные SEO-URL и redirect flow;
- удобнее масштабировать постепенно.

## Проверка перед релизом

- Supabase schema применена;
- данные импортированы;
- build и typecheck проходят;
- `/`, `/admin`, `/go/[id]`, `/robots.txt`, `/sitemap.xml` доступны;
- click logging работает;
- admin analytics читаются из Supabase;
- production env vars заданы;
- sitemap отправлен в Search Console.

## Короткий вывод

Grog должен выглядеть как:
- premium B2B SaaS-style directory;
- trust-first marketing product;
- SEO-first content platform;
- affiliate-first monetization system;
- production-ready web app.

Если нужен следующий шаг, смотри:
- `PRODUCTION_LAUNCH_RUNBOOK.md`
- `RELEASE_STATUS_RU.md`
- `CHECKLIST.md`