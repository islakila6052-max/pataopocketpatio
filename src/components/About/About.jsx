import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { FEATURES } from '../../constants/events';
import SectionTitle from '../ui/SectionTitle';
import { cn } from '../../utils/helpers';

/**
 * About section — two-column layout with feature cards using Lucide icons.
 * Uses reveal-left / reveal-right scroll animations on the image and text columns.
 */
export default function About() {
  const [imgRef, imgVisible] = useScrollAnimation({ threshold: 0.2 });
  const [textRef, textVisible] = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="about" className="container section-padding">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">
        {/* Image */}
        <div
          ref={imgRef}
          className={cn('reveal-left', imgVisible && 'visible')}
        >
          <img
            src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80"
            alt="Tropical botanical garden at Patao Pocket Sanctuary"
            loading="lazy"
            className="rounded-5xl shadow-[0_30px_60px_rgba(27,94,32,0.15)] h-[300px] sm:h-[400px] lg:h-[480px] w-full object-cover"
          />
        </div>

        {/* Text + Feature Cards */}
        <div
          ref={textRef}
          className={cn('reveal-right', textVisible && 'visible')}
        >
          <SectionTitle subtitle="A peaceful, eco-friendly nature destination for families and weekend getaways. Immerse yourself in the beauty of botanical gardens and resort living.">
            About the Sanctuary
          </SectionTitle>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
            {FEATURES.map((feature) => (
              <div
                key={feature.id}
                className="bg-white p-6 rounded-4xl shadow-card border border-primary-100/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover group"
              >
                <div className="w-11 h-11 rounded-2xl bg-primary-50 flex items-center justify-center mb-3 group-hover:bg-primary-100 transition-colors">
                  <feature.icon
                    size={22}
                    className="text-primary-700"
                    strokeWidth={1.8}
                  />
                </div>
                <h4 className="text-primary-900 font-semibold text-base mb-1">
                  {feature.title}
                </h4>
                <p className="text-primary-700/70 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
