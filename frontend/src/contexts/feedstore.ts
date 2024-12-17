// src/contexts/feedStore.ts
import { create } from "zustand";

interface Post {
  id: string;
  content: string;
  images: string[];
  video?: string;
  timestamp: any;
  author: {
    name: string;
    avatar: string;
  };
}

interface FeedState {
  posts: Post[];
  loading: boolean;
  addPosts: (newPosts: Post[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useFeedStore = create<FeedState>((set) => ({
  posts: [],
  loading: false,
  addPosts: (newPosts) =>
    set((state) => ({ posts: [...state.posts, ...newPosts] })),
  setLoading: (loading) => set({ loading }),
}));
