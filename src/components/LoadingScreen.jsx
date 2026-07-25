import { useEffect, useState } from 'react';
import { Leaf } from 'lucide-react';

export default function LoadingScreen({ onFinish }) {
  const [phase, setPhase] = useState('enter');

  useEffect(() => {
    const enterTimer = setTimeout(() => setPhase('exit'), 1500);
    const exitTimer = setTimeout(() => {
      setPhase('gone');
      onFinish?.();
    }, 2200);
    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
    };
  }, [onFinish]);

  if (phase === 'gone') return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-gradient-to-b from-primary-900 via-primary-800 to-primary-950 transition-opacity duration-700 ${
        phase === 'exit' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
          <Leaf size={40} strokeWidth={1.5} className="text-primary-300" />
        </div>
        <div className="absolute inset-0 rounded-2xl border border-primary-400/20 animate-ping opacity-40" />
      </div>
      <h1 className="text-white text-xl font-semibold tracking-tight mb-1">
        Patao Pocket
      </h1>
      <p className="text-primary-300/60 text-sm font-light">
        Nature Sanctuary &amp; Resort
      </p>
      <div className="mt-8 w-48 h-1 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full w-full bg-primary-400 rounded-full animate-[loadingBar_1.5s_ease-in-out]" />
      </div>
    </div>
  );
}
