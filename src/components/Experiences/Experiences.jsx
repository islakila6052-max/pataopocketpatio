import { EXPERIENCES } from '../../constants/experiences';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import SectionTitle from '../ui/SectionTitle';
import Marquee from '../ui/Marquee';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { fadeInUp, staggerChildren } from '../../utils/animations';

const tags = [
  'Botanical Garden', 'Tropical Plants', 'BBQ & Grill', 'Garden Dining',
  'Cold Drinks', 'Beer for Adults', 'Karaoke', 'Night Lights',
];

export default function Experiences() {
  const [ref, visible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="experiences" className="bg-primary-50/70 section-padding">
      <div className="container" ref={ref}>
        <SectionTitle
          center
          subtitle="Explore the garden, enjoy a laid-back meal, and stay a little longer for karaoke and glowing garden lights."
        >
          Garden Days, Great Evenings
        </SectionTitle>

        <Marquee items={tags} />

        <p className="mb-2 flex items-center justify-end gap-1 text-xs font-medium text-primary-700/60 sm:hidden">
          Swipe to explore <ChevronRight size={14} aria-hidden="true" />
        </p>
        <motion.div
          className="-mx-5 mt-2 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 hide-scrollbar sm:mx-0 sm:mt-8 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
          variants={staggerChildren}
          initial="hidden"
          animate={visible ? 'visible' : 'hidden'}
        >
          {EXPERIENCES.map((exp) => (
            <motion.div
              key={exp.id}
              variants={fadeInUp}
              className="group w-[82vw] max-w-[330px] flex-shrink-0 snap-start overflow-hidden rounded-2xl border border-primary-900/10 bg-white shadow-card transition-all duration-300 ease-apple hover:-translate-y-1.5 hover:shadow-card-hover sm:w-auto sm:max-w-none"
            >
              <div className="relative h-40 overflow-hidden sm:h-48">
                <img
                  src={exp.image}
                  alt={exp.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-apple group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent transition-colors duration-300 group-hover:from-black/40" />
              </div>

              <div className="p-4 sm:p-5">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-50">
                    <exp.icon size={16} className="text-primary-600" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-sm font-semibold text-primary-900">{exp.title}</h3>
                </div>
                <p className="pl-11 text-xs leading-relaxed text-primary-700/60">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
