import { useState } from 'react';
import { ArrowUp, Leaf, Loader2, Mail, MapPin, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SITE_SHORT, PHONE, EMAIL, ADDRESS } from '../../constants/navigation';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { subscribeToNewsletter } from '../../services/api';

const footerLinks = [
  { label: 'About the sanctuary', href: '#about' },
  { label: 'Plant collection', href: '/gallery' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Contact us', href: '#contact' },
];

export default function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleScroll = (e, href) => {
    e.preventDefault();
    if (window.location.pathname !== '/') {
      navigate(`/${href}`);
      window.setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
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
    <footer className="bg-primary-950 text-primary-200">
      <div className="container">
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 sm:gap-12 lg:grid-cols-12 lg:gap-14 lg:py-16">
          <div className="lg:col-span-5">
            <a href="/#home" className="mb-4 inline-flex items-center gap-3 text-primary-50">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-700/70 bg-primary-900 text-primary-300">
                <Leaf size={21} strokeWidth={1.7} />
              </span>
              <span className="font-semibold tracking-tight">{SITE_SHORT}</span>
            </a>
            <p className="max-w-sm text-sm leading-6 text-primary-200/70">
              A garden sanctuary for discovering tropical plants, slowing down, and spending time in nature.
            </p>
            <address className="mt-5 space-y-3 not-italic">
              <p className="flex items-start gap-3 text-sm text-primary-200/75">
                <MapPin size={17} className="mt-0.5 shrink-0 text-primary-400" />
                <span>{ADDRESS}</span>
              </p>
              <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="flex items-center gap-3 text-sm text-primary-200/75 transition-colors hover:text-white">
                <Phone size={16} className="shrink-0 text-primary-400" />
                <span>{PHONE}</span>
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-sm text-primary-200/75 transition-colors hover:text-white">
                <Mail size={16} className="shrink-0 text-primary-400" />
                <span>{EMAIL}</span>
              </a>
            </address>
          </div>

          <nav aria-label="Footer navigation" className="lg:col-span-3">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-primary-100">Explore</h2>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href.startsWith('#') ? `/${link.href}` : link.href}
                    onClick={(e) => link.href.startsWith('#') && handleScroll(e, link.href)}
                    className="text-sm text-primary-200/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary-100">Garden notes</h2>
            <p className="mb-5 max-w-sm text-sm leading-6 text-primary-200/70">
              Get occasional updates about garden events and seasonal highlights.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3 lg:flex-row">
              <label className="min-w-0 flex-1">
                <span className="sr-only">Email address</span>
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="!w-full !rounded-full !border-primary-700 !bg-primary-900/70 !px-4 !py-3 !text-sm !text-primary-50 placeholder:!text-primary-300/70"
                  required
                />
              </label>
              <Button type="submit" size="md" disabled={status === 'loading'} className="shrink-0 inline-flex items-center justify-center gap-2 !bg-primary-100 !border-primary-100 !text-primary-900 hover:!bg-white">
                {status === 'loading' && <Loader2 size={12} className="animate-spin" />}
                {status === 'loading' ? 'Joining...' : 'Sign up'}
              </Button>
            </form>
            {message && (
              <p role="status" className={`mt-3 text-sm ${status === 'success' ? 'text-primary-300' : 'text-red-300'}`}>
                {message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-primary-800/50 py-5 text-xs text-primary-300/70 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {SITE_SHORT}. All rights reserved.</p>
          <a href="/#home" className="inline-flex items-center gap-2 transition-colors hover:text-white">
            Back to top <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
