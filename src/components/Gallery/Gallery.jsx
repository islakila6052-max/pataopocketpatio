import { useState, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_IMAGES, GALLERY_FILTERS } from '../../constants/gallery';
import SectionTitle from '../ui/SectionTitle';
import Modal from '../ui/Modal';
import { cn } from '../../utils/helpers';

/**
 * Image Gallery — horizontally scrollable filmstrip with category filters
 * and lightbox modal. Handles any number of photos gracefully.
 */
export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxImage, setLightboxImage] = useState(null);
  const scrollRef = useRef(null);

  const filteredImages =
    activeFilter === 'all'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeFilter);

  const openLightbox = useCallback((src) => setLightboxImage(src), []);
  const closeLightbox = useCallback(() => setLightboxImage(null), []);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.querySelector('.gallery-card');
    const cardWidth = card ? card.offsetWidth + 16 : 300; // 16 = gap
    container.scrollBy({
      left: direction * cardWidth * 2,
      behavior: 'smooth',
    });
  };

  return (
    <section id="gallery" className="section-padding">
      <div className="container">
        <SectionTitle center>Image Gallery</SectionTitle>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {GALLERY_FILTERS.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                'px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200',
                activeFilter === filter.value
                  ? 'bg-primary-800 text-white border-primary-800 shadow-green'
                  : 'bg-transparent border-primary-200 text-primary-800 hover:bg-primary-50'
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Arrow + Scroll Container */}
        <div className="relative group/row">
          {/* Left Arrow */}
          <button
            onClick={() => scroll(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-primary-100 flex items-center justify-center text-primary-700 hover:bg-white hover:shadow-xl transition-all opacity-0 group-hover/row:opacity-100 -ml-2 sm:-ml-5 cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft size={22} strokeWidth={2} />
          </button>

          {/* Scrollable Filmstrip */}
          <div
            ref={scrollRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar -mx-6 px-6"
          >
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="gallery-card flex-shrink-0 w-[70vw] max-w-[320px] sm:max-w-[360px] snap-start rounded-3xl overflow-hidden cursor-pointer group relative"
                onClick={() => openLightbox(image.src)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full h-56 sm:h-64 lg:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
                    View
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-primary-100 flex items-center justify-center text-primary-700 hover:bg-white hover:shadow-xl transition-all opacity-0 group-hover/row:opacity-100 -mr-2 sm:-mr-5 cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight size={22} strokeWidth={2} />
          </button>
        </div>

        {/* Image count */}
        <p className="text-center text-xs text-primary-400 mt-4">
          {filteredImages.length} photo{filteredImages.length !== 1 ? 's' : ''}
          {activeFilter !== 'all' && ` in "${activeFilter}"`} — scroll to explore
        </p>
      </div>

      {/* Lightbox */}
      <Modal open={!!lightboxImage} onClose={closeLightbox}>
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button
            onClick={closeLightbox}
            className="absolute top-8 right-10 text-white text-4xl opacity-70 hover:opacity-100 transition-opacity cursor-pointer bg-transparent border-none"
            aria-label="Close lightbox"
          >
            <X size={40} strokeWidth={1.5} />
          </button>
          {lightboxImage && (
            <img
              src={lightboxImage}
              alt="Gallery preview"
              className="max-w-[90%] max-h-[90%] rounded-4xl shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      </Modal>
    </section>
  );
}
