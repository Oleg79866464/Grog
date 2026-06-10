create table if not exists public.site_controls (
  id uuid primary key default gen_random_uuid(),
  anti_capture_enabled boolean not null default false,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create or replace function public.set_site_controls_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_site_controls_updated_at
before update on public.site_controls
for each row execute function public.set_site_controls_updated_at();

alter table public.site_controls enable row level security;

create policy "Admin manage site controls"
on public.site_controls
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');
