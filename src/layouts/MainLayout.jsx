import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ScrollProgress from '../components/layout/ScrollProgress';
import FloatingButtons from '../components/layout/FloatingButtons';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import BookingModal from '../components/Booking/BookingModal';

export default function MainLayout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top, behavior: 'smooth' });
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return (
    <div>
      <ScrollProgress />
      <Navbar />
      <main className="overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
      <FloatingButtons />
      <BookingModal />
    </div>
  );
}
