import { cn } from '../../utils/helpers';

export default function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-black/5 shadow-card transition-all duration-300 ease-apple hover:shadow-card-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
