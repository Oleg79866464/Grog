# Grog — Operator Brief

## Что это
Grog — premium AI tools directory для русскоязычной аудитории с SEO-first архитектурой, affiliate monetization и Supabase-backed данными.

## Что важно помнить
- Данные берутся из Supabase.
- Переходы на партнёрские ссылки идут через `/go/[id]`.
- Админка должна быть защищена.
- SEO routes должны быть доступны публично.
- Код и документация должны оставаться синхронизированы.

## Главные зоны контроля
1. Supabase schema и данные.
2. Click tracking.
3. Admin metrics.
4. SEO metadata.
5. Build/typecheck.
6. Импорт и нормализация данных.

## Перед изменениями
- Проверить, не затрагивают ли изменения routes, metadata или Supabase запросы.
- Не ломать публичные SEO-страницы.
- Не открывать админку без защиты.
- Не добавлять сырой affiliate URL в UI.

## Перед релизом
- build/typecheck без ошибок.
- `/robots.txt` и `/sitemap.xml` доступны.
- `/go/[id]` логирует клики.
- `/admin` показывает метрики.
- canonical/hreflang совпадают с доменом.

## Если мало времени
Сначала:
1. база данных
2. импорт
3. build/typecheck
4. SEO routes
5. admin
6. go-live
