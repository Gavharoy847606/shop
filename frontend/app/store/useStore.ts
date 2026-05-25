import { create } from 'zustand';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://erp-backend-815e.onrender.com';
const API_URL = `${BACKEND_URL}/api/products`;

// Mahsulot interfeysi
export interface Product {
  id?: number;
  sku: string;
  name: string;
  quantity: number;
  price: string;
  image_url?: string;
}

interface ERPState {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Product) => Promise<boolean>;
}


export const useStore = create<ERPState>((set, get) => ({
  products: [],
  loading: false,
  error: null,

  // Bulutli backenddan ma'lumotlarni tortib olish
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Tarmoq xatoligi yuz berdi');
      const data = await response.json();
      set({ products: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  // Yangi mahsulot qo'shish
  addProduct: async (product) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (response.ok) {
        await get().fetchProducts(); // Ro'yxatni yangilash
        return true;
      }
      return false;
    } catch (err) {
      console.error('Mahsulot qoshishda xatolik:', err);
      return false;
    }
  },
}));
