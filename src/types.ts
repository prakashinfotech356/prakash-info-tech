export type Screen = "home" | "services" | "about" | "contact";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string; // Lucide icon identifier
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface PhilosophyCard {
  title: string;
  description: string;
  iconName: string;
}
