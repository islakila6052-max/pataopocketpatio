import { MessageCircle } from 'lucide-react';

/**
 * Subtle floating Messenger button — fades in only on hover,
 * otherwise blends into the background so it doesn't obstruct content.
 */
export default function FloatingButtons() {
  return (
    <a
      href="https://m.me/pataosanctuary"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-4 sm:right-5 z-[600] w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/60 flex items-center justify-center shadow-none hover:bg-white/20 hover:text-white hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
      aria-label="Chat on Messenger"
    >
      <MessageCircle size={18} strokeWidth={1.8} />
    </a>
  );
}
