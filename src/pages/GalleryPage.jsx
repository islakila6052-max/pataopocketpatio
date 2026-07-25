import { useState, useCallback, useEffect, useRef } from 'react';
import { X, Image, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_IMAGES, GALLERY_FILTERS } from '../constants/gallery';
import SectionTitle from '../components/ui/SectionTitle';
import Modal from '../components/ui/Modal';
import { cn } from '../utils/helpers';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] },
  }),
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const careColors = {
  'Easy': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Moderate': 'bg-amber-50 text-amber-700 border-amber-200',
};
const lightColors = {
  'Low Light': 'bg-slate-50 text-slate-600 border-slate-200',
  'Indirect Light': 'bg-sky-50 text-sky-600 border-sky-200',
  'Bright Light': 'bg-yellow-50 text-yellow-700 border-yellow-200',
};

function LazyImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete) { setLoaded(true); return; }
    const onLoad = () => setLoaded(true);
    img.addEventListener('load', onLoad);
    return () => img.removeEventListener('load', onLoad);
  }, [src]);
  return (
    <div className="relative w-full h-full bg-primary-50/30">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-primary-200 border-t-primary-500 animate-spin" />
        </div>
      )}
      <img ref={imgRef} src={src} alt={alt} loading="lazy" decoding="async"
        className={cn('w-full h-full object-cover object-center transition-all duration-500 ease-apple', loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95')} />
    </div>
  );
}

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [lightbox, setLightbox] = useState(null);
  const [toast, setToast] = useState(null);

  const filtered = (activeFilter === 'all' ? GALLERY_IMAGES : GALLERY_IMAGES.filter(img => img.category === activeFilter))
    .filter(p => search === '' || p.name.toLowerCase().includes(search.toLowerCase()));

  const openLightbox = useCallback((plant) => setLightbox({ plant, index: 0 }), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const nextSlide = () => { if (!lightbox) return; setLightbox(prev => ({ ...prev, index: (prev.index + 1) % prev.plant.images.length })); };
  const prevSlide = () => { if (!lightbox) return; setLightbox(prev => ({ ...prev, index: (prev.index - 1 + prev.plant.images.length) % prev.plant.images.length })); };

  useEffect(() => {
    if (!lightbox) return;
    const handleKey = (e) => { if (e.key === 'ArrowRight') nextSlide(); if (e.key === 'ArrowLeft') prevSlide(); if (e.key === 'Escape') closeLightbox(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightbox]);

  const handleInquire = (e, plant) => {
    e.stopPropagation();
    window.open(`https://m.me/pataosanctuary?text=${encodeURIComponent(`Hi! I'm interested in the ${plant.name} (${plant.price}).`)}`, '_blank');
    setToast(plant.name);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <section className="container section-padding">
      <SectionTitle center>Plant Collection</SectionTitle>

      {/* Search + Filters */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="relative w-full max-w-sm">
          <Image size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input type="text" placeholder="Search plants..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm outline-none focus:border-primary-400 transition" />
        </div>
        <div className="flex flex-wrap gap-1 justify-center bg-gray-100/60 p-1 rounded-xl">
          {GALLERY_FILTERS.map(f => (
            <button key={f.value} onClick={() => setActiveFilter(f.value)}
              className={cn('px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-[13px] font-medium transition-all duration-300 ease-apple whitespace-nowrap',
                activeFilter === f.value ? 'bg-white text-primary-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-700 hover:bg-white/50')}>
              {f.label}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-neutral-400">{filtered.length} plant{filtered.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((plant, i) => (
            <motion.div key={plant.id} layout variants={cardVariants} initial="hidden" animate="visible" exit="exit" custom={i}
              className="group bg-white rounded-xl border border-neutral-100 overflow-hidden cursor-pointer transition-all duration-300 ease-apple hover:-translate-y-1 hover:shadow-lg hover:shadow-neutral-200/50"
              onClick={() => openLightbox(plant)}>
              <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden">
                <LazyImage src={plant.images[0]} alt={plant.name} />
                <div className="absolute top-1.5 left-1.5 right-1.5 flex items-start justify-between gap-1">
                  <div className="flex gap-1 flex-wrap">
                    <span className={cn('px-1 py-0.5 rounded text-[9px] sm:text-[10px] font-medium border backdrop-blur-sm leading-none', careColors[plant.care])}>{plant.care}</span>
                    <span className={cn('px-1 py-0.5 rounded text-[9px] sm:text-[10px] font-medium border backdrop-blur-sm leading-none', lightColors[plant.light])}>{plant.light}</span>
                  </div>
                  {plant.petSafe && <span className="px-1 py-0.5 rounded bg-green-100/90 text-green-700 text-[9px] sm:text-[10px] font-medium border border-green-200 backdrop-blur-sm leading-none flex-shrink-0">🐾</span>}
                </div>
                <div className="absolute bottom-1.5 right-1.5">
                  <span className="px-1.5 py-0.5 rounded-md bg-black/30 backdrop-blur-sm text-white/80 text-[10px] font-medium">{plant.images.length} photos</span>
                </div>
              </div>
              <div className="p-2.5 sm:p-3.5">
                <h3 className="text-[13px] sm:text-sm font-semibold text-neutral-900 tracking-tight leading-tight truncate">{plant.name}</h3>
                <p className="text-[10px] sm:text-[11px] text-neutral-400 italic mt-0.5 truncate">{plant.scientific}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[13px] sm:text-sm font-bold text-primary-700">{plant.price}</span>
                  <button onClick={(e) => handleInquire(e, plant)}
                    className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-white bg-primary-700 hover:bg-primary-800 px-2.5 sm:px-3 py-1.5 rounded-lg transition-all duration-200 ease-apple active:scale-95 cursor-pointer border-none">
                    <ShoppingBag size={11} strokeWidth={2} /><span className="hidden xs:inline">Inquire</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[700] bg-primary-900 text-white text-xs sm:text-sm px-5 py-3 rounded-xl shadow-xl flex items-center gap-2">
            <ShoppingBag size={14} /> <span>Opening Messenger for <strong>{toast}</strong>...</span>
          </motion.div>
        )}
      </AnimatePresence>

      <Modal open={!!lightbox} onClose={closeLightbox}>
        <div className="lightbox-overlay flex-col gap-4" onClick={closeLightbox}>
          <button onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white text-3xl transition-colors duration-200 cursor-pointer bg-transparent border-none z-20">
            <X size={32} strokeWidth={1.5} />
          </button>
          {lightbox && (
            <>
              <img src={lightbox.plant.images[lightbox.index]} alt={lightbox.plant.name}
                className="max-w-[92%] max-h-[75vh] sm:max-h-[80vh] rounded-lg shadow-[0_40px_80px_rgba(0,0,0,0.5)] object-contain"
                onClick={e => e.stopPropagation()} />
              {lightbox.plant.images.length > 1 && (
                <>
                  <button onClick={e => { e.stopPropagation(); prevSlide(); }}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors flex items-center justify-center cursor-pointer border-none z-20">
                    <ChevronLeft size={24} strokeWidth={1.5} />
                  </button>
                  <button onClick={e => { e.stopPropagation(); nextSlide(); }}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors flex items-center justify-center cursor-pointer border-none z-20">
                    <ChevronRight size={24} strokeWidth={1.5} />
                  </button>
                </>
              )}
              <div className="flex flex-col items-center gap-2 z-20" onClick={e => e.stopPropagation()}>
                {lightbox.plant.images.length > 1 && (
                  <div className="flex gap-1.5">
                    {lightbox.plant.images.map((_, i) => (
                      <button key={i} onClick={() => setLightbox(prev => ({ ...prev, index: i }))}
                        className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer border-none ${i === lightbox.index ? 'bg-white w-5' : 'bg-white/30 hover:bg-white/50'}`} />
                    ))}
                  </div>
                )}
                <p className="text-white/70 text-xs sm:text-sm font-medium">{lightbox.plant.name} · {lightbox.index + 1} of {lightbox.plant.images.length}</p>
              </div>
            </>
          )}
        </div>
      </Modal>
    </section>
  );
}
