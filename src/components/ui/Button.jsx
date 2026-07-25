import { cn } from '../../utils/helpers';

/**
 * Reusable Button — crisp radius, Apple-ease transitions, spring click.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  as: Component = 'button',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-lg border transition-all duration-200 ease-apple cursor-pointer tracking-tight active:scale-[0.97]';

  const variants = {
    primary:
      'bg-primary-700 text-white border-primary-700 shadow-sm hover:bg-primary-800 hover:border-primary-800 hover:shadow-md',
    outline:
      'bg-transparent border-primary-200 text-primary-700 hover:bg-primary-50 hover:border-primary-400',
    'outline-light':
      'bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white/50',
    ghost: 'bg-transparent border-transparent text-primary-700 hover:bg-primary-50',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base',
  };

  return (
    <Component className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </Component>
  );
}
