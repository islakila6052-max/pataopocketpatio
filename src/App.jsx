import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MotionConfig } from 'framer-motion';
import { ToastProvider } from './context/ToastContext';
import { BookingProvider } from './context/BookingContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import GalleryPage from './pages/GalleryPage';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <HelmetProvider>
      <ToastProvider>
        <BookingProvider>
          <MotionConfig reducedMotion="user">
            <BrowserRouter>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route index element={<Home />} />
                  <Route path="gallery" element={<GalleryPage />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </BrowserRouter>
          </MotionConfig>
        </BookingProvider>
      </ToastProvider>
    </HelmetProvider>
  );
}
