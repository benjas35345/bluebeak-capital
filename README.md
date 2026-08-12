# BlueBeak Capital

Marketing site for BlueBeak Capital: Next.js 15 (App Router) + Tailwind CSS v4 + Supabase.

## Pages

`/` home, `/challenges`, `/competition`, `/affiliate`, `/faq`, `/contact`, `/privacy`, `/refunds` (+ generated `sitemap.xml` and `robots.txt`).

## Local development

```bash
npm install
npm run dev   # http://localhost:3000
```

## Deploy (Vercel)

1. Push this repo to GitHub.
2. vercel.com -> Add New -> Project -> import this repo -> Deploy. No configuration needed: framework auto-detects as Next.js, and the Supabase publishable key is baked in (protected by row-level security, insert-only).
3. Custom domain: Vercel project -> Settings -> Domains -> add `bluebeakcapital.com`, then set the DNS records Vercel shows you at your registrar.

## Supabase

- Project: `bluebeak-capital` (`dngrtzjupoezzyhdguvz`, eu-west-2).
- The contact form inserts into `public.contact_messages`. RLS allows anonymous INSERT only; reading messages requires the dashboard or service role (Supabase dashboard -> Table Editor -> contact_messages).
- To rotate keys or move projects, set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel -> Settings -> Environment Variables.

## Where things live

- All copy, pricing, birds, FAQ, competition data: `src/lib/site-data.ts` (one file to edit).
- Design tokens (colors, fonts, motion): `src/app/globals.css`.
- Artwork, fonts, icons: `public/assets/` (all self-hosted).
- The "Log in" button points to `https://app.bluebeakcapital.com` as a placeholder: change `DASHBOARD_URL` in `src/lib/site-data.ts` when the trader dashboard exists.

## Notes

- Privacy and refund pages are working drafts: have counsel review before launch.
- Footer social links point to generic instagram.com / x.com / youtube.com: swap in your real profiles in `src/components/site/chrome.tsx`.
