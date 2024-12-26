import React, { useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
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
            <VideoComponent src={media.url} />
          )}
        </div>
      ))}
    </div>
  </div>
);

const VideoComponent: React.FC<{ src: string }> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.5, // Trigger when 50% of the video is visible
  });

  useEffect(() => {
    if (videoRef.current) {
      if (inView) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [inView]);

  return (
    <div ref={ref} className="w-full h-full">
      <video
        ref={videoRef}
        src={src}
        className="rounded-lg object-cover w-full h-full"
        preload="metadata"
        controls
      />
    </div>
  );
};

export default MediaGallery;
