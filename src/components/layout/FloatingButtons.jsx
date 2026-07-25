import { MessageCircle } from 'lucide-react';

/**
 * Single floating Messenger button — clean, round, no animations.
 */
export default function FloatingButtons() {
  return (
    <a
      href="https://m.me/pataosanctuary"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-5 sm:right-6 z-[600] w-14 h-14 rounded-full bg-[#0084ff] text-white flex items-center justify-center shadow-lg shadow-[#0084ff]/25 hover:scale-105 active:scale-95 transition-transform duration-200"
      aria-label="Chat on Messenger"
    >
      <MessageCircle size={26} strokeWidth={2} />
    </a>
  );
}
