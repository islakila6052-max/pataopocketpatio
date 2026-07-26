import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Spline from '@splinetool/react-spline';
import { useBooking } from '../../context/BookingContext';
import Button from '../ui/Button';

const STATS = [
  { value: 5200, suffix: '+', label: 'Visitors' },
  { value: 680, suffix: '+', label: 'Species' },
  { value: 14, suffix: '', label: 'Rooms' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

function AnimatedStat({ value, suffix, label, delay }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setStarted(true), delay); return () => clearTimeout(t); }, [delay]);
  useEffect(() => {
    if (!started) return;
    let frame; const startTime = performance.now(); const duration = 1800;
    const step = (now) => {
      const elapsed = now - startTime; const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - progress, 4)) * value));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [started, value]);
  return (
    <div className="text-center">
      <div className="text-lg sm:text-2xl font-bold text-white tabular-nums">{suffix ? count.toLocaleString() + suffix : count.toString()}</div>
      <div className="text-[10px] sm:text-sm text-white/40 mt-0.5 sm:mt-1 tracking-wide uppercase">{label}</div>
    </div>
  );
}

export default function Hero() {
  const { open: openBooking } = useBooking();
  const [scrollY, setScrollY] = useState(0);
  const splineRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const rotate3D = scrollY * 0.15; // rotation tied to scroll

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-primary-950">
      {/* Spline background */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/bFPbxEl1hzGDR4x3/scene.splinecode" />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-[1]" />

      {/* Content: Split Layout */}
      <div className="relative z-[3] w-full max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Left: Text */}
          <motion.div className="text-center lg:text-left" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={fadeUp}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/8 backdrop-blur-xl border border-white/10 text-white/90 text-xs sm:text-sm font-medium mb-6">
              Nature Sanctuary &amp; Resort
            </motion.div>

            <motion.h1 variants={fadeUp}
              className="text-[2rem] xs:text-[2.4rem] sm:text-[3rem] lg:text-[4.2rem] font-bold tracking-tight leading-[1.06] mb-4 sm:mb-5 text-white"
              style={{ textShadow: '0 2px 50px rgba(0,0,0,0.3)' }}>
              Escape Into{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-200 to-green-400">Nature&rsquo;s</span>
                <motion.span className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-green-400/50 to-emerald-300/50 rounded-full"
                  initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }} />
              </span>
              <br />Hidden Paradise
            </motion.h1>

            <motion.p variants={fadeUp}
              className="text-sm sm:text-base lg:text-lg font-light text-white/70 max-w-[480px] mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed">
              Discover breathtaking botanical gardens, relaxing resort pools, peaceful patios, and unforgettable moments surrounded by nature.
            </motion.p>

            <motion.div variants={fadeUp} className="flex justify-center lg:justify-start">
              <button onClick={openBooking}>
                <Button variant="outline-light" size="lg" className="!border-white/30 !text-white hover:!bg-white/8 !backdrop-blur-sm !px-10">Book Your Visit</Button>
              </button>
            </motion.div>

            <motion.div variants={fadeUp} className="flex justify-center lg:justify-start gap-8 sm:gap-12 mt-8 sm:mt-10">
              {STATS.map((s, i) => <AnimatedStat key={s.label} {...s} delay={1800 + i * 200} />)}
            </motion.div>
          </motion.div>

          {/* Right: Rotating 3D Scene */}
          <motion.div
            ref={splineRef}
            className="hidden lg:flex items-center justify-center h-[500px]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              transform: `perspective(1000px) rotateY(${rotate3D}deg)`,
              transition: 'transform 0.1s linear',
            }}
          >
            <Spline scene="https://prod.spline.design/bFPbxEl1hzGDR4x3/scene.splinecode" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-[3]"
        initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 2.5, duration: 0.6 }}>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} className="text-white/50">
          <ChevronDown size={26} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
