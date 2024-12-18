import React from "react";
import { useNavigate } from "react-router-dom";

const RegisterHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center p-4 border-b">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2">
        <img src="/HiArrowSmLeftBlack.png" alt="Back" className="w-8 h-6" />
        <h3 className="font-bold text-xl">Create account</h3>
      </button>
    </header>
  );
};

export default RegisterHeader;
