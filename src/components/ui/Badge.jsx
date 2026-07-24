import { cn } from '../../utils/helpers';

/**
 * Reusable inline badge/tag component.
 */
export default function Badge({ children, variant = 'default', className }) {
  const variants = {
    default: 'bg-primary-100 text-primary-900',
    outline: 'border border-primary-300 text-primary-800 bg-transparent',
  };

  return (
    <span
      className={cn(
        'inline-block px-3 py-1 text-xs font-medium rounded-full',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
