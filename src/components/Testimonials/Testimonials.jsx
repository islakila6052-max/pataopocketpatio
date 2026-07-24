import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../../constants/testimonials';
import SectionTitle from '../ui/SectionTitle';

/**
 * Guest testimonials — horizontally scrollable glassmorphism cards.
 */
export default function Testimonials() {
  return (
    <section className="bg-primary-50 section-padding">
      <div className="container">
        <SectionTitle center>Guest Stories</SectionTitle>

        <div className="flex gap-6 overflow-x-auto pb-10 pt-4 px-1 snap-x snap-mandatory hide-scrollbar">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="min-w-[280px] sm:min-w-[320px] flex-shrink-0 snap-start bg-white/50 backdrop-blur-xl rounded-5xl p-8 shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-white/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_50px_rgba(27,94,32,0.08)]"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>

              <p className="text-primary-800/80 text-base leading-relaxed mb-5 italic">
                &ldquo;{item.text}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-200 flex items-center justify-center text-primary-900 font-semibold text-sm">
                  {item.author.charAt(0)}
                </div>
                <h4 className="text-primary-900 font-semibold">
                  {item.author}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
