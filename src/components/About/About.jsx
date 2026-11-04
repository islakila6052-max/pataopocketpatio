import { useEffect, useState } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { FEATURES } from '../../constants/events';
import SectionTitle from '../ui/SectionTitle';
import BlurReveal from '../ui/BlurReveal';
import { cn } from '../../utils/helpers';
import aboutImage from '../../assets/images/bon.jpg';
import gardenImage from '../../assets/bonsphoto/bonsphoto/thegarden.jpg';

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
              <img
                key={image}
                src={image}
                alt={index === activeImage ? 'Patao Pocket Patio & PS' : ''}
                aria-hidden={index !== activeImage}
                loading={index === 0 ? 'lazy' : 'eager'}
                className={cn(
                  'absolute inset-0 h-full w-full object-cover transition-opacity duration-700',
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
                <div className="group bg-white p-5 rounded-xl border border-black/5 shadow-card transition-all duration-300 ease-apple hover:-translate-y-1.5 hover:shadow-card-hover">
                  <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center mb-3 group-hover:bg-primary-100 transition-colors duration-200">
                    <feature.icon size={20} className="text-primary-600" strokeWidth={1.8} />
                  </div>
                  <h4 className="text-primary-900 font-semibold text-sm mb-1">{feature.title}</h4>
                  <p className="text-primary-700/50 text-xs leading-relaxed">{feature.description}</p>
                </div>
              </BlurReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
