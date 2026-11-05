# Supabase Migrations

Migrations are numbered sequentially. Run them in order. Migration 006 is a
legacy change that disabled row-level security; migration 007 deliberately
re-enables it and must be applied before the admin panel or public forms are
considered production-ready.

## Quick Apply (All at Once)

1. Open [Supabase SQL Editor](https://supabase.com/dashboard/project/ndmnhcmrkhbwpylxmfvd/sql/new)
2. Paste the entire contents of `schema.sql` (the combined file)
3. Click **Run**

## Apply Individually

Run each migration file in numeric order:

| # | File | Tables Created |
|---|------|---------------|
| 001 | `001_create_contact_messages.sql` | `contact_messages` |
| 002 | `002_create_newsletter_subscribers.sql` | `newsletter_subscribers` |
| 003 | `003_create_booking_inquiries.sql` | `booking_inquiries` |
| 004 | `004_create_feedback_and_analytics.sql` | `page_views`, `reviews` |
| 005 | `005_fix_rls_policies.sql` | Legacy access policies |
| 006 | `006_disable_rls.sql` | Legacy RLS disablement (reversed by 007) |
| 007 | `007_secure_admin_access.sql` | Admin-only private reads and secure public inserts |

## Admin setup

1. Apply migration 007 after the earlier migrations. It removes older
   permissive policies, enables RLS, and permits anonymous users to insert
   public form submissions without reading the submitted records.
2. Create the administrator as a Supabase Auth user.
3. Assign `app_metadata.role = "admin"` to that user using the Supabase
   Dashboard or a trusted server using the Auth Admin API. Never set this role
   from the browser or expose a service-role key to the frontend.
4. Configure the frontend Supabase URL and anon key in its deployment
   environment. The admin signs in with their Auth email and password.

The combined `supabase/schema.sql` also contains the secure policy and grant
definitions for a fresh database. Do not apply it over an existing production
database; use the numbered migrations there.

## CLI (Alternative)

If you have the Supabase CLI installed:

```bash
supabase link --project-ref ndmnhcmrkhbwpylxmfvd
supabase db push
```

## Verify

After applying, verify the tables and policies in the Supabase Dashboard:
https://supabase.com/dashboard/project/ndmnhcmrkhbwpylxmfvd/editor
