import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import { MasonryImageGrid, LoginModal, LogoSection } from "../components/auth";
import ForgotPassword from "../components/auth/ForgotPassword";

const Login: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const { loginWithGoogle, loading, error } = useAuthStore();

  const handleGoogleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    loginWithGoogle();
  };

  if (loading) return <Loading />;

  return (
    <div className="h-screen relative overflow-y-hidden max-w-[360px] mx-auto bg-white flex flex-col items-center">
      <div className="w-full space-y-8">
        <MasonryImageGrid />
        {error && <ErrorMessage error={error} />}
        <LogoSection
          onGoogleLogin={handleGoogleLogin}
          onOpenModal={() => setIsModalOpen(true)}
        />
      </div>
      {isModalOpen && (
        <LoginModal
          setIsModalOpen={setIsModalOpen}
          onForgotPassword={() => {
            setIsModalOpen(false);
            setIsForgotPasswordOpen(true);
          }}
        />
      )}
      {isForgotPasswordOpen && (
        <ForgotPassword onClose={() => setIsForgotPasswordOpen(false)} />
      )}
    </div>
  );
};

export default Login;
