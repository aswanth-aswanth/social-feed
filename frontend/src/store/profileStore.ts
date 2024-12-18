import { create } from "zustand";
import { ProfileState } from "../types/store";

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
}));
