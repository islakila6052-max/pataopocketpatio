import { supabase } from '../lib/supabase';

/**
 * Submit a contact form message to Supabase.
 * @returns {{ error }}
 */
export async function submitContactMessage({ name, email, message }) {
  const { error } = await supabase
    .from('contact_messages')
    .insert([{ name, email, message }]);

  return { error };
}

/**
 * Subscribe an email to the newsletter.
 * @returns {{ error }}
 */
export async function subscribeToNewsletter(email) {
  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert([{ email }]);

  return { error };
}

/**
 * Submit a booking inquiry.
 * @returns {{ error }}
 */
export async function submitBookingInquiry({
  fullName,
  email,
  phone,
  preferredDate,
  guests,
  notes,
}) {
  const { error } = await supabase
    .from('booking_inquiries')
    .insert([
      {
        full_name: fullName,
        email,
        phone,
        preferred_date: preferredDate || null,
        guests,
        notes,
      },
    ]);

  return { error };
}
