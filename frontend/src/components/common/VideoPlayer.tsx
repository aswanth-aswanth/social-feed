import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface VideoPlayerProps {
  src: string;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ref, inView] = useInView({
    threshold: 0.5, // 50% of the video must be in view
    triggerOnce: false
  });

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (inView) {
      // Try to play the video when it comes into view
      const playPromise = videoElement.play();
      
      // Handle play promise to avoid uncaught promise rejection
      if (playPromise !== undefined) {
        playPromise
          .catch(error => {
            // Auto-play was prevented
            // Show a UI element to let the user manually start playback
            console.log("Autoplay prevented:", error);
          });
      }
    } else {
      // Pause the video when it's out of view
      videoElement.pause();
    }
  }, [inView]);

  return (
    <div ref={ref} className="video-container">
      <video
        ref={videoRef}
        src={src}
        className={`max-w-full rounded-lg ${className || ''}`}
        loop
        muted
        playsInline
        controls
        preload="metadata"
      />
    </div>
  );
};

export default VideoPlayer; 