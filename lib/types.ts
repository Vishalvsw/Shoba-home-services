
export interface ServiceVariant {
  label: string;
  price: number | 'inspection';
  sizeInfo?: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  priceRange: string;
  basePrice: number;
  variants: ServiceVariant[];
  features: string[];
  faqs: FAQ[];
  images: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Location {
  id: string;
  slug: string;
  name: string;
  heroImage: string;
  description: string;
  coords?: { x: number; y: number }; // Percentage coords for the interactive map
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  service: string;
}

export type ChatMessage = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  options?: string[];
};
