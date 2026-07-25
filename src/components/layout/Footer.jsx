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
      setMessage(error.code === '23505' ? 'You are already subscribed!' : 'Something went wrong. Try again.');
      setStatus('error');
      return;
    }
    setStatus('success');
    setMessage('Welcome to the sanctuary!');
    setEmail('');
  };

  return (
    <footer className="bg-primary-950 text-primary-200 pt-14 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="text-primary-100 font-semibold text-sm mb-3 flex items-center gap-2">
              <Leaf size={18} strokeWidth={1.8} className="text-primary-400" />
              {SITE_SHORT}
            </h4>
            <p className="text-primary-400/50 text-xs leading-relaxed">Nature Sanctuary &amp; Resort</p>
            <p className="text-primary-400/40 text-[11px] mt-3">{PHONE}</p>
            <p className="text-primary-400/40 text-[11px]">{EMAIL}</p>
          </div>
          <div>
            <h4 className="text-primary-100 font-semibold text-sm mb-3">Quick Links</h4>
            <ul className="space-y-1.5">
              {footerLinks.quick.map((link) => (
                <li key={link.label}>
                  <a href={link.href} onClick={(e) => handleScroll(e, link.href)} className="text-primary-400/50 text-xs hover:text-primary-300 transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-primary-100 font-semibold text-sm mb-3">Services</h4>
            <ul className="space-y-1.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a href={link.href} onClick={(e) => handleScroll(e, link.href)} className="text-primary-400/50 text-xs hover:text-primary-300 transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-primary-100 font-semibold text-sm mb-3">Newsletter</h4>
            <p className="text-primary-400/50 text-xs mb-3">Stay updated with our latest events and offers.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <Input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="!rounded-lg !border-none !bg-primary-900/50 !text-primary-100 placeholder:!text-primary-500 !text-xs !py-2.5" required />
              <Button type="submit" size="sm" disabled={status === 'loading'} className="w-full inline-flex items-center justify-center gap-1.5 !text-xs">
                {status === 'loading' && <Loader2 size={12} className="animate-spin" />}
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
            {message && (
              <p className={`text-[11px] mt-2 animate-[fadeIn_0.3s_ease-out] ${status === 'success' ? 'text-primary-300' : 'text-red-300'}`}>
                {message}
              </p>
            )}
          </div>
        </div>
        <div className="border-t border-primary-800/30 mt-8 pt-5 text-center text-primary-500/40 text-[11px]">
          &copy; {new Date().getFullYear()} {SITE_SHORT} &amp; Plant Sanctuary — all rights reserved.
        </div>
      </div>
    </footer>
  );
}
