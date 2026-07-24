-- Migration: Fix RLS policies for all public tables
-- Ensures anonymous inserts work for contact form, newsletter, and bookings

-- ==========================================
-- Contact Messages
-- ==========================================
DROP POLICY IF EXISTS "Allow public inserts on contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow authenticated reads on contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "anon_can_insert_contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "authenticated_can_read_contact_messages" ON contact_messages;

CREATE POLICY "anon_insert_contact" ON contact_messages FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "auth_read_contact" ON contact_messages FOR SELECT TO authenticated USING (true);

-- ==========================================
-- Newsletter Subscribers
-- ==========================================
DROP POLICY IF EXISTS "Allow public inserts on newsletter_subscribers" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow authenticated reads on newsletter_subscribers" ON newsletter_subscribers;
DROP POLICY IF EXISTS "anon_can_insert_newsletter_subscribers" ON newsletter_subscribers;
DROP POLICY IF EXISTS "authenticated_can_read_newsletter_subscribers" ON newsletter_subscribers;

CREATE POLICY "anon_insert_newsletter" ON newsletter_subscribers FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "auth_read_newsletter" ON newsletter_subscribers FOR SELECT TO authenticated USING (true);

-- ==========================================
-- Booking Inquiries
-- ==========================================
DROP POLICY IF EXISTS "Allow public inserts on booking_inquiries" ON booking_inquiries;
DROP POLICY IF EXISTS "Allow authenticated reads on booking_inquiries" ON booking_inquiries;
DROP POLICY IF EXISTS "anon_can_insert_booking_inquiries" ON booking_inquiries;
DROP POLICY IF EXISTS "authenticated_can_read_booking_inquiries" ON booking_inquiries;

CREATE POLICY "anon_insert_booking" ON booking_inquiries FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "auth_read_booking" ON booking_inquiries FOR SELECT TO authenticated USING (true);

-- ==========================================
-- Page Views
-- ==========================================
DROP POLICY IF EXISTS "anon_can_insert_page_views" ON page_views;
DROP POLICY IF EXISTS "authenticated_can_read_page_views" ON page_views;

CREATE POLICY "anon_insert_pageviews" ON page_views FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "auth_read_pageviews" ON page_views FOR SELECT TO authenticated USING (true);

-- ==========================================
-- Reviews
-- ==========================================
DROP POLICY IF EXISTS "anon_can_insert_reviews" ON reviews;
DROP POLICY IF EXISTS "public_can_read_reviews" ON reviews;

CREATE POLICY "anon_insert_reviews" ON reviews FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "public_read_reviews" ON reviews FOR SELECT TO anon USING (true);
