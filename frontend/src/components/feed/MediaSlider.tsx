import React from "react";
import Slider from "react-slick";
import { MediaSliderProps } from "../../types/CreatePostPage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MediaSlider: React.FC<MediaSliderProps> = ({
  mediaFiles,
  currentSlide,
  setCurrentSlide,
}) => {
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: setCurrentSlide,
  };

  return (
    <div className="relative w-full h-full">
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

      {mediaFiles.length > 1 && (
        <div className="absolute top-[50px] right-[50px] z-10">
          <span className="text-xs bg-white font-bold px-2 py-1 rounded-full">
            {currentSlide + 1}/{mediaFiles.length}
          </span>
        </div>
      )}
    </div>
  );
};

export default MediaSlider;
