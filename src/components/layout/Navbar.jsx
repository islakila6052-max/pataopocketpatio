import { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import Button from '../ui/Button';
import { cn } from '../../utils/helpers';

const NAV_LINKS = [
  { href: '/#about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/#resort', label: 'Resort' },
  { href: '/#experiences', label: 'Experiences' },
  { href: '/#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open: openBooking } = useBooking();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isGalleryPage = location.pathname === '/gallery';

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '#');
      const target = document.querySelector(id);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={cn('fixed top-0 left-0 w-full z-[1000] transition-all duration-300 ease-apple',
      scrolled || isGalleryPage ? 'bg-white/85 backdrop-blur-xl border-b border-black/5 py-2.5' : 'bg-transparent py-3.5')}>
      <div className="container flex items-center justify-between">
        <Link to="/" className={cn('flex items-center gap-2 text-base sm:text-lg font-bold tracking-tight transition-colors duration-200',
          scrolled || isGalleryPage ? 'text-primary-900' : 'text-white')}>
          <Leaf size={22} strokeWidth={1.8} className={cn('transition-colors', scrolled || isGalleryPage ? 'text-primary-600' : 'text-white')} />
          <span>Patao Pocket Patio &amp; PS</span>
        </Link>

        <button className="flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-1 md:hidden"
          onClick={() => setMobileOpen(prev => !prev)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}>
          {mobileOpen ? <X size={24} strokeWidth={2} className={scrolled || isGalleryPage ? 'text-primary-900' : 'text-white'} /> : <>
            <span className={cn('block w-6 h-0.5 rounded transition-colors', scrolled || isGalleryPage ? 'bg-primary-900' : 'bg-white')} />
            <span className={cn('block w-6 h-0.5 rounded transition-colors', scrolled || isGalleryPage ? 'bg-primary-900' : 'bg-white')} />
            <span className={cn('block w-6 h-0.5 rounded transition-colors', scrolled || isGalleryPage ? 'bg-primary-900' : 'bg-white')} />
          </>}
        </button>

        <ul className={cn('flex gap-6 items-center list-none font-medium text-sm max-md:hidden',
          mobileOpen && '!flex flex-col w-full bg-white shadow-xl rounded-xl mt-2 p-2 gap-0 border border-black/5 overflow-hidden')}>
          {NAV_LINKS.map((link) => {
            const isActive = link.href === '/gallery' ? isGalleryPage : false;
            const darkMode = scrolled || isGalleryPage;
            return (
              <li key={link.href} className={mobileOpen ? 'w-full' : ''}>
                {link.href === '/gallery' ? (
                  <Link to={link.href} onClick={() => setMobileOpen(false)}
                    className={mobileOpen
                      ? `block w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ${isActive ? 'text-primary-700 bg-primary-50' : 'text-neutral-700 hover:text-primary-700 hover:bg-primary-50'}`
                      : cn('relative text-[13px] font-medium transition-colors duration-200',
                        'after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-primary-500 after:transition-all after:duration-300 after:ease-apple',
                        isActive ? 'text-primary-700 after:w-full' : `${darkMode ? 'text-primary-800' : 'text-white/90'} after:w-0 hover:after:w-full`)}>
                    {link.label}
                  </Link>
                ) : (
                  <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}
                    className={mobileOpen
                      ? 'block w-full px-4 py-3 text-sm font-medium text-neutral-700 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors duration-150'
                      : cn('relative text-[13px] font-medium transition-colors duration-200',
                        'after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-primary-500 after:transition-all after:duration-300 after:ease-apple after:w-0 hover:after:w-full',
                        darkMode ? 'text-primary-800' : 'text-white/90')}>
                    {link.label}
                  </a>
                )}
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
