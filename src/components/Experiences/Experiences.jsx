import { EXPERIENCES } from '../../constants/experiences';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import SectionTitle from '../ui/SectionTitle';
import Marquee from '../ui/Marquee';
import { motion } from 'framer-motion';
import { fadeInUp, staggerChildren } from '../../utils/animations';

const tags = [
  'Organic', 'Farm-to-Table', 'Tropical', 'Pet-Friendly', 'Eco-Tourism',
  'Guided Tours', 'Fresh Juices', 'Sunset Views', 'Nature Walks', 'Infinity Pool',
  'Weekend Getaway', 'Botanical', 'Outdoor Dining', 'Relaxation', 'Wellness',
];

export default function Experiences() {
  const [ref, visible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="experiences" className="bg-primary-50/70 section-padding">
      <div className="container" ref={ref}>
        <SectionTitle center>Featured Experiences</SectionTitle>

        <Marquee items={tags} />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-8"
          variants={staggerChildren}
          initial="hidden"
          animate={visible ? 'visible' : 'hidden'}
        >
          {EXPERIENCES.map((exp) => (
            <motion.div
              key={exp.id}
              variants={fadeInUp}
              className="group bg-white rounded-xl overflow-hidden border border-black/5 shadow-card transition-all duration-300 ease-apple hover:-translate-y-1.5 hover:shadow-card-hover"
            >
              <div className="relative overflow-hidden h-40 sm:h-44">
                <img
                  src={exp.image}
                  alt={exp.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 ease-apple group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-4 sm:p-5">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                    <exp.icon size={16} className="text-primary-600" strokeWidth={1.8} />
                  </div>
                  <h4 className="text-primary-900 font-semibold text-sm">{exp.title}</h4>
                </div>
                <p className="text-primary-700/50 text-xs leading-relaxed pl-10.5">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
