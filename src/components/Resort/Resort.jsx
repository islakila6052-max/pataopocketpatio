import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useBooking } from '../../context/BookingContext';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import { cn } from '../../utils/helpers';

export default function Resort() {
  const [imgRef, imgVisible] = useScrollAnimation({ threshold: 0.2 });
  const [textRef, textVisible] = useScrollAnimation({ threshold: 0.2 });
  const { open: openBooking } = useBooking();

  return (
    <section id="resort" className="bg-primary-50/70 section-padding">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <div ref={imgRef} className={cn('reveal-left', imgVisible && 'visible')}>
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
            alt="Luxury resort pool at Patao Pocket"
            loading="lazy"
            className="rounded-xl h-[200px] sm:h-[300px] lg:h-[400px] w-full object-cover shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
          />
        </div>
        <div ref={textRef} className={cn('reveal-right', textVisible && 'visible')}>
          <SectionTitle>Luxury Resort &amp; Garden Rooms</SectionTitle>
          <p className="text-sm sm:text-base text-primary-700/60 leading-relaxed mb-6">
            Private pool, nature views, and thoughtfully designed relaxation areas. Perfect for a weekend staycation or a tranquil escape.
          </p>
          <Button onClick={openBooking} size="lg">Book Now</Button>
        </div>
      </div>
    </section>
  );
}
