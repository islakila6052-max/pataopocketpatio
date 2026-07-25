import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, Leaf } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import Button from '../ui/Button';

const SLIDESHOW = [
  'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1600&q=80',
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80',
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=80',
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.2, ease: 'easeOut' },
  },
};

export default function Hero() {
  const { open: openBooking } = useBooking();
  const [bgIndex, setBgIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Parallax scroll
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Background slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % SLIDESHOW.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleGalleryScroll = (e) => {
    e.preventDefault();
    const target = document.querySelector('#gallery');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background slideshow with crossfade */}
      {SLIDESHOW.map((src, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${src})`,
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: i === bgIndex ? 1 : 0 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        />
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/65 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/20 via-transparent to-primary-900/20 z-[1]" />

      {/* Floating particles */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.15, 0.35, 0.15],
              rotate: [0, i % 2 === 0 ? 10 : -10, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          >
            <Leaf
              size={18 + i * 3}
              strokeWidth={1}
              className="text-white/30"
            />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-[3] max-w-[820px] mx-auto text-center px-4 sm:px-6 pt-16 sm:pt-20 pb-14"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs sm:text-sm font-medium mb-8"
        >
          <Sparkles size={14} className="text-yellow-300" />
          <span>Nature Sanctuary &amp; Resort</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-[2rem] xs:text-[2.4rem] sm:text-[3.2rem] lg:text-[5rem] font-bold tracking-tight leading-[1.08] mb-5 sm:mb-6 text-white"
          style={{ textShadow: '0 2px 40px rgba(0,0,0,0.3)' }}
        >
          Escape Into{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-200 to-green-400">
            Nature&rsquo;s
          </span>{' '}
          Hidden Paradise
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="text-sm sm:text-lg lg:text-xl font-light text-white/80 max-w-[580px] mx-auto mb-8 sm:mb-10 leading-relaxed"
        >
          Discover breathtaking botanical gardens, relaxing resort pools,
          peaceful patios, and unforgettable moments surrounded by nature.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex gap-3 sm:gap-4 justify-center flex-wrap max-sm:flex-col max-sm:items-stretch max-sm:px-2"
        >
          <a href="#gallery" onClick={handleGalleryScroll} className="max-sm:w-full">
            <Button
              size="lg"
              className="!bg-white !text-primary-900 hover:!bg-green-50 !shadow-2xl !shadow-white/20 !px-8 !w-full sm:!w-auto"
            >
              Explore the Garden
            </Button>
          </a>
          <button onClick={openBooking} className="max-sm:w-full">
            <Button
              variant="outline-light"
              size="lg"
              className="!border-white/40 !text-white hover:!bg-white/10 !backdrop-blur-sm !px-8 !w-full sm:!w-auto"
            >
              Book Your Visit
            </Button>
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeIn}
          className="flex justify-center gap-6 sm:gap-12 mt-10 sm:mt-14 text-white/70"
        >
          {[
            { value: '5,200+', label: 'Visitors' },
            { value: '680+', label: 'Species' },
            { value: '14', label: 'Rooms' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-lg sm:text-2xl font-bold text-white">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-sm text-white/50 mt-0.5 sm:mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-[3] text-white/60"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={28} strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
