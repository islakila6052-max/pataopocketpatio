import { useState } from 'react';
import { Leaf, Loader2 } from 'lucide-react';
import { SITE_SHORT, PHONE, EMAIL } from '../../constants/navigation';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { subscribeToNewsletter } from '../../services/api';

const footerLinks = {
  quick: [
    { label: 'About', href: '#about' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Resort', href: '#resort' },
  ],
  services: [
    { label: 'Botanical Tours', href: '#experiences' },
    { label: 'Pool & Spa', href: '#resort' },
    { label: 'Café', href: '#experiences' },
    { label: 'Events', href: '#contact' },
  ],
};

/**
 * Site footer with Supabase-powered newsletter signup.
 */
export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage('');

    const { error } = await subscribeToNewsletter(email);

    if (error) {
      if (error.code === '23505') {
        setMessage('You are already subscribed! 🌿');
      } else {
        setMessage('Something went wrong. Try again.');
      }
      setStatus('error');
      return;
    }

    setStatus('success');
    setMessage('Welcome to the sanctuary! 🌿');
    setEmail('');
  };

  return (
    <footer className="bg-primary-900 text-primary-100 pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h4 className="text-primary-200 font-semibold text-lg mb-4 flex items-center gap-2">
              <Leaf size={22} strokeWidth={1.8} className="text-primary-300" />
              {SITE_SHORT}
            </h4>
            <p className="text-primary-200/70 text-sm leading-relaxed">
              Nature Sanctuary &amp; Resort
            </p>
            <p className="text-primary-200/50 text-xs mt-3">{PHONE}</p>
            <p className="text-primary-200/50 text-xs">{EMAIL}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-primary-200 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.quick.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="text-primary-200/70 text-sm hover:text-primary-200 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-primary-200 font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="text-primary-200/70 text-sm hover:text-primary-200 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-primary-200 font-semibold mb-4">Newsletter</h4>
            <p className="text-primary-200/70 text-sm mb-4">
              Stay updated with our latest events and offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="!rounded-full !border-none !bg-primary-800 !text-white placeholder:!text-primary-300"
                required
              />
              <Button
                type="submit"
                size="sm"
                disabled={status === 'loading'}
                className="w-full inline-flex items-center justify-center gap-2"
              >
                {status === 'loading' && (
                  <Loader2 size={16} className="animate-spin" />
                )}
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
            {message && (
              <p
                className={`text-xs mt-3 animate-[fadeIn_0.3s_ease-out] ${
                  status === 'success'
                    ? 'text-primary-300'
                    : 'text-red-300'
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-700/50 mt-10 pt-6 text-center text-primary-300/60 text-sm">
          &copy; {new Date().getFullYear()} {SITE_SHORT} &amp; Plant Sanctuary —
          all rights reserved.
        </div>
      </div>
    </footer>
  );
}
