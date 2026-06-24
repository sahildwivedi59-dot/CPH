-- Run this in Supabase Dashboard > SQL Editor for project wtrfnhulfcxbeqifqayy.
-- It fixes: PGRST205 Could not find the table 'public.leads' in the schema cache.

create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text,
  phone text not null,
  business_type text,
  required_service text not null,
  budget text,
  project_requirement text not null,
  status text not null default 'New',
  status_updated_at timestamptz,
  notes text
);

alter table public.leads add column if not exists status_updated_at timestamptz;
alter table public.leads add column if not exists notes text;
update public.leads set status = 'New' where status not in ('New', 'Accepted', 'Declined');
alter table public.leads drop constraint if exists leads_status_check;
alter table public.leads add constraint leads_status_check check (status in ('New', 'Accepted', 'Declined'));

alter table public.leads enable row level security;

drop policy if exists "Allow anonymous lead inserts" on public.leads;

create policy "Allow anonymous lead inserts"
  on public.leads
  for insert
  to anon
  with check (
    status = 'New'
    and length(trim(name)) between 1 and 160
    and length(trim(phone)) between 5 and 40
    and length(trim(required_service)) between 1 and 200
    and length(trim(project_requirement)) between 1 and 5000
  );

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_required_service_idx on public.leads (required_service);
create index if not exists leads_status_idx on public.leads (status);

-- Tell PostgREST to refresh schema cache immediately.
notify pgrst, 'reload schema';
