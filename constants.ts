import { Service, Location, Review } from './types';
import { Sparkles, Bug, Home, Armchair } from 'lucide-react';

export const LOCATIONS: Location[] = [
  {
    id: 'bangalore',
    slug: 'bangalore',
    name: 'Bangalore',
    heroImage: 'https://images.unsplash.com/photo-1596436807738-684379a6021d?auto=format&fit=crop&w=1200&q=80',
    description: 'Serving all major areas including Indiranagar, Koramangala, and Whitefield.',
  },
  {
    id: 'mumbai',
    slug: 'mumbai',
    name: 'Mumbai',
    heroImage: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=1200&q=80',
    description: 'Reliable home services across Bandra, Juhu, and Andheri.',
  },
  {
    id: 'delhi',
    slug: 'delhi',
    name: 'Delhi NCR',
    heroImage: 'https://images.unsplash.com/photo-1587474265584-17b57bd66a71?auto=format&fit=crop&w=1200&q=80',
    description: 'Expert cleaning and pest control in Delhi, Gurgaon, and Noida.',
  },
];

export const SERVICES: Service[] = [
  {
    id: 'room-cleaning',
    slug: 'room-cleaning',
    title: 'Deep Room Cleaning',
    shortDescription: 'Complete deep cleaning for bedrooms, living rooms, and entire homes.',
    fullDescription: 'Our Deep Room Cleaning service restores the sparkle to your home. We use industrial-grade equipment and eco-friendly chemicals to remove deep-seated dust, stains, and allergens. Perfect for move-in/move-out or seasonal cleaning.',
    icon: 'Sparkles',
    priceRange: '₹499 – ₹1,499',
    basePrice: 499,
    features: ['Floor scrubbing & polishing', 'Window & glass cleaning', 'Cobweb removal', 'Furniture dusting'],
    images: [
        'https://images.unsplash.com/photo-1581578731117-10d52143b0d8?auto=format&fit=crop&w=800&q=80', // Living room clean
        'https://images.unsplash.com/photo-1527513913476-fa952934e569?auto=format&fit=crop&w=800&q=80', // Bedroom clean
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80' // Bathroom/Modern
    ],
    faqs: [
      { question: 'How long does it take?', answer: 'A typical 2BHK takes about 4-5 hours.' },
      { question: 'Do I need to provide cleaning supplies?', answer: 'No, our team brings all necessary equipment and supplies.' },
    ],
  },
  {
    id: 'pest-control',
    slug: 'pest-control',
    title: 'Pest Control',
    shortDescription: 'Safe and effective removal of cockroaches, ants, termites, and more.',
    fullDescription: 'Say goodbye to unwanted guests. Our certified pest control experts use odorless, government-approved gels and sprays to eliminate pests at the source. Long-lasting protection guaranteed.',
    icon: 'Bug',
    priceRange: '₹999 – ₹2,999',
    basePrice: 999,
    features: ['Odorless gel treatment', 'Cockroach & Ant control', 'Termite specialized treatment', '90-day warranty'],
    images: [
        'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?auto=format&fit=crop&w=800&q=80', // Professional spraying
        'https://images.unsplash.com/photo-1587575494201-29d415827bec?auto=format&fit=crop&w=800&q=80', // Clean kitchen
        'https://images.unsplash.com/photo-1506049581883-82c81d09e530?auto=format&fit=crop&w=800&q=80' // Garden/Home
    ],
    faqs: [
      { question: 'Is the chemical safe for pets?', answer: 'Yes, we use pet-friendly herbal gels for residential areas.' },
      { question: 'Do I need to empty the kitchen?', answer: 'For gel treatment, no. For spray treatment, minimal shifting might be required.' },
    ],
  },
  {
    id: 'sofa-cleaning',
    slug: 'sofa-cleaning',
    title: 'Sofa & Upholstery',
    shortDescription: 'Revitalize your furniture with deep shampooing and vacuuming.',
    fullDescription: 'We remove tough stains, dust mites, and odors from your sofas, chairs, and mattresses using injection-extraction technology.',
    icon: 'Armchair',
    priceRange: '₹299/seat',
    basePrice: 299,
    features: ['Fabric shampooing', 'Stain removal', 'Quick drying', 'Leather polishing'],
    images: [
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80', // Green Sofa
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80', // Living room
        'https://images.unsplash.com/photo-1628156687483-366579d863bb?auto=format&fit=crop&w=800&q=80' // Vacuuming (generic)
    ],
    faqs: [
      { question: 'How long for the sofa to dry?', answer: 'Usually 3-4 hours under a fan.' },
    ],
  },
  {
    id: 'kitchen-cleaning',
    slug: 'kitchen-cleaning',
    title: 'Kitchen Cleaning',
    shortDescription: 'Thorough cleaning of kitchens, stovetops, ovens, and appliances.',
    fullDescription: 'Our Kitchen Cleaning service ensures your cooking space is spotless and hygienic. We degrease surfaces, clean appliances, and sanitize countertops using professional products. Perfect for maintaining a healthy cooking environment.',
    icon: 'Home',
    priceRange: '₹599 – ₹1,199',
    basePrice: 599,
    features: ['Degreasing all surfaces', 'Appliance cleaning', 'Refrigerator wiping', 'Floor mopping'],
    images: [
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80', // Kitchen clean
        'https://images.unsplash.com/photo-1556909020-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80', // Stove clean
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80' // Appliances
    ],
    faqs: [
      { question: 'Do you clean inside the oven?', answer: 'Yes, we provide deep oven cleaning as part of the service.' },
      { question: 'Is it safe for all kitchen appliances?', answer: 'We use safe, non-abrasive cleaners suitable for most surfaces.' },
    ],
  },
];

export const TESTIMONIALS: Review[] = [
  { id: '1', user: 'Anjali P.', rating: 5, comment: 'The team was on time and did a fantastic job with the pest control. No cockroaches seen since!', service: 'Pest Control' },
  { id: '2', user: 'Rahul S.', rating: 4, comment: 'Very professional deep cleaning. My apartment looks brand new.', service: 'Room Cleaning' },
  { id: '3', user: 'Vikram D.', rating: 5, comment: 'Booking was super easy and the AI chat helped me pick the right package.', service: 'General' },
];