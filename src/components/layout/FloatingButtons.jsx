import { MessageCircle, MessageSquare } from 'lucide-react';

/**
 * Floating WhatsApp and Messenger buttons — using Lucide icons.
 */
export default function FloatingButtons() {
  return (
    <>
      <a
        href="https://wa.me/639123456789"
        target="_blank"
        rel="noopener noreferrer"
        className="float-btn float-wa"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={26} strokeWidth={2} />
      </a>
      <a
        href="https://m.me/pataosanctuary"
        target="_blank"
        rel="noopener noreferrer"
        className="float-btn float-messenger"
        aria-label="Chat on Messenger"
      >
        <MessageSquare size={26} strokeWidth={2} />
      </a>
    </>
  );
}
