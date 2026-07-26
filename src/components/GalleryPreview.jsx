import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_IMAGES } from '../constants/gallery';
import SectionTitle from './ui/SectionTitle';
import Button from './ui/Button';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const previewPlants = [
  GALLERY_IMAGES[0],
  GALLERY_IMAGES[8],
  GALLERY_IMAGES[25],
  GALLERY_IMAGES[34],
  GALLERY_IMAGES[42],
  GALLERY_IMAGES[1],
  GALLERY_IMAGES[30],
  GALLERY_IMAGES[35],
];

const AUTO_SLIDE_MS = 4000;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

function TiltCard({ plant, children }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x, y });
  };

  return (
    <div ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      className="hidden sm:block perspective-[800px]"
      style={{
        transform: hovered
          ? `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) translateY(-4px)`
          : 'rotateY(0deg) rotateX(0deg) translateY(0px)',
        transition: hovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
      {children}
    </div>
  );
}

export default function GalleryPreview() {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const scrollRef = useRef(null);
  const [pause, setPause] = useState(false);
  const [current, setCurrent] = useState(0);
  const total = previewPlants.length;

  useEffect(() => {
    if (!isVisible || pause) return;
    const t = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % total;
        const container = scrollRef.current;
        if (container && container.children[next]) {
          container.scrollTo({ left: container.children[next].offsetLeft - 12, behavior: 'smooth' });
        }
        return next;
      });
    }, AUTO_SLIDE_MS);
    return () => clearInterval(t);
  }, [isVisible, pause, total]);

  const scroll = (dir) => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollBy({ left: dir * 280, behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          animate={isVisible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionTitle center subtitle="Hand-picked favorites from our collection. Visit the full gallery to see all 50+ plants.">
            Browse Our Plants
          </SectionTitle>
        </motion.div>

        {/* Desktop: 3D Tilt Cards */}
        <motion.div
          className="hidden sm:grid grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {previewPlants.slice(0, 5).map((plant) => (
            <motion.div key={plant.id} variants={cardVariant}>
              <TiltCard plant={plant}>
                <Link to="/gallery"
                  className="block bg-white rounded-xl border border-black/[0.06] overflow-hidden transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                  <div className="aspect-[3/4] overflow-hidden relative">
                    <img src={plant.images[0]} alt={plant.name} loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-600 ease-apple hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-400 ease-apple flex items-end p-3">
                      <div className="flex items-center gap-1.5 text-white text-xs font-medium">
                        <ShoppingBag size={13} /> Quick View
                      </div>
                    </div>
                  </div>
                  <div className="p-3 sm:p-3.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-[13px] sm:text-sm font-semibold text-neutral-900 tracking-tight truncate">{plant.name}</h3>
                        <p className="text-[11px] text-neutral-400 mt-0.5 font-medium">{plant.price}</p>
                      </div>
                      <ArrowRight size={14} className="text-neutral-300 group-hover:text-primary-500 transition-colors -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile: Horizontal scroll */}
        <motion.div
          className="sm:hidden relative"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="relative group/row">
            <button onClick={() => scroll(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 shadow border border-black/5 flex items-center justify-center text-neutral-600 opacity-0 group-hover/row:opacity-100 transition-all -ml-1 cursor-pointer">
              <ChevronLeft size={16} />
            </button>
            <div ref={scrollRef}
              className="flex gap-3 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar px-1"
              onTouchStart={() => setPause(true)}
              onTouchEnd={() => setTimeout(() => setPause(false), 2000)}>
              {previewPlants.map((plant) => (
                <Link to="/gallery" key={plant.id}
                  className="w-[65vw] max-w-[240px] flex-shrink-0 snap-center group bg-white rounded-xl border border-black/[0.06] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img src={plant.images[0]} alt={plant.name} loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-500 ease-apple group-hover:scale-105" />
                  </div>
                  <div className="p-2.5">
                    <h3 className="text-[13px] font-semibold text-neutral-900 tracking-tight truncate">{plant.name}</h3>
                    <p className="text-[11px] text-neutral-400 mt-0.5 font-medium">{plant.price}</p>
                  </div>
                </Link>
              ))}
            </div>
            <button onClick={() => scroll(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 shadow border border-black/5 flex items-center justify-center text-neutral-600 opacity-0 group-hover/row:opacity-100 transition-all -mr-1 cursor-pointer">
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="flex justify-center gap-1.5 mt-3">
            {previewPlants.map((_, i) => (
              <button key={i}
                onClick={() => {
                  const c = scrollRef.current; if (c && c.children[i]) c.scrollTo({ left: c.children[i].offsetLeft - 12, behavior: 'smooth' });
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer border-none ${i === current ? 'bg-primary-600 w-4' : 'w-1.5 bg-neutral-300'}`} />
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
          animate={isVisible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link to="/gallery">
            <Button size="lg" className="!px-10">Browse Collection →</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
