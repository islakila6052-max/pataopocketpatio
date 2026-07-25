import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollProgress from '../components/layout/ScrollProgress';
import FloatingButtons from '../components/layout/FloatingButtons';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import BookingModal from '../components/Booking/BookingModal';

export default function MainLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <ScrollProgress />
      <Navbar />
      <main className="overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
      <FloatingButtons />
      <BookingModal />
    </motion.div>
  );
}
