import React from "react";

interface LogoSectionProps {
  onGoogleLogin: (e: React.MouseEvent) => void;
  onOpenModal: () => void;
}

const LogoSection: React.FC<LogoSectionProps> = ({
  onGoogleLogin,
  onOpenModal,
}) => {
  return (
    <div className="text-center absolute -bottom-[50px] w-full mx-auto bg-white rounded-[63px] h-[280px] pt-[30px]">
      <div className="flex items-center justify-center space-x-2">
        <img src="/snapLogo.png" className="w-10 h-8" alt="Logo" />
        <h1 className="text-2xl font-semibold">Vibesnap</h1>
      </div>
      <p className="font-medium text-base mt-[10px] mb-[28px]">
        Moments That Matter, Shared Forever.
      </p>
      <button
        onClick={onGoogleLogin}
        type="button"
        className="mx-auto flex items-center justify-center space-x-2 bg-[#292929] text-white border border-gray-200 px-4 py-3 rounded-full hover:bg-[#404040] transition mb-2"
      >
        <img src="/googleLogo.png" alt="Google" className="w-5 h-5" />
        <span>Continue with Google</span>
      </button>
      <button
        onClick={onOpenModal}
        className="mx-auto flex items-center justify-center space-x-2 bg-white text-black border border-gray-200 px-20 py-2 w-max rounded-full hover:bg-gray-50 transition"
      >
        Sign in
      </button>
    </div>
  );
};

export default LogoSection;
