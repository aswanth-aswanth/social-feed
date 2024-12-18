import React from "react";

const ProfileForm: React.FC<{
  name: string;
  setName: (name: string) => void;
  bio: string;
  setBio: (bio: string) => void;
}> = ({ name, setName, bio, setBio }) => (
  <div className="px-4 mt-8 space-y-1">
    <div>
      <label className="text-sm font-medium text-gray-700">Name</label>
      <div className="relative">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full py-2 border-b focus:border-b-2 focus:border-black font-bold text-sm outline-none transition-colors"
        />
      </div>
    </div>
    <div>
      <label className="text-sm font-medium text-gray-700">Bio</label>
      <div className="relative">
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full py-2 border-b focus:border-b-2 focus:border-black font-bold text-sm outline-none transition-colors resize-none"
        />
      </div>
    </div>
  </div>
);

export default ProfileForm;
