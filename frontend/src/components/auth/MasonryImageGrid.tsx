import React from "react";

const MasonryImageGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {/* First Column */}
      <div className="space-y-2 ">
        {["/image1.png", "/image4.png", "/image7.png"].map((src, index) => (
          <div className="aspect-[7/12]" key={index}>
            <img src={src} className="w-full h-full object-cover" alt="" />
          </div>
        ))}
      </div>
      {/* Second Column */}
      <div className="space-y-2 -mt-[7.4rem]">
        {["/image2.png", "/image5.png", "/image8.png"].map((src, index) => (
          <div className="aspect-[7/12]" key={index}>
            <img src={src} className="w-full h-full object-cover" alt="" />
          </div>
        ))}
      </div>
      {/* Third Column */}
      <div className="space-y-2">
        {["/image3.png", "/image6.png", "/image9.png"].map((src, index) => (
          <div className="aspect-[7/12]" key={index}>
            <img src={src} className="w-full h-full object-cover" alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasonryImageGrid;
