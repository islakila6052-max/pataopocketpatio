-- Migration: 001_create_contact_messages
-- Description: Stores contact form submissions from the public site.
-- Created: 2026-07-24

CREATE TABLE IF NOT EXISTS contact_messages (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  message     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit a contact message
CREATE POLICY "anon_can_insert_contact_messages"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated dashboard users can view messages
CREATE POLICY "authenticated_can_read_contact_messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

-- Index for faster lookup by date
CREATE INDEX idx_contact_messages_created_at
  ON contact_messages (created_at DESC);
