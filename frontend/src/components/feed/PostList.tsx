import React, { useCallback, useRef } from "react";
import Post from "./Post";
import { PostListProps } from "../../types/PostList";

const PostList: React.FC<PostListProps> = ({
  posts,
  loading,
  loadingMore,
  hasMore,
  setPage,
}) => {
  const observer = useRef<IntersectionObserver>();
  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading || loadingMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage: number) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, loadingMore, hasMore]
  );
  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <div
          key={post._id}
          ref={index === posts.length - 1 ? lastPostRef : undefined}
        >
          <Post index={index} post={post} />
        </div>
      ))}
    </div>
  );
};

export default PostList;
