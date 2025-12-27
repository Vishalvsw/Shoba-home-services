export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  priceRange: string;
  basePrice: number;
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
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  service: string;
}

export interface BookingState {
  step: number;
  serviceId: string | null;
  locationId: string | null;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
}

export type ChatMessage = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  options?: string[];
};
