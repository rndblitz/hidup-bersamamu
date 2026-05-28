-- Hidup Bersamamu Supabase schema
-- Jalankan di Supabase SQL Editor.

create extension if not exists "pgcrypto";

create table if not exists public.invitations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  bride_name text not null,
  groom_name text not null,
  event_date date not null,
  venue_name text not null,
  maps_url text,
  story text,
  slug text not null unique,
  status text not null default 'free',
  theme text not null default 'elegant',
  created_at timestamptz not null default now()
);

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references public.invitations(id) on delete cascade,
  guest_name text not null,
  attendance text not null default 'Hadir',
  message text,
  created_at timestamptz not null default now()
);

alter table public.invitations enable row level security;
alter table public.rsvps enable row level security;

-- Invitations policies
create policy "Users can insert own invitations"
on public.invitations
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can read own invitations"
on public.invitations
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can update own invitations"
on public.invitations
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- MVP public read. Untuk production yang lebih ketat, pakai edge function / public view.
create policy "Public can read invitations"
on public.invitations
for select
to anon, authenticated
using (true);

-- RSVP policies
create policy "Anyone can insert rsvps"
on public.rsvps
for insert
to anon, authenticated
with check (true);

create policy "Anyone can read rsvps"
on public.rsvps
for select
to anon, authenticated
using (true);
