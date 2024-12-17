// src/components/feed/Feed.tsx
import React, { useEffect, useState, useRef, useCallback } from "react";
import { posts } from "../../services/api";
import Post from "./Post";
import CreatePost from "./CreatePost";
import Loading from "../common/Loading";
import { useNavigate } from "react-router-dom";
import { users } from "../../services/api";

interface User {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

interface Post {
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

const Feed: React.FC = () => {
  const [feedPosts, setFeedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const observer = useRef<IntersectionObserver>();
  const navigate = useNavigate();
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

  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading || loadingMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, loadingMore, hasMore]
  );

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

  const handleProfileClick = () => {
    navigate(`/profile`);
  };

  if (loading && page === 1) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <div className="max-w-[360px] mx-auto relative">
        <div className="bg-white px-4 relative">
          <div
            onClick={handleProfileClick}
            className="flex bg-white py-3 z-10 items-center justify-start gap-4"
          >
            <img
              src={user?.profilePicture || "/defaultProfile.png"}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h1 className="text-xl font-semibold">Welcome Back</h1>
              <p className="text-sm text-gray-600">
                {user?.name || "Loading..."}
              </p>
            </div>
          </div>
          <h2 className="text-xl font-bold my-6">Feeds</h2>

          {/* Posts */}
          <div className="space-y-4">
            {feedPosts.map((post, index) => (
              <div
                key={post._id}
                ref={index === feedPosts.length - 1 ? lastPostRef : undefined}
              >
                <Post post={post} index={index} />
              </div>
            ))}
          </div>

          {/* Create Post Button */}
          <CreatePost />
        </div>

        {/* Loading More */}
        {loadingMore && (
          <div className="text-center py-4">
            <Loading />
          </div>
        )}

        {/* No More Posts */}
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
