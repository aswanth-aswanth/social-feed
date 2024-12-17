import React, { useState, useRef } from "react";
import { posts } from "../../services/api";

interface CreatePostModalProps {
  onClose: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose }) => {
  const [text, setText] = useState("");
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text && mediaFiles.length === 0) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("text", text);
      mediaFiles.forEach((file) => {
        formData.append("media", file);
      });

      await posts.create(formData);
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-[360px] rounded-t-[32px] absolute bottom-0">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Create Post</h2>
            <button onClick={onClose} className="text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-3 border rounded-lg resize-none h-32"
            />

            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="flex-1 py-2 px-4 bg-gray-100 rounded-lg flex items-center justify-center space-x-2"
              >
                <span>📸</span>
                <span>Camera</span>
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 py-2 px-4 bg-gray-100 rounded-lg flex items-center justify-center space-x-2"
              >
                <span>🖼️</span>
                <span>Gallery</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={isUploading}
              className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition disabled:bg-gray-400"
            >
              {isUploading ? "Posting..." : "Post"}
            </button>
          </form>

          <input
            type="file"
            ref={fileInputRef}
            multiple
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => setMediaFiles(Array.from(e.target.files || []))}
          />
          <input
            type="file"
            ref={cameraInputRef}
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => setMediaFiles(Array.from(e.target.files || []))}
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
