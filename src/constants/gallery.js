export const GALLERY_IMAGES = [
  // INDOOR
  { id: 1, src: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&q=80', name: 'Snake Plant', scientific: 'Sansevieria trifasciata', price: '₱350', care: 'Easy', light: 'Low Light', category: 'indoor', petSafe: false },
  { id: 2, src: 'https://images.unsplash.com/photo-1604061986761-d9d0cc6899ca?w=400&q=80', name: 'ZZ Plant', scientific: 'Zamioculcas zamiifolia', price: '₱480', care: 'Easy', light: 'Low Light', category: 'indoor', petSafe: false },
  { id: 3, src: 'https://images.unsplash.com/photo-1614594975525-e4518f81f771?w=400&q=80', name: 'Peace Lily', scientific: 'Spathiphyllum wallisii', price: '₱550', care: 'Easy', light: 'Low Light', category: 'indoor', petSafe: false },
  { id: 4, src: 'https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=400&q=80', name: 'Golden Pothos', scientific: 'Epipremnum aureum', price: '₱280', care: 'Easy', light: 'Low Light', category: 'indoor', petSafe: false },
  { id: 5, src: 'https://images.unsplash.com/photo-1592150621744-aca64f7ef8f8?w=400&q=80', name: 'Chinese Evergreen', scientific: 'Aglaonema commutatum', price: '₱380', care: 'Easy', light: 'Low Light', category: 'indoor', petSafe: false },
  { id: 6, src: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400&q=80', name: 'Nerve Plant', scientific: 'Fittonia albivenis', price: '₱180', care: 'Easy', light: 'Indirect Light', category: 'indoor', petSafe: true },
  { id: 7, src: 'https://images.unsplash.com/photo-1567449303078-57ad995bd17a?w=400&q=80', name: 'African Violet', scientific: 'Saintpaulia ionantha', price: '₱240', care: 'Moderate', light: 'Indirect Light', category: 'indoor', petSafe: true },
  { id: 8, src: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7363?w=400&q=80', name: 'Hoya Carnosa', scientific: 'Hoya carnosa', price: '₱370', care: 'Easy', light: 'Bright Light', category: 'indoor', petSafe: true },

  // MARCOTTED TREES
  { id: 9, src: 'https://images.unsplash.com/photo-1598760121023-51a99f8f5f1e?w=400&q=80', name: 'Marcotted Calamansi', scientific: 'Citrus microcarpa (marcot)', price: '₱450', care: 'Easy', light: 'Bright Light', category: 'marcotted', petSafe: true },
  { id: 10, src: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&q=80', name: 'Marcotted Mango', scientific: 'Mangifera indica (marcot)', price: '₱680', care: 'Easy', light: 'Bright Light', category: 'marcotted', petSafe: true },
  { id: 11, src: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&q=80', name: 'Marcotted Lemon', scientific: 'Citrus limon (marcot)', price: '₱520', care: 'Easy', light: 'Bright Light', category: 'marcotted', petSafe: true },
  { id: 12, src: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=400&q=80', name: 'Marcotted Guyabano', scientific: 'Annona muricata (marcot)', price: '₱550', care: 'Easy', light: 'Bright Light', category: 'marcotted', petSafe: true },
  { id: 13, src: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&q=80', name: 'Marcotted Avocado', scientific: 'Persea americana (marcot)', price: '₱750', care: 'Moderate', light: 'Bright Light', category: 'marcotted', petSafe: false },
  { id: 14, src: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400&q=80', name: 'Marcotted Chico', scientific: 'Manilkara zapota (marcot)', price: '₱480', care: 'Easy', light: 'Bright Light', category: 'marcotted', petSafe: true },
  { id: 15, src: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=80', name: 'Marcotted Rambutan', scientific: 'Nephelium lappaceum (marcot)', price: '₱600', care: 'Moderate', light: 'Bright Light', category: 'marcotted', petSafe: true },
  { id: 16, src: 'https://images.unsplash.com/photo-1597714026720-8f74c62310ba?w=400&q=80', name: 'Marcotted Lanzones', scientific: 'Lansium domesticum (marcot)', price: '₱580', care: 'Moderate', light: 'Bright Light', category: 'marcotted', petSafe: true },

  // GRAFTED TREES
  { id: 17, src: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=400&q=80', name: 'Grafted Mango', scientific: 'Mangifera indica (grafted)', price: '₱850', care: 'Easy', light: 'Bright Light', category: 'grafted', petSafe: true },
  { id: 18, src: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&q=80', name: 'Grafted Avocado', scientific: 'Persea americana (grafted)', price: '₱950', care: 'Moderate', light: 'Bright Light', category: 'grafted', petSafe: false },
  { id: 19, src: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&q=80', name: 'Grafted Jackfruit', scientific: 'Artocarpus heterophyllus', price: '₱780', care: 'Easy', light: 'Bright Light', category: 'grafted', petSafe: true },
  { id: 20, src: 'https://images.unsplash.com/photo-1602584386319-f4f9eeea8a5a?w=400&q=80', name: 'Grafted Duhat', scientific: 'Syzygium cumini (grafted)', price: '₱650', care: 'Easy', light: 'Bright Light', category: 'grafted', petSafe: true },
  { id: 21, src: 'https://images.unsplash.com/photo-1582541015812-39559f3a0e31?w=400&q=80', name: 'Grafted Pomelo', scientific: 'Citrus maxima (grafted)', price: '₱720', care: 'Easy', light: 'Bright Light', category: 'grafted', petSafe: true },
  { id: 22, src: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=400&q=80', name: 'Grafted Atis', scientific: 'Annona squamosa (grafted)', price: '₱590', care: 'Easy', light: 'Bright Light', category: 'grafted', petSafe: true },
  { id: 23, src: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=80', name: 'Grafted Caimito', scientific: 'Chrysophyllum cainito (grafted)', price: '₱680', care: 'Moderate', light: 'Bright Light', category: 'grafted', petSafe: true },
  { id: 24, src: 'https://images.unsplash.com/photo-1579613832111-ac7dfcc7723f?w=400&q=80', name: 'Grafted Santol', scientific: 'Sandoricum koetjape (grafted)', price: '₱550', care: 'Easy', light: 'Bright Light', category: 'grafted', petSafe: true },

  // EASY CARE
  { id: 25, src: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=400&q=80', name: 'Echeveria', scientific: 'Echeveria elegans', price: '₱150', care: 'Easy', light: 'Bright Light', category: 'easy', petSafe: true },
  { id: 26, src: 'https://images.unsplash.com/photo-1520302630590-fd1c66edc19d?w=400&q=80', name: 'Aloe Vera', scientific: 'Aloe barbadensis', price: '₱180', care: 'Easy', light: 'Bright Light', category: 'easy', petSafe: false },
  { id: 27, src: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&q=80', name: 'Barrel Cactus', scientific: 'Echinocactus grusonii', price: '₱220', care: 'Easy', light: 'Bright Light', category: 'easy', petSafe: true },
  { id: 28, src: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400&q=80', name: 'Jade Plant', scientific: 'Crassula ovata', price: '₱250', care: 'Easy', light: 'Bright Light', category: 'easy', petSafe: false },
  { id: 29, src: 'https://images.unsplash.com/photo-1551893000-4d1a2ac0dc9c?w=400&q=80', name: 'String of Pearls', scientific: 'Senecio rowleyanus', price: '₱320', care: 'Easy', light: 'Bright Light', category: 'easy', petSafe: false },
  { id: 30, src: 'https://images.unsplash.com/photo-1509423350716-9d93d7b91bdc?w=400&q=80', name: 'Burro\'s Tail', scientific: 'Sedum morganianum', price: '₱280', care: 'Easy', light: 'Bright Light', category: 'easy', petSafe: true },
  { id: 31, src: 'https://images.unsplash.com/photo-1620104802910-81a01cb64a71?w=400&q=80', name: 'Ponytail Palm', scientific: 'Beaucarnea recurvata', price: '₱580', care: 'Easy', light: 'Bright Light', category: 'easy', petSafe: true },
  { id: 32, src: 'https://images.unsplash.com/photo-1593697972643-b1b6ef8fa810?w=400&q=80', name: 'Cast Iron Plant', scientific: 'Aspidistra elatior', price: '₱520', care: 'Easy', light: 'Low Light', category: 'easy', petSafe: true },

  // OUTDOOR & FRUIT
  { id: 33, src: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400&q=80', name: 'Fruiting Calamansi', scientific: 'Citrus microcarpa', price: '₱350', care: 'Easy', light: 'Bright Light', category: 'outdoor', petSafe: true },
  { id: 34, src: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=400&q=80', name: 'Dwarf Coconut', scientific: 'Cocos nucifera (dwarf)', price: '₱1,200', care: 'Easy', light: 'Bright Light', category: 'outdoor', petSafe: true },
  { id: 35, src: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80', name: 'Fiddle Leaf Fig', scientific: 'Ficus lyrata', price: '₱1,200', care: 'Moderate', light: 'Bright Light', category: 'outdoor', petSafe: false },
  { id: 36, src: 'https://images.unsplash.com/photo-1601370690183-1e543b0b9e6c?w=400&q=80', name: 'Bird of Paradise', scientific: 'Strelitzia reginae', price: '₱1,500', care: 'Moderate', light: 'Bright Light', category: 'outdoor', petSafe: false },
  { id: 37, src: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=400&q=80', name: 'Papaya Tree', scientific: 'Carica papaya', price: '₱250', care: 'Easy', light: 'Bright Light', category: 'outdoor', petSafe: true },
  { id: 38, src: 'https://images.unsplash.com/photo-1603833665958-4ba5ebce16cd?w=400&q=80', name: 'Banana Plant', scientific: 'Musa acuminata', price: '₱300', care: 'Easy', light: 'Bright Light', category: 'outdoor', petSafe: true },
  { id: 39, src: 'https://images.unsplash.com/photo-1562625264-891159b2673a?w=400&q=80', name: 'Bougainvillea', scientific: 'Bougainvillea spectabilis', price: '₱380', care: 'Easy', light: 'Bright Light', category: 'outdoor', petSafe: true },
  { id: 40, src: 'https://images.unsplash.com/photo-1597826368522-9f4cb5a6ba48?w=400&q=80', name: 'Hibiscus', scientific: 'Hibiscus rosa-sinensis', price: '₱280', care: 'Easy', light: 'Bright Light', category: 'outdoor', petSafe: true },

  // MORE INDOOR
  { id: 41, src: 'https://images.unsplash.com/photo-1614594803489-ded340ea0a43?w=400&q=80', name: 'Dracaena', scientific: 'Dracaena marginata', price: '₱650', care: 'Easy', light: 'Low Light', category: 'indoor', petSafe: false },
  { id: 42, src: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=400&q=80', name: 'Philodendron', scientific: 'Philodendron hederaceum', price: '₱420', care: 'Easy', light: 'Low Light', category: 'indoor', petSafe: false },
  { id: 43, src: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400&q=80', name: 'Spider Plant', scientific: 'Chlorophytum comosum', price: '₱200', care: 'Easy', light: 'Indirect Light', category: 'indoor', petSafe: true },
  { id: 44, src: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=400&q=80', name: 'Polka Dot Plant', scientific: 'Hypoestes phyllostachya', price: '₱190', care: 'Easy', light: 'Indirect Light', category: 'indoor', petSafe: true },

  // MORE OUTDOOR
  { id: 45, src: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80', name: 'Sampaguita', scientific: 'Jasminum sambac', price: '₱200', care: 'Easy', light: 'Bright Light', category: 'outdoor', petSafe: true },
  { id: 46, src: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&q=80', name: 'Gumamela', scientific: 'Hibiscus rosa-sinensis', price: '₱150', care: 'Easy', light: 'Bright Light', category: 'outdoor', petSafe: true },
  { id: 47, src: 'https://images.unsplash.com/photo-1564419320461-6870880221ad?w=400&q=80', name: 'Aratiles Tree', scientific: 'Muntingia calabura', price: '₱350', care: 'Easy', light: 'Bright Light', category: 'outdoor', petSafe: true },
  { id: 48, src: 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=400&q=80', name: 'Bayabas', scientific: 'Psidium guajava', price: '₱280', care: 'Easy', light: 'Bright Light', category: 'outdoor', petSafe: true },
  { id: 49, src: 'https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=400&q=80', name: 'Siling Labuyo', scientific: 'Capsicum frutescens', price: '₱80', care: 'Easy', light: 'Bright Light', category: 'outdoor', petSafe: true },
  { id: 50, src: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80', name: 'Malunggay', scientific: 'Moringa oleifera', price: '₱120', care: 'Easy', light: 'Bright Light', category: 'outdoor', petSafe: true },
];

export const GALLERY_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'indoor', label: 'Indoor' },
  { value: 'marcotted', label: 'Marcotted Trees' },
  { value: 'grafted', label: 'Grafted Trees' },
  { value: 'easy', label: 'Easy Care' },
  { value: 'outdoor', label: 'Outdoor & Fruit' },
];
