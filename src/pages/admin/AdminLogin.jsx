import { useState } from 'react';
import { Lock, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const ADMIN_PASSCODE = 'patao2026';

/**
 * Simple passcode gate for the admin panel.
 */
export default function AdminLogin({ onLogin }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === ADMIN_PASSCODE) {
      onLogin();
    } else {
      setError('Invalid passcode');
      setCode('');
    }
  };

  return (
    <div className="min-h-screen bg-primary-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-4xl shadow-xl p-8 w-full max-w-sm animate-[fadeIn_0.3s_ease-out]">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-primary-700" strokeWidth={1.8} />
          </div>
          <h2 className="text-xl font-semibold text-primary-900">Admin Panel</h2>
          <p className="text-sm text-primary-600 mt-1">Enter passcode to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Passcode"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(''); }}
            autoFocus
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <Button type="submit" className="w-full inline-flex items-center justify-center gap-2">
            Unlock <ArrowRight size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
}
