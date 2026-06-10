# Grog — Release Ops Checklist

| Шаг | Что сделать | Где проверить | Критерий успеха | Риск | Owner |
|---|---|---|---|---|---|
| 1 | Проверить домен и SSL | Браузер, DNS | Сайт открывается по HTTPS | Высокий | DevOps |
| 2 | Применить Supabase schema | Supabase SQL editor | Таблицы и view созданы без ошибок | Высокий | Backend |
| 3 | Проверить таблицы `tools`, `clicks` | Supabase dashboard | Данные доступны и читаются | Высокий | Backend |
| 4 | Проверить view `tools_analytics` | Supabase SQL / dashboard | Агрегации возвращают значения | Высокий | Backend |
| 5 | Заполнить env vars | Hosting panel | Все секреты заданы | Высокий | DevOps |
| 6 | Импортировать tools | Import workflow / seed | Количество инструментов совпадает с ожиданием | Средний | Content |
| 7 | Проверить `/` | Browser | Home рендерится, SEO copy на месте | Средний | Frontend |
| 8 | Проверить `/category/[slug]` | Browser | Категории открываются и индексируемы | Средний | Frontend |
| 9 | Проверить `/tool/[slug]` | Browser | Страница инструмента открывается | Средний | Frontend |
| 10 | Проверить `/go/[id]` | Network / Supabase logs | Клик записывается в `clicks`, идёт 302 redirect | Высокий | Backend |
| 11 | Проверить `/admin` | Browser | Доступ только после NextAuth | Высокий | Backend |
| 12 | Проверить `/robots.txt` | Browser | Доступен и не блокирует важные страницы | Средний | SEO |
| 13 | Проверить `/sitemap.xml` | Browser / Search Console | Sitemap доступен и валиден | Высокий | SEO |
| 14 | Проверить canonical | View source | Canonical указывает на production domain | Средний | SEO |
| 15 | Проверить hreflang | View source | `ru-RU` присутствует и корректен | Средний | SEO |
| 16 | Проверить metadata / OG | Social preview tools | OpenGraph/Twitter cards отображаются | Низкий | SEO |
| 17 | Прогнать typecheck | CI / terminal | Ошибок TS нет | Высокий | Frontend |
| 18 | Прогнать build | CI / terminal | Production build проходит | Высокий | Frontend |
| 19 | Проверить админ-метрики | `/admin` | clicks, revenue, top tools, breakdowns отображаются | Средний | Backend |
| 20 | Отправить sitemap в Search Console | Google Search Console | Sitemap accepted | Средний | SEO |
| 21 | Проверить логи редиректов | Hosting / Supabase logs | Нет массовых ошибок 4xx/5xx | Средний | DevOps |
| 22 | Подготовить rollback plan | Docs / deploy notes | Понятно, как откатить релиз | Высокий | DevOps |

## Release gate
Релиз можно считать готовым только если:
- Supabase schema применена;
- redirect logging работает;
- admin защищён;
- build/typecheck проходят;
- sitemap/robots/canonical/hreflang корректны;
- домен и SSL в production настроены.

## Итог
Этот чеклист предназначен для финальной приёмки перед запуском и должен использоваться как основной operational checklist.