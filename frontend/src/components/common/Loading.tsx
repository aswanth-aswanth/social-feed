import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-slate-300 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${i * 90}deg) translate(0, -150%)`,
                transformOrigin: '0 150%',
                animation: 'loadingRotate 1.5s ease-in-out infinite',
                animationDelay: `${i * 0.2}s`,
                opacity: 0.7
              }}
            />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes loadingRotate {
          0% {
            transform: rotate(0deg) translate(0, -150%);
            opacity: 0.7;
          }
          50% {
            transform: rotate(180deg) translate(0, -150%);
            opacity: 0.3;
          }
          100% {
            transform: rotate(360deg) translate(0, -150%);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
