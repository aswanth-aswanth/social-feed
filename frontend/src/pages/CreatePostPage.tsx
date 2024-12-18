import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { posts } from "../services";
import CreatePostHeader from "../components/feed/CreatePostHeader";
import MediaUploadInput from "../components/feed/MediaUploadInput";
import MediaSlider from "../components/feed/MediaSlider";
import { MediaPreview } from "../types/CreatePostPage";

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const [caption, setCaption] = useState<string>("");
  const [mediaFiles, setMediaFiles] = useState<MediaPreview[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

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
      mediaFiles.forEach(({ file }) => formData.append("media", file));

      await posts.create(formData);
      navigate(-1);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="h-screen bg-white max-w-[360px] mx-auto relative">
      <CreatePostHeader />

      <div className="relative aspect-square bg-gray-100">
        {mediaFiles.length > 0 ? (
          <MediaSlider
            mediaFiles={mediaFiles}
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
          />
        ) : (
          <MediaUploadInput handleChange={handleMediaChange} />
        )}
      </div>

      <div className="p-4">
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption..."
          className="w-full p-2 min-h-[100px] text-sm outline-none resize-none"
          rows={4}
        />
      </div>

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
