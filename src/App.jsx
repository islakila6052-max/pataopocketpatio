import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastProvider } from './context/ToastContext';
import { BookingProvider } from './context/BookingContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

/**
 * Root application — routes, providers, booking context.
 */
export default function App() {
  return (
    <HelmetProvider>
      <ToastProvider>
        <BookingProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route index element={<Home />} />
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
