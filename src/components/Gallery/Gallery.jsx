import { useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { GALLERY_IMAGES, GALLERY_FILTERS } from '../../constants/gallery';
import SectionTitle from '../ui/SectionTitle';
import Modal from '../ui/Modal';
import { cn } from '../../utils/helpers';

/**
 * Image Gallery — masonry grid with category filters and lightbox modal.
 */
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

      {/* Masonry Grid */}
      <div className="columns-1 xs:columns-2 md:columns-3 gap-4 md:gap-5 space-y-4 md:space-y-5">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group relative"
            onClick={() => openLightbox(image.src)}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 flex items-center justify-center">
              <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
                View
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Modal open={!!lightboxImage} onClose={closeLightbox}>
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
        >
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
              className="max-w-[90%] max-h-[90%] rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      </Modal>
    </section>
  );
}
