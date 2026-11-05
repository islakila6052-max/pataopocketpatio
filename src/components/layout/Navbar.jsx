import { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import Button from '../ui/Button';
import { cn } from '../../utils/helpers';

const NAV_LINKS = [
  { to: '/#about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/#experiences', label: 'Experiences' },
  { to: '/#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open: openBooking } = useBooking();
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isGalleryPage = location.pathname === '/gallery';

  return (
    <nav className={cn('fixed top-0 left-0 w-full z-[1000] transition-all duration-300 ease-apple',
      scrolled || isGalleryPage || mobileOpen ? 'bg-[#faf9f3]/95 backdrop-blur-xl border-b border-primary-900/10 py-2.5' : 'bg-transparent py-3.5')}>
      <div className="container !overflow-visible relative flex items-center justify-between">
        <Link to="/" className={cn('flex items-center gap-2.5 transition-colors duration-200',
          scrolled || isGalleryPage || mobileOpen ? 'text-primary-900' : 'text-white')}>
          <span className={cn('flex h-10 w-10 items-center justify-center rounded-full border transition-colors',
            scrolled || isGalleryPage || mobileOpen ? 'border-primary-900/10 bg-primary-50 text-primary-700' : 'border-white/25 bg-white/10 text-white')}>
            <Leaf size={20} strokeWidth={1.8} />
          </span>
          <span>
            <span className="block text-sm sm:text-base font-semibold tracking-tight">Patao Pocket Patio</span>
            <span className={cn('hidden sm:block text-[9px] uppercase tracking-[0.2em]',
              scrolled || isGalleryPage || mobileOpen ? 'text-primary-700/60' : 'text-white/70')}>Botanical garden &amp; plant shop</span>
          </span>
        </Link>

        <button className="flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-1 md:hidden"
          onClick={() => setMobileOpen(prev => !prev)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}>
          {mobileOpen ? <X size={23} strokeWidth={1.8} className={scrolled || isGalleryPage || mobileOpen ? 'text-primary-900' : 'text-white'} /> : <>
            <span className={cn('block w-6 h-0.5 rounded transition-colors', scrolled || isGalleryPage || mobileOpen ? 'bg-primary-900' : 'bg-white')} />
            <span className={cn('block w-6 h-0.5 rounded transition-colors', scrolled || isGalleryPage || mobileOpen ? 'bg-primary-900' : 'bg-white')} />
            <span className={cn('block w-6 h-0.5 rounded transition-colors', scrolled || isGalleryPage || mobileOpen ? 'bg-primary-900' : 'bg-white')} />
          </>}
        </button>

        <ul className={cn('flex gap-6 items-center list-none font-medium text-sm max-md:hidden',
          mobileOpen && '!flex absolute top-[calc(100%+0.5rem)] left-4 right-4 flex-col gap-1 rounded-2xl border border-primary-900/10 bg-[#faf9f3] p-2 shadow-xl md:hidden')}>
          {NAV_LINKS.map((link) => {
            const isActive = link.to === '/gallery' ? isGalleryPage : false;
            const darkMode = scrolled || isGalleryPage || mobileOpen;
            return (
              <li key={link.to} className={mobileOpen ? 'w-full' : ''}>
                <Link to={link.to} onClick={() => setMobileOpen(false)}
                  className={mobileOpen
                    ? `block w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ${isActive ? 'text-primary-700 bg-primary-50' : 'text-neutral-700 hover:text-primary-700 hover:bg-primary-50'}`
                    : cn('relative text-[13px] font-medium transition-colors duration-200',
                      'after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-primary-500 after:transition-all after:duration-300 after:ease-apple',
                      isActive ? 'text-primary-700 after:w-full' : `${darkMode ? 'text-primary-800' : 'text-white/90'} after:w-0 hover:after:w-full`)}>
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li className={mobileOpen ? 'w-full px-2 pt-2 pb-2' : ''}>
            <Button size="sm" onClick={() => { setMobileOpen(false); openBooking(); }} className={mobileOpen ? 'w-full' : ''}>Book a Visit</Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
