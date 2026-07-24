-- ============================================================
-- Patao Pocket Patio & Plant Sanctuary — Supabase Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. CONTACT FORM SUBMISSIONS
CREATE TABLE IF NOT EXISTS contact_messages (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  message     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public contact form)
CREATE POLICY "Allow public inserts on contact_messages"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users can read messages
CREATE POLICY "Allow authenticated reads on contact_messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);


-- 2. NEWSLETTER SUBSCRIBERS
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email       TEXT NOT NULL UNIQUE,
  subscribed  BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts on newsletter_subscribers"
  ON newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated reads on newsletter_subscribers"
  ON newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (true);


-- 3. BOOKING INQUIRIES
CREATE TABLE IF NOT EXISTS booking_inquiries (
  id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  full_name       TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT,
  preferred_date  DATE,
  guests          INT DEFAULT 1,
  notes           TEXT,
  status          TEXT DEFAULT 'pending',
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE booking_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts on booking_inquiries"
  ON booking_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated reads on booking_inquiries"
  ON booking_inquiries
  FOR SELECT
  TO authenticated
  USING (true);
