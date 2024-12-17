import React, { useEffect, useState } from "react";
import { posts } from "../../services/api";
import CreatePostButton from "./CreatePostButton";
import Loading from "../common/Loading";
import { users } from "../../services/api";
import { User, Post as PostType } from "../../types";
import FeedHeader from "./FeedHeader";
import PostList from "./PostList";

const Feed: React.FC = () => {
  const [feedPosts, setFeedPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await users.getProfile();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const fetchPosts = async (pageNum: number) => {
    try {
      setLoadingMore(true);
      const data = await posts.getAll(pageNum);
      if (data.length < 20) {
        setHasMore(false);
      }
      setFeedPosts((prev) => (pageNum === 1 ? data : [...prev, ...data]));
    } catch (error) {
      setError("Failed to load posts");
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  if (loading && page === 1) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <div className="max-w-[360px] mx-auto relative">
        <div className="bg-white px-4 relative">
          {user && <FeedHeader user={user} />}
          <h2 className="text-xl font-bold my-6">Feeds</h2>
          <PostList
            posts={feedPosts}
            loading={loading}
            loadingMore={loadingMore}
            hasMore={hasMore}
            setPage={setPage}
          />
          <CreatePostButton />
        </div>

        {loadingMore && (
          <div className="text-center py-4">
            <Loading />
          </div>
        )}

        {!hasMore && (
          <div className="text-center text-gray-500 py-4">
            No more posts to load
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
