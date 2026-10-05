# MAKUTANO HARDWARE

Responsive hardware catalogue and order builder built with React, TypeScript, and Vite. Prices are sample KSh retail prices and can be edited in the admin area.

## Requirements

- Node.js (LTS recommended)
- npm

## Run locally

```sh
npm ci
npm run dev
```

Vite prints the local development URL in the terminal.

## Production build

```sh
npm run build
```

The production-ready site is generated in `dist/`. Deploy the project root to Vercel using the Vite preset; the build command is `npm run build` and the output directory is `dist`.

## Upload to GitHub

Create an empty repository on GitHub, then run these commands from the project folder (replace the URL with your repository URL):

```sh
git init
git add .
git commit -m "Prepare Makutano Hardware website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

The `.gitignore` excludes `node_modules`, build output, local environment files, and TypeScript build cache. Keep real credentials and private configuration out of the repository.

## Current data and admin limitations

Products, stock, and prices are stored in this browser's localStorage. The demo admin login is `admin` / `makutano2026`; this is not secure authentication and must not be used for production. Orders open the visitor's email app with a prefilled message addressed to Nyongesaclevis76@gmail.com. To support shared product data, protected admin access, and stored orders, connect Supabase (database tables, Supabase Auth, and server-side policies) before production use. Product costs/profit are illustrative and should be replaced with actual business figures.
