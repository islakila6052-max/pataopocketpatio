import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastProvider } from './context/ToastContext';
import { BookingProvider } from './context/BookingContext';
import LoadingScreen from './components/LoadingScreen';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import GalleryPage from './pages/GalleryPage';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

export default function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <LoadingScreen onFinish={() => setLoading(false)} />;
  }

  return (
    <HelmetProvider>
      <ToastProvider>
        <BookingProvider>
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
        </BookingProvider>
      </ToastProvider>
    </HelmetProvider>
  );
}
