import React from "react";

const ProfilePicture: React.FC<{
  previewUrl: string;
  onProfileImageChange: (file: File) => void;
}> = ({ previewUrl, onProfileImageChange }) => (
  <div className="px-4 -mt-16">
    <div className="relative inline-block">
      <img
        src={previewUrl}
        alt="Profile"
        className="w-28 h-28 mt-4 rounded-full object-cover"
      />
      <label
        htmlFor="profile-pic"
        className="absolute bottom-0 -right-3 rounded-full p-2 cursor-pointer"
      >
        <img src="/editIcon.png" alt="Edit" className="w-8 h-8" />
      </label>
      <input
        type="file"
        id="profile-pic"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onProfileImageChange(file);
        }}
        className="hidden"
      />
    </div>
  </div>
);

export default ProfilePicture;
