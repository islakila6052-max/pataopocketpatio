-- Migration: 003_create_booking_inquiries
-- Description: Stores visit booking requests with status tracking.
-- Created: 2026-07-24

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

-- Enable RLS
ALTER TABLE booking_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit a booking inquiry
CREATE POLICY "anon_can_insert_booking_inquiries"
  ON booking_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated dashboard users can view/manage bookings
CREATE POLICY "authenticated_can_read_booking_inquiries"
  ON booking_inquiries
  FOR SELECT
  TO authenticated
  USING (true);

-- Indexes for common queries
CREATE INDEX idx_booking_inquiries_status
  ON booking_inquiries (status);

CREATE INDEX idx_booking_inquiries_created_at
  ON booking_inquiries (created_at DESC);
