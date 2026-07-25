import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS } from '../../constants/faq';
import SectionTitle from '../ui/SectionTitle';
import { cn } from '../../utils/helpers';

export default function FAQ() {
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section id="faq" className="container section-padding max-w-2xl mx-auto">
      <SectionTitle center>Frequently Asked</SectionTitle>
      <div className="mt-2">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} className="border-b border-black/5 last:border-b-0">
              <button
                onClick={() => toggle(item.id)}
                className="w-full flex items-center justify-between py-4 text-left cursor-pointer bg-transparent border-none group"
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base font-semibold text-primary-900 group-hover:text-primary-700 transition-colors duration-200">
                  {item.question}
                </span>
                <span className="flex-shrink-0 ml-3 text-primary-400 transition-transform duration-300 ease-apple">
                  {isOpen ? <Minus size={16} strokeWidth={2} /> : <Plus size={16} strokeWidth={2} />}
                </span>
              </button>
              <div className={cn('overflow-hidden transition-all duration-300 ease-apple', isOpen ? 'max-h-40 pb-4' : 'max-h-0')}>
                <p className="text-sm text-primary-700/60 leading-relaxed">{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
