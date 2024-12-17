// src/components/profile/UserProfile.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { posts, users } from "../../services/api";
import Loading from "../common/Loading";

interface UserPost {
  _id: string;
  text: string;
  images: string[];
  video?: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    profilePicture?: string;
  };
}

interface User {
  _id: string;
  name: string;
  profilePicture?: string;
  coverPicture?: string;
  bio?: string;
}

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState<UserPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [profileData, postsData] = await Promise.all([
          users.getProfile(),
          posts.getMyPosts(),
        ]);

        setUserData(profileData);
        setUserPosts(postsData);
      } catch (error) {
        setError("Error fetching user data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-white max-w-[360px] mx-auto">
      <div className="relative h-[170px] rounded-b-xl overflow-hidden">
        <img
          src={userData?.coverPicture || "/defaultCover.png"}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-7 left-4 w-8 h-8  rounded-full flex items-center justify-center"
        >
          <img src="/HiArrowSmLeft.png" alt="Back" className="w-full h-full" />
        </button>
      </div>

      {/* Profile Info */}
      <div className="px-4 -mt-16 relative">
        <div className="mb-4 relative">
          <img
            src={userData?.profilePicture || "/defaultProfile.png"}
            alt="Profile"
            className="w-28 h-28 mt-4 rounded-full  object-cover"
          />
          <button
            onClick={() => navigate("/edit-profile")}
            className="px-4 py-2 absolute bottom-4 right-0 border block ml-auto w-[200px] border-gray-700 rounded-full font-medium text-xs"
          >
            Edit Profile
          </button>
        </div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold">
              {userData?.name || "Loading..."}
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              {userData?.bio ?? "Bio haven't added"}
            </p>
          </div>
        </div>

        {/* Posts Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">My Posts</h2>
          {userPosts.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {userPosts.map((post) => (
                <div
                  key={post._id}
                  className="aspect-square rounded-lg overflow-hidden relative group cursor-pointer"
                >
                  {/* Post Image */}
                  <img
                    src={post.images[0]}
                    alt={post.text}
                    className="w-full h-full object-cover"
                  />

                  {/* Multiple Images Indicator */}
                  {post.images.length > 1 && (
                    <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                      1/{post.images.length}
                    </div>
                  )}

                  {/* Post Text Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="flex items-center gap-1">
                      <span className="text-white text-sm font-medium line-clamp-1">
                        {post.text}
                      </span>
                    </div>
                    {/* Like Count */}
                    <div className="flex items-center gap-1 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="lightgray"
                        className="w-5 h-5"
                      >
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                      </svg>
                      <span className="text-white text-xs">67</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 px-4">
              <p className="text-gray-500 text-center">
                No posts yet. Share your first post!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
