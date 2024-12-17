import React from "react";

interface MediaUploadInputProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MediaUploadInput: React.FC<MediaUploadInputProps> = ({
  handleChange,
}) => (
  <div className="w-full h-full flex items-center justify-center bg-white">
    <label htmlFor="post-media" className="cursor-pointer text-center">
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
    </label>
    <input
      type="file"
      id="post-media"
      accept="image/*,video/*"
      multiple
      onChange={handleChange}
      className="hidden"
    />
  </div>
);

export default MediaUploadInput;
