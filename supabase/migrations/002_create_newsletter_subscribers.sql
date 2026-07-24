-- Migration: 002_create_newsletter_subscribers
-- Description: Stores newsletter email signups with unique constraint.
-- Created: 2026-07-24

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email       TEXT NOT NULL UNIQUE,
  subscribed  BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to subscribe
CREATE POLICY "anon_can_insert_newsletter_subscribers"
  ON newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated dashboard users can view subscribers
CREATE POLICY "authenticated_can_read_newsletter_subscribers"
  ON newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (true);

-- Index on email for duplicate checks
CREATE INDEX idx_newsletter_subscribers_email
  ON newsletter_subscribers (email);
