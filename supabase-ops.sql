create extension if not exists pgcrypto;

create table if not exists public.app_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  role text not null default 'partner',
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.partner_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.app_users(id) on delete cascade,
  payout_provider text,
  payout_email text,
  payout_currency text not null default 'USD',
  hold_days integer not null default 14,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.earnings_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.app_users(id) on delete cascade,
  tool_id uuid references public.tools(id) on delete set null,
  amount numeric(12,2) not null default 0,
  currency text not null default 'USD',
  status text not null default 'pending',
  source text not null default 'affiliate',
  reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payout_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.app_users(id) on delete cascade,
  amount numeric(12,2) not null,
  currency text not null default 'USD',
  status text not null default 'requested',
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.app_users(id) on delete cascade,
  payout_request_id uuid references public.payout_requests(id) on delete set null,
  amount numeric(12,2) not null,
  currency text not null default 'USD',
  status text not null default 'paid',
  provider_reference text,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_user_id uuid not null references public.app_users(id) on delete cascade,
  referred_user_id uuid not null references public.app_users(id) on delete cascade,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
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

create trigger trg_app_users_updated_at
before update on public.app_users
for each row execute function public.set_updated_at();

create trigger trg_partner_accounts_updated_at
before update on public.partner_accounts
for each row execute function public.set_updated_at();

create trigger trg_earnings_ledger_updated_at
before update on public.earnings_ledger
for each row execute function public.set_updated_at();

create trigger trg_payout_requests_updated_at
before update on public.payout_requests
for each row execute function public.set_updated_at();

create trigger trg_payouts_updated_at
before update on public.payouts
for each row execute function public.set_updated_at();

create trigger trg_referrals_updated_at
before update on public.referrals
for each row execute function public.set_updated_at();

create index if not exists idx_app_users_email on public.app_users(email);
create index if not exists idx_earnings_ledger_user_id on public.earnings_ledger(user_id);
create index if not exists idx_earnings_ledger_status on public.earnings_ledger(status);
create index if not exists idx_payout_requests_user_id on public.payout_requests(user_id);
create index if not exists idx_payout_requests_status on public.payout_requests(status);
create index if not exists idx_payouts_user_id on public.payouts(user_id);
create index if not exists idx_payouts_status on public.payouts(status);
create index if not exists idx_referrals_referrer on public.referrals(referrer_user_id);
create index if not exists idx_referrals_referred on public.referrals(referred_user_id);

alter table public.app_users enable row level security;
alter table public.partner_accounts enable row level security;
alter table public.earnings_ledger enable row level security;
alter table public.payout_requests enable row level security;
alter table public.payouts enable row level security;
alter table public.referrals enable row level security;

create policy "Admin manage app users"
on public.app_users
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

create policy "Admin manage partner accounts"
on public.partner_accounts
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

create policy "Admin manage earnings ledger"
on public.earnings_ledger
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

create policy "Admin manage payout requests"
on public.payout_requests
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

create policy "Admin manage payouts"
on public.payouts
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

create policy "Admin manage referrals"
on public.referrals
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');
