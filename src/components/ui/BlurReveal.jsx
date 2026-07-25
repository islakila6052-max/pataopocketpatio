import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { cn } from '../../utils/helpers';

/**
 * Wraps children with a blur-to-clear entrance animation
 * triggered when scrolled into view.
 */
export default function BlurReveal({ children, className, delay = 0 }) {
  const [ref, visible] = useScrollAnimation({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={cn('transition-all duration-700', className)}
      style={{
        transitionDelay: `${delay}ms`,
        filter: visible ? 'blur(0px)' : 'blur(8px)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
}
