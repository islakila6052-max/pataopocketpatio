import { useState, useEffect, useRef, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../../constants/testimonials';
import SectionTitle from '../ui/SectionTitle';

const AUTO_SLIDE_MS = 4000;

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const total = TESTIMONIALS.length;

  const scrollToSlide = useCallback((index) => {
    const container = containerRef.current;
    if (!container) return;
    const card = container.children[index];
    if (!card) return;
    container.scrollTo({ left: card.offsetLeft - 4, behavior: 'smooth' });
  }, []);

  const goTo = useCallback((index) => {
    const next = ((index % total) + total) % total;
    setCurrent(next);
    scrollToSlide(next);
  }, [total, scrollToSlide]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const children = Array.from(container.children);
      if (!children.length) return;
      const containerCenter = container.scrollLeft + container.offsetWidth / 2;
      let closestIdx = 0, closestDist = Infinity;
      children.forEach((child, i) => {
        const cardCenter = child.offsetLeft + child.offsetWidth / 2;
        const dist = Math.abs(containerCenter - cardCenter);
        if (dist < closestDist) { closestDist = dist; closestIdx = i; }
      });
      if (closestIdx !== current) setCurrent(closestIdx);
    };
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [current]);

  return (
    <section className="bg-primary-50/70 section-padding overflow-hidden">
      <div className="container">
        <SectionTitle center>Guest Stories</SectionTitle>

        <div
          ref={containerRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto pb-8 pt-2 snap-x snap-mandatory hide-scrollbar"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="w-[80vw] max-w-[380px] sm:w-auto sm:min-w-[340px] flex-shrink-0 snap-center bg-white rounded-xl p-5 sm:p-6 border border-black/5 shadow-card transition-all duration-300 ease-apple hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-primary-800/70 leading-relaxed mb-4 italic">
                &ldquo;{item.text}&rdquo;
              </p>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-xs flex-shrink-0">
                  {item.author.charAt(0)}
                </div>
                <h4 className="text-primary-900 font-semibold text-sm">{item.author}</h4>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 mt-4">
          <button onClick={prev} className="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center text-primary-600 hover:bg-primary-50 transition-colors duration-200 ease-apple cursor-pointer shadow-sm">
            <ChevronLeft size={16} strokeWidth={2} />
          </button>
          <div className="flex gap-1.5">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ease-apple cursor-pointer border-none ${i === current ? 'bg-primary-600 w-5' : 'w-2 bg-primary-200 hover:bg-primary-300'}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button onClick={next} className="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center text-primary-600 hover:bg-primary-50 transition-colors duration-200 ease-apple cursor-pointer shadow-sm">
            <ChevronRight size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
