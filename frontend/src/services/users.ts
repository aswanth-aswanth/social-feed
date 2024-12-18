import api from "./api";
import { User, ProfileUpdateData } from "../types/api";

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
