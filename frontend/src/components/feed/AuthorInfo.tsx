import React from "react";
import { AuthorInfoProps } from "../../types";

const AuthorInfo: React.FC<AuthorInfoProps> = ({ author, timestamp }) => (
  <div className="flex items-center space-x-2 mb-3">
    <img
      src={author.profilePicture || "/defaultProfile.png"}
      alt={author.name}
      className="w-10 h-10 rounded-full object-cover"
    />
    <div>
      <div className="font-bold text-gray-800">{author.name}</div>
      <div className="text-gray-500 text-sm">{timestamp}</div>
    </div>
  </div>
);

export default AuthorInfo;
