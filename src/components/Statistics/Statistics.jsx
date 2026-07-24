import { useState, useEffect, useRef } from 'react';
import { STATISTICS } from '../../constants/statistics';
import { useCounter } from '../../hooks/useCounter';
import { formatNumber } from '../../utils/helpers';
import { cn } from '../../utils/helpers';

/**
 * Animated statistics counter section.
 * Triggers counting animation when scrolled into view.
 */
export default function Statistics() {
  const [startCounting, setStartCounting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCounting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="container section-padding">
      <div
        ref={ref}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center"
      >
        {STATISTICS.map((stat) => (
          <CounterCard
            key={stat.id}
            target={stat.target}
            label={stat.label}
            suffix={stat.suffix}
            start={startCounting}
          />
        ))}
      </div>
    </section>
  );
}

/**
 * Individual counter card with animated number.
 */
function CounterCard({ target, label, suffix, start }) {
  const count = useCounter(target, 2000, start);

  return (
    <div className="group">
      <h3 className="text-4xl sm:text-5xl font-bold text-primary-900 tracking-tight transition-transform duration-300 group-hover:scale-110">
        {formatNumber(count, suffix)}
      </h3>
      <p className="text-primary-700 font-medium mt-2 text-sm sm:text-base">
        {label}
      </p>
    </div>
  );
}
