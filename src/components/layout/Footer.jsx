import { Leaf } from 'lucide-react';
import { SITE_SHORT, PHONE, EMAIL } from '../../constants/navigation';
import Input from '../ui/Input';
import Button from '../ui/Button';

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
 * Site footer — uses Lucide Leaf icon, no emojis.
 */
export default function Footer() {
  const handleScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="flex flex-col gap-3"
            >
              <Input
                type="email"
                placeholder="Your email"
                className="!rounded-full !border-none !bg-primary-800 !text-white placeholder:!text-primary-300"
              />
              <Button type="submit" size="sm" className="w-full">
                Subscribe
              </Button>
            </form>
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
