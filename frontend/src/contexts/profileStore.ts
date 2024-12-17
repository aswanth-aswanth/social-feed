// src/contexts/profileStore.ts
import { create } from "zustand";

interface ProfileState {
  profile: {
    name: string;
    bio: string;
    avatar: string;
  } | null;
  setProfile: (profile: any) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
}));
