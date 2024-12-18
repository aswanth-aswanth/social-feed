import { create } from "zustand";
import { FeedState } from "../types/store";

export const useFeedStore = create<FeedState>((set) => ({
  posts: [],
  loading: false,
  addPosts: (newPosts) =>
    set((state) => ({ posts: [...state.posts, ...newPosts] })),
  setLoading: (loading) => set({ loading }),
}));
