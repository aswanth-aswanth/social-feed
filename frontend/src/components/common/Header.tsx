// src/components/common/Header.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../contexts/authStore";

const Header: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/">SocialApp</Link>
      </h1>
      <nav>
        {user ? (
          <>
            <Link to="/" className="mr-4">
              Feed
            </Link>
            <Link to="/profile" className="mr-4">
              Profile
            </Link>
            <button 
              onClick={handleLogout} 
              className="bg-red-500 py-1 px-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">
              Login
            </Link>
            <Link to="/register" className="bg-green-500 py-1 px-2 rounded">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
