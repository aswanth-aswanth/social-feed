// src/components/feed/Post.tsx
import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import ShareModal from "../common/ShareModal";

interface MediaItem {
  type: "image" | "video";
  url: string;
}

interface PostProps {
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

const Post: React.FC<PostProps> = ({ post, index }) => {
  const [likeCount, setLikeCount] = useState(67);
  const navigate = useNavigate();
  const [showShareModal, setShowShareModal] = useState(false);

  const formatTimestamp = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  const handleLike = () => {
    setLikeCount((prev) => prev + 1);
  };

  const bgColor = index % 2 === 0 ? "bg-[#F7EBFF]" : "bg-[#FFFAEE]";

  const mediaItems: MediaItem[] = [
    ...post.images.map((img): MediaItem => ({ type: "image" as const, url: img })),
    ...(post.video ? [{ type: "video" as const, url: post.video }] : []),
  ];

  const handleProfileClick = () => {
    navigate(`/profile}`);
  };

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/post/${post._id}`
      : "";

  return (
    <div className={`${bgColor} p-4 mb-4 rounded-3xl`}>
      <div
        className="flex items-center space-x-2 mb-3 cursor-pointer"
        onClick={handleProfileClick}
      >
        <img
          src={post.author.profilePicture || "/defaultProfile.png"}
          alt={post.author.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="font-bold text-gray-800">{post.author.name}</div>
          <div className="text-gray-500 text-sm">
            {formatTimestamp(post.createdAt)}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-800 mb-2">{post.text}</p>
        <div className="flex flex-wrap gap-2">
          {post.text.split(" ").map(
            (word, i) =>
              word.startsWith("#") && (
                <span key={i} className="text-blue-500">
                  {word}
                </span>
              )
          )}
        </div>
      </div>

      {mediaItems.length > 0 && (
        <div className="overflow-x-auto mb-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          <div className="flex space-x-2">
            {mediaItems.map((media, index) => (
              <div
                key={index}
                className={`${
                  mediaItems.length == 1 ? "w-full" : "w-[11rem]"
                } aspect-square flex-shrink-0`}
              >
                {media.type === "image" ? (
                  <img
                    src={media.url}
                    alt="Post content"
                    className="rounded-lg object-cover w-full h-full"
                    loading="lazy"
                  />
                ) : (
                  <video
                    src={media.url}
                    className="rounded-lg object-cover w-full h-full"
                    controls
                    preload="metadata"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handleLike}
          className="flex items-center space-x-1 text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
          <span>{likeCount}</span>
        </button>

        <button
          onClick={() => setShowShareModal(true)}
          className="flex items-center gap-2 font-medium bg-black/[0.07] rounded-full py-1 px-4"
        >
          {/* <Share className="w-5 h-5" /> */}
          <img src="/shareIcon.png" alt="Share" className="w-5 h-5" />
          Share
        </button>
      </div>

      {showShareModal && (
        <ShareModal url={shareUrl} onClose={() => setShowShareModal(false)} />
      )}
    </div>
  );
};

export default Post;
