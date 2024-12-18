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
