import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GALLERY_IMAGES } from '../../constants/gallery';

const samplePlants = [GALLERY_IMAGES[0], GALLERY_IMAGES[8], GALLERY_IMAGES[25]];

export default function CardStack() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link to="/gallery" className="block relative w-full max-w-[300px] sm:max-w-[360px] h-[280px] sm:h-[340px] mx-auto"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {samplePlants.map((plant, i) => (
        <motion.div key={plant.id}
          className="absolute top-0 left-0 right-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden shadow-2xl"
          style={{ zIndex: 3 - i }}
          animate={{
            rotate: hovered ? [3 - i, (i * 8) - 4] : [3 - i, 3 - i],
            x: hovered ? [0, i * 40 - 20] : [0, 0],
            y: hovered ? [0, i * 8 - 4] : [0, 0],
            scale: hovered ? [1, 1 + i * 0.03] : [1, 1],
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="aspect-[4/3] overflow-hidden">
            <img src={plant.images[0]} alt={plant.name}
              className="w-full h-full object-cover" />
          </div>
          <div className="p-3 sm:p-4">
            <p className="text-white text-sm font-semibold tracking-tight">{plant.name}</p>
            <p className="text-white/50 text-xs mt-0.5">{plant.price}</p>
          </div>
        </motion.div>
      ))}

      {/* CTA overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <span className="bg-white/20 backdrop-blur-md text-white text-sm font-semibold px-6 py-3 rounded-xl border border-white/30 shadow-xl">
          Browse Collection →
        </span>
      </motion.div>
    </Link>
  );
}
