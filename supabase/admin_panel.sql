-- Secure CPH Admin Panel schema for Supabase.
-- Public visitors can INSERT leads only.
-- Only authenticated users listed in admin_users can SELECT or UPDATE leads.

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

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  email text not null unique,
  role text not null default 'admin',
  created_at timestamptz not null default now(),
  constraint admin_users_role_check check (role = 'admin')
);

create unique index if not exists admin_users_user_id_idx on public.admin_users (user_id);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_required_service_idx on public.leads (required_service);
create index if not exists leads_status_idx on public.leads (status);

alter table public.leads enable row level security;
alter table public.admin_users enable row level security;

drop policy if exists "Allow anonymous lead inserts" on public.leads;
drop policy if exists "Allow admin lead selects" on public.leads;
drop policy if exists "Allow admin lead updates" on public.leads;
drop policy if exists "Allow admin lead deletes" on public.leads;
drop policy if exists "Allow users to check own admin record" on public.admin_users;

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

create policy "Allow admin lead selects"
  on public.leads
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.admin_users
      where admin_users.user_id = (select auth.uid())
        and admin_users.role = 'admin'
    )
  );

create policy "Allow admin lead updates"
  on public.leads
  for update
  to authenticated
  using (
    exists (
      select 1
      from public.admin_users
      where admin_users.user_id = (select auth.uid())
        and admin_users.role = 'admin'
    )
  )
  with check (
    exists (
      select 1
      from public.admin_users
      where admin_users.user_id = (select auth.uid())
        and admin_users.role = 'admin'
    )
  );

create policy "Allow users to check own admin record"
  on public.admin_users
  for select
  to authenticated
  using (user_id = (select auth.uid()));

notify pgrst, 'reload schema';

-- After creating your admin user in Supabase Auth, run this with that user's auth.users.id:
-- insert into public.admin_users (user_id, email, role)
-- values ('PASTE_AUTH_USER_ID_HERE', 'admin@cph.com', 'admin')
-- on conflict (email) do update set user_id = excluded.user_id, role = 'admin';
