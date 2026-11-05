import { useState } from 'react';
import { ArrowRight, Leaf, Loader2, Lock, Mail } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { supabase } from '../../lib/supabase';

/**
 * Admin access is managed through Supabase Auth and a server-assigned app role.
 */
export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError('Unable to sign in. Check your email and password, then try again.');
        return;
      }

      if (data.user?.app_metadata?.role !== 'admin') {
        const { error: signOutError } = await supabase.auth.signOut();
        if (signOutError) {
          setError('This account does not have admin access. Please sign out and contact the site administrator.');
          return;
        }
        setError('This account does not have admin access.');
        return;
      }

      onLogin(data.user);
    } catch {
      setError('Unable to reach the sign-in service. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f9f6] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 sm:p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
            <Leaf size={30} className="text-primary-600" strokeWidth={1.8} />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Patao Pocket</h2>
          <p className="text-sm text-gray-500 mt-1">Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label htmlFor="admin-email" className="sr-only">Admin email</label>
            <Mail size={18} aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={1.8} />
            <Input
              id="admin-email"
              type="email"
              placeholder="Admin email"
              value={email}
              onChange={(event) => { setEmail(event.target.value); setError(''); }}
              className="!pl-11 !py-3"
              autoComplete="username"
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="admin-password" className="sr-only">Password</label>
            <Lock size={18} aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={1.8} />
            <Input
              id="admin-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => { setPassword(event.target.value); setError(''); }}
              className="!pl-11 !py-3"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p role="alert" className="text-red-700 text-sm text-center bg-red-50 py-2 px-3 rounded-xl font-medium">
              {error}
            </p>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full inline-flex items-center justify-center gap-2 !py-3">
            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-5">
          Authorized administrators only
        </p>
      </div>
    </div>
  );
}
