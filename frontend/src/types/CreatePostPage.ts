export interface MediaPreview {
  type: "image" | "video";
  url: string;
  file: File;
}

export interface MediaSliderProps {
  mediaFiles: MediaPreview[];
  currentSlide: number;
  setCurrentSlide: (index: number) => void;
}
