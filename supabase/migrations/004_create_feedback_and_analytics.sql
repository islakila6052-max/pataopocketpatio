-- Migration: 004_create_feedback_and_analytics
-- Description: Optional tables for user feedback and page analytics.
-- Created: 2026-07-24

-- Page view analytics (lightweight, anonymous)
CREATE TABLE IF NOT EXISTS page_views (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  path        TEXT NOT NULL,
  referrer    TEXT,
  user_agent  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_can_insert_page_views"
  ON page_views
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "authenticated_can_read_page_views"
  ON page_views
  FOR SELECT
  TO authenticated
  USING (true);

-- Star ratings & reviews for experiences
CREATE TABLE IF NOT EXISTS reviews (
  id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  experience_id   INT NOT NULL,
  rating          INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  reviewer_name   TEXT NOT NULL,
  comment         TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_can_insert_reviews"
  ON reviews
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "public_can_read_reviews"
  ON reviews
  FOR SELECT
  TO anon
  USING (true);

CREATE INDEX idx_reviews_experience_id
  ON reviews (experience_id);
