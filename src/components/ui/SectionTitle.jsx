import { cn } from '../../utils/helpers';

/**
 * Reusable section title with optional subtitle.
 */
export default function SectionTitle({
  children,
  subtitle,
  className,
  center = false,
  as: Tag = 'h2',
}) {
  return (
    <div className={cn(center && 'text-center', 'mb-8', className)}>
      <Tag className="text-[2.2rem] md:text-[2.8rem] font-semibold tracking-tight text-primary-900 leading-tight">
        {children}
      </Tag>
      {subtitle && (
        <p className="text-lg text-primary-800/80 max-w-xl mt-4 text-balance mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
