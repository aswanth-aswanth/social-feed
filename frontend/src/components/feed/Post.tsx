import React, { useState, useMemo } from "react";
import { formatDistanceToNow } from "date-fns";
import { MediaItem, PostProps } from "../../types";
import ShareModal from "../common/ShareModal";
import { AuthorInfo, MediaGallery, Hashtags, PostActions } from ".";

const Post: React.FC<PostProps> = ({ post, index }) => {
  const [likeCount, setLikeCount] = useState(67);
  const [showShareModal, setShowShareModal] = useState(false);

  const bgColor = index % 2 === 0 ? "bg-[#F7EBFF]" : "bg-[#FFFAEE]";

  const mediaItems: MediaItem[] = useMemo(() => {
    return [
      ...post.images.map((img): MediaItem => ({ type: "image", url: img })),
      ...(post.video ? [{ type: "video", url: post.video }] : []),
    ];
  }, [post.images, post.video]);

  const shareUrl = useMemo(
    () =>
      typeof window !== "undefined"
        ? `${window.location.origin}/post/${post._id}`
        : "",
    [post._id]
  );

  const formattedTimestamp = useMemo(
    () => formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }),
    [post.createdAt]
  );

  const handleLike = () => setLikeCount((prev) => prev + 1);

  return (
    <div className={`${bgColor} p-4 mb-4 rounded-3xl`}>
      <AuthorInfo author={post.author} timestamp={formattedTimestamp} />
      <div className="mb-4">
        <p className="text-gray-800 mb-2">{post.text}</p>
        <Hashtags text={post.text} />
      </div>
      {mediaItems.length > 0 && <MediaGallery mediaItems={mediaItems} />}
      <PostActions
        likeCount={likeCount}
        onLike={handleLike}
        onShare={() => setShowShareModal(true)}
      />
      {showShareModal && (
        <ShareModal url={shareUrl} onClose={() => setShowShareModal(false)} />
      )}
    </div>
  );
};

export default Post;
