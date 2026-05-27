'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://erp-backend-815e.onrender.com';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
          const data = await res.json();
          if (!res.ok) {
            set({ error: data.error || 'Kirishda xatolik', loading: false });
            return false;
          }
          set({ user: data.user, token: data.token, loading: false });
          return true;
        } catch {
          set({ error: 'Tarmoq xatoligi', loading: false });
          return false;
        }
      },

      logout: () => set({ user: null, token: null }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'stuffus-auth',
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);