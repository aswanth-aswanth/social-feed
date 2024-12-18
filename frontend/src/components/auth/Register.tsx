import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../contexts/authStore";
import Loading from "../common/Loading";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { register, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password, name);
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen max-w-[360px] mx-auto bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <img src="/HiArrowSmLeftBlack.png" alt="Back" className="w-8 h-6" />
          <h3 className="font-bold text-xl">Create account</h3>
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6">
        {/* Logo and App Name */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2">
            <img src="/snapLogo.png" className="w-10 h-8" alt="Logo" />
            <h1 className="text-2xl font-semibold">Vibesnap</h1>
          </div>
          <p className="font-medium text-base mt-[10px]">
            Moments That Matter, Shared Forever.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 text-sm rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition"
              placeholder="Full name"
            />
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
            {loading ? "Creating account..." : "Create account"}
          </button>

          <div className="flex items-center justify-center space-x-2 text-sm">
            <span className="text-gray-500">Already have an account?</span>
            <Link to="/login" className="text-black hover:text-gray-600">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
