-- Shriram Dental Clinic — Supabase schema
-- Run this in the Supabase SQL editor (Project → SQL Editor → New query)
-- after creating your project. Safe to re-run (uses IF NOT EXISTS / DROP POLICY IF EXISTS).

-- ────────────────────────────────────────────────────────────
-- 1. Appointments (from the /book page)
-- ────────────────────────────────────────────────────────────
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  patient_name text not null,
  phone text not null,
  email text,
  service text not null,
  appointment_date date not null,
  time_slot text not null,
  notes text,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled', 'completed'))
);

create index if not exists appointments_date_idx on public.appointments (appointment_date);
create index if not exists appointments_status_idx on public.appointments (status);

alter table public.appointments enable row level security;

-- Anyone (anon) can INSERT a booking — but only via the server route
-- (app/api/appointments), which uses the service-role key, so this
-- policy is a defence-in-depth backstop, not the primary write path.
drop policy if exists "Public can request an appointment" on public.appointments;
create policy "Public can request an appointment"
  on public.appointments for insert
  to anon
  with check (true);

-- Only signed-in (admin) users can read or manage appointments.
drop policy if exists "Admins can view appointments" on public.appointments;
create policy "Admins can view appointments"
  on public.appointments for select
  to authenticated
  using (true);

drop policy if exists "Admins can update appointments" on public.appointments;
create policy "Admins can update appointments"
  on public.appointments for update
  to authenticated
  using (true);

drop policy if exists "Admins can delete appointments" on public.appointments;
create policy "Admins can delete appointments"
  on public.appointments for delete
  to authenticated
  using (true);

-- ────────────────────────────────────────────────────────────
-- 2. Enquiries (from the popup enquiry form / contact page)
-- ────────────────────────────────────────────────────────────
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  message text,
  source_page text,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'closed'))
);

alter table public.enquiries enable row level security;

drop policy if exists "Public can submit an enquiry" on public.enquiries;
create policy "Public can submit an enquiry"
  on public.enquiries for insert
  to anon
  with check (true);

drop policy if exists "Admins can view enquiries" on public.enquiries;
create policy "Admins can view enquiries"
  on public.enquiries for select
  to authenticated
  using (true);

drop policy if exists "Admins can update enquiries" on public.enquiries;
create policy "Admins can update enquiries"
  on public.enquiries for update
  to authenticated
  using (true);

-- ────────────────────────────────────────────────────────────
-- 3. Admin user
-- ────────────────────────────────────────────────────────────
-- There is no separate "admin" table — any user in Supabase Auth
-- (auth.users) who can log in IS an admin, because every RLS policy
-- above grants full access to any `authenticated` request.
--
-- Create your admin login at:
--   Supabase Dashboard → Authentication → Users → Add user
-- Then sign in at /admin/login on the site with that email + password.
--
-- If you later add staff who should NOT see the dashboard, replace the
-- `to authenticated` policies above with a check against a real
-- `admin_users` allow-list table instead.
