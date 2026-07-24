import { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { NAV_LINKS, SITE_SHORT } from '../../constants/navigation';
import { useBooking } from '../../context/BookingContext';
import Button from '../ui/Button';
import { cn } from '../../utils/helpers';

/**
 * Fixed navbar with glassmorphism on scroll, mobile hamburger menu,
 * and smooth-scroll anchor links. Uses Lucide icons — no emojis.
 */
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
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-[1000] transition-all duration-300',
        scrolled
          ? 'bg-white/78 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,20,0,0.06)] py-3'
          : 'bg-transparent py-[18px]'
      )}
    >
      <div className="container flex items-center justify-between flex-wrap">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className={cn(
            'flex items-center gap-2 text-xl font-bold tracking-tight transition-colors',
            scrolled ? 'text-primary-900' : 'text-white'
          )}
        >
          <Leaf
            size={26}
            strokeWidth={1.8}
            className={cn(
              'transition-colors',
              scrolled ? 'text-primary-700' : 'text-white'
            )}
          />
          <span>{SITE_SHORT}</span>
          <span className="font-light hidden sm:inline text-base">
            &amp; Plant Sanctuary
          </span>
        </a>

        {/* Hamburger */}
        <button
          className="flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-1 md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X
              size={28}
              strokeWidth={2}
              className={scrolled ? 'text-primary-900' : 'text-white'}
            />
          ) : (
            <>
              <span
                className={cn(
                  'block w-7 h-0.5 rounded transition-colors',
                  scrolled ? 'bg-primary-900' : 'bg-white'
                )}
              />
              <span
                className={cn(
                  'block w-7 h-0.5 rounded transition-colors',
                  scrolled ? 'bg-primary-900' : 'bg-white'
                )}
              />
              <span
                className={cn(
                  'block w-7 h-0.5 rounded transition-colors',
                  scrolled ? 'bg-primary-900' : 'bg-white'
                )}
              />
            </>
          )}
        </button>

        {/* Nav Links */}
        <ul
          className={cn(
            'flex gap-8 items-center list-none font-medium',
            'max-md:hidden',
            mobileOpen &&
              '!flex flex-col w-full bg-white/92 backdrop-blur-xl p-5 rounded-4xl mt-4 md:hidden'
          )}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  'text-[0.95rem] relative transition-colors hover:text-primary-200',
                  scrolled
                    ? 'text-primary-950 hover:!text-primary-700'
                    : 'text-white'
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
