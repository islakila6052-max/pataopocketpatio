import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import Button from '../ui/Button';

const SLIDESHOW = [
  'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1600&q=80',
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80',
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=80',
];

const STATS = [
  { value: 5200, suffix: '+', label: 'Visitors' },
  { value: 680, suffix: '+', label: 'Species' },
  { value: 14, suffix: '', label: 'Rooms' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.4 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

function AnimatedStat({ value, suffix, label, delay }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let frame;
    const startTime = performance.now();
    const duration = 1800;

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * value));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [started, value]);

  const display = suffix ? count.toLocaleString() + suffix : count.toString();

  return (
    <div className="text-center">
      <div className="text-lg sm:text-2xl font-bold text-white tabular-nums">
        {display}
      </div>
      <div className="text-[10px] sm:text-sm text-white/40 mt-0.5 sm:mt-1 tracking-wide uppercase">
        {label}
      </div>
    </div>
  );
}

export default function Hero() {
  const { open: openBooking } = useBooking();
  const [bgIndex, setBgIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % SLIDESHOW.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background slideshow */}
      {SLIDESHOW.map((src, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${src})`,
            transform: `translateY(${scrollY * 0.3}px) scale(1.02)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: i === bgIndex ? 1 : 0 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/15 via-transparent to-primary-900/15 z-[1]" />

      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary-500/10 blur-[120px] z-[1]"
        animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <motion.div
        className="relative z-[3] max-w-[860px] mx-auto text-center px-4 sm:px-6 pt-16 sm:pt-20 pb-14"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 backdrop-blur-xl border border-white/10 text-white/90 text-xs sm:text-sm font-medium mb-8"
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-green-400"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <Sparkles size={13} className="text-yellow-300/80" />
          <span>Nature Sanctuary &amp; Resort</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-[2rem] xs:text-[2.4rem] sm:text-[3.4rem] lg:text-[5rem] font-bold tracking-tight leading-[1.06] mb-5 sm:mb-6 text-white"
          style={{ textShadow: '0 2px 50px rgba(0,0,0,0.25)' }}
        >
          <span>Escape Into </span>
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-200 to-green-400">
              Nature&rsquo;s
            </span>
            <motion.span
              className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-green-400/50 to-emerald-300/50 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </span>
          <br />
          <span>Hidden Paradise</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="text-sm sm:text-lg lg:text-xl font-light text-white/70 max-w-[540px] mx-auto mb-8 sm:mb-10 leading-relaxed"
        >
          Discover breathtaking botanical gardens, relaxing resort pools,
          peaceful patios, and unforgettable moments surrounded by nature.
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          className="flex justify-center max-sm:px-4 mb-10 sm:mb-12"
        >
          <motion.button
            onClick={openBooking}
            className="w-full sm:w-auto"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              variant="outline-light"
              size="lg"
              className="!border-white/30 !text-white hover:!bg-white/8 !backdrop-blur-sm !px-10 !w-full sm:!w-auto !rounded-lg"
            >
              Book Your Visit
            </Button>
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          className="flex justify-center items-start gap-8 sm:gap-14"
        >
          {STATS.map((stat, i) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={1800 + i * 200}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-[3]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2.5, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-white/50"
        >
          <ChevronDown size={26} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
