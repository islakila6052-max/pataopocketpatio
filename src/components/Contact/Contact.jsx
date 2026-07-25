import { useState } from 'react';
import { MapPin, Phone, Mail, Loader2 } from 'lucide-react';
import { PHONE, EMAIL, ADDRESS } from '../../constants/navigation';
import SectionTitle from '../ui/SectionTitle';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import { submitContactMessage } from '../../services/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    const { error } = await submitContactMessage(form);
    if (error) {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
      return;
    }
    setStatus('success');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="bg-primary-50/70 section-padding">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        <div>
          <SectionTitle>Get in Touch</SectionTitle>
          <div className="space-y-4 mt-4">
            {[
              { icon: MapPin, text: ADDRESS },
              { icon: Phone, text: PHONE },
              { icon: Mail, text: EMAIL },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-primary-700">
                <div className="w-9 h-9 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-primary-600" strokeWidth={1.8} />
                </div>
                <span className="text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl overflow-hidden border border-black/5 shadow-card h-56 sm:h-64">
            <iframe
              title="Patao Pocket Location"
              src="https://www.google.com/maps?q=11.223741647405047,123.69582244191017&z=16&output=embed"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=11.223741647405047,123.69582244191017"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium text-primary-600 hover:text-primary-800 transition-colors duration-200"
          >
            <MapPin size={14} strokeWidth={1.8} />Get Directions
          </a>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-primary-900 mb-5 tracking-tight">Send a Message</h3>
          {status === 'success' ? (
            <div className="bg-primary-50 border border-primary-100 rounded-xl p-6 sm:p-8 text-center animate-[fadeIn_0.4s_ease-out]">
              <div className="w-12 h-12 rounded-full bg-primary-200 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-primary-900 font-semibold mb-1">Message Sent!</h4>
              <p className="text-primary-600/60 text-sm mb-4">We&rsquo;ll get back to you within 24 hours.</p>
              <Button variant="outline" size="sm" onClick={() => setStatus('idle')}>Send Another</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input name="name" type="text" placeholder="Your Name" value={form.name} onChange={handleChange} required />
              <Input name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
              <Textarea name="message" rows={4} placeholder="Your Message" value={form.message} onChange={handleChange} required />
              {status === 'error' && <p className="text-red-500 text-xs font-medium">{errorMsg}</p>}
              <Button type="submit" disabled={status === 'loading'} className="w-full sm:w-auto inline-flex items-center gap-2">
                {status === 'loading' && <Loader2 size={16} className="animate-spin" />}
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
