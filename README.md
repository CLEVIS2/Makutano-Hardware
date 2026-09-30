# MAKUTANO HARDWARE

Responsive hardware catalogue and order builder built with React, TypeScript, and Vite. Prices are sample KSh retail prices and can be edited in the admin area.

## Run locally

```sh
npm install
npm run dev
```

## Build for Vercel

```sh
npm run build
```

Deploy the project root to Vercel using the Vite preset. Build output is `dist`.

## Current data and admin limitations

Products, stock, and prices are stored in this browser's localStorage. The demo admin login is `admin` / `makutano2026`; this is not secure authentication and must not be used for production. Orders open the visitor's email app with a prefilled message addressed to Nyongesaclevis76@gmail.com. To support shared product data, protected admin access, and stored orders, connect Supabase (database tables, Supabase Auth, and server-side policies) before production use. Product costs/profit are illustrative and should be replaced with actual business figures.
