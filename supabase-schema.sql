create extension if not exists pgcrypto;

create table if not exists public.tools (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null,
  url text not null,
  affiliate_url text not null,
  category text not null,
  pricing text not null default 'Paid',
  tags text[] not null default '{}',
  commission_rate numeric(5,2) not null default 0.10,
  click_count bigint not null default 0,
  featured boolean not null default false,
  verified boolean not null default false,
  country text,
  device_type text,
  referer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.clicks (
  id uuid primary key default gen_random_uuid(),
  tool_id uuid not null references public.tools(id) on delete cascade,
  slug text not null,
  country text,
  device_type text,
  referer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  ip inet,
  clicked_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.increment_tool_click_count()
returns trigger
language plpgsql
as $$
begin
  update public.tools set click_count = click_count + 1, updated_at = now() where id = new.tool_id;
  return new;
end;
$$;

create trigger trg_tools_updated_at
before update on public.tools
for each row execute function public.set_updated_at();

create trigger trg_clicks_increment
after insert on public.clicks
for each row execute function public.increment_tool_click_count();

create index if not exists idx_tools_slug on public.tools(slug);
create index if not exists idx_tools_category on public.tools(category);
create index if not exists idx_tools_featured on public.tools(featured);
create index if not exists idx_tools_verified on public.tools(verified);
create index if not exists idx_tools_tags on public.tools using gin(tags);
create index if not exists idx_clicks_tool_id on public.clicks(tool_id);
create index if not exists idx_clicks_clicked_at on public.clicks(clicked_at desc);
create index if not exists idx_clicks_country on public.clicks(country);
create index if not exists idx_clicks_device_type on public.clicks(device_type);

create or replace view public.tools_analytics as
select
  t.id,
  t.slug,
  t.name,
  t.category,
  t.pricing,
  t.commission_rate,
  t.featured,
  t.verified,
  t.click_count,
  count(c.id) as tracked_clicks,
  coalesce(sum(case when c.clicked_at is not null then 1 else 0 end), 0) as total_clicks,
  count(*) filter (where c.device_type = 'mobile') as mobile_clicks,
  count(*) filter (where c.device_type = 'desktop') as desktop_clicks,
  count(*) filter (where c.country is not null) as geo_events,
  max(c.clicked_at) as last_clicked_at
from public.tools t
left join public.clicks c on c.tool_id = t.id
group by t.id;

alter table public.tools enable row level security;
alter table public.clicks enable row level security;

create policy "Public read tools"
on public.tools
for select
using (true);

create policy "Public insert clicks"
on public.clicks
for insert
with check (true);

create policy "Admin manage tools"
on public.tools
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

create policy "Admin manage clicks"
on public.clicks
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');
