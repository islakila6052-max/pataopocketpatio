import { useState } from 'react';
import { Lock, ArrowRight, Leaf } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const ADMIN_PASSCODE = 'patao2026';

/**
 * Mobile-friendly passcode gate for the admin panel.
 */
export default function AdminLogin({ onLogin }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === ADMIN_PASSCODE) {
      onLogin();
    } else {
      setError('Incorrect passcode');
      setCode('');
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f9f6] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 sm:p-8 w-full max-w-sm animate-[fadeIn_0.3s_ease-out]">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
            <Leaf size={30} className="text-primary-600" strokeWidth={1.8} />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Patao Pocket</h2>
          <p className="text-sm text-gray-500 mt-1">Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={1.8} />
            <Input
              type="password"
              placeholder="Enter passcode"
              value={code}
              onChange={(e) => { setCode(e.target.value); setError(''); }}
              className="!pl-11 !py-3"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-xl font-medium animate-[fadeIn_0.2s_ease-out]">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full inline-flex items-center justify-center gap-2 !py-3">
            Unlock Dashboard
            <ArrowRight size={18} />
          </Button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-5">
          Secure area — authorized personnel only
        </p>
      </div>
    </div>
  );
}
