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
      className="flex bg-white py-3 z-10 items-center justify-start gap-2"
    >
      <img
        src={user?.profilePicture || "/defaultProfile.png"}
        alt="Profile"
        className="w-14 h-14 rounded-full object-cover"
      />
      <div>
        <p className="text-xs text-gray-600">Welcome Back</p>
        <h1 className="text-xl font-semibold">{user?.name || "Loading..."}</h1>
      </div>
    </div>
  );
};

export default FeedHeader;
