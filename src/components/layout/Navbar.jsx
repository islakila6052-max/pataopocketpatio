import { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { NAV_LINKS, SITE_SHORT } from '../../constants/navigation';
import { useBooking } from '../../context/BookingContext';
import Button from '../ui/Button';
import { cn } from '../../utils/helpers';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open: openBooking } = useBooking();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-[1000] transition-all duration-300 ease-apple',
        scrolled
          ? 'bg-white/85 backdrop-blur-xl border-b border-black/5 py-2.5'
          : 'bg-transparent py-3.5'
      )}
    >
      <div className="container flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className={cn(
            'flex items-center gap-2 text-base sm:text-lg font-bold tracking-tight transition-colors duration-200',
            scrolled ? 'text-primary-900' : 'text-white'
          )}
        >
          <Leaf size={22} strokeWidth={1.8} className={cn('transition-colors', scrolled ? 'text-primary-600' : 'text-white')} />
          <span>{SITE_SHORT}</span>
        </a>

        <button
          className="flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-1 md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X size={24} strokeWidth={2} className={scrolled ? 'text-primary-900' : 'text-white'} />
          ) : (
            <>
              <span className={cn('block w-6 h-0.5 rounded transition-colors', scrolled ? 'bg-primary-900' : 'bg-white')} />
              <span className={cn('block w-6 h-0.5 rounded transition-colors', scrolled ? 'bg-primary-900' : 'bg-white')} />
              <span className={cn('block w-6 h-0.5 rounded transition-colors', scrolled ? 'bg-primary-900' : 'bg-white')} />
            </>
          )}
        </button>

        <ul
          className={cn(
            'flex gap-6 items-center list-none font-medium text-sm',
            'max-md:hidden',
            mobileOpen && '!flex flex-col w-full bg-white/95 backdrop-blur-xl p-4 rounded-xl mt-3 border border-black/5 md:hidden'
          )}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  'relative text-[13px] font-medium transition-colors duration-200',
                  'after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-primary-500 after:transition-all after:duration-300 after:ease-apple',
                  'after:w-0 hover:after:w-full',
                  scrolled ? 'text-primary-800' : 'text-white/90'
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Button size="sm" onClick={() => { setMobileOpen(false); openBooking(); }}>
              Book a Visit
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
