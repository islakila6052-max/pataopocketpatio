import {
  Leaf,
  Waves,
  Camera,
  ShoppingBag,
} from 'lucide-react';
import botanicalGardenImage from '../assets/bonsphoto/bonsphoto/thegarden.webp';
import gardenPoolImage from '../assets/images/bon.webp';
import photographySpotImage from '../assets/bonsphoto/bonsphoto/thegarden_2.webp';
import plantShopImage from '../assets/bonsphoto/bonsphoto/Sansevierias.webp';

export const FEATURES = [
  {
    id: 1,
    icon: Leaf,
    image: botanicalGardenImage,
    title: 'Botanical Garden',
    description: 'Over 600 plant species thriving in curated tropical landscapes.',
  },
  {
    id: 2,
    icon: Waves,
    image: gardenPoolImage,
    title: 'Garden Pool',
    description: 'Cool off and relax amid lush tropical greenery.',
  },
  {
    id: 3,
    icon: Camera,
    image: photographySpotImage,
    title: 'Photography Spot',
    description: 'Instagram-worthy backdrops at every corner of the sanctuary.',
  },
  {
    id: 4,
    icon: ShoppingBag,
    image: plantShopImage,
    title: 'Plant Shop',
    description: 'Browse tropical plants and find a new favorite to take home.',
  },
];

export const EVENTS = [];
