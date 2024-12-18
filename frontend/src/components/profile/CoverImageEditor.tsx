import React from "react";

const CoverImage: React.FC<{
  coverPreviewUrl: string;
  onBack: () => void;
  onCoverImageChange: (file: File) => void;
}> = ({ coverPreviewUrl, onBack, onCoverImageChange }) => (
  <div className="relative h-[170px] rounded-b-xl overflow-hidden">
    <img
      src={coverPreviewUrl}
      alt="Cover"
      className="w-full h-full object-cover"
    />
    <button
      onClick={onBack}
      className="absolute top-7 left-4 w-32 h-8 gap-2 rounded-full flex items-center justify-center"
    >
      <img src="/HiArrowSmLeft.png" alt="Back" className="w-8 h-6" />
      <h3 className="text-white w-full font-bold text-lg">Edit Profile</h3>
    </button>
    <label
      htmlFor="cover-pic"
      className="absolute bottom-4 right-4 rounded-full p-2 cursor-pointer"
    >
      <img src="/editIcon.png" alt="Edit" className="w-8 h-8" />
    </label>
    <input
      type="file"
      id="cover-pic"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) onCoverImageChange(file);
      }}
      className="hidden"
    />
  </div>
);

export default CoverImage;
