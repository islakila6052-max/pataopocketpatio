import { cn } from '../../utils/helpers';

export default function SectionTitle({
  children,
  subtitle,
  className,
  center = false,
  as: Tag = 'h2',
}) {
  return (
    <div className={cn(center && 'text-center', 'mb-8', className)}>
      <Tag className="text-[1.8rem] sm:text-[2.2rem] lg:text-[2.6rem] font-bold tracking-tight text-primary-900 leading-[1.15]">
        {children}
      </Tag>
      {subtitle && (
        <p className="text-sm sm:text-base text-primary-700/60 max-w-xl mt-3 sm:mt-4 text-balance mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
