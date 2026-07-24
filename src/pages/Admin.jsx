import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';

/**
 * Admin page — passcode gate then dashboard with bookings, messages, newsletter.
 */
export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return (
      <>
        <Helmet>
          <title>Admin — Patao Pocket</title>
        </Helmet>
        <AdminLogin onLogin={() => setLoggedIn(true)} />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard — Patao Pocket</title>
      </Helmet>
      <AdminDashboard onLogout={() => setLoggedIn(false)} />
    </>
  );
}
