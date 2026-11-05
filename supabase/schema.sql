-- ============================================================
-- Patao Pocket Patio & Plant Sanctuary — Complete Schema
-- Combines all migrations into a single runnable script.
-- Open SQL Editor and paste: https://supabase.com/dashboard/project/ndmnhcmrkhbwpylxmfvd/sql/new
-- ============================================================

-- ==========================================
-- 001: Contact Messages
-- ==========================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  message     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_can_insert_contact_messages"
  ON contact_messages FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "authenticated_can_read_contact_messages"
  ON contact_messages FOR SELECT TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE INDEX idx_contact_messages_created_at
  ON contact_messages (created_at DESC);

-- ==========================================
-- 002: Newsletter Subscribers
-- ==========================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email       TEXT NOT NULL UNIQUE,
  subscribed  BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_can_insert_newsletter_subscribers"
  ON newsletter_subscribers FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "authenticated_can_read_newsletter_subscribers"
  ON newsletter_subscribers FOR SELECT TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE INDEX idx_newsletter_subscribers_email
  ON newsletter_subscribers (email);

-- ==========================================
-- 003: Booking Inquiries
-- ==========================================
CREATE TABLE IF NOT EXISTS booking_inquiries (
  id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  full_name       TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT,
  preferred_date  DATE,
  guests          INT DEFAULT 1,
  notes           TEXT,
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE booking_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_can_insert_booking_inquiries"
  ON booking_inquiries FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "authenticated_can_read_booking_inquiries"
  ON booking_inquiries FOR SELECT TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "admin_can_update_booking_status"
  ON booking_inquiries FOR UPDATE TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE INDEX idx_booking_inquiries_status ON booking_inquiries (status);
CREATE INDEX idx_booking_inquiries_created_at ON booking_inquiries (created_at DESC);

-- ==========================================
-- 004: Feedback & Analytics (Optional)
-- ==========================================
CREATE TABLE IF NOT EXISTS page_views (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  path        TEXT NOT NULL,
  referrer    TEXT,
  user_agent  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "authenticated_can_read_page_views"
  ON page_views FOR SELECT TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE TABLE IF NOT EXISTS reviews (
  id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  experience_id   INT NOT NULL,
  rating          INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  reviewer_name   TEXT NOT NULL,
  comment         TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_can_read_reviews"
  ON reviews FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "admin_can_insert_reviews"
  ON reviews FOR INSERT TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "admin_can_update_reviews"
  ON reviews FOR UPDATE TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE INDEX idx_reviews_experience_id ON reviews (experience_id);

REVOKE ALL ON TABLE
  contact_messages,
  newsletter_subscribers,
  booking_inquiries,
  page_views,
  reviews
FROM anon, authenticated;

GRANT INSERT (name, email, message) ON TABLE contact_messages TO anon;
GRANT INSERT (email) ON TABLE newsletter_subscribers TO anon;
GRANT INSERT (full_name, email, phone, preferred_date, guests, notes)
  ON TABLE booking_inquiries TO anon;

GRANT SELECT ON TABLE
  contact_messages,
  newsletter_subscribers,
  booking_inquiries,
  page_views,
  reviews
TO authenticated;

GRANT SELECT ON TABLE reviews TO anon;
GRANT UPDATE (status) ON TABLE booking_inquiries TO authenticated;
GRANT INSERT, UPDATE ON TABLE reviews TO authenticated;
