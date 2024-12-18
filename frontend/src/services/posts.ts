import api from "./api";

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
