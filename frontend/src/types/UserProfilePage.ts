export interface UserPost {
  _id: string;
  text: string;
  images: string[];
  video?: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    profilePicture?: string;
  };
}
