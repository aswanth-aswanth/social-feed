// src/components/feed/CreatePostPage.tsx
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { posts } from "../../services/api";

interface MediaPreview {
  type: "image" | "video";
  url: string;
  file: File;
}

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const [caption, setCaption] = useState<string>("");
  const [mediaFiles, setMediaFiles] = useState<MediaPreview[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index: number) => setCurrentSlide(index),
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const previews: MediaPreview[] = files.map((file) => ({
      type: file.type.startsWith("video") ? "video" : "image",
      url: URL.createObjectURL(file),
      file,
    }));
    setMediaFiles((prev) => [...prev, ...previews]);
  };

  const handleCreate = async () => {
    if (!caption && mediaFiles.length === 0) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("text", caption);
      mediaFiles.forEach(({ file }) => {
        formData.append("media", file);
      });

      await posts.create(formData);
      navigate(-1);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white max-w-[360px] mx-auto relative">
      {/* Header */}
      <div className="flex items-center p-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2">
          <img src="/HiArrowSmLeftBlack.png" alt="Back" className="w-8 h-6" />
          <h3 className="font-bold text-xl">New post</h3>
        </button>
      </div>

      {/* Media Preview Section */}
      <div className="relative aspect-square bg-gray-100">
        {mediaFiles.length > 0 ? (
          <div className="relative w-full h-full">
            {/* Slider */}
            <Slider {...sliderSettings} className="w-full h-full">
              {mediaFiles.map((media, index) => (
                <div key={index} className="w-full h-full p-10 bg-white">
                  {media.type === "video" ? (
                    <video
                      src={media.url}
                      className="w-full h-full object-cover rounded-xl"
                      controls
                    />
                  ) : (
                    <img
                      src={media.url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  )}
                </div>
              ))}
            </Slider>

            {/* Multiple media indicator */}
            {mediaFiles.length > 1 && (
              <div className="absolute top-[50px] right-[50px] z-10">
                <span className="text-xs bg-white font-bold px-2 py-1 rounded-full">
                  {currentSlide + 1}/{mediaFiles.length}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full flex items-center bg-white justify-center">
            <label htmlFor="post-media" className="cursor-pointer">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </div>
                <p className="text-gray-600">Add photos or videos</p>
              </div>
            </label>
          </div>
        )}
        <input
          type="file"
          id="post-media"
          accept="image/*,video/*"
          multiple
          onChange={handleMediaChange}
          className="hidden"
        />
      </div>

      {/* Caption Section */}
      <div className="p-4">
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption..."
          className="w-full p-2 min-h-[100px] text-sm outline-none resize-none"
          rows={4}
        />
      </div>

      {/* Create Button */}
      <div className="absolute bottom-8 left-4 right-4">
        <button
          onClick={handleCreate}
          disabled={isUploading}
          className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition disabled:bg-gray-400"
        >
          {isUploading ? "Posting..." : "CREATE"}
        </button>
      </div>
    </div>
  );
};

export default CreatePostPage;
