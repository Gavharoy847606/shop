'use client';

import { create } from 'zustand';
import { useAuthStore } from './useAuthStore';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://erp-backend-815e.onrender.com';

export interface Product {
  id?: number;
  sku: string;
  name: string;
  quantity: number;
  price: string;
  image_url?: string;
}

export interface Order {
  id: number;
  clent_id: number;
  client_name?: string;
  client_email?: string;
  total_amount: string;
  status: 'pending' | 'completed' | 'cancelled';
  created_at: string;
}

// Token olish helper
function getToken(): string | null {
  return useAuthStore.getState().token;
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// ─── PRODUCTS STORE ───
interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<boolean>;
  updateProduct: (id: number, product: Partial<Product>) => Promise<boolean>;
  deleteProduct: (id: number) => Promise<boolean>;
}

export const useStore = create<ProductsState>((set, get) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${BACKEND_URL}/api/products`);
      if (!res.ok) throw new Error('Mahsulotlarni yuklashda xatolik');
      const data = await res.json();
      set({ products: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  addProduct: async (product) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/products`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(product),
      });
      if (res.status === 401 || res.status === 403) {
        useAuthStore.getState().logout();
        return false;
      }
      if (!res.ok) return false;
      await get().fetchProducts();
      return true;
    } catch {
      return false;
    }
  },

  updateProduct: async (id, product) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/products/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(product),
      });
      if (res.status === 401 || res.status === 403) {
        useAuthStore.getState().logout();
        return false;
      }
      if (!res.ok) return false;
      await get().fetchProducts();
      return true;
    } catch {
      return false;
    }
  },

  deleteProduct: async (id) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      if (!res.ok) return false;
      await get().fetchProducts();
      return true;
    } catch {
      return false;
    }
  },
}));

// ─── ORDERS STORE ───
interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  updateOrderStatus: (id: number, status: Order['status']) => Promise<boolean>;
}

export const useOrdersStore = create<OrdersState>((set, get) => ({
  orders: [],
  loading: false,
  error: null,

  fetchOrders: async () => {
    const token = getToken();
    if (!token) {
      set({ error: 'Avval tizimga kiring', loading: false });
      return;
    }
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${BACKEND_URL}/api/orders`, {
        headers: authHeaders(),
      });
      if (res.status === 401) {
        useAuthStore.getState().logout();
        set({ error: "Sessiya tugagan, qayta kiring", loading: false });
        return;
      }
      if (!res.ok) throw new Error('Buyurtmalarni yuklashda xatolik');
      const data = await res.json();
      set({ orders: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  updateOrderStatus: async (id, status) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/orders/${id}/status`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({ status }),
      });
      if (!res.ok) return false;
      await get().fetchOrders();
      return true;
    } catch {
      return false;
    }
  },
}));