import { useState, useCallback } from 'react';
import { X, Image } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_IMAGES, GALLERY_FILTERS } from '../../constants/gallery';
import SectionTitle from '../ui/SectionTitle';
import Modal from '../ui/Modal';
import { cn } from '../../utils/helpers';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] },
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

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxImage, setLightboxImage] = useState(null);

  const filteredImages =
    activeFilter === 'all'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeFilter);

  const openLightbox = useCallback((src) => setLightboxImage(src), []);
  const closeLightbox = useCallback(() => setLightboxImage(null), []);

  return (
    <section id="gallery" className="container section-padding">
      <SectionTitle center>Plant Collection</SectionTitle>

      {/* Filters + Counter */}
      <div className="flex flex-col items-center gap-3 mb-8">
        <div className="flex flex-wrap gap-1.5 justify-center bg-gray-100/60 p-1 rounded-xl">
          {GALLERY_FILTERS.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                'px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-300 ease-apple',
                activeFilter === filter.value
                  ? 'bg-white text-primary-900 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700 hover:bg-white/50'
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-neutral-400 flex items-center gap-1.5">
          <Image size={13} strokeWidth={1.5} />
          <span>{filteredImages.length} plant{filteredImages.length !== 1 ? 's' : ''}</span>
          {activeFilter !== 'all' && (
            <span className="opacity-60">· {GALLERY_FILTERS.find(f => f.value === activeFilter)?.label}</span>
          )}
        </p>
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5"
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((image, i) => (
            <motion.div
              key={image.id}
              layout
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={i}
              className="group bg-white rounded-xl border border-neutral-100 overflow-hidden cursor-pointer transition-all duration-300 ease-apple hover:-translate-y-1 hover:shadow-lg hover:shadow-neutral-200/50"
              onClick={() => openLightbox(image.src)}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-neutral-100">
                <img
                  src={image.src}
                  alt={image.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 ease-apple group-hover:scale-105"
                />

                {/* Top Badges */}
                <div className="absolute top-2 left-2 flex gap-1.5 flex-wrap">
                  <span className={cn('px-1.5 py-0.5 rounded-md text-[10px] font-medium border', careColors[image.care] || careColors['Moderate'])}>
                    {image.care}
                  </span>
                  <span className={cn('px-1.5 py-0.5 rounded-md text-[10px] font-medium border', lightColors[image.light] || lightColors['Indirect Light'])}>
                    {image.light}
                  </span>
                </div>

                {/* Pet-safe badge */}
                {image.petSafe && (
                  <div className="absolute top-2 right-2">
                    <span className="px-1.5 py-0.5 rounded-md bg-green-100 text-green-700 text-[10px] font-medium border border-green-200">
                      🐾 Safe
                    </span>
                  </div>
                )}
              </div>

              {/* Card Info */}
              <div className="p-3 sm:p-3.5">
                <h3 className="text-sm font-semibold text-neutral-900 tracking-tight leading-tight">
                  {image.name}
                </h3>
                <p className="text-[11px] text-neutral-400 italic mt-0.5 truncate">
                  {image.scientific}
                </p>
                <div className="flex items-center justify-between mt-2.5">
                  <span className="text-sm font-bold text-primary-700">
                    {image.price}
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); openLightbox(image.src); }}
                    className="text-[11px] font-medium text-primary-600 hover:text-primary-800 transition-colors duration-200 cursor-pointer bg-transparent border-none"
                  >
                    View →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <Modal open={!!lightboxImage} onClose={closeLightbox}>
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl transition-colors duration-200 cursor-pointer bg-transparent border-none z-10"
            aria-label="Close lightbox"
          >
            <X size={32} strokeWidth={1.5} />
          </button>
          {lightboxImage && (
            <img
              src={lightboxImage}
              alt="Gallery preview"
              className="max-w-[92%] max-h-[92%] rounded-lg shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      </Modal>
    </section>
  );
}
