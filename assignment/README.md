
---

# Authentication and Profile Management System

## Next.js (App Router) + Supabase

### Introduction

This project provides a clean implementation of user authentication and profile management using Next.js (App Router) and Supabase. It includes user registration, login, and the ability to update profile information. The codebase is structured to separate client-side, server-side, and API responsibilities in a maintainable and scalable way.

---

## Technology Stack

* Next.js (App Router)
* React with TypeScript
* Supabase Authentication
* Supabase PostgreSQL Database
* API Routes (Server-side)
* Client Components and Server Components

---

## Features

### Authentication

* User registration using email and password
* Secure user login
* Session handling managed by Supabase

### Profile Management

* Each user has a profile stored in the `profiles` table
* Users can update their full name
* Profile information is stored and updated using upsert operations
* Server-side API route validates session and manages updates

---

## Project Structure

```
project/
│
├── app/
│   ├── (auth)/
│   │   ├── signup/
│   │   └── login/
│   ├── profile/
│   ├── api/
│   │   └── profile/
│   │       └── update/route.ts
│   └── layout.tsx
│
├── lib/
│   ├── supabaseClient.ts
│   └── supabaseServer.ts
│
├── public/
├── .env.local
└── README.md
```

---

## Environment Variables

Create a `.env.local` file in the project root with the following values:

```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<your-public-api-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

Important notes:

* The publishable key is safe for client-side use.
* The service role key must remain **server-side only** and must never be exposed publicly.

---

## Database Schema

Run the following SQL in the Supabase SQL Editor to create the `profiles` table:

```sql
create table profiles (
  id uuid primary key,
  full_name text,
  updated_at timestamp
);
```

The `id` column corresponds to the authenticated user’s ID returned by Supabase.

---

## Installation and Local Development

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

Visit the application at:

```
http://localhost:3000
```

---

## API Endpoint

### Update Profile

**Method:** POST
**Route:** `/api/profile/update`

**Purpose:**
Handles updating or inserting the authenticated user’s profile information.
Uses an upsert operation to ensure the profile row is created if it does not already exist.

---

## Deployment

To deploy this application:

1. Push the repository to GitHub or any Git hosting provider.
2. Deploy to Vercel or another supported platform.
3. Add the required environment variables to the deployment environment.
4. Run the deployment and verify authentication flow and profile updates.

---

## Troubleshooting

### Profile Updates Not Applying

Possible reasons:

* Supabase session unavailable on the server route
* Incorrect environment variable configuration
* Missing or misconfigured `profiles` table

Resolution steps:

* Confirm environment variables match those from the Supabase dashboard
* Ensure the `profiles` table exists and uses the correct schema
* Check that authentication cookies or tokens are available during server-side requests

### Errors During Signup or Login

Common causes:

* Email authentication not enabled in Supabase
* Incorrect Supabase project keys
* Disabled email provider

Verify:

* Email provider is enabled under Supabase Authentication → Providers
* All environment variables are correctly set

---

## Notes

This codebase is intentionally minimal to allow for easy customization and extension. Additional fields, dashboards, or user settings can be integrated seamlessly using the same architecture.

---

If you need alternative versions of this README (e.g., with diagrams, API specs, architecture explanation), they can be provided on request.
