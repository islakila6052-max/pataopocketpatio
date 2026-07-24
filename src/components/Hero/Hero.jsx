import { ChevronDown, Leaf } from 'lucide-react';
import Button from '../ui/Button';
import { cn } from '../../utils/helpers';

/**
 * Floating leaf positions — using Lucide Leaf icons instead of emojis.
 */
const LEAVES = [
  { left: '6%', top: '18%', duration: '22s', size: 32, opacity: 0.2, rotate: 15 },
  { right: '10%', top: '38%', duration: '26s', size: 44, opacity: 0.18, rotate: -20 },
  { left: '22%', bottom: '18%', duration: '20s', size: 28, opacity: 0.22, rotate: 30 },
  { right: '25%', top: '60%', duration: '24s', size: 36, opacity: 0.15, rotate: -10 },
  { left: '75%', bottom: '25%', duration: '28s', size: 30, opacity: 0.2, rotate: 45 },
];

/**
 * Full-viewport hero section with Lucide Leaf floating animations.
 */
export default function Hero() {
  const handleScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center text-center px-6 pt-28 pb-20 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1600&q=80')",
      }}
    >
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/55 to-primary-950/70 z-[1]" />

      {/* Floating leaves — Lucide icons */}
      {LEAVES.map((leaf, i) => (
        <span
          key={i}
          className="absolute z-[2] pointer-events-none select-none"
          style={{
            left: leaf.left,
            right: leaf.right,
            top: leaf.top,
            bottom: leaf.bottom,
            opacity: leaf.opacity,
            animation: `floatLeaf ${leaf.duration} infinite linear`,
          }}
        >
          <Leaf
            size={leaf.size}
            strokeWidth={1.2}
            color="white"
            style={{ transform: `rotate(${leaf.rotate}deg)` }}
          />
        </span>
      ))}

      {/* Content */}
      <div className="relative z-[2] max-w-[800px] text-white">
        <h1
          className="text-[2.4rem] sm:text-[3.2rem] lg:text-[4.2rem] font-bold tracking-tight leading-[1.1] mb-5"
          style={{ textShadow: '0 4px 30px rgba(0,0,0,0.2)' }}
        >
          Escape Into Nature&rsquo;s Hidden Paradise
        </h1>

        <p className="text-lg sm:text-xl font-light opacity-90 mb-9 max-w-[600px] mx-auto text-balance">
          Discover breathtaking botanical gardens, relaxing resort pools,
          peaceful patios, and unforgettable moments surrounded by nature.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-5 justify-center flex-wrap max-sm:flex-col max-sm:items-center">
          <a href="#gallery" onClick={(e) => handleScroll(e, '#gallery')}>
            <Button className="max-sm:w-full">Explore the Garden</Button>
          </a>
          <a href="#contact" onClick={(e) => handleScroll(e, '#contact')}>
            <Button variant="outline-light" className="max-sm:w-full">
              Book Your Visit
            </Button>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[2] text-white opacity-70 animate-bounce-slow">
        <ChevronDown size={36} strokeWidth={1.5} />
      </div>
    </section>
  );
}
