import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { FEATURES } from '../../constants/events';
import SectionTitle from '../ui/SectionTitle';
import BlurReveal from '../ui/BlurReveal';
import { cn } from '../../utils/helpers';
import aboutImage from '../../assets/images/bon.jpg';

export default function About() {
  const [imgRef, imgVisible] = useScrollAnimation({ threshold: 0.2 });
  const [textRef, textVisible] = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="about" className="container section-padding">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <BlurReveal className="w-full">
          <img
            src={aboutImage}
            alt="Patao Pocket Patio & PS"
            loading="lazy"
            className="rounded-xl shadow-[0_4px_24px_rgba(27,94,32,0.10)] h-[240px] sm:h-[320px] lg:h-[480px] w-full object-cover"
          />
        </BlurReveal>

        <div>
          <SectionTitle subtitle="A peaceful, eco-friendly nature destination for families and weekend getaways. Immerse yourself in the beauty of botanical gardens and resort living.">
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
