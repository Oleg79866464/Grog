# Grog — Final Noise Audit

## Что считалось лишним шумом
- Дублирующие outbound CTA на tool pages.
- Слишком много релизных файлов без навигации.
- Рискованные fallback-цепочки без комментария по production роли.

## Что уже оптимизировано
- Прямой outbound CTA на tool page удалён.
- Добавлен master folder map.
- Добавлен release docs index.
- Добавлен control center.
- Добавлен post-launch monitoring.
- Добавлен launch playbook.

## Что ещё стоит держать под контролем
- Local JSON fallback в `lib/data.ts` должен оставаться только аварийным режимом.
- `affiliate_url` не должен отображаться в UI.
- Admin write-access должен быть ограничен session/auth проверкой.

## Итог
Лишний шум в публичном UX снижен. Основной поток пользователей теперь ведётся через трекинг-маршрут и безопасный админский редактор ссылок.
