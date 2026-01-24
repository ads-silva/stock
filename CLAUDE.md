# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

This is a **Stock Management System** built with Next.js 16 and Supabase, focused on product reservations.

### Tech Stack
- **Framework**: Next.js 16 (App Router, React 19)
- **Database/Auth**: Supabase with cookie-based authentication via `@supabase/ssr`
- **UI**: Tailwind CSS + shadcn/ui (new-york style) + Lucide icons
- **Forms**: react-hook-form + zod validation

### Directory Structure

```
app/
├── (protected)/           # Routes requiring authentication
│   ├── layout.tsx        # Sidebar layout with auth check
│   ├── dashboard/
│   ├── new-reservation/  # Create reservations with products
│   └── reservations/     # View/manage reservations
├── login/
└── layout.tsx            # Root layout with ThemeProvider

components/
├── ui/                   # shadcn/ui components
├── hooks/use-user.ts     # Client-side auth hook
├── app-sidebar.tsx       # Main navigation sidebar
└── nav-*.tsx             # Navigation components

lib/supabase/
├── server.ts             # Server-side Supabase client (always create fresh)
├── client.ts             # Browser-side Supabase client
└── supabase.d.ts         # Generated database types

interfaces/               # TypeScript interfaces extending Supabase types
```

### Database Schema

Four main tables in `public` schema:
- **users**: id, name, email, role, userId (Supabase auth ref)
- **products**: id, name, description, price, amount
- **reservations**: id, status, requesterUserId, managerUserId, managerComment
- **reservations_products**: Links reservations to products with amounts

User roles: `reservation_requester` and `reservation_manager` (set via Supabase functions)

### Authentication Pattern

- Protected routes live under `app/(protected)/`
- Auth check in `app/(protected)/layout.tsx` uses `supabase.auth.getClaims()`
- Redirects to `/login` if unauthenticated
- Server components: use `createClient()` from `lib/supabase/server.ts` (create fresh each call)
- Client components: use `createClient()` from `lib/supabase/client.ts` or `useUser()` hook

### Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

### Path Aliases

`@/*` maps to root directory (configured in tsconfig.json)
