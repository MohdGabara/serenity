# Serenity Secrets Tours

Reel-first, multilingual Egypt trip builder built with Next.js 15, TypeScript, and a Supabase-ready persistence model.

## Run locally

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`. Locales: `/en`, `/de`, `/ar`.

## Included foundation

- 16 seeded, publishable experiences and 5 official package records, based on the supplied catalogs.
- Reel-ready discovery cards with poster fallbacks; media is only publishable when authorized.
- Date-aware itinerary builder, price markup, five-currency display, USD test checkout, and booking validation endpoint.
- Admin dashboard preview, SEO sitemap/robots, Arabic RTL, and a Supabase SQL schema for production persistence.

## Production setup

1. Create a Supabase project, run `supabase/schema.sql`, then configure server-only Supabase credentials.
2. Add an ExchangeRate-API key and implement the daily sync job; admins can persist an override in `fx_rates`.
3. Upload written-authorized media to your chosen storage/video provider and persist the resulting asset URLs.
4. Implement the selected payment adapter and verify its webhook signature before enabling live checkout.

Supplier prices and supplier/reference media are never intended for public display. The current UI uses poster fallbacks and labels Reel slots as ready for upload.
