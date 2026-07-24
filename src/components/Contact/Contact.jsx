import { useState } from 'react';
import { MapPin, Phone, Mail, Loader2 } from 'lucide-react';
import { PHONE, EMAIL, ADDRESS } from '../../constants/navigation';
import SectionTitle from '../ui/SectionTitle';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import { submitContactMessage } from '../../services/api';

/**
 * Contact section — two-column layout with Supabase-powered form.
 */
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const { error } = await submitContactMessage(form);

    if (error) {
      setStatus('error');
      setErrorMsg(
        error.message === 'duplicate key value violates unique constraint'
          ? 'This email is already subscribed.'
          : 'Something went wrong. Please try again.'
      );
      return;
    }

    setStatus('success');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="bg-primary-50 section-padding">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14">
        {/* Contact Info */}
        <div>
          <SectionTitle>Get in Touch</SectionTitle>

          <div className="space-y-5 mt-6">
            <div className="flex items-center gap-4 text-primary-800">
              <div className="w-11 h-11 rounded-2xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-primary-700" strokeWidth={1.8} />
              </div>
              <span className="text-base font-medium">{ADDRESS}</span>
            </div>

            <div className="flex items-center gap-4 text-primary-800">
              <div className="w-11 h-11 rounded-2xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                <Phone size={20} className="text-primary-700" strokeWidth={1.8} />
              </div>
              <span className="text-base font-medium">{PHONE}</span>
            </div>

            <div className="flex items-center gap-4 text-primary-800">
              <div className="w-11 h-11 rounded-2xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                <Mail size={20} className="text-primary-700" strokeWidth={1.8} />
              </div>
              <span className="text-base font-medium">{EMAIL}</span>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="mt-8 rounded-4xl overflow-hidden border border-primary-200 shadow-card h-64 sm:h-72">
            <iframe
              title="Patao Pocket Location"
              src="https://www.google.com/maps?q=11.223741647405047,123.69582244191017&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=11.223741647405047,123.69582244191017"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-primary-700 hover:text-primary-900 transition-colors"
          >
            <MapPin size={16} strokeWidth={1.8} />
            Get Directions on Google Maps
          </a>
        </div>

        {/* Contact Form */}
        <div>
          <h3 className="text-2xl font-semibold text-primary-900 mb-6">
            Send a Message
          </h3>

          {status === 'success' ? (
            <div className="bg-primary-50 border border-primary-200 rounded-4xl p-8 text-center animate-[fadeIn_0.4s_ease-out]">
              <div className="w-14 h-14 rounded-full bg-primary-200 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-7 h-7 text-primary-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h4 className="text-primary-900 font-semibold text-lg mb-2">
                Message Sent!
              </h4>
              <p className="text-primary-700/70 text-sm mb-4">
                We&rsquo;ll get back to you within 24 hours.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStatus('idle')}
              >
                Send Another
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="name"
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <Input
                name="email"
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <Textarea
                name="message"
                rows={4}
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
              />

              {status === 'error' && (
                <p className="text-red-600 text-sm font-medium animate-[fadeIn_0.2s_ease-out]">
                  {errorMsg}
                </p>
              )}

              <Button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto inline-flex items-center gap-2"
              >
                {status === 'loading' && (
                  <Loader2 size={18} className="animate-spin" />
                )}
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
