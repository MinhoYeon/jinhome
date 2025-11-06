export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: string;
  purchases: string[]; // character IDs
}

export interface Review {
  id: string;
  characterId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  items: {
    characterId: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: string;
  createdAt: string;
  email: string;
  name: string;
}
