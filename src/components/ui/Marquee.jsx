export default function Marquee({ items, className }) {
  const renderItems = (hidden = false) => (
    <div
      className="flex shrink-0 gap-6 pr-6"
      aria-hidden={hidden || undefined}
    >
      {items.map((item, i) => (
        <span
          key={`${item}-${i}`}
          className="flex-shrink-0 text-xs sm:text-sm font-medium text-primary-600/60 whitespace-nowrap tracking-wide"
        >
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div className={`relative w-full overflow-hidden py-3 ${className || ''}`}>
      <div className="marquee-track flex w-max">
        {renderItems()}
        {renderItems(true)}
      </div>
    </div>
  );
}
