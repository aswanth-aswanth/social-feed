import { create } from "zustand";
import { auth, users } from "../services";
import { AuthState } from "../types/store";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

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

      const user = await users.getProfile();
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
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
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
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      set({ error: errorMessage, loading: false });
    }
  },

  loginWithGoogle: () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  },

  handleOAuthSuccess: async (token: string) => {
    try {
      set({ loading: true, error: null });
      localStorage.setItem("token", token);
      const user = await users.getProfile();
      set({ user, loading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null });
  },
}));
