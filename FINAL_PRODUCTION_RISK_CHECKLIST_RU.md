# Grog — Final Production Risk Checklist

## Код
- [ ] `app/go/[id]/route.ts` делает 302 redirect и пишет в `clicks`.
- [ ] `app/admin/page.tsx` требует активную session.
- [ ] `app/api/admin/tools/route.ts` проверяет admin email.
- [ ] `app/tool/[slug]/page.tsx` не содержит прямых outbound CTA.
- [ ] `app/page.tsx` и category/tool pages используют canonical.
- [ ] `app/sitemap.ts` реально отдаётся на `/sitemap.xml`.
- [ ] `app/robots.ts` указывает на правильный sitemap.

## Supabase
- [ ] `NEXT_PUBLIC_SUPABASE_URL` задан.
- [ ] `SUPABASE_SERVICE_ROLE_KEY` задан.
- [ ] `tools` таблица существует.
- [ ] `clicks` таблица существует.
- [ ] `tools_analytics` view существует.
- [ ] insert/update policies не ломают server-side writes.

## Auth
- [ ] `ADMIN_EMAIL` задан.
- [ ] `NEXTAUTH_SECRET` задан.
- [ ] `GITHUB_ID` задан.
- [ ] `GITHUB_SECRET` задан.
- [ ] `/admin` не доступен без логина.
- [ ] `/api/admin/tools` не принимает неавторизованные запросы.

## SEO
- [ ] `/robots.txt` доступен.
- [ ] `/sitemap.xml` доступен.
- [ ] canonical совпадает с доменом.
- [ ] hreflang = `ru-RU`.
- [ ] JSON-LD валиден.
- [ ] OG/Twitter metadata заполнены.

## Monetization
- [ ] Affiliate URL скрыты от публичного UI.
- [ ] Все CTA ведут через `/go/[id]`.
- [ ] Ручное обновление affiliate URL работает только в admin.
- [ ] Clicks корректно попадают в Supabase.

## Environment
- [ ] production domain задан в `NEXT_PUBLIC_SITE_URL`.
- [ ] локальные fallback-значения не используются в production.
- [ ] деплой ведётся на проверенной среде.
- [ ] логи доступны после запуска.

## После запуска
- [ ] проверить первые клики.
- [ ] проверить top tools.
- [ ] проверить revenue per click.
- [ ] проверить Search Console.
- [ ] проверить ошибки auth/Supabase.

## Stop conditions
- [ ] Если clicks не пишутся — не продвигать трафик.
- [ ] Если admin открыт — срочно закрыть.
- [ ] Если sitemap недоступен — не ждать индексации.
- [ ] Если canonical неверный — исправить до масштабирования.

## Итог
Этот чеклист закрывает главные production-риски перед масштабированием трафика и дохода.
