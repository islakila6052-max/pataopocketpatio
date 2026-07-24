import { Outlet } from 'react-router-dom';
import ScrollProgress from '../components/layout/ScrollProgress';
import BackToTop from '../components/layout/BackToTop';
import FloatingButtons from '../components/layout/FloatingButtons';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';

/**
 * Root layout wrapping all pages with persistent UI: Navbar, Footer, floating buttons.
 */
export default function MainLayout() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <FloatingButtons />
    </>
  );
}
