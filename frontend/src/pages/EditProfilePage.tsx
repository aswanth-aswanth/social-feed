import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../services";
import {
  CoverImageEditor,
  ProfilePictureEditor,
  ProfileForm,
  SaveButton,
} from "../components/profile";
import Loading from "../components/common/Loading";

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

  const handleProfileImageChange = (file: File) => {
    setNewProfilePic(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleCoverImageChange = (file: File) => {
    setNewCoverPic(file);
    setCoverPreviewUrl(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
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

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="h-dvh bg-white max-w-[360px] mx-auto relative">
      <CoverImageEditor
        coverPreviewUrl={coverPreviewUrl}
        onBack={() => navigate(-1)}
        onCoverImageChange={handleCoverImageChange}
      />
      <ProfilePictureEditor
        previewUrl={previewUrl}
        onProfileImageChange={handleProfileImageChange}
      />
      <ProfileForm name={name} setName={setName} bio={bio} setBio={setBio} />
      <SaveButton onSave={handleSave} />
    </div>
  );
};

export default EditProfile;
