import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { posts, users } from "../services";
import { User, UserPost } from "../types";
import { CoverImage, ProfileImage, PostGrid } from "../components/profile";
import { CreatePostButton } from "../components/feed";

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState<UserPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [profileData, postsData] = await Promise.all([
          users.getProfile(),
          posts.getMyPosts(),
        ]);
        setUserData({ ...profileData, _id: profileData.id } as User);
        setUserPosts(postsData as UserPost[]);
      } catch (error) {
        setError("Error fetching user data");
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="h-dvh bg-white max-w-[360px] mx-auto">
      <CoverImage
        src={userData?.coverPicture || "/defaultCover.png"}
        onBackClick={() => navigate(-1)}
      />
      <div className="px-4 -mt-16 relative">
        <ProfileImage
          src={userData?.profilePicture || "/defaultProfile.png"}
          name={userData?.name}
          bio={userData?.bio}
          onEditClick={() => navigate("/edit-profile")}
        />
        <PostGrid posts={userPosts} />
        <CreatePostButton />
        <button
          className="bg-black my-4 flex text-white p-2 rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
