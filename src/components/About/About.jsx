import { useEffect, useState } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { FEATURES } from '../../constants/events';
import SectionTitle from '../ui/SectionTitle';
import BlurReveal from '../ui/BlurReveal';
import ImageWithFallback from '../ui/ImageWithFallback';
import { cn } from '../../utils/helpers';
import aboutImage from '../../assets/images/bon.webp';
import gardenImage from '../../assets/bonsphoto/bonsphoto/thegarden.webp';

const aboutImages = [aboutImage, gardenImage];

export default function About() {
  const [imgRef, imgVisible] = useScrollAnimation({ threshold: 0.2 });
  const [textRef, textVisible] = useScrollAnimation({ threshold: 0.2 });
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % aboutImages.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="about" className="container section-padding">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <BlurReveal className="w-full">
          <div className="relative overflow-hidden rounded-xl shadow-[0_4px_24px_rgba(27,94,32,0.10)] h-[240px] sm:h-[320px] lg:h-[480px] w-full">
            {aboutImages.map((image, index) => (
              <ImageWithFallback
                key={image}
                src={image}
                alt={index === activeImage ? 'Patao Pocket Patio & PS' : ''}
                aria-hidden={index !== activeImage}
                loading="lazy"
                decoding="async"
                className={cn(
                  'photo-crossfade absolute inset-0 h-full w-full object-cover',
                  index === activeImage ? 'opacity-100' : 'opacity-0'
                )}
              />
            ))}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
              {aboutImages.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  aria-label={`Show sanctuary photo ${index + 1}`}
                  aria-pressed={index === activeImage}
                  onClick={() => setActiveImage(index)}
                  className={cn(
                    'h-2 w-2 rounded-full transition-colors',
                    index === activeImage ? 'bg-white' : 'bg-white/50'
                  )}
                />
              ))}
            </div>
          </div>
        </BlurReveal>

        <div>
          <SectionTitle subtitle="Explore a peaceful botanical garden, discover tropical plants, and find new favorites to bring home.">
            About the Sanctuary
          </SectionTitle>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-8">
            {FEATURES.map((feature, i) => (
              <BlurReveal key={feature.id} delay={i * 100}>
                <article className="group relative isolate flex min-h-44 h-full flex-col justify-end overflow-hidden rounded-xl border border-white/10 shadow-card transition-transform duration-300 ease-apple hover:-translate-y-1.5 hover:shadow-card-hover">
                  <img
                    src={feature.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#10251d]/95 via-[#10251d]/45 to-[#10251d]/5" />
                  <div className="relative z-10 p-4 sm:p-5">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-black/20 text-white backdrop-blur-sm">
                      <feature.icon size={19} strokeWidth={1.8} />
                    </div>
                    <h4 className="mb-1 text-sm font-semibold text-white">{feature.title}</h4>
                    <p className="text-xs leading-relaxed text-white/80">{feature.description}</p>
                  </div>
                </article>
              </BlurReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
