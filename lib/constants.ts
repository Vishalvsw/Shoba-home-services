
import { Service, Location, Review } from './types';

export const LOCATIONS: Location[] = [
  {
    id: 'indiranagar',
    slug: 'indiranagar',
    name: 'Indiranagar',
    heroImage: 'https://images.unsplash.com/photo-1596436807738-684379a6021d?auto=format&fit=crop&w=1200&q=80',
    description: 'Premier deep cleaning and pest control in East Bangalore.',
    coords: { x: 72, y: 42 }
  },
  {
    id: 'jayanagar',
    slug: 'jayanagar',
    name: 'Jayanagar',
    heroImage: 'https://images.unsplash.com/photo-1590059132224-406e2f1e285a?auto=format&fit=crop&w=1200&q=80',
    description: 'Serving the greenest and most organized layout of South Bangalore.',
    coords: { x: 42, y: 68 }
  },
  {
    id: 'koramangala',
    slug: 'koramangala',
    name: 'Koramangala',
    heroImage: 'https://images.unsplash.com/photo-1605146765360-1430048e7724?auto=format&fit=crop&w=1200&q=80',
    description: 'Reliable home services for the tech hub and residential blocks.',
    coords: { x: 62, y: 58 }
  },
  {
    id: 'hsr-layout',
    slug: 'hsr-layout',
    name: 'HSR Layout',
    heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    description: 'Quality cleaning services in the tech and startup hub of Bangalore.',
    coords: { x: 74, y: 72 }
  },
  {
    id: 'whitefield',
    slug: 'whitefield',
    name: 'Whitefield',
    heroImage: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80',
    description: 'Expert cleaning for the IT corridor and luxury townships.',
    coords: { x: 92, y: 38 }
  }
];

export const SERVICES: Service[] = [
  {
    id: 'deep-home-cleaning',
    slug: 'deep-home-cleaning',
    title: 'Deep Home Cleaning',
    shortDescription: 'Intensive scrubbing, sanitization, and machine polishing for every room.',
    fullDescription: 'Our signature service. We deep clean every corner, including hard-to-reach spots, scrubbing floors, and sanitizing surfaces using eco-friendly materials.',
    icon: 'Sparkles',
    priceRange: '₹3,999 onwards',
    basePrice: 3999,
    variants: [
      { label: '1 BHK', price: 3999, sizeInfo: '400 - 600 sft' },
      { label: '2 BHK', price: 5999, sizeInfo: '800 - 1200 sft' },
      { label: '3 BHK', price: 7499, sizeInfo: '1300 - 1800 sft' },
      { label: 'Villa', price: 'inspection', sizeInfo: 'On-site Quote' },
    ],
    features: ['Machine Floor Scrubbing', 'Kitchen Degreasing', 'Bathroom Descaling', 'Window Track Cleaning'],
    // images: [
    //   'https://images.unsplash.com/photo-Ddzir2TCR2g?auto=format&fit=crop&w=1200&q=80', // High quality clean kitchen
    //   'https://images.unsplash.com/photo-Ddzir2TCR2g?auto=format&fit=crop&w=1200&q=80', // Living room clean
    //   'https://images.unsplash.com/photo-Ddzir2TCR2g?auto=format&fit=crop&w=1200&q=80'  // Professional detail
    // ]

  images: [
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1595526114035-45c0a7c8a4c1?auto=format&fit=crop&w=1200&q=80'
  ],
    faqs: [{ question: 'Is it for occupied homes?', answer: 'Yes, this is specifically for homes where people are currently living.' }],
  },
  {
    id: 'pest-control',
    slug: 'pest-control',
    title: 'Pest Control',
    shortDescription: 'Safe, odorless herbal treatment for cockroaches and ants.',
    fullDescription: 'Advanced pest management using safe, certified chemicals. Includes herbal gel treatments for kitchens.',
    icon: 'Bug',
    priceRange: '₹899 onwards',
    basePrice: 899,
    variants: [
      { label: 'Standard (1BHK)', price: 899, sizeInfo: 'General Pest' },
      { label: 'Premium (2BHK+)', price: 1299, sizeInfo: 'General Pest' },
      { label: 'Bed Bug Treatment', price: 1599, sizeInfo: 'Odorless Spray' },
    ],
    features: ['Herbal Gel Injection', 'Odorless Spray', 'Corner Treatment', '90-Day Warranty'],
    images: [
      'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=1200&q=80', // Professional in action
      'https://images.unsplash.com/photo-1615873968403-89e0686282a9?auto=format&fit=crop&w=1200&q=80'  // Clean interior environment
    ],
    faqs: [{ question: 'Is it safe for kids?', answer: 'Yes, we use government-approved odorless chemicals safe for kids and pets.' }],
  },
  {
    id: 'sofa-shampooing',
    slug: 'sofa-shampooing',
    title: 'Sofa & Mattress',
    shortDescription: 'Revitalize fabric and leather furniture with extraction cleaning.',
    fullDescription: 'We remove deep-seated dirt, dust mites, and stains from your sofas and mattresses using professional shampooing and high-suction vacuuming.',
    icon: 'Armchair',
    priceRange: '₹999 onwards',
    basePrice: 999,
    variants: [
      { label: '3 Seater', price: 999, sizeInfo: 'Fabric/Leather' },
      { label: '5 Seater', price: 1599, sizeInfo: 'Fabric/Leather' },
      { label: '7 Seater', price: 1999, sizeInfo: 'Fabric/Leather' },
    ],
    features: ['Deep Vacuuming', 'Eco-friendly Shampooing', 'Wet Extraction', 'Deodorization'],
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80', // Green Sofa
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80'  // Clean bedroom/mattress context
    ],
    faqs: [{ question: 'How long to dry?', answer: 'It usually takes 3-4 hours to dry completely under a fan.' }],
  }
];

export const TESTIMONIALS: Review[] = [
  { id: '1', user: 'Anjali P.', rating: 5, comment: 'The team was on time and did a fantastic job with the pest control. No cockroaches seen since!', service: 'Pest Control' },
  { id: '2', user: 'Rahul S.', rating: 5, comment: 'Very professional deep cleaning. My Indiranagar apartment looks brand new.', service: 'Deep Home Cleaning' },
  { id: '3', user: 'Vikram D.', rating: 5, comment: 'Booking was super easy and the AI chat helped me pick the right package.', service: 'General' },
];
