import { useState, useEffect, useRef, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../../constants/testimonials';
import SectionTitle from '../ui/SectionTitle';

const AUTO_SLIDE_MS = 4000;

/**
 * Guest testimonials — auto-sliding carousel with glassmorphism cards,
 * navigation dots, arrow controls, and pause-on-hover.
 */
export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const total = TESTIMONIALS.length;

  const scrollToSlide = useCallback(
    (index) => {
      const container = containerRef.current;
      if (!container) return;
      const card = container.children[index];
      if (!card) return;
      container.scrollTo({
        left: card.offsetLeft - container.offsetLeft,
        behavior: 'smooth',
      });
    },
    []
  );

  const goTo = useCallback(
    (index) => {
      const next = (index + total) % total;
      setCurrent(next);
      scrollToSlide(next);
    },
    [total, scrollToSlide]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-slide
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => {
        const nextIdx = (prev + 1) % total;
        scrollToSlide(nextIdx);
        return nextIdx;
      });
    }, AUTO_SLIDE_MS);
    return () => clearInterval(timer);
  }, [isPaused, total, scrollToSlide]);

  // Sync current index on manual scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.children[0]?.offsetWidth + 24; // 24 = gap
      const idx = Math.round(scrollLeft / cardWidth);
      if (idx >= 0 && idx < total) {
        setCurrent(idx);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [total]);

  return (
    <section className="bg-primary-50 section-padding overflow-hidden">
      <div className="container">
        <SectionTitle center>Guest Stories</SectionTitle>

        {/* Carousel Container */}
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto pb-10 pt-4 px-1 snap-x snap-mandatory hide-scrollbar"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="min-w-[300px] sm:min-w-[340px] flex-shrink-0 snap-center bg-white/50 backdrop-blur-xl rounded-5xl p-8 shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-white/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_50px_rgba(27,94,32,0.08)]"
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

        {/* Controls: arrows + dots */}
        <div className="flex items-center justify-center gap-4 mt-2">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full bg-white border border-primary-200 flex items-center justify-center text-primary-700 hover:bg-primary-50 hover:border-primary-400 transition-colors cursor-pointer shadow-sm"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} strokeWidth={2} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer border-none ${
                  i === current
                    ? 'bg-primary-700 w-7'
                    : 'bg-primary-200 hover:bg-primary-400'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full bg-white border border-primary-200 flex items-center justify-center text-primary-700 hover:bg-primary-50 hover:border-primary-400 transition-colors cursor-pointer shadow-sm"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Auto-play indicator */}
        <p className="text-center text-xs text-primary-400 mt-3">
          {isPaused ? 'Paused on hover' : 'Auto-playing'}
        </p>
      </div>
    </section>
  );
}
