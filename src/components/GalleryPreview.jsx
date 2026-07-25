import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { GALLERY_IMAGES } from '../constants/gallery';
import SectionTitle from './ui/SectionTitle';
import Button from './ui/Button';

const previewPlants = [
  GALLERY_IMAGES[0],  // Snake Plant
  GALLERY_IMAGES[8],  // Marcotted Calamansi
  GALLERY_IMAGES[25], // Echeveria
  GALLERY_IMAGES[33], // Fruiting Calamansi
  GALLERY_IMAGES[41], // Dracaena
];

export default function GalleryPreview() {
  return (
    <section className="container section-padding">
      <SectionTitle center subtitle="Hand-picked favorites from our collection. Visit the full gallery to see all 50+ plants.">
        Browse Our Plants
      </SectionTitle>

      {/* Preview Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8 content-auto">
        {previewPlants.map((plant) => (
          <Link to="/gallery" key={plant.id}
            className="group bg-white rounded-xl border border-neutral-100 overflow-hidden transition-all duration-300 ease-apple hover:-translate-y-1 hover:shadow-lg hover:shadow-neutral-200/50">
            <div className="aspect-[3/4] overflow-hidden">
              <img src={plant.images[0]} alt={plant.name} loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-apple group-hover:scale-105" />
            </div>
            <div className="p-2.5 sm:p-3">
              <h3 className="text-[13px] sm:text-sm font-semibold text-neutral-900 tracking-tight truncate">{plant.name}</h3>
              <p className="text-[11px] text-neutral-400 mt-0.5">{plant.price}</p>
              <div className="flex items-center gap-1 mt-1.5 text-[11px] text-primary-600 font-medium group-hover:text-primary-800 transition-colors">
                <ShoppingBag size={12} />
                <span>View</span>
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link to="/gallery">
          <Button size="lg" className="!px-10">Browse Collection →</Button>
        </Link>
      </div>
    </section>
  );
}
