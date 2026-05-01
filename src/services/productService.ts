import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where, 
  setDoc, 
  serverTimestamp,
  orderBy,
  addDoc,
  updateDoc,
  increment
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { Product, Category, Review } from '../types';

const COLLECTION_NAME = 'products';
const REVIEWS_COLLECTION = 'reviews';

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'm1',
    name: 'Essential Charcoal Overcoat',
    description: 'The definitive VINGRAZ overcoat. Crafted from a premium wool blend with a minimalist silhouette. Features hidden buttons and a luxurious silk lining.',
    price: 18500,
    category: 'men',
    subCategory: 'Outerwear',
    images: ['https://images.unsplash.com/photo-1550246140-5119ae4790b8?q=80&w=2670&auto=format&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Charcoal', 'Midnight Blue'],
    inventoryCount: 15,
    isFeatured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'm2',
    name: 'Merino Wool Turtleneck',
    description: 'Fine-knit merino wool from ethically sourced producers. A staple piece that defines quiet luxury.',
    price: 6500,
    isOnSale: true,
    salePrice: 4800,
    category: 'men',
    subCategory: 'Knitwear',
    images: ['https://images.unsplash.com/photo-1614975058789-41d4023795b5?q=80&w=2070&auto=format&fit=crop'],
    sizes: ['M', 'L', 'XL'],
    colors: ['Cream', 'Grey Melange', 'Black'],
    inventoryCount: 30,
    createdAt: new Date().toISOString()
  },
  {
    id: 'm3',
    name: 'Tailored Linen Trousers',
    description: 'Breathable European linen tailored to perfection. Ideal for the sophisticated summer aesthetic.',
    price: 9200,
    category: 'men',
    subCategory: 'Trousers',
    images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=2000&auto=format&fit=crop'],
    sizes: ['30', '32', '34', '36'],
    colors: ['Sand', 'Navy'],
    inventoryCount: 0,
    createdAt: new Date().toISOString()
  },
  {
    id: 'w1',
    name: 'Silk Wrap Midi Dress',
    description: 'A timeless silhouette in pure mulberry silk. The VINGRAZ wrap dress is designed for effortless elegance from day to night.',
    price: 12500,
    category: 'women',
    subCategory: 'Dresses',
    images: ['https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Champagne', 'Onyx'],
    inventoryCount: 22,
    isFeatured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'w2',
    name: 'Cashmere Lounge Set',
    description: 'Pure luxury for your downtime. Two-piece set crafted from the finest Grade A Mongolian cashmere.',
    price: 24000,
    category: 'women',
    subCategory: 'Loungewear',
    images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2040&auto=format&fit=crop'],
    sizes: ['S', 'M'],
    colors: ['Oatmeal', 'Soft Grey'],
    inventoryCount: 8,
    createdAt: new Date().toISOString()
  },
  {
    id: 'w3',
    name: 'Structured Leather Tote',
    description: 'Meticulously crafted from full-grain vegetable-tanned leather. A statement of quiet luxury.',
    price: 32000,
    category: 'women',
    subCategory: 'Accessories',
    images: ['https://images.unsplash.com/photo-1584917663903-b77bb1f7c271?q=80&w=2070&auto=format&fit=crop'],
    sizes: ['One Size'],
    colors: ['Tan', 'Black'],
    inventoryCount: 5,
    isFeatured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'k1',
    name: 'Mini Signature Blazer',
    description: 'Expertly tailored for the little ones. This signature blazer brings sophisticated luxury to a junior wardrobe.',
    price: 8500,
    category: 'kids',
    subCategory: 'Tailoring',
    images: ['https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=2030&auto=format&fit=crop'],
    sizes: ['2Y', '4Y', '6Y', '8Y'],
    colors: ['Navy', 'Tan'],
    inventoryCount: 10,
    isFeatured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'k2',
    name: 'Organic Cotton Knit Set',
    description: 'Soft, breathable organic cotton for delicate skin. Timeless knit patterns in neutral tones.',
    price: 4200,
    category: 'kids',
    subCategory: 'Sets',
    images: ['https://images.unsplash.com/photo-1444881421460-d838c3b98f95?q=80&w=2070&auto=format&fit=crop'],
    sizes: ['6M', '12M', '18M', '24M'],
    colors: ['Cream', 'Sage'],
    inventoryCount: 18,
    createdAt: new Date().toISOString()
  },
  {
    id: 'w4',
    name: 'Asymmetric Pleated Gown',
    description: 'A masterpiece of contemporary draping. Architectural pleats and an asymmetric neckline define this evening essential.',
    price: 45000,
    category: 'women',
    subCategory: 'Dresses',
    images: ['https://images.unsplash.com/photo-1539109132314-34a93a553f19?q=80&w=2670&auto=format&fit=crop'],
    sizes: ['S', 'M'],
    colors: ['Emerald', 'Midnight'],
    inventoryCount: 3,
    isFeatured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'w5',
    name: 'Raw Silk Shift Dress',
    description: 'Characterized by its unique texture and relaxed silhouette. The raw silk provides a structural yet comfortable form.',
    price: 15800,
    category: 'women',
    subCategory: 'Dresses',
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2000&auto=format&fit=crop'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Oyster', 'Sage'],
    inventoryCount: 15,
    createdAt: new Date().toISOString()
  },
  {
    id: 'm4',
    name: 'Technical Trench Coat',
    description: 'Weather-resistant fabric meets classic tailoring. A fusion of functionality and refined style.',
    price: 28000,
    category: 'men',
    subCategory: 'Outerwear',
    images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2072&auto=format&fit=crop'],
    sizes: ['L', 'XL'],
    colors: ['Slate'],
    inventoryCount: 7,
    isFeatured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'u1',
    name: 'The Artisan Collection',
    description: 'DROPPING NEXT MONTH. A celebration of handmade textures and organic dyes.',
    price: 0,
    category: 'men',
    subCategory: 'Preview',
    images: ['https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?q=80&w=2070&auto=format&fit=crop'],
    sizes: [],
    colors: [],
    inventoryCount: 0,
    createdAt: new Date(2027, 1, 1).toISOString()
  }
];

export const productService = {
  async getFeaturedProducts(): Promise<Product[]> {
    const all = await this.getAllProducts();
    return all.filter(p => p.isFeatured).slice(0, 8);
  },

  async getUpcomingProducts(): Promise<Product[]> {
    const all = await this.getAllProducts();
    return all.filter(p => p.subCategory === 'Preview');
  },

  async getDresses(): Promise<Product[]> {
    const all = await this.getAllProducts();
    return all.filter(p => p.subCategory === 'Dresses');
  },
  async getAllProducts(): Promise<Product[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return MOCK_PRODUCTS;
      }
      return snapshot.docs.map(d => {
        const data = d.data();
        return { 
          ...data, 
          id: d.id,
          createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : data.createdAt 
        } as Product;
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
      return MOCK_PRODUCTS;
    }
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    if (category === 'all' || category === 'new') return this.getAllProducts();
    try {
      const q = query(collection(db, COLLECTION_NAME), where('category', '==', category));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return MOCK_PRODUCTS.filter(p => p.category === category);
      }
      return snapshot.docs.map(d => {
        const data = d.data();
        return { 
          ...data, 
          id: d.id,
          createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : data.createdAt 
        } as Product;
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
      return [];
    }
  },

  async getProductById(id: string): Promise<Product | null> {
    try {
      const d = await getDoc(doc(db, COLLECTION_NAME, id));
      if (!d.exists()) {
        return MOCK_PRODUCTS.find(p => p.id === id) || null;
      }
      const data = d.data();
      return { 
        ...data, 
        id: d.id,
        createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : data.createdAt 
      } as Product;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `${COLLECTION_NAME}/${id}`);
      return null;
    }
  },

  async seedProducts() {
    for (const p of MOCK_PRODUCTS) {
      await setDoc(doc(db, COLLECTION_NAME, p.id), {
        ...p,
        createdAt: serverTimestamp()
      });
    }
  },

  async getProductReviews(productId: string): Promise<Review[]> {
    try {
      const q = query(
        collection(db, REVIEWS_COLLECTION),
        where('productId', '==', productId),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(d => {
        const data = d.data();
        return { 
          ...data, 
          id: d.id,
          createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : data.createdAt
        } as Review;
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, `${REVIEWS_COLLECTION}/${productId}`);
      return [];
    }
  },

  async addReview(productId: string, review: Omit<Review, 'id' | 'createdAt'>): Promise<void> {
    try {
      await addDoc(collection(db, REVIEWS_COLLECTION), {
        ...review,
        productId,
        createdAt: serverTimestamp()
      });

      // Update product rating (simple logic for now)
      const productRef = doc(db, COLLECTION_NAME, productId);
      const product = await this.getProductById(productId);
      if (product) {
        const oldCount = product.reviewCount || 0;
        const oldRating = product.rating || 0;
        const newCount = oldCount + 1;
        const newRating = (oldRating * oldCount + review.rating) / newCount;

        await updateDoc(productRef, {
          rating: newRating,
          reviewCount: newCount
        });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, REVIEWS_COLLECTION);
    }
  },

  async searchProducts(searchTerm: string): Promise<Product[]> {
    const all = await this.getAllProducts();
    const term = searchTerm.toLowerCase();
    return all.filter(p => 
      p.name.toLowerCase().includes(term) || 
      p.description.toLowerCase().includes(term) ||
      p.subCategory.toLowerCase().includes(term)
    );
  }
};
