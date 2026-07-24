import { supabase } from '../lib/supabase';

/**
 * Submit a contact form message to Supabase.
 * @returns {{ data, error }}
 */
export async function submitContactMessage({ name, email, message }) {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([{ name, email, message }])
    .select()
    .single();

  return { data, error };
}

/**
 * Subscribe an email to the newsletter.
 * @returns {{ data, error }}
 */
export async function subscribeToNewsletter(email) {
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .insert([{ email }])
    .select()
    .single();

  return { data, error };
}

/**
 * Submit a booking inquiry.
 * @returns {{ data, error }}
 */
export async function submitBookingInquiry({
  fullName,
  email,
  phone,
  preferredDate,
  guests,
  notes,
}) {
  const { data, error } = await supabase
    .from('booking_inquiries')
    .insert([
      {
        full_name: fullName,
        email,
        phone,
        preferred_date: preferredDate,
        guests,
        notes,
      },
    ])
    .select()
    .single();

  return { data, error };
}
