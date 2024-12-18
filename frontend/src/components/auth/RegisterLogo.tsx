import React from "react";

const RegisterLogo: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center space-x-2">
        <img src="/snapLogo.png" className="w-10 h-8" alt="Logo" />
        <h1 className="text-2xl font-semibold">Vibesnap</h1>
      </div>
      <p className="font-medium text-base mt-2">
        Moments That Matter, Shared Forever.
      </p>
    </div>
  );
};

export default RegisterLogo;
