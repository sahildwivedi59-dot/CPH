-- Contact enquiry table for the CPH website.
-- This schema allows public website visitors to insert enquiries only.

create extension if not exists pgcrypto;

create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text,
  phone text not null,
  business_type text,
  service_id text not null,
  service_title text not null,
  service_starting_budget text not null,
  service_timeline text,
  service_features jsonb not null default '[]'::jsonb,
  service_upgrades jsonb not null default '[]'::jsonb,
  requirement text not null,
  source text not null default 'website_contact_form',
  page_url text,
  user_agent text,
  status text not null default 'new',
  constraint contact_inquiries_required_fields_chk check (
    length(trim(name)) between 1 and 160
    and length(trim(phone)) between 5 and 40
    and length(trim(service_id)) between 1 and 120
    and length(trim(service_title)) between 1 and 200
    and length(trim(service_starting_budget)) between 1 and 80
    and length(trim(requirement)) between 1 and 5000
    and source = 'website_contact_form'
  )
);

alter table public.contact_inquiries enable row level security;

create index if not exists contact_inquiries_created_at_idx
  on public.contact_inquiries (created_at desc);

create index if not exists contact_inquiries_service_id_idx
  on public.contact_inquiries (service_id);

create index if not exists contact_inquiries_status_idx
  on public.contact_inquiries (status);

drop policy if exists "Allow anonymous website inquiry inserts" on public.contact_inquiries;

create policy "Allow anonymous website inquiry inserts"
  on public.contact_inquiries
  for insert
  to anon
  with check (
    length(trim(name)) between 1 and 160
    and length(trim(phone)) between 5 and 40
    and length(trim(service_id)) between 1 and 120
    and length(trim(service_title)) between 1 and 200
    and length(trim(service_starting_budget)) between 1 and 80
    and length(trim(requirement)) between 1 and 5000
    and source = 'website_contact_form'
    and status = 'new'
  );