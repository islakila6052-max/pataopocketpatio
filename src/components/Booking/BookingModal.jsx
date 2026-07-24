import { useState } from 'react';
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

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const { error } = await submitBookingInquiry(form);

    if (error) {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
      return;
    }

    setStatus('success');
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
        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-[slideUp_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-primary-100 rounded-t-4xl">
          <h3 className="text-xl font-semibold text-primary-900 flex items-center gap-2">
            <Calendar size={22} strokeWidth={1.8} className="text-primary-600" />
            Book Your Visit
          </h3>
          <button
            onClick={close}
            className="w-9 h-9 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 hover:bg-primary-100 transition-colors cursor-pointer border-none"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
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
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" strokeWidth={1.8} />
                <Input
                  name="fullName"
                  placeholder="Full Name"
                  value={form.fullName}
                  onChange={handleChange}
                  className="!pl-11"
                  required
                />
              </div>

              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" strokeWidth={1.8} />
                <Input
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
                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" strokeWidth={1.8} />
                <Input
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
                  <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" strokeWidth={1.8} />
                  <Input
                    name="preferredDate"
                    type="date"
                    value={form.preferredDate}
                    onChange={handleChange}
                    className="!pl-11"
                  />
                </div>

                <div className="relative">
                  <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" strokeWidth={1.8} />
                  <Input
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

              <Textarea
                name="notes"
                rows={3}
                placeholder="Any special requests or notes..."
                value={form.notes}
                onChange={handleChange}
              />

              {status === 'error' && (
                <p className="text-red-600 text-sm font-medium">{errorMsg}</p>
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
