const bonsaiPhotos = Object.values(
  import.meta.glob('../assets/bonsphoto/bonsphoto/*.webp', {
    eager: true,
    import: 'default',
  })
);

for (let index = bonsaiPhotos.length - 1; index > 0; index -= 1) {
  const randomIndex = Math.floor(Math.random() * (index + 1));
  [bonsaiPhotos[index], bonsaiPhotos[randomIndex]] = [bonsaiPhotos[randomIndex], bonsaiPhotos[index]];
}

let galleryPlantIndex = 0;
const createBonsaiImages = (count) => {
  const images = Array.from(
    { length: count },
    (_, index) => bonsaiPhotos[(galleryPlantIndex + index) % bonsaiPhotos.length]
  );
  galleryPlantIndex += 1;
  return images;
};

export const GALLERY_IMAGES = [
  // INDOOR
  { id: 1, images: createBonsaiImages(8), name: 'Snake Plant', scientific: 'Sansevieria trifasciata', price: '₱350', care: 'Easy', light: 'Low Light', category: 'indoor', petSafe: false },
  { id: 2, images: createBonsaiImages(8), name: 'ZZ Plant', scientific: 'Zamioculcas zamiifolia', price: '₱480', care: 'Easy', light: 'Low Light', category: 'indoor', petSafe: false },
  { id: 3, images: createBonsaiImages(4), name: 'Peace Lily', scientific: 'Spathiphyllum wallisii', price: '₱550', care: 'Easy', light: 'Low Light', category: 'indoor', petSafe: false },
  { id: 4, images: createBonsaiImages(5), name: 'Golden Pothos', scientific: 'Epipremnum aureum', price: '₱280', care: 'Easy', light: 'Low Light', category: 'indoor', petSafe: false },
  { id: 5, images: createBonsaiImages(3), name: 'Chinese Evergreen', scientific: 'Aglaonema commutatum', price: '₱380', care: 'Easy', light: 'Low Light', category: 'indoor', petSafe: false },
  { id: 6, images: createBonsaiImages(5), name: 'Nerve Plant', scientific: 'Fittonia albivenis', price: '₱180', care: 'Easy', light: 'Indirect Light', category: 'indoor', petSafe: true },
  { id: 7, images: createBonsaiImages(3), name: 'African Violet', scientific: 'Saintpaulia ionantha', price: '₱240', care: 'Moderate', light: 'Indirect Light', category: 'indoor', petSafe: true },
  { id: 8, images: createBonsaiImages(7), name: 'Hoya Carnosa', scientific: 'Hoya carnosa', price: '₱370', care: 'Easy', light: 'Bright Light', category: 'indoor', petSafe: true },

  // MARCOTTED TREES
  { id: 9, images: createBonsaiImages(4), name: 'Marcotted Calamansi', scientific: 'Citrus microcarpa (marcot)', price: '₱450', care: 'Easy', light: 'Bright Light', category: 'marcotted', petSafe: true },
  { id: 10, images: createBonsaiImages(3), name: 'Marcotted Mango', scientific: 'Mangifera indica (marcot)', price: '₱680', care: 'Easy', light: 'Bright Light', category: 'marcotted', petSafe: true },
  { id: 11, images: createBonsaiImages(2), name: 'Marcotted Lemon', scientific: 'Citrus limon (marcot)', price: '₱520', care: 'Easy', light: 'Bright Light', category: 'marcotted', petSafe: true },
  { id: 12, images: createBonsaiImages(4), name: 'Marcotted Guyabano', scientific: 'Annona muricata (marcot)', price: '₱550', care: 'Easy', light: 'Bright Light', category: 'marcotted', petSafe: true },
  { id: 13, images: createBonsaiImages(5), name: 'Marcotted Avocado', scientific: 'Persea americana (marcot)', price: '₱750', care: 'Moderate', light: 'Bright Light', category: 'marcotted', petSafe: false },
  { id: 14, images: createBonsaiImages(2), name: 'Marcotted Chico', scientific: 'Manilkara zapota (marcot)', price: '₱480', care: 'Easy', light: 'Bright Light', category: 'marcotted', petSafe: true },
  { id: 15, images: createBonsaiImages(4), name: 'Marcotted Rambutan', scientific: 'Nephelium lappaceum (marcot)', price: '₱600', care: 'Moderate', light: 'Bright Light', category: 'marcotted', petSafe: true },
  { id: 16, images: createBonsaiImages(3), name: 'Marcotted Lanzones', scientific: 'Lansium domesticum (marcot)', price: '₱580', care: 'Moderate', light: 'Bright Light', category: 'marcotted', petSafe: true },

  // GRAFTED TREES (abbreviated - same pattern)
  { id: 17, images: createBonsaiImages(4), name: 'Grafted Mango', scientific: 'Mangifera indica (grafted)', price: '₱850', care: 'Easy', light: 'Bright Light', category: 'grafted', petSafe: true },
  { id: 18, images: createBonsaiImages(3), name: 'Grafted Avocado', scientific: 'Persea americana (grafted)', price: '₱950', care: 'Moderate', light: 'Bright Light', category: 'grafted', petSafe: false },
  { id: 19, images: createBonsaiImages(2), name: 'Grafted Jackfruit', scientific: 'Artocarpus heterophyllus', price: '₱780', care: 'Easy', light: 'Bright Light', category: 'grafted', petSafe: true },
  { id: 20, images: createBonsaiImages(3), name: 'Grafted Duhat', scientific: 'Syzygium cumini (grafted)', price: '₱650', care: 'Easy', light: 'Bright Light', category: 'grafted', petSafe: true },
  { id: 21, images: createBonsaiImages(2), name: 'Grafted Pomelo', scientific: 'Citrus maxima (grafted)', price: '₱720', care: 'Easy', light: 'Bright Light', category: 'grafted', petSafe: true },
  { id: 22, images: createBonsaiImages(3), name: 'Grafted Atis', scientific: 'Annona squamosa (grafted)', price: '₱590', care: 'Easy', light: 'Bright Light', category: 'grafted', petSafe: true },
  { id: 23, images: createBonsaiImages(2), name: 'Grafted Caimito', scientific: 'Chrysophyllum cainito (grafted)', price: '₱680', care: 'Moderate', light: 'Bright Light', category: 'grafted', petSafe: true },
  { id: 24, images: createBonsaiImages(2), name: 'Grafted Santol', scientific: 'Sandoricum koetjape (grafted)', price: '₱550', care: 'Easy', light: 'Bright Light', category: 'grafted', petSafe: true },

  // EASY CARE
  { id: 25, images: createBonsaiImages(3), name: 'Echeveria', scientific: 'Echeveria elegans', price: '₱150', care: 'Easy', light: 'Bright Light', category: 'easy', petSafe: true },
  { id: 26, images: createBonsaiImages(2), name: 'Aloe Vera', scientific: 'Aloe barbadensis', price: '₱180', care: 'Easy', light: 'Bright Light', category: 'easy', petSafe: false },
  { id: 27, images: createBonsaiImages(3), name: 'Barrel Cactus', scientific: 'Echinocactus grusonii', price: '₱220', care: 'Easy', light: 'Bright Light', category: 'easy', petSafe: true },
  { id: 28, images: createBonsaiImages(2), name: 'Jade Plant', scientific: 'Crassula ovata', price: '₱250', care: 'Easy', light: 'Bright Light', category: 'easy', petSafe: false },
  { id: 29, images: createBonsaiImages(3), name: 'String of Pearls', scientific: 'Senecio rowleyanus', price: '₱320', care: 'Easy', light: 'Bright Light', category: 'easy', petSafe: false },
  { id: 30, images: createBonsaiImages(2), name: "Burro's Tail", scientific: 'Sedum morganianum', price: '₱280', care: 'Easy', light: 'Bright Light', category: 'easy', petSafe: true },
  { id: 31, images: createBonsaiImages(3), name: 'Ponytail Palm', scientific: 'Beaucarnea recurvata', price: '₱580', care: 'Easy', light: 'Bright Light', category: 'easy', petSafe: true },
  { id: 32, images: createBonsaiImages(3), name: 'Cast Iron Plant', scientific: 'Aspidistra elatior', price: '₱520', care: 'Easy', light: 'Low Light', category: 'easy', petSafe: true },

  // OUTDOOR & FRUIT
  { id: 33, images: createBonsaiImages(2), name: 'Fruiting Calamansi', scientific: 'Citrus microcarpa', price: '₱350', care: 'Easy', light: 'Bright Light', category: 'outdoor', petSafe: true },
  { id: 34, images: createBonsaiImages(2), name: 'Dwarf Coconut', scientific: 'Cocos nucifera (dwarf)', price: '₱1,200', care: 'Easy', light: 'Bright Light', category: 'outdoor', petSafe: true },
  { id: 35, images: createBonsaiImages(3), name: 'Fiddle Leaf Fig', scientific: 'Ficus lyrata', price: '₱1,200', care: 'Moderate', light: 'Bright Light', category: 'outdoor', petSafe: false },
  { id: 36, images: createBonsaiImages(2), name: 'Bird of Paradise', scientific: 'Strelitzia reginae', price: '₱1,500', care: 'Moderate', light: 'Bright Light', category: 'outdoor', petSafe: false },
  { id: 37, images: createBonsaiImages(2), name: 'Papaya Tree', scientific: 'Carica papaya', price: '₱250', care: 'Easy', light: 'Bright Light', category: 'outdoor', petSafe: true },
  { id: 38, images: createBonsaiImages(3), name: 'Banana Plant', scientific: 'Musa acuminata', price: '₱300', care: 'Easy', light: 'Bright Light', category: 'outdoor', petSafe: true },
  { id: 39, images: createBonsaiImages(2), name: 'Bougainvillea', scientific: 'Bougainvillea spectabilis', price: '₱380', care: 'Easy', light: 'Bright Light', category: 'outdoor', petSafe: true },
  { id: 40, images: createBonsaiImages(2), name: 'Hibiscus', scientific: 'Hibiscus rosa-sinensis', price: '₱280', care: 'Easy', light: 'Bright Light', category: 'outdoor', petSafe: true },
  { id: 41, images: createBonsaiImages(2), name: 'Dracaena', scientific: 'Dracaena marginata', price: '₱650', care: 'Easy', light: 'Low Light', category: 'indoor', petSafe: false },
  { id: 42, images: createBonsaiImages(2), name: 'Philodendron', scientific: 'Philodendron hederaceum', price: '₱420', care: 'Easy', light: 'Low Light', category: 'indoor', petSafe: false },
  { id: 43, images: createBonsaiImages(3), name: 'Spider Plant', scientific: 'Chlorophytum comosum', price: '₱200', care: 'Easy', light: 'Indirect Light', category: 'indoor', petSafe: true },
  { id: 44, images: createBonsaiImages(2), name: 'Polka Dot Plant', scientific: 'Hypoestes phyllostachya', price: '₱190', care: 'Easy', light: 'Indirect Light', category: 'indoor', petSafe: true },
  { id: 45, images: createBonsaiImages(2), name: 'Sampaguita', scientific: 'Jasminum sambac', price: '₱200', care: 'Easy', light: 'Bright Light', category: 'outdoor', petSafe: true },
  { id: 46, images: createBonsaiImages(2), name: 'Gumamela', scientific: 'Hibiscus rosa-sinensis', price: '₱150', care: 'Easy', light: 'Bright Light', category: 'outdoor', petSafe: true },
  { id: 47, images: createBonsaiImages(2), name: 'Aratiles Tree', scientific: 'Muntingia calabura', price: '₱350', care: 'Easy', light: 'Bright Light', category: 'outdoor', petSafe: true },
  { id: 48, images: createBonsaiImages(2), name: 'Bayabas', scientific: 'Psidium guajava', price: '₱280', care: 'Easy', light: 'Bright Light', category: 'outdoor', petSafe: true },
  { id: 49, images: createBonsaiImages(2), name: 'Siling Labuyo', scientific: 'Capsicum frutescens', price: '₱80', care: 'Easy', light: 'Bright Light', category: 'outdoor', petSafe: true },
  { id: 50, images: createBonsaiImages(2), name: 'Malunggay', scientific: 'Moringa oleifera', price: '₱120', care: 'Easy', light: 'Bright Light', category: 'outdoor', petSafe: true },
];

export const GALLERY_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'indoor', label: 'Indoor' },
  { value: 'marcotted', label: 'Marcotted Trees' },
  { value: 'grafted', label: 'Grafted Trees' },
  { value: 'easy', label: 'Easy Care' },
  { value: 'outdoor', label: 'Outdoor & Fruit' },
];
