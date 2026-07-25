import { Outlet } from 'react-router-dom';
import ScrollProgress from '../components/layout/ScrollProgress';
import FloatingButtons from '../components/layout/FloatingButtons';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import BookingModal from '../components/Booking/BookingModal';

/**
 * Root layout — nav, footer, floating buttons, and the global booking modal.
 */
export default function MainLayout() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
      <FloatingButtons />
      <BookingModal />
    </>
  );
}
