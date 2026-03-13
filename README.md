# Quiz Duel UI

A Jeopardy-style team quiz game built with React, TypeScript, Vite, and Supabase-backed content.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Supabase

## Local Development

```sh
npm install
npm run dev
```

Create a `.env` file from `.env.example` before running the live content flow.

## Supabase Setup

Add these values to `.env`:

```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_SEED_USER_EMAIL=you@example.com
```

Use the service-role key only for the seed script, never in the browser app.

## Seed Legacy Questions

After your Supabase schema is ready and your admin user exists, import the current hardcoded question bank:

```sh
npm run seed:supabase
```

This script reads `src/data/categories.ts` and upserts the legacy categories and questions into Supabase as approved content.

## Scripts

- `npm run dev`: start local development server
- `npm run build`: create production build
- `npm run preview`: preview production build locally
- `npm run lint`: run ESLint
- `npm run seed:supabase`: import the legacy question bank into Supabase
- `npm run test`: run tests once
- `npm run test:watch`: run tests in watch mode
