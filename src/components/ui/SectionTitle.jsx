import { cn } from '../../utils/helpers';

export default function SectionTitle({
  children,
  subtitle,
  className,
  center = false,
  as: Tag = 'h2',
}) {
  return (
    <div className={cn(center && 'text-center', 'mb-9', className)}>
      <Tag className="font-display text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-normal tracking-tight text-primary-900 leading-[1.08] text-balance">
        {children}
      </Tag>
      <span className={cn('mt-4 block h-px w-12 bg-primary-400', center && 'mx-auto')} />
      {subtitle && (
        <p className={cn(
          'text-sm sm:text-base text-primary-800/65 max-w-xl mt-4 text-balance leading-relaxed',
          center ? 'mx-auto' : 'mr-auto'
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
