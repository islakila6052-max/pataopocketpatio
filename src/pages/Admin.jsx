import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import { supabase } from '../lib/supabase';

const isAdmin = (user) => user?.app_metadata?.role === 'admin';

/**
 * Admin access is granted only to authenticated users with a server-managed role.
 */
export default function Admin() {
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return;
      if (error) {
        setAuthError('Could not verify your admin session. Please try signing in again.');
      } else if (isAdmin(data.session?.user)) {
        setUser(data.session.user);
      }
      setCheckingSession(false);
    }).catch(() => {
      if (!active) return;
      setAuthError('Could not verify your admin session. Please try signing in again.');
      setCheckingSession(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setUser(isAdmin(session?.user) ? session.user : null);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setAuthError('');
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f9f6]" role="status">
        <span className="text-sm text-gray-600">Checking admin session...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>Admin — Patao Pocket</title>
        </Helmet>
        <div>
          {authError && (
            <p role="alert" className="fixed top-4 left-4 right-4 z-10 mx-auto max-w-sm rounded-xl bg-red-50 p-3 text-center text-sm text-red-700">
              {authError}
            </p>
          )}
          <AdminLogin onLogin={(authenticatedUser) => {
            setAuthError('');
            setUser(authenticatedUser);
          }} />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard — Patao Pocket</title>
      </Helmet>
      <AdminDashboard onLogout={handleLogout} />
    </>
  );
}
