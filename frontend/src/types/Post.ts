export interface Post {
    _id: string;
    author: {
      id: string;
      name: string;
      profilePicture?: string;
    };
    text: string;
    images: string[];
    video?: string;
    createdAt: string;
  }
  