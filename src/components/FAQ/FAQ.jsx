import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS } from '../../constants/faq';
import SectionTitle from '../ui/SectionTitle';
import { cn } from '../../utils/helpers';

/**
 * FAQ accordion section with expand/collapse animation.
 */
export default function FAQ() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="container section-padding max-w-3xl mx-auto">
      <SectionTitle center>Frequently Asked</SectionTitle>

      <div className="mt-2">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="border-b border-primary-200/40 last:border-b-0"
            >
              <button
                onClick={() => toggle(item.id)}
                className="w-full flex items-center justify-between py-5 text-left cursor-pointer bg-transparent border-none group"
                aria-expanded={isOpen}
              >
                <span className="text-lg font-semibold text-primary-900 group-hover:text-primary-700 transition-colors">
                  {item.question}
                </span>
                <span className="flex-shrink-0 ml-4 text-primary-600 transition-transform duration-300">
                  {isOpen ? (
                    <Minus size={20} strokeWidth={2} />
                  ) : (
                    <Plus size={20} strokeWidth={2} />
                  )}
                </span>
              </button>

              <div
                className={cn(
                  'overflow-hidden transition-all duration-500 ease-in-out',
                  isOpen ? 'max-h-48 pb-5' : 'max-h-0'
                )}
              >
                <p className="text-primary-700/80 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
