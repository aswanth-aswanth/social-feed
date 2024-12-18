import React from "react";

interface CoverImageProps {
  src: string;
  onBackClick: () => void;
}

const CoverImage: React.FC<CoverImageProps> = ({ src, onBackClick }) => (
  <div className="relative h-[170px] rounded-b-xl overflow-hidden">
    <img src={src} alt="Cover" className="w-full h-full object-cover" />
    <button
      onClick={onBackClick}
      className="absolute top-7 left-4 w-8 h-8 rounded-full flex items-center justify-center"
    >
      <img src="/HiArrowSmLeft.png" alt="Back" className="w-full h-full" />
    </button>
  </div>
);

export default CoverImage;
