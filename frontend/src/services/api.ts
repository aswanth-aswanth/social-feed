import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

export interface User {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
  bio?: string;
  coverPicture?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ProfileUpdateData {
  name?: string;
  bio?: string;
  profilePicture?: File;
  coverPicture?: File;
}

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const auth = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", {
      email,
      password,
    });
    return response.data;
  },
  register: async (
    email: string,
    password: string,
    name: string
  ): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", {
      email,
      password,
      name,
    });
    return response.data;
  },
};

export const posts = {
  getAll: async (page: number = 1, limit: number = 20) => {
    const response = await api.get(`/posts?page=${page}&limit=${limit}`);
    return response.data;
  },
  getMyPosts: async () => {
    const response = await api.get("/posts/my-posts");
    return response.data;
  },
  create: async (formData: FormData) => {
    const response = await api.post("/posts", formData);
    return response.data;
  },
};

export const users = {
  getProfile: async () => {
    const response = await api.get<User>("/users/profile");
    return response.data;
  },
  updateProfile: async (data: ProfileUpdateData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    const response = await api.put<User>("/users/profile", formData);
    return response.data;
  },
};

export default api;
