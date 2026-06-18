# Grog — README for Humans

## Что это за проект
Grog — premium AI tools directory для русскоязычной аудитории.

Фокус проекта:
- SEO-трафик из Google и Yandex;
- affiliate / RevShare монетизация;
- премиальный B2B SaaS-style UX;
- серверный трекинг кликов;
- admin-аналитика;
- Supabase как источник данных.

## Как это работает
1. Пользователь заходит на главную, категорию или страницу инструмента.
2. Данные подтягиваются из Supabase.
3. CTA ведут через `/go/[id]`.
4. `/go/[id]` логирует клик в Supabase и делает redirect.
5. Админка показывает аналитику, доход и популярные инструменты.

## Что важно для релиза
- Домен должен быть production-ready.
- Supabase schema должна быть применена.
- Env vars должны быть заданы.
- Build и typecheck должны проходить без ошибок.
- Sitemap и robots должны быть доступны.
- `/admin` должен быть защищён через NextAuth.

## Где смотреть главные документы
- `RELEASE_STATUS_RU.md` — короткий статус.
- `PRE_RELEASE_AUDIT.md` — аудит рисков.
- `PRODUCTION_LAUNCH_RUNBOOK.md` — пошаговый запуск.
- `RELEASE_OPS_CHECKLIST.md` — операционный чеклист.
- `RELEASE_LAUNCH_PACK.md` — индекс всех релизных материалов.

## Если вы новый разработчик
Сначала откройте:
1. `README.md`
2. `README_FOR_HUMANS.md`
3. `PRODUCTION_LAUNCH_RUNBOOK.md`
4. `supabase-schema.sql`
5. `app/go/[id]/route.ts`
6. `app/admin/page.tsx`

## Если вы владелец проекта
Проверьте в первую очередь:
- клики в `clicks`;
- доступность `/admin`;
- build/typecheck;
- индексацию страниц;
- корректность домена в metadata.

## Кратко
Это не просто каталог ссылок.
Это SEO + conversion + affiliate + analytics продукт, который должен выглядеть дорого и работать стабильно в production.