-- Monetization schema for Supabase

create table if not exists public.monetization_offers (
  id text primary key,
  slug text not null unique,
  entity_type text not null check (entity_type in ('sponsor', 'advertiser', 'bank_product')),
  title text not null,
  description text not null default '',
  short_description text not null default '',
  url text not null,
  affiliate_url text not null,
  cta_label text not null default 'Open',
  category text not null default 'general',
  placement text not null default 'homepage_footer',
  price_model text not null default 'revshare',
  pricing text not null default 'custom',
  commission_rate numeric not null default 0.2,
  featured boolean not null default false,
  verified boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'active', 'paused', 'archived')),
  tags text[] not null default '{}',
  country text not null default 'RU',
  device_type text not null default 'all',
  click_count integer not null default 0,
  impression_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists monetization_offers_status_idx on public.monetization_offers (status);
create index if not exists monetization_offers_featured_idx on public.monetization_offers (featured desc);
create index if not exists monetization_offers_placement_idx on public.monetization_offers (placement);
create index if not exists monetization_offers_category_idx on public.monetization_offers (category);
create index if not exists monetization_offers_tags_idx on public.monetization_offers using gin (tags);

create table if not exists public.monetization_events (
  id bigint generated always as identity primary key,
  offer_id text not null references public.monetization_offers(id) on delete cascade,
  event_type text not null check (event_type in ('click', 'impression')),
  country text not null default 'unknown',
  device_type text not null default 'desktop',
  referer text not null default '',
  utm_source text not null default '',
  utm_medium text not null default '',
  utm_campaign text not null default '',
  clicked_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists monetization_events_offer_id_idx on public.monetization_events (offer_id);
create index if not exists monetization_events_event_type_idx on public.monetization_events (event_type);
create index if not exists monetization_events_clicked_at_idx on public.monetization_events (clicked_at desc);
create index if not exists monetization_events_country_idx on public.monetization_events (country);
create index if not exists monetization_events_device_type_idx on public.monetization_events (device_type);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.bump_monetization_counters()
returns trigger
language plpgsql
as $$
begin
  if new.event_type = 'click' then
    update public.monetization_offers set click_count = click_count + 1, updated_at = now() where id = new.offer_id;
  elsif new.event_type = 'impression' then
    update public.monetization_offers set impression_count = impression_count + 1, updated_at = now() where id = new.offer_id;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_monetization_offers_updated_at on public.monetization_offers;
create trigger trg_monetization_offers_updated_at
before update on public.monetization_offers
for each row execute function public.set_updated_at();

drop trigger if exists trg_monetization_events_counter on public.monetization_events;
create trigger trg_monetization_events_counter
after insert on public.monetization_events
for each row execute function public.bump_monetization_counters();

create or replace view public.monetization_analytics as
select
  o.*,
  coalesce(sum(case when e.event_type = 'click' then 1 else 0 end), 0)::integer as tracked_clicks,
  coalesce(sum(case when e.event_type = 'impression' then 1 else 0 end), 0)::integer as tracked_impressions,
  coalesce(sum(case when e.event_type = 'click' then 1 else 0 end), 0)::integer as total_clicks,
  coalesce(sum(case when e.event_type = 'impression' then 1 else 0 end), 0)::integer as total_impressions,
  max(case when e.event_type = 'click' then e.clicked_at else null end) as last_clicked_at
from public.monetization_offers o
left join public.monetization_events e on e.offer_id = o.id
group by o.id;

alter table public.monetization_offers enable row level security;
alter table public.monetization_events enable row level security;

create policy if not exists "public read monetization offers"
  on public.monetization_offers
  for select
  using (status = 'active');

create policy if not exists "service role manage monetization offers"
  on public.monetization_offers
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy if not exists "service role insert monetization events"
  on public.monetization_events
  for insert
  with check (auth.role() = 'service_role');

create policy if not exists "service role read monetization events"
  on public.monetization_events
  for select
  using (auth.role() = 'service_role');
