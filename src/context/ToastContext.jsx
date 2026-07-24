import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';
import { cn } from '../utils/helpers';

const ToastContext = createContext(null);

/**
 * Global toast notification provider.
 * Usage: const { toast } = useToast(); toast.success('Message sent!');
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((type, message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const toast = {
    success: (msg) => addToast('success', msg),
    error: (msg) => addToast('error', msg),
  };

  const dismiss = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-lg backdrop-blur-xl text-sm font-medium animate-[slideUp_0.3s_ease-out]',
              t.type === 'success'
                ? 'bg-primary-900/90 text-white'
                : 'bg-red-600/90 text-white'
            )}
          >
            {t.type === 'success' ? (
              <CheckCircle size={18} strokeWidth={2} />
            ) : (
              <XCircle size={18} strokeWidth={2} />
            )}
            <span className="flex-1">{t.message}</span>
            <button
              onClick={() => dismiss(t.id)}
              className="ml-2 opacity-60 hover:opacity-100 transition-opacity bg-transparent border-none cursor-pointer text-white"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
