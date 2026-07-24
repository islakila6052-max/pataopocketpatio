import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

/**
 * Single floating WhatsApp button with subtle pulse + tooltip.
 * Clean, practical — no clutter.
 */
export default function FloatingButtons() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-5 sm:right-6 z-[600] flex flex-col items-end gap-2">
      {/* Tooltip */}
      {showTooltip && (
        <div className="bg-gray-900/90 text-white text-xs font-medium px-4 py-2 rounded-2xl shadow-lg animate-[fadeIn_0.3s_ease-out] flex items-center gap-2 backdrop-blur-sm">
          <span>Chat with us!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-white/60 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
            aria-label="Dismiss"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/639123456789"
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:scale-105 active:scale-95 transition-all duration-200"
        aria-label="Chat on WhatsApp"
        onClick={() => setShowTooltip(false)}
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-2xl bg-[#25D366] animate-ping opacity-20" />
        <MessageCircle size={26} strokeWidth={2} className="relative z-10" />
      </a>
    </div>
  );
}
