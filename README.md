# Shriram Dental Clinic & Implant Center — Website

Production-ready marketing website for **Shriram Dental Clinic & Implant
Center** (CIDCO N-2, Chhatrapati Sambhajinagar, Maharashtra), built with
Next.js App Router, TypeScript, Tailwind CSS, and Supabase.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** + `tailwindcss-animate`
- **GSAP + ScrollTrigger** — scroll-reveal animations, 5 variants
  (`components/animations/Reveal.tsx`): fade-up, slide-left, slide-right,
  blur, zoom
- **Supabase** — Postgres database + Auth, used for the booking system
  and the admin dashboard
- **react-day-picker** (shadcn/ui "Calendar" pattern) — the date picker
  on `/book`
- **Radix UI** (Dialog, Popover, Label) — the shadcn-style primitives in
  `components/ui/`
- **Lucide React** — icons
- Google Fonts via `next/font`: **Fraunces** (display) + **Plus Jakarta Sans** (body)

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase project values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Build for production:

```bash
npm run build
npm run start
```

## Setting up Supabase (required for booking + admin to work)

1. Create a free project at [supabase.com](https://supabase.com).
2. In **Project Settings → API**, copy the **Project URL**, **anon
   public key**, and **service_role key**.
3. Paste them into `.env.local` (see `.env.example`):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only — never expose this to the browser)
4. Open the **SQL Editor** in Supabase, paste the contents of
   `supabase/schema.sql`, and run it. This creates the `appointments`
   and `enquiries` tables with Row Level Security already configured.
5. Create your admin login: **Authentication → Users → Add user**
   (email + password). Anyone who can sign in is treated as an admin —
   there's no separate roles table (see the comment at the bottom of
   `supabase/schema.sql` if you want to add one later).
6. Sign in at `/admin/login` (also linked from the site footer as
   "Staff login") to reach `/admin/appointments`.

Deploying? Add the same three environment variables in your host's
dashboard (Vercel: Project → Settings → Environment Variables).

## How booking works

- **`/book`** — public page. Visitor picks a treatment, date (shadcn
  Calendar), time slot, and enters their details. Submits to
  `POST /api/appointments`, which writes to Supabase using the
  service-role key server-side (so visitors don't need an account).
- **Enquiry popup** — a lighter-weight "call me back" form available
  from the header's "Enquire" button anywhere on the site
  (`components/sections/EnquiryModal.tsx`), posting to
  `POST /api/enquiries`.
- **`/admin/appointments`** — protected by `middleware.ts`, which
  checks for a Supabase Auth session and redirects to `/admin/login`
  if there isn't one. Shows every appointment request (with a status
  dropdown: pending / confirmed / completed / cancelled) and every
  quick enquiry.

## Project structure

```
app/
  layout.tsx          Root layout, fonts, global SEO metadata, JSON-LD
  page.tsx             Home page
  about/page.tsx        About page
  services/page.tsx     Services page
  contact/page.tsx      Contact page
  book/page.tsx          Online booking page (shadcn calendar)
  admin/
    login/page.tsx        Admin sign-in (Supabase Auth)
    appointments/page.tsx Protected dashboard
    layout.tsx             Admin shell (header + sign out)
  api/
    appointments/route.ts  POST — create a booking request
    enquiries/route.ts      POST — create a quick enquiry
  sitemap.ts / robots.ts
  icon.tsx / apple-icon.tsx / opengraph-image.tsx   Generated favicon & social image
  globals.css

components/
  layout/     Header, Footer, MobileCTA (sticky call/WhatsApp bar on mobile)
  sections/   Hero, Services, AboutTeaser, WhyChooseUs, BookingPromo,
              VisitSteps, Gallery, FAQ, Location, CTABanner, ContactForm,
              EnquiryModal, BookingForm
  admin/      AdminHeader, AppointmentsTable, EnquiriesList
  ui/         Button, Container, SectionHeading, ServiceCard,
              dialog.tsx, calendar.tsx, popover.tsx, label.tsx, input.tsx
              (shadcn-style primitives), BackgroundVideo.tsx
  animations/ Reveal.tsx — GSAP ScrollTrigger scroll-reveal wrapper
              (variants: fade-up, slide-left, slide-right, blur, zoom)

lib/
  constants.ts     All clinic data: address, phone, services, highlights
  gsap.ts          GSAP setup + useScopedGsap hook (auto-cleanup, respects
                   prefers-reduced-motion)
  utils.ts         cn() class-name helper (clsx + tailwind-merge)
  supabase/
    client.ts        Browser Supabase client
    server.ts         Server Supabase client + service-role client

supabase/
  schema.sql       Run this in the Supabase SQL editor — creates
                    appointments + enquiries tables and RLS policies

middleware.ts      Protects /admin/* behind a Supabase session
```

## Editing clinic content

Almost everything text-based (address, phone number, service list,
highlights, first-visit steps) lives in **`lib/constants.ts`**. Update it
there and it flows through the whole site.

## Before you launch — please review

To stay accurate, this build only uses information that was actually
provided (clinic name, address, phone number) plus standard, generic
dental-service categories. It intentionally does **not** include:

- Doctor names, qualifications, or years of experience
- Awards, certifications, or "X happy patients" style claims
- Patient testimonials or reviews
- Specific treatment outcomes or guarantees
- Clinic hours (a placeholder "call to confirm timings" is used instead)

Before launch, please add real information for:

1. **Doctor bio(s)** — name, qualification, registration number, and a
   short intro, if you'd like this included.
2. **Real photography** — the site currently uses placeholder stock
   photography from Unsplash (clearly generic, not of your clinic) in
   `lib/constants.ts` (`GALLERY_IMAGES`) and inline in `Hero.tsx`,
   `AboutTeaser.tsx`, `BookingPromo.tsx`, and `about/page.tsx`. Swap
   these `src` URLs for real photos of your clinic (ideally hosted in
   `/public/images/` and referenced with a local path instead).
3. **Clinic hours** — currently shown as "call to confirm timings" in
   `Location.tsx` and `constants.ts` (`VISIT_STEPS`/highlights); replace
   with your actual opening hours once confirmed.
4. **Time slots** — `TIME_SLOTS` in `components/sections/BookingForm.tsx`
   is a placeholder schedule; adjust it to your real clinic hours.
5. **Testimonials** — if you'd like to add real, consenting patient
   reviews later, they can go in a new `Testimonials.tsx` section.
6. **Domain** — `SITE_URL` in `lib/constants.ts` is set to a placeholder
   (`https://www.shriramdentalclinic.in`); update it to your real domain
   once registered, since it's used for SEO metadata and the sitemap.

## Adding the hero/CTA background video

`components/ui/BackgroundVideo.tsx` is wired into `CTABanner.tsx` but
ships with no video file (none was available to include). To activate it:

1. Export a **short (≤15s), low-resolution (720p or less), H.264 .mp4**
   clip, ideally under ~4MB.
2. Save it as `public/videos/clinic-loop.mp4`.

The component lazy-loads it only once it scrolls near the viewport, and
fails silently (falling back to the existing background) if the file
isn't there — so it's safe to ship either way.

## SEO

- Per-page `<title>` / meta description via the Next.js Metadata API
- `Dentist` JSON-LD structured data in `app/layout.tsx`, including a
  `ReserveAction` pointing at `/book`
- Auto-generated `sitemap.xml` (includes `/book`) and `robots.txt`
- Auto-generated favicon, Apple touch icon, and Open Graph image
  (`app/icon.tsx`, `app/apple-icon.tsx`, `app/opengraph-image.tsx`)
- `/admin/*` is marked `noindex, nofollow`

## Notes on animation & performance

- GSAP is scoped per-component via `gsap.context()` and cleaned up on
  unmount — no leaked ScrollTriggers when navigating between pages.
- All scroll animations respect `prefers-reduced-motion`.
- Images use `next/image` with explicit `sizes` for responsive loading
  and modern `avif`/`webp` formats (see `next.config.mjs`).
- The background video is lazy-loaded via `IntersectionObserver` and
  never blocks first paint.
- Admin dashboard data fetching happens server-side
  (`app/admin/appointments/page.tsx`), so the protected route ships
  minimal client JS beyond the interactive status dropdowns.

## Packaging as a zip

From the project root (with `node_modules` excluded):

```bash
zip -r shriram-dental-clinic.zip . -x "node_modules/*" ".next/*"
```
