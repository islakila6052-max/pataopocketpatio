import { cn } from '../../utils/helpers';

/**
 * Reusable Button component with variants.
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
    'inline-block font-semibold rounded-full transition-all duration-300 ease-in-out cursor-pointer border-none tracking-wide relative overflow-hidden';

  const variants = {
    primary:
      'bg-primary-800 text-white shadow-green hover:bg-primary-900 hover:-translate-y-[3px] hover:shadow-green-lg',
    outline:
      'bg-transparent border-2 border-primary-800 text-primary-800 shadow-none hover:bg-primary-800 hover:text-white',
    'outline-light':
      'bg-transparent border-2 border-white text-white shadow-none hover:bg-white hover:text-primary-900',
    ghost: 'bg-transparent text-primary-800 shadow-none hover:bg-primary-50',
  };

  const sizes = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-9 py-3.5 text-base',
    lg: 'px-12 py-4 text-lg',
  };

  return (
    <Component
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
