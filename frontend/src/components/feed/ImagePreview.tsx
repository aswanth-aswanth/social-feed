import React from 'react';

interface ImagePreviewProps {
  media: {
    preview: string;
    type: 'image' | 'video';
  };
  onRemove: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ media, onRemove }) => {
  return (
    <div className="relative">
      {media.type === 'image' ? (
        <img
          src={media.preview}
          alt="Preview"
          className="w-full h-32 object-cover rounded-lg"
        />
      ) : (
        <video
          src={media.preview}
          className="w-full h-32 object-cover rounded-lg"
          controls
        />
      )}
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
      >
        ×
      </button>
    </div>
  );
};

export default ImagePreview; 