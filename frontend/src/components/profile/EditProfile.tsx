import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../../services/api";

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [previewUrl, setPreviewUrl] = useState("/defaultProfile.png");
  const [coverPreviewUrl, setCoverPreviewUrl] = useState("/defaultCover.jpeg");
  const [newProfilePic, setNewProfilePic] = useState<File | null>(null);
  const [newCoverPic, setNewCoverPic] = useState<File | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await users.getProfile();
        setName(userData.name || "");
        setBio(userData.bio || "");
        setPreviewUrl(userData.profilePicture || "/defaultProfile.png");
        setCoverPreviewUrl(userData.coverPicture || "/defaultCover.jpeg");
        setLoading(false);
      } catch (err) {
        setError("Failed to load profile");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewProfilePic(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewCoverPic(file);
      setCoverPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);
      if (newProfilePic) {
        formData.append("profilePicture", newProfilePic);
      }
      if (newCoverPic) {
        formData.append("coverPicture", newCoverPic);
      }

      await users.updateProfile({
        name,
        bio,
        profilePicture: newProfilePic || undefined,
        coverPicture: newCoverPic || undefined,
      });
      navigate(-1);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-white max-w-[360px] mx-auto relative">
      {/* Header */}

      {/* Cover Image Section */}
      <div className="relative h-[170px] rounded-b-xl overflow-hidden">
        <img
          src={coverPreviewUrl}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => navigate(-1)}
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
          onChange={handleCoverImageChange}
          className="hidden"
        />
      </div>

      {/* Profile Picture Section */}
      <div className="px-4 -mt-16">
        <div className="relative inline-block">
          <img
            src={previewUrl}
            alt="Profile"
            className="w-28 h-28 mt-4 rounded-full  object-cover"
          />
          <label
            htmlFor="profile-pic"
            className="absolute bottom-0 -right-3  rounded-full p-2 cursor-pointer"
          >
            <img src="/editIcon.png" alt="Edit" className="w-8 h-8" />
          </label>
          <input
            type="file"
            id="profile-pic"
            accept="image/*"
            onChange={handleProfileImageChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Form */}
      <div className="px-4 mt-8 space-y-1">
        {/* Name Field */}
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

        {/* Bio Field */}
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

      {/* Save Button */}
      <div className="absolute bottom-8 left-4 right-4">
        <button
          onClick={handleSave}
          className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition"
        >
          SAVE
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
