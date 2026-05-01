export type Category = 'men' | 'women' | 'kids' | 'accessories';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  subCategory: string;
  images: string[];
  sizes: string[];
  colors: string[];
  inventoryCount: number;
  isFeatured?: boolean;
  isOnSale?: boolean;
  salePrice?: number;
  rating?: number;
  reviewCount?: number;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  size: string;
  color: string;
  price: number;
  product: Product;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  role: 'user' | 'admin';
  address?: string;
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  courier?: string;
  estimatedDelivery?: string;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    phoneNumber: string;
  };
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: string;
}
