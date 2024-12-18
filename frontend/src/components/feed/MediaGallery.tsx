import React from "react";
import { MediaGalleryProps } from "../../types";

const MediaGallery: React.FC<MediaGalleryProps> = ({ mediaItems }) => (
  <div className="overflow-x-auto mb-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
    <div className="flex space-x-2">
      {mediaItems.map((media, index) => (
        <div
          key={index}
          className={`${
            mediaItems.length === 1 ? "w-full" : "w-[11rem]"
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
);

export default MediaGallery;
