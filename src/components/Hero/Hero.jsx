import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Leaf, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import Button from '../ui/Button';

const SLIDESHOW = Object.values(
  import.meta.glob('../../assets/bonsphoto/bonsphoto/thegarden*.jpg', {
    eager: true,
    import: 'default',
  })
);

const STATS = [
  { value: 5200, suffix: '+', label: 'Visitors' },
  { value: 680, suffix: '+', label: 'Species' },
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
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setBgIndex(prev => (prev + 1) % SLIDESHOW.length), 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative isolate flex min-h-[680px] h-[100svh] max-h-[1000px] items-center overflow-hidden">
      {SLIDESHOW.map((src, i) => (
        <motion.div key={src} className="absolute inset-0 bg-cover bg-[center_55%]"
          style={{ backgroundImage: `url(${src})` }}
          initial={{ opacity: 0 }} animate={{ opacity: i === bgIndex ? 1 : 0 }} transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }} />
      ))}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#10251d]/80 via-[#10251d]/45 to-[#10251d]/10" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#10251d]/55 via-transparent to-black/15" />

      <motion.div className="container relative z-[3] w-full pt-20 pb-24 sm:pt-24"
        variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={fadeUp} className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-white/85 mb-6">
            <Leaf size={15} strokeWidth={1.7} className="text-emerald-200" />
            <span>Botanical garden &amp; plant shop</span>
          </div>
          <h1 className="font-display text-[3.4rem] xs:text-[4rem] sm:text-6xl lg:text-8xl leading-[0.98] tracking-[-0.04em] text-white text-balance mb-6">
            Escape into <span className="italic text-[#d7e5b3]">nature&rsquo;s</span> hidden paradise.
          </h1>
          <p className="max-w-xl text-sm sm:text-base lg:text-lg font-light text-white/85 leading-relaxed mb-8 sm:mb-10">
            Wander through a garden sanctuary, slow down among tropical greenery, and make room for a little more nature in your day.
          </p>
          <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3">
            <Button onClick={openBooking} size="lg" className="!px-7 !py-3.5 !bg-[#e7edcf] !border-[#e7edcf] !text-[#173b2a] hover:!bg-white hover:!border-white">
              Plan your visit <ArrowRight size={16} className="ml-2" />
            </Button>
            <Link to="/gallery" className="inline-flex items-center gap-2 rounded-full border border-white/45 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              Explore our plants
            </Link>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-[3] border-t border-white/20 bg-[#10251d]/25 backdrop-blur-sm">
        <div className="container flex items-center justify-between gap-6 py-4 sm:py-5">
          <div className="hidden sm:flex items-center gap-2 text-xs tracking-wide text-white/75">
            <MapPin size={14} className="text-[#d7e5b3]" />
            A little more nature, a little less hurry
          </div>
          <div className="ml-auto flex gap-7 sm:gap-10">
            {STATS.map((s, i) => <AnimatedStat key={s.label} {...s} delay={800 + i * 150} />)}
          </div>
          <a href="#about" className="hidden sm:flex items-center gap-2 text-xs font-medium text-white/75 hover:text-white transition-colors">
            Discover the sanctuary <ArrowDown size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
