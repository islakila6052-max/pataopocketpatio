import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import { cn } from '../../utils/helpers';

/**
 * Resort section — split layout with image and booking CTA.
 */
export default function Resort() {
  const [imgRef, imgVisible] = useScrollAnimation({ threshold: 0.2 });
  const [textRef, textVisible] = useScrollAnimation({ threshold: 0.2 });

  const handleBook = (e) => {
    e.preventDefault();
    const target = document.querySelector('#contact');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="resort" className="bg-primary-50 section-padding">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        {/* Image */}
        <div
          ref={imgRef}
          className={cn('reveal-left', imgVisible && 'visible')}
        >
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
            alt="Luxury resort pool at Patao Pocket"
            loading="lazy"
            className="rounded-2xl h-[200px] sm:h-[300px] lg:h-[400px] w-full object-cover shadow-[0_24px_50px_rgba(0,0,0,0.08)]"
          />
        </div>

        {/* Text + CTA */}
        <div
          ref={textRef}
          className={cn('reveal-right', textVisible && 'visible')}
        >
          <SectionTitle>
            Luxury Resort &amp; Garden Rooms
          </SectionTitle>
          <p className="text-lg text-primary-800/80 leading-relaxed mb-8">
            Private pool, nature views, and thoughtfully designed relaxation
            areas. Perfect for a weekend staycation or a tranquil escape from
            the everyday.
          </p>
          <a href="#contact" onClick={handleBook}>
            <Button size="lg">Book Now</Button>
          </a>
        </div>
      </div>
    </section>
  );
}
