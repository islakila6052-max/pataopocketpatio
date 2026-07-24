import { cn } from '../../utils/helpers';

/**
 * Reusable styled input field.
 */
export default function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        'w-full px-4 py-3.5 rounded-full border border-primary-200 bg-white text-primary-950 placeholder-primary-300 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition',
        className
      )}
      {...props}
    />
  );
}
