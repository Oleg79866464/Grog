# Финальный статус релиза Grog

## Итог
**Проект готов к релизу при условии прохождения финальной инфраструктурной проверки.**

## Что уже закрыто
- Next.js 14 App Router структура.
- Каталог на серверных данных Supabase.
- `/go/[id]` с server-side click logging.
- `/admin` под NextAuth.
- `robots.txt`, `sitemap.xml`, canonical, hreflang.
- Premium UI и conversion-first layout.
- Релизная документация и deployment runbook.
- Pre-release audit и pre-build risk notes.

## Ключевые риски перед запуском
1. Корректность Supabase schema.
2. Наличие production env vars.
3. Прохождение `npm run build` и typecheck в реальной среде.
4. Доступность домена, SSL и redirect flow.
5. Проверка, что `/go/[id]` действительно пишет клики.
6. Проверка, что `tools_analytics` возвращает метрики.

## Что проверить обязательно
### Supabase
- таблицы `tools` и `clicks` существуют;
- view `tools_analytics` работает;
- RLS policies и triggers активны;
- click insert работает серверно.

### Environment
- `NEXT_PUBLIC_SITE_URL` указывает на production domain;
- `NEXT_PUBLIC_SUPABASE_URL` задан;
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` задан;
- `SUPABASE_SERVICE_ROLE_KEY` задан;
- `NEXTAUTH_URL` и `NEXTAUTH_SECRET` заданы;
- `ADMIN_EMAIL` задан.

### Host / DNS
- домен подключён;
- SSL работает;
- `robots.txt` и `sitemap.xml` открываются по HTTPS;
- middleware не блокирует SEO-страницы.

### Build / runtime
- `npm install`;
- `npm run typecheck`;
- `npm run build`;
- smoke test `/`, `/admin`, `/go/[id]`, `/robots.txt`, `/sitemap.xml`.

## Recommended hosting choice for Russia
**Самый практичный вариант:**
- VPS: Selectel / Timeweb Cloud / Yandex Cloud VM
- Reverse proxy: Caddy
- DNS/CDN: Cloudflare
- DB: Supabase
- App: Dockerized Next.js 14

## Final go/no-go
- **GO**, если schema, env vars и build проверены.
- **NO-GO**, если `/go/[id]` не пишет клики или admin analytics не читаются.

## Вывод
Проект находится в состоянии **production-ready with validation required**.