import { Post as PostType } from "./Post";

export interface PostListProps {
  posts: PostType[];
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
