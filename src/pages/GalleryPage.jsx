import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { X, ShoppingBag, ChevronLeft, ChevronRight, Search, SlidersHorizontal, PawPrint } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_IMAGES, GALLERY_FILTERS } from '../constants/gallery';
import SectionTitle from '../components/ui/SectionTitle';
import Modal from '../components/ui/Modal';
import { cn } from '../utils/helpers';

const INITIAL_GALLERY_BATCH_SIZE = 10;
const FILTER_LOADING_DELAY = 250;

const careColors = {
  'Easy': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Moderate': 'bg-amber-50 text-amber-700 border-amber-200',
};
const lightColors = {
  'Low Light': 'bg-slate-50 text-slate-600 border-slate-200',
  'Indirect Light': 'bg-sky-50 text-sky-600 border-sky-200',
  'Bright Light': 'bg-yellow-50 text-yellow-700 border-yellow-200',
};

function LazyImage({ src, alt, imageId, onReady, eager }) {
  const imgRef = useRef(null);
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    const markReady = () => onReady(imageId);
    if (img.complete) { markReady(); return; }
    img.addEventListener('load', markReady);
    img.addEventListener('error', markReady);
    return () => {
      img.removeEventListener('load', markReady);
      img.removeEventListener('error', markReady);
    };
  }, [imageId, onReady, src]);
  return (
    <div className="relative w-full h-full bg-primary-50/30">
      <img ref={imgRef} src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async"
        className="w-full h-full object-cover object-center" />
    </div>
  );
}

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [careFilter, setCareFilter] = useState('all');
  const [lightFilter, setLightFilter] = useState('all');
  const [petFriendlyOnly, setPetFriendlyOnly] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [toast, setToast] = useState(null);
  const [readyImageIds, setReadyImageIds] = useState(() => new Set());
  const [isFiltering, setIsFiltering] = useState(false);
  const hasMountedFilters = useRef(false);

  const careOptions = useMemo(() => [...new Set(GALLERY_IMAGES.map(plant => plant.care))], []);
  const lightOptions = useMemo(() => [...new Set(GALLERY_IMAGES.map(plant => plant.light))], []);
  const hasActiveFilters = search.trim() !== '' || activeFilter !== 'all' || careFilter !== 'all' || lightFilter !== 'all' || petFriendlyOnly;

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return GALLERY_IMAGES.filter((plant) => (
      (activeFilter === 'all' || plant.category === activeFilter)
      && (careFilter === 'all' || plant.care === careFilter)
      && (lightFilter === 'all' || plant.light === lightFilter)
      && (!petFriendlyOnly || plant.petSafe)
      && (!query || `${plant.name} ${plant.scientific}`.toLowerCase().includes(query))
    ));
  }, [activeFilter, careFilter, lightFilter, petFriendlyOnly, search]);
  const initialBatch = filtered.slice(0, INITIAL_GALLERY_BATCH_SIZE);
  const isGalleryLoading = initialBatch.some(plant => !readyImageIds.has(plant.id));
  useEffect(() => {
    if (!hasMountedFilters.current) {
      hasMountedFilters.current = true;
      return;
    }

    setIsFiltering(true);
    const timer = setTimeout(() => setIsFiltering(false), FILTER_LOADING_DELAY);
    return () => clearTimeout(timer);
  }, [activeFilter, careFilter, lightFilter, petFriendlyOnly, search]);

  const showGalleryLoading = isFiltering || isGalleryLoading;
  const markImageReady = useCallback((id) => {
    setReadyImageIds(previous => {
      if (previous.has(id)) return previous;
      const next = new Set(previous);
      next.add(id);
      return next;
    });
  }, []);

  const clearFilters = () => {
    setActiveFilter('all');
    setSearch('');
    setCareFilter('all');
    setLightFilter('all');
    setPetFriendlyOnly(false);
  };

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
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-600">Find your next plant</p>
        <SectionTitle center className="mb-0" subtitle="Browse by plant type, care level, or light needs to find the right fit for your home and garden.">
          Plant Collection
        </SectionTitle>
      </div>

      {/* Search + Filters */}
      <div className="mb-8 rounded-2xl border border-primary-900/10 bg-white p-4 shadow-[0_8px_30px_rgba(29,55,41,0.05)] sm:p-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative block flex-1">
              <span className="sr-only">Search by plant name or scientific name</span>
              <Search size={17} aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-700/50" />
              <input
                type="search"
                placeholder="Search common or scientific name"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full rounded-xl border border-primary-900/15 bg-[#fbfaf6] py-3 pl-11 pr-4 text-sm text-primary-900 outline-none placeholder:text-primary-800/45 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              />
            </label>
            <label className="flex min-h-11 items-center gap-2 rounded-xl border border-primary-900/15 bg-[#fbfaf6] px-4 text-sm text-primary-800">
              <PawPrint size={16} className="text-primary-600" aria-hidden="true" />
              <input
                type="checkbox"
                checked={petFriendlyOnly}
                onChange={e => setPetFriendlyOnly(e.target.checked)}
                className="accent-primary-700"
              />
              Pet-friendly
            </label>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-700/65">
            <SlidersHorizontal size={14} aria-hidden="true" />
            Browse by type
          </div>
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 hide-scrollbar">
            {GALLERY_FILTERS.map(f => (
              <button
                key={f.value}
                type="button"
                onClick={() => setActiveFilter(f.value)}
                aria-pressed={activeFilter === f.value}
                className={cn(
                  'shrink-0 rounded-full border px-4 py-2 text-xs font-medium',
                  activeFilter === f.value
                    ? 'border-primary-800 bg-primary-800 text-white'
                    : 'border-primary-900/15 bg-white text-primary-800 hover:border-primary-500 hover:bg-primary-50'
                )}
              >
                <span>{f.label}</span>
                <span className={cn(
                  'ml-1.5 text-[10px]',
                  activeFilter === f.value ? 'text-white/70' : 'text-primary-700/50'
                )}>
                  {f.value === 'all'
                    ? GALLERY_IMAGES.length
                    : GALLERY_IMAGES.filter(plant => plant.category === f.value).length}
                </span>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 border-t border-primary-900/10 pt-4 sm:flex-row sm:items-center">
            <label className="flex flex-1 flex-col gap-1 text-[11px] font-medium text-primary-800/65">
              Care level
              <select
                value={careFilter}
                onChange={e => setCareFilter(e.target.value)}
                className="rounded-lg border border-primary-900/15 bg-white px-3 py-2.5 text-sm text-primary-900 outline-none focus:border-primary-500"
              >
                <option value="all">Any care level</option>
                {careOptions.map(option => <option key={option} value={option}>{option} care</option>)}
              </select>
            </label>
            <label className="flex flex-1 flex-col gap-1 text-[11px] font-medium text-primary-800/65">
              Light needs
              <select
                value={lightFilter}
                onChange={e => setLightFilter(e.target.value)}
                className="rounded-lg border border-primary-900/15 bg-white px-3 py-2.5 text-sm text-primary-900 outline-none focus:border-primary-500"
              >
                <option value="all">Any light</option>
                {lightOptions.map(option => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>
            <div className="flex items-center justify-between gap-4 pt-1 text-sm text-primary-800/70 sm:min-w-36 sm:justify-end sm:pt-4">
              <span aria-live="polite">
                <strong className="text-primary-900">{filtered.length}</strong> of {GALLERY_IMAGES.length} plants
              </span>
              {hasActiveFilters && (
                <button type="button" onClick={clearFilters} className="text-xs font-semibold text-primary-700 underline decoration-primary-300 underline-offset-4 hover:text-primary-900">
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div aria-busy={showGalleryLoading}
        className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5 content-auto">
        {filtered.map((plant, i) => (
            <article key={plant.id}
              className="group overflow-hidden rounded-2xl border border-primary-900/10 bg-white">
              <button
                type="button"
                aria-label={`View ${plant.name} photos`}
                onClick={() => openLightbox(plant)}
                className="relative block aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden border-0 bg-transparent p-0 text-left"
              >
                <LazyImage
                  src={plant.images[0]}
                  alt={plant.name}
                  imageId={plant.id}
                  eager={i < INITIAL_GALLERY_BATCH_SIZE}
                  onReady={markImageReady}
                />
                <div className="absolute top-1.5 left-1.5 right-1.5 flex items-start justify-between gap-1">
                  <div className="flex gap-1 flex-wrap">
                    <span className={cn('px-1.5 py-1 rounded-md text-[9px] sm:text-[10px] font-medium border backdrop-blur-sm leading-none', careColors[plant.care])}>{plant.care} care</span>
                    <span className={cn('px-1.5 py-1 rounded-md text-[9px] sm:text-[10px] font-medium border backdrop-blur-sm leading-none', lightColors[plant.light])}>{plant.light}</span>
                  </div>
                  {plant.petSafe && <span className="px-1 py-0.5 rounded bg-green-100/90 text-green-700 text-[9px] sm:text-[10px] font-medium border border-green-200 backdrop-blur-sm leading-none flex-shrink-0">🐾</span>}
                </div>
                <div className="absolute bottom-1.5 right-1.5">
                  <span className="px-1.5 py-0.5 rounded-md bg-black/30 backdrop-blur-sm text-white/80 text-[10px] font-medium">{plant.images.length} photos</span>
                </div>
              </button>
              <div className="p-3 sm:p-4">
                <h3 className="text-[13px] sm:text-sm font-semibold text-neutral-900 tracking-tight leading-tight truncate">{plant.name}</h3>
                <p className="text-[10px] sm:text-[11px] text-neutral-400 italic mt-0.5 truncate">{plant.scientific}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[13px] sm:text-sm font-bold text-primary-700">{plant.price}</span>
                  <button onClick={(e) => handleInquire(e, plant)}
                    className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-white bg-primary-700 hover:bg-primary-800 px-2.5 sm:px-3 py-1.5 rounded-lg cursor-pointer border-none">
                    <ShoppingBag size={11} strokeWidth={2} /><span className="hidden xs:inline">Inquire</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        {showGalleryLoading && (
          <div role="status" aria-live="polite"
            className="absolute inset-0 z-10 flex items-start justify-center rounded-2xl bg-[#fbfaf6] pt-12 text-sm font-medium text-primary-800">
            <span className="flex items-center gap-3 rounded-full bg-white px-5 py-3 shadow-sm">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary-200 border-t-primary-700" />
              {isFiltering ? 'Updating plant collection...' : 'Loading plant collection...'}
            </span>
          </div>
        )}
      </div>
      {filtered.length === 0 && (
        <div className="mt-4 rounded-2xl border border-dashed border-primary-900/20 bg-white/70 px-6 py-14 text-center">
          <Search size={24} className="mx-auto mb-3 text-primary-500" aria-hidden="true" />
          <h2 className="font-display text-2xl text-primary-900">No plants found</h2>
          <p className="mt-2 text-sm text-primary-800/65">Try another name or adjust your filters.</p>
          <button type="button" onClick={clearFilters} className="mt-5 rounded-full bg-primary-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-900">
            Clear filters
          </button>
        </div>
      )}

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
