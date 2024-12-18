import React, { useRef } from "react";

interface ProfileImageEditorProps {
  profilePicture: File | null;
  onChange: (file: File | null) => void;
}

const ProfileImageEditor: React.FC<ProfileImageEditorProps> = ({
  profilePicture,
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onChange(file);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative w-28 h-28 mt-4 mx-auto rounded-full overflow-hidden">
      <img
        src={
          profilePicture
            ? URL.createObjectURL(profilePicture)
            : "/defaultProfile.png"
        }
        alt="Profile"
        className="w-full h-full object-cover"
      />
      <button
        onClick={triggerFileSelect}
        className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-black text-white text-xs flex items-center justify-center"
      >
        <span>✎</span>
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ProfileImageEditor;
