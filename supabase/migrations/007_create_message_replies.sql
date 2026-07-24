-- Migration: 007_create_message_replies
-- Description: Adds reply support to contact messages for admin-user conversation threads.
-- Created: 2026-07-25

CREATE TABLE IF NOT EXISTS message_replies (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  message_id  BIGINT NOT NULL REFERENCES contact_messages(id) ON DELETE CASCADE,
  reply       TEXT NOT NULL,
  is_admin    BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE message_replies ENABLE ROW LEVEL SECURITY;

-- Anyone can read replies (to view conversation)
CREATE POLICY "public_can_read_replies"
  ON message_replies
  FOR SELECT
  TO anon
  USING (true);

-- Only authenticated (admin) can insert replies
CREATE POLICY "authenticated_can_insert_replies"
  ON message_replies
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE INDEX idx_message_replies_message_id
  ON message_replies (message_id);
