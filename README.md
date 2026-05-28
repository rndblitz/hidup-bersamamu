# Hidup Bersamamu Ready Kit

Paket source code siap pakai untuk platform undangan digital freemium.

## Fitur

- Landing page
- Register member
- Login member
- Dashboard member
- Create invitation
- Edit invitation
- Status `free` / `premium`
- Public link `/u/[slug]`
- Premium lock
- 4 tema: `elegant`, `floral`, `islamic`, `luxury`
- RSVP dan ucapan tamu
- Supabase database + auth
- Siap deploy ke Vercel

## Setup singkat

1. Copy file `.env.example` menjadi `.env.local`
2. Isi:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xxxxx
```

3. Masuk Supabase → SQL Editor → jalankan file:

```text
supabase/schema.sql
```

4. Install dependency:

```bash
npm install
```

5. Jalankan local:

```bash
npm run dev
```

6. Buka:

```text
http://localhost:3000
```

## Deploy ke Vercel

1. Push ke GitHub
2. Import project ke Vercel
3. Tambahkan Environment Variables di Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Redeploy

## Cara pakai

- Daftar member di `/register`
- Login di `/login`
- Buat undangan di `/dashboard/create`
- Edit status undangan menjadi `premium` di halaman edit atau Supabase
- Buka public link `/u/slug-undangan`

## Catatan

Paket ini tidak menyertakan `node_modules` dan `.env.local` agar aman.
