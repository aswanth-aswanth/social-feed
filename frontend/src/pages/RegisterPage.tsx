import React from "react";
import { useAuthStore } from "../store/authStore";
import Loading from "../components/common/Loading";
import { RegisterHeader, RegisterLogo, RegisterForm } from "../components/auth";

const RegisterPage: React.FC = () => {
  const { loading, error } = useAuthStore();

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen max-w-[360px] mx-auto bg-white flex flex-col">
      <RegisterHeader />
      <main className="flex-1 flex flex-col justify-center px-6">
        <RegisterLogo />
        <RegisterForm error={error} />
      </main>
    </div>
  );
};

export default RegisterPage;
