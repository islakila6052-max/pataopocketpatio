import { cn } from '../../utils/helpers';

/**
 * Reusable Card wrapper component.
 */
export default function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl shadow-card border border-primary-800/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
