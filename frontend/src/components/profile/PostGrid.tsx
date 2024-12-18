import React from "react";
import { UserPost } from "../../types";

interface PostGridProps {
  posts: UserPost[];
}

const PostGrid: React.FC<PostGridProps> = ({ posts }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">My Posts</h2>
    {posts.length > 0 ? (
      <div className="grid grid-cols-2 gap-2">
        {posts.map((post) => (
          <div key={post._id} className="aspect-square relative group">
            <img
              src={post.images[0]}
              alt={post.text}
              className="w-full h-full object-cover"
            />
            {post.images.length > 1 && (
              <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                1/{post.images.length}
              </div>
            )}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
              {post.text || "View Post"}
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500 text-sm">No posts yet</p>
    )}
  </div>
);

export default PostGrid;
