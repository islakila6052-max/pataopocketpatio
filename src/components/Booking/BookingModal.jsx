import { useEffect, useRef, useState } from 'react';
import { X, Calendar, Users, Phone, Mail, User, Loader2, CheckCircle } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { submitBookingInquiry } from '../../services/api';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';

/**
 * Booking modal — opens when "Book a Visit" is clicked anywhere on the site.
 * Submits to Supabase booking_inquiries table.
 */
export default function BookingModal() {
  const { isOpen, close } = useBooking();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredDate: '',
    guests: 2,
    notes: '',
  });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector('#booking-name')?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== 'Tab') return;
      const focusable = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) {
        event.preventDefault();
        dialogRef.current?.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const { error } = await submitBookingInquiry(form);
      if (error) {
        setStatus('error');
        setErrorMsg('Something went wrong. Please try again.');
        return;
      }

      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg('Unable to submit your booking right now. Please try again.');
    }
  };

  const reset = () => {
    setForm({ fullName: '', email: '', phone: '', preferredDate: '', guests: 2, notes: '' });
    setStatus('idle');
    close();
  };

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        tabIndex={-1}
        className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-[slideUp_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-4 sm:p-6 border-b border-black/5 rounded-t-xl">
          <h3 id="booking-modal-title" className="text-xl font-semibold text-primary-900 flex items-center gap-2">
            <Calendar size={22} strokeWidth={1.8} className="text-primary-600" />
            Book Your Visit
          </h3>
          <button
            onClick={close}
            aria-label="Close booking form"
            className="w-9 h-9 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 hover:bg-primary-100 transition-colors cursor-pointer border-none"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6">
          {status === 'success' ? (
            <div className="text-center py-8 animate-[fadeIn_0.4s_ease-out]">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-primary-600" strokeWidth={1.8} />
              </div>
              <h4 className="text-primary-900 font-semibold text-lg mb-2">Booking Received!</h4>
              <p className="text-primary-700/70 text-sm mb-6">
                We&rsquo;ll confirm your visit within 24 hours.
              </p>
              <Button onClick={reset}>Close</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <label htmlFor="booking-name" className="sr-only">Full name</label>
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" strokeWidth={1.8} />
                <Input
                  id="booking-name"
                  name="fullName"
                  placeholder="Full Name"
                  value={form.fullName}
                  onChange={handleChange}
                  className="!pl-11"
                  required
                />
              </div>

              <div className="relative">
                <label htmlFor="booking-email" className="sr-only">Email address</label>
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" strokeWidth={1.8} />
                <Input
                  id="booking-email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className="!pl-11"
                  required
                />
              </div>

              <div className="relative">
                <label htmlFor="booking-phone" className="sr-only">Phone number</label>
                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" strokeWidth={1.8} />
                <Input
                  id="booking-phone"
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  className="!pl-11"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label htmlFor="booking-date" className="sr-only">Preferred visit date</label>
                  <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" strokeWidth={1.8} />
                  <Input
                    id="booking-date"
                    name="preferredDate"
                    type="date"
                    value={form.preferredDate}
                    onChange={handleChange}
                    className="!pl-11"
                  />
                </div>

                <div className="relative">
                  <label htmlFor="booking-guests" className="sr-only">Number of guests</label>
                  <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" strokeWidth={1.8} />
                  <Input
                    id="booking-guests"
                    name="guests"
                    type="number"
                    min="1"
                    max="50"
                    placeholder="Guests"
                    value={form.guests}
                    onChange={handleChange}
                    className="!pl-11"
                  />
                </div>
              </div>

              <label htmlFor="booking-notes" className="sr-only">Special requests or notes</label>
              <Textarea
                id="booking-notes"
                name="notes"
                rows={3}
                placeholder="Any special requests or notes..."
                value={form.notes}
                onChange={handleChange}
              />

              {status === 'error' && (
                <p role="alert" className="text-red-600 text-sm font-medium">{errorMsg}</p>
              )}

              <Button
                type="submit"
                disabled={status === 'loading'}
                className="w-full inline-flex items-center justify-center gap-2"
              >
                {status === 'loading' && <Loader2 size={18} className="animate-spin" />}
                {status === 'loading' ? 'Submitting...' : 'Confirm Booking'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
