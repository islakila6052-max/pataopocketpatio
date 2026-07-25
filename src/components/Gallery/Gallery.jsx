import { useState, useCallback } from 'react';
import { X, Image } from 'lucide-react';
import { GALLERY_IMAGES, GALLERY_FILTERS } from '../../constants/gallery';
import SectionTitle from '../ui/SectionTitle';
import Modal from '../ui/Modal';
import { cn } from '../../utils/helpers';

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
      <SectionTitle center>Image Gallery</SectionTitle>

      {/* Filters + Counter */}
      <div className="flex flex-col items-center gap-3 mb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {GALLERY_FILTERS.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                'px-4 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ease-apple',
                activeFilter === filter.value
                  ? 'bg-primary-700 text-white border-primary-700 shadow-sm'
                  : 'bg-transparent border-black/10 text-primary-700 hover:bg-primary-50 hover:border-primary-200'
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-primary-400 flex items-center gap-1.5">
          <Image size={13} strokeWidth={1.5} />
          <span>{filteredImages.length} photo{filteredImages.length !== 1 ? 's' : ''}</span>
          {activeFilter !== 'all' && (
            <span className="opacity-60">in {activeFilter}</span>
          )}
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="columns-2 md:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className="break-inside-avoid rounded-lg overflow-hidden cursor-pointer group relative"
            onClick={() => openLightbox(image.src)}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="w-full h-auto block transition-transform duration-500 ease-apple group-hover:scale-105"
            />

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-apple flex flex-col justify-end p-3 sm:p-4">
              <span className="text-white text-xs sm:text-sm font-semibold tracking-tight leading-tight">
                {image.name}
              </span>
              <span className="text-white/70 text-[11px] sm:text-xs mt-0.5 font-medium">
                {image.price}
              </span>
            </div>

            {/* Category badge (always visible, subtle) */}
            <div className="absolute top-2.5 left-2.5 z-10">
              <span className="px-2 py-0.5 rounded-md bg-black/30 backdrop-blur-sm text-white/80 text-[10px] font-medium uppercase tracking-wide">
                {image.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Modal open={!!lightboxImage} onClose={closeLightbox}>
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl transition-colors duration-200 cursor-pointer bg-transparent border-none"
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
