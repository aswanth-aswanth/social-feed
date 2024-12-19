import React from "react";

interface ProfileImageProps {
  src: string;
  name?: string;
  bio?: string;
  onEditClick: () => void;
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  src,
  name,
  bio,
  onEditClick,
}) => (
  <div className="mb-4 relative">
    <img
      src={src}
      alt="Profile"
      className="w-28 h-28 mt-4 rounded-full object-cover"
    />
    <button
      onClick={onEditClick}
      className="px-4 py-2 absolute bottom-4 right-0 border w-[160px] border-gray-700 rounded-full font-medium text-xs"
    >
      Edit Profile
    </button>
    <div className="mt-4">
      <h1 className="text-2xl font-bold">{name || "Loading..."}</h1>
      <p className="text-gray-600 mt-1 text-sm">
        {bio || "Bio hasn't been added yet"}
      </p>
    </div>
  </div>
);

export default ProfileImage;
