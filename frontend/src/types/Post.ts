import { User } from "./User";

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

export interface PostProps {
  post: {
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
  };
  index: number;
}

export interface MediaItem {
  type: string;
  url: string;
}

export interface AuthorInfoProps {
  author: {
    id: string;
    name: string;
    profilePicture?: string;
  };
  timestamp: string;
}

export interface MediaGalleryProps {
  mediaItems: MediaItem[];
}

export interface HashtagsProps {
  text: string;
}

export interface PostActionsProps {
  likeCount: number;
  onLike: () => void;
  onShare: () => void;
}

export interface FeedHeaderProps {
  user: User | null;
}
