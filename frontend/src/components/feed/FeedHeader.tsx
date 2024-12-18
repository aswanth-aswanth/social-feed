import { useNavigate } from "react-router-dom";
import { FeedHeaderProps } from "../../types";

const FeedHeader = ({ user }: FeedHeaderProps) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/profile`);
  };

  return (
    <div
      onClick={handleProfileClick}
      className="flex bg-white py-3 z-10 items-center justify-start gap-4"
    >
      <img
        src={user?.profilePicture || "/defaultProfile.png"}
        alt="Profile"
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <h1 className="text-xl font-semibold">Welcome Back</h1>
        <p className="text-sm text-gray-600">{user?.name || "Loading..."}</p>
      </div>
    </div>
  );
};

export default FeedHeader;
