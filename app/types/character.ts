export type AnimalCategory = 'rabbit' | 'cat' | 'dog' | 'bird' | 'bear' | 'fox';

export type AnimationType = 'bounce' | 'wave' | 'spin' | 'walk' | 'dance' | 'fly';

export type CharacterFormat = 'component' | 'lottie' | 'gif' | 'svg';

export interface AnimalCharacter {
  id: string;
  name: string;
  category: AnimalCategory;
  animationType: AnimationType;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  format: CharacterFormat;
  previewComponent?: string;
  tags: string[];
  rating: number;
  downloads: number;
  createdAt: string;
  colors: string[];
}
