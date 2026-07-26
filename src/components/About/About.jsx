import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FEATURES } from '../../constants/events';
import SectionTitle from '../ui/SectionTitle';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { cn } from '../../utils/helpers';

function FeatureCard({ feature, index }) {
  const [ref, visible] = useScrollAnimation({ threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 40 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white rounded-xl border border-black/[0.06] p-4 sm:p-5 transition-all duration-300 ease-apple hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden"
    >
      {/* Shimmer on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-apple" />

      <div className="relative z-10 flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors duration-300">
          <feature.icon size={20} className="text-primary-600 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.8} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold text-primary-300/60 tracking-widest uppercase">0{index + 1}</span>
            <h4 className="text-primary-900 font-semibold text-sm">{feature.title}</h4>
          </div>
          <p className="text-primary-700/50 text-xs leading-relaxed">{feature.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.05, 1]);

  return (
    <section id="about" ref={sectionRef} className="container section-padding">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Image with parallax */}
        <div className="relative overflow-hidden rounded-2xl">
          <motion.div style={{ y: imageY, scale: imageScale }} className="w-full">
            <img
              src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80"
              alt="Tropical botanical garden at Patao Pocket"
              loading="lazy"
              className="w-full h-[300px] sm:h-[400px] lg:h-[520px] object-cover"
            />
          </motion.div>
          {/* Overlay badge */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md rounded-xl px-4 py-2.5 shadow-lg border border-white/50">
            <p className="text-[10px] text-primary-500 font-semibold tracking-widest uppercase">Est. 2020</p>
            <p className="text-sm font-bold text-primary-900">Patao Pocket</p>
          </div>
        </div>

        {/* Content */}
        <div>
          <SectionTitle subtitle="A peaceful, eco-friendly nature destination for families and weekend getaways. Immerse yourself in the beauty of botanical gardens and resort living.">
            About the Sanctuary
          </SectionTitle>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-8">
            {FEATURES.map((feature, i) => (
              <FeatureCard key={feature.id} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
