# Production Launch Runbook

Этот документ — пошаговый план запуска Grog в production без Vercel, с прицелом на РФ-friendly и low-cost инфраструктуру.

## 1) Рекомендуемый стек

**Базовый вариант:**
- VPS: Selectel / Timeweb Cloud / Yandex Cloud VM / Hetzner / Contabo
- OS: Ubuntu 22.04 LTS
- Runtime: Docker + Docker Compose
- Reverse proxy: Caddy
- DNS/CDN: Cloudflare
- DB: Supabase PostgreSQL
- Auth: NextAuth
- Monitoring: Supabase logs + server logs

**Почему этот стек:**
- не требует карты другой страны;
- дешевле managed app платформ;
- проще контролировать server-side click tracking;
- лучше подходит для SEO и быстрых правок.

## 2) Перед началом

Подготовить:
- домен;
- доступ к DNS;
- Supabase проект;
- GitHub репозиторий;
- GitHub OAuth credentials для NextAuth;
- email администратора;
- production `.env` значения.

## 3) Supabase setup

### Шаг 1. Создать проект
Создай новый Supabase project и зафиксируй:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### Шаг 2. Применить SQL schema
В SQL editor выполни:
- `supabase-schema.sql`
- `supabase-site-controls.sql`
- `supabase-ops.sql` если нужен partner/payout слой

### Шаг 3. Проверить объекты
Убедись, что существуют:
- `tools`
- `clicks`
- `tools_analytics`
- triggers / indexes / RLS policies

### Шаг 4. Импорт данных
1. Запусти parser:
   ```bash
   npm run import:tools
   ```
2. Получи `ai-tools-clean.json`
3. Импортируй записи в `tools`
4. Проверь отсутствие дублей и корректность slug/category/pricing

## 4) Environment variables

Сохрани как локально, так и на хостинге:

### Core
- `NEXT_PUBLIC_SITE_URL=https://your-domain.com`
- `NEXT_PUBLIC_SUPABASE_URL=...`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=...`
- `SUPABASE_SERVICE_ROLE_KEY=...`

### Auth
- `NEXTAUTH_URL=https://your-domain.com`
- `NEXTAUTH_SECRET=...`
- `GITHUB_ID=...`
- `GITHUB_SECRET=...`
- `ADMIN_EMAIL=you@example.com`

### Optional
- `NEXT_PUBLIC_DEFAULT_LOCALE=ru-RU`

## 5) Local validation

Перед деплоем:
```bash
npm install
npm run typecheck
npm run build
```

Проверить вручную:
- `/`
- `/category/marketing`
- `/tool/[slug]`
- `/go/[id]`
- `/admin`
- `/robots.txt`
- `/sitemap.xml`

## 6) VPS deployment

### Шаг 1. Подготовка сервера
На VPS установить:
- Docker
- Docker Compose
- Caddy или Nginx
- ufw / firewall rules

### Шаг 2. Клонирование проекта
```bash
git clone <repo-url>
cd grog
```

### Шаг 3. Настройка `.env`
Создай production `.env` и заполни все переменные.

### Шаг 4. Сборка и запуск
Пример через Docker Compose:
```bash
docker compose build
Docker compose up -d
```

### Шаг 5. Прокси и SSL
- направь домен на Cloudflare;
- проверь SSL;
- убедись, что `/` открывается по HTTPS;
- проверь canonical URL в метаданных.

## 7) DNS / Cloudflare

### Минимальный набор
- подключить домен к Cloudflare;
- включить proxy на A/AAAA записи при необходимости;
- настроить SSL mode: Full (strict);
- включить basic cache для статических ресурсов.

### Проверка
- сайт открывается по production domain;
- `/robots.txt` и `/sitemap.xml` доступны;
- нет mixed content.

## 8) Auth / Admin

### NextAuth
Проверь:
- GitHub OAuth callback URL;
- `NEXTAUTH_URL` совпадает с доменом;
- `ADMIN_EMAIL` корректен;
- `/admin` закрыт middleware.

### После входа
Проверь, что:
- админка открывается только для allowlisted email;
- metrics берутся из Supabase;
- экспорты работают.

## 9) Redirect / click logging

### Проверка `/go/[id]`
1. Открой страницу инструмента.
2. Нажми CTA.
3. Убедись, что редирект идёт через `/go/[id]`.
4. Проверь запись в `clicks`.
5. Проверь UTM / referer / device / country поля.

### Ожидаемое поведение
- redirect не должен падать даже если запись в БД временно не удалась;
- raw affiliate URL не должен быть виден пользователю.

## 10) SEO release checks

Проверь:
- `metadataBase` указывает на production domain;
- canonical URLs корректны;
- `hreflang` = `ru-RU`;
- JSON-LD есть на home/category/tool pages;
- `robots.txt` корректный;
- `sitemap.xml` содержит актуальные URL;
- страницы индексируются как публичные.

## 11) Search Console / Yandex Webmaster

### Google Search Console
1. Добавь домен.
2. Подтверди ownership.
3. Отправь `/sitemap.xml`.
4. Проверь coverage и indexing.

### Yandex Webmaster
1. Добавь домен.
2. Подтверди права.
3. Отправь sitemap.
4. Проверь region / indexing.

## 12) First production smoke test

После деплоя:
- homepage loads fast;
- category pages open;
- tool pages open;
- `/go/[id]` logs clicks;
- `/admin` защищён;
- `/robots.txt` and `/sitemap.xml` return 200;
- no console errors;
- no server errors.

## 13) Rollback plan

Если что-то сломалось:
1. Вернуть предыдущий git commit.
2. Перезапустить контейнер.
3. Отключить новые env vars / schema changes при необходимости.
4. Проверить доступность home, admin и redirect flow.

## 14) Practical recommendation

Если нужен один простой выбор, используй:
- **Selectel / Timeweb Cloud / Yandex Cloud VM**
- **Caddy**
- **Cloudflare**
- **Supabase**

Это самый сбалансированный путь для России: дёшево, доступно, контролируемо и без зависимости от Vercel.