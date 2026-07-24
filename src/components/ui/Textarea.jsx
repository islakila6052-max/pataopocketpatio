import { cn } from '../../utils/helpers';

/**
 * Reusable styled textarea.
 */
export default function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        'w-full px-4 py-3.5 rounded-3xl border border-primary-200 bg-white text-primary-950 placeholder-primary-300 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition resize-none',
        className
      )}
      {...props}
    />
  );
}
