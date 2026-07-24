import { EXPERIENCES } from '../../constants/experiences';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import SectionTitle from '../ui/SectionTitle';
import { cn } from '../../utils/helpers';
import { motion } from 'framer-motion';
import { fadeInUp, staggerChildren } from '../../utils/animations';

/**
 * Featured Experiences — responsive card grid with images and Lucide icons.
 */
export default function Experiences() {
  const [ref, visible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="experiences" className="bg-primary-50 section-padding">
      <div className="container" ref={ref}>
        <SectionTitle center>
          Featured Experiences
        </SectionTitle>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10"
          variants={staggerChildren}
          initial="hidden"
          animate={visible ? 'visible' : 'hidden'}
        >
          {EXPERIENCES.map((exp) => (
            <motion.div
              key={exp.id}
              variants={fadeInUp}
              className="bg-white rounded-2xl overflow-hidden shadow-exp border border-primary-100/20 transition-all duration-300 hover:-translate-y-3 hover:shadow-exp-hover group"
            >
              <div className="relative overflow-hidden h-44 sm:h-48">
                <img
                  src={exp.image}
                  alt={exp.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                    <exp.icon
                      size={18}
                      className="text-primary-700"
                      strokeWidth={1.8}
                    />
                  </div>
                  <h4 className="text-primary-900 font-semibold text-lg">
                    {exp.title}
                  </h4>
                </div>
                <p className="text-primary-700/70 text-sm leading-relaxed pl-12">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
