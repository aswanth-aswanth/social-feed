import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../contexts/authStore";
import Loading from "../common/Loading";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { login, loading, error, loginWithGoogle } = useAuthStore();
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

  const handleGoogleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    loginWithGoogle();
  };

  if (loading) return <Loading />;

  return (
    <div className="h-screen relative overflow-y-hidden max-w-[360px] mx-auto bg-white flex flex-col items-center">
      <div className="w-full space-y-8">
        {/* Masonry Image Grid */}
        <div className="grid grid-cols-3 gap-2">
          {/* First Column - Starts lower */}
          <div className="space-y-2 ">
            <div className="aspect-[7/12]">
              <img
                src="/image1.png"
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <div className="aspect-[7/12]">
              <img
                src="/image4.png"
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <div className="aspect-[7/12]">
              <img
                src="/image7.png"
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
          </div>
          {/* Second Column */}
          <div className="space-y-2 -mt-[6.4rem]">
            <div className="aspect-[7/12]">
              <img
                src="/image2.png"
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <div className="aspect-[7/12]">
              <img
                src="/image5.png"
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <div className="aspect-[7/12]">
              <img
                src="/image8.png"
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
          </div>
          {/* Third Column - Starts lower */}
          <div className="space-y-2 ">
            <div className="aspect-[7/12]">
              <img
                src="/image3.png"
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <div className="aspect-[7/12]">
              <img
                src="/image6.png"
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <div className="aspect-[7/12]">
              <img
                src="/image9.png"
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {/* Logo and App Name */}
        <div className="text-center absolute -bottom-[50px] w-full mx-auto bg-white rounded-[63px] h-[280px] pt-[30px]">
          <div className="flex items-center justify-center space-x-2">
            <img src="/snapLogo.png" className="w-10 h-8" alt="Logo" />
            <h1 className="text-2xl font-semibold">Vibesnap</h1>
          </div>
          <p className="font-medium text-base mt-[10px] mb-[28px]">
            Moments That Matter, Shared Forever.
          </p>
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="mx-auto flex items-center justify-center space-x-2 bg-[#292929] text-white border border-gray-200 px-4 py-3 rounded-full hover:bg-[#404040] transition mb-2"
          >
            <img src="/googleLogo.png" alt="Google" className="w-5 h-5" />
            <span>Continue with Google</span>
          </button>

          {/* Sign in button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="mx-auto flex items-center justify-center space-x-2 bg-white text-black border border-gray-200 px-20 py-2 w-max rounded-full hover:bg-gray-50 transition"
          >
            Sign in
          </button>
        </div>
      </div>

      {/* Login Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[320px] relative">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* Modal Title */}
            <h2 className="text-xl font-semibold mb-6 text-center">Sign in</h2>
            {/* Login Form */}

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
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
