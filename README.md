# Stock Management System

A product reservation management system built with Next.js 16 and Supabase. This application allows users to create product reservations and managers to approve, reject, or complete them.

## Tech Stack

- **Framework**: Next.js 16 (App Router, React 19)
- **Database/Auth**: Supabase with cookie-based authentication via `@supabase/ssr`
- **UI**: Tailwind CSS + shadcn/ui (new-york style) + Lucide icons
- **Forms**: react-hook-form + zod validation
- **Charts**: Recharts

## Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm
- A Supabase account and project

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd stock
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-or-anon-key
```

You can find these values in your [Supabase project settings](https://supabase.com/dashboard/project/_/settings/api):
- **Project URL**: Found under "Project URL"
- **Publishable Key**: Found under "Project API keys" (use the `anon` / `public` key)

## Database Setup

Run the following SQL scripts in your Supabase SQL Editor in this exact order:

### Step 1: Create user tables and roles

Run the contents of `database/create_users_tables.sql`:
- Creates user roles (`reservation_manager`, `reservation_requester`)
- Creates functions to assign roles to users
- Creates the `users` table
- Inserts default test users

### Step 2: Create reservation tables

Run the contents of `database/create_reservation_tables.sql`:
- Creates the `products` table
- Creates the `reservations` table
- Creates the `reservations_products` junction table
- Sets up indexes and row-level security policies

### Step 3: Seed products data

Run the contents of `database/seed_products.sql`:
- Populates the products table with 41 office supply items

### Step 4 (Optional): Seed reservations data

Run the contents of `database/seed_reservations.sql`:
- Creates sample reservation data for the last 6 months
- Useful for testing the dashboard charts and statistics

## Creating Users

### 1. Create authentication users

First, create users through Supabase Authentication:
- Go to your Supabase Dashboard > Authentication > Users
- Click "Add user" and create users with email/password

### 2. Assign roles to users

After creating auth users, assign their roles by running in the SQL Editor:

```sql
-- Make a user a reservation manager
SELECT public.make_user_reservation_manager('manager@mail.com');

-- Make a user a reservation requester
SELECT public.make_user_reservation_requester('requester@mail.com');
```

### 3. Create corresponding entries in users table

Make sure each auth user has a matching entry in the `public.users` table:

```sql
INSERT INTO "public"."users" ("email", "name", "role", "userId")
VALUES ('your-email@example.com', 'Your Name', 'reservation_requester', 'auth-user-uuid');
```

The `userId` should match the UUID from `auth.users`.

### Default Test Users

The setup scripts create two test users:
- **manager@mail.com** - Role: `reservation_manager`
- **requester@mail.com** - Role: `reservation_requester`

## Running the Application

### Development

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Production

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
app/
├── (protected)/           # Routes requiring authentication
│   ├── layout.tsx        # Sidebar layout with auth check
│   ├── dashboard/        # Dashboard with charts and statistics
│   ├── new-reservation/  # Create new reservations
│   └── reservations/     # View and manage reservations
├── login/                # Login page
└── layout.tsx            # Root layout with ThemeProvider

components/
├── ui/                   # shadcn/ui components
├── hooks/use-user.ts     # Client-side auth hook
└── app-sidebar.tsx       # Main navigation sidebar

lib/supabase/
├── server.ts             # Server-side Supabase client
├── client.ts             # Browser-side Supabase client
└── supabase.d.ts         # Generated database types

database/                 # SQL setup scripts
├── create_users_tables.sql
├── create_reservation_tables.sql
├── seed_products.sql
└── seed_reservations.sql

interfaces/               # TypeScript interfaces
repository/               # Data access layer
utils/                    # Utility functions
```

## Database Schema

### Tables

| Table | Description |
|-------|-------------|
| `users` | Application users with roles |
| `products` | Product inventory |
| `reservations` | Reservation requests |
| `reservations_products` | Junction table linking reservations to products |

### User Roles

| Role | Permissions |
|------|-------------|
| `reservation_requester` | Can create and view their own reservations |
| `reservation_manager` | Can approve, reject, and complete reservations |

### Reservation Statuses

| Status | Description |
|--------|-------------|
| `pending` | Newly created, awaiting manager review |
| `available` | Approved by manager, ready for pickup |
| `rejected` | Rejected by manager |
| `completed` | Delivered/picked up |

## Troubleshooting

### "Invalid API key" error
- Verify your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in `.env.local`
- Make sure there are no trailing spaces or quotes around the values

### Database connection issues
- Ensure your Supabase project is active (not paused)
- Check that Row Level Security policies are properly configured

### Authentication not working
- Make sure the user exists in both `auth.users` and `public.users`
- Verify the user's role is correctly set

## License

MIT
