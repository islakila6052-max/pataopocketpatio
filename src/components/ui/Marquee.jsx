export default function Marquee({ items, className }) {
  return (
    <div className="relative w-full overflow-hidden py-3">
      <div className="flex gap-6 animate-[marquee_25s_linear_infinite]">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex-shrink-0 text-xs sm:text-sm font-medium text-primary-600/60 whitespace-nowrap tracking-wide">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
