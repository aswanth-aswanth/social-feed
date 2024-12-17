// src/contexts/authStore.ts
import { create } from "zustand";
import { auth } from "../services/api";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface User {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => void;
  handleOAuthSuccess: (token: string) => Promise<void>;
  logout: () => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,
  initialized: false,

  initializeAuth: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        set({ loading: false, initialized: true });
        return;
      }

      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        localStorage.removeItem("token");
        set({ loading: false, initialized: true });
        return;
      }

      const user = await response.json();
      set({ user, loading: false, initialized: true });
    } catch (error) {
      localStorage.removeItem("token");
      set({ loading: false, initialized: true });
    }
  },

  login: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const { user, token } = await auth.login(email, password);
      localStorage.setItem("token", token);
      set({ user, loading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      set({ error: errorMessage, loading: false });
    }
  },

  register: async (email: string, password: string, name: string) => {
    try {
      set({ loading: true, error: null });
      const { user, token } = await auth.register(email, password, name);
      localStorage.setItem("token", token);
      set({ user, loading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      set({ error: errorMessage, loading: false });
    }
  },

  loginWithGoogle: () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  },

  handleOAuthSuccess: async (token: string) => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to get user info");

      const user = await response.json();
      localStorage.setItem("token", token);
      set({ user, loading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null });
  },
}));
