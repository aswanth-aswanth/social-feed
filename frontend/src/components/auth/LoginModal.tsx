import React from "react";
import LoginForm from "./LoginForm";

interface LoginModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onForgotPassword: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  setIsModalOpen,
  onForgotPassword,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[320px] relative">
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
        <h2 className="text-xl font-semibold mb-6 text-center">Sign in</h2>
        <LoginForm setIsModalOpen={setIsModalOpen} />
        <div className="flex items-center justify-center space-x-2 text-sm cursor-pointer">
          <span onClick={() => onForgotPassword()} className="text-gray-500 hover:text-blue-800">Forgot your password?</span>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
