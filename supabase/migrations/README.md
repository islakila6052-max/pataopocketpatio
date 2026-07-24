# Supabase Migrations

Migrations are numbered sequentially. Run them in order.

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

## CLI (Alternative)

If you have the Supabase CLI installed:

```bash
supabase link --project-ref ndmnhcmrkhbwpylxmfvd
supabase db push
```

## Verify

After applying, check your tables at:
https://supabase.com/dashboard/project/ndmnhcmrkhbwpylxmfvd/editor
