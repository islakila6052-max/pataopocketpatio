-- Restrict private records to users whose server-managed app_metadata role is admin.
-- Public visitors may only insert booking, contact, and newsletter requests.
-- Set app_metadata.role = 'admin' using the Supabase Admin API, never from the browser.

DO $$
DECLARE
  existing_policy RECORD;
BEGIN
  FOR existing_policy IN
    SELECT schemaname, tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN (
        'booking_inquiries',
        'contact_messages',
        'newsletter_subscribers',
        'page_views',
        'reviews'
      )
  LOOP
    EXECUTE format(
      'DROP POLICY %I ON %I.%I',
      existing_policy.policyname,
      existing_policy.schemaname,
      existing_policy.tablename
    );
  END LOOP;
END
$$;

ALTER TABLE public.booking_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE
  public.booking_inquiries,
  public.contact_messages,
  public.newsletter_subscribers,
  public.page_views,
  public.reviews
FROM anon, authenticated;

GRANT INSERT (full_name, email, phone, preferred_date, guests, notes)
  ON TABLE public.booking_inquiries TO anon;
GRANT INSERT (name, email, message)
  ON TABLE public.contact_messages TO anon;
GRANT INSERT (email)
  ON TABLE public.newsletter_subscribers TO anon;

GRANT SELECT ON TABLE
  public.booking_inquiries,
  public.contact_messages,
  public.newsletter_subscribers,
  public.page_views,
  public.reviews
TO authenticated;

GRANT SELECT ON TABLE public.reviews TO anon;
GRANT UPDATE (status) ON TABLE public.booking_inquiries TO authenticated;
GRANT INSERT ON TABLE public.reviews TO authenticated;

CREATE POLICY "public_insert_booking_inquiries"
  ON public.booking_inquiries
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "admin_read_booking_inquiries"
  ON public.booking_inquiries
  FOR SELECT TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "admin_update_booking_status"
  ON public.booking_inquiries
  FOR UPDATE TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "public_insert_contact_messages"
  ON public.contact_messages
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "admin_read_contact_messages"
  ON public.contact_messages
  FOR SELECT TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "public_insert_newsletter_subscribers"
  ON public.newsletter_subscribers
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "admin_read_newsletter_subscribers"
  ON public.newsletter_subscribers
  FOR SELECT TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "admin_read_page_views"
  ON public.page_views
  FOR SELECT TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "public_read_reviews"
  ON public.reviews
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "admin_manage_reviews"
  ON public.reviews
  FOR INSERT TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "admin_read_all_reviews"
  ON public.reviews
  FOR SELECT TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "admin_update_reviews"
  ON public.reviews
  FOR UPDATE TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
