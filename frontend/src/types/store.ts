export interface User {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
}

export interface AuthState {
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

export interface Post {
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
export interface FeedState {
  posts: Post[];
  loading: boolean;
  addPosts: (newPosts: Post[]) => void;
  setLoading: (loading: boolean) => void;
}
export interface ProfileState {
  profile: {
    name: string;
    bio: string;
    avatar: string;
  } | null;
  setProfile: (profile: any) => void;
}
