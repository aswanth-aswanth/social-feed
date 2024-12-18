import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../contexts/authStore";

interface LoginFormProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<LoginFormProps> = ({ setIsModalOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition"
          placeholder="Email address"
        />
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition"
          placeholder="Password"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition disabled:bg-gray-300"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
      <div className="flex items-center justify-center space-x-2 text-sm">
        <span className="text-gray-500">Don't have an account?</span>
        <Link
          to="/register"
          className="text-black hover:text-gray-600"
          onClick={() => setIsModalOpen(false)}
        >
          Register
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
